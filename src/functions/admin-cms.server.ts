import { mkdir, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { randomBytes } from "node:crypto";
import { assertSameOrigin, requireSessionUser } from "@/server/auth";
import { canManageSettings } from "@/lib/admin-constants";
import { isDbConfigured } from "@/server/db";
import {
  archiveCmsLogo,
  archiveCmsStat,
  archiveCmsStory,
  fetchCmsOverview,
  listCmsLogos,
  listCmsStats,
  listCmsStories,
  publishCmsLogo,
  publishCmsStat,
  publishCmsStory,
  reorderCmsLogos,
  reorderCmsStats,
  reorderCmsStories,
  saveAppLinks,
  saveCmsLogo,
  saveCmsStat,
  saveCmsStory,
  unpublishCmsLogo,
  unpublishCmsStat,
  unpublishCmsStory,
  fetchAppLinks,
  fetchAgriParkTour,
  saveAgriParkTour,
  fetchAgriParkChapter,
  saveAgriParkChapter,
  fetchKisaanMallLanding,
  saveKisaanMallLanding,
  fetchKisaanMallPage,
  saveKisaanMallPage,
  fetchCareersPage,
  saveCareersPage,
  fetchSiteContact,
  saveSiteContact,
  fetchAboutPage,
  saveAboutPage,
  fetchContactPage,
  saveContactPage,
} from "@/server/cms-queries";
import {
  countNewsletterSignups,
  listNewsletterSignups,
  countCareerApplications,
  listCareerApplications,
} from "@/server/admin-queries";
import {
  archiveCmsTeamMember,
  listCmsTeam,
  publishCmsTeamMember,
  reorderCmsTeam,
  saveCmsTeamMember,
  unpublishCmsTeamMember,
} from "@/server/cms-team-queries";
import {
  archiveCmsCareerJob,
  listCmsCareerJobs,
  publishCmsCareerJob,
  reorderCmsCareerJobs,
  saveCmsCareerJob,
  unpublishCmsCareerJob,
  countPublishedCareerJobs,
} from "@/server/cms-careers-queries";
import type {
  CmsListFilters,
  HomeCmsAppLinks,
  HomeCmsAgriParkTour,
  HomeAgriParkChapterContent,
  KisaanMallLanding,
  KisaanMallPageContent,
  CareersPageContent,
  SiteContactConfig,
  AboutPageContent,
  ContactPageContent,
} from "@/lib/cms-types";
import {
  mockLogos,
  mockStats,
  mockStories,
  mockTeam,
  mockNewsletterSignups,
  mockCareerJobs,
  mockCareerApplications,
} from "@/server/cms-memory";

function failAuth(err: unknown) {
  const message = err instanceof Error ? err.message : "Error";
  if (message === "UNAUTHORIZED") return { ok: false as const, error: "Please sign in." };
  if (message === "FORBIDDEN") return { ok: false as const, error: "You do not have permission." };
  if (message === "CSRF") return { ok: false as const, error: "Request blocked." };
  if (message === "NOT_FOUND") return { ok: false as const, error: "Item not found." };
  throw err;
}

async function requireEditor() {
  const user = await requireSessionUser();
  if (!canManageSettings(user.role)) throw new Error("FORBIDDEN");
  return user;
}

const IMAGE_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);
const VIDEO_MIME = new Set(["video/mp4", "video/webm"]);

function filterMock<T extends { status: string; hasUnpublishedChanges: boolean }>(
  rows: T[],
  filters: CmsListFilters,
  match: (r: T) => boolean,
) {
  return rows
    .filter((r) => {
      if (filters.status && filters.status !== "all" && r.status !== filters.status) return false;
      if (!filters.status || filters.status === "all") {
        if (r.status === "archived") return false;
      }
      return match(r);
    })
    .sort((a, b) => (a as { sortOrder: number }).sortOrder - (b as { sortOrder: number }).sortOrder);
}

