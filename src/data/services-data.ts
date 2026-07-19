import { CatalogItem, CarbonPractice } from "@/types";

export const kisaanMallCategories = ["All", "Seeds", "Nutrients", "Protection", "Irrigation"];

export const catalogItems: CatalogItem[] = [
  {
    id: "IN-S01",
    name: "Sakata Tomato Hybrid F1 Seeds",
    category: "Seeds",
    pricePerAc: 4500,
    crop: "Tomato",
    desc: "High germination vigor seeds, pre-treated with anti-fungal biological film.",
  },
  {
    id: "IN-N01",
    name: "Mycorrhiza Organic Granules Booster",
    category: "Nutrients",
    pricePerAc: 2800,
    crop: "All",
    desc: "Fosters early symbiotic root-fungus colonization to accelerate phosphorus absorption.",
  },
  {
    id: "IN-N02",
    name: "Slow-Release SSP (Super Phosphate)",
    category: "Nutrients",
    pricePerAc: 3100,
    crop: "Tomato",
    desc: "Granular phosphate stage-released over 60 days to prevent leaching waste.",
  },
  {
    id: "IN-P01",
    name: "Bio-Fungicide Trichoderma Viride",
    category: "Protection",
    pricePerAc: 2200,
    crop: "All",
    desc: "Wipes out root rot, damping-off spores, and early blight vectors in root zones.",
  },
  {
    id: "IN-I01",
    name: "Netafim Drip loop pressure emitters",
    category: "Irrigation",
    pricePerAc: 5500,
    crop: "All",
    desc: "Self-cleaning pressure compensating loops for direct-to-root hydration.",
  },
  {
    id: "IN-S02",
    name: "Sakata Chilli Tejaswini Seeds",
    category: "Seeds",
    pricePerAc: 3800,
    crop: "Chilli",
    desc: "High heat index hybrid plugs with built-in viral leaf curl tolerances.",
  },
  {
    id: "IN-N03",
    name: "High-Potassium Soluble Foliar Spray",
    category: "Nutrients",
    pricePerAc: 2400,
    crop: "Chilli",
    desc: "Foliar nutrient supplement boosting vegetable coloring, size uniformities.",
  },
  {
    id: "IN-P02",
    name: "Botanical Leaf Extract Repellent",
    category: "Protection",
    pricePerAc: 1800,
    crop: "All",
    desc: "Repels whiteflies, thrips, and sucking pests without toxic chemical residues.",
  },
];

export const carbonPractices: CarbonPractice[] = [
  {
    id: "drip",
    name: "Drip Irrigation Setup",
    desc: "Reduces pumping energy emissions and water runoff waste.",
    value: 1.5,
  },
  {
    id: "tillage",
    name: "Zero Tillage Method",
    desc: "Preserves soil structure, locking atmospheric carbon in the organic layer.",
    value: 2.0,
  },
  {
    id: "bio",
    name: "Organic Bio-Inputs Dosing",
    desc: "Replaces chemical ammonia synthetic nitrogen emissions.",
    value: 1.8,
  },
  {
    id: "burning",
    name: "Zero Residue Burning",
    desc: "Incorporates organic biomass waste back into the field layer.",
    value: 1.2,
  },
  {
    id: "cover",
    name: "Cover Cropping Cycle",
    desc: "Fixes biological nitrogen and builds organic matter year-round.",
    value: 2.2,
  },
];
