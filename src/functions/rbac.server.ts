import { assertSameOrigin, requireSessionUser } from "@/server/auth";
import { canManageRoles, canManageUsers } from "@/lib/admin-constants";
import {
  deleteRole,
  listPermissions,
  listRoles,
  saveRole,
  type PermissionKey,
} from "@/server/rbac-queries";

function failAuth(err: unknown) {
  const message = err instanceof Error ? err.message : "Error";
  if (message === "UNAUTHORIZED") return { ok: false as const, error: "Please sign in." };
  if (message === "FORBIDDEN") return { ok: false as const, error: "You do not have permission." };
  if (message === "CSRF") return { ok: false as const, error: "Request blocked." };
  throw err;
}

function mapRoleError(err: unknown): { ok: false; error: string } | null {
  const message = err instanceof Error ? err.message : String(err);
  if (message === "NOT_FOUND") return { ok: false as const, error: "Role not found." };
  if (message === "SYSTEM_ROLE") {
    return { ok: false as const, error: "This system role cannot be deleted." };
  }
  if (message === "ROLE_IN_USE") {
    return { ok: false as const, error: "Remove users from this role before deleting it." };
  }
  if (message.includes("Duplicate") || message.includes("duplicate")) {
    return { ok: false as const, error: "A role with this slug already exists." };
  }
  return null;
}

export async function handleListPermissions() {
  try {
    const user = await requireSessionUser();
    if (!canManageRoles(user) && !canManageUsers(user)) {
      return { ok: false as const, error: "Forbidden." };
    }
    const permissions = await listPermissions();
    return { ok: true as const, permissions };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleListRoles() {
  try {
    const user = await requireSessionUser();
    if (!canManageRoles(user) && !canManageUsers(user)) {
      return { ok: false as const, error: "Forbidden." };
    }
    const roles = await listRoles();
    return { ok: true as const, roles };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSaveRole(data: {
  id?: number;
  name: string;
  slug?: string;
  description?: string;
  permissions: PermissionKey[];
}) {
  try {
    assertSameOrigin();
    const user = await requireSessionUser();
    if (!canManageRoles(user)) return { ok: false as const, error: "Forbidden." };
    if (!data.name.trim()) return { ok: false as const, error: "Role name is required." };
    const role = await saveRole(data);
    return { ok: true as const, role };
  } catch (err) {
    const mapped = mapRoleError(err);
    if (mapped) return mapped;
    return failAuth(err);
  }
}

export async function handleDeleteRole(id: number) {
  try {
    assertSameOrigin();
    const user = await requireSessionUser();
    if (!canManageRoles(user)) return { ok: false as const, error: "Forbidden." };
    await deleteRole(id);
    return { ok: true as const };
  } catch (err) {
    const mapped = mapRoleError(err);
    if (mapped) return mapped;
    return failAuth(err);
  }
}
