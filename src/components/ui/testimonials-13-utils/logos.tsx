import {
  Buildings,
  CloudRain,
  Plant,
  Sun,
  Tractor
} from "@phosphor-icons/react";
import { ComponentProps } from "react";

export const Logo01 = (props: ComponentProps<"svg">) => <Buildings {...props} />;
export const Logo02 = (props: ComponentProps<"svg">) => <Plant {...props} />;
export const Logo03 = (props: ComponentProps<"svg">) => <Plant {...props} />;
export const Logo04 = (props: ComponentProps<"svg">) => <Tractor {...props} />;
export const Logo05 = (props: ComponentProps<"svg">) => <Sun {...props} />;
export const Logo06 = (props: ComponentProps<"svg">) => <CloudRain {...props} />;
