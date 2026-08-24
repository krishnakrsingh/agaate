import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CtaProps {
  ctaEnabled?: boolean;
  text: string;
  link?: string;
  variant?: ButtonProps["variant"];
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  external?: boolean;
}

export function Cta({ cta, className }: { cta: CtaProps; className?: string }) {
  if (!cta || cta.ctaEnabled === false) return null;

  if (cta.link) {
    const isExternal =
      cta.external ||
      cta.link.startsWith("http") ||
      cta.link.startsWith("tel:") ||
      cta.link.startsWith("mailto:");
    return (
      <Button asChild variant={cta.variant || "default"} className={cn(cta.className, className)}>
        <a
          href={cta.link}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-2"
        >
          <span>{cta.text}</span>
          {cta.icon}
        </a>
      </Button>
    );
  }

  return (
    <Button
      variant={cta.variant || "default"}
      onClick={cta.onClick}
      className={cn(cta.className, className)}
    >
      <span>{cta.text}</span>
      {cta.icon}
    </Button>
  );
}
