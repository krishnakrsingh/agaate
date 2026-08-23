import { getDbPool, isDbConfigured } from "@/server/db";
import { ensureAdminSchema } from "@/server/admin-queries";
import {
  getFallbackSeedLogos,
  getFallbackSeedStats,
  getFallbackSeedStories,
  HOMEPAGE_CMS_FALLBACK,
} from "@/data/homepage-fallback";
import type {
  CmsBrandGroup,
  CmsIconKey,
  CmsListFilters,
  CmsLogoPayload,
  CmsLogoRow,
  CmsOverview,
  CmsStatPayload,
  CmsStatRow,
  CmsStatus,
  CmsStoryPayload,
  CmsStoryRow,
  HomeCmsAppLinks,
  HomeCmsAgriParkTour,
  CmsSiteConfig,
  HomeCmsData,
  HomeCmsLogo,
  HomeCmsStat,
  HomeCmsStory,
  DEFAULT_CMS_SITE_CONFIG,
  DEFAULT_HOME_CMS_APP_LINKS,
  DEFAULT_HOME_CMS_AGRI_PARK_TOUR,
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

function statPayloadFromRow(row: Record<string, unknown>): CmsStatPayload {
  return {
    slug: String(row.slug),
    iconKey: row.icon_key as CmsIconKey,
    numValue: Number(row.num_value),
    prefix: row.prefix ? String(row.prefix) : undefined,
    suffixEn: String(row.suffix_en),
    suffixHi: String(row.suffix_hi),
    labelEn: String(row.label_en),
    labelHi: String(row.label_hi),
  };
}

function logoPayloadFromRow(row: Record<string, unknown>): CmsLogoPayload {
  return {
    name: String(row.name),
    group: row.logo_group as CmsBrandGroup,
    imageUrl: String(row.image_url),
  };
}

function storyPayloadFromRow(row: Record<string, unknown>): CmsStoryPayload {
  return {
    slug: String(row.slug),
    nameEn: String(row.name_en),
    nameHi: String(row.name_hi),
    roleEn: String(row.role_en),
    roleHi: String(row.role_hi),
    locationEn: String(row.location_en),
    locationHi: String(row.location_hi),
    acresEn: String(row.acres_en),
    acresHi: String(row.acres_hi),
    cropEn: String(row.crop_en),
    cropHi: String(row.crop_hi),
    quoteEn: String(row.quote_en),
    quoteHi: String(row.quote_hi),
    badgeEn: String(row.badge_en),
    badgeHi: String(row.badge_hi),
    thumbnailUrl: String(row.thumbnail_url),
    videoUrl: String(row.video_url),
  };
}

function hasChanges<T extends object>(draft: T, live: T | null): boolean {
  if (!live) return true;
  return JSON.stringify(draft) !== JSON.stringify(live);
}

function mapStatRow(row: Record<string, unknown>): CmsStatRow {
  const draft = statPayloadFromRow(row);
  const livePayload = parseJson<CmsStatPayload | null>(row.live_payload, null);
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

function mapLogoRow(row: Record<string, unknown>): CmsLogoRow {
  const draft = logoPayloadFromRow(row);
  const livePayload = parseJson<CmsLogoPayload | null>(row.live_payload, null);
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

function mapStoryRow(row: Record<string, unknown>): CmsStoryRow {
  const draft = storyPayloadFromRow(row);
  const livePayload = parseJson<CmsStoryPayload | null>(row.live_payload, null);
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

const CMS_TABLE_SQL = [
  `CREATE TABLE IF NOT EXISTS cms_stats (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(64) NOT NULL UNIQUE,
    icon_key ENUM('tractor','plant','chart','handshake','warehouse','drop','cap','users') NOT NULL,
    num_value BIGINT NOT NULL DEFAULT 0,
    prefix VARCHAR(16) NULL,
    suffix_en VARCHAR(32) NOT NULL DEFAULT '',
    suffix_hi VARCHAR(32) NOT NULL DEFAULT '',
    label_en VARCHAR(160) NOT NULL,
    label_hi VARCHAR(160) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    status ENUM('draft','published','archived') NOT NULL DEFAULT 'published',
    live_payload JSON NULL,
    published_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_cms_stats_status (status, sort_order)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS cms_brand_logos (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(160) NOT NULL,
    logo_group ENUM('partners','customers','buyers','institutional') NOT NULL,
    image_url VARCHAR(512) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    status ENUM('draft','published','archived') NOT NULL DEFAULT 'published',
    live_payload JSON NULL,
    published_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_cms_logos_group (logo_group, status, sort_order)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS cms_farmer_stories (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(64) NOT NULL UNIQUE,
    name_en VARCHAR(120) NOT NULL,
    name_hi VARCHAR(120) NOT NULL,
    role_en VARCHAR(160) NOT NULL,
    role_hi VARCHAR(160) NOT NULL,
    location_en VARCHAR(120) NOT NULL,
    location_hi VARCHAR(120) NOT NULL,
    acres_en VARCHAR(64) NOT NULL,
    acres_hi VARCHAR(64) NOT NULL,
    crop_en VARCHAR(120) NOT NULL,
    crop_hi VARCHAR(120) NOT NULL,
    quote_en TEXT NOT NULL,
    quote_hi TEXT NOT NULL,
    badge_en VARCHAR(80) NOT NULL,
    badge_hi VARCHAR(80) NOT NULL,
    thumbnail_url VARCHAR(512) NOT NULL,
    video_url VARCHAR(512) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    status ENUM('draft','published','archived') NOT NULL DEFAULT 'published',
    live_payload JSON NULL,
    published_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_cms_stories_status (status, sort_order)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS cms_site_config (
    id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
    payload JSON NOT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
];

function normalizeAppLinks(raw: Partial<HomeCmsAppLinks> | null | undefined): HomeCmsAppLinks {
  const googlePlayUrl = String(raw?.googlePlayUrl ?? "").trim();
  const appStoreUrl = String(raw?.appStoreUrl ?? "").trim();
  return {
    googlePlayUrl: googlePlayUrl || DEFAULT_HOME_CMS_APP_LINKS.googlePlayUrl,
    appStoreUrl: appStoreUrl || DEFAULT_HOME_CMS_APP_LINKS.appStoreUrl,
  };
}

function normalizeAgriParkTour(raw: Partial<HomeCmsAgriParkTour> | null | undefined): HomeCmsAgriParkTour {
  const videoUrl = String(raw?.videoUrl ?? "").trim();
  const posterUrl = String(raw?.posterUrl ?? "").trim();
  return {
    videoUrl: videoUrl || DEFAULT_HOME_CMS_AGRI_PARK_TOUR.videoUrl,
    posterUrl: posterUrl || DEFAULT_HOME_CMS_AGRI_PARK_TOUR.posterUrl,
  };
}

function normalizeSiteConfig(raw: Partial<CmsSiteConfig> | null | undefined): CmsSiteConfig {
  return {
    appLinks: normalizeAppLinks(raw?.appLinks),
    agriParkTour: normalizeAgriParkTour(raw?.agriParkTour),
  };
}

async function readSiteConfigFromMemory(): Promise<CmsSiteConfig> {
  const { mockSiteConfig } = await import("@/server/cms-memory");
  return normalizeSiteConfig(mockSiteConfig);
}

export async function fetchSiteConfig(): Promise<CmsSiteConfig> {
  if (!isDbConfigured()) return readSiteConfigFromMemory();
  try {
    await ensureCmsSchema();
    const db = await getDbPool();
    const [rows] = await db.query(`SELECT payload FROM cms_site_config WHERE id = 1 LIMIT 1`);
    const row = (rows as Array<{ payload: unknown }>)[0];
    if (!row) return DEFAULT_CMS_SITE_CONFIG;
    const payload = parseJson<Partial<CmsSiteConfig>>(row.payload, {});
    return normalizeSiteConfig(payload);
  } catch (err) {
    console.warn("fetchSiteConfig fallback:", err);
    return DEFAULT_CMS_SITE_CONFIG;
  }
}

async function saveSiteConfig(config: CmsSiteConfig): Promise<CmsSiteConfig> {
  const normalized = normalizeSiteConfig(config);
  if (!isDbConfigured()) {
    const mem = await import("@/server/cms-memory");
    mem.mockSiteConfig = normalized;
    return normalized;
  }
  await ensureCmsSchema();
  const db = await getDbPool();
  await db.query(
    `INSERT INTO cms_site_config (id, payload) VALUES (1, :payload)
     ON DUPLICATE KEY UPDATE payload = :payload`,
    { payload: JSON.stringify(normalized) },
  );
  return normalized;
}

async function mergeSiteConfig(patch: Partial<CmsSiteConfig>): Promise<CmsSiteConfig> {
  const current = await fetchSiteConfig();
  return saveSiteConfig({
    appLinks: patch.appLinks ? normalizeAppLinks(patch.appLinks) : current.appLinks,
    agriParkTour: patch.agriParkTour ? normalizeAgriParkTour(patch.agriParkTour) : current.agriParkTour,
  });
}

export async function fetchAppLinks(): Promise<HomeCmsAppLinks> {
  const config = await fetchSiteConfig();
  return config.appLinks;
}

export async function saveAppLinks(links: HomeCmsAppLinks): Promise<HomeCmsAppLinks> {
  const config = await mergeSiteConfig({ appLinks: links });
  return config.appLinks;
}

export async function fetchAgriParkTour(): Promise<HomeCmsAgriParkTour> {
  const config = await fetchSiteConfig();
  return config.agriParkTour;
}

export async function saveAgriParkTour(tour: HomeCmsAgriParkTour): Promise<HomeCmsAgriParkTour> {
  const config = await mergeSiteConfig({ agriParkTour: tour });
  return config.agriParkTour;
}

let cmsSchemaReady = false;

export async function ensureCmsSchema() {
  if (!isDbConfigured()) return;
  await ensureAdminSchema();
  if (cmsSchemaReady) return;
  const db = await getDbPool();
  for (const sql of CMS_TABLE_SQL) {
    await db.query(sql);
  }
  await seedCmsIfEmpty();
  cmsSchemaReady = true;
}

async function seedCmsIfEmpty() {
  const db = await getDbPool();
  const [statRows] = await db.query(`SELECT COUNT(*) AS c FROM cms_stats`);
  const statCount = Number((statRows as Array<{ c: number }>)[0]?.c ?? 0);
  if (statCount === 0) {
    for (const s of getFallbackSeedStats()) {
      const payload = {
        slug: s.slug,
        iconKey: s.iconKey,
        numValue: s.numValue,
        prefix: s.prefix ?? undefined,
        suffixEn: s.suffixEn,
        suffixHi: s.suffixHi,
        labelEn: s.labelEn,
        labelHi: s.labelHi,
      };
      await db.query(
        `INSERT INTO cms_stats
         (slug, icon_key, num_value, prefix, suffix_en, suffix_hi, label_en, label_hi, sort_order, status, live_payload, published_at)
         VALUES (:slug, :iconKey, :numValue, :prefix, :suffixEn, :suffixHi, :labelEn, :labelHi, :sortOrder, 'published', :livePayload, NOW())`,
        {
          ...s,
          livePayload: JSON.stringify(payload),
        },
      );
    }
  }

  const [logoRows] = await db.query(`SELECT COUNT(*) AS c FROM cms_brand_logos`);
  const logoCount = Number((logoRows as Array<{ c: number }>)[0]?.c ?? 0);
  if (logoCount === 0) {
    for (const l of getFallbackSeedLogos()) {
      const payload = { name: l.name, group: l.group, imageUrl: l.imageUrl };
      await db.query(
        `INSERT INTO cms_brand_logos
         (name, logo_group, image_url, sort_order, status, live_payload, published_at)
         VALUES (:name, :group, :imageUrl, :sortOrder, 'published', :livePayload, NOW())`,
        { ...l, livePayload: JSON.stringify(payload) },
      );
    }
  }

  const [storyRows] = await db.query(`SELECT COUNT(*) AS c FROM cms_farmer_stories`);
  const storyCount = Number((storyRows as Array<{ c: number }>)[0]?.c ?? 0);
  if (storyCount === 0) {
    for (const s of getFallbackSeedStories()) {
      const payload = {
        slug: s.slug,
        nameEn: s.nameEn,
        nameHi: s.nameHi,
        roleEn: s.roleEn,
        roleHi: s.roleHi,
        locationEn: s.locationEn,
        locationHi: s.locationHi,
        acresEn: s.acresEn,
        acresHi: s.acresHi,
        cropEn: s.cropEn,
        cropHi: s.cropHi,
        quoteEn: s.quoteEn,
        quoteHi: s.quoteHi,
        badgeEn: s.badgeEn,
        badgeHi: s.badgeHi,
        thumbnailUrl: s.thumbnailUrl,
        videoUrl: s.videoUrl,
      };
      await db.query(
        `INSERT INTO cms_farmer_stories
         (slug, name_en, name_hi, role_en, role_hi, location_en, location_hi, acres_en, acres_hi,
          crop_en, crop_hi, quote_en, quote_hi, badge_en, badge_hi, thumbnail_url, video_url,
          sort_order, status, live_payload, published_at)
         VALUES (:slug, :nameEn, :nameHi, :roleEn, :roleHi, :locationEn, :locationHi, :acresEn, :acresHi,
          :cropEn, :cropHi, :quoteEn, :quoteHi, :badgeEn, :badgeHi, :thumbnailUrl, :videoUrl,
          :sortOrder, 'published', :livePayload, NOW())`,
        { ...s, livePayload: JSON.stringify(payload) },
      );
    }
  }
}

function statToPublic(row: CmsStatRow, useLive: boolean): HomeCmsStat {
  const p = useLive && row.livePayload ? row.livePayload : row;
  return {
    id: p.slug,
    slug: p.slug,
    iconKey: p.iconKey,
    numValue: p.numValue,
    prefix: p.prefix,
    suffixEn: p.suffixEn,
    suffixHi: p.suffixHi,
    labelEn: p.labelEn,
    labelHi: p.labelHi,
  };
}

function logoToPublic(row: CmsLogoRow, useLive: boolean): HomeCmsLogo {
  const p = useLive && row.livePayload ? row.livePayload : row;
  return { name: p.name, src: p.imageUrl };
}

function storyToPublic(row: CmsStoryRow, useLive: boolean, lang: "en" | "hi"): HomeCmsStory {
  const p = useLive && row.livePayload ? row.livePayload : row;
  const isHi = lang === "hi";
  return {
    id: p.slug,
    name: isHi ? p.nameHi : p.nameEn,
    role: isHi ? p.roleHi : p.roleEn,
    location: isHi ? p.locationHi : p.locationEn,
    acres: isHi ? p.acresHi : p.acresEn,
    crop: isHi ? p.cropHi : p.cropEn,
    quote: isHi ? p.quoteHi : p.quoteEn,
    badge: isHi ? p.badgeHi : p.badgeEn,
    thumbnail: p.thumbnailUrl,
    videoUrl: p.videoUrl,
  };
}

export function buildHomeCmsFromRows(
  stats: CmsStatRow[],
  logos: CmsLogoRow[],
  stories: CmsStoryRow[],
  preview: boolean,
): HomeCmsData {
  const useLive = !preview;
  const activeStats = stats
    .filter((r) => r.status !== "archived" && (preview || r.status === "published"))
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const activeLogos = logos
    .filter((r) => r.status !== "archived" && (preview || r.status === "published"))
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const activeStories = stories
    .filter((r) => r.status !== "archived" && (preview || r.status === "published"))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const logoGroups: Record<CmsBrandGroup, HomeCmsLogo[]> = {
    partners: [],
    customers: [],
    buyers: [],
    institutional: [],
  };
  for (const row of activeLogos) {
    const pub = logoToPublic(row, useLive);
    logoGroups[row.group].push(pub);
  }

  return {
    stats: activeStats.map((r) => statToPublic(r, useLive)),
    logos: logoGroups,
    storiesEn: activeStories.map((r) => storyToPublic(r, useLive, "en")),
    storiesHi: activeStories.map((r) => storyToPublic(r, useLive, "hi")),
    appLinks: DEFAULT_CMS_SITE_CONFIG.appLinks,
    agriParkTour: DEFAULT_CMS_SITE_CONFIG.agriParkTour,
  };
}

export async function fetchHomeCms(preview = false): Promise<HomeCmsData> {
  if (!isDbConfigured()) {
    const { mockStats, mockLogos, mockStories, mockSiteConfig } = await import("@/server/cms-memory");
    const data = buildHomeCmsFromRows(mockStats, mockLogos, mockStories, preview);
    data.appLinks = mockSiteConfig.appLinks;
    data.agriParkTour = mockSiteConfig.agriParkTour;
    return data;
  }
  try {
    await ensureCmsSchema();
    const db = await getDbPool();
    const [statRows] = await db.query(`SELECT * FROM cms_stats ORDER BY sort_order ASC`);
    const [logoRows] = await db.query(`SELECT * FROM cms_brand_logos ORDER BY sort_order ASC`);
    const [storyRows] = await db.query(`SELECT * FROM cms_farmer_stories ORDER BY sort_order ASC`);
    const stats = (statRows as Record<string, unknown>[]).map(mapStatRow);
    const logos = (logoRows as Record<string, unknown>[]).map(mapLogoRow);
    const stories = (storyRows as Record<string, unknown>[]).map(mapStoryRow);
    if (!stats.length && !logos.length && !stories.length) {
      const siteConfig = await fetchSiteConfig();
      return {
        ...HOMEPAGE_CMS_FALLBACK,
        appLinks: siteConfig.appLinks,
        agriParkTour: siteConfig.agriParkTour,
      };
    }
    const data = buildHomeCmsFromRows(stats, logos, stories, preview);
    if (!data.stats.length) data.stats = HOMEPAGE_CMS_FALLBACK.stats;
    if (!data.storiesEn.length) {
      data.storiesEn = HOMEPAGE_CMS_FALLBACK.storiesEn;
      data.storiesHi = HOMEPAGE_CMS_FALLBACK.storiesHi;
    }
    const hasLogos = Object.values(data.logos).some((g) => g.length > 0);
    if (!hasLogos) data.logos = HOMEPAGE_CMS_FALLBACK.logos;
    const siteConfig = await fetchSiteConfig();
    data.appLinks = siteConfig.appLinks;
    data.agriParkTour = siteConfig.agriParkTour;
    return data;
  } catch (err) {
    console.warn("fetchHomeCms fallback:", err);
    return HOMEPAGE_CMS_FALLBACK;
  }
}

function countOverview<T extends { status: CmsStatus; hasUnpublishedChanges: boolean }>(rows: T[]) {
  return {
    published: rows.filter((r) => r.status === "published").length,
    draft: rows.filter((r) => r.status === "draft").length,
    pending: rows.filter((r) => r.status === "published" && r.hasUnpublishedChanges).length,
  };
}

export async function fetchCmsOverview(): Promise<CmsOverview> {
  const { listCmsTeam } = await import("@/server/cms-team-queries");
  const [stats, logos, stories, teamRows] = await Promise.all([
    listCmsStats({ status: "all" }),
    listCmsLogos({ status: "all" }),
    listCmsStories({ status: "all" }),
    listCmsTeam({ status: "all" }),
  ]);
  return {
    stats: countOverview(stats),
    logos: countOverview(logos),
    stories: countOverview(stories),
    team: countOverview(teamRows),
  };
}

function matchesQ(q: string | undefined, ...fields: string[]) {
  if (!q?.trim()) return true;
  const needle = q.trim().toLowerCase();
  return fields.some((f) => f.toLowerCase().includes(needle));
}

export async function listCmsStats(filters: CmsListFilters = {}): Promise<CmsStatRow[]> {
  if (!isDbConfigured()) return [];
  await ensureCmsSchema();
  const db = await getDbPool();
  let sql = `SELECT * FROM cms_stats WHERE 1=1`;
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
    .map(mapStatRow)
    .filter((r) => matchesQ(filters.q, r.labelEn, r.labelHi, r.slug));
}

export async function listCmsLogos(filters: CmsListFilters = {}): Promise<CmsLogoRow[]> {
  if (!isDbConfigured()) return [];
  await ensureCmsSchema();
  const db = await getDbPool();
  let sql = `SELECT * FROM cms_brand_logos WHERE 1=1`;
  const params: Record<string, unknown> = {};
  if (filters.status && filters.status !== "all") {
    sql += ` AND status = :status`;
    params.status = filters.status;
  } else {
    sql += ` AND status != 'archived'`;
  }
  if (filters.group && filters.group !== "all") {
    sql += ` AND logo_group = :group`;
    params.group = filters.group;
  }
  sql += ` ORDER BY sort_order ASC`;
  const [rows] = await db.query(sql, params);
  return (rows as Record<string, unknown>[])
    .map(mapLogoRow)
    .filter((r) => matchesQ(filters.q, r.name, r.group));
}

export async function listCmsStories(filters: CmsListFilters = {}): Promise<CmsStoryRow[]> {
  if (!isDbConfigured()) return [];
  await ensureCmsSchema();
  const db = await getDbPool();
  let sql = `SELECT * FROM cms_farmer_stories WHERE 1=1`;
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
    .map(mapStoryRow)
    .filter((r) =>
      matchesQ(filters.q, r.nameEn, r.nameHi, r.slug, r.cropEn, r.cropHi, r.locationEn),
    );
}

export async function saveCmsStat(
  data: Partial<CmsStatPayload> & { id?: number; sortOrder?: number },
): Promise<CmsStatRow> {
  await ensureCmsSchema();
  const db = await getDbPool();
  if (data.id) {
    await db.query(
      `UPDATE cms_stats SET
        slug = :slug, icon_key = :iconKey, num_value = :numValue, prefix = :prefix,
        suffix_en = :suffixEn, suffix_hi = :suffixHi, label_en = :labelEn, label_hi = :labelHi,
        sort_order = COALESCE(:sortOrder, sort_order), status = IF(status = 'archived', 'draft', status)
       WHERE id = :id`,
      {
        id: data.id,
        slug: data.slug,
        iconKey: data.iconKey,
        numValue: data.numValue,
        prefix: data.prefix ?? null,
        suffixEn: data.suffixEn,
        suffixHi: data.suffixHi,
        labelEn: data.labelEn,
        labelHi: data.labelHi,
        sortOrder: data.sortOrder ?? null,
      },
    );
    const [rows] = await db.query(`SELECT * FROM cms_stats WHERE id = :id`, { id: data.id });
    return mapStatRow((rows as Record<string, unknown>[])[0]!);
  }
  const [maxRows] = await db.query(`SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM cms_stats`);
  const sortOrder = Number((maxRows as Array<{ next: number }>)[0]?.next ?? 0);
  const [result] = await db.query(
    `INSERT INTO cms_stats
     (slug, icon_key, num_value, prefix, suffix_en, suffix_hi, label_en, label_hi, sort_order, status)
     VALUES (:slug, :iconKey, :numValue, :prefix, :suffixEn, :suffixHi, :labelEn, :labelHi, :sortOrder, 'draft')`,
    {
      slug: data.slug,
      iconKey: data.iconKey,
      numValue: data.numValue ?? 0,
      prefix: data.prefix ?? null,
      suffixEn: data.suffixEn ?? "",
      suffixHi: data.suffixHi ?? "",
      labelEn: data.labelEn ?? "",
      labelHi: data.labelHi ?? "",
      sortOrder,
    },
  );
  const insertId = (result as { insertId: number }).insertId;
  const [rows] = await db.query(`SELECT * FROM cms_stats WHERE id = :id`, { id: insertId });
  return mapStatRow((rows as Record<string, unknown>[])[0]!);
}

export async function saveCmsLogo(
  data: Partial<CmsLogoPayload> & { id?: number; sortOrder?: number },
): Promise<CmsLogoRow> {
  await ensureCmsSchema();
  const db = await getDbPool();
  if (data.id) {
    await db.query(
      `UPDATE cms_brand_logos SET
        name = :name, logo_group = :group, image_url = :imageUrl,
        sort_order = COALESCE(:sortOrder, sort_order), status = IF(status = 'archived', 'draft', status)
       WHERE id = :id`,
      {
        id: data.id,
        name: data.name,
        group: data.group,
        imageUrl: data.imageUrl,
        sortOrder: data.sortOrder ?? null,
      },
    );
    const [rows] = await db.query(`SELECT * FROM cms_brand_logos WHERE id = :id`, { id: data.id });
    return mapLogoRow((rows as Record<string, unknown>[])[0]!);
  }
  const [maxRows] = await db.query(
    `SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM cms_brand_logos`,
  );
  const sortOrder = Number((maxRows as Array<{ next: number }>)[0]?.next ?? 0);
  const [result] = await db.query(
    `INSERT INTO cms_brand_logos (name, logo_group, image_url, sort_order, status)
     VALUES (:name, :group, :imageUrl, :sortOrder, 'draft')`,
    {
      name: data.name ?? "",
      group: data.group ?? "partners",
      imageUrl: data.imageUrl ?? "",
      sortOrder,
    },
  );
  const insertId = (result as { insertId: number }).insertId;
  const [rows] = await db.query(`SELECT * FROM cms_brand_logos WHERE id = :id`, { id: insertId });
  return mapLogoRow((rows as Record<string, unknown>[])[0]!);
}

export async function saveCmsStory(
  data: Partial<CmsStoryPayload> & { id?: number; sortOrder?: number },
): Promise<CmsStoryRow> {
  await ensureCmsSchema();
  const db = await getDbPool();
  if (data.id) {
    await db.query(
      `UPDATE cms_farmer_stories SET
        slug = :slug, name_en = :nameEn, name_hi = :nameHi, role_en = :roleEn, role_hi = :roleHi,
        location_en = :locationEn, location_hi = :locationHi, acres_en = :acresEn, acres_hi = :acresHi,
        crop_en = :cropEn, crop_hi = :cropHi, quote_en = :quoteEn, quote_hi = :quoteHi,
        badge_en = :badgeEn, badge_hi = :badgeHi, thumbnail_url = :thumbnailUrl, video_url = :videoUrl,
        sort_order = COALESCE(:sortOrder, sort_order), status = IF(status = 'archived', 'draft', status)
       WHERE id = :id`,
      { ...data, sortOrder: data.sortOrder ?? null },
    );
    const [rows] = await db.query(`SELECT * FROM cms_farmer_stories WHERE id = :id`, { id: data.id });
    return mapStoryRow((rows as Record<string, unknown>[])[0]!);
  }
  const [maxRows] = await db.query(
    `SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM cms_farmer_stories`,
  );
  const sortOrder = Number((maxRows as Array<{ next: number }>)[0]?.next ?? 0);
  const [result] = await db.query(
    `INSERT INTO cms_farmer_stories
     (slug, name_en, name_hi, role_en, role_hi, location_en, location_hi, acres_en, acres_hi,
      crop_en, crop_hi, quote_en, quote_hi, badge_en, badge_hi, thumbnail_url, video_url, sort_order, status)
     VALUES (:slug, :nameEn, :nameHi, :roleEn, :roleHi, :locationEn, :locationHi, :acresEn, :acresHi,
      :cropEn, :cropHi, :quoteEn, :quoteHi, :badgeEn, :badgeHi, :thumbnailUrl, :videoUrl, :sortOrder, 'draft')`,
    {
      slug: data.slug ?? `story-${Date.now()}`,
      nameEn: data.nameEn ?? "",
      nameHi: data.nameHi ?? "",
      roleEn: data.roleEn ?? "",
      roleHi: data.roleHi ?? "",
      locationEn: data.locationEn ?? "",
      locationHi: data.locationHi ?? "",
      acresEn: data.acresEn ?? "",
      acresHi: data.acresHi ?? "",
      cropEn: data.cropEn ?? "",
      cropHi: data.cropHi ?? "",
      quoteEn: data.quoteEn ?? "",
      quoteHi: data.quoteHi ?? "",
      badgeEn: data.badgeEn ?? "",
      badgeHi: data.badgeHi ?? "",
      thumbnailUrl: data.thumbnailUrl ?? "",
      videoUrl: data.videoUrl ?? "",
      sortOrder,
    },
  );
  const insertId = (result as { insertId: number }).insertId;
  const [rows] = await db.query(`SELECT * FROM cms_farmer_stories WHERE id = :id`, { id: insertId });
  return mapStoryRow((rows as Record<string, unknown>[])[0]!);
}

async function publishRow(table: "cms_stats" | "cms_brand_logos" | "cms_farmer_stories", id: number) {
  await ensureCmsSchema();
  const db = await getDbPool();
  if (table === "cms_stats") {
    const [rows] = await db.query(`SELECT * FROM cms_stats WHERE id = :id`, { id });
    const row = (rows as Record<string, unknown>[])[0];
    if (!row) throw new Error("NOT_FOUND");
    const payload = statPayloadFromRow(row);
    await db.query(
      `UPDATE cms_stats SET status = 'published', live_payload = :livePayload, published_at = NOW() WHERE id = :id`,
      { id, livePayload: JSON.stringify(payload) },
    );
    const [updated] = await db.query(`SELECT * FROM cms_stats WHERE id = :id`, { id });
    return mapStatRow((updated as Record<string, unknown>[])[0]!);
  }
  if (table === "cms_brand_logos") {
    const [rows] = await db.query(`SELECT * FROM cms_brand_logos WHERE id = :id`, { id });
    const row = (rows as Record<string, unknown>[])[0];
    if (!row) throw new Error("NOT_FOUND");
    const payload = logoPayloadFromRow(row);
    await db.query(
      `UPDATE cms_brand_logos SET status = 'published', live_payload = :livePayload, published_at = NOW() WHERE id = :id`,
      { id, livePayload: JSON.stringify(payload) },
    );
    const [updated] = await db.query(`SELECT * FROM cms_brand_logos WHERE id = :id`, { id });
    return mapLogoRow((updated as Record<string, unknown>[])[0]!);
  }
  const [rows] = await db.query(`SELECT * FROM cms_farmer_stories WHERE id = :id`, { id });
  const row = (rows as Record<string, unknown>[])[0];
  if (!row) throw new Error("NOT_FOUND");
  const payload = storyPayloadFromRow(row);
  await db.query(
    `UPDATE cms_farmer_stories SET status = 'published', live_payload = :livePayload, published_at = NOW() WHERE id = :id`,
    { id, livePayload: JSON.stringify(payload) },
  );
  const [updated] = await db.query(`SELECT * FROM cms_farmer_stories WHERE id = :id`, { id });
  return mapStoryRow((updated as Record<string, unknown>[])[0]!);
}

export async function publishCmsStat(id: number) {
  return publishRow("cms_stats", id);
}

export async function publishCmsLogo(id: number) {
  return publishRow("cms_brand_logos", id);
}

export async function publishCmsStory(id: number) {
  return publishRow("cms_farmer_stories", id);
}

async function unpublishRow(table: "cms_stats" | "cms_brand_logos" | "cms_farmer_stories", id: number) {
  await ensureCmsSchema();
  const db = await getDbPool();
  await db.query(`UPDATE ${table} SET status = 'draft' WHERE id = :id`, { id });
  const [rows] = await db.query(`SELECT * FROM ${table} WHERE id = :id`, { id });
  const row = (rows as Record<string, unknown>[])[0];
  if (!row) throw new Error("NOT_FOUND");
  if (table === "cms_stats") return mapStatRow(row);
  if (table === "cms_brand_logos") return mapLogoRow(row);
  return mapStoryRow(row);
}

export async function unpublishCmsStat(id: number) {
  return unpublishRow("cms_stats", id);
}

export async function unpublishCmsLogo(id: number) {
  return unpublishRow("cms_brand_logos", id);
}

export async function unpublishCmsStory(id: number) {
  return unpublishRow("cms_farmer_stories", id);
}

async function archiveRow(table: "cms_stats" | "cms_brand_logos" | "cms_farmer_stories", id: number) {
  await ensureCmsSchema();
  const db = await getDbPool();
  await db.query(`UPDATE ${table} SET status = 'archived' WHERE id = :id`, { id });
}

export async function archiveCmsStat(id: number) {
  return archiveRow("cms_stats", id);
}

export async function archiveCmsLogo(id: number) {
  return archiveRow("cms_brand_logos", id);
}

export async function archiveCmsStory(id: number) {
  return archiveRow("cms_farmer_stories", id);
}

export async function reorderCmsStats(ids: number[]) {
  await ensureCmsSchema();
  const db = await getDbPool();
  for (let i = 0; i < ids.length; i++) {
    await db.query(`UPDATE cms_stats SET sort_order = :order WHERE id = :id`, { id: ids[i], order: i });
  }
}

export async function reorderCmsLogos(ids: number[]) {
  await ensureCmsSchema();
  const db = await getDbPool();
  for (let i = 0; i < ids.length; i++) {
    await db.query(`UPDATE cms_brand_logos SET sort_order = :order WHERE id = :id`, { id: ids[i], order: i });
  }
}

export async function reorderCmsStories(ids: number[]) {
  await ensureCmsSchema();
  const db = await getDbPool();
  for (let i = 0; i < ids.length; i++) {
    await db.query(`UPDATE cms_farmer_stories SET sort_order = :order WHERE id = :id`, { id: ids[i], order: i });
  }
}
