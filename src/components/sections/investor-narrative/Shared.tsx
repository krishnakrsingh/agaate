/**
 * Re-export homepage shared primitives so investor sections use the same
 * Eyebrow / CTA language as Hero + CropWorld chapters.
 */
import type { ReactNode } from "react";
export { Eyebrow, PrimaryCta, SecondaryCta } from "@/components/home/HomeShared";
import { PrimaryCta, SecondaryCta } from "@/components/home/HomeShared";

/** Maps legacy dark/light variants to PrimaryCta / SecondaryCta */
export function InlineCta({
  href,
  children,
  variant = "dark",
}: {
  href: string;
  children: string | ReactNode;
  variant?: "dark" | "light";
}) {
  if (variant === "light") {
    return <SecondaryCta href={href}>{children}</SecondaryCta>;
  }
  return <PrimaryCta href={href}>{children}</PrimaryCta>;
}
