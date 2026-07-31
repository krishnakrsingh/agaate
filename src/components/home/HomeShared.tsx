import type { ReactNode } from "react";
import { ArrowRight, Image } from "lucide-react";
import { Link, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18n";

export function Eyebrow({
  children,
  inverse = false,
  hairline = true,
}: {
  children: ReactNode;
  inverse?: boolean;
  hairline?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      {hairline && (
        <span
          className={`w-6 h-px shrink-0 ${inverse ? "bg-cream/30" : "bg-forest/30"}`}
          aria-hidden
        />
      )}
      <span
        className={`font-jet text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] ${
          inverse ? "text-moss" : "text-forest"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

function resolveHref(
  href: string,
  currentLang: string,
): { isAnchor: boolean; to: string } {
  const isAnchor = href.startsWith("#") || href.startsWith("http");
  return {
    isAnchor,
    to: isAnchor ? href : getLocalizedPath(href, currentLang),
  };
}

export function PrimaryCta({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const { locale } = useParams({ strict: false }) as { locale?: string };
  const { i18n } = useTranslation();
  const currentLang = locale ?? i18n.language ?? "en";
  const { isAnchor, to } = resolveHref(href, currentLang);

  const classes = `group inline-flex items-center gap-2 rounded-full bg-[#a3e635] px-5 py-2.5 text-[13.5px] font-semibold tracking-[-0.01em] text-[#0f2d25] transition-all duration-300 hover:opacity-90 hover:-translate-y-px active:scale-[0.98] ${className}`;

  if (isAnchor) {
    return (
      <a href={to} className={classes}>
        {children}
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </a>
    );
  }

  return (
    <Link to={to as any} className={classes}>
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  );
}

export function SecondaryCta({
  href,
  children,
  inverse = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  inverse?: boolean;
  className?: string;
}) {
  const { locale } = useParams({ strict: false }) as { locale?: string };
  const { i18n } = useTranslation();
  const currentLang = locale ?? i18n.language ?? "en";
  const { isAnchor, to } = resolveHref(href, currentLang);

  const classes = `group inline-flex items-center gap-2 px-2 py-2 text-[13.5px] font-normal tracking-[-0.005em] transition-colors duration-200 ${
    inverse
      ? "text-cream/80 hover:text-cream"
      : "text-forest-deep/70 hover:text-forest-deep"
  } ${className}`;

  if (isAnchor) {
    return (
      <a href={to} className={classes}>
        {children}
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </a>
    );
  }

  return (
    <Link to={to as any} className={classes}>
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  );
}

/** @deprecated Prefer PrimaryCta / SecondaryCta — kept as SecondaryCta alias for gradual migration */
export function TextAction({
  href,
  children,
  inverse = false,
}: {
  href: string;
  children: ReactNode;
  inverse?: boolean;
}) {
  return (
    <SecondaryCta href={href} inverse={inverse}>
      {children}
    </SecondaryCta>
  );
}

export function MediaFrame({
  label,
  detail,
  className = "",
}: {
  label: string;
  detail: string;
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-64 items-end bg-bone p-6 md:p-8 ${className}`}
    >
      <div>
        <Image className="h-5 w-5 text-forest" strokeWidth={1.5} />
        <p className="mt-5 font-jet text-[10px] font-bold uppercase tracking-[0.1em] text-forest">
          {label}
        </p>
        <p className="mt-2 max-w-xs text-sm leading-6 text-ink/60">{detail}</p>
      </div>
    </div>
  );
}

/** @deprecated Use MediaFrame */
export const ImagePlaceholder = MediaFrame;
