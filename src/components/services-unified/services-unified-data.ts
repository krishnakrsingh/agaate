import {
  Coins,
  Cpu,
  Hammer,
  type Icon,
  Plant,
  ShieldCheck,
  Storefront,
  TrendUp,
} from "@phosphor-icons/react";

export interface UnifiedSectionNav {
  id: string;
  num: string;
  key: string;
  name: string;
  shortName: string;
  tagline: string;
  icon: Icon;
  image: string;
  badge: string;
  statNumber: string;
  statLabel: string;
}

export const UNIFIED_SERVICES_NAV: UnifiedSectionNav[] = [
  {
    id: "nursery",
    num: "01",
    key: "nursery",
    name: "Bio-Boosted Nursery",
    shortName: "Bio Nursery",
    tagline: "Pathogen-free, climate-controlled plug nurseries with 98% survival guarantee.",
    icon: Plant,
    image: "/nursery.png",
    badge: "17-Acre Facility",
    statNumber: "98%",
    statLabel: "Survival Rate",
  },
  {
    id: "kisaan-mall",
    num: "02",
    key: "kisaanMall",
    name: "Agaate Kisaan Mall",
    shortName: "Kisaan Mall",
    tagline: "500+ verified manufacturer-direct inputs, seeds, biologicals & drip equipment.",
    icon: Storefront,
    image: "/kisaan-mall-gen.png",
    badge: "Zero Counterfeits",
    statNumber: "500+",
    statLabel: "Agri SKUs",
  },
  {
    id: "farm-tech",
    num: "03",
    key: "farmTech",
    name: "Farm Tech & IoT",
    shortName: "Farm Tech",
    tagline: "Solar IoT soil probes, drone multispectral scans & 15-min AI leaf diagnostics.",
    icon: Cpu,
    image: "/farm.png",
    badge: "Live Telemetry",
    statNumber: "< 15 Min",
    statLabel: "Advisory SLA",
  },
  {
    id: "carbon-credits",
    num: "04",
    key: "carbonCredits",
    name: "Carbon Credits & MRV",
    shortName: "Carbon Credits",
    tagline: "Monetize reduced tillage and residue retention at ₹1,200 per verified tonne.",
    icon: Coins,
    image: "/carbon credits.png",
    badge: "Satellite MRV",
    statNumber: "₹1,200",
    statLabel: "Per tCO₂e",
  },
  {
    id: "big-farm-setup",
    num: "05",
    key: "bigFarmSetup",
    name: "Big Farm Turnkey Setup",
    shortName: "Big Farm Setup",
    tagline: "Turnkey hydraulic drip, polyhouse, mulching & SOP execution for 10-500+ acres.",
    icon: Hammer,
    image: "/agro-park.jpg",
    badge: "15,000+ Acres",
    statNumber: "100%",
    statLabel: "Turnkey Handover",
  },
  {
    id: "market-linkage",
    num: "06",
    key: "marketLinkage",
    name: "Market Linkage & Buyback",
    shortName: "Market Linkage",
    tagline: "Direct retail & processor contracts with guaranteed floor prices and 0% mandi cuts.",
    icon: TrendUp,
    image: "/about-farmer-advisor.png",
    badge: "Direct Buyback",
    statNumber: "0%",
    statLabel: "Mandi Deductions",
  },
];

export const MASTER_IMPACT_METRICS = [
  { value: 15000, suffix: "+", label: "Acres Associated", sub: "Under scientific cultivation" },
  { value: 98, suffix: "%", label: "Plug Survival Rate", sub: "Bio-boosted sterile root plugs" },
  { value: 500, suffix: "+", label: "Direct SKUs in Mall", sub: "Certified manufacturer pricing" },
  { value: 0, suffix: "%", label: "Middleman Cut", sub: "Direct farm-gate buyback" },
];
