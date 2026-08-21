import { getDbPool, isDbConfigured } from "@/server/db";
import { ensureCmsSchema } from "@/server/cms-queries";
import { getFallbackSeedTeam, TEAM_CMS_FALLBACK } from "@/data/team-fallback";
import type {
  CmsIconKey,
  CmsListFilters,
  CmsStatus,
  CmsTeamMemberPayload,
  CmsTeamMemberRow,
  TeamCmsData,
  TeamCmsMember,
} from "@/lib/cms-types";

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

function toIso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") return value;
  return new Date().toISOString();
}

function teamPayloadFromRow(row: Record<string, unknown>): CmsTeamMemberPayload {
  return {
    slug: String(row.slug),
    nameEn: String(row.name_en),
    nameHi: String(row.name_hi),
    roleEn: String(row.role_en),
    roleHi: String(row.role_hi),
    focusEn: String(row.focus_en),
    focusHi: String(row.focus_hi),
    tagEn: String(row.tag_en),
    tagHi: String(row.tag_hi),
    bioEn: String(row.bio_en),
    bioHi: String(row.bio_hi),
    quoteEn: String(row.quote_en),
    quoteHi: String(row.quote_hi),
    pubEn: String(row.pub_en),
    pubHi: String(row.pub_hi),
    keyAchEn: parseJson<string[]>(row.key_ach_en, []),
    keyAchHi: parseJson<string[]>(row.key_ach_hi, []),
    imageUrl: String(row.image_url),
    iconKey: row.icon_key as CmsIconKey,
    showInBanner: Boolean(row.show_in_banner),
    bannerBadgeEn: String(row.banner_badge_en ?? ""),
    bannerBadgeHi: String(row.banner_badge_hi ?? ""),
  };
}

function hasChanges<T extends object>(draft: T, live: T | null): boolean {
  if (!live) return true;
  return JSON.stringify(draft) !== JSON.stringify(live);
}

export function mapTeamRow(row: Record<string, unknown>): CmsTeamMemberRow {
  const draft = teamPayloadFromRow(row);
  const livePayload = parseJson<CmsTeamMemberPayload | null>(row.live_payload, null);
  return {
    id: Number(row.id),
    ...draft,
    sortOrder: Number(row.sort_order),
    status: row.status as CmsStatus,
    livePayload,
    publishedAt: row.published_at ? toIso(row.published_at) : null,
    updatedAt: toIso(row.updated_at),
    hasUnpublishedChanges: hasChanges(draft, livePayload),
  };
}

const TEAM_TABLE_SQL = `CREATE TABLE IF NOT EXISTS cms_team_members (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(64) NOT NULL UNIQUE,
  name_en VARCHAR(120) NOT NULL,
  name_hi VARCHAR(120) NOT NULL,
  role_en VARCHAR(160) NOT NULL,
  role_hi VARCHAR(160) NOT NULL,
  focus_en VARCHAR(200) NOT NULL,
  focus_hi VARCHAR(200) NOT NULL,
  tag_en VARCHAR(160) NOT NULL,
  tag_hi VARCHAR(160) NOT NULL,
  bio_en TEXT NOT NULL,
  bio_hi TEXT NOT NULL,
  quote_en TEXT NOT NULL,
  quote_hi TEXT NOT NULL,
  pub_en TEXT NOT NULL,
  pub_hi TEXT NOT NULL,
  key_ach_en JSON NOT NULL,
  key_ach_hi JSON NOT NULL,
  image_url VARCHAR(512) NOT NULL,
  icon_key ENUM('tractor','plant','chart','handshake','warehouse','drop','cap','users') NOT NULL DEFAULT 'users',
  show_in_banner TINYINT(1) NOT NULL DEFAULT 0,
  banner_badge_en VARCHAR(64) NOT NULL DEFAULT '',
  banner_badge_hi VARCHAR(64) NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  status ENUM('draft','published','archived') NOT NULL DEFAULT 'published',
  live_payload JSON NULL,
  published_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_cms_team_status (status, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`;

let teamSchemaReady = false;

