import { createServerFn } from "@tanstack/react-start";
import type { CmsBrandGroup, CmsContentType, CmsIconKey, CmsListFilters } from "@/lib/cms-types";

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

export const listCmsTeamAdmin = createServerFn({ method: "GET" })
  .validator((data: CmsListFilters | undefined) => data ?? {})
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleListTeam(data);
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

export const saveCmsTeamAdmin = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id?: number;
      slug: string;
      nameEn: string;
      nameHi: string;
      roleEn: string;
      roleHi: string;
      focusEn: string;
      focusHi: string;
      tagEn: string;
      tagHi: string;
      bioEn: string;
      bioHi: string;
      quoteEn: string;
      quoteHi: string;
      pubEn: string;
      pubHi: string;
      keyAchEn: string[];
      keyAchHi: string[];
      imageUrl: string;
      iconKey: CmsIconKey;
      showInBanner: boolean;
      bannerBadgeEn: string;
      bannerBadgeHi: string;
      sortOrder?: number;
    }) => data,
  )
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleSaveTeam(data);
  });

export const publishCmsItemAdmin = createServerFn({ method: "POST" })
  .validator((data: { type: CmsContentType; id: number }) => data)
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handlePublish(data);
  });

export const unpublishCmsItemAdmin = createServerFn({ method: "POST" })
  .validator((data: { type: CmsContentType; id: number }) => data)
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleUnpublish(data);
  });

export const archiveCmsItemAdmin = createServerFn({ method: "POST" })
  .validator((data: { type: CmsContentType; id: number }) => data)
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleArchive(data);
  });

export const reorderCmsItemsAdmin = createServerFn({ method: "POST" })
  .validator((data: { type: CmsContentType; ids: number[] }) => data)
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

export const getCmsAppLinksAdmin = createServerFn({ method: "GET" }).handler(async () => {
  const mod = await import("./admin-cms.server");
  return mod.handleGetAppLinks();
});

export const saveCmsAppLinksAdmin = createServerFn({ method: "POST" })
  .validator((data: { googlePlayUrl: string; appStoreUrl: string }) => data)
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleSaveAppLinks(data);
  });

export const getCmsAgriParkTourAdmin = createServerFn({ method: "GET" }).handler(async () => {
  const mod = await import("./admin-cms.server");
  return mod.handleGetAgriParkTour();
});

export const saveCmsAgriParkTourAdmin = createServerFn({ method: "POST" })
  .validator((data: { videoUrl: string; posterUrl: string }) => data)
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleSaveAgriParkTour(data);
  });

export const getCmsKisaanMallAdmin = createServerFn({ method: "GET" }).handler(async () => {
  const mod = await import("./admin-cms.server");
  return mod.handleGetKisaanMallLanding();
});

export const saveCmsKisaanMallLandingAdmin = createServerFn({ method: "POST" })
  .validator(
    (data: {
      badgeEn: string;
      badgeHi: string;
      titleEn: string;
      titleHi: string;
      descriptionEn: string;
      descriptionHi: string;
      placeholderEn: string;
      placeholderHi: string;
      successEn: string;
      successHi: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleSaveKisaanMallLanding(data);
  });

export const saveCmsKisaanMallPageAdmin = createServerFn({ method: "POST" })
  .validator((data: import("@/lib/cms-types").KisaanMallPageContent) => data)
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleSaveKisaanMallPage(data);
  });

export const listCmsCareerJobsAdmin = createServerFn({ method: "GET" })
  .validator((data: CmsListFilters | undefined) => data ?? {})
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleListCareerJobs(data);
  });

export const saveCmsCareerJobAdmin = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id?: number;
      slug: string;
      titleEn: string;
      titleHi: string;
      deptEn: string;
      deptHi: string;
      departmentCategory: "Agronomy" | "Corporate" | "Retail";
      locEn: string;
      locHi: string;
      typeEn: string;
      typeHi: string;
      descEn: string;
      descHi: string;
      experienceLevelEn: string;
      experienceLevelHi: string;
      highlightsEn: string[];
      highlightsHi: string[];
      reqsEn: string[];
      reqsHi: string[];
      responsibilitiesEn: string[];
      responsibilitiesHi: string[];
      sortOrder?: number;
    }) => data,
  )
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleSaveCareerJob(data);
  });

export const getCmsCareersAdmin = createServerFn({ method: "GET" }).handler(async () => {
  const mod = await import("./admin-cms.server");
  return mod.handleGetCareersAdmin();
});

export const saveCmsCareersPageAdmin = createServerFn({ method: "POST" })
  .validator((data: import("@/lib/cms-types").CareersPageContent) => data)
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleSaveCareersPage(data);
  });

export const getCmsSiteContactAdmin = createServerFn({ method: "GET" }).handler(async () => {
  const mod = await import("./admin-cms.server");
  return mod.handleGetSiteContactAdmin();
});

export const saveCmsSiteContactAdmin = createServerFn({ method: "POST" })
  .validator((data: import("@/lib/cms-types").SiteContactConfig) => data)
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleSaveSiteContactAdmin(data);
  });

export const getCmsAboutPageAdmin = createServerFn({ method: "GET" }).handler(async () => {
  const mod = await import("./admin-cms.server");
  return mod.handleGetAboutPageAdmin();
});

export const saveCmsAboutPageAdmin = createServerFn({ method: "POST" })
  .validator((data: import("@/lib/cms-types").AboutPageContent) => data)
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleSaveAboutPageAdmin(data);
  });

export const getCmsContactPageAdmin = createServerFn({ method: "GET" }).handler(async () => {
  const mod = await import("./admin-cms.server");
  return mod.handleGetContactPageAdmin();
});

export const saveCmsContactPageAdmin = createServerFn({ method: "POST" })
  .validator((data: import("@/lib/cms-types").ContactPageContent) => data)
  .handler(async ({ data }) => {
    const mod = await import("./admin-cms.server");
    return mod.handleSaveContactPageAdmin(data);
  });
