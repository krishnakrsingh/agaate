import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18n";

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
  const { locale } = useParams({ strict: false }) as any;
  const { i18n } = useTranslation();
  const currentLang = locale ?? i18n.language ?? "en";

  const className =
    variant === "dark"
      ? "bg-forest-deep text-cream hover:bg-forest"
      : "border border-forest/25 text-forest-deep hover:border-forest hover:bg-forest/5";

  const isAnchor = href.startsWith("#") || href.startsWith("http");

  if (isAnchor) {
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

  return (
    <Link
      to={getLocalizedPath(href, currentLang) as any}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
