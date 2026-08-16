import { Cpu, Sparkle, Thermometer, Truck, type Icon } from "@phosphor-icons/react";

export type CropOption = "Watermelon" | "Chilli" | "Tomato" | "Cauliflower" | "Cucumber";

export type CropDetail = {
  plugsPerAcre: number;
  pricePerPlug: number;
  description: string;
  season: string;
  germinationDays: number;
  survivalRate: string;
};

export const CROP_DATA: Record<CropOption, CropDetail> = {
  Watermelon: {
    plugsPerAcre: 3500,
    pricePerPlug: 4.5,
    description:
      "Vigorously grafted hybrid watermelon plugs with deep root penetration and high sugar content development.",
    season: "Jan - Mar (Spring Sowing)",
    germinationDays: 14,
    survivalRate: "96%",
  },
  Chilli: {
    plugsPerAcre: 12000,
    pricePerPlug: 2.2,
    description:
      "Pungent & export-grade chilli saplings fortified with Biocure F to resist leaf curl virus and damping off.",
    season: "Feb - Jun & Oct - Nov",
    germinationDays: 18,
    survivalRate: "94%",
  },
  Tomato: {
    plugsPerAcre: 10000,
    pricePerPlug: 2.5,
    description:
      "Determinate and indeterminate high-yield hybrids with sturdy stems for vertical bamboo staking.",
    season: "Year-Round Cycles",
    germinationDays: 15,
    survivalRate: "98%",
  },
  Cauliflower: {
    plugsPerAcre: 14000,
    pricePerPlug: 1.8,
    description:
      "Compact curd varieties conditioned for uniform head development and thermal stress tolerance.",
    season: "Jul - Nov (Autum/Winter)",
    germinationDays: 12,
    survivalRate: "95%",
  },
  Cucumber: {
    plugsPerAcre: 7000,
    pricePerPlug: 3.2,
    description:
      "Parthenocarpic polyhouse cucumber seedlings producing early crisp fruit without pollinator reliance.",
    season: "Year-Round Polyhouse",
    germinationDays: 10,
    survivalRate: "97%",
  },
};

export type BatchInfo = {
  id: string;
  crop: string;
  variety: string;
  origin: string;
  germinationDate: string;
  bioBoostLog: string;
  chamberTemp: string;
  humidity: string;
  rootScore: string;
  status: string;
  dispatchWindow: string;
};

export const MOCK_BATCHES: Record<string, BatchInfo> = {
  "AG-2026-N8": {
    id: "AG-2026-N8",
    crop: "Tomato Hybrid",
    variety: "Syngenta Abhinav F1",
    origin: "Certified Seed Lot #9921",
    germinationDate: "2026-08-01",
    bioBoostLog: "VAM Inoculated + Biocure F Applied",
    chamberTemp: "26.4 °C",
    humidity: "82% Ambient",
    rootScore: "9.8 / 10 (High Vigor)",
    status: "Hardening Phase (Ready in 3 days)",
    dispatchWindow: "Aug 12 - Aug 15",
  },
  "AG-2026-W4": {
    id: "AG-2026-W4",
    crop: "Watermelon Hybrid",
    variety: "Maxx Seed Black Boy",
    origin: "Imported Certified Lot #8810",
    germinationDate: "2026-07-28",
    bioBoostLog: "Trichoderma + Mycorrhiza Inoculated",
    chamberTemp: "28.1 °C",
    humidity: "78% Ambient",
    rootScore: "9.6 / 10 (Dense Taproot)",
    status: "Quality Certified (Ready for Dispatch)",
    dispatchWindow: "Immediate Dispatch Available",
  },
  "AG-2026-C2": {
    id: "AG-2026-C2",
    crop: "Chilli Pungent",
    variety: "Seminis VN-235",
    origin: "Certified Seed Lot #4412",
    germinationDate: "2026-08-04",
    bioBoostLog: "Biocure B + Bio Nimaton Protection",
    chamberTemp: "25.8 °C",
    humidity: "85% Ambient",
    rootScore: "9.2 / 10 (Emerging Primary Roots)",
    status: "Chamber Growth Stage (7 Days Left)",
    dispatchWindow: "Aug 18 - Aug 20",
  },
  "AG-2026-T1": {
    id: "AG-2026-T1",
    crop: "Cauliflower Snowball",
    variety: "Advanta Golden Curl",
    origin: "Certified Seed Lot #1032",
    germinationDate: "2026-08-02",
    bioBoostLog: "VAM Inoculated",
    chamberTemp: "24.9 °C",
    humidity: "80% Ambient",
    rootScore: "9.5 / 10 (Strong Plug)",
    status: "Hardening Phase",
    dispatchWindow: "Aug 14 - Aug 16",
  },
};

export interface ProductionPhase {
  phase: string;
  title: string;
  desc: string;
  icon: Icon;
  details: string[];
}

export const PHASES: ProductionPhase[] = [
  {
    phase: "01",
    title: "Research & Varietal Trials",
    desc: "Rigorous testing of hybrid seeds against local Haryana microclimates, soil pH, and common disease vectors before mass propagation.",
    icon: Sparkle,
    details: [
      "In-house demo plots in Pachgaon",
      "Genetic purity verification",
      "Heat & drought resistance screening",
    ],
  },
  {
    phase: "02",
    title: "Climate-Controlled Cultivation",
    desc: "Sowing in sterile coco-peat plug trays inside 17 acres of AI-monitored climate chambers for uniform emergence.",
    icon: Thermometer,
    details: [
      "Automated fogging & misting",
      "Optimum 25-28°C chamber control",
      "Zero soil-borne contamination",
    ],
  },
  {
    phase: "03",
    title: "Bio-Boost Inoculation & AI Testing",
    desc: "Treating root systems with beneficial biologicals (Biocure F & VAM) to ensure zero root shock upon field transplanting.",
    icon: Cpu,
    details: [
      "Dense mycorrhizal root colonization",
      "Optical sensor root grading",
      "Certified disease-free tag",
    ],
  },
  {
    phase: "04",
    title: "Hardening & Temperature Logistics",
    desc: "Controlled sun exposure hardening before loading into temperature-shielded transport directly to farm gate.",
    icon: Truck,
    details: ["UV hardening protocol", "Doorstep field delivery", "Transplant SOP guide provided"],
  },
];

export const FAQS = [
  {
    q: "Why are containerized plug seedlings better than direct field sowing?",
    a: "Direct seed sowing suffers 30-50% mortality from soil heat, heavy rain, and fungal damping-off. Agaate containerized plug seedlings are germinated in a sterile 17-acre climate facility with established root systems, giving 90-98% field survival and saving seed costs.",
  },
  {
    q: "Where is the Agaate Smart Nursery facility located?",
    a: "Our flagship 17-acre smart nursery is located at NH8, opposite Bikanervala, Kukrola / Pachgaon, Gurugram, Haryana (Plus Code: 8WG2+QR6). Farmers are welcome to visit our live demo plots.",
  },
  {
    q: "How far in advance should I pre-order seedling trays?",
    a: "We recommend pre-ordering 15 to 25 days before your intended field planting date. This allows us to germinate your requested hybrid variety and bio-boost the root systems specifically for your delivery date.",
  },
  {
    q: "What happens if saplings get damaged during transit?",
    a: "Agaate provides a 100% Transit Guarantee. If any plug tray suffers damage during doorstep delivery, our local Kisan Sathi representative provides immediate free replacement trays.",
  },
];
