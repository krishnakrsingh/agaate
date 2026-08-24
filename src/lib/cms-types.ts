import { CAREERS_PAGE_FALLBACK } from "@/data/careers-fallback";
import { ABOUT_PAGE_FALLBACK } from "@/data/about-page-fallback";
import { CONTACT_PAGE_FALLBACK } from "@/data/contact-page-fallback";
import { KISAAN_MALL_PAGE_FALLBACK } from "@/data/kisaan-mall-page-fallback";
import { AGRI_PARK_CHAPTER_FALLBACK } from "@/data/agri-park-chapter-fallback";
import { HOMEPAGE_CHAPTERS_FALLBACK } from "@/data/homepage-chapters-fallback";

export const CMS_STATUSES = ["draft", "published", "archived"] as const;
export type CmsStatus = (typeof CMS_STATUSES)[number];

export const CMS_ICON_KEYS = [
  "tractor",
  "plant",
  "chart",
  "handshake",
  "warehouse",
  "drop",
  "cap",
  "users",
  "stack",
  "lightning",
  "storefront",
  "compass",
  "chat",
] as const;
export type CmsIconKey = (typeof CMS_ICON_KEYS)[number];

export const CMS_BRAND_GROUPS = ["partners", "customers", "buyers", "institutional"] as const;
export type CmsBrandGroup = (typeof CMS_BRAND_GROUPS)[number];

export const CMS_BRAND_GROUP_LABELS: Record<CmsBrandGroup, string> = {
  partners: "Partners",
  customers: "Customers (FPOs)",
  buyers: "Market access",
  institutional: "Institutional Tieups",
};

export type CmsStatPayload = {
  slug: string;
  iconKey: CmsIconKey;
  numValue: number;
  prefix?: string;
  suffixEn: string;
  suffixHi: string;
  labelEn: string;
  labelHi: string;
};

export type CmsStatRow = CmsStatPayload & {
  id: number;
  sortOrder: number;
  status: CmsStatus;
  livePayload: CmsStatPayload | null;
  publishedAt: string | null;
  updatedAt: string;
  hasUnpublishedChanges: boolean;
};

export type CmsLogoPayload = {
  name: string;
  group: CmsBrandGroup;
  imageUrl: string;
};

export type CmsLogoRow = CmsLogoPayload & {
  id: number;
  sortOrder: number;
  status: CmsStatus;
  livePayload: CmsLogoPayload | null;
  publishedAt: string | null;
  updatedAt: string;
  hasUnpublishedChanges: boolean;
};

export type CmsStoryPayload = {
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
};

export type CmsStoryRow = CmsStoryPayload & {
  id: number;
  sortOrder: number;
  status: CmsStatus;
  livePayload: CmsStoryPayload | null;
  publishedAt: string | null;
  updatedAt: string;
  hasUnpublishedChanges: boolean;
};

export type HomeCmsStat = CmsStatPayload & { id: string };

export type HomeCmsLogo = { name: string; src: string };

export type HomeCmsStory = {
  id: string;
  name: string;
  role: string;
  location: string;
  acres: string;
  crop: string;
  quote: string;
  thumbnail: string;
  videoUrl: string;
  badge: string;
};

export type HomeCmsAppLinks = {
  googlePlayUrl: string;
  appStoreUrl: string;
};

export const DEFAULT_HOME_CMS_APP_LINKS: HomeCmsAppLinks = {
  googlePlayUrl: "https://play.google.com/store/apps",
  appStoreUrl: "https://apps.apple.com/us/app",
};

export type HomeCmsAgriParkTour = {
  videoUrl: string;
  posterUrl: string;
};

export const DEFAULT_HOME_CMS_AGRI_PARK_TOUR: HomeCmsAgriParkTour = {
  videoUrl: "/videos/farm-first-look.mp4",
  posterUrl: "/videos/posters/farm-first-look.webp",
};

export type KisaanMallLanding = {
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
};

