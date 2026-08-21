import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { useHomeChapterReveal } from "../useHomeChapterReveal";
import { CountUp, TiltCard, EASE } from "@/components/common/motion";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";

export default function PillarNursery() {
  const sectionRef = useHomeChapterReveal("fade-up");

  return (
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
            <TiltCard maxTilt={6} glare={false} className="w-full">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-full flex items-center justify-center p-0"
              >
                <img
                  src="/agripark.png"
                  alt="Bio-Boosted Seedling Infrastructure"
                  className="w-full max-h-[440px] sm:max-h-[500px] lg:max-h-[560px] object-contain transition-transform duration-500 drop-shadow-2xl"
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
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-base sm:text-lg font-extrabold text-[#5d7d37]">
                02
              </span>
              <span className="h-3 w-[1.5px] bg-[#143d31]/20" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#143d31]">
                Bio Nursery
              </span>
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

            {/* CTA Button */}
            <div>
              <SlideUpPillButton
                href="/services#nursery"
                variant="dark"
                size="md"
                label="Explore Bio Nurseries"
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
