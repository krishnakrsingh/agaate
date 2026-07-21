import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

export function Eyebrow({ children }: { children: string | ReactNode }) {
  return (
    <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest font-semibold">
      {children}
    </span>
  );
}

export function InlineCta({
  href,
  children,
  variant = "dark",
}: {
  href: string;
  children: string | ReactNode;
  variant?: "dark" | "light";
}) {
  const className =
    variant === "dark"
      ? "bg-forest-deep text-cream hover:bg-forest"
      : "border border-forest/25 text-forest-deep hover:border-forest hover:bg-forest/5";

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}
