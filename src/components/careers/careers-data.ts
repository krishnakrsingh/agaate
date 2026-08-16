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
export const FILTERS: Filter[] = ["All", "Agronomy", "Corporate", "Retail"];

export interface CultureCard {
  title: string;
  desc: string;
  icon: Icon;
}

export const CULTURE_CARDS: CultureCard[] = [
  {
    title: "On-Field Groundwork",
    desc: "We don't work in high-rise bubble offices. Our engineers spend time testing hardware setups and training growers directly in Haryana fields.",
    icon: Plant,
  },
  {
    title: "Scientific Rigour",
    desc: "Every intervention is backed by lab soil core assays, satellite analytics, and telemetry logs. We build evidence-based agriculture.",
    icon: Microscope,
  },
  {
    title: "Ecosystem Ownership",
    desc: "Growers trust us. We honor price floors and guarantee container seed delivery cycles, treating farmers as operational partners.",
    icon: Handshake,
  },
];

export const CAMPUS_SKILLS = [
  { icon: Leaf, label: "Field advisory" },
  { icon: DeviceMobile, label: "Digital farm tools" },
  { icon: Database, label: "Data collection" },
  { icon: PencilLine, label: "Technical content" },
];

export const CAREER_STATS = [
  { value: 20, suffix: "+", label: "Kisan Sathi team", sub: "Advisors on the ground" },
  { value: 2000, suffix: "+", label: "Farmers served", sub: "Across the Parivaar" },
  { value: 25, suffix: "+", label: "Agri partners", sub: "Direct manufacturer supply" },
  { value: 15000, suffix: "+", label: "Acres associated", sub: "Land under cultivation" },
];
