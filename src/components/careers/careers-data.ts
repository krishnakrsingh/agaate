import {
  Database,
  DeviceMobile,
  Handshake,
  Leaf,
  Microscope,
  PencilLine,
  Plant,
  type Icon,
} from "@phosphor-icons/react";

export type Filter = "All" | "Agronomy" | "Corporate" | "Retail";
export const FILTERS: { key: Filter; label: string }[] = [
  { key: "All", label: "All Open Roles" },
  { key: "Agronomy", label: "Field Agronomy" },
  { key: "Corporate", label: "Operations & Tech" },
  { key: "Retail", label: "Retail & Commerce" },
];

export interface CultureCard {
  title: string;
  desc: string;
  icon: Icon;
  tag: string;
}

export const CULTURE_CARDS: CultureCard[] = [
  {
    tag: "Field First",
    title: "On-Field Groundwork",
    desc: "We work directly in the soil alongside growers — testing precision irrigation, proving seed genetics, and troubleshooting pest outbreaks on live farms.",
    icon: Plant,
  },
  {
    tag: "Evidence Based",
    title: "Scientific Rigour",
    desc: "Every recommendation is grounded in rigorous soil assays, multispectral canopy analysis, and proven trial plots rather than guesswork.",
    icon: Microscope,
  },
  {
    tag: "Partnership",
    title: "Farmer-Centric Ownership",
    desc: "We treat growers as long-term operational partners, backing our advisory with 100% genuine inputs, honest pricing, and buyback security.",
    icon: Handshake,
  },
];

export const CAMPUS_SKILLS = [
  { icon: Leaf, label: "Field Advisory & Diagnosis" },
  { icon: DeviceMobile, label: "Smart Farm Telemetry" },
  { icon: Database, label: "Soil & Crop Analytics" },
  { icon: PencilLine, label: "Technical Farmer Content" },
];

export const CAREER_STATS = [
  { value: 20, suffix: "+", label: "Field Agronomists", sub: "Dedicated on-ground specialists" },
  { value: 15000, suffix: "+", label: "Acres Monitored", sub: "High-yield commercial clusters" },
  { value: 85, suffix: " Lakh+", label: "Bio-Plugs Delivered", sub: "Engineered high-vigour seedlings" },
  { value: 2000, suffix: "+", label: "Farmers Advised", sub: "Active progressive grower network" },
];
