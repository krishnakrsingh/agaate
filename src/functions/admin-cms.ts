import { createServerFn } from "@tanstack/react-start";
import type { CmsBrandGroup, CmsIconKey, CmsListFilters, CmsStatus } from "@/lib/cms-types";

export const getCmsOverview = createServerFn({ method: "GET" }).handler(async () => {
  const mod = await import("./admin-cms.server");
  return mod.handleCmsOverview();
});

export const listCmsStatsAdmin = createServerFn({ method: "GET" })
  .validator((data: CmsListFilters | undefined) => data ?? {})
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleListStats(data);
  });

export const listCmsLogosAdmin = createServerFn({ method: "GET" })
  .validator((data: CmsListFilters | undefined) => data ?? {})
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleListLogos(data);
  });

export const listCmsStoriesAdmin = createServerFn({ method: "GET" })
  .validator((data: CmsListFilters | undefined) => data ?? {})
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleListStories(data);
  });

export const saveCmsStatAdmin = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id?: number;
      slug: string;
      iconKey: CmsIconKey;
      numValue: number;
      prefix?: string;
      suffixEn: string;
      suffixHi: string;
      labelEn: string;
      labelHi: string;
      sortOrder?: number;
    }) => data,
  )
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleSaveStat(data);
  });

export const saveCmsLogoAdmin = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id?: number;
      name: string;
      group: CmsBrandGroup;
      imageUrl: string;
      sortOrder?: number;
    }) => data,
  )
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleSaveLogo(data);
  });

export const saveCmsStoryAdmin = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id?: number;
      slug: string;
      nameEn: string;
      nameHi: string;
      roleEn: string;
      roleHi: string;
      locationEn: string;
      locationHi: string;
      acresEn: string;
      acresHi: string;
      cropEn: string;
      cropHi: string;
      quoteEn: string;
      quoteHi: string;
      badgeEn: string;
      badgeHi: string;
      thumbnailUrl: string;
      videoUrl: string;
      sortOrder?: number;
    }) => data,
  )
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleSaveStory(data);
  });

export const publishCmsItemAdmin = createServerFn({ method: "POST" })
  .validator((data: { type: "stats" | "logos" | "stories"; id: number }) => data)
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handlePublish(data);
  });

export const unpublishCmsItemAdmin = createServerFn({ method: "POST" })
  .validator((data: { type: "stats" | "logos" | "stories"; id: number }) => data)
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleUnpublish(data);
  });

export const archiveCmsItemAdmin = createServerFn({ method: "POST" })
  .validator((data: { type: "stats" | "logos" | "stories"; id: number }) => data)
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleArchive(data);
  });

export const reorderCmsItemsAdmin = createServerFn({ method: "POST" })
  .validator((data: { type: "stats" | "logos" | "stories"; ids: number[] }) => data)
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleReorder(data);
  });

export const uploadCmsMediaAdmin = createServerFn({ method: "POST" })
  .validator(
    (data: { filename: string; mime: string; base64: string; kind: "image" | "video" }) => data,
  )
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleUploadMedia(data);
  });

export const translateCmsToHindiAdmin = createServerFn({ method: "POST" })
  .validator((data: { texts: string[] }) => data)
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleTranslateToHindi(data.texts);
  });
