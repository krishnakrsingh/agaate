import type { SeoPageDefinition } from "@/lib/seo-types";

export const DEFAULT_SITE_URL = "https://agaate.in";

export const STATIC_PAGES: SeoPageDefinition[] = [
  {
    entityType: "static_page",
    entityKey: "about",
    label: "About",
    path: "/about",
    defaultTitle: "About Us — Agaate | Rooted in Science, Built for Farmers",
    defaultDescription:
      "Agaate is an integrated agricultural enterprise combining Bio-Boosted seedling infrastructure, input commerce, on-ground field advisory, and sustainable market linkage.",
    schemaType: "AboutPage",
    breadcrumb: [{ name: "Home", path: "/" }, { name: "About", path: "/about" }],
  },
  {
    entityType: "static_page",
    entityKey: "contact",
    label: "Contact",
    path: "/contact",
    defaultTitle: "Contact Agaate — Talk to an Agronomist | Gurugram",
    defaultDescription:
      "Reach Agaate agronomists in Gurugram for crop advice, nursery pre-orders, Big Farm setup, and market linkage. Typical reply within 2 business hours.",
    schemaType: "ContactPage",
    breadcrumb: [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }],
  },
  {
    entityType: "static_page",
    entityKey: "careers",
    label: "Careers",
    path: "/careers",
    defaultTitle: "Careers at Agaate — Join India's Agri-Tech Revolution",
    defaultDescription:
      "Explore open roles at Agaate. Work on seed-to-market agriculture with nursery infrastructure, precision advisory, and farmer market linkage.",
    schemaType: "CollectionPage",
    breadcrumb: [{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }],
  },
  {
    entityType: "static_page",
    entityKey: "kisaan-mall",
    label: "Kisaan Mall",
    path: "/kisaan-mall",
    defaultTitle: "Kisaan Mall — Verified Agri Inputs & Farm Essentials | Agaate",
    defaultDescription:
      "Shop verified seeds, crop protection, nutrients, and farm essentials through Agaate Kisaan Mall with agronomist-backed recommendations.",
    schemaType: "WebPage",
    breadcrumb: [{ name: "Home", path: "/" }, { name: "Kisaan Mall", path: "/kisaan-mall" }],
  },
];

export const LEGAL_PAGES: SeoPageDefinition[] = [
  {
    entityType: "legal_page",
    entityKey: "privacy-policy",
    label: "Privacy Policy",
    path: "/privacy-policy",
    defaultTitle: "Privacy Policy — Agaate",
    defaultDescription: "Read how Agaate collects, uses, and protects your personal information.",
    breadcrumb: [{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy-policy" }],
  },
  {
    entityType: "legal_page",
    entityKey: "terms-of-service",
    label: "Terms of Service",
    path: "/terms-of-service",
    defaultTitle: "Terms of Service — Agaate",
    defaultDescription: "Terms and conditions for using Agaate products, services, and website.",
    breadcrumb: [{ name: "Home", path: "/" }, { name: "Terms of Service", path: "/terms-of-service" }],
  },
  {
    entityType: "legal_page",
    entityKey: "cookie-policy",
    label: "Cookie Policy",
    path: "/cookie-policy",
    defaultTitle: "Cookie Policy — Agaate",
    defaultDescription: "Learn how Agaate uses cookies and similar technologies on our website.",
    breadcrumb: [{ name: "Home", path: "/" }, { name: "Cookie Policy", path: "/cookie-policy" }],
  },
];

export const HOMEPAGE_DEFINITION: SeoPageDefinition = {
  entityType: "homepage",
  entityKey: "main",
  label: "Homepage",
  path: "/",
  defaultTitle: "Agaate — Integrated Seed-to-Market Agri Business",
  defaultDescription:
    "Agaate is an integrated agricultural enterprise combining Bio-Boosted seedling infrastructure, input commerce, on-ground field advisory, market linkage, and carbon monetization.",
  schemaType: "WebPage",
  breadcrumb: [{ name: "Home", path: "/" }],
};

export function getAllSeoPageDefinitions(): SeoPageDefinition[] {
  return [HOMEPAGE_DEFINITION, ...STATIC_PAGES, ...LEGAL_PAGES];
}

export function findSeoPageByPath(path: string): SeoPageDefinition | undefined {
  const normalized = normalizePath(path);
  return getAllSeoPageDefinitions().find((p) => normalizePath(p.path) === normalized);
}

export function normalizePath(path: string): string {
  if (!path) return "/";
  let p = path.split("?")[0]!.split("#")[0]!;
  if (!p.startsWith("/")) p = `/${p}`;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}

export function localePath(path: string, locale: string): string {
  if (!locale || locale === "en") return path;
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}

export function stripLocaleFromPath(path: string): { locale: string; path: string } {
  const normalized = normalizePath(path);
  if (normalized === "/hi" || normalized.startsWith("/hi/")) {
    const stripped = normalized === "/hi" ? "/" : normalized.slice(3) || "/";
    return { locale: "hi", path: stripped };
  }
  return { locale: "en", path: normalized };
}
