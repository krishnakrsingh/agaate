import { getDbPool, isDbConfigured } from "@/server/db";
import type {
  ActivityRow,
  AdminUserRow,
  ContactRequestRow,
  InquiryCategoryRow,
  NoteRow,
} from "@/server/admin-schema";
import {
  canManageSettings,
  DEFAULT_ADMIN_SETTINGS,
  isRestrictedAssignee,
  type AdminSettingsPayload,
  type RequestPriority,
  type RequestStatus,
} from "@/lib/admin-constants";
import type { SessionUser } from "@/lib/admin-constants";
import { ensureRbacSchema, findRoleById } from "@/server/rbac-queries";

function parseJson<T>(value: unknown, fallback: T): T {
  if (value == null) return fallback;
  if (typeof value === "object") return value as T;
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

const ADMIN_TABLE_SQL = [
  `CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(160) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'admin', 'agronomist', 'support') NOT NULL DEFAULT 'support',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_role (role)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS inquiry_categories (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(64) NOT NULL UNIQUE,
    label VARCHAR(160) NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 1,
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS request_activity (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    request_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NULL,
    action VARCHAR(64) NOT NULL,
    payload JSON NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_activity_request (request_id, created_at),
    INDEX idx_activity_user (user_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS request_notes (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    request_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NULL,
    body TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_notes_request (request_id, created_at)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS admin_settings (
    id TINYINT UNSIGNED NOT NULL PRIMARY KEY DEFAULT 1,
    payload JSON NOT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS newsletter_signups (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    contact VARCHAR(160) NOT NULL,
    contact_type ENUM('email', 'phone') NOT NULL,
    source_page VARCHAR(255) NOT NULL DEFAULT '/kisaan-mall',
    ip_hash CHAR(64) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_newsletter_source_created (source_page, created_at),
    INDEX idx_newsletter_contact (contact, source_page)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS career_applications (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_slug VARCHAR(64) NOT NULL,
    job_title VARCHAR(200) NOT NULL,
    name VARCHAR(160) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    email VARCHAR(160) NOT NULL,
    experience_band VARCHAR(80) NOT NULL DEFAULT '',
    crop_experience VARCHAR(500) NOT NULL DEFAULT '',
    resume_url VARCHAR(512) NOT NULL,
    ip_hash CHAR(64) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_career_apps_created (created_at),
    INDEX idx_career_apps_job (job_slug)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
];

let adminSchemaReady = false;

export async function ensureAdminSchema() {
  if (!isDbConfigured() || adminSchemaReady) return;
  const db = await getDbPool();
  for (const sql of ADMIN_TABLE_SQL) {
    await db.query(sql);
  }
  await ensureLeadCrmColumns();
  await ensureRbacSchema();
  adminSchemaReady = true;
}

export async function ensureLeadCrmColumns() {
  if (!isDbConfigured()) return;
  const db = await getDbPool();
  const [rows] = await db.query(
    `SELECT COLUMN_NAME FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'leads'`,
  );
  const names = new Set((rows as Array<{ COLUMN_NAME: string }>).map((r) => r.COLUMN_NAME));
  const alters: string[] = [];
  if (!names.has("status")) alters.push("ADD COLUMN status VARCHAR(32) NOT NULL DEFAULT 'new'");
  if (!names.has("priority"))
    alters.push("ADD COLUMN priority VARCHAR(16) NOT NULL DEFAULT 'medium'");
  if (!names.has("assigned_to")) alters.push("ADD COLUMN assigned_to BIGINT UNSIGNED NULL");
  if (!names.has("follow_up_date")) alters.push("ADD COLUMN follow_up_date DATE NULL");
  if (!names.has("tags")) alters.push("ADD COLUMN tags JSON NULL");
  if (!names.has("attachment_url")) alters.push("ADD COLUMN attachment_url VARCHAR(512) NULL");
  if (!names.has("preferred_language"))
    alters.push("ADD COLUMN preferred_language VARCHAR(16) NULL DEFAULT 'en'");
  if (!names.has("company_name")) alters.push("ADD COLUMN company_name VARCHAR(160) NULL");
  if (!names.has("website")) alters.push("ADD COLUMN website VARCHAR(255) NULL");
  if (!names.has("farm_details")) alters.push("ADD COLUMN farm_details JSON NULL");
  if (!names.has("updated_at"))
    alters.push(
      "ADD COLUMN updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
    );
  if (alters.length) {
    await db.query(`ALTER TABLE leads ${alters.join(", ")}`);
  }
  const indexes = [
    ["idx_leads_status", "status"],
    ["idx_leads_assigned", "assigned_to"],
    ["idx_leads_follow_up", "follow_up_date"],
    ["idx_leads_priority", "priority"],
  ] as const;
  const [idxRows] = await db.query(
    `SELECT INDEX_NAME FROM information_schema.STATISTICS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'leads'`,
  );
  const idxNames = new Set((idxRows as Array<{ INDEX_NAME: string }>).map((r) => r.INDEX_NAME));
  for (const [name, col] of indexes) {
    if (!idxNames.has(name)) {
      await db.query(`CREATE INDEX ${name} ON leads (${col})`);
    }
  }
}

export async function findUserByEmail(email: string) {
  const db = await getDbPool();
  const [rows] = await db.query(
    `SELECT u.*, r.slug AS role, r.name AS role_name
     FROM users u
     LEFT JOIN admin_roles r ON r.id = u.role_id
     WHERE u.email = :email LIMIT 1`,
    { email },
  );
  return ((rows as AdminUserRow[])[0] ?? null) as AdminUserRow | null;
}

export async function findUserById(id: number) {
  const db = await getDbPool();
  const [rows] = await db.query(
    `SELECT u.id, u.name, u.email, u.role_id, r.slug AS role, r.name AS role_name,
            u.created_at, u.updated_at
     FROM users u
     LEFT JOIN admin_roles r ON r.id = u.role_id
     WHERE u.id = :id LIMIT 1`,
    { id },
  );
  return ((rows as AdminUserRow[])[0] ?? null) as AdminUserRow | null;
}

export async function listUsers() {
  const db = await getDbPool();
  const [rows] = await db.query(
    `SELECT u.id, u.name, u.email, u.role_id, r.slug AS role, r.name AS role_name,
            u.created_at, u.updated_at
     FROM users u
     LEFT JOIN admin_roles r ON r.id = u.role_id
     ORDER BY u.name ASC`,
  );
  return rows as AdminUserRow[];
}

export async function createUser(input: {
  name: string;
  email: string;
  password_hash: string;
  roleId: number;
}) {
  const role = await findRoleById(input.roleId);
  if (!role) throw new Error("INVALID_ROLE");
  const db = await getDbPool();
  const [result] = await db.query(
    `INSERT INTO users (name, email, password_hash, role, role_id)
     VALUES (:name, :email, :password_hash, :role, :roleId)`,
    { ...input, role: role.slug },
  );
  return Number((result as { insertId: number }).insertId);
}

export async function updateUser(
  id: number,
  patch: { name?: string; email?: string; roleId?: number; password_hash?: string },
) {
  const db = await getDbPool();
  const fields: string[] = [];
  const params: Record<string, unknown> = { id };
  if (patch.name) {
    fields.push("name = :name");
    params.name = patch.name;
  }
  if (patch.email) {
    fields.push("email = :email");
    params.email = patch.email.trim().toLowerCase();
  }
  if (patch.roleId) {
    const role = await findRoleById(patch.roleId);
    if (!role) throw new Error("INVALID_ROLE");
    fields.push("role_id = :roleId", "role = :role");
    params.roleId = patch.roleId;
    params.role = role.slug;
  }
  if (patch.password_hash) {
    fields.push("password_hash = :password_hash");
    params.password_hash = patch.password_hash;
  }
  if (!fields.length) return;
  await db.query(`UPDATE users SET ${fields.join(", ")} WHERE id = :id`, params as never);
}

export async function countUsersByRoleSlug(slug: string): Promise<number> {
  const db = await getDbPool();
  const [rows] = await db.query(
    `SELECT COUNT(*) AS c
     FROM users u
     JOIN admin_roles r ON r.id = u.role_id
     WHERE r.slug = :slug`,
    { slug },
  );
  return Number((rows as Array<{ c: number }>)[0]?.c ?? 0);
}

export async function deleteUser(id: number): Promise<void> {
  const db = await getDbPool();
  await db.query(`DELETE FROM users WHERE id = :id`, { id });
}

export type ContactFilters = {
  q?: string;
  status?: string;
  priority?: string;
  assignedTo?: string;
  inquiryType?: string;
  language?: string;
  sourcePage?: string;
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
  dir?: "asc" | "desc";
  export?: boolean;
};

export async function listContacts(user: SessionUser, filters: ContactFilters) {
  const db = await getDbPool();
  const page = Math.max(1, filters.page || 1);
  const pageSize = filters.export
    ? Math.min(2000, Math.max(1, filters.pageSize || 2000))
    : Math.min(50, Math.max(10, filters.pageSize || 20));
  const sortMap: Record<string, string> = {
    ticket_id: "l.ticket_id",
    name: "l.name",
    phone: "l.phone",
    email: "l.email",
    topic: "l.topic",
    status: "l.status",
    priority: "l.priority",
    assigned_to: "u.name",
    created_at: "l.created_at",
  };
  const sortCol = sortMap[filters.sort || "created_at"] || "l.created_at";
  const dir = filters.dir === "asc" ? "ASC" : "DESC";

  const where: string[] = ["1=1"];
  const params: Record<string, unknown> = {};

  if (isRestrictedAssignee(user)) {
    where.push("l.assigned_to = :me");
    params.me = user.id;
  }
  if (filters.q) {
    where.push(
      "(l.ticket_id LIKE :q OR l.name LIKE :q OR l.phone LIKE :q OR l.email LIKE :q OR l.message LIKE :q)",
    );
    params.q = `%${filters.q}%`;
  }
  if (filters.status) {
    where.push("l.status = :status");
    params.status = filters.status;
  }
  if (filters.priority) {
    where.push("l.priority = :priority");
    params.priority = filters.priority;
  }
  if (filters.assignedTo === "unassigned") {
    where.push("l.assigned_to IS NULL");
  } else if (filters.assignedTo) {
    where.push("l.assigned_to = :assignedTo");
    params.assignedTo = Number(filters.assignedTo);
  }
  if (filters.inquiryType) {
    where.push("l.topic = :inquiryType");
    params.inquiryType = filters.inquiryType;
  }
  if (filters.language) {
    where.push("l.preferred_language = :language");
    params.language = filters.language;
  }
  if (filters.sourcePage) {
    where.push("l.source_page LIKE :sourcePage");
    params.sourcePage = `%${filters.sourcePage}%`;
  }
  if (filters.from) {
    where.push("l.created_at >= :from");
    params.from = `${filters.from} 00:00:00`;
  }
  if (filters.to) {
    where.push("l.created_at <= :to");
    params.to = `${filters.to} 23:59:59`;
  }

  const whereSql = where.join(" AND ");
  const [countRows] = await db.query(
    `SELECT COUNT(*) AS total FROM leads l WHERE ${whereSql}`,
    params as never,
  );
  const total = Number((countRows as Array<{ total: number }>)[0]?.total ?? 0);
  params.limit = pageSize;
  params.offset = (page - 1) * pageSize;

  const [rows] = await db.query(
    `SELECT l.*, u.name AS assignee_name
     FROM leads l
     LEFT JOIN users u ON u.id = l.assigned_to
     WHERE ${whereSql}
     ORDER BY ${sortCol} ${dir}
     LIMIT :limit OFFSET :offset`,
    params as never,
  );

  return {
    rows: rows as ContactRequestRow[],
    total,
    page,
    pageSize,
  };
}

export async function getContact(user: SessionUser, id: number) {
  const db = await getDbPool();
  const [rows] = await db.query(
    `SELECT l.*, u.name AS assignee_name
     FROM leads l
     LEFT JOIN users u ON u.id = l.assigned_to
     WHERE l.id = :id LIMIT 1`,
    { id },
  );
  const row = (rows as ContactRequestRow[])[0];
  if (!row) return null;
  if (isRestrictedAssignee(user) && row.assigned_to !== user.id) return null;
  return row;
}

export async function logActivity(
  requestId: number,
  userId: number | null,
  action: string,
  payload?: unknown,
) {
  const db = await getDbPool();
  await db.query(
    `INSERT INTO request_activity (request_id, user_id, action, payload)
     VALUES (:request_id, :user_id, :action, :payload)`,
    {
      request_id: requestId,
      user_id: userId,
      action,
      payload: payload ? JSON.stringify(payload) : null,
    },
  );
}

export async function listActivity(requestId: number) {
  const db = await getDbPool();
  const [rows] = await db.query(
    `SELECT a.*, u.name AS actor_name
     FROM request_activity a
     LEFT JOIN users u ON u.id = a.user_id
     WHERE a.request_id = :requestId
     ORDER BY a.created_at DESC, a.id DESC`,
    { requestId },
  );
  return rows as ActivityRow[];
}

export async function listNotes(requestId: number) {
  const db = await getDbPool();
  const [rows] = await db.query(
    `SELECT n.*, u.name AS author_name
     FROM request_notes n
     LEFT JOIN users u ON u.id = n.user_id
     WHERE n.request_id = :requestId
     ORDER BY n.created_at DESC`,
    { requestId },
  );
  return rows as NoteRow[];
}

export async function addNote(requestId: number, userId: number, body: string) {
  const db = await getDbPool();
  await db.query(
    `INSERT INTO request_notes (request_id, user_id, body) VALUES (:request_id, :user_id, :body)`,
    { request_id: requestId, user_id: userId, body },
  );
  await logActivity(requestId, userId, "note_added");
}

export async function updateContact(
  user: SessionUser,
  id: number,
  patch: {
    status?: RequestStatus;
    priority?: RequestPriority;
    assigned_to?: number | null;
    follow_up_date?: string | null;
  },
) {
  const current = await getContact(user, id);
  if (!current) return null;
  const db = await getDbPool();
  const fields: string[] = [];
  const params: Record<string, unknown> = { id };

  if (patch.status && patch.status !== current.status) {
    fields.push("status = :status");
    params.status = patch.status;
    await logActivity(id, user.id, "status_changed", {
      from: current.status,
      to: patch.status,
    });
  }
  if (patch.priority && patch.priority !== current.priority) {
    fields.push("priority = :priority");
    params.priority = patch.priority;
    await logActivity(id, user.id, "priority_changed", {
      from: current.priority,
      to: patch.priority,
    });
  }
  if (patch.assigned_to !== undefined && patch.assigned_to !== current.assigned_to) {
    fields.push("assigned_to = :assigned_to");
    params.assigned_to = patch.assigned_to;
    if (patch.assigned_to && current.status === "new") {
      fields.push("status = :auto_status");
      params.auto_status = "assigned";
    }
    const assignee = patch.assigned_to ? await findUserById(patch.assigned_to) : null;
    await logActivity(id, user.id, patch.assigned_to ? "assigned" : "unassigned", {
      to: assignee?.name ?? null,
      toId: patch.assigned_to,
    });
  }
  if (patch.follow_up_date !== undefined) {
    fields.push("follow_up_date = :follow_up_date");
    params.follow_up_date = patch.follow_up_date || null;
    await logActivity(id, user.id, "follow_up_scheduled", { date: patch.follow_up_date });
  }

  if (!fields.length) return current;
  await db.query(`UPDATE leads SET ${fields.join(", ")} WHERE id = :id`, params as never);
  return getContact(user, id);
}

export async function bulkUpdate(
  user: SessionUser,
  ids: number[],
  patch: { status?: RequestStatus; assigned_to?: number | null },
) {
  for (const id of ids) {
    await updateContact(user, id, patch);
  }
}

export async function setAttachment(user: SessionUser, id: number, url: string) {
  const current = await getContact(user, id);
  if (!current) return null;
  const db = await getDbPool();
  await db.query(`UPDATE leads SET attachment_url = :url WHERE id = :id`, { url, id });
  await logActivity(id, user.id, "attachment_uploaded");
  return getContact(user, id);
}

export async function dashboardKpis(user: SessionUser): Promise<Record<string, number>> {
  const db = await getDbPool();
  const scope = isRestrictedAssignee(user) ? "assigned_to = :me" : "1=1";
  const params = { me: user.id };
  const [rows] = await db.query(
    `SELECT
      COUNT(*) AS total,
      SUM(CASE WHEN DATE(created_at) = CURDATE() THEN 1 ELSE 0 END) AS newToday,
      SUM(CASE WHEN follow_up_date IS NOT NULL AND follow_up_date <= CURDATE()
        AND status NOT IN ('converted','closed','spam') THEN 1 ELSE 0 END) AS pendingFollowUps,
      SUM(CASE WHEN assigned_to IS NOT NULL AND status NOT IN ('converted','closed','spam') THEN 1 ELSE 0 END) AS assigned,
      SUM(CASE WHEN status = 'converted' THEN 1 ELSE 0 END) AS converted,
      SUM(CASE WHEN status = 'closed' THEN 1 ELSE 0 END) AS closed,
      SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) AS unreadNew,
      SUM(CASE WHEN follow_up_date = CURDATE() AND status NOT IN ('converted','closed','spam') THEN 1 ELSE 0 END) AS dueToday,
      SUM(CASE WHEN follow_up_date < CURDATE() AND status NOT IN ('converted','closed','spam') THEN 1 ELSE 0 END) AS overdue
     FROM leads
     WHERE ${scope}`,
    params,
  );
  return ((rows as Array<Record<string, number>>)[0] ?? {}) as Record<string, number>;
}

export async function dashboardCharts(user: SessionUser) {
  const db = await getDbPool();
  const scope = isRestrictedAssignee(user) ? "assigned_to = :me" : "1=1";
  const params = { me: user.id };

  const [byDay] = await db.query(
    `SELECT DATE(created_at) AS day, COUNT(*) AS count
     FROM leads WHERE ${scope} AND created_at >= DATE_SUB(CURDATE(), INTERVAL 13 DAY)
     GROUP BY DATE(created_at) ORDER BY day ASC`,
    params,
  );
  const [byCategory] = await db.query(
    `SELECT topic AS name, COUNT(*) AS count FROM leads WHERE ${scope} GROUP BY topic ORDER BY count DESC`,
    params,
  );
  const [byStatus] = await db.query(
    `SELECT status AS name, COUNT(*) AS count FROM leads WHERE ${scope} GROUP BY status`,
    params,
  );
  const [monthly] = await db.query(
    `SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(*) AS count,
            SUM(CASE WHEN status = 'converted' THEN 1 ELSE 0 END) AS converted
     FROM leads WHERE ${scope} AND created_at >= DATE_SUB(CURDATE(), INTERVAL 11 MONTH)
     GROUP BY DATE_FORMAT(created_at, '%Y-%m') ORDER BY month ASC`,
    params,
  );
  const [team] = await db.query(
    `SELECT u.name AS name, COUNT(*) AS count
     FROM leads l JOIN users u ON u.id = l.assigned_to
     WHERE ${isRestrictedAssignee(user) ? "l.assigned_to = :me" : "1=1"}
     GROUP BY u.id, u.name ORDER BY count DESC LIMIT 8`,
    params,
  );

  const kpis = (await dashboardKpis(user)) ?? {};
  const conversionRate =
    Number(kpis.total) > 0 ? Math.round((Number(kpis.converted) / Number(kpis.total)) * 100) : 0;

  return { byDay, byCategory, byStatus, monthly, team, conversionRate };
}

export async function analyticsReport(user: SessionUser) {
  const db = await getDbPool();
  const scope = isRestrictedAssignee(user) ? "assigned_to = :me" : "1=1";
  const params = { me: user.id };
  const [windows] = await db.query(
    `SELECT
      SUM(CASE WHEN created_at >= CURDATE() THEN 1 ELSE 0 END) AS daily,
      SUM(CASE WHEN created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) THEN 1 ELSE 0 END) AS weekly,
      SUM(CASE WHEN created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 1 ELSE 0 END) AS monthly
     FROM leads WHERE ${scope}`,
    params,
  );
  const charts = await dashboardCharts(user);
  const kpis = await dashboardKpis(user);
  return { windows: (windows as object[])[0], charts, kpis };
}

export async function listCategories(activeOnly = false) {
  const db = await getDbPool();
  const [rows] = await db.query(
    `SELECT * FROM inquiry_categories ${activeOnly ? "WHERE active = 1" : ""} ORDER BY sort_order ASC, id ASC`,
  );
  return rows as InquiryCategoryRow[];
}

export async function upsertCategory(input: {
  id?: number;
  slug: string;
  label: string;
  active: boolean;
  sort_order: number;
}) {
  const db = await getDbPool();
  if (input.id) {
    await db.query(
      `UPDATE inquiry_categories SET slug=:slug, label=:label, active=:active, sort_order=:sort_order WHERE id=:id`,
      { ...input, active: input.active ? 1 : 0 },
    );
    return input.id;
  }
  const [result] = await db.query(
    `INSERT INTO inquiry_categories (slug, label, active, sort_order)
     VALUES (:slug, :label, :active, :sort_order)`,
    { ...input, active: input.active ? 1 : 0 },
  );
  return Number((result as { insertId: number }).insertId);
}

export async function getSettings(): Promise<AdminSettingsPayload> {
  const db = await getDbPool();
  const [rows] = await db.query(`SELECT payload FROM admin_settings WHERE id = 1 LIMIT 1`);
  const payload = (rows as Array<{ payload: unknown }>)[0]?.payload;
  const parsed = parseJson(payload, {} as Partial<AdminSettingsPayload>);
  return {
    ...DEFAULT_ADMIN_SETTINGS,
    ...parsed,
    businessHours: { ...DEFAULT_ADMIN_SETTINGS.businessHours, ...parsed.businessHours },
    smtp: { ...DEFAULT_ADMIN_SETTINGS.smtp, ...parsed.smtp },
  };
}

export async function saveSettings(user: SessionUser, payload: AdminSettingsPayload) {
  if (!canManageSettings(user)) throw new Error("FORBIDDEN");
  const db = await getDbPool();
  await db.query(
    `INSERT INTO admin_settings (id, payload) VALUES (1, :payload)
     ON DUPLICATE KEY UPDATE payload = :payload`,
    { payload: JSON.stringify(payload) },
  );
}

export function serializeContact(row: ContactRequestRow) {
  return {
    ...row,
    tags: parseJson(row.tags, [] as string[]),
    farm_details: parseJson(row.farm_details, {
      acreage: row.acreage,
      crop: row.crop,
      district: row.district,
    }),
  };
}

export type NewsletterSignupRow = {
  id: number;
  contact: string;
  contact_type: "email" | "phone";
  source_page: string;
  created_at: string;
};

let newsletterSchemaReady = false;

export async function ensureNewsletterSchema() {
  if (!isDbConfigured()) return;
  await ensureAdminSchema();
  if (newsletterSchemaReady) return;
  const db = await getDbPool();
  await db.query(
    `CREATE TABLE IF NOT EXISTS newsletter_signups (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      contact VARCHAR(160) NOT NULL,
      contact_type ENUM('email', 'phone') NOT NULL,
      source_page VARCHAR(255) NOT NULL DEFAULT '/kisaan-mall',
      ip_hash CHAR(64) NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_newsletter_source_created (source_page, created_at),
      INDEX idx_newsletter_contact (contact, source_page)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  );
  newsletterSchemaReady = true;
}

