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

export const NAV_SUBTITLES: Record<string, string> = {
  home: "Home Overview",
  services: "All 8 Integrated Solutions",
  kisaanMall: "Verified Agri Inputs Store",
  agriPark: "6-Acre Demo Center",
  about: "Our Mission & Team",
  contact: "Direct Agronomist Line",
};
