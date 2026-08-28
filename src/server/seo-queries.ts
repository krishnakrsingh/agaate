import { getDbPool, isDbConfigured } from "@/server/db";
import type {
  SeoAuditIssue,
  SeoGlobalSettings,
  SeoMetadataInput,
  SeoMetadataRow,
  SeoRedirectInput,
  SeoRedirectRow,
} from "@/lib/seo-types";
import { DEFAULT_SEO_GLOBAL_SETTINGS, mergeSeoGlobalSettings } from "@/lib/seo-utils";
import {
  getAllSeoPageDefinitions,
  HOMEPAGE_DEFINITION,
  localePath,
  normalizePath,
} from "@/lib/seo-registry";
import { descriptionLengthScore, titleLengthScore } from "@/lib/seo-utils";

let schemaReady: Promise<void> | undefined;

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

function rowToMetadata(row: Record<string, unknown>): SeoMetadataRow {
  return {
    id: Number(row.id),
    entityType: String(row.entity_type) as SeoMetadataRow["entityType"],
    entityKey: String(row.entity_key),
    locale: String(row.locale),
    seoTitle: row.seo_title ? String(row.seo_title) : undefined,
    metaDescription: row.meta_description ? String(row.meta_description) : undefined,
    metaKeywords: row.meta_keywords ? String(row.meta_keywords) : undefined,
    canonicalUrl: row.canonical_url ? String(row.canonical_url) : undefined,
    slug: row.slug ? String(row.slug) : undefined,
    robotsDirective: row.robots_directive ? String(row.robots_directive) : undefined,
    noindex: Boolean(row.noindex),
    nofollow: Boolean(row.nofollow),
    ogTitle: row.og_title ? String(row.og_title) : undefined,
    ogDescription: row.og_description ? String(row.og_description) : undefined,
    ogImage: row.og_image ? String(row.og_image) : undefined,
    twitterTitle: row.twitter_title ? String(row.twitter_title) : undefined,
    twitterDescription: row.twitter_description ? String(row.twitter_description) : undefined,
    twitterImage: row.twitter_image ? String(row.twitter_image) : undefined,
    focusKeyword: row.focus_keyword ? String(row.focus_keyword) : undefined,
    secondaryKeywords: row.secondary_keywords ? String(row.secondary_keywords) : undefined,
    schemaJson: row.schema_json ? String(row.schema_json) : undefined,
    customHead: row.custom_head ? String(row.custom_head) : undefined,
    seoStatus: (row.seo_status as SeoMetadataRow["seoStatus"]) ?? "needs_review",
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
  };
}

function rowToRedirect(row: Record<string, unknown>): SeoRedirectRow {
  return {
    id: Number(row.id),
    sourcePath: String(row.source_path),
    destinationPath: String(row.destination_path),
    redirectType: Number(row.redirect_type) === 302 ? 302 : 301,
    isActive: Boolean(row.is_active),
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
  };
}

const memoryGlobal: SeoGlobalSettings = { ...DEFAULT_SEO_GLOBAL_SETTINGS };
const memoryMetadata = new Map<string, SeoMetadataRow>();
const memoryRedirects = new Map<string, SeoRedirectRow>();
let memoryRedirectId = 1;

function metadataKey(entityType: string, entityKey: string, locale: string) {
  return `${entityType}:${entityKey}:${locale}`;
}