export async function ensureTeamSchema() {
  if (!isDbConfigured()) return;
  await ensureCmsSchema();
  if (teamSchemaReady) return;
  const db = await getDbPool();
  await db.query(TEAM_TABLE_SQL);
  await seedTeamIfEmpty();
  teamSchemaReady = true;
}

async function seedTeamIfEmpty() {
  const db = await getDbPool();
  const [rows] = await db.query(`SELECT COUNT(*) AS c FROM cms_team_members`);
  const count = Number((rows as Array<{ c: number }>)[0]?.c ?? 0);
  if (count > 0) return;

  for (const m of getFallbackSeedTeam()) {
    const payload: CmsTeamMemberPayload = {
      slug: m.slug,
      nameEn: m.nameEn,
      nameHi: m.nameHi,
      roleEn: m.roleEn,
      roleHi: m.roleHi,
      focusEn: m.focusEn,
      focusHi: m.focusHi,
      tagEn: m.tagEn,
      tagHi: m.tagHi,
      bioEn: m.bioEn,
      bioHi: m.bioHi,
      quoteEn: m.quoteEn,
      quoteHi: m.quoteHi,
      pubEn: m.pubEn,
      pubHi: m.pubHi,
      keyAchEn: m.keyAchEn,
      keyAchHi: m.keyAchHi,
      imageUrl: m.imageUrl,
      iconKey: m.iconKey,
      showInBanner: m.showInBanner,
      bannerBadgeEn: m.bannerBadgeEn,
      bannerBadgeHi: m.bannerBadgeHi,
    };
    await db.query(
      `INSERT INTO cms_team_members
       (slug, name_en, name_hi, role_en, role_hi, focus_en, focus_hi, tag_en, tag_hi,
        bio_en, bio_hi, quote_en, quote_hi, pub_en, pub_hi, key_ach_en, key_ach_hi,
        image_url, icon_key, show_in_banner, banner_badge_en, banner_badge_hi,
        sort_order, status, live_payload, published_at)
       VALUES (:slug, :nameEn, :nameHi, :roleEn, :roleHi, :focusEn, :focusHi, :tagEn, :tagHi,
        :bioEn, :bioHi, :quoteEn, :quoteHi, :pubEn, :pubHi, :keyAchEn, :keyAchHi,
        :imageUrl, :iconKey, :showInBanner, :bannerBadgeEn, :bannerBadgeHi,
        :sortOrder, 'published', :livePayload, NOW())`,
      {
        ...payload,
        keyAchEn: JSON.stringify(payload.keyAchEn),
        keyAchHi: JSON.stringify(payload.keyAchHi),
        showInBanner: payload.showInBanner ? 1 : 0,
        sortOrder: m.sortOrder,
        livePayload: JSON.stringify(payload),
      },
    );
  }
}

function teamToPublic(row: CmsTeamMemberRow, useLive: boolean, lang: "en" | "hi"): TeamCmsMember {
  const p = useLive && row.livePayload ? row.livePayload : row;
  const isHi = lang === "hi";
  return {
    id: p.slug,
    name: isHi ? p.nameHi : p.nameEn,
    role: isHi ? p.roleHi : p.roleEn,
    focus: isHi ? p.focusHi : p.focusEn,
    tag: isHi ? p.tagHi : p.tagEn,
    iconKey: p.iconKey,
    image: p.imageUrl,
    bio: isHi ? p.bioHi : p.bioEn,
    keyAch: isHi ? p.keyAchHi : p.keyAchEn,
    pub: isHi ? p.pubHi : p.pubEn,
    quote: isHi ? p.quoteHi : p.quoteEn,
    showInBanner: p.showInBanner,
    bannerBadge: isHi ? p.bannerBadgeHi : p.bannerBadgeEn,
  };
}

export function buildTeamCmsFromRows(rows: CmsTeamMemberRow[], preview: boolean): TeamCmsData {
  const useLive = !preview;
  const active = rows
    .filter((r) => r.status !== "archived" && (preview || r.status === "published"))
    .sort((a, b) => a.sortOrder - b.sortOrder);
  return {
    membersEn: active.map((r) => teamToPublic(r, useLive, "en")),
    membersHi: active.map((r) => teamToPublic(r, useLive, "hi")),
  };
}