export async function insertNewsletterSignup(input: {
  contact: string;
  contact_type: "email" | "phone";
  source_page: string;
  ip_hash: string;
}) {
  const db = await getDbPool();
  await db.query(
    `INSERT INTO newsletter_signups (contact, contact_type, source_page, ip_hash)
     VALUES (:contact, :contact_type, :source_page, :ip_hash)`,
    input,
  );
}

export async function hasRecentNewsletterSignup(
  contact: string,
  sourcePage: string,
): Promise<boolean> {
  const db = await getDbPool();
  const [rows] = await db.query(
    `SELECT id FROM newsletter_signups
     WHERE contact = :contact AND source_page = :sourcePage
       AND created_at > (NOW() - INTERVAL 24 HOUR)
     LIMIT 1`,
    { contact, sourcePage },
  );
  return Boolean((rows as Array<{ id: number }>)[0]?.id);
}

export async function countNewsletterSignups(sourcePage = "/kisaan-mall"): Promise<number> {
  if (!isDbConfigured()) {
    const { mockNewsletterSignups } = await import("@/server/cms-memory");
    return mockNewsletterSignups.filter((s) => s.source_page === sourcePage).length;
  }
  await ensureNewsletterSchema();
  const db = await getDbPool();
  const [rows] = await db.query(
    `SELECT COUNT(*) AS c FROM newsletter_signups WHERE source_page = :sourcePage`,
    { sourcePage },
  );
  return Number((rows as Array<{ c: number }>)[0]?.c ?? 0);
}

