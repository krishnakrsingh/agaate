import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, CheckCircle, Sparkle, WhatsappLogo } from "@phosphor-icons/react";
import {
  CountUp,
  MagneticButton,
  Marquee,
  TiltCard,
  Stagger,
  StaggerItem,
  EASE,
} from "@/components/common/motion";
import { UNIFIED_SERVICES_NAV, MASTER_IMPACT_METRICS } from "./services-unified-data";
import { WHATSAPP_CONSULTATION_URL } from "@/components/header/header-data";

interface UnifiedServicesHeroProps {
  onSectionClick: (id: string) => void;
  onOpenConsultation: () => void;
}

export function UnifiedServicesHero({
  onSectionClick,
  onOpenConsultation,
}: UnifiedServicesHeroProps) {
  const [activeCard, setActiveCard] = useState<string>("nursery");

  return (
    <section
      id="overview"
      className="relative overflow-hidden bg-[#f4f8f5] pt-12 pb-20 border-b border-[#143d31]/10"
    >
      {/* Background Ambience Glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[550px] w-[750px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#5d7d37]/15 via-[#143d31]/5 to-transparent blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Top Header Grid */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-base sm:text-lg font-extrabold text-[#5d7d37]">
                00
              </span>
              <span className="h-3.5 w-[1.5px] bg-[#143d31]/20" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#143d31]">
                All 6 Integrated Solutions
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.08]">
              Six scientific verticals.{" "}
              <span className="font-serif italic font-normal text-[#5d7d37]">
                One integrated farm engine.
              </span>
            </h1>

            <p className="font-sans text-sm sm:text-base leading-relaxed text-[#4f624f]">
              From bio-boosted sterile plug seedlings and manufacturer-direct inputs to IoT drone
              telemetry, turnkey 500-acre orchards, and guaranteed buyback contracts — explore
              India's complete end-to-end farm ecosystem.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <MagneticButton strength={0.25} as="button" onClick={() => onSectionClick("nursery")}>
              <span className="group relative inline-flex items-center gap-3 rounded-full bg-[#143d31] px-7 py-3.5 text-xs sm:text-sm font-bold text-white overflow-hidden shadow-md transition-all duration-300 cursor-pointer">
                <span className="absolute inset-0 bg-[#5d7d37] transition-transform duration-500 ease-out -translate-x-full group-hover:translate-x-0 origin-left" />
                <span className="relative z-10 flex items-center gap-2.5">
                  <span>Explore All Verticals</span>
                  <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </span>
              </span>
            </MagneticButton>

            <MagneticButton strength={0.25} as="button" onClick={onOpenConsultation}>
              <span className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#143d31]/25 bg-white/80 px-6 py-3.5 text-xs sm:text-sm font-bold text-[#143d31] shadow-xs transition-all hover:bg-white hover:border-[#143d31]">
                <Sparkle className="h-4 w-4 text-[#5d7d37]" />
                <span>Book Farm Audit</span>
              </span>
            </MagneticButton>
          </div>
        </div>

        {/* 6-Card Image-Rich Visual Deck */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
              Interactive Solution Directory · Tap to Jump
            </span>
            <span className="font-mono text-[11px] text-[#4f624f]">
              6 Core Pillars Connected End-to-End
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {UNIFIED_SERVICES_NAV.map((sec) => {
              const Icon = sec.icon;
              const isSelected = activeCard === sec.id;

              return (
                <TiltCard key={sec.id} maxTilt={6} className="h-full">
                  <div
                    onClick={() => {
                      setActiveCard(sec.id);
                      onSectionClick(sec.id);
                    }}
                    className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border bg-white p-6 shadow-sm transition-all duration-300 cursor-pointer hover:shadow-xl hover:border-[#143d31]/40 ${
                      isSelected
                        ? "border-[#143d31] ring-2 ring-[#5d7d37]/20"
                        : "border-[#143d31]/10"
                    }`}
                  >
                    <div>
                      {/* Image Thumbnail with Overlay */}
                      <div className="relative mb-5 h-44 w-full overflow-hidden rounded-2xl bg-[#f4f8f5] flex items-center justify-center p-3">
                        <img
                          src={sec.image}
                          alt={sec.name}
                          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="rounded-full bg-[#143d31] px-3 py-1 font-mono text-[10px] font-bold text-white shadow-xs">
                            {sec.num}
                          </span>
                          <span className="rounded-full bg-white/90 backdrop-blur-xs px-3 py-1 font-mono text-[10px] font-bold text-[#5d7d37] shadow-xs">
                            {sec.badge}
                          </span>
                        </div>
                      </div>

                      {/* Title & Tagline */}
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="h-5 w-5 text-[#5d7d37]" />
                        <h3 className="font-display text-xl font-bold text-[#143d31] group-hover:text-[#5d7d37] transition-colors">
                          {sec.name}
                        </h3>
                      </div>

                      <p className="font-sans text-xs leading-relaxed text-[#4f624f]">
                        {sec.tagline}
                      </p>
                    </div>

                    {/* Card Footer Strip */}
                    <div className="mt-6 flex items-center justify-between border-t border-[#143d31]/10 pt-4">
                      <div>
                        <span className="font-display text-lg font-extrabold text-[#143d31]">
                          {sec.statNumber}
                        </span>
                        <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#5d7d37]">
                          {sec.statLabel}
                        </p>
                      </div>

                      <span className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#143d31] group-hover:text-[#5d7d37] transition-colors">
                        <span>Explore</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>

        {/* Impact Metrics Strip */}
        <div className="mt-14 rounded-3xl border border-[#143d31]/10 bg-white p-6 sm:p-8 shadow-xs">
          <Stagger className="grid grid-cols-2 gap-6 sm:grid-cols-4" stagger={0.1}>
            {MASTER_IMPACT_METRICS.map((s, idx) => (
              <StaggerItem
                key={s.label}
                variant="fade-up"
                className={`text-left ${idx > 0 ? "border-l border-[#5d7d37]/30 pl-4 sm:pl-6" : ""}`}
              >
                <p className="font-display text-3xl sm:text-4xl font-extrabold text-[#143d31]">
                  <CountUp to={s.value} suffix={s.suffix} />
                </p>
                <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5d7d37] mt-1">
                  {s.label}
                </p>
                <p className="font-sans text-[11px] text-[#4f624f] mt-0.5">{s.sub}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
