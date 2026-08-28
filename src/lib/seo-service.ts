import type {
  ResolvedSeo,
  SeoGlobalSettings,
  SeoMetadataRow,
  SeoPageDefinition,
} from "@/lib/seo-types";
import {
  absoluteUrl,
  buildRobotsDirective,
  mergeSeoGlobalSettings,
  sanitizeSchemaJson,
  stripHtml,
  truncateText,
} from "@/lib/seo-utils";
import { localePath, normalizePath } from "@/lib/seo-registry";
import { SUPPORTED_LNGS } from "@/lib/i18n";

export type SeoResolveContext = {
  page: SeoPageDefinition;
  locale: string;
  global?: Partial<SeoGlobalSettings> | null;
  metadata?: SeoMetadataRow | null;
  contentTitle?: string;
  contentDescription?: string;
  contentExcerpt?: string;
  pathOverride?: string;
};

export function resolveSeo(ctx: SeoResolveContext): ResolvedSeo {
  const global = mergeSeoGlobalSettings(ctx.global);
  const meta = ctx.metadata;
  const locale = ctx.locale || "en";
  const pagePath = normalizePath(ctx.pathOverride ?? ctx.page.path);
  const localizedPath = localePath(pagePath, locale);

  const contentTitle = ctx.contentTitle?.trim();
  const contentDesc =
    ctx.contentDescription?.trim() ||
    ctx.contentExcerpt?.trim() ||
    stripHtml(ctx.page.contentExcerpt ?? "");

  const baseTitle =
    meta?.seoTitle?.trim() ||
    contentTitle ||
    ctx.page.defaultTitle ||
    global.defaultTitle;

  const title = baseTitle.includes(global.websiteName)
    ? baseTitle
    : `${baseTitle}${global.titleSuffix}`;

  const description = truncateText(
    meta?.metaDescription?.trim() ||
      contentDesc ||
      ctx.page.defaultDescription ||
      global.defaultDescription,
    320,
  );

  const canonical = absoluteUrl(
    global.websiteUrl,
    meta?.canonicalUrl?.trim() || localizedPath,
  );

  const ogTitle = meta?.ogTitle?.trim() || baseTitle;
  const ogDescription = meta?.ogDescription?.trim() || description;
  const ogImage = absoluteUrl(
    global.websiteUrl,
    meta?.ogImage?.trim() || global.defaultOgImage,
  );

  const twitterTitle = meta?.twitterTitle?.trim() || ogTitle;
  const twitterDescription = meta?.twitterDescription?.trim() || ogDescription;
  const twitterImage = absoluteUrl(
    global.websiteUrl,
    meta?.twitterImage?.trim() || meta?.ogImage?.trim() || global.defaultTwitterImage,
  );

  const noindex = meta?.noindex ?? ctx.page.noindex ?? false;
  const nofollow = meta?.nofollow ?? false;

  const robots = buildRobotsDirective({
    noindex,
    nofollow,
    custom: meta?.robotsDirective,
    defaultRobots: global.defaultRobots,
  });

  const alternates = SUPPORTED_LNGS.map((lng) => ({
    hreflang: lng === "en" ? "en-IN" : "hi-IN",
    href: absoluteUrl(global.websiteUrl, localePath(pagePath, lng)),
  }));
  alternates.push({
    hreflang: "x-default",
    href: absoluteUrl(global.websiteUrl, pagePath),
  });

  const schemaJsonLd =
    sanitizeSchemaJson(meta?.schemaJson) ||
    buildDefaultSchemaJsonLd({ global, page: ctx.page, title: baseTitle, description, canonical, locale });

  return {
    title,
    description,
    canonical,
    robots,
    noindex,
    nofollow,
    og: {
      title: ogTitle,
      description: ogDescription,
      image: ogImage,
      type: "website",
      url: canonical,
      siteName: global.websiteName,
    },
    twitter: {
      card: "summary_large_image",
      site: global.socialProfiles.twitter,
      title: twitterTitle,
      description: twitterDescription,
      image: twitterImage,
    },
    alternates,
    schemaJsonLd,
    customHead: meta?.customHead?.trim() || null,
    verification: {
      google: global.googleSiteVerification,
      bing: global.bingSiteVerification,
    },
  };
}