export async function listNewsletterSignups(
  sourcePage = "/kisaan-mall",
  limit = 200,
): Promise<NewsletterSignupRow[]> {
  if (!isDbConfigured()) {
    const { mockNewsletterSignups } = await import("@/server/cms-memory");
    return mockNewsletterSignups.filter((s) => s.source_page === sourcePage).slice(0, limit);
  }
  await ensureNewsletterSchema();
  const db = await getDbPool();
  const [rows] = await db.query(
    `SELECT id, contact, contact_type, source_page, created_at
     FROM newsletter_signups
     WHERE source_page = :sourcePage
     ORDER BY created_at DESC
     LIMIT :limit`,
    { sourcePage, limit },
  );
  return (rows as Array<Record<string, unknown>>).map((row) => ({
    id: Number(row.id),
    contact: String(row.contact),
    contact_type: row.contact_type as "email" | "phone",
    source_page: String(row.source_page),
    created_at:
      row.created_at instanceof Date
        ? row.created_at.toISOString()
        : String(row.created_at ?? new Date().toISOString()),
  }));
}

export type CareerApplicationRow = {
  id: number;
  job_slug: string;
  job_title: string;
  name: string;
  phone: string;
  email: string;
  experience_band: string;
  crop_experience: string;
  resume_url: string;
  created_at: string;
};

