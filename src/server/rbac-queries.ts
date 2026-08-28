import { getDbPool, isDbConfigured } from "@/server/db";
import {
  DEFAULT_SYSTEM_ROLE_PERMISSIONS,
  hasAllPermissions,
  hasPermission,
  PERMISSION_CATALOG,
  SYSTEM_ROLE_SLUGS,
  slugifyRoleName,
  type PermissionKey,
  type RbacRole,
} from "@/lib/rbac";
import type { SessionUser } from "@/lib/admin-constants";

let schemaReady: Promise<void> | undefined;

const memoryRoles: RbacRole[] = [];
const memoryRolePermissions = new Map<number, Set<string>>();
let memoryRoleId = 1;

function seedMemoryRbac() {
  if (memoryRoles.length) return;
  const defs: Array<{ slug: string; name: string; description: string }> = [
    { slug: SYSTEM_ROLE_SLUGS.SUPER_ADMIN, name: "Super Admin", description: "Full system access" },
    { slug: SYSTEM_ROLE_SLUGS.ADMIN, name: "Admin", description: "Content and user management" },
    { slug: SYSTEM_ROLE_SLUGS.AGRONOMIST, name: "Agronomist", description: "Assigned farm visits" },
    { slug: SYSTEM_ROLE_SLUGS.SUPPORT, name: "Support Executive", description: "Assigned inquiries" },
  ];
  for (const def of defs) {
    const id = memoryRoleId++;
    memoryRoles.push({
      id,
      slug: def.slug,
      name: def.name,
      description: def.description,
      isSystem: true,
      permissions: [...(DEFAULT_SYSTEM_ROLE_PERMISSIONS[def.slug] ?? [])],
    });
    memoryRolePermissions.set(id, new Set(DEFAULT_SYSTEM_ROLE_PERMISSIONS[def.slug] ?? []));
  }
}

async function columnExists(table: string, column: string): Promise<boolean> {
  const db = await getDbPool();
  const [rows] = await db.query(
    `SELECT COUNT(*) AS c FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :table AND COLUMN_NAME = :column`,
    { table, column },
  );
  return Number((rows as Array<{ c: number }>)[0]?.c ?? 0) > 0;
}

