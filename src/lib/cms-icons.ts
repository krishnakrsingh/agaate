import {
  Tractor,
  PottedPlant,
  ChartLineUp,
  Handshake,
  Warehouse,
  Drop,
  GraduationCap,
  UsersThree,
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
];
