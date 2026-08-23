import { getDbPool, isDbConfigured } from "@/server/db";
import { ensureAdminSchema } from "@/server/admin-queries";
import {
  getFallbackSeedLogos,
  getFallbackSeedStats,
  getFallbackSeedStories,
  HOMEPAGE_CMS_FALLBACK,
} from "@/data/homepage-fallback";
import type {
  CmsBrandGroup,
  CmsIconKey,
  CmsListFilters,
  CmsLogoPayload,
  CmsLogoRow,
  CmsOverview,
  CmsStatPayload,
  CmsStatRow,
  CmsStatus,
  CmsStoryPayload,
  CmsStoryRow,
  HomeCmsAppLinks,
  HomeCmsAgriParkTour,
  CmsSiteConfig,
  HomeCmsData,
  HomeCmsLogo,
  HomeCmsStat,
  HomeCmsStory,
} from "@/lib/cms-types";
import {
  DEFAULT_CMS_SITE_CONFIG,
  DEFAULT_HOME_CMS_APP_LINKS,
  DEFAULT_HOME_CMS_AGRI_PARK_TOUR,
  DEFAULT_KISAAN_MALL_LANDING,
  type KisaanMallLanding,
  type CareersPageContent,
  type SiteContactConfig,
  type SiteFacilityConfig,
  type SiteContactTrustStat,
  type AboutPageContent,
  type ContactPageContent,
  type KisaanMallPageContent,
  type KisaanMallSectionCopy,
} from "@/lib/cms-types";
import { CAREERS_PAGE_FALLBACK } from "@/data/careers-fallback";
import { SITE_CONTACT_FALLBACK } from "@/data/site-contact-fallback";
import { ABOUT_PAGE_FALLBACK } from "@/data/about-page-fallback";
import { CONTACT_PAGE_FALLBACK } from "@/data/contact-page-fallback";
import { KISAAN_MALL_PAGE_FALLBACK } from "@/data/kisaan-mall-page-fallback";

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

function statPayloadFromRow(row: Record<string, unknown>): CmsStatPayload {
  return {
    slug: String(row.slug),
    iconKey: row.icon_key as CmsIconKey,
    numValue: Number(row.num_value),
    prefix: row.prefix ? String(row.prefix) : undefined,
    suffixEn: String(row.suffix_en),
    suffixHi: String(row.suffix_hi),
    labelEn: String(row.label_en),
    labelHi: String(row.label_hi),
  };
}

function logoPayloadFromRow(row: Record<string, unknown>): CmsLogoPayload {
  return {
    name: String(row.name),
    group: row.logo_group as CmsBrandGroup,
    imageUrl: String(row.image_url),
  };
}

function storyPayloadFromRow(row: Record<string, unknown>): CmsStoryPayload {
  return {
    slug: String(row.slug),
    nameEn: String(row.name_en),
    nameHi: String(row.name_hi),
    roleEn: String(row.role_en),
    roleHi: String(row.role_hi),
    locationEn: String(row.location_en),
    locationHi: String(row.location_hi),
    acresEn: String(row.acres_en),
    acresHi: String(row.acres_hi),
    cropEn: String(row.crop_en),
    cropHi: String(row.crop_hi),
    quoteEn: String(row.quote_en),
    quoteHi: String(row.quote_hi),
    badgeEn: String(row.badge_en),
    badgeHi: String(row.badge_hi),
    thumbnailUrl: String(row.thumbnail_url),
    videoUrl: String(row.video_url),
  };
}

function hasChanges<T extends object>(draft: T, live: T | null): boolean {
  if (!live) return true;
  return JSON.stringify(draft) !== JSON.stringify(live);
}

