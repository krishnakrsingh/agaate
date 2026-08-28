import { hash } from "bcryptjs";
import {
  createUser,
  countUsersByRole,
  deleteUser,
  ensureAdminSchema,
  findUserById,
  getSettings,
  listContacts,
  listUsers,
  saveSettings,
  serializeContact,
  updateContact,
  updateUser,
} from "@/server/admin-queries";
import { assertSameOrigin, requireSessionUser } from "@/server/auth";
import {
  canAssignRole,
  canManageSettings,
  canManageUsers,
  DEFAULT_ADMIN_SETTINGS,
  sanitizeSettingsForClient,
  type AdminRole,
  type AdminSettingsPayload,
  type RequestStatus,
} from "@/lib/admin-constants";
import { isDbConfigured } from "@/server/db";

function failAuth(err: unknown) {
  const message = err instanceof Error ? err.message : "Error";
  if (message === "UNAUTHORIZED") return { ok: false as const, error: "Please sign in." };
  if (message === "FORBIDDEN") return { ok: false as const, error: "You do not have permission." };
  if (message === "CSRF") return { ok: false as const, error: "Request blocked." };
  throw err;
}

const mockUsers = [
  { id: 1, name: "Super Admin", email: "admin@agaate.in", role: "super_admin" as AdminRole },
];

function mergeSettingsPayload(
  raw: Record<string, unknown>,
  existing: AdminSettingsPayload,
): AdminSettingsPayload {
  const incoming = {
    ...DEFAULT_ADMIN_SETTINGS,
    ...existing,
    ...raw,
    businessHours: {
      ...DEFAULT_ADMIN_SETTINGS.businessHours,
      ...existing.businessHours,
      ...(raw.businessHours as AdminSettingsPayload["businessHours"] | undefined),
    },
    smtp: {
      ...DEFAULT_ADMIN_SETTINGS.smtp,
      ...existing.smtp,
      ...(raw.smtp as AdminSettingsPayload["smtp"] | undefined),
    },
  } as AdminSettingsPayload;

  const nextPass = incoming.smtp.pass?.trim();
  incoming.smtp.pass = nextPass ? nextPass : existing.smtp.pass;
  return incoming;
}

