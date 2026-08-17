import type { ComponentType } from "react";
import { Compass, House, Info, Phone, Stack } from "@phosphor-icons/react";
import { Cpu, ShieldCheck, Sprout, Store, Trees, TrendingUp } from "lucide-react";

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
        key: "nursery",
        href: "/services#nursery",
        label: "Bio-Boosted Nursery",
        desc: "High-yield saplings & automated plug plants",
        icon: Sprout,
      },
      {
        key: "kisaanMall",
        href: "/services#kisaan-mall",
        label: "Kisaan Mall",
        desc: "Verified seeds, fertilizers & machinery store",
        icon: Store,
      },
      {
        key: "farmTech",
        href: "/services#farm-tech",
        label: "Farm Tech",
        desc: "Drones, IoT sensors & AI crop health monitoring",
        icon: Cpu,
      },
      {
        key: "carbonCredits",
        href: "/services#carbon-credits",
        label: "Carbon Credits",
        desc: "Monetize sustainable farming practices",
        icon: Trees,
      },
      {
        key: "bigFarmSetup",
        href: "/services#big-farm-setup",
        label: "Big-Farm Setup",
        desc: "Turnkey drip, mulch & acreage layout",
        icon: ShieldCheck,
      },
      {
        key: "marketLinkage",
        href: "/services#market-linkage",
        label: "Market Linkage",
        desc: "Direct buyback & transparent price floor",
        icon: TrendingUp,
      },
    ],
  },
  { key: "agriPark", href: "/agri-park", icon: Compass },
  { key: "about", href: "/about", icon: Info },
  { key: "contact", href: "/contact", icon: Phone },
];

export const NAV_SUBTITLES: Record<string, string> = {
  home: "Home Overview",
  services: "All 6 Integrated Solutions",
  agriPark: "17-Acre Demo Center",
  about: "Our Mission & Team",
  contact: "Direct Agronomist Line",
};

export const WHATSAPP_CONSULTATION_URL =
  "https://wa.me/918350085005?text=Hello%20Agaate%20Team%2C%20I%20would%20like%20to%20book%20a%20farm%20consultation.";

export const WHATSAPP_AGRONOMIST_URL =
  "https://wa.me/918350085005?text=Hello%20Agaate%20Team%2C%20I%20need%20expert%20agronomy%20advice%20for%20my%20crop.";
