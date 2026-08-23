import { getCmsIcon } from "@/components/careers/icon-map";
import type { CmsIconKey } from "@/lib/cms-types";
import type { Icon } from "@phosphor-icons/react";
import { Plant } from "@phosphor-icons/react";

export function getMallIcon(key: CmsIconKey): Icon {
  return getCmsIcon(key) ?? Plant;
}
