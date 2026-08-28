import type { ResolvedSeo } from "@/lib/seo-types";
import { loadRouteSeo, seoToRouteHead } from "@/lib/seo-head";

export async function fetchPageSeo(
  entityType: string,
  entityKey: string,
  locale?: string,
): Promise<ResolvedSeo | null> {
  return loadRouteSeo(entityType, entityKey, locale ?? "en");
}

export function headFromSeo(loaderData: { seo?: ResolvedSeo | null } | undefined) {
  if (!loaderData?.seo) return {};
  return seoToRouteHead(loaderData.seo);
}
