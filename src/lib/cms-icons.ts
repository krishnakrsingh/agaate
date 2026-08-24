import {
  Tractor,
  PottedPlant,
  ChartLineUp,
  Handshake,
  Warehouse,
  Drop,
  GraduationCap,
  UsersThree,
  Stack,
  Lightning,
  Storefront,
  Compass,
  ChatCircleText,
  type Icon,
} from "@phosphor-icons/react";
import type { CmsIconKey } from "@/lib/cms-types";

export const CMS_ICON_MAP: Record<CmsIconKey, Icon> = {
  tractor: Tractor,
  plant: PottedPlant,
  chart: ChartLineUp,
  handshake: Handshake,
  warehouse: Warehouse,
  drop: Drop,
  cap: GraduationCap,
  users: UsersThree,
  stack: Stack,
  lightning: Lightning,
  storefront: Storefront,
  compass: Compass,
  chat: ChatCircleText,
};

export const CMS_ICON_OPTIONS: { value: CmsIconKey; label: string }[] = [
  { value: "tractor", label: "Tractor" },
  { value: "plant", label: "Plant" },
  { value: "chart", label: "Chart" },
  { value: "handshake", label: "Handshake" },
  { value: "warehouse", label: "Warehouse" },
  { value: "drop", label: "Water drop" },
  { value: "cap", label: "Graduation cap" },
  { value: "users", label: "Users" },
  { value: "stack", label: "Stack" },
  { value: "lightning", label: "Lightning" },
  { value: "storefront", label: "Storefront" },
  { value: "compass", label: "Compass" },
  { value: "chat", label: "Chat" },
];