export async function handleCmsOverview() {
  try {
    await requireSessionUser();
    if (!isDbConfigured()) {
      const count = (rows: typeof mockStats) => ({
        published: rows.filter((r) => r.status === "published").length,
        draft: rows.filter((r) => r.status === "draft").length,
        pending: rows.filter((r) => r.status === "published" && r.hasUnpublishedChanges).length,
      });
      return {
        ok: true as const,
        overview: { stats: count(mockStats), logos: count(mockLogos), stories: count(mockStories), team: count(mockTeam) },
        newsletterWaitlist: mockNewsletterSignups.filter((s) => s.source_page === "/kisaan-mall").length,
        careersJobs: mockCareerJobs.filter((j) => j.status === "published").length,
        careerApplications: mockCareerApplications.length,
        dbConfigured: false,
      };
    }
    const overview = await fetchCmsOverview();
    const newsletterWaitlist = await countNewsletterSignups("/kisaan-mall");
    const careersJobs = await countPublishedCareerJobs();
    const careerApplications = await countCareerApplications();
    return {
      ok: true as const,
      overview,
      newsletterWaitlist,
      careersJobs,
      careerApplications,
      dbConfigured: true,
    };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleListStats(filters: CmsListFilters) {
  try {
    await requireSessionUser();
    if (!isDbConfigured()) {
      const rows = filterMock(mockStats, filters, (r) =>
        !filters.q ||
        [r.labelEn, r.labelHi, r.slug].some((f) =>
          f.toLowerCase().includes(filters.q!.toLowerCase()),
        ),
      );
      return { ok: true as const, items: rows, dbConfigured: false };
    }
    const items = await listCmsStats(filters);
    return { ok: true as const, items, dbConfigured: true };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleListLogos(filters: CmsListFilters) {
  try {
    await requireSessionUser();
    if (!isDbConfigured()) {
      const rows = filterMock(mockLogos, filters, (r) => {
        if (filters.group && filters.group !== "all" && r.group !== filters.group) return false;
        return (
          !filters.q ||
          [r.name, r.group].some((f) => f.toLowerCase().includes(filters.q!.toLowerCase()))
        );
      });
      return { ok: true as const, items: rows, dbConfigured: false };
    }
    const items = await listCmsLogos(filters);
    return { ok: true as const, items, dbConfigured: true };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleListStories(filters: CmsListFilters) {
  try {
    await requireSessionUser();
    if (!isDbConfigured()) {
      const rows = filterMock(mockStories, filters, (r) =>
        !filters.q ||
        [r.nameEn, r.nameHi, r.slug, r.cropEn].some((f) =>
          f.toLowerCase().includes(filters.q!.toLowerCase()),
        ),
      );
      return { ok: true as const, items: rows, dbConfigured: false };
    }
    const items = await listCmsStories(filters);
    return { ok: true as const, items, dbConfigured: true };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleListTeam(filters: CmsListFilters) {
  try {
    await requireSessionUser();
    const matchTeam = (r: (typeof mockTeam)[number]) =>
      !filters.q ||
      [r.nameEn, r.nameHi, r.slug, r.roleEn].some((f) =>
        f.toLowerCase().includes(filters.q!.toLowerCase()),
      );

    if (!isDbConfigured()) {
      const rows = filterMock(mockTeam, filters, matchTeam);
      return { ok: true as const, items: rows, dbConfigured: false };
    }

    let items = await listCmsTeam(filters);
    if (!items.length) {
      const { ensureTeamSchema } = await import("@/server/cms-team-queries");
      await ensureTeamSchema();
      items = await listCmsTeam(filters);
    }
    if (!items.length) {
      const rows = filterMock(mockTeam, filters, matchTeam);
      if (rows.length) {
        return { ok: true as const, items: rows, dbConfigured: false };
      }
    }
    return { ok: true as const, items, dbConfigured: true };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSaveTeam(data: Parameters<typeof saveCmsTeamMember>[0]) {
  try {
    assertSameOrigin();
    await requireEditor();
    if (!isDbConfigured()) {
      if (data.id) {
        const idx = mockTeam.findIndex((r) => r.id === data.id);
        if (idx < 0) return { ok: false as const, error: "Item not found." };
        const updated = {
          ...mockTeam[idx]!,
          ...data,
          keyAchEn: data.keyAchEn ?? mockTeam[idx]!.keyAchEn,
          keyAchHi: data.keyAchHi ?? mockTeam[idx]!.keyAchHi,
          updatedAt: new Date().toISOString(),
          hasUnpublishedChanges: true,
        };
        mockTeam[idx] = updated;
        return { ok: true as const, item: updated };
      }
      const item = {
        id: mockTeam.length + 1,
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
        keyAchEn: data.keyAchEn ?? [],
        keyAchHi: data.keyAchHi ?? [],
        imageUrl: data.imageUrl ?? "",
        iconKey: data.iconKey ?? "users",
        showInBanner: data.showInBanner ?? false,
        bannerBadgeEn: data.bannerBadgeEn ?? "",
        bannerBadgeHi: data.bannerBadgeHi ?? "",
        sortOrder: mockTeam.length,
        status: "draft" as const,
        livePayload: null,
        publishedAt: null,
        updatedAt: new Date().toISOString(),
        hasUnpublishedChanges: true,
      };
      mockTeam.push(item);
      return { ok: true as const, item };
    }
    const item = await saveCmsTeamMember(data);
    return { ok: true as const, item };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSaveStat(data: Parameters<typeof saveCmsStat>[0]) {
  try {
    assertSameOrigin();
    await requireEditor();
    if (!isDbConfigured()) {
      if (data.id) {
        const idx = mockStats.findIndex((r) => r.id === data.id);
        if (idx < 0) return { ok: false as const, error: "Item not found." };
        const updated = {
          ...mockStats[idx]!,
          ...data,
          updatedAt: new Date().toISOString(),
          hasUnpublishedChanges: true,
        };
        mockStats[idx] = updated;
        return { ok: true as const, item: updated };
      }
      const item = {
        id: mockStats.length + 1,
        slug: data.slug!,
        iconKey: data.iconKey!,
        numValue: data.numValue ?? 0,
        prefix: data.prefix,
        suffixEn: data.suffixEn ?? "",
        suffixHi: data.suffixHi ?? "",
        labelEn: data.labelEn ?? "",
        labelHi: data.labelHi ?? "",
        sortOrder: mockStats.length,
        status: "draft" as const,
        livePayload: null,
        publishedAt: null,
        updatedAt: new Date().toISOString(),
        hasUnpublishedChanges: true,
      };
      mockStats.push(item);
      return { ok: true as const, item };
    }
    const item = await saveCmsStat(data);
    return { ok: true as const, item };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSaveLogo(data: Parameters<typeof saveCmsLogo>[0]) {
  try {
    assertSameOrigin();
    await requireEditor();
    if (!isDbConfigured()) {
      if (data.id) {
        const idx = mockLogos.findIndex((r) => r.id === data.id);
        if (idx < 0) return { ok: false as const, error: "Item not found." };
        const updated = {
          ...mockLogos[idx]!,
          ...data,
          updatedAt: new Date().toISOString(),
          hasUnpublishedChanges: true,
        };
        mockLogos[idx] = updated;
        return { ok: true as const, item: updated };
      }
      const item = {
        id: mockLogos.length + 1,
        name: data.name ?? "",
        group: data.group ?? "partners",
        imageUrl: data.imageUrl ?? "",
        sortOrder: mockLogos.length,
        status: "draft" as const,
        livePayload: null,
        publishedAt: null,
        updatedAt: new Date().toISOString(),
        hasUnpublishedChanges: true,
      };
      mockLogos.push(item);
      return { ok: true as const, item };
    }
    const item = await saveCmsLogo(data);
    return { ok: true as const, item };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSaveStory(data: Parameters<typeof saveCmsStory>[0]) {
  try {
    assertSameOrigin();
    await requireEditor();
    if (!isDbConfigured()) {
      if (data.id) {
        const idx = mockStories.findIndex((r) => r.id === data.id);
        if (idx < 0) return { ok: false as const, error: "Item not found." };
        const updated = { ...mockStories[idx]!, ...data, updatedAt: new Date().toISOString(), hasUnpublishedChanges: true };
        mockStories[idx] = updated;
        return { ok: true as const, item: updated };
      }
      const item = {
        id: mockStories.length + 1,
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
        sortOrder: mockStories.length,
        status: "draft" as const,
        livePayload: null,
        publishedAt: null,
        updatedAt: new Date().toISOString(),
        hasUnpublishedChanges: true,
      };
      mockStories.push(item);
      return { ok: true as const, item };
    }
    const item = await saveCmsStory(data);
    return { ok: true as const, item };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleListCareerJobs(filters: CmsListFilters) {
  try {
    await requireSessionUser();
    if (!isDbConfigured()) {
      const rows = filterMock(mockCareerJobs, filters, (r) =>
        !filters.q ||
        [r.titleEn, r.titleHi, r.slug, r.deptEn].some((f) =>
          f.toLowerCase().includes(filters.q!.toLowerCase()),
        ),
      );
      return { ok: true as const, items: rows, dbConfigured: false };
    }
    const items = await listCmsCareerJobs(filters);
    return { ok: true as const, items, dbConfigured: true };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSaveCareerJob(data: Parameters<typeof saveCmsCareerJob>[0]) {
  try {
    assertSameOrigin();
    await requireEditor();
    const item = await saveCmsCareerJob(data);
    return { ok: true as const, item };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handlePublish(data: { type: "stats" | "logos" | "stories" | "team" | "careerJobs"; id: number }) {
  try {
    assertSameOrigin();
    await requireEditor();
    if (!isDbConfigured()) {
      const store =
        data.type === "stats"
          ? mockStats
          : data.type === "logos"
            ? mockLogos
            : data.type === "stories"
              ? mockStories
              : data.type === "team"
                ? mockTeam
                : mockCareerJobs;
      const idx = store.findIndex((r) => r.id === data.id);
      if (idx < 0) return { ok: false as const, error: "Item not found." };
      const row = store[idx]!;
      const payload = { ...row };
      delete (payload as { livePayload?: unknown }).livePayload;
      const updated = {
        ...row,
        status: "published" as const,
        livePayload: payload,
        publishedAt: new Date().toISOString(),
        hasUnpublishedChanges: false,
      };
      store[idx] = updated as (typeof store)[number];
      return { ok: true as const, item: updated };
    }
    const item =
      data.type === "stats"
        ? await publishCmsStat(data.id)
        : data.type === "logos"
          ? await publishCmsLogo(data.id)
          : data.type === "stories"
            ? await publishCmsStory(data.id)
            : data.type === "team"
              ? await publishCmsTeamMember(data.id)
              : await publishCmsCareerJob(data.id);
    return { ok: true as const, item };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleUnpublish(data: {
  type: "stats" | "logos" | "stories" | "team" | "careerJobs";
  id: number;
}) {
  try {
    assertSameOrigin();
    await requireEditor();
    if (!isDbConfigured()) {
      const store =
        data.type === "stats"
          ? mockStats
          : data.type === "logos"
            ? mockLogos
            : data.type === "stories"
              ? mockStories
              : data.type === "team"
                ? mockTeam
                : mockCareerJobs;
      const idx = store.findIndex((r) => r.id === data.id);
      if (idx < 0) return { ok: false as const, error: "Item not found." };
      store[idx] = { ...store[idx]!, status: "draft" };
      return { ok: true as const, item: store[idx] };
    }
    const item =
      data.type === "stats"
        ? await unpublishCmsStat(data.id)
        : data.type === "logos"
          ? await unpublishCmsLogo(data.id)
          : data.type === "stories"
            ? await unpublishCmsStory(data.id)
            : data.type === "team"
              ? await unpublishCmsTeamMember(data.id)
              : await unpublishCmsCareerJob(data.id);
    return { ok: true as const, item };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleArchive(data: {
  type: "stats" | "logos" | "stories" | "team" | "careerJobs";
  id: number;
}) {
  try {
    assertSameOrigin();
    await requireEditor();
    if (!isDbConfigured()) {
      const store =
        data.type === "stats"
          ? mockStats
          : data.type === "logos"
            ? mockLogos
            : data.type === "stories"
              ? mockStories
              : data.type === "team"
                ? mockTeam
                : mockCareerJobs;
      const idx = store.findIndex((r) => r.id === data.id);
      if (idx < 0) return { ok: false as const, error: "Item not found." };
      store[idx] = { ...store[idx]!, status: "archived" };
      return { ok: true as const };
    }
    if (data.type === "stats") await archiveCmsStat(data.id);
    else if (data.type === "logos") await archiveCmsLogo(data.id);
    else if (data.type === "stories") await archiveCmsStory(data.id);
    else if (data.type === "team") await archiveCmsTeamMember(data.id);
    else await archiveCmsCareerJob(data.id);
    return { ok: true as const };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleReorder(data: {
  type: "stats" | "logos" | "stories" | "team" | "careerJobs";
  ids: number[];
}) {
  try {
    assertSameOrigin();
    await requireEditor();
    if (!isDbConfigured()) {
      const store =
        data.type === "stats"
          ? mockStats
          : data.type === "logos"
            ? mockLogos
            : data.type === "stories"
              ? mockStories
              : data.type === "team"
                ? mockTeam
                : mockCareerJobs;
      data.ids.forEach((id, order) => {
        const idx = store.findIndex((r) => r.id === id);
        if (idx >= 0) store[idx] = { ...store[idx]!, sortOrder: order };
      });
      store.sort((a, b) => a.sortOrder - b.sortOrder);
      return { ok: true as const };
    }
    if (data.type === "stats") await reorderCmsStats(data.ids);
    else if (data.type === "logos") await reorderCmsLogos(data.ids);
    else if (data.type === "stories") await reorderCmsStories(data.ids);
    else if (data.type === "team") await reorderCmsTeam(data.ids);
    else await reorderCmsCareerJobs(data.ids);
    return { ok: true as const };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleUploadMedia(data: {
  filename: string;
  mime: string;
  base64: string;
  kind: "image" | "video";
}) {
  try {
    assertSameOrigin();
    await requireEditor();
    const allowed = data.kind === "image" ? IMAGE_MIME : VIDEO_MIME;
    if (!allowed.has(data.mime)) {
      return { ok: false as const, error: "Unsupported file type." };
    }
    const buf = Buffer.from(data.base64, "base64");
    const maxSize = data.kind === "image" ? 2 * 1024 * 1024 : 40 * 1024 * 1024;
    if (buf.byteLength > maxSize) {
      return {
        ok: false as const,
        error: data.kind === "image" ? "Image must be 2MB or smaller." : "Video must be 40MB or smaller.",
      };
    }
    const ext =
      extname(data.filename).toLowerCase() ||
      (data.mime === "video/webm" ? ".webm" : data.mime === "video/mp4" ? ".mp4" : ".jpg");
    const allowedExt =
      data.kind === "image"
        ? [".jpg", ".jpeg", ".png", ".webp"]
        : [".mp4", ".webm"];
    if (!allowedExt.includes(ext)) {
      return { ok: false as const, error: "Unsupported extension." };
    }
    const subdir = data.kind === "image" ? "images" : "videos";
    const dir = join(process.cwd(), "public", "uploads", "cms", subdir);
    await mkdir(dir, { recursive: true });
    const name = `${randomBytes(12).toString("hex")}${ext}`;
    await writeFile(join(dir, name), buf);
    const url = `/uploads/cms/${subdir}/${name}`;
    return { ok: true as const, url };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleTranslateToHindi(texts: string[]) {
  try {
    assertSameOrigin();
    await requireEditor();
    if (!texts.length) return { ok: true as const, translations: [] as string[] };
    const { translateTextsEnToHi } = await import("@/server/cms-translate");
    const translations = await translateTextsEnToHi(texts);
    return { ok: true as const, translations };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleGetAppLinks() {
  try {
    await requireSessionUser();
    const appLinks = await fetchAppLinks();
    return { ok: true as const, appLinks, dbConfigured: isDbConfigured() };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSaveAppLinks(links: HomeCmsAppLinks) {
  try {
    assertSameOrigin();
    await requireEditor();
    const appLinks = await saveAppLinks(links);
    return { ok: true as const, appLinks };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleGetAgriParkTour() {
  try {
    await requireSessionUser();
    const agriParkTour = await fetchAgriParkTour();
    const chapter = await fetchAgriParkChapter();
    return { ok: true as const, agriParkTour, chapter, dbConfigured: isDbConfigured() };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSaveAgriParkChapter(chapter: HomeAgriParkChapterContent) {
  try {
    assertSameOrigin();
    await requireEditor();
    const saved = await saveAgriParkChapter(chapter);
    return { ok: true as const, chapter: saved };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSaveAgriParkTour(tour: HomeCmsAgriParkTour) {
  try {
    assertSameOrigin();
    await requireEditor();
    const agriParkTour = await saveAgriParkTour(tour);
    return { ok: true as const, agriParkTour };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleGetKisaanMallLanding() {
  try {
    await requireSessionUser();
    const landing = await fetchKisaanMallLanding();
    const page = await fetchKisaanMallPage();
    const signups = await listNewsletterSignups("/kisaan-mall");
    return {
      ok: true as const,
      landing,
      page,
      signups,
      waitlistCount: signups.length,
      dbConfigured: isDbConfigured(),
    };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSaveKisaanMallPage(content: KisaanMallPageContent) {
  try {
    assertSameOrigin();
    await requireEditor();
    const page = await saveKisaanMallPage(content);
    return { ok: true as const, page };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSaveKisaanMallLanding(landing: KisaanMallLanding) {
  try {
    assertSameOrigin();
    await requireEditor();
    const saved = await saveKisaanMallLanding(landing);
    return { ok: true as const, landing: saved };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleGetCareersAdmin() {
  try {
    await requireSessionUser();
    const content = await fetchCareersPage();
    const jobs = await listCmsCareerJobs({ status: "all" });
    const applications = await listCareerApplications();
    return {
      ok: true as const,
      content,
      jobs,
      applications,
      dbConfigured: isDbConfigured(),
    };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSaveCareersPage(content: CareersPageContent) {
  try {
    assertSameOrigin();
    await requireEditor();
    const saved = await saveCareersPage(content);
    return { ok: true as const, content: saved };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleGetSiteContactAdmin() {
  try {
    await requireSessionUser();
    const contact = await fetchSiteContact();
    return { ok: true as const, contact, dbConfigured: isDbConfigured() };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSaveSiteContactAdmin(contact: SiteContactConfig) {
  try {
    assertSameOrigin();
    await requireEditor();
    const saved = await saveSiteContact(contact);
    return { ok: true as const, contact: saved };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleGetAboutPageAdmin() {
  try {
    await requireSessionUser();
    const content = await fetchAboutPage();
    return { ok: true as const, content, dbConfigured: isDbConfigured() };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSaveAboutPageAdmin(content: AboutPageContent) {
  try {
    assertSameOrigin();
    await requireEditor();
    const saved = await saveAboutPage(content);
    return { ok: true as const, content: saved };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleGetContactPageAdmin() {
  try {
    await requireSessionUser();
    const content = await fetchContactPage();
    return { ok: true as const, content, dbConfigured: isDbConfigured() };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSaveContactPageAdmin(content: ContactPageContent) {
  try {
    assertSameOrigin();
    await requireEditor();
    const saved = await saveContactPage(content);
    return { ok: true as const, content: saved };
  } catch (err) {
    return failAuth(err);
  }
}