export const DEFAULT_KISAAN_MALL_LANDING: KisaanMallLanding = {
  badgeEn: "Launching Soon",
  badgeHi: "जल्द आ रहा है",
  titleEn: "Kisaan Mall",
  titleHi: "किसान मॉल",
  descriptionEn:
    "Direct access to 100% genuine hybrid seeds, biologicals, and modern farm inputs. Join the waitlist for launch updates.",
  descriptionHi:
    "भारतीय किसानों के लिए 100% प्रामाणिक बीज, जैविक पोषण व आधुनिक कृषि इनपुट्स। लॉन्च अपडेट्स पाने के लिए जुड़े रहें।",
  placeholderEn: "Enter email or mobile number",
  placeholderHi: "ईमेल या मोबाइल नंबर दर्ज करें",
  successEn: "You're on the list. We'll be in touch soon!",
  successHi: "धन्यवाद! हम आपको लॉन्च अपडेट्स जल्द भेजेंगे।",
};

export type KisaanMallDisplayMode = "coming_soon" | "full";

export type KisaanMallHeroStat = {
  numValue: number;
  suffixEn: string;
  suffixHi: string;
  valueTextEn: string;
  valueTextHi: string;
  labelEn: string;
  labelHi: string;
};

export type KisaanMallCategoryItem = {
  id: string;
  titleEn: string;
  titleHi: string;
  tagEn: string;
  tagHi: string;
  descEn: string;
  descHi: string;
  examplesEn: string[];
  examplesHi: string[];
  badgeEn: string;
  badgeHi: string;
  iconKey: CmsIconKey;
};

export type KisaanMallSupplyStep = {
  step: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  iconKey: CmsIconKey;
};

export type KisaanMallTrustItem = {
  labelEn: string;
  labelHi: string;
  valueEn: string;
  valueHi: string;
  hintEn: string;
  hintHi: string;
  iconKey: CmsIconKey;
};

export type KisaanMallFaqItem = {
  qEn: string;
  qHi: string;
  aEn: string;
  aHi: string;
};

export type KisaanMallSectionCopy = {
  badgeEn: string;
  badgeHi: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
};

export type KisaanMallHomeChapter = {
  badgeEn: string;
  badgeHi: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  featuresEn: string[];
  featuresHi: string[];
  browseLabelEn: string;
  browseLabelHi: string;
  supplyHeadingEn: string;
  supplyHeadingHi: string;
  supplySubtextEn: string;
  supplySubtextHi: string;
  ctaEyebrowEn: string;
  ctaEyebrowHi: string;
  ctaTitleEn: string;
  ctaTitleHi: string;
  ctaDescriptionEn: string;
  ctaDescriptionHi: string;
  ctaBrowseEn: string;
  ctaBrowseHi: string;
  ctaCallEn: string;
  ctaCallHi: string;
};

export type HomeChapterStat = {
  numValue: number;
  prefixEn: string;
  prefixHi: string;
  suffixEn: string;
  suffixHi: string;
  valueTextEn: string;
  valueTextHi: string;
  labelEn: string;
  labelHi: string;
};

export type HomePillarCtaType = "whatsapp" | "modal" | "locations";

export type HomePillarItem = {
  id: string;
  number: string;
  tagEn: string;
  tagHi: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  metrics: HomeChapterStat[];
  featuresEn: string[];
  featuresHi: string[];
  ctaTextEn: string;
  ctaTextHi: string;
  ctaType: HomePillarCtaType;
  imageUrl: string;
  imageAltEn: string;
  imageAltHi: string;
  locationsBadgeEn: string;
  locationsBadgeHi: string;
  viewLocationsLabelEn: string;
  viewLocationsLabelHi: string;
};

export type HomePillarMarketChapter = {
  badgeEn: string;
  badgeHi: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  stats: HomeChapterStat[];
  highlightsEn: string[];
  highlightsHi: string[];
  ctaLabelEn: string;
  ctaLabelHi: string;
  imageUrl: string;
  imageAltEn: string;
  imageAltHi: string;
};

export type HomeAppChapterContent = {
  badgeEn: string;
  badgeHi: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  stats: HomeChapterStat[];
  checklistEn: string[];
  checklistHi: string[];
};

export type HomeClosingPathwayType = "whatsapp" | "link" | "modal";

export type HomeClosingPathway = {
  number: string;
  iconKey: CmsIconKey;
  tagEn: string;
  tagHi: string;
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  actionLabelEn: string;
  actionLabelHi: string;
  actionSubEn: string;
  actionSubHi: string;
  type: HomeClosingPathwayType;
  linkHref: string;
  perksEn: string[];
  perksHi: string[];
};

