import { createServerFn } from "@tanstack/react-start";
import type { SeoGlobalSettings, SeoMetadataInput, SeoRedirectInput } from "@/lib/seo-types";

export const getSeoGlobalAdmin = createServerFn({ method: "GET" }).handler(async () => {
  const mod = await import("./seo.server");
  return mod.handleGetSeoGlobal();
});

export const saveSeoGlobalAdmin = createServerFn({ method: "POST" })
  .validator((data: SeoGlobalSettings) => data)
  .handler(async ({ data }) => {
    const mod = await import("./seo.server");
    return mod.handleSaveSeoGlobal(data);
  });

export const listSeoPagesAdmin = createServerFn({ method: "GET" }).handler(async () => {
  const mod = await import("./seo.server");
  return mod.handleListSeoPages();
});

export const getSeoPageAdmin = createServerFn({ method: "GET" })
  .validator((data: { entityType: string; entityKey: string; locale: string }) => data)
  .handler(async ({ data }) => {
    const mod = await import("./seo.server");
    return mod.handleGetSeoPage(data.entityType, data.entityKey, data.locale);
  });

export const saveSeoPageAdmin = createServerFn({ method: "POST" })
  .validator((data: SeoMetadataInput) => data)
  .handler(async ({ data }) => {
    const mod = await import("./seo.server");
    return mod.handleSaveSeoPage(data);
  });

export const listSeoRedirectsAdmin = createServerFn({ method: "GET" }).handler(async () => {
  const mod = await import("./seo.server");
  return mod.handleListSeoRedirects();
});

export const saveSeoRedirectAdmin = createServerFn({ method: "POST" })
  .validator((data: SeoRedirectInput) => data)
  .handler(async ({ data }) => {
    const mod = await import("./seo.server");
    return mod.handleSaveSeoRedirect(data);
  });

export const deleteSeoRedirectAdmin = createServerFn({ method: "POST" })
  .validator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    const mod = await import("./seo.server");
    return mod.handleDeleteSeoRedirect(data.id);
  });

export const runSeoAuditAdmin = createServerFn({ method: "GET" }).handler(async () => {
  const mod = await import("./seo.server");
  return mod.handleRunSeoAudit();
});

export const getPublicPageSeo = createServerFn({ method: "GET" })
  .validator((data: { entityType: string; entityKey: string; locale: string }) => data)
  .handler(async ({ data }) => {
    const mod = await import("./seo.server");
    return mod.handlePublicPageSeo(data.entityType, data.entityKey, data.locale);
  });
