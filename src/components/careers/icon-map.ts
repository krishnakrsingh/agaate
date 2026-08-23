import {
  ChartBar,
  ChatCircleText,
  Compass,
  Drop,
  Handshake,
  Lightning,
  Plant,
  Stack,
  Storefront,
  Tractor,
  Users,
  Warehouse,
  GraduationCap,
  type Icon,
} from "@phosphor-icons/react";
import type { CmsIconKey } from "@/lib/cms-types";

export const CMS_ICON_COMPONENTS: Record<CmsIconKey, Icon> = {
  tractor: Tractor,
  plant: Plant,
  chart: ChartBar,
  handshake: Handshake,
  warehouse: Warehouse,
  drop: Drop,
  cap: GraduationCap,
  users: Users,
  stack: Stack,
  lightning: Lightning,
  storefront: Storefront,
  compass: Compass,
  chat: ChatCircleText,
};

export function getCmsIcon(key: CmsIconKey): Icon {
  return CMS_ICON_COMPONENTS[key] ?? Plant;
}
