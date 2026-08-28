import type { ResolvedSeo } from "@/lib/seo-types";
import {
  buildSeoHeadLinks,
  buildSeoHeadMeta,
  buildSeoHeadScripts,
} from "@/lib/seo-service";

export function seoToRouteHead(seo: ResolvedSeo) {
  return {
    meta: buildSeoHeadMeta(seo),
    links: buildSeoHeadLinks(seo),
    scripts: buildSeoHeadScripts(seo),
  };
}

export async function loadRouteSeo(
  entityType: string,
  entityKey: string,
  locale?: string,
): Promise<ResolvedSeo | null> {
  const { getPublicPageSeo } = await import("@/functions/seo");
  return getPublicPageSeo({
    data: { entityType, entityKey, locale: locale ?? "en" },
  });
}

export async function buildRouteHead(
  entityType: string,
  entityKey: string,
  locale?: string,
) {
  const seo = await loadRouteSeo(entityType, entityKey, locale);
  if (!seo) return {};
  return seoToRouteHead(seo);
}
