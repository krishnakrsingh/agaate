import {
  getFallbackSeedLogos,
  getFallbackSeedStats,
  getFallbackSeedStories,
} from "@/data/homepage-fallback";
import type { CmsLogoRow, CmsStatRow, CmsStoryRow } from "@/lib/cms-types";

export let mockStats: CmsStatRow[] = getFallbackSeedStats().map((s, i) => ({
  id: i + 1,
  ...s,
  prefix: s.prefix ?? undefined,
  sortOrder: i,
  status: "published" as const,
  livePayload: {
    slug: s.slug,
    iconKey: s.iconKey,
    numValue: s.numValue,
    prefix: s.prefix ?? undefined,
    suffixEn: s.suffixEn,
    suffixHi: s.suffixHi,
    labelEn: s.labelEn,
    labelHi: s.labelHi,
  },
  publishedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  hasUnpublishedChanges: false,
}));

export let mockLogos: CmsLogoRow[] = getFallbackSeedLogos().map((l, i) => ({
  id: i + 1,
  name: l.name,
  group: l.group,
  imageUrl: l.imageUrl,
  sortOrder: l.sortOrder,
  status: "published" as const,
  livePayload: { name: l.name, group: l.group, imageUrl: l.imageUrl },
  publishedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  hasUnpublishedChanges: false,
}));

export let mockStories: CmsStoryRow[] = getFallbackSeedStories().map((s, i) => ({
  id: i + 1,
  ...s,
  sortOrder: i,
  status: "published" as const,
  livePayload: {
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
  },
  publishedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  hasUnpublishedChanges: false,
}));
