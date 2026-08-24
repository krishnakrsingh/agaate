export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Slug for homepage stats from English label */
export function statSlugFromLabel(labelEn: string): string {
  const slug = slugify(labelEn);
  return slug || "stat";
}

/** Slug for team members from English name */
export function teamSlugFromName(nameEn: string): string {
  const slug = slugify(nameEn);
  return slug || "team-member";
}

/** Slug for farmer stories — matches existing short-* pattern */
export function storySlugFrom(nameEn: string, cropEn: string): string {
  const cropPart = cropEn.split(/[([]/)[0]?.trim() ?? cropEn;
  const word = slugify(cropPart).split("-").filter(Boolean)[0];
  if (word) return `short-${word}`;
  const nameWord = slugify(nameEn).split("-").filter(Boolean)[0];
  return nameWord ? `short-${nameWord}` : "short-story";
}
