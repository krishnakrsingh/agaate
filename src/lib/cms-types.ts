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
] as const;
export type CmsIconKey = (typeof CMS_ICON_KEYS)[number];

export const CMS_BRAND_GROUPS = ["partners", "customers", "buyers"] as const;
export type CmsBrandGroup = (typeof CMS_BRAND_GROUPS)[number];

export const CMS_BRAND_GROUP_LABELS: Record<CmsBrandGroup, string> = {
  partners: "Partners",
  customers: "Customers (FPOs)",
  buyers: "Market access",
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

export type HomeCmsData = {
  stats: HomeCmsStat[];
  logos: Record<CmsBrandGroup, HomeCmsLogo[]>;
  storiesEn: HomeCmsStory[];
  storiesHi: HomeCmsStory[];
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

export type CmsContentType = "stats" | "logos" | "stories" | "team";

export type CmsListFilters = {
  q?: string;
  status?: CmsStatus | "all";
  group?: CmsBrandGroup | "all";
};