function mapStatRow(row: Record<string, unknown>): CmsStatRow {
  const draft = statPayloadFromRow(row);
  const livePayload = parseJson<CmsStatPayload | null>(row.live_payload, null);
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

function mapLogoRow(row: Record<string, unknown>): CmsLogoRow {
  const draft = logoPayloadFromRow(row);
  const livePayload = parseJson<CmsLogoPayload | null>(row.live_payload, null);
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

function mapStoryRow(row: Record<string, unknown>): CmsStoryRow {
  const draft = storyPayloadFromRow(row);
  const livePayload = parseJson<CmsStoryPayload | null>(row.live_payload, null);
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

const CMS_TABLE_SQL = [
  `CREATE TABLE IF NOT EXISTS cms_stats (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(64) NOT NULL UNIQUE,
    icon_key ENUM('tractor','plant','chart','handshake','warehouse','drop','cap','users') NOT NULL,
    num_value BIGINT NOT NULL DEFAULT 0,
    prefix VARCHAR(16) NULL,
    suffix_en VARCHAR(32) NOT NULL DEFAULT '',
    suffix_hi VARCHAR(32) NOT NULL DEFAULT '',
    label_en VARCHAR(160) NOT NULL,
    label_hi VARCHAR(160) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    status ENUM('draft','published','archived') NOT NULL DEFAULT 'published',
    live_payload JSON NULL,
    published_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_cms_stats_status (status, sort_order)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS cms_brand_logos (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(160) NOT NULL,
    logo_group ENUM('partners','customers','buyers','institutional') NOT NULL,
    image_url VARCHAR(512) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    status ENUM('draft','published','archived') NOT NULL DEFAULT 'published',
    live_payload JSON NULL,
    published_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_cms_logos_group (logo_group, status, sort_order)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS cms_farmer_stories (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(64) NOT NULL UNIQUE,
    name_en VARCHAR(120) NOT NULL,
    name_hi VARCHAR(120) NOT NULL,
    role_en VARCHAR(160) NOT NULL,
    role_hi VARCHAR(160) NOT NULL,
    location_en VARCHAR(120) NOT NULL,
    location_hi VARCHAR(120) NOT NULL,
    acres_en VARCHAR(64) NOT NULL,
    acres_hi VARCHAR(64) NOT NULL,
    crop_en VARCHAR(120) NOT NULL,
    crop_hi VARCHAR(120) NOT NULL,
    quote_en TEXT NOT NULL,
    quote_hi TEXT NOT NULL,
    badge_en VARCHAR(80) NOT NULL,
    badge_hi VARCHAR(80) NOT NULL,
    thumbnail_url VARCHAR(512) NOT NULL,
    video_url VARCHAR(512) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    status ENUM('draft','published','archived') NOT NULL DEFAULT 'published',
    live_payload JSON NULL,
    published_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_cms_stories_status (status, sort_order)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS cms_site_config (
    id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
    payload JSON NOT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
];

function normalizeAppLinks(raw: Partial<HomeCmsAppLinks> | null | undefined): HomeCmsAppLinks {
  const googlePlayUrl = String(raw?.googlePlayUrl ?? "").trim();
  const appStoreUrl = String(raw?.appStoreUrl ?? "").trim();
  return {
    googlePlayUrl: googlePlayUrl || DEFAULT_HOME_CMS_APP_LINKS.googlePlayUrl,
    appStoreUrl: appStoreUrl || DEFAULT_HOME_CMS_APP_LINKS.appStoreUrl,
  };
}

function normalizeAgriParkTour(raw: Partial<HomeCmsAgriParkTour> | null | undefined): HomeCmsAgriParkTour {
  const videoUrl = String(raw?.videoUrl ?? "").trim();
  const posterUrl = String(raw?.posterUrl ?? "").trim();
  return {
    videoUrl: videoUrl || DEFAULT_HOME_CMS_AGRI_PARK_TOUR.videoUrl,
    posterUrl: posterUrl || DEFAULT_HOME_CMS_AGRI_PARK_TOUR.posterUrl,
  };
}

function normalizeKisaanMallLanding(raw: Partial<KisaanMallLanding> | null | undefined): KisaanMallLanding {
  const fallback = DEFAULT_KISAAN_MALL_LANDING;
  return {
    badgeEn: String(raw?.badgeEn ?? "").trim() || fallback.badgeEn,
    badgeHi: String(raw?.badgeHi ?? "").trim() || fallback.badgeHi,
    titleEn: String(raw?.titleEn ?? "").trim() || fallback.titleEn,
    titleHi: String(raw?.titleHi ?? "").trim() || fallback.titleHi,
    descriptionEn: String(raw?.descriptionEn ?? "").trim() || fallback.descriptionEn,
    descriptionHi: String(raw?.descriptionHi ?? "").trim() || fallback.descriptionHi,
    placeholderEn: String(raw?.placeholderEn ?? "").trim() || fallback.placeholderEn,
    placeholderHi: String(raw?.placeholderHi ?? "").trim() || fallback.placeholderHi,
    successEn: String(raw?.successEn ?? "").trim() || fallback.successEn,
    successHi: String(raw?.successHi ?? "").trim() || fallback.successHi,
  };
}

function normalizeMallSection(
  raw: Partial<KisaanMallSectionCopy> | null | undefined,
  fb: KisaanMallSectionCopy,
): KisaanMallSectionCopy {
  return {
    badgeEn: String(raw?.badgeEn ?? "").trim() || fb.badgeEn,
    badgeHi: String(raw?.badgeHi ?? "").trim() || fb.badgeHi,
    titleEn: String(raw?.titleEn ?? "").trim() || fb.titleEn,
    titleHi: String(raw?.titleHi ?? "").trim() || fb.titleHi,
    descriptionEn: String(raw?.descriptionEn ?? "").trim() || fb.descriptionEn,
    descriptionHi: String(raw?.descriptionHi ?? "").trim() || fb.descriptionHi,
  };
}

function normalizeKisaanMallPage(raw: Partial<KisaanMallPageContent> | null | undefined): KisaanMallPageContent {
  const fb = KISAAN_MALL_PAGE_FALLBACK;
  const displayMode = raw?.displayMode === "full" ? "full" : "coming_soon";
  const categories = Array.isArray(raw?.categories) ? raw.categories : fb.categories;
  const supplySteps = Array.isArray(raw?.supplySteps) ? raw.supplySteps : fb.supplySteps;
  const trustItems = Array.isArray(raw?.trustItems) ? raw.trustItems : fb.trustItems;
  const faqs = Array.isArray(raw?.faqs) ? raw.faqs : fb.faqs;
  const heroStats = Array.isArray(raw?.heroStats) ? raw.heroStats : fb.heroStats;

  return {
    displayMode,
    heroEyebrowEn: String(raw?.heroEyebrowEn ?? "").trim() || fb.heroEyebrowEn,
    heroEyebrowHi: String(raw?.heroEyebrowHi ?? "").trim() || fb.heroEyebrowHi,
    heroTitleEn: String(raw?.heroTitleEn ?? "").trim() || fb.heroTitleEn,
    heroTitleHi: String(raw?.heroTitleHi ?? "").trim() || fb.heroTitleHi,
    heroTitleAccentEn: String(raw?.heroTitleAccentEn ?? "").trim() || fb.heroTitleAccentEn,
    heroTitleAccentHi: String(raw?.heroTitleAccentHi ?? "").trim() || fb.heroTitleAccentHi,
    heroDescriptionEn: String(raw?.heroDescriptionEn ?? "").trim() || fb.heroDescriptionEn,
    heroDescriptionHi: String(raw?.heroDescriptionHi ?? "").trim() || fb.heroDescriptionHi,
    heroNotifyPlaceholderEn: String(raw?.heroNotifyPlaceholderEn ?? "").trim() || fb.heroNotifyPlaceholderEn,
    heroNotifyPlaceholderHi: String(raw?.heroNotifyPlaceholderHi ?? "").trim() || fb.heroNotifyPlaceholderHi,
    heroNotifyButtonEn: String(raw?.heroNotifyButtonEn ?? "").trim() || fb.heroNotifyButtonEn,
    heroNotifyButtonHi: String(raw?.heroNotifyButtonHi ?? "").trim() || fb.heroNotifyButtonHi,
    heroNotifySuccessEn: String(raw?.heroNotifySuccessEn ?? "").trim() || fb.heroNotifySuccessEn,
    heroNotifySuccessHi: String(raw?.heroNotifySuccessHi ?? "").trim() || fb.heroNotifySuccessHi,
    heroWhatsappLabelEn: String(raw?.heroWhatsappLabelEn ?? "").trim() || fb.heroWhatsappLabelEn,
    heroWhatsappLabelHi: String(raw?.heroWhatsappLabelHi ?? "").trim() || fb.heroWhatsappLabelHi,
    heroStats: heroStats.map((s, i) => ({
      numValue: Number(s?.numValue ?? fb.heroStats[i]?.numValue ?? 0),
      suffixEn: String(s?.suffixEn ?? "").trim() || fb.heroStats[i]?.suffixEn || "",
      suffixHi: String(s?.suffixHi ?? "").trim() || fb.heroStats[i]?.suffixHi || "",
      valueTextEn: String(s?.valueTextEn ?? "").trim() || fb.heroStats[i]?.valueTextEn || "",
      valueTextHi: String(s?.valueTextHi ?? "").trim() || fb.heroStats[i]?.valueTextHi || "",
      labelEn: String(s?.labelEn ?? "").trim() || fb.heroStats[i]?.labelEn || "",
      labelHi: String(s?.labelHi ?? "").trim() || fb.heroStats[i]?.labelHi || "",
    })),
    aisles: normalizeMallSection(raw?.aisles, fb.aisles),
    categories: categories.map((c, i) => ({
      id: String(c?.id ?? "").trim() || fb.categories[i]?.id || `cat-${i}`,
      titleEn: String(c?.titleEn ?? "").trim() || fb.categories[i]?.titleEn || "",
      titleHi: String(c?.titleHi ?? "").trim() || fb.categories[i]?.titleHi || "",
      tagEn: String(c?.tagEn ?? "").trim() || fb.categories[i]?.tagEn || "",
      tagHi: String(c?.tagHi ?? "").trim() || fb.categories[i]?.tagHi || "",
      descEn: String(c?.descEn ?? "").trim() || fb.categories[i]?.descEn || "",
      descHi: String(c?.descHi ?? "").trim() || fb.categories[i]?.descHi || "",
      examplesEn: Array.isArray(c?.examplesEn) ? c.examplesEn.map(String) : fb.categories[i]?.examplesEn || [],
      examplesHi: Array.isArray(c?.examplesHi) ? c.examplesHi.map(String) : fb.categories[i]?.examplesHi || [],
      badgeEn: String(c?.badgeEn ?? "").trim() || fb.categories[i]?.badgeEn || "",
      badgeHi: String(c?.badgeHi ?? "").trim() || fb.categories[i]?.badgeHi || "",
      iconKey: normalizeIconKey(c?.iconKey ?? fb.categories[i]?.iconKey),
    })),
    supplyChain: normalizeMallSection(raw?.supplyChain, fb.supplyChain),
    supplySteps: supplySteps.map((s, i) => ({
      step: String(s?.step ?? "").trim() || fb.supplySteps[i]?.step || "",
      titleEn: String(s?.titleEn ?? "").trim() || fb.supplySteps[i]?.titleEn || "",
      titleHi: String(s?.titleHi ?? "").trim() || fb.supplySteps[i]?.titleHi || "",
      descEn: String(s?.descEn ?? "").trim() || fb.supplySteps[i]?.descEn || "",
      descHi: String(s?.descHi ?? "").trim() || fb.supplySteps[i]?.descHi || "",
      iconKey: normalizeIconKey(s?.iconKey ?? fb.supplySteps[i]?.iconKey),
    })),
    trust: normalizeMallSection(raw?.trust, fb.trust),
    trustItems: trustItems.map((item, i) => ({
      labelEn: String(item?.labelEn ?? "").trim() || fb.trustItems[i]?.labelEn || "",
      labelHi: String(item?.labelHi ?? "").trim() || fb.trustItems[i]?.labelHi || "",
      valueEn: String(item?.valueEn ?? "").trim() || fb.trustItems[i]?.valueEn || "",
      valueHi: String(item?.valueHi ?? "").trim() || fb.trustItems[i]?.valueHi || "",
      hintEn: String(item?.hintEn ?? "").trim() || fb.trustItems[i]?.hintEn || "",
      hintHi: String(item?.hintHi ?? "").trim() || fb.trustItems[i]?.hintHi || "",
      iconKey: normalizeIconKey(item?.iconKey ?? fb.trustItems[i]?.iconKey),
    })),
    faq: normalizeMallSection(raw?.faq, fb.faq),
    faqs: faqs.map((f, i) => ({
      qEn: String(f?.qEn ?? "").trim() || fb.faqs[i]?.qEn || "",
      qHi: String(f?.qHi ?? "").trim() || fb.faqs[i]?.qHi || "",
      aEn: String(f?.aEn ?? "").trim() || fb.faqs[i]?.aEn || "",
      aHi: String(f?.aHi ?? "").trim() || fb.faqs[i]?.aHi || "",
    })),
    ctaBadgeEn: String(raw?.ctaBadgeEn ?? "").trim() || fb.ctaBadgeEn,
    ctaBadgeHi: String(raw?.ctaBadgeHi ?? "").trim() || fb.ctaBadgeHi,
    ctaTitleEn: String(raw?.ctaTitleEn ?? "").trim() || fb.ctaTitleEn,
    ctaTitleHi: String(raw?.ctaTitleHi ?? "").trim() || fb.ctaTitleHi,
    ctaDescriptionEn: String(raw?.ctaDescriptionEn ?? "").trim() || fb.ctaDescriptionEn,
    ctaDescriptionHi: String(raw?.ctaDescriptionHi ?? "").trim() || fb.ctaDescriptionHi,
    ctaHoursEn: String(raw?.ctaHoursEn ?? "").trim() || fb.ctaHoursEn,
    ctaHoursHi: String(raw?.ctaHoursHi ?? "").trim() || fb.ctaHoursHi,
    ctaWhatsappLabelEn: String(raw?.ctaWhatsappLabelEn ?? "").trim() || fb.ctaWhatsappLabelEn,
    ctaWhatsappLabelHi: String(raw?.ctaWhatsappLabelHi ?? "").trim() || fb.ctaWhatsappLabelHi,
    ctaImageUrl: String(raw?.ctaImageUrl ?? "").trim() || fb.ctaImageUrl,
    ctaImageAltEn: String(raw?.ctaImageAltEn ?? "").trim() || fb.ctaImageAltEn,
    ctaImageAltHi: String(raw?.ctaImageAltHi ?? "").trim() || fb.ctaImageAltHi,
  };
}

function normalizeIconKey(key: unknown): CmsIconKey {
  const valid = [
    "tractor", "plant", "chart", "handshake", "warehouse", "drop", "cap", "users",
    "stack", "lightning", "storefront", "compass", "chat",
  ];
  const k = String(key ?? "").trim();
  return valid.includes(k) ? (k as CmsIconKey) : "plant";
}

function normalizeFacility(raw: Partial<SiteFacilityConfig> | null | undefined, fb: SiteFacilityConfig): SiteFacilityConfig {
  const highlightsEn = Array.isArray(raw?.highlightsEn) ? raw.highlightsEn : fb.highlightsEn;
  const highlightsHi = Array.isArray(raw?.highlightsHi) ? raw.highlightsHi : fb.highlightsHi;
  return {
    id: String(raw?.id ?? fb.id).trim() || fb.id,
    nameEn: String(raw?.nameEn ?? "").trim() || fb.nameEn,
    nameHi: String(raw?.nameHi ?? "").trim() || fb.nameHi,
    taglineEn: String(raw?.taglineEn ?? "").trim() || fb.taglineEn,
    taglineHi: String(raw?.taglineHi ?? "").trim() || fb.taglineHi,
    roleEn: String(raw?.roleEn ?? "").trim() || fb.roleEn,
    roleHi: String(raw?.roleHi ?? "").trim() || fb.roleHi,
    addressEn: String(raw?.addressEn ?? "").trim() || fb.addressEn,
    addressHi: String(raw?.addressHi ?? "").trim() || fb.addressHi,
    districtEn: String(raw?.districtEn ?? "").trim() || fb.districtEn,
    districtHi: String(raw?.districtHi ?? "").trim() || fb.districtHi,
    plusCode: String(raw?.plusCode ?? "").trim() || fb.plusCode,
    phone: String(raw?.phone ?? "").trim() || fb.phone,
    telRaw: String(raw?.telRaw ?? "").trim() || fb.telRaw,
    email: String(raw?.email ?? "").trim() || fb.email,
    hoursEn: String(raw?.hoursEn ?? "").trim() || fb.hoursEn,
    hoursHi: String(raw?.hoursHi ?? "").trim() || fb.hoursHi,
    teamEn: String(raw?.teamEn ?? "").trim() || fb.teamEn,
    teamHi: String(raw?.teamHi ?? "").trim() || fb.teamHi,
    highlightsEn: highlightsEn.map((h, i) => String(h ?? "").trim() || fb.highlightsEn[i] || ""),
    highlightsHi: highlightsHi.map((h, i) => String(h ?? "").trim() || fb.highlightsHi[i] || ""),
    mapsUrl: String(raw?.mapsUrl ?? "").trim() || fb.mapsUrl,
    mapEmbedQuery: String(raw?.mapEmbedQuery ?? "").trim() || fb.mapEmbedQuery,
    lat: Number(raw?.lat ?? fb.lat),
    lng: Number(raw?.lng ?? fb.lng),
    latLabel: String(raw?.latLabel ?? "").trim() || fb.latLabel,
    lngLabel: String(raw?.lngLabel ?? "").trim() || fb.lngLabel,
    iconKey: normalizeIconKey(raw?.iconKey ?? fb.iconKey),
    imageUrl: String(raw?.imageUrl ?? "").trim() || fb.imageUrl,
  };
}

function normalizeTrustStat(
  raw: Partial<SiteContactTrustStat> | null | undefined,
  fb: SiteContactTrustStat,
): SiteContactTrustStat {
  return {
    labelEn: String(raw?.labelEn ?? "").trim() || fb.labelEn,
    labelHi: String(raw?.labelHi ?? "").trim() || fb.labelHi,
    valueEn: String(raw?.valueEn ?? "").trim() || fb.valueEn,
    valueHi: String(raw?.valueHi ?? "").trim() || fb.valueHi,
    hintEn: String(raw?.hintEn ?? "").trim() || fb.hintEn,
    hintHi: String(raw?.hintHi ?? "").trim() || fb.hintHi,
  };
}

function normalizeSiteContact(raw: Partial<SiteContactConfig> | null | undefined): SiteContactConfig {
  const fb = SITE_CONTACT_FALLBACK;
  const facilitiesRaw = Array.isArray(raw?.facilities) ? raw.facilities : fb.facilities;
  const trustRaw = Array.isArray(raw?.contactTrustStats) ? raw.contactTrustStats : fb.contactTrustStats;
  const messages = raw?.whatsappMessages ?? {};
  const social = raw?.social ?? {};

  return {
    primaryPhone: String(raw?.primaryPhone ?? "").trim() || fb.primaryPhone,
    primaryPhoneDisplay: String(raw?.primaryPhoneDisplay ?? "").trim() || fb.primaryPhoneDisplay,
    primaryTel: String(raw?.primaryTel ?? "").trim() || fb.primaryTel,
    altPhone: String(raw?.altPhone ?? "").trim() || fb.altPhone,
    altPhoneDisplay: String(raw?.altPhoneDisplay ?? "").trim() || fb.altPhoneDisplay,
    altTel: String(raw?.altTel ?? "").trim() || fb.altTel,
    primaryEmail: String(raw?.primaryEmail ?? "").trim() || fb.primaryEmail,
    careersEmail: String(raw?.careersEmail ?? "").trim() || fb.careersEmail,
    whatsappNumber: String(raw?.whatsappNumber ?? "").trim() || fb.whatsappNumber,
    whatsappMessages: {
      consultation: String(messages.consultation ?? "").trim() || fb.whatsappMessages.consultation,
      agronomist: String(messages.agronomist ?? "").trim() || fb.whatsappMessages.agronomist,
      bigFarmSetup: String(messages.bigFarmSetup ?? "").trim() || fb.whatsappMessages.bigFarmSetup,
      carbonCredits: String(messages.carbonCredits ?? "").trim() || fb.whatsappMessages.carbonCredits,
      contact: String(messages.contact ?? "").trim() || fb.whatsappMessages.contact,
      about: String(messages.about ?? "").trim() || fb.whatsappMessages.about,
      mall: String(messages.mall ?? "").trim() || fb.whatsappMessages.mall,
      closingAdvisoryEn:
        String(messages.closingAdvisoryEn ?? "").trim() || fb.whatsappMessages.closingAdvisoryEn,
      closingAdvisoryHi:
        String(messages.closingAdvisoryHi ?? "").trim() || fb.whatsappMessages.closingAdvisoryHi,
      farmerStory: String(messages.farmerStory ?? "").trim() || fb.whatsappMessages.farmerStory,
      farmerStoryModal:
        String(messages.farmerStoryModal ?? "").trim() || fb.whatsappMessages.farmerStoryModal,
      appContinue: String(messages.appContinue ?? "").trim() || fb.whatsappMessages.appContinue,
      community: String(messages.community ?? "").trim() || fb.whatsappMessages.community,
      marketAccess: String(messages.marketAccess ?? "").trim() || fb.whatsappMessages.marketAccess,
    },
    social: {
      facebook: String(social.facebook ?? "").trim() || fb.social.facebook,
      youtube: String(social.youtube ?? "").trim() || fb.social.youtube,
      instagram: String(social.instagram ?? "").trim() || fb.social.instagram,
      linkedin: String(social.linkedin ?? "").trim() || fb.social.linkedin,
    },
    footerLocationEn: String(raw?.footerLocationEn ?? "").trim() || fb.footerLocationEn,
    footerLocationHi: String(raw?.footerLocationHi ?? "").trim() || fb.footerLocationHi,
    registeredOfficeEn: String(raw?.registeredOfficeEn ?? "").trim() || fb.registeredOfficeEn,
    registeredOfficeHi: String(raw?.registeredOfficeHi ?? "").trim() || fb.registeredOfficeHi,
    cin: String(raw?.cin ?? "").trim() || fb.cin,
    contactTrustStats: trustRaw.map((s, i) =>
      normalizeTrustStat(s, fb.contactTrustStats[i] ?? fb.contactTrustStats[0]),
    ),
    facilities: facilitiesRaw.map((f, i) =>
      normalizeFacility(f, fb.facilities[i] ?? fb.facilities[0]),
    ),
  };
}

function normalizeContactPage(raw: Partial<ContactPageContent> | null | undefined): ContactPageContent {
  const fb = CONTACT_PAGE_FALLBACK;
  const faqs = Array.isArray(raw?.faqs) ? raw.faqs : fb.faqs;
  const topics = Array.isArray(raw?.consultationTopics) ? raw.consultationTopics : fb.consultationTopics;
  return {
    faqBadgeEn: String(raw?.faqBadgeEn ?? "").trim() || fb.faqBadgeEn,
    faqBadgeHi: String(raw?.faqBadgeHi ?? "").trim() || fb.faqBadgeHi,
    faqTitleEn: String(raw?.faqTitleEn ?? "").trim() || fb.faqTitleEn,
    faqTitleHi: String(raw?.faqTitleHi ?? "").trim() || fb.faqTitleHi,
    faqs: faqs.map((f, i) => ({
      qEn: String(f?.qEn ?? "").trim() || fb.faqs[i]?.qEn || "",
      qHi: String(f?.qHi ?? "").trim() || fb.faqs[i]?.qHi || "",
      aEn: String(f?.aEn ?? "").trim() || fb.faqs[i]?.aEn || "",
      aHi: String(f?.aHi ?? "").trim() || fb.faqs[i]?.aHi || "",
    })),
    consultationTopics: topics.map((t, i) => ({
      id: String(t?.id ?? "").trim() || fb.consultationTopics[i]?.id || `topic-${i}`,
      labelEn: String(t?.labelEn ?? "").trim() || fb.consultationTopics[i]?.labelEn || "",
      labelHi: String(t?.labelHi ?? "").trim() || fb.consultationTopics[i]?.labelHi || "",
      descEn: String(t?.descEn ?? "").trim() || fb.consultationTopics[i]?.descEn || "",
      descHi: String(t?.descHi ?? "").trim() || fb.consultationTopics[i]?.descHi || "",
      iconKey: normalizeIconKey(t?.iconKey ?? fb.consultationTopics[i]?.iconKey),
    })),
    acreageOptionsEn: Array.isArray(raw?.acreageOptionsEn) ? raw.acreageOptionsEn.map(String) : fb.acreageOptionsEn,
    acreageOptionsHi: Array.isArray(raw?.acreageOptionsHi) ? raw.acreageOptionsHi.map(String) : fb.acreageOptionsHi,
    cropOptionsEn: Array.isArray(raw?.cropOptionsEn) ? raw.cropOptionsEn.map(String) : fb.cropOptionsEn,
    cropOptionsHi: Array.isArray(raw?.cropOptionsHi) ? raw.cropOptionsHi.map(String) : fb.cropOptionsHi,
    channelOptionsEn: Array.isArray(raw?.channelOptionsEn) ? raw.channelOptionsEn.map(String) : fb.channelOptionsEn,
    channelOptionsHi: Array.isArray(raw?.channelOptionsHi) ? raw.channelOptionsHi.map(String) : fb.channelOptionsHi,
  };
}

function normalizeAboutPage(raw: Partial<AboutPageContent> | null | undefined): AboutPageContent {
  const fb = ABOUT_PAGE_FALLBACK;
  const hero = raw?.hero ?? fb.hero;
  const who = raw?.whoWeAre ?? fb.whoWeAre;
  const mission = raw?.mission ?? fb.mission;
  const guarantees = Array.isArray(raw?.guarantees) ? raw.guarantees : fb.guarantees;
  const impactMetrics = Array.isArray(raw?.impactMetrics) ? raw.impactMetrics : fb.impactMetrics;
  const milestones = Array.isArray(raw?.milestones) ? raw.milestones : fb.milestones;
  const locations = Array.isArray(raw?.locations) ? raw.locations : fb.locations;
  const compliance = Array.isArray(raw?.complianceHighlights) ? raw.complianceHighlights : fb.complianceHighlights;

  return {
    brochureHref: String(raw?.brochureHref ?? "").trim() || fb.brochureHref,
    hero: {
      badgeEn: String(hero?.badgeEn ?? "").trim() || fb.hero.badgeEn,
      badgeHi: String(hero?.badgeHi ?? "").trim() || fb.hero.badgeHi,
      titleEn: String(hero?.titleEn ?? "").trim() || fb.hero.titleEn,
      titleHi: String(hero?.titleHi ?? "").trim() || fb.hero.titleHi,
      titleAccentEn: String(hero?.titleAccentEn ?? "").trim() || fb.hero.titleAccentEn,
      titleAccentHi: String(hero?.titleAccentHi ?? "").trim() || fb.hero.titleAccentHi,
      descriptionEn: String(hero?.descriptionEn ?? "").trim() || fb.hero.descriptionEn,
      descriptionHi: String(hero?.descriptionHi ?? "").trim() || fb.hero.descriptionHi,
      heroImageUrl: String(hero?.heroImageUrl ?? "").trim() || fb.hero.heroImageUrl,
      heroImageAltEn: String(hero?.heroImageAltEn ?? "").trim() || fb.hero.heroImageAltEn,
      heroImageAltHi: String(hero?.heroImageAltHi ?? "").trim() || fb.hero.heroImageAltHi,
      stats: (Array.isArray(hero?.stats) ? hero.stats : fb.hero.stats).map((s, i) => ({
        valueEn: String(s?.valueEn ?? "").trim() || fb.hero.stats[i]?.valueEn || "",
        valueHi: String(s?.valueHi ?? "").trim() || fb.hero.stats[i]?.valueHi || "",
        labelEn: String(s?.labelEn ?? "").trim() || fb.hero.stats[i]?.labelEn || "",
        labelHi: String(s?.labelHi ?? "").trim() || fb.hero.stats[i]?.labelHi || "",
      })),
    },
    whoWeAre: {
      eyebrowEn: String(who?.eyebrowEn ?? "").trim() || fb.whoWeAre.eyebrowEn,
      eyebrowHi: String(who?.eyebrowHi ?? "").trim() || fb.whoWeAre.eyebrowHi,
      headlineEn: String(who?.headlineEn ?? "").trim() || fb.whoWeAre.headlineEn,
      headlineHi: String(who?.headlineHi ?? "").trim() || fb.whoWeAre.headlineHi,
      bodyEn: String(who?.bodyEn ?? "").trim() || fb.whoWeAre.bodyEn,
      bodyHi: String(who?.bodyHi ?? "").trim() || fb.whoWeAre.bodyHi,
      pullQuoteEn: String(who?.pullQuoteEn ?? "").trim() || fb.whoWeAre.pullQuoteEn,
      pullQuoteHi: String(who?.pullQuoteHi ?? "").trim() || fb.whoWeAre.pullQuoteHi,
      imageUrl: String(who?.imageUrl ?? "").trim() || fb.whoWeAre.imageUrl,
      imageAltEn: String(who?.imageAltEn ?? "").trim() || fb.whoWeAre.imageAltEn,
      imageAltHi: String(who?.imageAltHi ?? "").trim() || fb.whoWeAre.imageAltHi,
    },
    mission: {
      eyebrowEn: String(mission?.eyebrowEn ?? "").trim() || fb.mission.eyebrowEn,
      eyebrowHi: String(mission?.eyebrowHi ?? "").trim() || fb.mission.eyebrowHi,
      titleEn: String(mission?.titleEn ?? "").trim() || fb.mission.titleEn,
      titleHi: String(mission?.titleHi ?? "").trim() || fb.mission.titleHi,
      bodyEn: String(mission?.bodyEn ?? "").trim() || fb.mission.bodyEn,
      bodyHi: String(mission?.bodyHi ?? "").trim() || fb.mission.bodyHi,
      supportEn: String(mission?.supportEn ?? "").trim() || fb.mission.supportEn,
      supportHi: String(mission?.supportHi ?? "").trim() || fb.mission.supportHi,
    },
    guarantees: guarantees.map((g, i) => ({
      titleEn: String(g?.titleEn ?? "").trim() || fb.guarantees[i]?.titleEn || "",
      titleHi: String(g?.titleHi ?? "").trim() || fb.guarantees[i]?.titleHi || "",
      descEn: String(g?.descEn ?? "").trim() || fb.guarantees[i]?.descEn || "",
      descHi: String(g?.descHi ?? "").trim() || fb.guarantees[i]?.descHi || "",
      badgeEn: String(g?.badgeEn ?? "").trim() || fb.guarantees[i]?.badgeEn || "",
      badgeHi: String(g?.badgeHi ?? "").trim() || fb.guarantees[i]?.badgeHi || "",
      iconKey: normalizeIconKey(g?.iconKey ?? fb.guarantees[i]?.iconKey),
    })),
    impactMetrics: impactMetrics.map((m, i) => ({
      numValue: Number(m?.numValue ?? fb.impactMetrics[i]?.numValue ?? 0),
      suffixEn: String(m?.suffixEn ?? "").trim() || fb.impactMetrics[i]?.suffixEn || "",
      suffixHi: String(m?.suffixHi ?? "").trim() || fb.impactMetrics[i]?.suffixHi || "",
      labelEn: String(m?.labelEn ?? "").trim() || fb.impactMetrics[i]?.labelEn || "",
      labelHi: String(m?.labelHi ?? "").trim() || fb.impactMetrics[i]?.labelHi || "",
      iconKey: normalizeIconKey(m?.iconKey ?? fb.impactMetrics[i]?.iconKey),
    })),
    milestones: milestones.map((m, i) => ({
      year: String(m?.year ?? "").trim() || fb.milestones[i]?.year || "",
      titleEn: String(m?.titleEn ?? "").trim() || fb.milestones[i]?.titleEn || "",
      titleHi: String(m?.titleHi ?? "").trim() || fb.milestones[i]?.titleHi || "",
      descEn: String(m?.descEn ?? "").trim() || fb.milestones[i]?.descEn || "",
      descHi: String(m?.descHi ?? "").trim() || fb.milestones[i]?.descHi || "",
      highlightsEn: (Array.isArray(m?.highlightsEn) ? m.highlightsEn : fb.milestones[i]?.highlightsEn).map(
        (h, j) => String(h ?? "").trim() || fb.milestones[i]?.highlightsEn[j] || "",
      ),
      highlightsHi: (Array.isArray(m?.highlightsHi) ? m.highlightsHi : fb.milestones[i]?.highlightsHi).map(
        (h, j) => String(h ?? "").trim() || fb.milestones[i]?.highlightsHi[j] || "",
      ),
    })),
    locations: locations.map((l, i) => ({
      tagEn: String(l?.tagEn ?? "").trim() || fb.locations[i]?.tagEn || "",
      tagHi: String(l?.tagHi ?? "").trim() || fb.locations[i]?.tagHi || "",
      nameEn: String(l?.nameEn ?? "").trim() || fb.locations[i]?.nameEn || "",
      nameHi: String(l?.nameHi ?? "").trim() || fb.locations[i]?.nameHi || "",
      addressEn: String(l?.addressEn ?? "").trim() || fb.locations[i]?.addressEn || "",
      addressHi: String(l?.addressHi ?? "").trim() || fb.locations[i]?.addressHi || "",
      subEn: String(l?.subEn ?? "").trim() || fb.locations[i]?.subEn || "",
      subHi: String(l?.subHi ?? "").trim() || fb.locations[i]?.subHi || "",
    })),
    complianceHighlights: compliance.map((c, i) => ({
      labelEn: String(c?.labelEn ?? "").trim() || fb.complianceHighlights[i]?.labelEn || "",
      labelHi: String(c?.labelHi ?? "").trim() || fb.complianceHighlights[i]?.labelHi || "",
      valueEn: String(c?.valueEn ?? "").trim() || fb.complianceHighlights[i]?.valueEn || "",
      valueHi: String(c?.valueHi ?? "").trim() || fb.complianceHighlights[i]?.valueHi || "",
    })),
    complianceFooterEn: String(raw?.complianceFooterEn ?? "").trim() || fb.complianceFooterEn,
    complianceFooterHi: String(raw?.complianceFooterHi ?? "").trim() || fb.complianceFooterHi,
  };
}

function normalizeCareersPage(raw: Partial<CareersPageContent> | null | undefined): CareersPageContent {
  const fb = CAREERS_PAGE_FALLBACK;
  const heroStats = Array.isArray(raw?.heroStats) ? raw.heroStats : fb.heroStats;
  const cultureCards = Array.isArray(raw?.cultureCards) ? raw.cultureCards : fb.cultureCards;
  const campusSkills = Array.isArray(raw?.campusSkills) ? raw.campusSkills : fb.campusSkills;

  return {
    heroBadgeEn: String(raw?.heroBadgeEn ?? "").trim() || fb.heroBadgeEn,
    heroBadgeHi: String(raw?.heroBadgeHi ?? "").trim() || fb.heroBadgeHi,
    heroTitleEn: String(raw?.heroTitleEn ?? "").trim() || fb.heroTitleEn,
    heroTitleHi: String(raw?.heroTitleHi ?? "").trim() || fb.heroTitleHi,
    heroDescriptionEn: String(raw?.heroDescriptionEn ?? "").trim() || fb.heroDescriptionEn,
    heroDescriptionHi: String(raw?.heroDescriptionHi ?? "").trim() || fb.heroDescriptionHi,
    heroLocationEn: String(raw?.heroLocationEn ?? "").trim() || fb.heroLocationEn,
    heroLocationHi: String(raw?.heroLocationHi ?? "").trim() || fb.heroLocationHi,
    heroStats: heroStats.map((s, i) => ({
      value: Number(s?.value ?? fb.heroStats[i]?.value ?? 0),
      suffix: String(s?.suffix ?? fb.heroStats[i]?.suffix ?? ""),
      labelEn: String(s?.labelEn ?? "").trim() || fb.heroStats[i]?.labelEn || "",
      labelHi: String(s?.labelHi ?? "").trim() || fb.heroStats[i]?.labelHi || "",
      subEn: String(s?.subEn ?? "").trim() || fb.heroStats[i]?.subEn || "",
      subHi: String(s?.subHi ?? "").trim() || fb.heroStats[i]?.subHi || "",
    })),
    cultureCards: cultureCards.map((c, i) => ({
      tagEn: String(c?.tagEn ?? "").trim() || fb.cultureCards[i]?.tagEn || "",
      tagHi: String(c?.tagHi ?? "").trim() || fb.cultureCards[i]?.tagHi || "",
      titleEn: String(c?.titleEn ?? "").trim() || fb.cultureCards[i]?.titleEn || "",
      titleHi: String(c?.titleHi ?? "").trim() || fb.cultureCards[i]?.titleHi || "",
      descEn: String(c?.descEn ?? "").trim() || fb.cultureCards[i]?.descEn || "",
      descHi: String(c?.descHi ?? "").trim() || fb.cultureCards[i]?.descHi || "",
      iconKey: normalizeIconKey(c?.iconKey ?? fb.cultureCards[i]?.iconKey),
    })),
    openRolesTitleEn: String(raw?.openRolesTitleEn ?? "").trim() || fb.openRolesTitleEn,
    openRolesTitleHi: String(raw?.openRolesTitleHi ?? "").trim() || fb.openRolesTitleHi,
    openRolesSubtitleEn: String(raw?.openRolesSubtitleEn ?? "").trim() || fb.openRolesSubtitleEn,
    openRolesSubtitleHi: String(raw?.openRolesSubtitleHi ?? "").trim() || fb.openRolesSubtitleHi,
    campusBadgeEn: String(raw?.campusBadgeEn ?? "").trim() || fb.campusBadgeEn,
    campusBadgeHi: String(raw?.campusBadgeHi ?? "").trim() || fb.campusBadgeHi,
    campusTitleEn: String(raw?.campusTitleEn ?? "").trim() || fb.campusTitleEn,
    campusTitleHi: String(raw?.campusTitleHi ?? "").trim() || fb.campusTitleHi,
    campusDescriptionEn: String(raw?.campusDescriptionEn ?? "").trim() || fb.campusDescriptionEn,
    campusDescriptionHi: String(raw?.campusDescriptionHi ?? "").trim() || fb.campusDescriptionHi,
    campusSkills: campusSkills.map((s, i) => ({
      iconKey: normalizeIconKey(s?.iconKey ?? fb.campusSkills[i]?.iconKey),
      labelEn: String(s?.labelEn ?? "").trim() || fb.campusSkills[i]?.labelEn || "",
      labelHi: String(s?.labelHi ?? "").trim() || fb.campusSkills[i]?.labelHi || "",
    })),
    campusEmailSubject: String(raw?.campusEmailSubject ?? "").trim() || fb.campusEmailSubject,
  };
}

function normalizeSiteConfig(raw: Partial<CmsSiteConfig> | null | undefined): CmsSiteConfig {
  return {
    appLinks: normalizeAppLinks(raw?.appLinks),
    agriParkTour: normalizeAgriParkTour(raw?.agriParkTour),
    kisaanMallLanding: normalizeKisaanMallLanding(raw?.kisaanMallLanding),
    kisaanMallPage: normalizeKisaanMallPage(raw?.kisaanMallPage),
    careersPage: normalizeCareersPage(raw?.careersPage),
    siteContact: normalizeSiteContact(raw?.siteContact),
    aboutPage: normalizeAboutPage(raw?.aboutPage),
    contactPage: normalizeContactPage(raw?.contactPage),
  };
}

async function readSiteConfigFromMemory(): Promise<CmsSiteConfig> {
  const { mockSiteConfig } = await import("@/server/cms-memory");
  return normalizeSiteConfig(mockSiteConfig);
}

export async function fetchSiteConfig(): Promise<CmsSiteConfig> {
  if (!isDbConfigured()) return readSiteConfigFromMemory();
  try {
    await ensureCmsSchema();
    const db = await getDbPool();
    const [rows] = await db.query(`SELECT payload FROM cms_site_config WHERE id = 1 LIMIT 1`);
    const row = (rows as Array<{ payload: unknown }>)[0];
    if (!row) return DEFAULT_CMS_SITE_CONFIG;
    const payload = parseJson<Partial<CmsSiteConfig>>(row.payload, {});
    return normalizeSiteConfig(payload);
  } catch (err) {
    console.warn("fetchSiteConfig fallback:", err);
    return DEFAULT_CMS_SITE_CONFIG;
  }
}

async function saveSiteConfig(config: CmsSiteConfig): Promise<CmsSiteConfig> {
  const normalized = normalizeSiteConfig(config);
  if (!isDbConfigured()) {
    const mem = await import("@/server/cms-memory");
    mem.mockSiteConfig = normalized;
    return normalized;
  }
  await ensureCmsSchema();
  const db = await getDbPool();
  await db.query(
    `INSERT INTO cms_site_config (id, payload) VALUES (1, :payload)
     ON DUPLICATE KEY UPDATE payload = :payload`,
    { payload: JSON.stringify(normalized) },
  );
  return normalized;
}

async function mergeSiteConfig(patch: Partial<CmsSiteConfig>): Promise<CmsSiteConfig> {
  const current = await fetchSiteConfig();
  return saveSiteConfig({
    appLinks: patch.appLinks ? normalizeAppLinks(patch.appLinks) : current.appLinks,
    agriParkTour: patch.agriParkTour ? normalizeAgriParkTour(patch.agriParkTour) : current.agriParkTour,
    kisaanMallLanding: patch.kisaanMallLanding
      ? normalizeKisaanMallLanding(patch.kisaanMallLanding)
      : current.kisaanMallLanding,
    kisaanMallPage: patch.kisaanMallPage
      ? normalizeKisaanMallPage(patch.kisaanMallPage)
      : current.kisaanMallPage,
    careersPage: patch.careersPage ? normalizeCareersPage(patch.careersPage) : current.careersPage,
    siteContact: patch.siteContact ? normalizeSiteContact(patch.siteContact) : current.siteContact,
    aboutPage: patch.aboutPage ? normalizeAboutPage(patch.aboutPage) : current.aboutPage,
    contactPage: patch.contactPage ? normalizeContactPage(patch.contactPage) : current.contactPage,
  });
}

export async function fetchAppLinks(): Promise<HomeCmsAppLinks> {
  const config = await fetchSiteConfig();
  return config.appLinks;
}

export async function saveAppLinks(links: HomeCmsAppLinks): Promise<HomeCmsAppLinks> {
  const config = await mergeSiteConfig({ appLinks: links });
  return config.appLinks;
}

export async function fetchAgriParkTour(): Promise<HomeCmsAgriParkTour> {
  const config = await fetchSiteConfig();
  return config.agriParkTour;
}

export async function saveAgriParkTour(tour: HomeCmsAgriParkTour): Promise<HomeCmsAgriParkTour> {
  const config = await mergeSiteConfig({ agriParkTour: tour });
  return config.agriParkTour;
}

export async function fetchKisaanMallLanding(): Promise<KisaanMallLanding> {
  const config = await fetchSiteConfig();
  return config.kisaanMallLanding;
}

export async function saveKisaanMallLanding(landing: KisaanMallLanding): Promise<KisaanMallLanding> {
  const config = await mergeSiteConfig({ kisaanMallLanding: landing });
  return config.kisaanMallLanding;
}

export async function fetchKisaanMallPage(): Promise<KisaanMallPageContent> {
  const config = await fetchSiteConfig();
  return config.kisaanMallPage;
}

export async function saveKisaanMallPage(content: KisaanMallPageContent): Promise<KisaanMallPageContent> {
  const config = await mergeSiteConfig({ kisaanMallPage: content });
  return config.kisaanMallPage;
}

export async function fetchCareersPage(): Promise<CareersPageContent> {
  const config = await fetchSiteConfig();
  return config.careersPage;
}

export async function saveCareersPage(content: CareersPageContent): Promise<CareersPageContent> {
  const config = await mergeSiteConfig({ careersPage: content });
  return config.careersPage;
}

export async function fetchSiteContact(): Promise<SiteContactConfig> {
  const config = await fetchSiteConfig();
  return config.siteContact;
}

export async function saveSiteContact(contact: SiteContactConfig): Promise<SiteContactConfig> {
  const config = await mergeSiteConfig({ siteContact: contact });
  return config.siteContact;
}

export async function fetchAboutPage(): Promise<AboutPageContent> {
  const config = await fetchSiteConfig();
  return config.aboutPage;
}

export async function saveAboutPage(content: AboutPageContent): Promise<AboutPageContent> {
  const config = await mergeSiteConfig({ aboutPage: content });
  return config.aboutPage;
}

export async function fetchContactPage(): Promise<ContactPageContent> {
  const config = await fetchSiteConfig();
  return config.contactPage;
}

export async function saveContactPage(content: ContactPageContent): Promise<ContactPageContent> {
  const config = await mergeSiteConfig({ contactPage: content });
  return config.contactPage;
}

let cmsSchemaReady = false;

export async function ensureCmsSchema() {
  if (!isDbConfigured()) return;
  await ensureAdminSchema();
  if (cmsSchemaReady) return;
  const db = await getDbPool();
  for (const sql of CMS_TABLE_SQL) {
    await db.query(sql);
  }
  await seedCmsIfEmpty();
  cmsSchemaReady = true;
}

async function seedCmsIfEmpty() {
  const db = await getDbPool();
  const [statRows] = await db.query(`SELECT COUNT(*) AS c FROM cms_stats`);
  const statCount = Number((statRows as Array<{ c: number }>)[0]?.c ?? 0);
  if (statCount === 0) {
    for (const s of getFallbackSeedStats()) {
      const payload = {
        slug: s.slug,
        iconKey: s.iconKey,
        numValue: s.numValue,
        prefix: s.prefix ?? undefined,
        suffixEn: s.suffixEn,
        suffixHi: s.suffixHi,
        labelEn: s.labelEn,
        labelHi: s.labelHi,
      };
      await db.query(
        `INSERT INTO cms_stats
         (slug, icon_key, num_value, prefix, suffix_en, suffix_hi, label_en, label_hi, sort_order, status, live_payload, published_at)
         VALUES (:slug, :iconKey, :numValue, :prefix, :suffixEn, :suffixHi, :labelEn, :labelHi, :sortOrder, 'published', :livePayload, NOW())`,
        {
          ...s,
          livePayload: JSON.stringify(payload),
        },
      );
    }
  }

  const [logoRows] = await db.query(`SELECT COUNT(*) AS c FROM cms_brand_logos`);
  const logoCount = Number((logoRows as Array<{ c: number }>)[0]?.c ?? 0);
  if (logoCount === 0) {
    for (const l of getFallbackSeedLogos()) {
      const payload = { name: l.name, group: l.group, imageUrl: l.imageUrl };
      await db.query(
        `INSERT INTO cms_brand_logos
         (name, logo_group, image_url, sort_order, status, live_payload, published_at)
         VALUES (:name, :group, :imageUrl, :sortOrder, 'published', :livePayload, NOW())`,
        { ...l, livePayload: JSON.stringify(payload) },
      );
    }
  }

  const [storyRows] = await db.query(`SELECT COUNT(*) AS c FROM cms_farmer_stories`);
  const storyCount = Number((storyRows as Array<{ c: number }>)[0]?.c ?? 0);
  if (storyCount === 0) {
    for (const s of getFallbackSeedStories()) {
      const payload = {
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
      };
      await db.query(
        `INSERT INTO cms_farmer_stories
         (slug, name_en, name_hi, role_en, role_hi, location_en, location_hi, acres_en, acres_hi,
          crop_en, crop_hi, quote_en, quote_hi, badge_en, badge_hi, thumbnail_url, video_url,
          sort_order, status, live_payload, published_at)
         VALUES (:slug, :nameEn, :nameHi, :roleEn, :roleHi, :locationEn, :locationHi, :acresEn, :acresHi,
          :cropEn, :cropHi, :quoteEn, :quoteHi, :badgeEn, :badgeHi, :thumbnailUrl, :videoUrl,
          :sortOrder, 'published', :livePayload, NOW())`,
        { ...s, livePayload: JSON.stringify(payload) },
      );
    }
  }
}

function statToPublic(row: CmsStatRow, useLive: boolean): HomeCmsStat {
  const p = useLive && row.livePayload ? row.livePayload : row;
  return {
    id: p.slug,
    slug: p.slug,
    iconKey: p.iconKey,
    numValue: p.numValue,
    prefix: p.prefix,
    suffixEn: p.suffixEn,
    suffixHi: p.suffixHi,
    labelEn: p.labelEn,
    labelHi: p.labelHi,
  };
}

function logoToPublic(row: CmsLogoRow, useLive: boolean): HomeCmsLogo {
  const p = useLive && row.livePayload ? row.livePayload : row;
  return { name: p.name, src: p.imageUrl };
}

function storyToPublic(row: CmsStoryRow, useLive: boolean, lang: "en" | "hi"): HomeCmsStory {
  const p = useLive && row.livePayload ? row.livePayload : row;
  const isHi = lang === "hi";
  return {
    id: p.slug,
    name: isHi ? p.nameHi : p.nameEn,
    role: isHi ? p.roleHi : p.roleEn,
    location: isHi ? p.locationHi : p.locationEn,
    acres: isHi ? p.acresHi : p.acresEn,
    crop: isHi ? p.cropHi : p.cropEn,
    quote: isHi ? p.quoteHi : p.quoteEn,
    badge: isHi ? p.badgeHi : p.badgeEn,
    thumbnail: p.thumbnailUrl,
    videoUrl: p.videoUrl,
  };
}

export function buildHomeCmsFromRows(
  stats: CmsStatRow[],
  logos: CmsLogoRow[],
  stories: CmsStoryRow[],
  preview: boolean,
): HomeCmsData {
  const useLive = !preview;
  const activeStats = stats
    .filter((r) => r.status !== "archived" && (preview || r.status === "published"))
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const activeLogos = logos
    .filter((r) => r.status !== "archived" && (preview || r.status === "published"))
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const activeStories = stories
    .filter((r) => r.status !== "archived" && (preview || r.status === "published"))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const logoGroups: Record<CmsBrandGroup, HomeCmsLogo[]> = {
    partners: [],
    customers: [],
    buyers: [],
    institutional: [],
  };
  for (const row of activeLogos) {
    const pub = logoToPublic(row, useLive);
    logoGroups[row.group].push(pub);
  }

  return {
    stats: activeStats.map((r) => statToPublic(r, useLive)),
    logos: logoGroups,
    storiesEn: activeStories.map((r) => storyToPublic(r, useLive, "en")),
    storiesHi: activeStories.map((r) => storyToPublic(r, useLive, "hi")),
    appLinks: DEFAULT_CMS_SITE_CONFIG.appLinks,
    agriParkTour: DEFAULT_CMS_SITE_CONFIG.agriParkTour,
  };
}

export async function fetchHomeCms(preview = false): Promise<HomeCmsData> {
  if (!isDbConfigured()) {
    const { mockStats, mockLogos, mockStories, mockSiteConfig } = await import("@/server/cms-memory");
    const data = buildHomeCmsFromRows(mockStats, mockLogos, mockStories, preview);
    data.appLinks = mockSiteConfig.appLinks;
    data.agriParkTour = mockSiteConfig.agriParkTour;
    return data;
  }
  try {
    await ensureCmsSchema();
    const db = await getDbPool();
    const [statRows] = await db.query(`SELECT * FROM cms_stats ORDER BY sort_order ASC`);
    const [logoRows] = await db.query(`SELECT * FROM cms_brand_logos ORDER BY sort_order ASC`);
    const [storyRows] = await db.query(`SELECT * FROM cms_farmer_stories ORDER BY sort_order ASC`);
    const stats = (statRows as Record<string, unknown>[]).map(mapStatRow);
    const logos = (logoRows as Record<string, unknown>[]).map(mapLogoRow);
    const stories = (storyRows as Record<string, unknown>[]).map(mapStoryRow);
    if (!stats.length && !logos.length && !stories.length) {
      const siteConfig = await fetchSiteConfig();
      return {
        ...HOMEPAGE_CMS_FALLBACK,
        appLinks: siteConfig.appLinks,
        agriParkTour: siteConfig.agriParkTour,
      };
    }
    const data = buildHomeCmsFromRows(stats, logos, stories, preview);
    if (!data.stats.length) data.stats = HOMEPAGE_CMS_FALLBACK.stats;
    if (!data.storiesEn.length) {
      data.storiesEn = HOMEPAGE_CMS_FALLBACK.storiesEn;
      data.storiesHi = HOMEPAGE_CMS_FALLBACK.storiesHi;
    }
    const hasLogos = Object.values(data.logos).some((g) => g.length > 0);
    if (!hasLogos) data.logos = HOMEPAGE_CMS_FALLBACK.logos;
    const siteConfig = await fetchSiteConfig();
    data.appLinks = siteConfig.appLinks;
    data.agriParkTour = siteConfig.agriParkTour;
    return data;
  } catch (err) {
    console.warn("fetchHomeCms fallback:", err);
    return HOMEPAGE_CMS_FALLBACK;
  }
}

function countOverview<T extends { status: CmsStatus; hasUnpublishedChanges: boolean }>(rows: T[]) {
  return {
    published: rows.filter((r) => r.status === "published").length,
    draft: rows.filter((r) => r.status === "draft").length,
    pending: rows.filter((r) => r.status === "published" && r.hasUnpublishedChanges).length,
  };
}

export async function fetchCmsOverview(): Promise<CmsOverview> {
  const { listCmsTeam } = await import("@/server/cms-team-queries");
  const [stats, logos, stories, teamRows] = await Promise.all([
    listCmsStats({ status: "all" }),
    listCmsLogos({ status: "all" }),
    listCmsStories({ status: "all" }),
    listCmsTeam({ status: "all" }),
  ]);
  return {
    stats: countOverview(stats),
    logos: countOverview(logos),
    stories: countOverview(stories),
    team: countOverview(teamRows),
  };
}

function matchesQ(q: string | undefined, ...fields: string[]) {
  if (!q?.trim()) return true;
  const needle = q.trim().toLowerCase();
  return fields.some((f) => f.toLowerCase().includes(needle));
}

export async function listCmsStats(filters: CmsListFilters = {}): Promise<CmsStatRow[]> {
  if (!isDbConfigured()) return [];
  await ensureCmsSchema();
  const db = await getDbPool();
  let sql = `SELECT * FROM cms_stats WHERE 1=1`;
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
    .map(mapStatRow)
    .filter((r) => matchesQ(filters.q, r.labelEn, r.labelHi, r.slug));
}

export async function listCmsLogos(filters: CmsListFilters = {}): Promise<CmsLogoRow[]> {
  if (!isDbConfigured()) return [];
  await ensureCmsSchema();
  const db = await getDbPool();
  let sql = `SELECT * FROM cms_brand_logos WHERE 1=1`;
  const params: Record<string, unknown> = {};
  if (filters.status && filters.status !== "all") {
    sql += ` AND status = :status`;
    params.status = filters.status;
  } else {
    sql += ` AND status != 'archived'`;
  }
  if (filters.group && filters.group !== "all") {
    sql += ` AND logo_group = :group`;
    params.group = filters.group;
  }
  sql += ` ORDER BY sort_order ASC`;
  const [rows] = await db.query(sql, params);
  return (rows as Record<string, unknown>[])
    .map(mapLogoRow)
    .filter((r) => matchesQ(filters.q, r.name, r.group));
}

export async function listCmsStories(filters: CmsListFilters = {}): Promise<CmsStoryRow[]> {
  if (!isDbConfigured()) return [];
  await ensureCmsSchema();
  const db = await getDbPool();
  let sql = `SELECT * FROM cms_farmer_stories WHERE 1=1`;
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
    .map(mapStoryRow)
    .filter((r) =>
      matchesQ(filters.q, r.nameEn, r.nameHi, r.slug, r.cropEn, r.cropHi, r.locationEn),
    );
}

export async function saveCmsStat(
  data: Partial<CmsStatPayload> & { id?: number; sortOrder?: number },
): Promise<CmsStatRow> {
  await ensureCmsSchema();
  const db = await getDbPool();
  if (data.id) {
    await db.query(
      `UPDATE cms_stats SET
        slug = :slug, icon_key = :iconKey, num_value = :numValue, prefix = :prefix,
        suffix_en = :suffixEn, suffix_hi = :suffixHi, label_en = :labelEn, label_hi = :labelHi,
        sort_order = COALESCE(:sortOrder, sort_order), status = IF(status = 'archived', 'draft', status)
       WHERE id = :id`,
      {
        id: data.id,
        slug: data.slug,
        iconKey: data.iconKey,
        numValue: data.numValue,
        prefix: data.prefix ?? null,
        suffixEn: data.suffixEn,
        suffixHi: data.suffixHi,
        labelEn: data.labelEn,
        labelHi: data.labelHi,
        sortOrder: data.sortOrder ?? null,
      },
    );
    const [rows] = await db.query(`SELECT * FROM cms_stats WHERE id = :id`, { id: data.id });
    return mapStatRow((rows as Record<string, unknown>[])[0]!);
  }
  const [maxRows] = await db.query(`SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM cms_stats`);
  const sortOrder = Number((maxRows as Array<{ next: number }>)[0]?.next ?? 0);
  const [result] = await db.query(
    `INSERT INTO cms_stats
     (slug, icon_key, num_value, prefix, suffix_en, suffix_hi, label_en, label_hi, sort_order, status)
     VALUES (:slug, :iconKey, :numValue, :prefix, :suffixEn, :suffixHi, :labelEn, :labelHi, :sortOrder, 'draft')`,
    {
      slug: data.slug,
      iconKey: data.iconKey,
      numValue: data.numValue ?? 0,
      prefix: data.prefix ?? null,
      suffixEn: data.suffixEn ?? "",
      suffixHi: data.suffixHi ?? "",
      labelEn: data.labelEn ?? "",
      labelHi: data.labelHi ?? "",
      sortOrder,
    },
  );
  const insertId = (result as { insertId: number }).insertId;
  const [rows] = await db.query(`SELECT * FROM cms_stats WHERE id = :id`, { id: insertId });
  return mapStatRow((rows as Record<string, unknown>[])[0]!);
}

export async function saveCmsLogo(
  data: Partial<CmsLogoPayload> & { id?: number; sortOrder?: number },
): Promise<CmsLogoRow> {
  await ensureCmsSchema();
  const db = await getDbPool();
  if (data.id) {
    await db.query(
      `UPDATE cms_brand_logos SET
        name = :name, logo_group = :group, image_url = :imageUrl,
        sort_order = COALESCE(:sortOrder, sort_order), status = IF(status = 'archived', 'draft', status)
       WHERE id = :id`,
      {
        id: data.id,
        name: data.name,
        group: data.group,
        imageUrl: data.imageUrl,
        sortOrder: data.sortOrder ?? null,
      },
    );
    const [rows] = await db.query(`SELECT * FROM cms_brand_logos WHERE id = :id`, { id: data.id });
    return mapLogoRow((rows as Record<string, unknown>[])[0]!);
  }
  const [maxRows] = await db.query(
    `SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM cms_brand_logos`,
  );
  const sortOrder = Number((maxRows as Array<{ next: number }>)[0]?.next ?? 0);
  const [result] = await db.query(
    `INSERT INTO cms_brand_logos (name, logo_group, image_url, sort_order, status)
     VALUES (:name, :group, :imageUrl, :sortOrder, 'draft')`,
    {
      name: data.name ?? "",
      group: data.group ?? "partners",
      imageUrl: data.imageUrl ?? "",
      sortOrder,
    },
  );
  const insertId = (result as { insertId: number }).insertId;
  const [rows] = await db.query(`SELECT * FROM cms_brand_logos WHERE id = :id`, { id: insertId });
  return mapLogoRow((rows as Record<string, unknown>[])[0]!);
}

export async function saveCmsStory(
  data: Partial<CmsStoryPayload> & { id?: number; sortOrder?: number },
): Promise<CmsStoryRow> {
  await ensureCmsSchema();
  const db = await getDbPool();
  if (data.id) {
    await db.query(
      `UPDATE cms_farmer_stories SET
        slug = :slug, name_en = :nameEn, name_hi = :nameHi, role_en = :roleEn, role_hi = :roleHi,
        location_en = :locationEn, location_hi = :locationHi, acres_en = :acresEn, acres_hi = :acresHi,
        crop_en = :cropEn, crop_hi = :cropHi, quote_en = :quoteEn, quote_hi = :quoteHi,
        badge_en = :badgeEn, badge_hi = :badgeHi, thumbnail_url = :thumbnailUrl, video_url = :videoUrl,
        sort_order = COALESCE(:sortOrder, sort_order), status = IF(status = 'archived', 'draft', status)
       WHERE id = :id`,
      { ...data, sortOrder: data.sortOrder ?? null },
    );
    const [rows] = await db.query(`SELECT * FROM cms_farmer_stories WHERE id = :id`, { id: data.id });
    return mapStoryRow((rows as Record<string, unknown>[])[0]!);
  }
  const [maxRows] = await db.query(
    `SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM cms_farmer_stories`,
  );
  const sortOrder = Number((maxRows as Array<{ next: number }>)[0]?.next ?? 0);
  const [result] = await db.query(
    `INSERT INTO cms_farmer_stories
     (slug, name_en, name_hi, role_en, role_hi, location_en, location_hi, acres_en, acres_hi,
      crop_en, crop_hi, quote_en, quote_hi, badge_en, badge_hi, thumbnail_url, video_url, sort_order, status)
     VALUES (:slug, :nameEn, :nameHi, :roleEn, :roleHi, :locationEn, :locationHi, :acresEn, :acresHi,
      :cropEn, :cropHi, :quoteEn, :quoteHi, :badgeEn, :badgeHi, :thumbnailUrl, :videoUrl, :sortOrder, 'draft')`,
    {
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
      sortOrder,
    },
  );
  const insertId = (result as { insertId: number }).insertId;
  const [rows] = await db.query(`SELECT * FROM cms_farmer_stories WHERE id = :id`, { id: insertId });
  return mapStoryRow((rows as Record<string, unknown>[])[0]!);
}

async function publishRow(table: "cms_stats" | "cms_brand_logos" | "cms_farmer_stories", id: number) {
  await ensureCmsSchema();
  const db = await getDbPool();
  if (table === "cms_stats") {
    const [rows] = await db.query(`SELECT * FROM cms_stats WHERE id = :id`, { id });
    const row = (rows as Record<string, unknown>[])[0];
    if (!row) throw new Error("NOT_FOUND");
    const payload = statPayloadFromRow(row);
    await db.query(
      `UPDATE cms_stats SET status = 'published', live_payload = :livePayload, published_at = NOW() WHERE id = :id`,
      { id, livePayload: JSON.stringify(payload) },
    );
    const [updated] = await db.query(`SELECT * FROM cms_stats WHERE id = :id`, { id });
    return mapStatRow((updated as Record<string, unknown>[])[0]!);
  }
  if (table === "cms_brand_logos") {
    const [rows] = await db.query(`SELECT * FROM cms_brand_logos WHERE id = :id`, { id });
    const row = (rows as Record<string, unknown>[])[0];
    if (!row) throw new Error("NOT_FOUND");
    const payload = logoPayloadFromRow(row);
    await db.query(
      `UPDATE cms_brand_logos SET status = 'published', live_payload = :livePayload, published_at = NOW() WHERE id = :id`,
      { id, livePayload: JSON.stringify(payload) },
    );
    const [updated] = await db.query(`SELECT * FROM cms_brand_logos WHERE id = :id`, { id });
    return mapLogoRow((updated as Record<string, unknown>[])[0]!);
  }
  const [rows] = await db.query(`SELECT * FROM cms_farmer_stories WHERE id = :id`, { id });
  const row = (rows as Record<string, unknown>[])[0];
  if (!row) throw new Error("NOT_FOUND");
  const payload = storyPayloadFromRow(row);
  await db.query(
    `UPDATE cms_farmer_stories SET status = 'published', live_payload = :livePayload, published_at = NOW() WHERE id = :id`,
    { id, livePayload: JSON.stringify(payload) },
  );
  const [updated] = await db.query(`SELECT * FROM cms_farmer_stories WHERE id = :id`, { id });
  return mapStoryRow((updated as Record<string, unknown>[])[0]!);
}

export async function publishCmsStat(id: number) {
  return publishRow("cms_stats", id);
}

export async function publishCmsLogo(id: number) {
  return publishRow("cms_brand_logos", id);
}

export async function publishCmsStory(id: number) {
  return publishRow("cms_farmer_stories", id);
}

async function unpublishRow(table: "cms_stats" | "cms_brand_logos" | "cms_farmer_stories", id: number) {
  await ensureCmsSchema();
  const db = await getDbPool();
  await db.query(`UPDATE ${table} SET status = 'draft' WHERE id = :id`, { id });
  const [rows] = await db.query(`SELECT * FROM ${table} WHERE id = :id`, { id });
  const row = (rows as Record<string, unknown>[])[0];
  if (!row) throw new Error("NOT_FOUND");
  if (table === "cms_stats") return mapStatRow(row);
  if (table === "cms_brand_logos") return mapLogoRow(row);
  return mapStoryRow(row);
}

export async function unpublishCmsStat(id: number) {
  return unpublishRow("cms_stats", id);
}

export async function unpublishCmsLogo(id: number) {
  return unpublishRow("cms_brand_logos", id);
}

export async function unpublishCmsStory(id: number) {
  return unpublishRow("cms_farmer_stories", id);
}

async function archiveRow(table: "cms_stats" | "cms_brand_logos" | "cms_farmer_stories", id: number) {
  await ensureCmsSchema();
  const db = await getDbPool();
  await db.query(`UPDATE ${table} SET status = 'archived' WHERE id = :id`, { id });
}

export async function archiveCmsStat(id: number) {
  return archiveRow("cms_stats", id);
}

export async function archiveCmsLogo(id: number) {
  return archiveRow("cms_brand_logos", id);
}

export async function archiveCmsStory(id: number) {
  return archiveRow("cms_farmer_stories", id);
}

export async function reorderCmsStats(ids: number[]) {
  await ensureCmsSchema();
  const db = await getDbPool();
  for (let i = 0; i < ids.length; i++) {
    await db.query(`UPDATE cms_stats SET sort_order = :order WHERE id = :id`, { id: ids[i], order: i });
  }
}

export async function reorderCmsLogos(ids: number[]) {
  await ensureCmsSchema();
  const db = await getDbPool();
  for (let i = 0; i < ids.length; i++) {
    await db.query(`UPDATE cms_brand_logos SET sort_order = :order WHERE id = :id`, { id: ids[i], order: i });
  }
}

export async function reorderCmsStories(ids: number[]) {
  await ensureCmsSchema();
  const db = await getDbPool();
  for (let i = 0; i < ids.length; i++) {
    await db.query(`UPDATE cms_farmer_stories SET sort_order = :order WHERE id = :id`, { id: ids[i], order: i });
  }
}
