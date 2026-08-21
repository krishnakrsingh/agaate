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
  saveCmsLogo,
  saveCmsStat,
  saveCmsStory,
  unpublishCmsLogo,
  unpublishCmsStat,
  unpublishCmsStory,
} from "@/server/cms-queries";
import {
  archiveCmsTeamMember,
  listCmsTeam,
  publishCmsTeamMember,
  reorderCmsTeam,
  saveCmsTeamMember,
  unpublishCmsTeamMember,
} from "@/server/cms-team-queries";
import type { CmsListFilters } from "@/lib/cms-types";
import { mockLogos, mockStats, mockStories, mockTeam } from "@/server/cms-memory";

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
        dbConfigured: false,
      };
    }
    const overview = await fetchCmsOverview();
    return { ok: true as const, overview, dbConfigured: true };
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
    if (!isDbConfigured()) {
      const rows = filterMock(mockTeam, filters, (r) =>
        !filters.q ||
        [r.nameEn, r.nameHi, r.slug, r.roleEn].some((f) =>
          f.toLowerCase().includes(filters.q!.toLowerCase()),
        ),
      );
      return { ok: true as const, items: rows, dbConfigured: false };
    }
    const items = await listCmsTeam(filters);
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

export async function handlePublish(data: { type: "stats" | "logos" | "stories" | "team"; id: number }) {
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
              : mockTeam;
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
            : await publishCmsTeamMember(data.id);
    return { ok: true as const, item };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleUnpublish(data: { type: "stats" | "logos" | "stories" | "team"; id: number }) {
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
              : mockTeam;
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
            : await unpublishCmsTeamMember(data.id);
    return { ok: true as const, item };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleArchive(data: { type: "stats" | "logos" | "stories" | "team"; id: number }) {
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
              : mockTeam;
      const idx = store.findIndex((r) => r.id === data.id);
      if (idx < 0) return { ok: false as const, error: "Item not found." };
      store[idx] = { ...store[idx]!, status: "archived" };
      return { ok: true as const };
    }
    if (data.type === "stats") await archiveCmsStat(data.id);
    else if (data.type === "logos") await archiveCmsLogo(data.id);
    else if (data.type === "stories") await archiveCmsStory(data.id);
    else await archiveCmsTeamMember(data.id);
    return { ok: true as const };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleReorder(data: {
  type: "stats" | "logos" | "stories" | "team";
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
              : mockTeam;
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
    else await reorderCmsTeam(data.ids);
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