export async function ensureSeoSchema(): Promise<void> {
  if (!isDbConfigured()) return;
  if (!schemaReady) {
    schemaReady = (async () => {
      const db = await getDbPool();
      await db.query(`
        CREATE TABLE IF NOT EXISTS seo_global_settings (
          id INT NOT NULL PRIMARY KEY DEFAULT 1,
          payload JSON NOT NULL,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
      await db.query(`
        CREATE TABLE IF NOT EXISTS seo_metadata (
          id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
          entity_type VARCHAR(64) NOT NULL,
          entity_key VARCHAR(255) NOT NULL,
          locale VARCHAR(8) NOT NULL DEFAULT 'en',
          seo_title VARCHAR(255) NULL,
          meta_description TEXT NULL,
          meta_keywords VARCHAR(512) NULL,
          canonical_url VARCHAR(512) NULL,
          slug VARCHAR(255) NULL,
          robots_directive VARCHAR(128) NULL,
          noindex TINYINT(1) NOT NULL DEFAULT 0,
          nofollow TINYINT(1) NOT NULL DEFAULT 0,
          og_title VARCHAR(255) NULL,
          og_description TEXT NULL,
          og_image VARCHAR(512) NULL,
          twitter_title VARCHAR(255) NULL,
          twitter_description TEXT NULL,
          twitter_image VARCHAR(512) NULL,
          focus_keyword VARCHAR(128) NULL,
          secondary_keywords TEXT NULL,
          schema_json MEDIUMTEXT NULL,
          custom_head TEXT NULL,
          seo_status ENUM('draft','optimized','needs_review') NOT NULL DEFAULT 'needs_review',
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          UNIQUE KEY uq_seo_entity (entity_type, entity_key, locale),
          KEY idx_seo_entity_type (entity_type),
          KEY idx_seo_noindex (noindex)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
      await db.query(`
        CREATE TABLE IF NOT EXISTS seo_redirects (
          id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
          source_path VARCHAR(512) NOT NULL,
          destination_path VARCHAR(512) NOT NULL,
          redirect_type SMALLINT NOT NULL DEFAULT 301,
          is_active TINYINT(1) NOT NULL DEFAULT 1,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          UNIQUE KEY uq_redirect_source (source_path),
          KEY idx_redirect_active (is_active)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
      const [rows] = await db.query(`SELECT id FROM seo_global_settings WHERE id = 1`);
      if (!(rows as unknown[]).length) {
        await db.query(`INSERT INTO seo_global_settings (id, payload) VALUES (1, :payload)`, {
          payload: JSON.stringify(DEFAULT_SEO_GLOBAL_SETTINGS),
        });
      }
    })();
  }
  return schemaReady;
}

export async function fetchSeoGlobalSettings(): Promise<SeoGlobalSettings> {
  await ensureSeoSchema();
  if (!isDbConfigured()) return mergeSeoGlobalSettings(memoryGlobal);
  const db = await getDbPool();
  const [rows] = await db.query(`SELECT payload FROM seo_global_settings WHERE id = 1 LIMIT 1`);
  const row = (rows as Record<string, unknown>[])[0];
  return mergeSeoGlobalSettings(parseJson(row?.payload, DEFAULT_SEO_GLOBAL_SETTINGS));
}

export async function saveSeoGlobalSettings(payload: SeoGlobalSettings): Promise<SeoGlobalSettings> {
  await ensureSeoSchema();
  const merged = mergeSeoGlobalSettings(payload);
  if (!isDbConfigured()) {
    Object.assign(memoryGlobal, merged);
    return merged;
  }
  const db = await getDbPool();
  await db.query(
    `INSERT INTO seo_global_settings (id, payload) VALUES (1, :payload)
     ON DUPLICATE KEY UPDATE payload = VALUES(payload)`,
    { payload: JSON.stringify(merged) },
  );
  return merged;
}

export async function fetchSeoMetadata(
  entityType: string,
  entityKey: string,
  locale: string,
): Promise<SeoMetadataRow | null> {
  await ensureSeoSchema();
  if (!isDbConfigured()) {
    return memoryMetadata.get(metadataKey(entityType, entityKey, locale)) ?? null;
  }
  const db = await getDbPool();
  const [rows] = await db.query(
    `SELECT * FROM seo_metadata WHERE entity_type = :entityType AND entity_key = :entityKey AND locale = :locale LIMIT 1`,
    { entityType, entityKey, locale },
  );
  const row = (rows as Record<string, unknown>[])[0];
  return row ? rowToMetadata(row) : null;
}

export async function listSeoMetadata(): Promise<SeoMetadataRow[]> {
  await ensureSeoSchema();
  if (!isDbConfigured()) return Array.from(memoryMetadata.values());
  const db = await getDbPool();
  const [rows] = await db.query(`SELECT * FROM seo_metadata ORDER BY entity_type, entity_key, locale`);
  return (rows as Record<string, unknown>[]).map(rowToMetadata);
}

export async function saveSeoMetadata(input: SeoMetadataInput): Promise<SeoMetadataRow> {
  await ensureSeoSchema();
  const locale = input.locale || "en";
  if (!isDbConfigured()) {
    const key = metadataKey(input.entityType, input.entityKey, locale);
    const existing = memoryMetadata.get(key);
    const now = new Date().toISOString();
    const row: SeoMetadataRow = {
      id: existing?.id ?? memoryMetadata.size + 1,
      ...input,
      locale,
      noindex: input.noindex ?? false,
      nofollow: input.nofollow ?? false,
      seoStatus: input.seoStatus ?? "needs_review",
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };
    memoryMetadata.set(key, row);
    return row;
  }
  const db = await getDbPool();
  await db.query(
    `INSERT INTO seo_metadata (
      entity_type, entity_key, locale, seo_title, meta_description, meta_keywords,
      canonical_url, slug, robots_directive, noindex, nofollow,
      og_title, og_description, og_image, twitter_title, twitter_description, twitter_image,
      focus_keyword, secondary_keywords, schema_json, custom_head, seo_status
    ) VALUES (
      :entityType, :entityKey, :locale, :seoTitle, :metaDescription, :metaKeywords,
      :canonicalUrl, :slug, :robotsDirective, :noindex, :nofollow,
      :ogTitle, :ogDescription, :ogImage, :twitterTitle, :twitterDescription, :twitterImage,
      :focusKeyword, :secondaryKeywords, :schemaJson, :customHead, :seoStatus
    )
    ON DUPLICATE KEY UPDATE
      seo_title = VALUES(seo_title),
      meta_description = VALUES(meta_description),
      meta_keywords = VALUES(meta_keywords),
      canonical_url = VALUES(canonical_url),
      slug = VALUES(slug),
      robots_directive = VALUES(robots_directive),
      noindex = VALUES(noindex),
      nofollow = VALUES(nofollow),
      og_title = VALUES(og_title),
      og_description = VALUES(og_description),
      og_image = VALUES(og_image),
      twitter_title = VALUES(twitter_title),
      twitter_description = VALUES(twitter_description),
      twitter_image = VALUES(twitter_image),
      focus_keyword = VALUES(focus_keyword),
      secondary_keywords = VALUES(secondary_keywords),
      schema_json = VALUES(schema_json),
      custom_head = VALUES(custom_head),
      seo_status = VALUES(seo_status)`,
    {
      entityType: input.entityType,
      entityKey: input.entityKey,
      locale,
      seoTitle: input.seoTitle ?? null,
      metaDescription: input.metaDescription ?? null,
      metaKeywords: input.metaKeywords ?? null,
      canonicalUrl: input.canonicalUrl ?? null,
      slug: input.slug ?? null,
      robotsDirective: input.robotsDirective ?? null,
      noindex: input.noindex ? 1 : 0,
      nofollow: input.nofollow ? 1 : 0,
      ogTitle: input.ogTitle ?? null,
      ogDescription: input.ogDescription ?? null,
      ogImage: input.ogImage ?? null,
      twitterTitle: input.twitterTitle ?? null,
      twitterDescription: input.twitterDescription ?? null,
      twitterImage: input.twitterImage ?? null,
      focusKeyword: input.focusKeyword ?? null,
      secondaryKeywords: input.secondaryKeywords ?? null,
      schemaJson: input.schemaJson ?? null,
      customHead: input.customHead ?? null,
      seoStatus: input.seoStatus ?? "needs_review",
    },
  );
  const saved = await fetchSeoMetadata(input.entityType, input.entityKey, locale);
  if (!saved) throw new Error("Failed to save SEO metadata");
  return saved;
}

export async function listSeoRedirects(): Promise<SeoRedirectRow[]> {
  await ensureSeoSchema();
  if (!isDbConfigured()) return Array.from(memoryRedirects.values());
  const db = await getDbPool();
  const [rows] = await db.query(`SELECT * FROM seo_redirects ORDER BY source_path ASC`);
  return (rows as Record<string, unknown>[]).map(rowToRedirect);
}

export async function saveSeoRedirect(input: SeoRedirectInput): Promise<SeoRedirectRow> {
  await ensureSeoSchema();
  const sourcePath = normalizePath(input.sourcePath);
  const destinationPath = input.destinationPath.trim();
  if (!sourcePath || !destinationPath) throw new Error("INVALID_PATH");
  if (sourcePath === normalizePath(destinationPath)) throw new Error("SAME_PATH");

  const all = await listSeoRedirects();
  for (const r of all) {
    if (r.id === input.id) continue;
    if (!r.isActive) continue;
    if (normalizePath(r.sourcePath) === normalizePath(destinationPath)) {
      throw new Error("REDIRECT_LOOP");
    }
  }

  if (!isDbConfigured()) {
    const now = new Date().toISOString();
    const existing = input.id ? [...memoryRedirects.values()].find((r) => r.id === input.id) : undefined;
    const row: SeoRedirectRow = {
      id: input.id ?? memoryRedirectId++,
      sourcePath,
      destinationPath,
      redirectType: input.redirectType,
      isActive: input.isActive,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };
    memoryRedirects.set(sourcePath, row);
    return row;
  }

  const db = await getDbPool();
  if (input.id) {
    await db.query(
      `UPDATE seo_redirects SET source_path = :sourcePath, destination_path = :destinationPath,
       redirect_type = :redirectType, is_active = :isActive WHERE id = :id`,
      {
        id: input.id,
        sourcePath,
        destinationPath,
        redirectType: input.redirectType,
        isActive: input.isActive ? 1 : 0,
      },
    );
    const [rows] = await db.query(`SELECT * FROM seo_redirects WHERE id = :id`, { id: input.id });
    const row = (rows as Record<string, unknown>[])[0];
    if (!row) throw new Error("NOT_FOUND");
    return rowToRedirect(row);
  }

  await db.query(
    `INSERT INTO seo_redirects (source_path, destination_path, redirect_type, is_active)
     VALUES (:sourcePath, :destinationPath, :redirectType, :isActive)`,
    {
      sourcePath,
      destinationPath,
      redirectType: input.redirectType,
      isActive: input.isActive ? 1 : 0,
    },
  );
  const [rows] = await db.query(`SELECT * FROM seo_redirects WHERE source_path = :sourcePath`, {
    sourcePath,
  });
  const row = (rows as Record<string, unknown>[])[0];
  if (!row) throw new Error("FAILED");
  return rowToRedirect(row);
}

export async function deleteSeoRedirect(id: number): Promise<void> {
  await ensureSeoSchema();
  if (!isDbConfigured()) {
    for (const [key, row] of memoryRedirects) {
      if (row.id === id) memoryRedirects.delete(key);
    }
    return;
  }
  const db = await getDbPool();
  await db.query(`DELETE FROM seo_redirects WHERE id = :id`, { id });
}

export async function findActiveRedirect(path: string): Promise<SeoRedirectRow | null> {
  const normalized = normalizePath(path);
  const redirects = await listSeoRedirects();
  const match = redirects.find((r) => r.isActive && normalizePath(r.sourcePath) === normalized);
  return match ?? null;
}

export type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
  alternates?: Array<{ hreflang: string; href: string }>;
};

export async function buildSitemapEntries(): Promise<SitemapEntry[]> {
  const global = await fetchSeoGlobalSettings();
  if (!global.sitemapEnabled) return [];
  const { resolveSeo } = await import("@/lib/seo-service");
  const metadata = await listSeoMetadata();
  const metaMap = new Map(metadata.map((m) => [metadataKey(m.entityType, m.entityKey, m.locale), m]));
  const entries: SitemapEntry[] = [];
  const seen = new Set<string>();

  const pages = getAllSeoPageDefinitions();
  for (const page of pages) {
    for (const locale of ["en", "hi"] as const) {
      const meta = metaMap.get(metadataKey(page.entityType, page.entityKey, locale));
      if (meta?.noindex) continue;
      const path = localePath(page.path, locale);
      const loc = `${global.websiteUrl.replace(/\/$/, "")}${path}`;
      if (seen.has(loc)) continue;
      seen.add(loc);
      const resolved = resolveSeo({
        page,
        locale,
        global,
        metadata: meta,
      });
      entries.push({
        loc,
        lastmod: meta?.updatedAt?.slice(0, 10),
        changefreq: page.entityType === "homepage" ? "weekly" : "monthly",
        priority: page.entityType === "homepage" ? "1.0" : "0.8",
        alternates: resolved.alternates,
      });
    }
  }

  return entries.sort((a, b) => a.loc.localeCompare(b.loc));
}

export function renderSitemapXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map((e) => {
      const altLinks = (e.alternates ?? [])
        .map(
          (a) =>
            `    <xhtml:link rel="alternate" hreflang="${escapeXml(a.hreflang)}" href="${escapeXml(a.href)}" />`,
        )
        .join("\n");
      return `  <url>
    <loc>${escapeXml(e.loc)}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ""}${e.changefreq ? `\n    <changefreq>${e.changefreq}</changefreq>` : ""}${e.priority ? `\n    <priority>${e.priority}</priority>` : ""}${altLinks ? `\n${altLinks}` : ""}
  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;
}

export async function renderRobotsTxt(): Promise<string> {
  const global = await fetchSeoGlobalSettings();
  const base = global.websiteUrl.replace(/\/$/, "");
  const lines = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /agaate-admin",
    "Disallow: /agaate-admin/",
    "Disallow: /*?*preview=",
    "",
    `Sitemap: ${base}/sitemap.xml`,
  ];
  if (global.robotsTxtExtra?.trim()) {
    lines.push("", global.robotsTxtExtra.trim());
  }
  return `${lines.join("\n")}\n`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function runSeoAudit(): Promise<SeoAuditIssue[]> {
  const global = await fetchSeoGlobalSettings();
  const { resolveSeo } = await import("@/lib/seo-service");
  const metadata = await listSeoMetadata();
  const metaMap = new Map(metadata.map((m) => [metadataKey(m.entityType, m.entityKey, m.locale), m]));
  const issues: SeoAuditIssue[] = [];
  const titleMap = new Map<string, string[]>();
  const descMap = new Map<string, string[]>();
  const canonicalMap = new Map<string, string[]>();

  const pages = getAllSeoPageDefinitions();
  for (const page of pages) {
    for (const locale of ["en", "hi"] as const) {
      const meta = metaMap.get(metadataKey(page.entityType, page.entityKey, locale));
      const resolved = resolveSeo({ page, locale, global, metadata: meta });
      const path = localePath(page.path, locale);
      const idBase = `${page.entityType}:${page.entityKey}:${locale}`;

      if (!resolved.title?.trim()) {
        issues.push({
          id: `${idBase}:missing-title`,
          severity: "critical",
          category: "Title",
          message: `Missing title on ${page.label} (${locale})`,
          recommendation: "Add a unique SEO title between 30–60 characters.",
          entityType: page.entityType,
          entityKey: page.entityKey,
          locale,
          path,
        });
      } else {
        const score = titleLengthScore(resolved.title);
        if (score === "fail") {
          issues.push({
            id: `${idBase}:title-length`,
            severity: "medium",
            category: "Title",
            message: `Title length (${resolved.title.length} chars) on ${page.label} (${locale})`,
            recommendation: "Aim for 30–60 characters for better display in search results.",
            entityType: page.entityType,
            entityKey: page.entityKey,
            locale,
            path,
          });
        }
        const titles = titleMap.get(resolved.title) ?? [];
        titles.push(path);
        titleMap.set(resolved.title, titles);
      }

      if (!resolved.description?.trim()) {
        issues.push({
          id: `${idBase}:missing-description`,
          severity: "high",
          category: "Description",
          message: `Missing meta description on ${page.label} (${locale})`,
          recommendation: "Write a compelling description between 120–160 characters.",
          entityType: page.entityType,
          entityKey: page.entityKey,
          locale,
          path,
        });
      } else {
        const score = descriptionLengthScore(resolved.description);
        if (score === "fail") {
          issues.push({
            id: `${idBase}:desc-length`,
            severity: "low",
            category: "Description",
            message: `Description length (${resolved.description.length} chars) on ${page.label} (${locale})`,
            recommendation: "Aim for 120–160 characters.",
            entityType: page.entityType,
            entityKey: page.entityKey,
            locale,
            path,
          });
        }
        const descs = descMap.get(resolved.description) ?? [];
        descs.push(path);
        descMap.set(resolved.description, descs);
      }

      if (!resolved.canonical) {
        issues.push({
          id: `${idBase}:missing-canonical`,
          severity: "high",
          category: "Canonical",
          message: `Missing canonical URL on ${page.label} (${locale})`,
          recommendation: "Ensure each page has an absolute canonical URL.",
          entityType: page.entityType,
          entityKey: page.entityKey,
          locale,
          path,
        });
      } else {
        const cans = canonicalMap.get(resolved.canonical) ?? [];
        cans.push(path);
        canonicalMap.set(resolved.canonical, cans);
      }

      if (resolved.noindex) {
        issues.push({
          id: `${idBase}:noindex`,
          severity: "medium",
          category: "Indexing",
          message: `${page.label} (${locale}) is set to noindex`,
          recommendation: "Confirm this page should be excluded from search engines.",
          entityType: page.entityType,
          entityKey: page.entityKey,
          locale,
          path,
        });
      }

      if (!resolved.og.image) {
        issues.push({
          id: `${idBase}:missing-og`,
          severity: "low",
          category: "Social",
          message: `Missing OG image on ${page.label} (${locale})`,
          recommendation: "Add an Open Graph image (1200×630 recommended).",
          entityType: page.entityType,
          entityKey: page.entityKey,
          locale,
          path,
        });
      }

      if (!resolved.schemaJsonLd) {
        issues.push({
          id: `${idBase}:missing-schema`,
          severity: "low",
          category: "Structured Data",
          message: `No structured data on ${page.label} (${locale})`,
          recommendation: "Add JSON-LD schema or rely on auto-generated defaults.",
          entityType: page.entityType,
          entityKey: page.entityKey,
          locale,
          path,
        });
      } else {
        issues.push({
          id: `${idBase}:schema-ok`,
          severity: "good",
          category: "Structured Data",
          message: `${page.label} (${locale}) has structured data`,
          recommendation: "No action needed.",
          entityType: page.entityType,
          entityKey: page.entityKey,
          locale,
          path,
        });
      }
    }
  }

  for (const [title, paths] of titleMap) {
    if (paths.length > 1) {
      issues.push({
        id: `dup-title:${title.slice(0, 32)}`,
        severity: "high",
        category: "Title",
        message: `Duplicate title: "${title}"`,
        recommendation: `Used on: ${paths.join(", ")}. Give each page a unique title.`,
        path: paths[0],
      });
    }
  }
  for (const [desc, paths] of descMap) {
    if (paths.length > 1) {
      issues.push({
        id: `dup-desc:${desc.slice(0, 32)}`,
        severity: "medium",
        category: "Description",
        message: "Duplicate meta description across multiple pages",
        recommendation: `Used on: ${paths.join(", ")}. Write unique descriptions per page.`,
        path: paths[0],
      });
    }
  }
  for (const [canon, paths] of canonicalMap) {
    if (paths.length > 1) {
      issues.push({
        id: `dup-canonical:${canon}`,
        severity: "critical",
        category: "Canonical",
        message: `Duplicate canonical URL: ${canon}`,
        recommendation: `Conflicts on: ${paths.join(", ")}.`,
        path: paths[0],
      });
    }
  }

  if (!global.googleSiteVerification) {
    issues.push({
      id: "global:gsc",
      severity: "low",
      category: "Verification",
      message: "Google Search Console verification not configured",
      recommendation: "Add your verification meta tag in Global SEO Settings.",
    });
  }

  return issues.sort((a, b) => severityRank(a.severity) - severityRank(b.severity));
}

function severityRank(s: SeoAuditIssue["severity"]): number {
  const order = { critical: 0, high: 1, medium: 2, low: 3, good: 4 };
  return order[s];
}

export async function resolvePageSeo(
  entityType: string,
  entityKey: string,
  locale: string,
  overrides?: { contentTitle?: string; contentDescription?: string },
) {
  const global = await fetchSeoGlobalSettings();
  const metadata = await fetchSeoMetadata(entityType, entityKey, locale);
  const { resolveSeo } = await import("@/lib/seo-service");
  const page =
    entityType === "homepage"
      ? HOMEPAGE_DEFINITION
      : getAllSeoPageDefinitions().find((p) => p.entityType === entityType && p.entityKey === entityKey);
  if (!page) return null;
  return resolveSeo({
    page,
    locale,
    global,
    metadata,
    contentTitle: overrides?.contentTitle,
    contentDescription: overrides?.contentDescription,
  });
}

export async function seedSeoDefaults(options?: { force?: boolean }): Promise<{
  globalReady: boolean;
  pagesInserted: number;
  pagesSkipped: number;
}> {
  await ensureSeoSchema();

  let global = await fetchSeoGlobalSettings();
  const siteUrl = process.env.SITE_URL?.trim();
  if (siteUrl) {
    global = await saveSeoGlobalSettings({
      ...global,
      websiteUrl: siteUrl.replace(/\/$/, ""),
    });
  }

  const pages = getAllSeoPageDefinitions();
  const locales = ["en", "hi"] as const;
  let pagesInserted = 0;
  let pagesSkipped = 0;

  for (const page of pages) {
    for (const locale of locales) {
      const existing = await fetchSeoMetadata(page.entityType, page.entityKey, locale);
      if (existing && !options?.force) {
        pagesSkipped++;
        continue;
      }
      await saveSeoMetadata({
        entityType: page.entityType,
        entityKey: page.entityKey,
        locale,
        seoTitle: page.defaultTitle,
        metaDescription: page.defaultDescription,
        seoStatus: "optimized",
        noindex: page.noindex ?? false,
        nofollow: false,
      });
      pagesInserted++;
    }
  }

  return { globalReady: true, pagesInserted, pagesSkipped };
}
