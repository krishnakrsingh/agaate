import { Article } from "@/types";

export const knowledgeCategories = [
  "All",
  "Seed Planning",
  "Crop Protection",
  "Nutrition",
  "Carbon Farming",
];

export const articles: Article[] = [
  {
    id: "art-01",
    title: "Tomato Drip Irrigation Scheduling Chart",
    cat: "Seed Planning",
    time: "5 min read",
    date: "July 12, 2026",
    desc: "An hour-by-hour drip calibration spreadsheet mapped to regional weather forecasts and transplant stage growth levels.",
    content: `Drip irrigation scheduling should adjust in sync with target leaf canopy sizes.
      
VEGETATIVE TRANSPLANT STAGE:
• Emitters active for 20 minutes at sunrise and 20 minutes at sunset.
• Target soil moisture tension index: 35-40 cb.

FLOWERING & FRUITING STAGE:
• Increase duration to 45 minutes twice daily.
• Run daily inspections to ensure zero lateral emitter clogging.`,
  },
  {
    id: "art-02",
    title: "Identifying Downy Mildew Early Symptoms",
    cat: "Crop Protection",
    time: "8 min read",
    date: "June 28, 2026",
    desc: "Spot early leaf lesions using AI diagnostics. Learn organic bio-fungicide protection schedules before crop damage spreads.",
    content: `Downy mildew thrives during warm, humid mornings with leaf moisture duration exceeding 6 hours.
      
PATHOGEN IDENTIFICATION:
• Yellow lesions forming on mature upper leaf structures.
• Purple spore fuzz layer appearing directly on leaf undersides.

ORGANIC DEFENSE RESPONSE:
• Spray biological botanical repellents immediately post-harvest.
• Vent nursery polyhouse domes early to minimize damp air pools.`,
  },
  {
    id: "art-03",
    title: "Optimal N-P-K Soil Ratios for Capsicum",
    cat: "Nutrition",
    time: "6 min read",
    date: "June 15, 2026",
    desc: "Dosing calculator for greenhouse bell peppers based on chemical soil assays and organic matter saturation indexes.",
    content: `Capsicum crops require continuous potassium availability during active fruiting to establish firm fruit walls.
      
BALANCED RATIO TARGETS:
• Nitrogen (N): Builds structural foliage canopy capacity.
• Phosphate (P): Promotes root lateral capillary expansion.
• Potassium (K): Drives fruit sizing and wall firming.`,
  },
  {
    id: "art-04",
    title: "Satellite Audit Guide for Soil Carbon Credits",
    cat: "Carbon Farming",
    time: "12 min read",
    date: "May 20, 2026",
    desc: "Learn how radar satellites check zero-tillage residue coverage to verify your seasonal carbon credit bank payouts.",
    content: `Sentinel-2 satellite imagery evaluates canopy biomass coverage logs directly to confirm zero residue crop stubble burning.
      
AUDITING MILESTONES:
• Baseline Core: Agronomist sets up coordinates.
• Orbit Scan: Verifies live canopy coverage for 75+ continuous days.
• Settlement: Carbon credits payout transfer processed.`,
  },
];
