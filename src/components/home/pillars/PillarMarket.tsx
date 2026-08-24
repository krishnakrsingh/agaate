import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { useHomeChapterReveal } from "../useHomeChapterReveal";
import { TiltCard, EASE } from "@/components/common/motion";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
import { MarketAccessModal } from "./MarketAccessModal";
import { useHomepageChapters } from "@/contexts/HomepageChaptersContext";
import { HomeChapterStatValue } from "@/components/home/HomeChapterStatValue";
import type { HomeCmsLogo } from "@/lib/cms-types";

interface PillarMarketProps {
  buyers?: HomeCmsLogo[];
}

export default function PillarMarket({ buyers }: PillarMarketProps) {
  const { i18n } = useTranslation();
  const { pillarMarket } = useHomepageChapters();
  const currentLang = i18n.language || "en";
  const isHindi = currentLang.startsWith("hi");
  const sectionRef = useHomeChapterReveal("fade-up");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const highlights = isHindi ? pillarMarket.highlightsHi : pillarMarket.highlightsEn;
  const imageAlt = isHindi ? pillarMarket.imageAltHi : pillarMarket.imageAltEn;

  return (
    <section
      ref={sectionRef}
      id="pillar-market"
      className="relative scroll-mt-24 sm:scroll-mt-28 md:scroll-mt-32 bg-[#f4f8f5] py-16 sm:py-20 lg:py-28 border-t border-[#143d31]/10 overflow-hidden text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <motion.div
            className="lg:col-span-6 lg:order-1 relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="w-full flex items-center justify-center">
              <TiltCard maxTilt={4} glare={false} className="w-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative w-full flex items-center justify-center p-0"
                >
                  <img
                    src={pillarMarket.imageUrl}
                    alt={imageAlt}
                    className="w-full max-h-[380px] sm:max-h-[440px] lg:max-h-[480px] object-contain"
                  />
                </motion.div>
              </TiltCard>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-6 lg:order-2 flex flex-col justify-center max-w-xl lg:pl-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                {isHindi ? pillarMarket.badgeHi : pillarMarket.badgeEn}
              </p>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#143d31] leading-[1.15]">
              {isHindi ? pillarMarket.titleHi : pillarMarket.titleEn}
            </h2>

            <p className="font-sans mt-2.5 text-sm sm:text-base text-[#4f624f] leading-relaxed font-normal">
              {isHindi ? pillarMarket.descriptionHi : pillarMarket.descriptionEn}
            </p>

            <div className="my-5 border-y border-[#143d31]/12 py-3.5 grid grid-cols-3 gap-2">
              {pillarMarket.stats.map((stat, idx) => {
                const label = isHindi ? stat.labelHi : stat.labelEn;
                return (
                  <div
                    key={label}
                    className={idx > 0 ? "text-left border-l border-[#5d7d37]/40 pl-3" : "text-left first:border-l-0 first:pl-0"}
                  >
                    <p className="font-display text-xl sm:text-2xl font-extrabold text-[#143d31]">
                      <HomeChapterStatValue stat={stat} isHindi={isHindi} />
                    </p>
                    <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                      {label}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-7">
              {highlights.map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#143d31]"
                >
                  <CheckCircle className="h-4 w-4 text-[#5d7d37] shrink-0" weight="fill" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div>
              <SlideUpPillButton
                type="button"
                onClick={() => setIsModalOpen(true)}
                variant="dark"
                size="md"
                label={isHindi ? pillarMarket.ctaLabelHi : pillarMarket.ctaLabelEn}
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <MarketAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} buyers={buyers} />
    </section>
  );
}