export type HomeClosingChapterContent = {
  badgeEn: string;
  badgeHi: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  pathways: HomeClosingPathway[];
};

export type HomepageChaptersContent = {
  pillars: HomePillarItem[];
  pillarMarket: HomePillarMarketChapter;
  appChapter: HomeAppChapterContent;
  closingChapter: HomeClosingChapterContent;
};

export type HomeAgriParkChapterContent = {
  badgeEn: string;
  badgeHi: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  stats: HomeChapterStat[];
  checklistEn: string[];
  checklistHi: string[];
  bookVisitLabelEn: string;
  bookVisitLabelHi: string;
  watchTourLabelEn: string;
  watchTourLabelHi: string;
  locationBadgeEn: string;
  locationBadgeHi: string;
  mapImageUrl: string;
  mapAltEn: string;
  mapAltHi: string;
};

export type KisaanMallPageContent = {
  displayMode: KisaanMallDisplayMode;
  homeChapter: KisaanMallHomeChapter;
  heroEyebrowEn: string;
  heroEyebrowHi: string;
  heroTitleEn: string;
  heroTitleHi: string;
  heroTitleAccentEn: string;
  heroTitleAccentHi: string;
  heroDescriptionEn: string;
  heroDescriptionHi: string;
  heroNotifyPlaceholderEn: string;
  heroNotifyPlaceholderHi: string;
  heroNotifyButtonEn: string;
  heroNotifyButtonHi: string;
  heroNotifySuccessEn: string;
  heroNotifySuccessHi: string;
  heroWhatsappLabelEn: string;
  heroWhatsappLabelHi: string;
  heroStats: KisaanMallHeroStat[];
  aisles: KisaanMallSectionCopy;
  categories: KisaanMallCategoryItem[];
  supplyChain: KisaanMallSectionCopy;
  supplySteps: KisaanMallSupplyStep[];
  trust: KisaanMallSectionCopy;
  trustItems: KisaanMallTrustItem[];
  faq: KisaanMallSectionCopy;
  faqs: KisaanMallFaqItem[];
  ctaBadgeEn: string;
  ctaBadgeHi: string;
  ctaTitleEn: string;
  ctaTitleHi: string;
  ctaDescriptionEn: string;
  ctaDescriptionHi: string;
  ctaHoursEn: string;
  ctaHoursHi: string;
  ctaWhatsappLabelEn: string;
  ctaWhatsappLabelHi: string;
  ctaImageUrl: string;
  ctaImageAltEn: string;
  ctaImageAltHi: string;
};

export const CAREER_DEPARTMENT_CATEGORIES = ["Agronomy", "Corporate", "Retail"] as const;
export type CareerDepartmentCategory = (typeof CAREER_DEPARTMENT_CATEGORIES)[number];

export type CareersHeroStat = {
  value: number;
  suffix: string;
  labelEn: string;
  labelHi: string;
  subEn: string;
  subHi: string;
};

export type CareersCultureCard = {
  tagEn: string;
  tagHi: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  iconKey: CmsIconKey;
};

export type CareersCampusSkill = {
  iconKey: CmsIconKey;
  labelEn: string;
  labelHi: string;
};

export type CareersPageContent = {
  heroBadgeEn: string;
  heroBadgeHi: string;
  heroTitleEn: string;
  heroTitleHi: string;
  heroDescriptionEn: string;
  heroDescriptionHi: string;
  heroLocationEn: string;
  heroLocationHi: string;
  heroStats: CareersHeroStat[];
  cultureCards: CareersCultureCard[];
  openRolesTitleEn: string;
  openRolesTitleHi: string;
  openRolesSubtitleEn: string;
  openRolesSubtitleHi: string;
  campusBadgeEn: string;
  campusBadgeHi: string;
  campusTitleEn: string;
  campusTitleHi: string;
  campusDescriptionEn: string;
  campusDescriptionHi: string;
  campusSkills: CareersCampusSkill[];
  campusEmailSubject: string;
};

export type CareerJob = {
  id: string;
  title: string;
  dept: string;
  departmentCategory: CareerDepartmentCategory;
  loc: string;
  type: string;
  desc: string;
  experienceLevel?: string;
  highlights?: string[];
  reqs: string[];
  responsibilities?: string[];
};