let careerAppsSchemaReady = false;

export async function ensureCareerApplicationsSchema() {
  if (!isDbConfigured()) return;
  await ensureAdminSchema();
  if (careerAppsSchemaReady) return;
  const db = await getDbPool();
  await db.query(
    `CREATE TABLE IF NOT EXISTS career_applications (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      job_slug VARCHAR(64) NOT NULL,
      job_title VARCHAR(200) NOT NULL,
      name VARCHAR(160) NOT NULL,
      phone VARCHAR(32) NOT NULL,
      email VARCHAR(160) NOT NULL,
      experience_band VARCHAR(80) NOT NULL DEFAULT '',
      crop_experience VARCHAR(500) NOT NULL DEFAULT '',
      resume_url VARCHAR(512) NOT NULL,
      ip_hash CHAR(64) NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_career_apps_created (created_at),
      INDEX idx_career_apps_job (job_slug)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  );
  careerAppsSchemaReady = true;
}

export async function insertCareerApplication(input: {
  job_slug: string;
  job_title: string;
  name: string;
  phone: string;
  email: string;
  experience_band: string;
  crop_experience: string;
  resume_url: string;
  ip_hash: string;
}) {
  const db = await getDbPool();
  await db.query(
    `INSERT INTO career_applications
     (job_slug, job_title, name, phone, email, experience_band, crop_experience, resume_url, ip_hash)
     VALUES (:job_slug, :job_title, :name, :phone, :email, :experience_band, :crop_experience, :resume_url, :ip_hash)`,
    input,
  );
}

export async function countCareerApplications(): Promise<number> {
  if (!isDbConfigured()) {
    const { mockCareerApplications } = await import("@/server/cms-memory");
    return mockCareerApplications.length;
  }
  await ensureCareerApplicationsSchema();
  const db = await getDbPool();
  const [rows] = await db.query(`SELECT COUNT(*) AS c FROM career_applications`);
  return Number((rows as Array<{ c: number }>)[0]?.c ?? 0);
}

export async function listCareerApplications(limit = 200): Promise<CareerApplicationRow[]> {
  if (!isDbConfigured()) {
    const { mockCareerApplications } = await import("@/server/cms-memory");
    return mockCareerApplications.slice(0, limit);
  }
  await ensureCareerApplicationsSchema();
  const db = await getDbPool();
  const [rows] = await db.query(
    `SELECT id, job_slug, job_title, name, phone, email, experience_band, crop_experience, resume_url, created_at
     FROM career_applications
     ORDER BY created_at DESC
     LIMIT :limit`,
    { limit },
  );
  return (rows as Array<Record<string, unknown>>).map((row) => ({
    id: Number(row.id),
    job_slug: String(row.job_slug),
    job_title: String(row.job_title),
    name: String(row.name),
    phone: String(row.phone),
    email: String(row.email),
    experience_band: String(row.experience_band ?? ""),
    crop_experience: String(row.crop_experience ?? ""),
    resume_url: String(row.resume_url),
    created_at:
      row.created_at instanceof Date
        ? row.created_at.toISOString()
        : String(row.created_at ?? new Date().toISOString()),
  }));
}
