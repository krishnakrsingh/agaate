import React from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { getLocalizedPath } from "@/lib/i18n";

export type SlideUpPillButtonVariant =
  | "dark"
  | "black"
  | "accent"
  | "lime"
  | "outline"
  | "light"
  | "hero-primary"
  | "hero-secondary"
  | "white";

export type SlideUpPillButtonSize = "sm" | "md" | "lg" | "hero" | "auto";

export interface SlideUpPillButtonProps {
  label?: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  variant?: SlideUpPillButtonVariant;
  size?: SlideUpPillButtonSize;
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  fillClassName?: string;
  contentClassName?: string;
  fullWidth?: boolean;
  ariaLabel?: string;
  uppercase?: boolean;
}

const variantStyles: Record<
  SlideUpPillButtonVariant,
  {
    container: string;
    fill: string;
    content: string;
  }
> = {
  dark: {
    container:
      "bg-[#143d31] border border-white/20 hover:border-transparent hover:shadow-[0_0_20px_rgba(163,230,53,0.35)]",
    fill: "bg-[#a3e635]",
    content: "text-white group-hover:text-[#143d31]",
  },
  black: {
    container:
      "bg-black border border-white/20 hover:border-transparent hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]",
    fill: "bg-white",
    content: "text-white group-hover:text-black",
  },
  accent: {
    container:
      "bg-[#a3e635] border border-[#143d31]/20 hover:border-transparent hover:shadow-[0_0_20px_rgba(20,61,49,0.35)]",
    fill: "bg-[#143d31]",
    content: "text-[#143d31] group-hover:text-white",
  },
  lime: {
    container:
      "bg-[#a3e635] border border-[#143d31]/20 hover:border-transparent hover:shadow-[0_0_20px_rgba(20,61,49,0.35)]",
    fill: "bg-[#143d31]",
    content: "text-[#143d31] group-hover:text-white",
  },
  outline: {
    container:
      "bg-white/80 border border-[#143d31]/20 hover:border-transparent hover:shadow-[0_0_20px_rgba(20,61,49,0.2)]",
    fill: "bg-[#143d31]",
    content: "text-[#143d31] group-hover:text-white",
  },
  light: {
    container:
      "bg-[#f4f8f5] border border-[#143d31]/20 hover:border-transparent hover:shadow-[0_0_20px_rgba(20,61,49,0.2)]",
    fill: "bg-[#143d31]",
    content: "text-[#143d31] group-hover:text-white",
  },
  "hero-primary": {
    container:
      "bg-[#a3e635] border border-transparent shadow-none hover:shadow-none",
    fill: "bg-[#143d31]",
    content: "text-[#0f2d25] group-hover:text-white",
  },
  "hero-secondary": {
    container:
      "bg-white/10 backdrop-blur-md border border-white/25 hover:border-transparent hover:shadow-[0_0_20px_rgba(255,255,255,0.35)]",
    fill: "bg-white",
    content: "text-white group-hover:text-black",
  },
  white: {
    container:
      "bg-white border border-[#143d31]/15 hover:border-transparent hover:shadow-[0_0_20px_rgba(20,61,49,0.25)]",
    fill: "bg-[#143d31]",
    content: "text-[#143d31] group-hover:text-white",
  },
};

const sizeStyles: Record<SlideUpPillButtonSize, string> = {
  sm: "h-9 sm:h-10 px-4 text-xs font-semibold",
  md: "h-11 sm:h-12 px-5 sm:px-6 text-xs sm:text-sm font-semibold",
  lg: "h-14 px-7 min-w-[140px] text-sm font-semibold",
  hero: "h-10 sm:h-11 md:h-12 px-4 sm:px-5 md:px-6 text-xs sm:text-sm font-semibold",
  auto: "py-3 px-5 text-xs sm:text-sm font-semibold",
};

export const SlideUpPillButton = React.forwardRef<HTMLElement, SlideUpPillButtonProps>(
  (
    {
      label,
      children,
      icon,
      iconPosition = "right",
      variant = "dark",
      size = "md",
      href,
      to,
      target,
      rel,
      onClick,
      type = "button",
      disabled = false,
      className,
      fillClassName,
      contentClassName,
      fullWidth = false,
      ariaLabel,
      uppercase = false,
    },
    ref
  ) => {
    const selectedVariant = variantStyles[variant] || variantStyles.dark;
    const selectedSize = sizeStyles[size] || sizeStyles.md;

    const baseContainerStyles = cn(
      "group relative inline-flex items-center justify-center rounded-full overflow-hidden transition-all duration-300 cursor-pointer select-none",
      selectedVariant.container,
      selectedSize,
      fullWidth ? "w-full" : "w-auto",
      disabled && "opacity-50 pointer-events-none cursor-not-allowed",
      className
    );

    const buttonContent = (
      <>
        {/* Sliding Background Fill */}
        <div
          className={cn(
            "absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none",
            selectedVariant.fill,
            fillClassName
          )}
        />

        {/* Button Content */}
        <div
          className={cn(
            "relative z-10 flex items-center justify-center gap-2 transition-colors duration-300",
            selectedVariant.content,
            uppercase && "uppercase tracking-wider",
            contentClassName
          )}
        >
          {icon && iconPosition === "left" && (
            <span className="flex items-center shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:-translate-x-0.5">
              {icon}
            </span>
          )}

          <span className="truncate">{label || children}</span>

          {icon && iconPosition === "right" && (
            <span className="flex items-center shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-0.5">
              {icon}
            </span>
          )}
        </div>
      </>
    );

    const location = useLocation();
    const isHindi =
      location?.pathname === "/hi" || location?.pathname?.startsWith("/hi/");
    const currentLang = isHindi ? "hi" : "en";

    // 1. TanStack Router Link
    if (to) {
      return (
        <Link
          ref={ref as any}
          to={getLocalizedPath(to, currentLang) as any}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : rel}
          onClick={onClick as any}
          className={baseContainerStyles}
          aria-label={ariaLabel}
        >
          {buttonContent}
        </Link>
      );
    }

    // 2. Anchor tag / Internal Link via href
    if (href) {
      const isInternal =
        href.startsWith("/") &&
        !href.startsWith("//") &&
        !target &&
        !href.startsWith("http");

      if (isInternal) {
        return (
          <Link
            ref={ref as any}
            to={getLocalizedPath(href, currentLang) as any}
            target={target}
            rel={rel}
            onClick={onClick as any}
            className={baseContainerStyles}
            aria-label={ariaLabel}
          >
            {buttonContent}
          </Link>
        );
      }

      return (
        <a
          ref={ref as any}
          href={href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : rel}
          onClick={onClick as any}
          className={baseContainerStyles}
          aria-label={ariaLabel}
        >
          {buttonContent}
        </a>
      );
    }

    // 3. Regular button
    return (
      <button
        ref={ref as any}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={baseContainerStyles}
        aria-label={ariaLabel}
      >
        {buttonContent}
      </button>
    );
  }
);

SlideUpPillButton.displayName = "SlideUpPillButton";

export default SlideUpPillButton;
