import React, { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { CountUp, TiltCard, MagneticButton } from "@/components/common/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface PillarData {
  id: string;
  number: string;
  tag: string;
  title: string;
  description: string;
  metrics: {
    value: number;
    prefix?: string;
    suffix?: string;
    label: string;
  }[];
  features: string[];
  ctaText: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
}

const PILLARS_DATA: PillarData[] = [
  {
    id: "pillar-advisory",
    number: "01",
    tag: "Field Advisory",
    title: "On-Ground Expert Agronomist Support",
    description:
      "Field agronomists providing direct disease diagnosis, exact fertigation doses, and farm visits.",
    metrics: [
      { value: 20, suffix: "+", label: "Field Experts" },
      { value: 2000, suffix: "+", label: "Farmers Advised" },
      { value: 15, prefix: "< ", suffix: " Mins", label: "Response Time" },
    ],
    features: [
      "Photo pest & disease identification",
      "Stage-wise spray & fertigation schedules",
      "Direct access to senior agronomists",
    ],
    ctaText: "Talk to Agronomist",
    ctaHref: "/services#farm-tech",
    imageSrc: "/farm.png",
    imageAlt: "On-Ground Expert Agronomist Support",
  },
  {
    id: "pillar-nursery",
    number: "02",
    tag: "Bio Nursery",
    title: "Bio-Boosted Seedling Infrastructure",
    description:
      "Pathogen-free plug nurseries engineered for zero seedling mortality and a strong crop start.",
    metrics: [
      { value: 500000, suffix: "+", label: "Plants Delivered" },
      { value: 98, suffix: "%", label: "Survival Rate" },
      { value: 25, suffix: "+", label: "Varieties Sourced" },
    ],
    features: [
      "Automated misting & humidity control",
      "Trichoderma & mycorrhiza inoculation",
      "Sterile anti-fungal tray casing",
    ],
    ctaText: "Explore Bio Nurseries",
    ctaHref: "/services#nursery",
    imageSrc: "/nursery.png",
    imageAlt: "Bio-Boosted Seedling Infrastructure",
  },
  {
    id: "pillar-market",
    number: "03",
    tag: "Market & Carbon",
    title: "Guaranteed Buyback & Carbon Credits",
    description:
      "Direct buyer buyback contracts and soil carbon offset credits to maximize farm profit.",
    metrics: [
      { value: 15000, suffix: "+", label: "Acres Associated" },
      { value: 10, prefix: "₹", suffix: " Cr+", label: "Farmer Value" },
      { value: 100, suffix: "%", label: "Carbon Enablement" },
    ],
    features: [
      "Guaranteed buyback contract terms",
      "Digital weighment & instant payouts",
      "Soil carbon credit monetization",
    ],
    ctaText: "View Market Linkage",
    ctaHref: "/services#market-linkage",
    imageSrc: "/carbon credits.png",
    imageAlt: "Guaranteed Buyback & Carbon Credits",
  },
];

