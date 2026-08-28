import type { SeoGlobalSettings } from "@/lib/seo-types";
import { DEFAULT_SITE_URL } from "@/lib/seo-registry";

export const DEFAULT_SEO_GLOBAL_SETTINGS: SeoGlobalSettings = {
  websiteName: "Agaate",
  websiteUrl: DEFAULT_SITE_URL,
  defaultTitle: "Agaate — Integrated Seed-to-Market Agri Business",
  titleSuffix: " | Agaate",
  defaultDescription:
    "Agaate is an integrated agricultural enterprise combining Bio-Boosted seedling infrastructure, input commerce, on-ground field advisory, market linkage, and carbon monetization.",
  defaultOgImage: "/logo.png",
  defaultTwitterImage: "/logo.png",
  defaultRobots: "index, follow",
  trailingSlash: false,
  organizationName: "Agaate",
  organizationLegalName: "Anzix Farm Technologies Pvt Ltd",
  organizationLogo: "/logo.png",
  organizationEmail: "hello@agaate.in",
  organizationPhone: "+91-124-000-0000",
  organizationAddress: "Gurugram, Haryana",
  organizationCity: "Gurugram",
  organizationRegion: "Haryana",
  organizationCountry: "IN",
  organizationPostalCode: "122001",
  socialProfiles: {
    twitter: "@AgaateAgri",
    facebook: "https://www.facebook.com/agaate",
    instagram: "https://www.instagram.com/agaate",
    linkedin: "https://www.linkedin.com/company/agaate",
  },
  sitemapEnabled: true,
};

export function mergeSeoGlobalSettings(
  partial?: Partial<SeoGlobalSettings> | null,
): SeoGlobalSettings {
  if (!partial) return { ...DEFAULT_SEO_GLOBAL_SETTINGS };
  return {
    ...DEFAULT_SEO_GLOBAL_SETTINGS,
    ...partial,
    socialProfiles: {
      ...DEFAULT_SEO_GLOBAL_SETTINGS.socialProfiles,
      ...(partial.socialProfiles ?? {}),
    },
  };
}

export function truncateText(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function absoluteUrl(base: string, path: string): string {
  if (!path) return base.replace(/\/$/, "");
  if (/^https?:\/\//i.test(path)) return path;
  const origin = base.replace(/\/$/, "");
  const rel = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${rel}`;
}

export function sanitizeSchemaJson(raw: string | undefined | null): string | null {
  if (!raw?.trim()) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed == null || typeof parsed !== "object") return null;
    const serialized = JSON.stringify(parsed);
    if (/<script/i.test(serialized)) return null;
    return serialized;
  } catch {
    return null;
  }
}

export function buildRobotsDirective(opts: {
  noindex?: boolean;
  nofollow?: boolean;
  custom?: string;
  defaultRobots: string;
}): string {
  if (opts.custom?.trim()) return opts.custom.trim();
  const parts: string[] = [];
  parts.push(opts.noindex ? "noindex" : "index");
  parts.push(opts.nofollow ? "nofollow" : "follow");
  return parts.join(", ");
}

export function titleLengthScore(title: string): "good" | "warn" | "fail" {
  const len = title.length;
  if (len >= 30 && len <= 60) return "good";
  if (len >= 20 && len <= 70) return "warn";
  return "fail";
}

export function descriptionLengthScore(desc: string): "good" | "warn" | "fail" {
  const len = desc.length;
  if (len >= 120 && len <= 160) return "good";
  if (len >= 70 && len <= 180) return "warn";
  return "fail";
}