function buildDefaultSchemaJsonLd(opts: {
  global: SeoGlobalSettings;
  page: SeoPageDefinition;
  title: string;
  description: string;
  canonical: string;
  locale: string;
}): string | null {
  const { global, page, title, description, canonical } = opts;
  const orgId = `${global.websiteUrl.replace(/\/$/, "")}/#organization`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": orgId,
      name: global.organizationName,
      legalName: global.organizationLegalName,
      url: global.websiteUrl,
      logo: absoluteUrl(global.websiteUrl, global.organizationLogo),
      email: global.organizationEmail,
      telephone: global.organizationPhone,
      address: {
        "@type": "PostalAddress",
        streetAddress: global.organizationAddress,
        addressLocality: global.organizationCity,
        addressRegion: global.organizationRegion,
        postalCode: global.organizationPostalCode,
        addressCountry: global.organizationCountry,
      },
      sameAs: Object.values(global.socialProfiles).filter(Boolean),
    },
    {
      "@type": "WebSite",
      "@id": `${global.websiteUrl.replace(/\/$/, "")}/#website`,
      url: global.websiteUrl,
      name: global.websiteName,
      publisher: { "@id": orgId },
      inLanguage: opts.locale === "hi" ? "hi-IN" : "en-IN",
    },
    {
      "@type": page.schemaType ?? "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      isPartOf: { "@id": `${global.websiteUrl.replace(/\/$/, "")}/#website` },
      inLanguage: opts.locale === "hi" ? "hi-IN" : "en-IN",
    },
  ];

  if (page.breadcrumb && page.breadcrumb.length > 1) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: page.breadcrumb.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: absoluteUrl(global.websiteUrl, localePath(crumb.path, opts.locale)),
      })),
    });
  }

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}

export function buildSeoHeadMeta(seo: ResolvedSeo): Array<Record<string, string>> {
  const meta: Array<Record<string, string>> = [
    { title: seo.title },
    { name: "description", content: seo.description },
    { name: "robots", content: seo.robots },
    { property: "og:title", content: seo.og.title },
    { property: "og:description", content: seo.og.description },
    { property: "og:type", content: seo.og.type },
    { property: "og:url", content: seo.og.url },
    { property: "og:site_name", content: seo.og.siteName },
    { property: "og:image", content: seo.og.image },
    { name: "twitter:card", content: seo.twitter.card },
    { name: "twitter:title", content: seo.twitter.title },
    { name: "twitter:description", content: seo.twitter.description },
    { name: "twitter:image", content: seo.twitter.image },
  ];

  if (seo.twitter.site) {
    meta.push({ name: "twitter:site", content: seo.twitter.site });
  }
  if (seo.verification.google) {
    meta.push({ name: "google-site-verification", content: seo.verification.google });
  }
  if (seo.verification.bing) {
    meta.push({ name: "msvalidate.01", content: seo.verification.bing });
  }

  return meta;
}

export function buildSeoHeadLinks(seo: ResolvedSeo): Array<Record<string, string>> {
  const links: Array<Record<string, string>> = [
    { rel: "canonical", href: seo.canonical },
  ];
  for (const alt of seo.alternates) {
    links.push({ rel: "alternate", hreflang: alt.hreflang, href: alt.href });
  }
  return links;
}

export function buildSeoHeadScripts(seo: ResolvedSeo): Array<Record<string, string>> {
  if (!seo.schemaJsonLd) return [];
  return [{ type: "application/ld+json", children: seo.schemaJsonLd } as Record<string, string>];
}