export async function handleGetSettings() {
  try {
    const user = await requireSessionUser();
    if (!canManageSettings(user.role)) return { ok: false as const, error: "Forbidden." };
    if (isDbConfigured()) {
      try {
        const settings = await getSettings();
        return { ok: true as const, settings: sanitizeSettingsForClient(settings) };
      } catch (e) {
        console.warn("DB getSettings fallback:", e);
      }
    }
    return { ok: true as const, settings: sanitizeSettingsForClient(DEFAULT_ADMIN_SETTINGS) };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSaveSettings(raw: Record<string, unknown>) {
  try {
    assertSameOrigin();
    const user = await requireSessionUser();
    if (!canManageSettings(user.role)) return { ok: false as const, error: "Forbidden." };

    const existing = isDbConfigured()
      ? await getSettings().catch(() => DEFAULT_ADMIN_SETTINGS)
      : DEFAULT_ADMIN_SETTINGS;
    const payload = mergeSettingsPayload(raw, existing);

    if (isDbConfigured()) {
      try {
        await saveSettings(user, payload);
      } catch (e) {
        console.warn("DB saveSettings fallback:", e);
      }
    }
    return { ok: true as const, settings: sanitizeSettingsForClient(payload) };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSendTestEmail(to?: string) {
  try {
    assertSameOrigin();
    const user = await requireSessionUser();
    if (!canManageSettings(user.role)) return { ok: false as const, error: "Forbidden." };

    const recipient = to?.trim() || user.email;
    const { sendTestEmail } = await import("@/server/mail");
    const result = await sendTestEmail(recipient);
    if (!result.ok) return { ok: false as const, error: result.error };
    return { ok: true as const, to: recipient };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleListUsers() {
  try {
    const user = await requireSessionUser();
    if (!canManageUsers(user.role)) return { ok: false as const, error: "Forbidden." };
    if (isDbConfigured()) {
      try {
        const users = await listUsers();
        return {
          ok: true as const,
          users: users.map((u) => ({
            id: Number(u.id),
            name: u.name,
            email: u.email,
            role: u.role as AdminRole,
            createdAt: String(u.created_at),
            updatedAt: String(u.updated_at),
          })),
        };
      } catch (e) {
        console.warn("DB listUsers fallback:", e);
      }
    }
    return { ok: true as const, users: mockUsers };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSaveUser(data: {
  id?: number;
  name: string;
  email: string;
  role: string;
  password?: string;
}) {
  try {
    assertSameOrigin();
    const actor = await requireSessionUser();
    if (!canManageUsers(actor.role)) return { ok: false as const, error: "Forbidden." };
    const name = data.name.trim().slice(0, 120);
    const email = data.email.trim().toLowerCase();
    const role = data.role as AdminRole;
    if (!name || !email) return { ok: false as const, error: "Name and email are required." };
    if (!canAssignRole(actor.role, role)) {
      return { ok: false as const, error: "You cannot assign this role." };
    }

    if (isDbConfigured()) {
      try {
        if (data.id) {
          const existing = await findUserById(data.id);
          if (!existing) return { ok: false as const, error: "User not found." };
          if (!canAssignRole(actor.role, existing.role as AdminRole)) {
            return { ok: false as const, error: "You cannot edit this user." };
          }
          if (data.id === actor.id && role !== actor.role) {
            return { ok: false as const, error: "You cannot change your own role." };
          }
          if (
            existing.role === "super_admin" &&
            role !== "super_admin" &&
            (await countUsersByRole("super_admin")) <= 1
          ) {
            return {
              ok: false as const,
              error: "At least one super admin account must remain.",
            };
          }
          const patch: {
            name: string;
            email: string;
            role: AdminRole;
            password_hash?: string;
          } = { name, email, role };
          if (data.password && data.password.length >= 8) {
            patch.password_hash = await hash(data.password, 10);
          }
          await updateUser(data.id, patch);
          return { ok: true as const, id: data.id };
        }
        if (!data.password || data.password.length < 8) {
          return { ok: false as const, error: "Password must be at least 8 characters." };
        }
        const password_hash = await hash(data.password, 10);
        const id = await createUser({ name, email, password_hash, role });
        return { ok: true as const, id };
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        if (message.includes("Duplicate") || message.includes("duplicate")) {
          return { ok: false as const, error: "A user with this email already exists." };
        }
        console.warn("DB saveUser error:", e);
        return { ok: false as const, error: "Could not save user." };
      }
    }

    if (data.id) {
      const idx = mockUsers.findIndex((u) => u.id === data.id);
      if (idx !== -1) mockUsers[idx] = { id: data.id, name, email, role };
      return { ok: true as const, id: data.id };
    }
    const newId = mockUsers.length + 1;
    mockUsers.push({ id: newId, name, email, role });
    return { ok: true as const, id: newId };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleDeleteUser(id: number) {
  try {
    assertSameOrigin();
    const actor = await requireSessionUser();
    if (actor.role !== "super_admin") {
      return { ok: false as const, error: "Only super admins can remove users." };
    }
    if (id === actor.id) {
      return { ok: false as const, error: "You cannot remove your own account." };
    }
    if (!isDbConfigured()) {
      return { ok: false as const, error: "Database not configured." };
    }
    const existing = await findUserById(id);
    if (!existing) return { ok: false as const, error: "User not found." };
    if (
      existing.role === "super_admin" &&
      (await countUsersByRole("super_admin")) <= 1
    ) {
      return { ok: false as const, error: "Cannot remove the last super admin." };
    }
    await deleteUser(id);
    return { ok: true as const };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleGetNotifications() {
  try {
    await requireSessionUser();
    return { ok: true as const, newToday: 0, dueToday: 0, overdue: 0 };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSaveCategory(_data: unknown) {
  try {
    const user = await requireSessionUser();
    if (!canManageSettings(user.role)) return { ok: false as const, error: "Forbidden." };
    return { ok: true as const };
  } catch (err) {
    return failAuth(err);
  }
}

export type FarmVisitFilters = {
  q?: string;
  status?: string;
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
};

export async function handleListFarmVisits(filters: FarmVisitFilters = {}) {
  try {
    const user = await requireSessionUser();
    if (!isDbConfigured()) {
      return { ok: true as const, rows: [], total: 0, page: 1, pageSize: 20, pending: 0 };
    }
    await ensureAdminSchema();
    const result = await listContacts(user, {
      inquiryType: "agripark",
      q: filters.q,
      status: filters.status,
      from: filters.from,
      to: filters.to,
      page: filters.page,
      pageSize: filters.pageSize,
      sort: "created_at",
      dir: "desc",
    });
    const pendingResult = await listContacts(user, {
      inquiryType: "agripark",
      status: "new",
      page: 1,
      pageSize: 1,
    });
    return {
      ok: true as const,
      rows: result.rows.map(serializeContact),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
      pending: pendingResult.total,
    };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleUpdateFarmVisit(data: {
  id: number;
  status?: RequestStatus;
  follow_up_date?: string | null;
}) {
  try {
    assertSameOrigin();
    const user = await requireSessionUser();
    if (!isDbConfigured()) return { ok: false as const, error: "Database not configured." };
    await ensureAdminSchema();
    const updated = await updateContact(user, data.id, {
      status: data.status,
      follow_up_date: data.follow_up_date,
    });
    if (!updated) return { ok: false as const, error: "Booking not found." };
    if (updated.topic !== "agripark")
      return { ok: false as const, error: "Not a farm visit booking." };
    return { ok: true as const, row: serializeContact(updated) };
  } catch (err) {
    return failAuth(err);
  }
}
