import { getDbPool, isDbConfigured } from "@/server/db";
import { getFallbackSeedCareerJobs } from "@/data/careers-fallback";
import type {
  CareerDepartmentCategory,
  CareerJob,
  CmsCareerJobPayload,
  CmsCareerJobRow,
  CmsListFilters,
  CmsStatus,
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

function normalizeDepartmentCategory(value: unknown): CareerDepartmentCategory {
  const v = String(value ?? "");
  if (v === "Agronomy" || v === "Corporate" || v === "Retail") return v;
  return "Corporate";
}

function careerPayloadFromRow(row: Record<string, unknown>): CmsCareerJobPayload {
  return {
    slug: String(row.slug),
    titleEn: String(row.title_en),
    titleHi: String(row.title_hi),
    deptEn: String(row.dept_en),
    deptHi: String(row.dept_hi),
    departmentCategory: normalizeDepartmentCategory(row.department_category),
    locEn: String(row.loc_en),
    locHi: String(row.loc_hi),
    typeEn: String(row.type_en),
    typeHi: String(row.type_hi),
    descEn: String(row.desc_en),
    descHi: String(row.desc_hi),
    experienceLevelEn: String(row.experience_level_en ?? ""),
    experienceLevelHi: String(row.experience_level_hi ?? ""),
    highlightsEn: parseJson<string[]>(row.highlights_en, []),
    highlightsHi: parseJson<string[]>(row.highlights_hi, []),
    reqsEn: parseJson<string[]>(row.reqs_en, []),
    reqsHi: parseJson<string[]>(row.reqs_hi, []),
    responsibilitiesEn: parseJson<string[]>(row.responsibilities_en, []),
    responsibilitiesHi: parseJson<string[]>(row.responsibilities_hi, []),
  };
}

function hasChanges<T extends object>(draft: T, live: T | null): boolean {
  if (!live) return true;
  return JSON.stringify(draft) !== JSON.stringify(live);
}

export function mapCareerJobRow(row: Record<string, unknown>): CmsCareerJobRow {
  const draft = careerPayloadFromRow(row);
  const livePayload = parseJson<CmsCareerJobPayload | null>(row.live_payload, null);
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

const CAREER_JOBS_TABLE_SQL = `CREATE TABLE IF NOT EXISTS cms_career_jobs (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(64) NOT NULL UNIQUE,
  title_en VARCHAR(200) NOT NULL,
  title_hi VARCHAR(200) NOT NULL,
  dept_en VARCHAR(160) NOT NULL,
  dept_hi VARCHAR(160) NOT NULL,
  department_category ENUM('Agronomy','Corporate','Retail') NOT NULL DEFAULT 'Corporate',
  loc_en VARCHAR(160) NOT NULL,
  loc_hi VARCHAR(160) NOT NULL,
  type_en VARCHAR(80) NOT NULL,
  type_hi VARCHAR(80) NOT NULL,
  desc_en TEXT NOT NULL,
  desc_hi TEXT NOT NULL,
  experience_level_en VARCHAR(120) NOT NULL DEFAULT '',
  experience_level_hi VARCHAR(120) NOT NULL DEFAULT '',
  highlights_en JSON NOT NULL,
  highlights_hi JSON NOT NULL,
  reqs_en JSON NOT NULL,
  reqs_hi JSON NOT NULL,
  responsibilities_en JSON NOT NULL,
  responsibilities_hi JSON NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  status ENUM('draft','published','archived') NOT NULL DEFAULT 'published',
  live_payload JSON NULL,
  published_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_cms_career_jobs_status (status, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`;

let careersSchemaReady = false;

export async function seedCareerJobs(options: { force?: boolean } = {}) {
  const db = await getDbPool();
  await db.query(CAREER_JOBS_TABLE_SQL);

  if (options.force) {
    await db.query(`DELETE FROM cms_career_jobs`);
  }

  const [currentRows] = await db.query(`SELECT COUNT(*) AS c FROM cms_career_jobs`);
  const current = Number((currentRows as Array<{ c: number }>)[0]?.c ?? 0);
  if (current > 0) return;

  for (const job of getFallbackSeedCareerJobs()) {
    const payload: CmsCareerJobPayload = {
      slug: job.slug,
      titleEn: job.titleEn,
      titleHi: job.titleHi,
      deptEn: job.deptEn,
      deptHi: job.deptHi,
      departmentCategory: job.departmentCategory,
      locEn: job.locEn,
      locHi: job.locHi,
      typeEn: job.typeEn,
      typeHi: job.typeHi,
      descEn: job.descEn,
      descHi: job.descHi,
      experienceLevelEn: job.experienceLevelEn,
      experienceLevelHi: job.experienceLevelHi,
      highlightsEn: job.highlightsEn,
      highlightsHi: job.highlightsHi,
      reqsEn: job.reqsEn,
      reqsHi: job.reqsHi,
      responsibilitiesEn: job.responsibilitiesEn,
      responsibilitiesHi: job.responsibilitiesHi,
    };
    await db.query(
      `INSERT INTO cms_career_jobs
       (slug, title_en, title_hi, dept_en, dept_hi, department_category, loc_en, loc_hi,
        type_en, type_hi, desc_en, desc_hi, experience_level_en, experience_level_hi,
        highlights_en, highlights_hi, reqs_en, reqs_hi, responsibilities_en, responsibilities_hi,
        sort_order, status, live_payload, published_at)
       VALUES (:slug, :titleEn, :titleHi, :deptEn, :deptHi, :departmentCategory, :locEn, :locHi,
        :typeEn, :typeHi, :descEn, :descHi, :experienceLevelEn, :experienceLevelHi,
        :highlightsEn, :highlightsHi, :reqsEn, :reqsHi, :responsibilitiesEn, :responsibilitiesHi,
        :sortOrder, 'published', :livePayload, NOW())`,
      {
        slug: payload.slug,
        titleEn: payload.titleEn,
        titleHi: payload.titleHi,
        deptEn: payload.deptEn,
        deptHi: payload.deptHi,
        departmentCategory: payload.departmentCategory,
        locEn: payload.locEn,
        locHi: payload.locHi,
        typeEn: payload.typeEn,
        typeHi: payload.typeHi,
        descEn: payload.descEn,
        descHi: payload.descHi,
        experienceLevelEn: payload.experienceLevelEn,
        experienceLevelHi: payload.experienceLevelHi,
        highlightsEn: JSON.stringify(payload.highlightsEn),
        highlightsHi: JSON.stringify(payload.highlightsHi),
        reqsEn: JSON.stringify(payload.reqsEn),
        reqsHi: JSON.stringify(payload.reqsHi),
        responsibilitiesEn: JSON.stringify(payload.responsibilitiesEn),
        responsibilitiesHi: JSON.stringify(payload.responsibilitiesHi),
        sortOrder: job.sortOrder,
        livePayload: JSON.stringify(payload),
      },
    );
  }
}

export async function ensureCareersSchema() {
  if (!isDbConfigured()) return;
  const { ensureCmsSchema } = await import("@/server/cms-queries");
  await ensureCmsSchema();
  if (careersSchemaReady) return;
  const db = await getDbPool();
  await db.query(CAREER_JOBS_TABLE_SQL);
  await seedCareerJobs();
  careersSchemaReady = true;
}

function jobToPublic(row: CmsCareerJobRow, useLive: boolean, lang: "en" | "hi"): CareerJob {
  const p = useLive && row.livePayload ? row.livePayload : row;
  const isHi = lang === "hi";
  return {
    id: p.slug,
    title: isHi ? p.titleHi : p.titleEn,
    dept: isHi ? p.deptHi : p.deptEn,
    departmentCategory: p.departmentCategory,
    loc: isHi ? p.locHi : p.locEn,
    type: isHi ? p.typeHi : p.typeEn,
    desc: isHi ? p.descHi : p.descEn,
    experienceLevel: isHi ? p.experienceLevelHi : p.experienceLevelEn,
    highlights: isHi ? p.highlightsHi : p.highlightsEn,
    reqs: isHi ? p.reqsHi : p.reqsEn,
    responsibilities: isHi ? p.responsibilitiesHi : p.responsibilitiesEn,
  };
}

export function buildCareerJobsFromRows(
  rows: CmsCareerJobRow[],
  preview: boolean,
  lang: "en" | "hi",
): CareerJob[] {
  const useLive = !preview;
  return rows
    .filter((r) => r.status !== "archived" && (preview || r.status === "published"))
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((r) => jobToPublic(r, useLive, lang));
}

export async function listPublishedCareerJobs(lang: "en" | "hi" = "en"): Promise<CareerJob[]> {
  if (!isDbConfigured()) {
    const { mockCareerJobs } = await import("@/server/cms-memory");
    return buildCareerJobsFromRows(mockCareerJobs, false, lang);
  }
  try {
    await ensureCareersSchema();
    const db = await getDbPool();
    const [rows] = await db.query(`SELECT * FROM cms_career_jobs ORDER BY sort_order ASC`);
    const jobs = (rows as Record<string, unknown>[]).map(mapCareerJobRow);
    return buildCareerJobsFromRows(jobs, false, lang);
  } catch (err) {
    console.warn("listPublishedCareerJobs fallback:", err);
    const { mockCareerJobs } = await import("@/server/cms-memory");
    return buildCareerJobsFromRows(mockCareerJobs, false, lang);
  }
}

export async function isPublishedCareerJobSlug(slug: string): Promise<boolean> {
  const jobs = await listPublishedCareerJobs("en");
  return jobs.some((j) => j.id === slug);
}

function matchesQ(q: string | undefined, ...fields: string[]) {
  if (!q?.trim()) return true;
  const needle = q.trim().toLowerCase();
  return fields.some((f) => f.toLowerCase().includes(needle));
}

export async function listCmsCareerJobs(filters: CmsListFilters = {}): Promise<CmsCareerJobRow[]> {
  if (!isDbConfigured()) {
    const { mockCareerJobs } = await import("@/server/cms-memory");
    return mockCareerJobs.filter((r) => {
      if (filters.status && filters.status !== "all" && r.status !== filters.status) return false;
      if (filters.status === "all" && r.status === "archived") return false;
      return matchesQ(filters.q, r.titleEn, r.titleHi, r.slug, r.deptEn, r.deptHi);
    });
  }
  await ensureCareersSchema();
  const db = await getDbPool();
  let sql = `SELECT * FROM cms_career_jobs WHERE 1=1`;
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
    .map(mapCareerJobRow)
    .filter((r) => matchesQ(filters.q, r.titleEn, r.titleHi, r.slug, r.deptEn, r.deptHi));
}

export async function saveCmsCareerJob(
  data: Partial<CmsCareerJobPayload> & { id?: number; sortOrder?: number },
): Promise<CmsCareerJobRow> {
  if (!isDbConfigured()) {
    const { mockCareerJobs } = await import("@/server/cms-memory");
    const payload = data as CmsCareerJobPayload;
    if (data.id) {
      const idx = mockCareerJobs.findIndex((r) => r.id === data.id);
      if (idx < 0) throw new Error("Job not found");
      const updated: CmsCareerJobRow = {
        ...mockCareerJobs[idx]!,
        ...payload,
        sortOrder: data.sortOrder ?? mockCareerJobs[idx]!.sortOrder,
        hasUnpublishedChanges: hasChanges(payload, mockCareerJobs[idx]!.livePayload),
      };
      mockCareerJobs[idx] = updated;
      return updated;
    }
    const newRow: CmsCareerJobRow = {
      id: mockCareerJobs.length + 1,
      ...payload,
      slug: payload.slug,
      sortOrder: data.sortOrder ?? mockCareerJobs.length,
      status: "draft",
      livePayload: null,
      publishedAt: null,
      updatedAt: new Date().toISOString(),
      hasUnpublishedChanges: true,
    };
    mockCareerJobs.push(newRow);
    return newRow;
  }

  await ensureCareersSchema();
  const db = await getDbPool();
  const params = {
    ...data,
    departmentCategory: normalizeDepartmentCategory(data.departmentCategory),
    highlightsEn: JSON.stringify(data.highlightsEn ?? []),
    highlightsHi: JSON.stringify(data.highlightsHi ?? []),
    reqsEn: JSON.stringify(data.reqsEn ?? []),
    reqsHi: JSON.stringify(data.reqsHi ?? []),
    responsibilitiesEn: JSON.stringify(data.responsibilitiesEn ?? []),
    responsibilitiesHi: JSON.stringify(data.responsibilitiesHi ?? []),
    sortOrder: data.sortOrder ?? null,
  };

  if (data.id) {
    await db.query(
      `UPDATE cms_career_jobs SET
        slug = :slug, title_en = :titleEn, title_hi = :titleHi,
        dept_en = :deptEn, dept_hi = :deptHi, department_category = :departmentCategory,
        loc_en = :locEn, loc_hi = :locHi, type_en = :typeEn, type_hi = :typeHi,
        desc_en = :descEn, desc_hi = :descHi,
        experience_level_en = :experienceLevelEn, experience_level_hi = :experienceLevelHi,
        highlights_en = :highlightsEn, highlights_hi = :highlightsHi,
        reqs_en = :reqsEn, reqs_hi = :reqsHi,
        responsibilities_en = :responsibilitiesEn, responsibilities_hi = :responsibilitiesHi,
        sort_order = COALESCE(:sortOrder, sort_order),
        status = IF(status = 'archived', 'draft', status)
       WHERE id = :id`,
      params,
    );
    const [rows] = await db.query(`SELECT * FROM cms_career_jobs WHERE id = :id`, { id: data.id });
    return mapCareerJobRow((rows as Record<string, unknown>[])[0]!);
  }

  const [nextRows] = await db.query(
    `SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM cms_career_jobs`,
  );
  const sortOrder = data.sortOrder ?? Number((nextRows as Array<{ next: number }>)[0]?.next ?? 0);

  const [result] = await db.query(
    `INSERT INTO cms_career_jobs
     (slug, title_en, title_hi, dept_en, dept_hi, department_category, loc_en, loc_hi,
      type_en, type_hi, desc_en, desc_hi, experience_level_en, experience_level_hi,
      highlights_en, highlights_hi, reqs_en, reqs_hi, responsibilities_en, responsibilities_hi,
      sort_order, status)
     VALUES (:slug, :titleEn, :titleHi, :deptEn, :deptHi, :departmentCategory, :locEn, :locHi,
      :typeEn, :typeHi, :descEn, :descHi, :experienceLevelEn, :experienceLevelHi,
      :highlightsEn, :highlightsHi, :reqsEn, :reqsHi, :responsibilitiesEn, :responsibilitiesHi,
      :sortOrder, 'draft')`,
    { ...params, sortOrder },
  );
  const insertId = (result as { insertId?: number }).insertId;
  const [rows] = await db.query(`SELECT * FROM cms_career_jobs WHERE id = :id`, { id: insertId });
  return mapCareerJobRow((rows as Record<string, unknown>[])[0]!);
}

export async function publishCmsCareerJob(id: number) {
  await ensureCareersSchema();
  const db = await getDbPool();
  const [rows] = await db.query(`SELECT * FROM cms_career_jobs WHERE id = :id`, { id });
  const row = (rows as Record<string, unknown>[])[0];
  if (!row) throw new Error("Job not found");
  const payload = careerPayloadFromRow(row);
  await db.query(
    `UPDATE cms_career_jobs SET status = 'published', live_payload = :livePayload, published_at = NOW() WHERE id = :id`,
    { id, livePayload: JSON.stringify(payload) },
  );
  const [updated] = await db.query(`SELECT * FROM cms_career_jobs WHERE id = :id`, { id });
  return mapCareerJobRow((updated as Record<string, unknown>[])[0]!);
}

export async function unpublishCmsCareerJob(id: number) {
  await ensureCareersSchema();
  const db = await getDbPool();
  await db.query(`UPDATE cms_career_jobs SET status = 'draft' WHERE id = :id`, { id });
  const [rows] = await db.query(`SELECT * FROM cms_career_jobs WHERE id = :id`, { id });
  return mapCareerJobRow((rows as Record<string, unknown>[])[0]!);
}

export async function archiveCmsCareerJob(id: number) {
  await ensureCareersSchema();
  const db = await getDbPool();
  await db.query(`UPDATE cms_career_jobs SET status = 'archived' WHERE id = :id`, { id });
}

export async function reorderCmsCareerJobs(ids: number[]) {
  await ensureCareersSchema();
  const db = await getDbPool();
  for (let i = 0; i < ids.length; i++) {
    await db.query(`UPDATE cms_career_jobs SET sort_order = :order WHERE id = :id`, {
      order: i,
      id: ids[i],
    });
  }
}

export async function countPublishedCareerJobs(): Promise<number> {
  if (!isDbConfigured()) {
    const { mockCareerJobs } = await import("@/server/cms-memory");
    return mockCareerJobs.filter((j) => j.status === "published").length;
  }
  await ensureCareersSchema();
  const db = await getDbPool();
  const [rows] = await db.query(
    `SELECT COUNT(*) AS c FROM cms_career_jobs WHERE status = 'published'`,
  );
  return Number((rows as Array<{ c: number }>)[0]?.c ?? 0);
}
