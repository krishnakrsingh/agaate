import type { SiteContactConfig, SiteFacilityConfig } from "@/lib/cms-types";

export function createFacilityId(name: string, existing: SiteFacilityConfig[]): string {
  const base =
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "location";
  let id = base;
  let n = 2;
  while (existing.some((f) => f.id === id)) {
    id = `${base}-${n++}`;
  }
  return id;
}

export function updateFacilityAt(
  contact: SiteContactConfig,
  index: number,
  patch: Partial<SiteFacilityConfig>,
): SiteContactConfig {
  const facilities = [...contact.facilities];
  facilities[index] = { ...facilities[index]!, ...patch };
  return { ...contact, facilities };
}

export const PRIMARY_FACILITY_IDS = ["farm", "mall", "corporate"] as const;

export function isPrimaryFacilityId(id: string): boolean {
  return PRIMARY_FACILITY_IDS.includes(id as (typeof PRIMARY_FACILITY_IDS)[number]);
}