export type CmsCareerJobPayload = {
  slug: string;
  titleEn: string;
  titleHi: string;
  deptEn: string;
  deptHi: string;
  departmentCategory: CareerDepartmentCategory;
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
};

export type CmsCareerJobRow = CmsCareerJobPayload & {
  id: number;
  sortOrder: number;
  status: CmsStatus;
  livePayload: CmsCareerJobPayload | null;
  publishedAt: string | null;
  updatedAt: string;
  hasUnpublishedChanges: boolean;
};

export type SiteSocialLinks = {
  facebook: string;
  youtube: string;
  instagram: string;
  linkedin: string;
};

export type SiteWhatsAppMessages = {
  consultation: string;
  agronomist: string;
  bigFarmSetup: string;
  carbonCredits: string;
  contact: string;
  about: string;
  mall: string;
  closingAdvisoryEn: string;
  closingAdvisoryHi: string;
  farmerStory: string;
  farmerStoryModal: string;
  appContinue: string;
  community: string;
  marketAccess: string;
};

export type SiteContactTrustStat = {
  labelEn: string;
  labelHi: string;
  valueEn: string;
  valueHi: string;
  hintEn: string;
  hintHi: string;
};

export type SiteFacilityConfig = {
  id: string;
  nameEn: string;
  nameHi: string;
  taglineEn: string;
  taglineHi: string;
  roleEn: string;
  roleHi: string;
  addressEn: string;
  addressHi: string;
  districtEn: string;
  districtHi: string;
  plusCode: string;
  phone: string;
  telRaw: string;
  email: string;
  hoursEn: string;
  hoursHi: string;
  teamEn: string;
  teamHi: string;
  highlightsEn: string[];
  highlightsHi: string[];
  mapsUrl: string;
  mapEmbedQuery: string;
  lat: number;
  lng: number;
  latLabel: string;
  lngLabel: string;
  iconKey: CmsIconKey;
  imageUrl: string;
};

export type SiteContactConfig = {
  primaryPhone: string;
  primaryPhoneDisplay: string;
  primaryTel: string;
  altPhone: string;
  altPhoneDisplay: string;
  altTel: string;
  primaryEmail: string;
  careersEmail: string;
  whatsappNumber: string;
  whatsappMessages: SiteWhatsAppMessages;
  social: SiteSocialLinks;
  footerLocationEn: string;
  footerLocationHi: string;
  registeredOfficeEn: string;
  registeredOfficeHi: string;
  cin: string;
  contactTrustStats: SiteContactTrustStat[];
  facilities: SiteFacilityConfig[];
};

export type ContactFaqItem = {
  qEn: string;
  qHi: string;
  aEn: string;
  aHi: string;
};

export type ContactConsultationTopic = {
  id: string;
  labelEn: string;
  labelHi: string;
  descEn: string;
  descHi: string;
  iconKey: CmsIconKey;
};

export type ContactPageContent = {
  faqBadgeEn: string;
  faqBadgeHi: string;
  faqTitleEn: string;
  faqTitleHi: string;
  faqs: ContactFaqItem[];
  consultationTopics: ContactConsultationTopic[];
  acreageOptionsEn: string[];
  acreageOptionsHi: string[];
  cropOptionsEn: string[];
  cropOptionsHi: string[];
  channelOptionsEn: string[];
  channelOptionsHi: string[];
};

export type AboutHeroStat = {
  valueEn: string;
  valueHi: string;
  labelEn: string;
  labelHi: string;
};

export type AboutHeroContent = {
  badgeEn: string;
  badgeHi: string;
  titleEn: string;
  titleHi: string;
  titleAccentEn: string;
  titleAccentHi: string;
  descriptionEn: string;
  descriptionHi: string;
  heroImageUrl: string;
  heroImageAltEn: string;
  heroImageAltHi: string;
  stats: AboutHeroStat[];
};

export type AboutWhoWeAreContent = {
  eyebrowEn: string;
  eyebrowHi: string;
  headlineEn: string;
  headlineHi: string;
  bodyEn: string;
  bodyHi: string;
  pullQuoteEn: string;
  pullQuoteHi: string;
  imageUrl: string;
  imageAltEn: string;
  imageAltHi: string;
};

export type AboutMissionContent = {
  eyebrowEn: string;
  eyebrowHi: string;
  titleEn: string;
  titleHi: string;
  bodyEn: string;
  bodyHi: string;
  supportEn: string;
  supportHi: string;
};

