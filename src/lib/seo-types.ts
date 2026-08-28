export type SeoEntityType =
  | "homepage"
  | "static_page"
  | "career_job"
  | "legal_page";

export type SeoStatus = "draft" | "optimized" | "needs_review";

export type SeoGlobalSettings = {
  websiteName: string;
  websiteUrl: string;
  defaultTitle: string;
  titleSuffix: string;
  defaultDescription: string;
  defaultOgImage: string;
  defaultTwitterImage: string;
  defaultRobots: string;
  trailingSlash: boolean;
  organizationName: string;
  organizationLegalName: string;
  organizationLogo: string;
  organizationEmail: string;
  organizationPhone: string;
  organizationAddress: string;
  organizationCity: string;
  organizationRegion: string;
  organizationCountry: string;
  organizationPostalCode: string;
  socialProfiles: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  googleSiteVerification?: string;
  bingSiteVerification?: string;
  robotsTxtExtra?: string;
  sitemapEnabled: boolean;
};

export type SeoMetadataInput = {
  entityType: SeoEntityType;
  entityKey: string;
  locale: string;
  seoTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  slug?: string;
  robotsDirective?: string;
  noindex?: boolean;
  nofollow?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  focusKeyword?: string;
  secondaryKeywords?: string;
  schemaJson?: string;
  customHead?: string;
  seoStatus?: SeoStatus;
};

export type SeoMetadataRow = SeoMetadataInput & {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type SeoRedirectInput = {
  id?: number;
  sourcePath: string;
  destinationPath: string;
  redirectType: 301 | 302;
  isActive: boolean;
};

export type SeoRedirectRow = SeoRedirectInput & {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type SeoPageDefinition = {
  entityType: SeoEntityType;
  entityKey: string;
  label: string;
  path: string;
  pathHi?: string;
  defaultTitle: string;
  defaultDescription: string;
  schemaType?: "WebPage" | "ContactPage" | "AboutPage" | "JobPosting" | "CollectionPage";
  breadcrumb?: Array<{ name: string; path: string }>;
  contentExcerpt?: string;
  noindex?: boolean;
};

export type ResolvedSeo = {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  noindex: boolean;
  nofollow: boolean;
  og: {
    title: string;
    description: string;
    image: string;
    type: string;
    url: string;
    siteName: string;
  };
  twitter: {
    card: string;
    site?: string;
    title: string;
    description: string;
    image: string;
  };
  alternates: Array<{ hreflang: string; href: string }>;
  schemaJsonLd: string | null;
  customHead: string | null;
  verification: {
    google?: string;
    bing?: string;
  };
};

export type SeoAuditIssue = {
  id: string;
  severity: "critical" | "high" | "medium" | "low" | "good";
  category: string;
  message: string;
  recommendation: string;
  entityType?: SeoEntityType;
  entityKey?: string;
  locale?: string;
  path?: string;
};

export type SeoChecklistItem = {
  id: string;
  label: string;
  status: "pass" | "warn" | "fail";
  hint: string;
};