export async function fetchTeamCms(preview = false): Promise<TeamCmsData> {
  if (!isDbConfigured()) {
    const { mockTeam } = await import("@/server/cms-memory");
    return buildTeamCmsFromRows(mockTeam, preview);
  }
  try {
    await ensureTeamSchema();
    const db = await getDbPool();
    const [teamRows] = await db.query(`SELECT * FROM cms_team_members ORDER BY sort_order ASC`);
    const team = (teamRows as Record<string, unknown>[]).map(mapTeamRow);
    if (!team.length) return TEAM_CMS_FALLBACK;
    const data = buildTeamCmsFromRows(team, preview);
    if (!data.membersEn.length) return TEAM_CMS_FALLBACK;
    return data;
  } catch (err) {
    console.warn("fetchTeamCms fallback:", err);
    return TEAM_CMS_FALLBACK;
  }
}

function matchesQ(q: string | undefined, ...fields: string[]) {
  if (!q?.trim()) return true;
  const needle = q.trim().toLowerCase();
  return fields.some((f) => f.toLowerCase().includes(needle));
}

export async function listCmsTeam(filters: CmsListFilters = {}): Promise<CmsTeamMemberRow[]> {
  if (!isDbConfigured()) return [];
  await ensureTeamSchema();
  const db = await getDbPool();
  let sql = `SELECT * FROM cms_team_members WHERE 1=1`;
  const params: Record<string, unknown> = {};
  if (filters.status && filters.status !== "all") {
    sql += ` AND status = :status`;
    params.status = filters.status;
  } else {
    sql += ` AND status != 'archived'`;
  }
  sql += ` ORDER BY sort_order ASC`;
  const [rows] = await db.query(sql, params);
  return (rows as Record<string, unknown>[])
    .map(mapTeamRow)
    .filter((r) => matchesQ(filters.q, r.nameEn, r.nameHi, r.slug, r.roleEn, r.roleHi));
}