export async function ensureRbacSchema(): Promise<void> {
  if (!isDbConfigured()) {
    seedMemoryRbac();
    return;
  }
  if (!schemaReady) {
    schemaReady = (async () => {
      const db = await getDbPool();
      await db.query(`
        CREATE TABLE IF NOT EXISTS admin_permissions (
          \`key\` VARCHAR(64) NOT NULL PRIMARY KEY,
          label VARCHAR(120) NOT NULL,
          category VARCHAR(64) NOT NULL,
          description VARCHAR(255) NOT NULL DEFAULT '',
          sort_order INT NOT NULL DEFAULT 0
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
      await db.query(`
        CREATE TABLE IF NOT EXISTS admin_roles (
          id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
          slug VARCHAR(64) NOT NULL UNIQUE,
          name VARCHAR(120) NOT NULL,
          description VARCHAR(255) NOT NULL DEFAULT '',
          is_system TINYINT(1) NOT NULL DEFAULT 0,
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_admin_roles_system (is_system)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
      await db.query(`
        CREATE TABLE IF NOT EXISTS admin_role_permissions (
          role_id BIGINT UNSIGNED NOT NULL,
          permission_key VARCHAR(64) NOT NULL,
          PRIMARY KEY (role_id, permission_key),
          CONSTRAINT fk_role_perm_role FOREIGN KEY (role_id) REFERENCES admin_roles(id) ON DELETE CASCADE,
          CONSTRAINT fk_role_perm_key FOREIGN KEY (permission_key) REFERENCES admin_permissions(\`key\`) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);

      for (const [i, perm] of PERMISSION_CATALOG.entries()) {
        await db.query(
          `INSERT INTO admin_permissions (\`key\`, label, category, description, sort_order)
           VALUES (:key, :label, :category, :description, :sortOrder)
           ON DUPLICATE KEY UPDATE label = VALUES(label), category = VALUES(category),
           description = VALUES(description), sort_order = VALUES(sort_order)`,
          {
            key: perm.key,
            label: perm.label,
            category: perm.category,
            description: perm.description,
            sortOrder: i,
          },
        );
      }

      const systemRoles: Array<{ slug: string; name: string; description: string }> = [
        {
          slug: SYSTEM_ROLE_SLUGS.SUPER_ADMIN,
          name: "Super Admin",
          description: "Full system access including roles and user deletion.",
        },
        {
          slug: SYSTEM_ROLE_SLUGS.ADMIN,
          name: "Admin",
          description: "Manage content, SEO, settings, and staff accounts.",
        },
        {
          slug: SYSTEM_ROLE_SLUGS.AGRONOMIST,
          name: "Agronomist",
          description: "View CMS and manage assigned farm visit inquiries.",
        },
        {
          slug: SYSTEM_ROLE_SLUGS.SUPPORT,
          name: "Support Executive",
          description: "View CMS and manage assigned customer inquiries.",
        },
      ];

      for (const role of systemRoles) {
        await db.query(
          `INSERT INTO admin_roles (slug, name, description, is_system)
           VALUES (:slug, :name, :description, 1)
           ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description)`,
          role,
        );
        const [roleRows] = await db.query(`SELECT id FROM admin_roles WHERE slug = :slug`, {
          slug: role.slug,
        });
        const roleId = Number((roleRows as Array<{ id: number }>)[0]?.id);
        if (!roleId) continue;
        const perms = DEFAULT_SYSTEM_ROLE_PERMISSIONS[role.slug] ?? [];
        for (const key of perms) {
          await db.query(
            `INSERT IGNORE INTO admin_role_permissions (role_id, permission_key) VALUES (:roleId, :key)`,
            { roleId, key },
          );
        }
      }

      if (!(await columnExists("users", "role_id"))) {
        await db.query(`ALTER TABLE users ADD COLUMN role_id BIGINT UNSIGNED NULL`);
        await db.query(`
          UPDATE users u
          JOIN admin_roles r ON r.slug = u.role
          SET u.role_id = r.id
          WHERE u.role_id IS NULL
        `);
        const [supportRows] = await db.query(
          `SELECT id FROM admin_roles WHERE slug = :slug LIMIT 1`,
          { slug: SYSTEM_ROLE_SLUGS.SUPPORT },
        );
        const supportId = Number((supportRows as Array<{ id: number }>)[0]?.id ?? 0);
        if (supportId) {
          await db.query(`UPDATE users SET role_id = :supportId WHERE role_id IS NULL`, {
            supportId,
          });
        }
      }
    })();
  }
  return schemaReady;
}

function rowToRole(row: Record<string, unknown>, permissions: PermissionKey[]): RbacRole {
  return {
    id: Number(row.id),
    slug: String(row.slug),
    name: String(row.name),
    description: String(row.description ?? ""),
    isSystem: Boolean(row.is_system),
    permissions,
    userCount: row.user_count != null ? Number(row.user_count) : undefined,
    createdAt: row.created_at ? String(row.created_at) : undefined,
    updatedAt: row.updated_at ? String(row.updated_at) : undefined,
  };
}

export async function listPermissions() {
  await ensureRbacSchema();
  if (!isDbConfigured()) return PERMISSION_CATALOG;
  const db = await getDbPool();
  const [rows] = await db.query(
    `SELECT \`key\`, label, category, description FROM admin_permissions ORDER BY sort_order, \`key\``,
  );
  return (rows as Array<Record<string, unknown>>).map((r) => ({
    key: String(r.key) as PermissionKey,
    label: String(r.label),
    category: String(r.category),
    description: String(r.description),
  }));
}

async function permissionsForRole(roleId: number): Promise<PermissionKey[]> {
  if (!isDbConfigured()) {
    seedMemoryRbac();
    return [...(memoryRolePermissions.get(roleId) ?? [])] as PermissionKey[];
  }
  const db = await getDbPool();
  const [rows] = await db.query(
    `SELECT permission_key FROM admin_role_permissions WHERE role_id = :roleId ORDER BY permission_key`,
    { roleId },
  );
  return (rows as Array<{ permission_key: string }>).map((r) => r.permission_key as PermissionKey);
}

export async function listRoles(): Promise<RbacRole[]> {
  await ensureRbacSchema();
  if (!isDbConfigured()) {
    seedMemoryRbac();
    return memoryRoles.map((r) => ({ ...r }));
  }
  const db = await getDbPool();
  const [rows] = await db.query(`
    SELECT r.*, COUNT(u.id) AS user_count
    FROM admin_roles r
    LEFT JOIN users u ON u.role_id = r.id
    GROUP BY r.id
    ORDER BY r.is_system DESC, r.name ASC
  `);
  const roles: RbacRole[] = [];
  for (const row of rows as Array<Record<string, unknown>>) {
    const perms = await permissionsForRole(Number(row.id));
    roles.push(rowToRole(row, perms));
  }
  return roles;
}

export async function findRoleById(id: number): Promise<RbacRole | null> {
  await ensureRbacSchema();
  if (!isDbConfigured()) {
    seedMemoryRbac();
    const role = memoryRoles.find((r) => r.id === id);
    return role ? { ...role } : null;
  }
  const db = await getDbPool();
  const [rows] = await db.query(`SELECT * FROM admin_roles WHERE id = :id LIMIT 1`, { id });
  const row = (rows as Array<Record<string, unknown>>)[0];
  if (!row) return null;
  const perms = await permissionsForRole(id);
  return rowToRole(row, perms);
}

export async function findRoleBySlug(slug: string): Promise<RbacRole | null> {
  await ensureRbacSchema();
  if (!isDbConfigured()) {
    seedMemoryRbac();
    const role = memoryRoles.find((r) => r.slug === slug);
    return role ? { ...role } : null;
  }
  const db = await getDbPool();
  const [rows] = await db.query(`SELECT * FROM admin_roles WHERE slug = :slug LIMIT 1`, { slug });
  const row = (rows as Array<Record<string, unknown>>)[0];
  if (!row) return null;
  const perms = await permissionsForRole(Number(row.id));
  return rowToRole(row, perms);
}

export async function getPermissionsForRoleId(roleId: number): Promise<PermissionKey[]> {
  return permissionsForRole(roleId);
}

export async function buildSessionUser(input: {
  id: number;
  name: string;
  email: string;
  roleId: number;
}): Promise<SessionUser | null> {
  const role = await findRoleById(input.roleId);
  if (!role) return null;
  return {
    id: input.id,
    name: input.name,
    email: input.email,
    roleId: role.id,
    role: role.slug,
    roleName: role.name,
    permissions: role.permissions,
    isSystemRole: role.isSystem,
  };
}

export async function saveRole(input: {
  id?: number;
  name: string;
  slug?: string;
  description?: string;
  permissions: PermissionKey[];
}): Promise<RbacRole> {
  await ensureRbacSchema();
  const name = input.name.trim().slice(0, 120);
  const slug = (input.slug?.trim() || slugifyRoleName(name)).slice(0, 64);
  const description = (input.description ?? "").trim().slice(0, 255);
  const validKeys = new Set(PERMISSION_CATALOG.map((p) => p.key));
  const permissions = [...new Set(input.permissions.filter((p) => validKeys.has(p)))];

  if (!isDbConfigured()) {
    seedMemoryRbac();
    if (input.id) {
      const idx = memoryRoles.findIndex((r) => r.id === input.id);
      if (idx === -1) throw new Error("NOT_FOUND");
      if (memoryRoles[idx]!.isSystem) throw new Error("SYSTEM_ROLE");
      memoryRoles[idx] = {
        ...memoryRoles[idx]!,
        name,
        slug,
        description,
        permissions,
      };
      memoryRolePermissions.set(input.id, new Set(permissions));
      return { ...memoryRoles[idx]! };
    }
    const id = memoryRoleId++;
    const role: RbacRole = {
      id,
      slug,
      name,
      description,
      isSystem: false,
      permissions,
    };
    memoryRoles.push(role);
    memoryRolePermissions.set(id, new Set(permissions));
    return role;
  }

  const db = await getDbPool();
  if (input.id) {
    const existing = await findRoleById(input.id);
    if (!existing) throw new Error("NOT_FOUND");
    if (existing.isSystem) {
      await db.query(
        `UPDATE admin_roles SET description = :description WHERE id = :id`,
        { id: input.id, description },
      );
    } else {
      await db.query(
        `UPDATE admin_roles SET slug = :slug, name = :name, description = :description WHERE id = :id`,
        { id: input.id, slug, name, description },
      );
    }
    await db.query(`DELETE FROM admin_role_permissions WHERE role_id = :id`, { id: input.id });
    for (const key of permissions) {
      await db.query(
        `INSERT INTO admin_role_permissions (role_id, permission_key) VALUES (:id, :key)`,
        { id: input.id, key },
      );
    }
    const saved = await findRoleById(input.id);
    if (!saved) throw new Error("FAILED");
    return saved;
  }

  const [result] = await db.query(
    `INSERT INTO admin_roles (slug, name, description, is_system) VALUES (:slug, :name, :description, 0)`,
    { slug, name, description },
  );
  const id = Number((result as { insertId: number }).insertId);
  for (const key of permissions) {
    await db.query(
      `INSERT INTO admin_role_permissions (role_id, permission_key) VALUES (:id, :key)`,
      { id, key },
    );
  }
  const saved = await findRoleById(id);
  if (!saved) throw new Error("FAILED");
  return saved;
}

export async function deleteRole(id: number): Promise<void> {
  await ensureRbacSchema();
  const role = await findRoleById(id);
  if (!role) throw new Error("NOT_FOUND");
  if (role.isSystem) throw new Error("SYSTEM_ROLE");
  if ((role.userCount ?? 0) > 0) throw new Error("ROLE_IN_USE");

  if (!isDbConfigured()) {
    seedMemoryRbac();
    const idx = memoryRoles.findIndex((r) => r.id === id);
    if (idx !== -1) memoryRoles.splice(idx, 1);
    memoryRolePermissions.delete(id);
    return;
  }

  const db = await getDbPool();
  await db.query(`DELETE FROM admin_roles WHERE id = :id AND is_system = 0`, { id });
}

export async function countUsersWithRole(roleId: number): Promise<number> {
  await ensureRbacSchema();
  if (!isDbConfigured()) return 0;
  const db = await getDbPool();
  const [rows] = await db.query(`SELECT COUNT(*) AS c FROM users WHERE role_id = :roleId`, {
    roleId,
  });
  return Number((rows as Array<{ c: number }>)[0]?.c ?? 0);
}

export async function countUsersWithPermission(permission: PermissionKey): Promise<number> {
  await ensureRbacSchema();
  if (!isDbConfigured()) return 0;
  const db = await getDbPool();
  const [rows] = await db.query(
    `SELECT COUNT(DISTINCT u.id) AS c
     FROM users u
     JOIN admin_role_permissions rp ON rp.role_id = u.role_id
     WHERE rp.permission_key = :permission`,
    { permission },
  );
  return Number((rows as Array<{ c: number }>)[0]?.c ?? 0);
}

export function actorCanAssignRole(actor: SessionUser, targetRole: RbacRole): boolean {
  if (hasPermission(actor.permissions, "roles.manage")) return true;
  if (!hasPermission(actor.permissions, "users.manage")) return false;
  return hasAllPermissions(actor.permissions, targetRole.permissions);
}
