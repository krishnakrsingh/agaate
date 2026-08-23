export type Filter = "All" | "Agronomy" | "Corporate" | "Retail";

export const FILTERS: { key: Filter; label: string }[] = [
  { key: "All", label: "All Open Roles" },
  { key: "Agronomy", label: "Field Agronomy" },
  { key: "Corporate", label: "Operations & Tech" },
  { key: "Retail", label: "Retail & Commerce" },
];
