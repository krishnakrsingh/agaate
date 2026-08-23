import {
  ChatCircleText,
  Compass,
  Lightning,
  Plant,
  Stack,
  Storefront,
  type Icon,
} from "@phosphor-icons/react";
import type { CmsIconKey } from "@/lib/cms-types";
import { getCmsIcon } from "@/components/careers/icon-map";

const EXTRA_ICONS: Record<string, Icon> = {
  stack: Stack,
  lightning: Lightning,
  storefront: Storefront,
  compass: Compass,
  chat: ChatCircleText,
};

export function getContactTopicIcon(key: CmsIconKey): Icon {
  return EXTRA_ICONS[key] ?? getCmsIcon(key) ?? Plant;
}
