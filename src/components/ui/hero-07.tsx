"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

import { Cta, type CtaProps } from "@/components/ui/hero-07-utils/cta";

export interface Hero07Props {
  tagline: string;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  landscapeImage?: string;
  landscapeAlt?: string;
  animation?: "none" | "subtle";
  primaryCTA?: CtaProps;
  secondaryCTA?: CtaProps;
  variant?: "standard" | "compact";
  mediaPosition?: "bottom" | "top";
  children?: React.ReactNode;
}

const variantStyles = {
  standard: {
    copy: "pt-4 pb-8 sm:pt-6 sm:pb-10",
    tagline: "text-xs sm:text-sm",
    title: "text-3xl sm:text-4xl md:text-5xl",
    description: "text-sm sm:text-base",
    header: "gap-4 sm:gap-6",
    grid: "gap-8 sm:gap-10",
  },
  compact: {
    copy: "pt-2 pb-6 sm:pt-4 sm:pb-8",
    tagline: "text-xs",
    title: "text-2xl sm:text-3xl md:text-4xl",
    description: "text-xs sm:text-sm",
    header: "gap-3 sm:gap-4",
    grid: "gap-6 sm:gap-8",
  },
} as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
};

const mediaItem: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  },
};

function Reveal({
  active,
  variants,
  className,
  children,
}: Readonly<{
  active: boolean;
  variants?: Variants;
  className?: string;
  children: React.ReactNode;
}>) {
  if (!active) return <div className={className}>{children}</div>;

  return (
    <motion.div variants={variants ?? item} className={className}>
      {children}
    </motion.div>
  );
}

export function Hero07({
  tagline,
  title,
  description,
  landscapeImage,
  landscapeAlt = "",
  animation = "none",
  primaryCTA,
  secondaryCTA,
  variant = "standard",
  mediaPosition = "bottom",
  children,
}: Readonly<Hero07Props>) {
  const reduce = useReducedMotion();
  const animate = animation === "subtle" && !reduce;
  const vs = variantStyles[variant];

  const taglineElement = tagline && (
    <div className="flex items-center gap-2">
      <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
      <p
        className={cn(
          "font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37] leading-relaxed text-balance",
          vs.tagline,
        )}
      >
        {tagline}
      </p>
    </div>
  );

  const titleElement = title && (
    <h1
      className={cn(
        "text-[#143d31] font-display font-bold tracking-tight text-balance leading-[1.1]",
        vs.title,
      )}
    >
      {title}
    </h1>
  );

  const descriptionElement = description && (
    <div
      className={cn(
        "text-[#4f624f] font-sans max-w-xl leading-relaxed text-sm sm:text-base text-pretty",
        vs.description,
      )}
    >
      {description}
    </div>
  );

  const ctasElement = (primaryCTA?.ctaEnabled || secondaryCTA?.ctaEnabled) && (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3 pt-2">
      {primaryCTA?.ctaEnabled && <Cta cta={primaryCTA} />}
      {secondaryCTA?.ctaEnabled && (
        <Cta cta={{ ...secondaryCTA, variant: secondaryCTA.variant ?? "link" }} />
      )}
    </div>
  );

  const mediaElement = landscapeImage && (
    <div className="relative w-full overflow-hidden rounded-3xl md:rounded-[2.2rem] border border-[#143d31]/12 shadow-md bg-white">
      <div className="relative aspect-[16/7] sm:aspect-[21/9] w-full overflow-hidden max-h-[420px]">
        <img
          src={landscapeImage}
          alt={landscapeAlt}
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
        <div
          aria-hidden
          className="bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none absolute inset-0 z-10"
        />
      </div>
    </div>
  );

  const textGrid = (
    <motion.div
      className={cn(
        "relative z-10 mx-auto grid max-w-7xl grid-cols-1 px-5 sm:px-8 lg:px-10 lg:grid-cols-12",
        vs.copy,
        vs.grid,
      )}
      variants={animate ? container : undefined}
      initial={animate ? "hidden" : false}
      whileInView={animate ? "visible" : undefined}
      viewport={{ once: true, margin: "-80px" }}
    >
      <Reveal
        active={animate}
        className="flex flex-col lg:col-span-5 lg:col-start-1 lg:items-start lg:self-stretch gap-4"
      >
        {taglineElement}
        {children}
      </Reveal>

      <Reveal
        active={animate}
        className={cn("flex flex-col items-start lg:col-span-7 lg:col-start-6", vs.header)}
      >
        {titleElement}
        {descriptionElement}
        {ctasElement}
      </Reveal>
    </motion.div>
  );

  return (
    <section className="bg-[#f4f8f5] relative isolate w-full overflow-hidden pt-24 sm:pt-28">
      {mediaPosition === "top" && mediaElement && (
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 pb-6">
          <Reveal active={animate} variants={mediaItem} className="w-full">
            {mediaElement}
          </Reveal>
        </div>
      )}

      {textGrid}

      {mediaPosition === "bottom" && mediaElement && (
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 pb-10 sm:pb-14">
          <Reveal active={animate} variants={mediaItem} className="w-full">
            {mediaElement}
          </Reveal>
        </div>
      )}
    </section>
  );
}

export default Hero07;
