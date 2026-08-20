import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { useHomeChapterReveal } from "../useHomeChapterReveal";
import { CountUp, EASE } from "@/components/common/motion";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";

export default function PillarMarket() {
  const sectionRef = useHomeChapterReveal("fade-up");

  return (
    <section
      ref={sectionRef}
      id="pillar-market"
      className="relative bg-[#f4f8f5] py-16 sm:py-20 lg:py-28 border-t border-[#143d31]/10 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Visual Column (Left on Desktop) */}
          <motion.div
            className="lg:col-span-6 lg:order-1 relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="relative w-full max-w-[540px] aspect-[16/11] overflow-hidden rounded-3xl border border-[#143d31]/12 bg-white shadow-[0_24px_50px_rgba(13,40,32,0.12)] group">
              <img
                src="/services/market-linkage-harvest.jpg"
                alt="Agaate farm-gate harvest aggregation and market linkage"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Bottom Floating Telemetry Panel */}
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between gap-3 rounded-2xl bg-white/95 backdrop-blur-md p-3 px-4 border border-[#143d31]/10 shadow-lg">
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">
                    Institutional Offtake & Mandi Linkage
                  </span>
                  <span className="font-display text-xs font-bold text-[#143d31]">
                    Reliance · BigBasket · Direct Mandi Offtake
                  </span>
                </div>
                <div className="shrink-0 text-right">
                  <span className="font-mono text-[10px] font-bold text-[#143d31] bg-[#a3e635]/30 border border-[#a3e635]/50 px-2.5 py-1 rounded-full">
                    T+0 Farm-Gate UPI
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Column (Right on Desktop) */}
          <motion.div
            className="lg:col-span-6 lg:order-2 flex flex-col justify-center max-w-xl lg:pl-6"
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
                Market Linkage
              </span>
            </div>

            {/* Display Headline */}
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#143d31] leading-[1.15]">
              Guaranteed Buyback & Direct Offtake
            </h2>

            {/* Subtext Description */}
            <p className="font-sans mt-2.5 text-sm sm:text-base text-[#4f624f] leading-relaxed font-normal">
              Pre-sowing price contracts, transparent digital weighing, and instant T+0 farm-gate payouts.
            </p>

            {/* Metrics Strip */}
            <div className="my-5 border-y border-[#143d31]/12 py-3.5 grid grid-cols-3 gap-2">
              <div className="text-left first:border-l-0 first:pl-0">
                <p className="font-display text-xl sm:text-2xl font-extrabold text-[#143d31]">
                  <CountUp to={15000} suffix="+" />
                </p>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                  Acres Associated
                </p>
              </div>
              <div className="text-left border-l border-[#5d7d37]/40 pl-3">
                <p className="font-display text-xl sm:text-2xl font-extrabold text-[#143d31]">
                  <CountUp to={12} prefix="₹" suffix=" Cr+" />
                </p>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                  Farmer Payouts
                </p>
              </div>
              <div className="text-left border-l border-[#5d7d37]/40 pl-3">
                <p className="font-display text-xl sm:text-2xl font-extrabold text-[#143d31]">
                  <CountUp to={0} suffix="%" />
                </p>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                  Middleman Cut
                </p>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-7">
              {[
                "Pre-sowing price floor guarantee",
                "Digital weighment & instant UPI payout",
                "Direct institutional buyer linkage",
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
              <SlideUpPillButton
                href="/services#market-linkage"
                variant="dark"
                size="md"
                label="View Market Linkage"
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