export async function saveCmsTeamMember(
  data: Partial<CmsTeamMemberPayload> & { id?: number; sortOrder?: number },
): Promise<CmsTeamMemberRow> {
  await ensureTeamSchema();
  const db = await getDbPool();
  const params = {
    ...data,
    keyAchEn: JSON.stringify(data.keyAchEn ?? []),
    keyAchHi: JSON.stringify(data.keyAchHi ?? []),
    showInBanner: data.showInBanner ? 1 : 0,
    sortOrder: data.sortOrder ?? null,
  };

  if (data.id) {
    await db.query(
      `UPDATE cms_team_members SET
        slug = :slug, name_en = :nameEn, name_hi = :nameHi, role_en = :roleEn, role_hi = :roleHi,
        focus_en = :focusEn, focus_hi = :focusHi, tag_en = :tagEn, tag_hi = :tagHi,
        bio_en = :bioEn, bio_hi = :bioHi, quote_en = :quoteEn, quote_hi = :quoteHi,
        pub_en = :pubEn, pub_hi = :pubHi, key_ach_en = :keyAchEn, key_ach_hi = :keyAchHi,
        image_url = :imageUrl, icon_key = :iconKey, show_in_banner = :showInBanner,
        banner_badge_en = :bannerBadgeEn, banner_badge_hi = :bannerBadgeHi,
        sort_order = COALESCE(:sortOrder, sort_order), status = IF(status = 'archived', 'draft', status)
       WHERE id = :id`,
      params,
    );
    const [rows] = await db.query(`SELECT * FROM cms_team_members WHERE id = :id`, { id: data.id });
    return mapTeamRow((rows as Record<string, unknown>[])[0]!);
  }

  const [maxRows] = await db.query(
    `SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM cms_team_members`,
  );
  const sortOrder = Number((maxRows as Array<{ next: number }>)[0]?.next ?? 0);
  const [result] = await db.query(
    `INSERT INTO cms_team_members
     (slug, name_en, name_hi, role_en, role_hi, focus_en, focus_hi, tag_en, tag_hi,
      bio_en, bio_hi, quote_en, quote_hi, pub_en, pub_hi, key_ach_en, key_ach_hi,
      image_url, icon_key, show_in_banner, banner_badge_en, banner_badge_hi, sort_order, status)
     VALUES (:slug, :nameEn, :nameHi, :roleEn, :roleHi, :focusEn, :focusHi, :tagEn, :tagHi,
      :bioEn, :bioHi, :quoteEn, :quoteHi, :pubEn, :pubHi, :keyAchEn, :keyAchHi,
      :imageUrl, :iconKey, :showInBanner, :bannerBadgeEn, :bannerBadgeHi, :sortOrder, 'draft')`,
    {
      slug: data.slug ?? `member-${Date.now()}`,
      nameEn: data.nameEn ?? "",
      nameHi: data.nameHi ?? "",
      roleEn: data.roleEn ?? "",
      roleHi: data.roleHi ?? "",
      focusEn: data.focusEn ?? "",
      focusHi: data.focusHi ?? "",
      tagEn: data.tagEn ?? "",
      tagHi: data.tagHi ?? "",
      bioEn: data.bioEn ?? "",
      bioHi: data.bioHi ?? "",
      quoteEn: data.quoteEn ?? "",
      quoteHi: data.quoteHi ?? "",
      pubEn: data.pubEn ?? "",
      pubHi: data.pubHi ?? "",
      keyAchEn: JSON.stringify(data.keyAchEn ?? []),
      keyAchHi: JSON.stringify(data.keyAchHi ?? []),
      imageUrl: data.imageUrl ?? "",
      iconKey: data.iconKey ?? "users",
      showInBanner: data.showInBanner ? 1 : 0,
      bannerBadgeEn: data.bannerBadgeEn ?? "",
      bannerBadgeHi: data.bannerBadgeHi ?? "",
      sortOrder,
    },
  );
  const insertId = (result as { insertId: number }).insertId;
  const [rows] = await db.query(`SELECT * FROM cms_team_members WHERE id = :id`, { id: insertId });
  return mapTeamRow((rows as Record<string, unknown>[])[0]!);
}

export async function publishCmsTeamMember(id: number) {
  await ensureTeamSchema();
  const db = await getDbPool();
  const [rows] = await db.query(`SELECT * FROM cms_team_members WHERE id = :id`, { id });
  const row = (rows as Record<string, unknown>[])[0];
  if (!row) throw new Error("NOT_FOUND");
  const payload = teamPayloadFromRow(row);
  await db.query(
    `UPDATE cms_team_members SET status = 'published', live_payload = :livePayload, published_at = NOW() WHERE id = :id`,
    { id, livePayload: JSON.stringify(payload) },
  );
  const [updated] = await db.query(`SELECT * FROM cms_team_members WHERE id = :id`, { id });
  return mapTeamRow((updated as Record<string, unknown>[])[0]!);
}

export async function unpublishCmsTeamMember(id: number) {
  await ensureTeamSchema();
  const db = await getDbPool();
  await db.query(`UPDATE cms_team_members SET status = 'draft' WHERE id = :id`, { id });
  const [rows] = await db.query(`SELECT * FROM cms_team_members WHERE id = :id`, { id });
  const row = (rows as Record<string, unknown>[])[0];
  if (!row) throw new Error("NOT_FOUND");
  return mapTeamRow(row);
}

export async function archiveCmsTeamMember(id: number) {
  await ensureTeamSchema();
  const db = await getDbPool();
  await db.query(`UPDATE cms_team_members SET status = 'archived' WHERE id = :id`, { id });
}

export async function reorderCmsTeam(ids: number[]) {
  await ensureTeamSchema();
  const db = await getDbPool();
  for (let i = 0; i < ids.length; i++) {
    await db.query(`UPDATE cms_team_members SET sort_order = :order WHERE id = :id`, {
      id: ids[i],
      order: i,
    });
  }
}
