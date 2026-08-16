import {
  Coins,
  Cpu,
  GraduationCap,
  Hammer,
  type Icon,
  Leaf,
  Plant,
  ShieldCheck,
  Sliders,
  Storefront,
  Truck,
} from "@phosphor-icons/react";

export type ServiceCategory =
  "all" | "nursery-inputs" | "advisory-tech" | "scale-infra" | "buyback";

export type ServiceItem = {
  id: string;
  icon: Icon;
  title: string;
  category: ServiceCategory;
  desc: string;
  tag: string;
  badgeStat: string;
  badgeLabel: string;
  href: string;
  highlights: string[];
  bgGradient: string;
};

export const SERVICES: ServiceItem[] = [
  {
    id: "nursery",
    icon: Plant,
    title: "17-Acre Smart Nursery",
    category: "nursery-inputs",
    desc: "Containerized, bio-boosted plug saplings raised in AI-monitored climate chambers in Pachgaon/Kukrola. Zero root shock and 90-98% survival.",
    tag: "Nursery",
    badgeStat: "+40%",
    badgeLabel: "Survival vs Direct Sowing",
    href: "/services/nursery",
    highlights: [
      "Sterile Plug Chamber Germination",
      "Biological Root Inoculation (VAM)",
      "Certified Disease-Free Stock",
    ],
    bgGradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
  },
  {
    id: "inputs",
    icon: Storefront,
    title: "Kisaan Mall & Prescribed Inputs",
    category: "nursery-inputs",
    desc: "500+ certified SKUs from 25+ direct manufacturer partners. Stage-matched bio-fertilizers, organic fungicides (Biocure F), and hybrid seeds.",
    tag: "Inputs",
    badgeStat: "500+",
    badgeLabel: "Direct Agri SKUs",
    href: "/services/kisaan-mall",
    highlights: [
      "Direct Manufacturer Pricing",
      "Soil EC/pH Prescribed Dosage",
      "Zero Counterfeit Guarantee",
    ],
    bgGradient: "from-amber-500/10 via-orange-500/5 to-transparent",
  },
  {
    id: "farm-tech",
    icon: Cpu,
    title: "Farm Tech & Precision Agronomy",
    category: "advisory-tech",
    desc: "IoT soil probes, drone scouting, AI disease diagnostics from smartphone photos, and automated fertigation systems.",
    tag: "Tech & AI",
    badgeStat: "Real-Time",
    badgeLabel: "Field Telemetry & Alerts",
    href: "/services/farm-tech",
    highlights: [
      "WhatsApp Crop Advisory",
      "AI Leaf Disease Diagnostics",
      "Solar Telemetric Soil Probes",
    ],
    bgGradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
  },
  {
    id: "carbon",
    icon: Coins,
    title: "Carbon Credits & Soil Health",
    category: "scale-infra",
    desc: "Monetize sustainable farming. Turn reduced tillage, drip efficiency, and residue retention into verified carbon credit payouts.",
    tag: "Sustainability",
    badgeStat: "1 Credit",
    badgeLabel: "Per Tonne CO2 Saved",
    href: "/services/carbon-credits",
    highlights: [
      "Full MRV (Measure/Report/Verify)",
      "No Extra Land Required",
      "Direct Bank Payouts",
    ],
    bgGradient: "from-green-500/10 via-emerald-500/5 to-transparent",
  },
  {
    id: "turnkey",
    icon: Hammer,
    title: "Turnkey Big-Farm Setup",
    category: "scale-infra",
    desc: "Complete commercial establishment from bare land to first harvest. Drip layout, mulching, polyhouse design, SOPs, and labor planning.",
    tag: "Projects",
    badgeStat: "Turnkey",
    badgeLabel: "Land to Harvest Execution",
    href: "/services/big-farm-setup",
    highlights: [
      "15,000+ Acres Managed",
      "Drip & Fertigation Infrastructure",
      "Dedicated On-Site Agronomist",
    ],
    bgGradient: "from-orange-500/10 via-red-500/5 to-transparent",
  },
  {
    id: "buyback",
    icon: Truck,
    title: "Sales & Market Linkage",
    category: "buyback",
    desc: "Direct buyer tie-ups with retail chains and food processors. Guaranteed buyback floor price with zero middleman commissions.",
    tag: "Market Linkage",
    badgeStat: "0%",
    badgeLabel: "Middleman Commission",
    href: "/services/market-linkage",
    highlights: [
      "Guaranteed Floor Pricing",
      "Handpick Buyer Integration",
      "24-48hr Direct Bank Payment",
    ],
    bgGradient: "from-purple-500/10 via-pink-500/5 to-transparent",
  },
];

