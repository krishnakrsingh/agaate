import {
  getFallbackSeedLogos,
  getFallbackSeedStats,
  getFallbackSeedStories,
} from "@/data/homepage-fallback";
import { getFallbackSeedTeam } from "@/data/team-fallback";
import type {
  CmsLogoRow,
  CmsStatRow,
  CmsStoryRow,
  CmsTeamMemberRow,
  CmsCareerJobRow,
  CmsSiteConfig,
} from "@/lib/cms-types";
import { getFallbackSeedCareerJobs } from "@/data/careers-fallback";
import { DEFAULT_CMS_SITE_CONFIG } from "@/lib/cms-types";

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
  },
  publishedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  hasUnpublishedChanges: false,
}));

export let mockSiteConfig: CmsSiteConfig = { ...DEFAULT_CMS_SITE_CONFIG };

export type MockNewsletterSignup = {
  id: number;
  contact: string;
  contact_type: "email" | "phone";
  source_page: string;
  created_at: string;
};

export let mockNewsletterSignups: MockNewsletterSignup[] = [];

export let mockCareerJobs: CmsCareerJobRow[] = getFallbackSeedCareerJobs().map((j, i) => ({
  id: i + 1,
  slug: j.slug,
  titleEn: j.titleEn,
  titleHi: j.titleHi,
  deptEn: j.deptEn,
  deptHi: j.deptHi,
  departmentCategory: j.departmentCategory,
  locEn: j.locEn,
  locHi: j.locHi,
  typeEn: j.typeEn,
  typeHi: j.typeHi,
  descEn: j.descEn,
  descHi: j.descHi,
  experienceLevelEn: j.experienceLevelEn,
  experienceLevelHi: j.experienceLevelHi,
  highlightsEn: j.highlightsEn,
  highlightsHi: j.highlightsHi,
  reqsEn: j.reqsEn,
  reqsHi: j.reqsHi,
  responsibilitiesEn: j.responsibilitiesEn,
  responsibilitiesHi: j.responsibilitiesHi,
  sortOrder: j.sortOrder,
  status: "published" as const,
  livePayload: {
    slug: j.slug,
    titleEn: j.titleEn,
    titleHi: j.titleHi,
    deptEn: j.deptEn,
    deptHi: j.deptHi,
    departmentCategory: j.departmentCategory,
    locEn: j.locEn,
    locHi: j.locHi,
    typeEn: j.typeEn,
    typeHi: j.typeHi,
    descEn: j.descEn,
    descHi: j.descHi,
    experienceLevelEn: j.experienceLevelEn,
    experienceLevelHi: j.experienceLevelHi,
    highlightsEn: j.highlightsEn,
    highlightsHi: j.highlightsHi,
    reqsEn: j.reqsEn,
    reqsHi: j.reqsHi,
    responsibilitiesEn: j.responsibilitiesEn,
    responsibilitiesHi: j.responsibilitiesHi,
  },
  publishedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  hasUnpublishedChanges: false,
}));

export type MockCareerApplication = {
  id: number;
  job_slug: string;
  job_title: string;
  name: string;
  phone: string;
  email: string;
  experience_band: string;
  crop_experience: string;
  resume_url: string;
  created_at: string;
};

export let mockCareerApplications: MockCareerApplication[] = [];

export let mockTeam: CmsTeamMemberRow[] = getFallbackSeedTeam().map((m, i) => ({
  id: i + 1,
  slug: m.slug,
  nameEn: m.nameEn,
  nameHi: m.nameHi,
  roleEn: m.roleEn,
  roleHi: m.roleHi,
  focusEn: m.focusEn,
  focusHi: m.focusHi,
  tagEn: m.tagEn,
  tagHi: m.tagHi,
  bioEn: m.bioEn,
  bioHi: m.bioHi,
  quoteEn: m.quoteEn,
  quoteHi: m.quoteHi,
  pubEn: m.pubEn,
  pubHi: m.pubHi,
  keyAchEn: m.keyAchEn,
  keyAchHi: m.keyAchHi,
  imageUrl: m.imageUrl,
  iconKey: m.iconKey,
  showInBanner: m.showInBanner,
  bannerBadgeEn: m.bannerBadgeEn,
  bannerBadgeHi: m.bannerBadgeHi,
  sortOrder: m.sortOrder,
  status: "published" as const,
  livePayload: {
    slug: m.slug,
    nameEn: m.nameEn,
    nameHi: m.nameHi,
    roleEn: m.roleEn,
    roleHi: m.roleHi,
    focusEn: m.focusEn,
    focusHi: m.focusHi,
    tagEn: m.tagEn,
    tagHi: m.tagHi,
    bioEn: m.bioEn,
    bioHi: m.bioHi,
    quoteEn: m.quoteEn,
    quoteHi: m.quoteHi,
    pubEn: m.pubEn,
    pubHi: m.pubHi,
    keyAchEn: m.keyAchEn,
    keyAchHi: m.keyAchHi,
    imageUrl: m.imageUrl,
    iconKey: m.iconKey,
    showInBanner: m.showInBanner,
    bannerBadgeEn: m.bannerBadgeEn,
    bannerBadgeHi: m.bannerBadgeHi,
  },
  publishedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  hasUnpublishedChanges: false,
}));
