import { compare, hash } from "bcryptjs";
import {
  ensureAdminSchema,
  findUserByEmail,
  findUserById,
  updateUser,
} from "@/server/admin-queries";
import {
  assertSameOrigin,
  getSessionManager,
  getSessionUser,
  requireSessionUser,
  type SessionUser,
} from "@/server/auth";
import { isDbConfigured } from "@/server/db";
import { buildSessionUser, findRoleBySlug } from "@/server/rbac-queries";

const loginAttempts = new Map<string, number[]>();

function checkLoginRate(email: string) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const arr = (loginAttempts.get(email) || []).filter((t) => now - t < windowMs);
  if (arr.length >= 20) {
    loginAttempts.set(email, arr);
    return false;
  }
  arr.push(now);
  loginAttempts.set(email, arr);
  return true;
}

export async function hydrateSessionUser(user: SessionUser): Promise<SessionUser> {
  if (user.permissions?.length && user.roleId) return user;
  if (!isDbConfigured()) return user;

  await ensureAdminSchema();
  let roleId = user.roleId;
  if (!roleId && user.role) {
    const role = await findRoleBySlug(user.role);
    roleId = role?.id;
  }
  if (!roleId) {
    const row = await findUserById(user.id);
    roleId = row?.role_id ?? undefined;
  }
  if (!roleId) return user;

  const built = await buildSessionUser({
    id: user.id,
    name: user.name,
    email: user.email,
    roleId,
  });
  return built ?? user;
}

export async function handleLogin(email: string, password: string) {
  assertSameOrigin();
  const normalized = email.trim().toLowerCase();
  if (!checkLoginRate(normalized)) {
    return { ok: false as const, error: "Too many attempts. Try again in a few minutes." };
  }

  if (!isDbConfigured()) {
    return { ok: false as const, error: "Admin authentication is not available." };
  }

  try {
    await ensureAdminSchema();
    const user = await findUserByEmail(normalized);
    if (user?.password_hash) {
      const match = await compare(password, user.password_hash);
      if (match) {
        const roleId = Number(user.role_id);
        if (!roleId) {
          return { ok: false as const, error: "Account role is not configured." };
        }
        const sessionUser = await buildSessionUser({
          id: Number(user.id),
          name: user.name,
          email: user.email,
          roleId,
        });
        if (!sessionUser) {
          return { ok: false as const, error: "Account role is not configured." };
        }
        const session = await getSessionManager();
        await session.update({ user: sessionUser });
        return { ok: true as const, user: sessionUser };
      }
    }
  } catch (e) {
    console.error("Admin login error:", e);
    return { ok: false as const, error: "Unable to sign in right now. Please try again." };
  }

  return { ok: false as const, error: "Invalid email or password." };
}

export async function handleLogout() {
  const session = await getSessionManager();
  await session.clear();
  return { ok: true as const };
}

export async function handleGetSession() {
  try {
    if (isDbConfigured()) {
      try {
        await ensureAdminSchema();
      } catch (e) {
        console.warn("Could not ensure admin schema:", e);
      }
    }
    const user = await getSessionUser();
    if (!user) return { user: null };
    const hydrated = await hydrateSessionUser(user);
    if (hydrated !== user) {
      const session = await getSessionManager();
      await session.update({ user: hydrated });
    }
    return { user: hydrated };
  } catch (e) {
    console.warn("handleGetSession error:", e);
    return { user: null };
  }
}

export async function handleGetProfile() {
  try {
    const user = await requireSessionUser();
    if (!isDbConfigured()) {
      return { ok: true as const, profile: user };
    }
    await ensureAdminSchema();
    const row = await findUserById(user.id);
    if (!row) return { ok: false as const, error: "Profile not found." };
    return {
      ok: true as const,
      profile: {
        id: Number(row.id),
        name: row.name,
        email: row.email,
        roleId: Number(row.role_id),
        role: String(row.role),
        roleName: String(row.role_name ?? user.roleName),
        createdAt: String(row.created_at),
        updatedAt: String(row.updated_at),
      },
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error";
    if (message === "UNAUTHORIZED") return { ok: false as const, error: "Please sign in." };
    throw err;
  }
}

export async function handleUpdateProfile(data: { name: string }) {
  try {
    assertSameOrigin();
    const user = await requireSessionUser();
    const name = data.name.trim().slice(0, 120);
    if (!name) return { ok: false as const, error: "Name is required." };
    if (!isDbConfigured()) {
      return { ok: false as const, error: "Profile updates require a database connection." };
    }
    await ensureAdminSchema();
    await updateUser(user.id, { name });
    const sessionUser: SessionUser = { ...user, name };
    const session = await getSessionManager();
    await session.update({ user: sessionUser });
    return { ok: true as const, user: sessionUser };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error";
    if (message === "UNAUTHORIZED") return { ok: false as const, error: "Please sign in." };
    if (message === "CSRF") return { ok: false as const, error: "Request blocked." };
    throw err;
  }
}

export async function handleChangePassword(data: {
  currentPassword: string;
  newPassword: string;
}) {
  try {
    assertSameOrigin();
    const user = await requireSessionUser();
    if (!data.newPassword || data.newPassword.length < 8) {
      return { ok: false as const, error: "New password must be at least 8 characters." };
    }
    if (!isDbConfigured()) {
      return { ok: false as const, error: "Password changes require a database connection." };
    }
    await ensureAdminSchema();
    const row = await findUserByEmail(user.email);
    if (!row?.password_hash) {
      return { ok: false as const, error: "Account not found." };
    }
    const match = await compare(data.currentPassword, row.password_hash);
    if (!match) {
      return { ok: false as const, error: "Current password is incorrect." };
    }
    await updateUser(user.id, { password_hash: await hash(data.newPassword, 10) });
    return { ok: true as const };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error";
    if (message === "UNAUTHORIZED") return { ok: false as const, error: "Please sign in." };
    if (message === "CSRF") return { ok: false as const, error: "Request blocked." };
    throw err;
  }
}
