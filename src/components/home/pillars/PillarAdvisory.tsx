import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { useHomeChapterReveal } from "../useHomeChapterReveal";
import { CountUp, TiltCard, EASE } from "@/components/common/motion";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
import { WHATSAPP_AGRONOMIST_URL } from "@/components/header/header-data";

export default function PillarAdvisory() {
  const sectionRef = useHomeChapterReveal("fade-up");

  return (
    <section
      ref={sectionRef}
      id="pillar-advisory"
      className="relative bg-[#f4f8f5] py-16 sm:py-20 lg:py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Text Column (Left) */}
          <motion.div
            className="lg:col-span-6 flex flex-col justify-center max-w-xl lg:pr-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* Division Tag */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                Field Advisory
              </p>
            </div>

            {/* Display Headline */}
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#143d31] leading-[1.15]">
              On-Ground Expert Agronomist Support
            </h2>

            {/* Subtext Description */}
            <p className="font-sans mt-3 text-sm sm:text-base text-[#4f624f] leading-relaxed font-normal">
              Field agronomists providing direct disease diagnosis, exact fertigation doses, and
              farm visits.
            </p>

            {/* Metrics Strip */}
            <div className="my-6 border-y border-[#143d31]/12 py-4 grid grid-cols-3 gap-2">
              <div className="text-left first:border-l-0 first:pl-0">
                <p className="font-display text-xl sm:text-2xl font-extrabold text-[#143d31]">
                  <CountUp to={20} suffix="+" />
                </p>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                  Field Experts
                </p>
              </div>
              <div className="text-left border-l border-[#5d7d37]/40 pl-3">
                <p className="font-display text-xl sm:text-2xl font-extrabold text-[#143d31]">
                  <CountUp to={2000} suffix="+" />
                </p>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                  Farmers Advised
                </p>
              </div>
              <div className="text-left border-l border-[#5d7d37]/40 pl-3">
                <p className="font-display text-xl sm:text-2xl font-extrabold text-[#143d31]">
                  <CountUp to={15} prefix="< " suffix=" Mins" />
                </p>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                  Response Time
                </p>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
              {[
                "Photo pest & disease identification",
                "Stage-wise spray & fertigation schedules",
                "Direct access to senior agronomists",
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
                href={WHATSAPP_AGRONOMIST_URL}
                variant="dark"
                size="md"
                label="Talk to Agronomist"
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              />
            </div>
          </motion.div>

          {/* Visual Column (Right) */}
          <motion.div
            className="lg:col-span-6 relative flex items-center justify-center"
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
                  src="/farm.png"
                  alt="On-Ground Expert Agronomist Support"
                  className="w-full max-h-[440px] sm:max-h-[500px] lg:max-h-[560px] object-contain transition-transform duration-500 drop-shadow-2xl"
                />
              </motion.div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
