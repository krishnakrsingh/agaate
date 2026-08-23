import type { ComponentType } from "react";
import {
  ChatCircleDots,
  Compass,
  DeviceMobile,
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

export const WHATSAPP_CONSULTATION_URL =
  "https://wa.me/918350085005?text=Hello%20Agaate%20Team%2C%20I%20would%20like%20to%20book%20a%20farm%20consultation.";

export const WHATSAPP_AGRONOMIST_URL =
  "https://wa.me/918350085005?text=Hello%20Agaate%20Team%2C%20I%20need%20expert%20agronomy%20advice%20for%20my%20crop.";

export const WHATSAPP_BIG_FARM_SETUP_URL =
  "https://wa.me/918350085005?text=Hello%20Agaate%20Team%2C%20I%20want%20to%20inquire%20about%20Big%20Farm%20Setup%20services.";

export const WHATSAPP_CARBON_CREDITS_URL =
  "https://wa.me/918350085005?text=Hello%20Agaate%20Team%2C%20I%20want%20to%20know%20more%20about%20the%20Carbon%20Credits%20program.";

export type NavSubLink = {
  key: string;
  href: string;
  hash?: string;
  external?: boolean;
  label?: string;
  desc?: string;
  icon?: ComponentType<any>;
};

export type NavItem = {
  key: string;
  href: string;
  hash?: string;
  icon?: ComponentType<any>;
  subLinks?: NavSubLink[];
};

export const NAV_STRUCTURE: NavItem[] = [
  { key: "home", href: "/", hash: "hero", icon: House },
  {
    key: "services",
    href: "/",
    icon: Stack,
    subLinks: [
      {
        key: "advisory",
        href: WHATSAPP_AGRONOMIST_URL,
        external: true,
        label: "Talk to Agronomist",
        desc: "Direct field diagnosis, spray charts & farm visits",
        icon: ChatCircleDots,
      },
      {
        key: "kisaanMall",
        href: "/kisaan-mall",
        label: "Kisaan Mall",
        desc: "Direct-from-brand seeds, fertilizers & inputs",
        icon: Storefront,
      },
      {
        key: "nursery",
        href: "/",
        hash: "pillar-nursery",
        label: "Bio-Boosted Nursery",
        desc: "98% survival high-yield plug seedlings & saplings",
        icon: Plant,
      },
      {
        key: "bigFarmSetup",
        href: WHATSAPP_BIG_FARM_SETUP_URL,
        external: true,
        label: "Big Farm Setup",
        desc: "End-to-end turnkey farm setup for clients",
        icon: ShieldCheck,
      },
      {
        key: "agriPark",
        href: "/",
        hash: "agri-park",
        label: "Agri Park",
        desc: "Live crop demonstration, R&D & farmer trials",
        icon: Compass,
      },
      {
        key: "farmTech",
        href: "/",
        hash: "agaate-app",
        label: "Agaate Mobile App",
        desc: "Digital farm diary, crop scheduling & advisories",
        icon: DeviceMobile,
      },
      {
        key: "marketLinkage",
        href: "/",
        hash: "pillar-market",
        label: "Market Linkage",
        desc: "Direct retail buyers & guaranteed buyback",
        icon: TrendUp,
      },
      {
        key: "carbonCredits",
        href: WHATSAPP_CARBON_CREDITS_URL,
        external: true,
        label: "Carbon Credits",
        desc: "Earn extra income from sustainable farming",
        icon: Tree,
      },
    ],
  },
  { key: "kisaanMall", href: "/kisaan-mall", icon: Storefront },
  { key: "about", href: "/about", icon: Info },
  { key: "contact", href: "/contact", icon: Phone },
];

export const NAV_SUBTITLES: Record<string, string> = {
  home: "Home Overview",
  services: "All 8 Integrated Solutions",
  kisaanMall: "Verified Agri Inputs Store",
  agriPark: "6-Acre Demo Center",
  about: "Our Mission & Team",
  contact: "Direct Agronomist Line",
};
