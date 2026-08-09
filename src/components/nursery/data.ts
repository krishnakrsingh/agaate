import {
  type LucideIcon,
  BadgeCheck,
  Bug,
  Cpu,
  FlaskConical,
  Leaf,
  Microscope,
  ShieldCheck,
  Sprout,
  Truck,
} from "lucide-react";

export type CropRec = {
  qty: number;
  cost: number;
  desc: string;
  mortalityTrad: string;
  mortalityAgaate: string;
};

export const MAX_ACRES = 25;

export const RECOMMENDATIONS: Record<string, CropRec> = {
  Tomato: {
    qty: 7000,
    cost: 2.5,
    desc: "Containerized hybrid tomato seedlings with double root density.",
    mortalityTrad: "28% field loss",
    mortalityAgaate: "3.5% field loss",
  },
  Chilli: {
    qty: 9000,
    cost: 1.8,
    desc: "Fungal-resistant organic bio-boosted chilli plugs.",
    mortalityTrad: "35% field loss",
    mortalityAgaate: "4.8% field loss",
  },
  Capsicum: {
    qty: 11000,
    cost: 3.2,
    desc: "Sturdy greenhouse-grade bell pepper seedlings.",
    mortalityTrad: "22% field loss",
    mortalityAgaate: "2.1% field loss",
  },
};

export type Slot = { date: string; status: string; desc: string };

export const SLOTS: Slot[] = [
  { date: "Jul 28, 2026", status: "Available", desc: "Batch BT-2015 hardening complete" },
  { date: "Aug 02, 2026", status: "Available", desc: "Batch BT-1988 hardening complete" },
  { date: "Aug 09, 2026", status: "Few Trays Left", desc: "Mid-August dispatch block" },
  { date: "Aug 16, 2026", status: "Fully Booked", desc: "Late-August dispatch block" },
];

export type Batch = {
  id: string;
  crop: string;
  stage: string;
  temp: string;
  humidity: string;
  progress: number;
  health: string;
  daysLeft: number;
};

export const BATCHES: Batch[] = [
  {
    id: "BT-2041",
    crop: "Tomato (Abhinav)",
    stage: "Radicle Germination",
    temp: "24.2°C",
    humidity: "82%",
    progress: 35,
    health: "Excellent",
    daysLeft: 12,
  },
  {
    id: "BT-1988",
    crop: "Chilli (Tejaswini)",
    stage: "Secondary Leafing",
    temp: "22.8°C",
    humidity: "75%",
    progress: 72,
    health: "Vigorous",
    daysLeft: 5,
  },
  {
    id: "BT-2015",
    crop: "Capsicum (Green Gold)",
    stage: "Hardening Block",
    temp: "21.5°C",
    humidity: "68%",
    progress: 94,
    health: "Hardy (Ready)",
    daysLeft: 1,
  },
];

export type SurvivalMetric = {
  label: string;
  tradLabel: string;
  bioLabel: string;
  tradValue: number;
  bioValue: number;
  tradDisplay: string;
  bioDisplay: string;
  deltaCount: number;
  deltaPrefix: string;
  deltaSuffix: string;
  deltaNote: string;
};

