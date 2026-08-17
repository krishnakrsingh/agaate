import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  Truck,
  Buildings,
  Microscope,
  Package,
  CaretRight,
  ShoppingBag,
  PhoneCall,
} from "@phosphor-icons/react";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import { CountUp, MagneticButton, EASE } from "@/components/common/motion";
import KisaanMallShowcase from "./KisaanMallShowcase";

const SUPPLY_CHAIN_STEPS = [
  {
    step: "01",
    title: "Direct Partner Sourcing",
    desc: "Sourced directly from 50+ certified seed & input manufacturers.",
    icon: Buildings,
  },
  {
    step: "02",
    title: "QC Batch Verification",
    desc: "Every batch tested for germination, purity, and zero counterfeits.",
    icon: Microscope,
  },
  {
    step: "03",
    title: "Agaate Regional Hub",
    desc: "Stored in humidity-controlled warehouses until your order.",
    icon: Package,
  },
  {
    step: "04",
    title: "Single-Day Farm Delivery",
    desc: "Delivered straight to your field gate across 15+ districts.",
    icon: Truck,
  },
];

export default function MallChapter() {
  const sectionRef = useHomeChapterReveal("fade-up");

  return (
    <section
      ref={sectionRef}
      id="kisaan-mall"
      className="relative scroll-mt-20 overflow-hidden bg-white py-16 sm:py-20 md:py-24 border-t border-[#143d31]/10"
    >
      {/* Background Subtle Gradient Glow */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#a3e635]/10 via-[#5d7d37]/5 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* ── Main Showcase Grid (Exact Screenshot Layout) ── */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Text & Metrics */}
          <motion.div
            className="lg:col-span-6 flex flex-col justify-center max-w-xl lg:pr-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* Division Tag */}
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-base sm:text-lg font-extrabold text-[#5d7d37]">
                03
              </span>
              <span className="h-3 w-[1.5px] bg-[#143d31]/20" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#143d31]">
                Agaate Mall
              </span>
            </div>

            {/* Display Headline */}
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.15]">
              India&apos;s First Modern Retail for Farmers
            </h2>

            {/* Subtext Description */}
            <p className="font-sans mt-3 text-sm sm:text-base text-[#4f624f] leading-relaxed font-normal">
              One-stop shop for farmers. Verified seeds, biologicals, and drip kits delivered direct
              to your farm at honest prices.
            </p>

            {/* Metrics Strip */}
            <div className="my-6 border-y border-[#143d31]/12 py-4 grid grid-cols-3 gap-2">
              <div className="text-left first:border-l-0 first:pl-0">
                <p className="font-display text-xl sm:text-2xl font-extrabold text-[#143d31]">
                  <CountUp to={1000} suffix="+" />
                </p>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                  Products
                </p>
              </div>
              <div className="text-left border-l border-[#5d7d37]/40 pl-3">
                <p className="font-display text-xl sm:text-2xl font-extrabold text-[#143d31]">
                  <CountUp to={50} suffix="+" />
                </p>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                  Partners
                </p>
              </div>
              <div className="text-left border-l border-[#5d7d37]/40 pl-3">
                <p className="font-display text-xl sm:text-2xl font-extrabold text-[#143d31]">
                  Single Day
                </p>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                  Doorstep Delivery
                </p>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
              {[
                "Direct-from-brand honest pricing",
                "QR-verified product authenticity",
                "Custom drip & irrigation packages",
              ].map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#143d31]"
                >
                  <CheckCircle className="h-4 w-4 text-[#5d7d37] shrink-0" weight="fill" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div>
              <MagneticButton strength={0.25} as="a" href="/services#kisaan-mall">
                <span className="group relative inline-flex items-center gap-3 rounded-full bg-[#143d31] px-7 py-3.5 text-xs sm:text-sm font-bold text-white overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer">
                  <span className="absolute inset-0 bg-[#5d7d37] transition-transform duration-500 ease-out -translate-x-full group-hover:translate-x-0 origin-left" />
                  <span className="relative z-10 flex items-center gap-3">
                    <span>Browse Agaate Mall</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </span>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Right Column: Visual Showcase Cutout with Hotspots */}
          <motion.div
            className="lg:col-span-6 relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <KisaanMallShowcase />
          </motion.div>
        </div>

        {/* ── Agaate Direct Supply Guarantee ── */}
        <div
          data-home-reveal
          className="relative mt-16 rounded-3xl bg-gradient-to-br from-[#fafbf7] via-[#f8f9f3] to-[#fafbf7] p-6 sm:p-10 border border-[#143d31]/15 shadow-sm overflow-hidden"
        >
          <div className="relative z-10 text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#143d31] px-4 py-1.5 text-[10px] font-mono font-bold text-white uppercase tracking-widest mb-3 shadow-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-[#a3e635]" />
              AGAATE DIRECT SUPPLY GUARANTEE
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#143d31] tracking-tight">
              How Agaate Direct Supply Works
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#4f624f]/90 mt-2 leading-relaxed max-w-xl mx-auto">
              From certified brand factories to your field gate — every single batch is verified for
              germination, purity, and authenticity.
            </p>
          </div>

          <div className="relative z-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SUPPLY_CHAIN_STEPS.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="relative flex items-center w-full">
                  {/* Step Card */}
                  <div className="group relative w-full rounded-2xl bg-white/90 backdrop-blur-md p-6 border border-[#143d31]/8 hover:border-[#5d7d37]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[10px] font-extrabold tracking-widest text-[#5d7d37] bg-[#5d7d37]/8 px-2 py-0.5 rounded-md">
                        STEP {s.step}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#143d31] to-[#245242] text-white shadow-md shadow-[#143d31]/15 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-[#143d31] tracking-tight">
                        {s.title}
                      </h4>
                      <p className="font-sans text-xs text-[#4f624f] leading-relaxed mt-2 font-normal">
                        {s.desc}
                      </p>
                    </div>

                    {/* Bottom active hover accent bar */}
                    <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-emerald-500 to-[#a3e635] rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left pointer-events-none" />
                  </div>

                  {/* Flow Connector Arrow (Only between cards on desktop) */}
                  {idx < SUPPLY_CHAIN_STEPS.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-3.5 -translate-y-1/2 z-20 h-6 w-6 items-center justify-center rounded-full bg-[#fafbf7] border border-[#143d31]/10 text-[#143d31]/40 shadow-xs pointer-events-none">
                      <CaretRight className="h-3 w-3" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CTA Banner ── */}
        <div
          data-home-reveal
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl bg-[#143d31] p-7 sm:p-8 text-white shadow-xl"
        >
          <div>
            <span className="font-mono text-xs font-bold text-white/90 uppercase tracking-widest">
              DIRECT AGRONOMIST RECOMMENDATION
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
              Unsure which seed or bio-input matches your soil?
            </h3>
            <p className="font-sans text-xs text-white/75 mt-1 max-w-xl">
              Talk directly with senior field experts to get exact dose calculations before placing
              your Agaate Mall order.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <MagneticButton strength={0.2} as="a" href="/services#kisaan-mall">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#a3e635] px-6 py-3.5 text-xs font-extrabold text-[#143d31] hover:bg-[#b5f247] transition-colors cursor-pointer shadow-md">
                <ShoppingBag className="h-4 w-4" />
                <span>Browse Store</span>
              </span>
            </MagneticButton>
            <a
              href="tel:9487263498"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-xs font-bold text-white hover:bg-white/10 transition-colors"
            >
              <PhoneCall className="h-3.5 w-3.5 text-white" />
              <span>Call Agronomist</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
