import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowSquareOut, CheckCircle, MapPin } from "@phosphor-icons/react";
import { useHomeChapterReveal } from "../useHomeChapterReveal";
import { CountUp, TiltCard, EASE } from "@/components/common/motion";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
import { AgriParkVisitModal } from "@/components/agri-park/AgriParkVisitModal";
import { LocationsModal } from "@/components/common/LocationsModal";

export default function PillarNursery() {
  const sectionRef = useHomeChapterReveal("fade-up");
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [isLocationsModalOpen, setIsLocationsModalOpen] = useState(false);

  return (
    <>
      <section
        ref={sectionRef}
        id="pillar-nursery"
        className="relative bg-[#f4f8f5] py-16 sm:py-20 lg:py-28 border-t border-[#143d31]/10 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Visual Column (Left on Desktop) */}
            <motion.div
              className="lg:col-span-6 lg:order-1 relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {/* Interactive Location Pointer + Counter Badge */}
              <button
                type="button"
                onClick={() => setIsLocationsModalOpen(true)}
                className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20 flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 border border-[#143d31]/15 shadow-md hover:shadow-lg hover:border-[#5d7d37] hover:scale-105 transition-all duration-300 group cursor-pointer"
                title="Click to view all Agaate facilities on Google Maps"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5d7d37] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#5d7d37]"></span>
                </span>
                <MapPin weight="fill" className="h-4 w-4 text-[#143d31] group-hover:text-[#5d7d37] transition-colors" />
                <div className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs font-bold text-[#143d31]">
                  <span className="font-extrabold text-[#5d7d37]">3</span>
                  <span>Hubs in Gurugram</span>
                  <ArrowSquareOut className="h-3.5 w-3.5 text-[#5d7d37] opacity-70 group-hover:opacity-100 transition-opacity ml-0.5" />
                </div>
              </button>

              <TiltCard maxTilt={6} glare={false} className="w-full">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative w-full flex items-center justify-center p-0"
                >
                  <img
                    src="/bio-nursery.png"
                    alt="Bio-Boosted Seedling Infrastructure"
                    className="w-full max-h-[440px] sm:max-h-[500px] lg:max-h-[560px] object-contain transition-transform duration-500"
                  />
                </motion.div>
              </TiltCard>
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
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
                <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                  Bio Nursery
                </p>

                <button
                  type="button"
                  onClick={() => setIsLocationsModalOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/90 hover:bg-white px-2.5 py-0.5 text-[11px] font-mono font-bold text-[#143d31] transition-all cursor-pointer border border-[#143d31]/15 shadow-xs hover:border-[#5d7d37] hover:scale-105"
                  title="Click to view all locations on Google Maps"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5d7d37] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5d7d37]"></span>
                  </span>
                  <MapPin weight="fill" className="h-3 w-3 text-[#5d7d37]" />
                  <span>3 Locations in Gurugram</span>
                  <ArrowSquareOut className="h-3 w-3 text-[#5d7d37]" />
                </button>
              </div>

              {/* Display Headline */}
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#143d31] leading-[1.15]">
                High-Immunity Seedling Infrastructure
              </h2>

              {/* Subtext Description */}
              <p className="font-sans mt-3 text-sm sm:text-base text-[#4f624f] leading-relaxed font-normal">
                Immunity-boosted plug seedlings engineered for zero mortality, strong root vigour, and
                maximum crop protection.
              </p>

              {/* Metrics Strip */}
              <div className="my-6 border-y border-[#143d31]/12 py-4 grid grid-cols-3 gap-2">
                <div className="text-left first:border-l-0 first:pl-0">
                  <p className="font-display text-xl sm:text-2xl font-extrabold text-[#143d31]">
                    <CountUp to={85} suffix=" Lakh+" />
                  </p>
                  <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                    Plants Delivered
                  </p>
                </div>
                <div className="text-left border-l border-[#5d7d37]/40 pl-3">
                  <p className="font-display text-xl sm:text-2xl font-extrabold text-[#143d31]">
                    <CountUp to={98} suffix="%" />
                  </p>
                  <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                    Survival Rate
                  </p>
                </div>
                <div className="text-left border-l border-[#5d7d37]/40 pl-3">
                  <p className="font-display text-xl sm:text-2xl font-extrabold text-[#143d31]">
                    <CountUp to={100} suffix="+" />
                  </p>
                  <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                    Varieties Sourced
                  </p>
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {[
                  "Built-in natural disease immunity",
                  "Zero transplant shock & fast growth",
                  "High-vigour root system for higher yield",
                ].map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#143d31]"
                  >
                    <CheckCircle className="h-4 w-4 text-[#5d7d37] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <SlideUpPillButton
                  type="button"
                  onClick={() => setIsVisitModalOpen(true)}
                  variant="dark"
                  size="md"
                  label="Book Visit"
                  icon={<ArrowRight className="h-4 w-4" />}
                  iconPosition="right"
                />
                <button
                  type="button"
                  onClick={() => setIsLocationsModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#143d31]/20 bg-white/80 hover:bg-white hover:border-[#143d31] px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#143d31] shadow-xs transition-all duration-300 cursor-pointer"
                >
                  <MapPin weight="fill" className="h-4 w-4 text-[#5d7d37]" />
                  <span>View Locations &amp; Maps</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {isVisitModalOpen && (
        <AgriParkVisitModal
          isOpen={isVisitModalOpen}
          onClose={() => setIsVisitModalOpen(false)}
        />
      )}

      {isLocationsModalOpen && (
        <LocationsModal
          isOpen={isLocationsModalOpen}
          onClose={() => setIsLocationsModalOpen(false)}
        />
      )}
    </>
  );
}