export const SURVIVAL_METRICS: SurvivalMetric[] = [
  {
    label: "Germination & survival rate",
    tradLabel: "Traditional direct sowing",
    bioLabel: "Agaate bio-boosted",
    tradValue: 70,
    bioValue: 98,
    tradDisplay: "50 – 70%",
    bioDisplay: "90 – 98%",
    deltaCount: 40,
    deltaPrefix: "+",
    deltaSuffix: "%",
    deltaNote: "higher base survival vs direct sowing",
  },
  {
    label: "Seed waste reduction",
    tradLabel: "Traditional direct sowing",
    bioLabel: "Agaate bio-boosted",
    tradValue: 100,
    bioValue: 30,
    tradDisplay: "High — baseline",
    bioDisplay: "Near zero",
    deltaCount: 30,
    deltaPrefix: "",
    deltaSuffix: "–50%",
    deltaNote: "less seed wasted per acre",
  },
  {
    label: "Chemical usage reduction",
    tradLabel: "Traditional direct sowing",
    bioLabel: "Agaate bio-boosted",
    tradValue: 100,
    bioValue: 35,
    tradDisplay: "Heavy dependency",
    bioDisplay: "50 – 70% less",
    deltaCount: 50,
    deltaPrefix: "",
    deltaSuffix: "–70%",
    deltaNote: "chemical cut, soil health recovered",
  },
  {
    label: "Overall crop yield",
    tradLabel: "Traditional direct sowing",
    bioLabel: "Agaate bio-boosted",
    tradValue: 45,
    bioValue: 75,
    tradDisplay: "Baseline",
    bioDisplay: "15 – 30% higher",
    deltaCount: 15,
    deltaPrefix: "+",
    deltaSuffix: "–30%",
    deltaNote: "total yield increase",
  },
];

export const NURSERY_INFRA: { icon: LucideIcon; label: string; desc: string }[] = [
  {
    icon: Leaf,
    label: "Seedless Farming",
    desc: "Raised under strictly controlled climate conditions.",
  },
  {
    icon: FlaskConical,
    label: "In-House Production & Trials",
    desc: "Every variety is developed and validated on-site.",
  },
  {
    icon: Cpu,
    label: "AI-Driven Climate Monitoring",
    desc: "Micro-climate tuned continuously by sensor clusters.",
  },
  {
    icon: Bug,
    label: "Integrated Pest & Disease Management",
    desc: "Biology-first protection with targeted intervention.",
  },
  {
    icon: ShieldCheck,
    label: "Standardized Nursery Protocols",
    desc: "Every tray raised under identical documented SOPs.",
  },
  {
    icon: BadgeCheck,
    label: "Quality Testing & Traceability",
    desc: "End-to-end records from seed origin to dispatch.",
  },
];

export type LifecyclePhase = { phase: string; icon: LucideIcon; title: string; desc: string };

export const LIFECYCLE: LifecyclePhase[] = [
  {
    phase: "01",
    icon: Microscope,
    title: "Research & Development",
    desc: "In-house production and trials validate every variety before anything is scaled.",
  },
  {
    phase: "02",
    icon: Sprout,
    title: "Cultivation",
    desc: "Bio-boosted seedlings are raised under AI-driven climate monitoring in the smart nursery.",
  },
  {
    phase: "03",
    icon: BadgeCheck,
    title: "Quality Testing",
    desc: "Standardized nursery protocols gate every batch before it leaves the chamber.",
  },
  {
    phase: "04",
    icon: Truck,
    title: "Distribution",
    desc: "Certified trays ship with end-to-end traceability from seed origin to your field.",
  },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "What bio-inoculants do you treat the seedling plugs with?",
    a: "Every tray is treated with a combination of Trichoderma harzianum and Pseudomonas fluorescens cultures. These beneficial microbes colonize the root surfaces, creating a protective shield against soil pathogens like Pythium and Fusarium.",
  },
  {
    q: "Can I bring my own hybrid seeds for custom raising?",
    a: "Yes. For batches over 25,000 plugs (approx 3.5 acres), we accept clean hybrid seed deposits. Our agronomy team will check seed viability baseline numbers and program a dedicated growth batch for you.",
  },
  {
    q: "How are the seedlings transported to avoid root shock?",
    a: "Plugs are delivered inside structural plastic tray crates loaded into ventilated, shock-absorbing logistics trucks. Deliveries are scheduled for early morning or evening to ensure seedlings do not face temperature stress during transit.",
  },
];

export const MARQUEE_ITEMS = [
  "90 – 98% germination & survival",
  "30 – 50% seed waste cut",
  "50 – 70% less chemical",
  "15 – 30% higher yield",
  "17-acre smart nursery",
  "Bio-boosted containerized plugs",
];
