import { Buildings, Medal, Scales, type Icon } from "@phosphor-icons/react";

export type CommodityItem = {
  crop: string;
  mandiPrice: number; // ₹ per kg
  agaateFloorPrice: number; // ₹ per kg
  retailPrice: number; // ₹ per kg
  gainPct: string;
  gradeAStd: string;
};

export const COMMODITIES: CommodityItem[] = [
  {
    crop: "Tomato (Hybrid F1)",
    mandiPrice: 14,
    agaateFloorPrice: 19,
    retailPrice: 28,
    gainPct: "+35.7%",
    gradeAStd: "Firm red skin, 55-65mm diameter, zero physical blemishes",
  },
  {
    crop: "Watermelon (Black Boy)",
    mandiPrice: 9,
    agaateFloorPrice: 13,
    retailPrice: 20,
    gainPct: "+44.4%",
    gradeAStd: "TSS > 11.5° Brix sweetness, deep red flesh, 3-5kg size",
  },
  {
    crop: "Chilli (Green Pungent)",
    mandiPrice: 32,
    agaateFloorPrice: 42,
    retailPrice: 65,
    gainPct: "+31.2%",
    gradeAStd: "8-10cm length, uniform deep green, crisp firm skin",
  },
  {
    crop: "Cauliflower (Snowball)",
    mandiPrice: 16,
    agaateFloorPrice: 22,
    retailPrice: 35,
    gainPct: "+37.5%",
    gradeAStd: "Pure white compact curd, 800g-1.2kg weight, zero yellowing",
  },
  {
    crop: "Cucumber (Polyhouse)",
    mandiPrice: 12,
    agaateFloorPrice: 17,
    retailPrice: 26,
    gainPct: "+41.6%",
    gradeAStd: "Straight cylindrical shape, uniform dark green, seedless core",
  },
];

export interface GradingStep {
  grade: string;
  badge: string;
  priceMultiplier: string;
  desc: string;
  icon: Icon;
}

export const GRADING_STEPS: GradingStep[] = [
  {
    grade: "Grade A",
    badge: "Premium Export / Supermarket",
    priceMultiplier: "100% Top Buyback Floor Price",
    desc: "Blemish-free, uniform sizing, peak ripeness. Directly packed for quick-commerce apps (Blinkit/Zepto) and supermarket chains.",
    icon: Medal,
  },
  {
    grade: "Grade B",
    badge: "Regional Retail & Mandi Premium",
    priceMultiplier: "85% Floor Price",
    desc: "Slight size variation but excellent nutritional quality. Supplied to regional retail hubs and hotel chains.",
    icon: Buildings,
  },
  {
    grade: "Grade C",
    badge: "Processing & Food Industry",
    priceMultiplier: "70% Industrial Price",
    desc: "Cosmetically imperfect crops purchased by puree, sauce, and food processing partners so zero harvest goes to waste.",
    icon: Scales,
  },
];