export type AboutGuaranteeCard = {
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  badgeEn: string;
  badgeHi: string;
  iconKey: CmsIconKey;
};

export type AboutImpactMetric = {
  numValue: number;
  suffixEn: string;
  suffixHi: string;
  labelEn: string;
  labelHi: string;
  iconKey: CmsIconKey;
};

export type AboutMilestone = {
  year: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  highlightsEn: string[];
  highlightsHi: string[];
};

export type AboutLocation = {
  tagEn: string;
  tagHi: string;
  nameEn: string;
  nameHi: string;
  addressEn: string;
  addressHi: string;
  subEn: string;
  subHi: string;
};

export type AboutComplianceItem = {
  labelEn: string;
  labelHi: string;
  valueEn: string;
  valueHi: string;
};

export type AboutPageContent = {
  brochureHref: string;
  hero: AboutHeroContent;
  whoWeAre: AboutWhoWeAreContent;
  mission: AboutMissionContent;
  guarantees: AboutGuaranteeCard[];
  impactMetrics: AboutImpactMetric[];
  milestones: AboutMilestone[];
  locations: AboutLocation[];
  complianceHighlights: AboutComplianceItem[];
  complianceFooterEn: string;
  complianceFooterHi: string;
};

export type CmsSiteConfig = {
  appLinks: HomeCmsAppLinks;
  agriParkTour: HomeCmsAgriParkTour;
  kisaanMallLanding: KisaanMallLanding;
  kisaanMallPage: KisaanMallPageContent;
  agriParkChapter: HomeAgriParkChapterContent;
  homepageChapters: HomepageChaptersContent;
  careersPage: CareersPageContent;
  siteContact: SiteContactConfig;
  aboutPage: AboutPageContent;
  contactPage: ContactPageContent;
};

export const DEFAULT_CMS_SITE_CONFIG: CmsSiteConfig = {
  appLinks: DEFAULT_HOME_CMS_APP_LINKS,
  agriParkTour: DEFAULT_HOME_CMS_AGRI_PARK_TOUR,
  kisaanMallLanding: DEFAULT_KISAAN_MALL_LANDING,
  kisaanMallPage: KISAAN_MALL_PAGE_FALLBACK,
  agriParkChapter: AGRI_PARK_CHAPTER_FALLBACK,
  homepageChapters: HOMEPAGE_CHAPTERS_FALLBACK,
  careersPage: CAREERS_PAGE_FALLBACK,
  siteContact: SITE_CONTACT_FALLBACK,
  aboutPage: ABOUT_PAGE_FALLBACK,
  contactPage: CONTACT_PAGE_FALLBACK,
};

export type HomeCmsData = {
  stats: HomeCmsStat[];
  logos: Record<CmsBrandGroup, HomeCmsLogo[]>;
  storiesEn: HomeCmsStory[];
  storiesHi: HomeCmsStory[];
  appLinks: HomeCmsAppLinks;
  agriParkTour: HomeCmsAgriParkTour;
};

export type CmsTeamMemberPayload = {
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
};

export type CmsTeamMemberRow = CmsTeamMemberPayload & {
  id: number;
  sortOrder: number;
  status: CmsStatus;
  livePayload: CmsTeamMemberPayload | null;
  publishedAt: string | null;
  updatedAt: string;
  hasUnpublishedChanges: boolean;
};

export type TeamCmsMember = {
  id: string;
  name: string;
  role: string;
  focus: string;
  tag: string;
  iconKey: CmsIconKey;
  image: string;
  bio: string;
  keyAch: string[];
  pub: string;
  quote: string;
  showInBanner: boolean;
  bannerBadge: string;
};

export type TeamCmsData = {
  membersEn: TeamCmsMember[];
  membersHi: TeamCmsMember[];
};

export type CmsOverview = {
  stats: { published: number; draft: number; pending: number };
  logos: { published: number; draft: number; pending: number };
  stories: { published: number; draft: number; pending: number };
  team: { published: number; draft: number; pending: number };
};

export type CmsContentType = "stats" | "logos" | "stories" | "team" | "careerJobs";

export type CmsListFilters = {
  q?: string;
  status?: CmsStatus | "all";
  group?: CmsBrandGroup | "all";
};