export const IMPACT_STATS = [
  { to: 15000, suffix: "+", label: "Acres under association" },
  { to: 500, suffix: "+", label: "Acres nursery plants delivered" },
  { to: 10, prefix: "₹", suffix: " Cr+", label: "Managed crop GMV" },
  { to: 25, suffix: "+", label: "Direct manufacturer partners" },
  { to: 20, suffix: "+", label: "Kisan Sathi field agronomists" },
  { to: 500, suffix: "+", label: "Agri-input SKUs in mall" },
  { to: 200, suffix: "+", label: "Drip installations" },
  { to: 2000, suffix: "+", label: "Parivaar registered farmers" },
];

export const CROP_JOURNEY_STAGES = [
  {
    id: 1,
    title: "Seed Selection",
    icon: Plant,
    desc: "Choosing best-in-class hybrid & disease-resistant seed varieties tailored to local soil pH and sowing windows.",
    inputs: "Certified Hybrids, High-Yield Seeds",
    partners: "Leading Seed Partners",
    benefit: "High Genetic Vigor & Resistance",
  },
  {
    id: 2,
    title: "Bio-Boosted Nursery",
    icon: Leaf,
    desc: "Germinating seeds inside 17-acre sterile plug chambers with VAM bio-boosters for dense root ball structure.",
    inputs: "Biocure F, VAM Inoculant, Plug Trays",
    partners: "Agaate Smart Nursery",
    benefit: "90-98% Survival Rate",
  },
  {
    id: 3,
    title: "Land Preparation",
    icon: Hammer,
    desc: "Scientific soil analysis, customized basal dose planning, precision drip line setup, and specialized mulching.",
    inputs: "Soil Test Kit, Drip Tubing, Silver Mulch",
    partners: "IrriTech & Soil Labs",
    benefit: "Optimal Water & Root Aeration",
  },
  {
    id: 4,
    title: "Expert Advisory",
    icon: Cpu,
    desc: "Daily stage-wise guidance via WhatsApp, smartphone AI image diagnostics, and Kisan Sathi field visits.",
    inputs: "Agaate App, Telemetry Probes",
    partners: "Kisan Sathi Agronomy Team",
    benefit: "Early Disease Identification",
  },
  {
    id: 5,
    title: "Smart Fertigation",
    icon: Sliders,
    desc: "Stage-wise plant nutrition formulated strictly based on live soil EC sensors and real-time crop needs.",
    inputs: "Water-Soluble Bio-Formulas",
    partners: "Stanes & Biological Partners",
    benefit: "50-70% Reduced Chemical Runoff",
  },
  {
    id: 6,
    title: "Preventive Protection",
    icon: ShieldCheck,
    desc: "Weather-triggered disease prevention protocols and organic bio-cures before pest outbreaks occur.",
    inputs: "Biocure B, Bio Nimaton, Plantex",
    partners: "Certified Protection Partners",
    benefit: "Zero Crop Damage Spikes",
  },
  {
    id: 7,
    title: "Timely Harvest",
    icon: GraduationCap,
    desc: "Using specialized bamboo staking, ties, and harvest tools to gather market-ready grade-A produce at peak ripeness.",
    inputs: "Bamboo Poles, Netting, Harvest Crates",
    partners: "Agaate Harvest Protocol",
    benefit: "Higher Fruit Uniformity & Grade A %",
  },
  {
    id: 8,
    title: "Market Linkage",
    icon: Truck,
    desc: "Bypassing mandi auctions to sell directly to retail chains with guaranteed buyback contracts and fast payouts.",
    inputs: "Direct Handpick Buyer Connect",
    partners: "Handpick & Supermarket Networks",
    benefit: "Maximized Net Profit & Clean Prices",
  },
];
