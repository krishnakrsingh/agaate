import type { ComponentType } from "react";
import {
  ChatCircleDots,
  Compass,
  Cpu,
  House,
  Info,
  Phone,
  Plant,
  ShieldCheck,
  Stack,
  Storefront,
  Tree,
  TrendUp,
} from "@phosphor-icons/react";

export type NavSubLink = {
  key: string;
  href: string;
  label?: string;
  desc?: string;
  icon?: ComponentType<any>;
};

export type NavItem = {
  key: string;
  href: string;
  icon?: ComponentType<any>;
  subLinks?: NavSubLink[];
};

export const NAV_STRUCTURE: NavItem[] = [
  { key: "home", href: "/", icon: House },
  {
    key: "services",
    href: "/services",
    icon: Stack,
    subLinks: [
      {
        key: "advisory",
        href: "/services#advisory",
        label: "Talk to Agronomist",
        desc: "Direct field diagnosis & stage-wise dosage plans",
        icon: ChatCircleDots,
      },
      {
        key: "kisaanMall",
        href: "/services#kisaan-mall",
        label: "Kisaan Mall",
        desc: "Verified seeds, fertilizers & machinery store",
        icon: Storefront,
      },
      {
        key: "nursery",
        href: "/services#nursery",
        label: "Bio-Boosted Nursery",
        desc: "High-yield saplings & automated plug plants",
        icon: Plant,
      },
      {
        key: "bigFarmSetup",
        href: "/services#big-farm-setup",
        label: "Big Farm Setup",
        desc: "Turnkey orchards, drip & estate layouts",
        icon: ShieldCheck,
      },
      {
        key: "agriPark",
        href: "/agri-park",
        label: "Agri Park",
        desc: "6-acre living proving ground & trial plots",
        icon: Compass,
      },
      {
        key: "farmTech",
        href: "/services#farm-tech",
        label: "Farm Tech",
        desc: "Drones, IoT sensors & AI crop health monitoring",
        icon: Cpu,
      },
      {
        key: "marketLinkage",
        href: "/services#market-linkage",
        label: "Market Linkage",
        desc: "Direct buyer access & guaranteed buyback",
        icon: TrendUp,
      },
      {
        key: "carbonCredits",
        href: "/services#carbon-credits",
        label: "Carbon Credits",
        desc: "Monetize eco-friendly farming practices",
        icon: Tree,
      },
    ],
  },
  { key: "agriPark", href: "/agri-park", icon: Compass },
  { key: "about", href: "/about", icon: Info },
  { key: "contact", href: "/contact", icon: Phone },
];

export const NAV_SUBTITLES: Record<string, string> = {
  home: "Home Overview",
  services: "All 8 Integrated Solutions",
  agriPark: "6-Acre Demo Center",
  about: "Our Mission & Team",
  contact: "Direct Agronomist Line",
};

export const WHATSAPP_CONSULTATION_URL =
  "https://wa.me/918350085005?text=Hello%20Agaate%20Team%2C%20I%20would%20like%20to%20book%20a%20farm%20consultation.";

export const WHATSAPP_AGRONOMIST_URL =
  "https://wa.me/918350085005?text=Hello%20Agaate%20Team%2C%20I%20need%20expert%20agronomy%20advice%20for%20my%20crop.";
