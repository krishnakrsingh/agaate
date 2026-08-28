import { assertSameOrigin, requireSessionUser } from "@/server/auth";
import { canManageSettings } from "@/lib/admin-constants";
import type { SeoGlobalSettings, SeoMetadataInput, SeoRedirectInput } from "@/lib/seo-types";
import {
  buildSitemapEntries,
  deleteSeoRedirect,
  fetchSeoGlobalSettings,
  fetchSeoMetadata,
  listSeoMetadata,
  listSeoRedirects,
  renderRobotsTxt,
  renderSitemapXml,
  resolvePageSeo,
  runSeoAudit,
  saveSeoGlobalSettings,
  saveSeoMetadata,
  saveSeoRedirect,
} from "@/server/seo-queries";
import { getAllSeoPageDefinitions } from "@/lib/seo-registry";

function failAuth(err: unknown) {
  const message = err instanceof Error ? err.message : "Error";
  if (message === "UNAUTHORIZED") return { ok: false as const, error: "Please sign in." };
  if (message === "FORBIDDEN") return { ok: false as const, error: "You do not have permission." };
  if (message === "CSRF") return { ok: false as const, error: "Request blocked." };
  throw err;
}

function requireEditor() {
  const user = requireSessionUser();
  if (!canManageSettings(user.role)) throw new Error("FORBIDDEN");
  return user;
}

export async function handleGetSeoGlobal() {
  try {
    requireSessionUser();
    const settings = await fetchSeoGlobalSettings();
    return { ok: true as const, settings };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSaveSeoGlobal(payload: SeoGlobalSettings) {
  try {
    assertSameOrigin();
    requireEditor();
    const settings = await saveSeoGlobalSettings(payload);
    return { ok: true as const, settings };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleListSeoPages() {
  try {
    requireSessionUser();
    const pages = getAllSeoPageDefinitions();
    const metadata = await listSeoMetadata();
    return { ok: true as const, pages, metadata };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleGetSeoPage(entityType: string, entityKey: string, locale: string) {
  try {
    requireSessionUser();
    const metadata = await fetchSeoMetadata(entityType, entityKey, locale);
    const resolved = await resolvePageSeo(entityType, entityKey, locale);
    const pages = getAllSeoPageDefinitions();
    const page = pages.find((p) => p.entityType === entityType && p.entityKey === entityKey);
    return { ok: true as const, page, metadata, resolved };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSaveSeoPage(input: SeoMetadataInput) {
  try {
    assertSameOrigin();
    requireEditor();
    const saved = await saveSeoMetadata(input);
    const resolved = await resolvePageSeo(input.entityType, input.entityKey, input.locale);
    return { ok: true as const, metadata: saved, resolved };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleListSeoRedirects() {
  try {
    requireSessionUser();
    const redirects = await listSeoRedirects();
    return { ok: true as const, redirects };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSaveSeoRedirect(input: SeoRedirectInput) {
  try {
    assertSameOrigin();
    requireEditor();
    const redirect = await saveSeoRedirect(input);
    return { ok: true as const, redirect };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error";
    if (message === "REDIRECT_LOOP") {
      return { ok: false as const, error: "This redirect would create a loop." };
    }
    if (message === "SAME_PATH") {
      return { ok: false as const, error: "Source and destination cannot be the same." };
    }
    return failAuth(err);
  }
}

export async function handleDeleteSeoRedirect(id: number) {
  try {
    assertSameOrigin();
    requireEditor();
    await deleteSeoRedirect(id);
    return { ok: true as const };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleRunSeoAudit() {
  try {
    requireSessionUser();
    const issues = await runSeoAudit();
    const summary = {
      critical: issues.filter((i) => i.severity === "critical").length,
      high: issues.filter((i) => i.severity === "high").length,
      medium: issues.filter((i) => i.severity === "medium").length,
      low: issues.filter((i) => i.severity === "low").length,
      good: issues.filter((i) => i.severity === "good").length,
    };
    return { ok: true as const, issues, summary };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handlePublicSitemap() {
  const entries = await buildSitemapEntries();
  return renderSitemapXml(entries);
}

export async function handlePublicRobots() {
  return renderRobotsTxt();
}

export async function handlePublicPageSeo(
  entityType: string,
  entityKey: string,
  locale: string,
) {
  return resolvePageSeo(entityType, entityKey, locale);
}