export default function PillarsHorizontalParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const mm = gsap.matchMedia();

      // Desktop & Tablet (>= 768px): Pinned Horizontal Scroll with GSAP Snap
      mm.add("(min-width: 768px)", () => {
        const panelsCount = PILLARS_DATA.length;
        const totalShiftPercent = -((panelsCount - 1) / panelsCount) * 100;

        const horizontalTween = gsap.to(track, {
          xPercent: totalShiftPercent,
          ease: "none",
          scrollTrigger: {
            id: "pillars-horizontal-st",
            trigger: container,
            pin: true,
            start: "top top",
            end: () => `+=${(panelsCount - 1) * window.innerWidth}`,
            scrub: 0.5,
            snap: {
              snapTo: 1 / (panelsCount - 1),
              duration: { min: 0.2, max: 0.45 },
              ease: "power2.out",
            },
            invalidateOnRefresh: true,
          },
        });

        return () => {
          horizontalTween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="pillars-section"
      className="relative bg-[#f4f8f5] border-t border-[#143d31]/10 overflow-hidden"
    >
      {/* ── DESKTOP & TABLET: Pinned Horizontal Scroll (>= 768px) ── */}
      <div className="hidden md:block w-full h-screen relative overflow-hidden">
        {/* Horizontal Track */}
        <div
          ref={trackRef}
          className="flex h-full items-center will-change-transform"
          style={{
            width: `${PILLARS_DATA.length * 100}vw`,
            transform: "translate3d(0, 0, 0)",
          }}
        >
          {PILLARS_DATA.map((pillar) => (
            <div
              key={pillar.id}
              className="w-[100vw] h-screen shrink-0 flex items-center justify-center px-6 sm:px-12 lg:px-16 pt-20 pb-16"
            >
              <div className="mx-auto max-w-7xl w-full grid grid-cols-12 gap-8 lg:gap-14 items-center">
                {/* Text Column (Left) — Consistent Across All Slides */}
                <div className="col-span-12 lg:col-span-6 flex flex-col justify-center max-w-xl lg:pr-6">
                  {/* Eyebrow / Tag */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-base sm:text-lg font-extrabold text-[#5d7d37]">
                      {pillar.number}
                    </span>
                    <span className="h-3 w-[1.5px] bg-[#143d31]/20" />
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#143d31]">
                      {pillar.tag}
                    </span>
                  </div>

                  {/* Headline */}
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#143d31] leading-[1.15]">
                    {pillar.title}
                  </h2>

                  {/* Description */}
                  <p className="font-sans mt-3 text-sm sm:text-base text-[#4f624f] leading-relaxed font-normal">
                    {pillar.description}
                  </p>

                  {/* Metrics Strip */}
                  <div className="my-6 border-y border-[#143d31]/12 py-4 grid grid-cols-3 gap-2">
                    {pillar.metrics.map((m, mIdx) => (
                      <div
                        key={m.label}
                        className={`text-left ${mIdx > 0 ? "border-l border-[#5d7d37]/40 pl-3" : "first:border-l-0 first:pl-0"}`}
                      >
                        <p className="font-display text-xl sm:text-2xl font-extrabold text-[#143d31]">
                          <CountUp to={m.value} prefix={m.prefix || ""} suffix={m.suffix || ""} />
                        </p>
                        <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Feature Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                    {pillar.features.map((feat) => (
                      <div
                        key={feat}
                        className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#143d31]"
                      >
                        <CheckCircle className="h-4 w-4 text-[#5d7d37] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div>
                    <MagneticButton strength={0.25} as="a" href={pillar.ctaHref}>
                      <span className="group relative inline-flex items-center gap-3 rounded-full bg-[#143d31] px-7 py-3.5 text-xs sm:text-sm font-bold text-white overflow-hidden shadow-md transition-all duration-300 cursor-pointer">
                        <span className="absolute inset-0 bg-[#5d7d37] transition-transform duration-500 ease-out -translate-x-full group-hover:translate-x-0 origin-left" />
                        <span className="relative z-10 flex items-center gap-3">
                          <span>{pillar.ctaText}</span>
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </span>
                    </MagneticButton>
                  </div>
                </div>

                {/* Visual Column (Right) — Consistent Across All Slides */}
                <div className="col-span-12 lg:col-span-6 relative flex items-center justify-center">
                  <div className="w-full flex items-center justify-center">
                    <TiltCard maxTilt={5} glare={false} className="w-full">
                      <motion.div
                        whileHover={{ scale: 1.025 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="relative w-full flex items-center justify-center p-0"
                      >
                        <img
                          src={pillar.imageSrc}
                          alt={pillar.imageAlt}
                          className="w-full max-h-[360px] sm:max-h-[420px] lg:max-h-[460px] object-contain transition-transform duration-500 drop-shadow-2xl"
                        />
                      </motion.div>
                    </TiltCard>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE VIEW: Pure Vertical Stack (< 768px) ── */}
      <div className="block md:hidden py-12 px-5 space-y-12">
        {PILLARS_DATA.map((pillar) => (
          <div
            key={pillar.id}
            className="rounded-3xl bg-white p-6 border border-[#143d31]/10 shadow-sm space-y-6"
          >
            {/* Tag */}
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-base font-extrabold text-[#5d7d37]">
                {pillar.number}
              </span>
              <span className="h-3 w-[1.5px] bg-[#143d31]/20" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#143d31]">
                {pillar.tag}
              </span>
            </div>

            <h3 className="font-display text-xl font-bold text-[#143d31] leading-snug">
              {pillar.title}
            </h3>

            <p className="font-sans text-xs text-[#4f624f] leading-relaxed font-normal">
              {pillar.description}
            </p>

            {/* Visual */}
            <div className="relative w-full flex items-center justify-center my-4">
              <img
                src={pillar.imageSrc}
                alt={pillar.imageAlt}
                className="w-full max-h-[260px] object-contain drop-shadow-xl"
              />
            </div>

            {/* Metrics */}
            <div className="border-y border-[#143d31]/12 py-3 grid grid-cols-3 gap-1">
              {pillar.metrics.map((m, mIdx) => (
                <div
                  key={m.label}
                  className={`text-left ${mIdx > 0 ? "border-l border-[#5d7d37]/40 pl-2" : ""}`}
                >
                  <p className="font-display text-base font-extrabold text-[#143d31]">
                    <CountUp to={m.value} prefix={m.prefix || ""} suffix={m.suffix || ""} />
                  </p>
                  <p className="font-mono text-[9px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="space-y-2">
              {pillar.features.map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-2 text-xs font-semibold text-[#143d31]"
                >
                  <CheckCircle className="h-3.5 w-3.5 text-[#5d7d37] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <a
                href={pillar.ctaHref}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#143d31] py-3 text-xs font-bold text-white shadow-md hover:bg-[#1a4d3e] transition-colors"
              >
                <span>{pillar.ctaText}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
