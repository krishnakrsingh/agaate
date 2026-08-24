import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowSquareOut, CheckCircle, MapPin } from "@phosphor-icons/react";
import { TiltCard } from "@/components/common/motion";
import { useTranslation } from "react-i18next";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
import { useSiteContact } from "@/contexts/SiteContactContext";
import { useHomepageChapters } from "@/contexts/HomepageChaptersContext";
import { AgriParkVisitModal } from "@/components/agri-park/AgriParkVisitModal";
import { LocationsModal } from "@/components/common/LocationsModal";
import { HomeChapterStatValue } from "@/components/home/HomeChapterStatValue";

export default function PillarsHorizontalParallax() {
  const { i18n } = useTranslation();
  const { whatsappUrl } = useSiteContact();
  const { pillars } = useHomepageChapters();
  const agronomistUrl = whatsappUrl("agronomist");
  const currentLang = i18n.language || "en";
  const isHindi = currentLang.startsWith("hi");
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [isLocationsModalOpen, setIsLocationsModalOpen] = useState(false);

  return (
    <>
      <section
        id="three-pillars"
        className="relative bg-[#f4f8f5] text-[#143d31] overflow-hidden scroll-mt-24 sm:scroll-mt-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-14 pb-8 sm:pb-12 lg:pb-14 space-y-16 sm:space-y-24 lg:space-y-28">
          {pillars.map((pillar, index) => {
            const isReversed = index % 2 === 1;
            const tag = isHindi ? pillar.tagHi : pillar.tagEn;
            const title = isHindi ? pillar.titleHi : pillar.titleEn;
            const description = isHindi ? pillar.descriptionHi : pillar.descriptionEn;
            const features = isHindi ? pillar.featuresHi : pillar.featuresEn;
            const ctaText = isHindi ? pillar.ctaTextHi : pillar.ctaTextEn;
            const imageAlt = isHindi ? pillar.imageAltHi : pillar.imageAltEn;
            const locationsBadge = isHindi ? pillar.locationsBadgeHi : pillar.locationsBadgeEn;
            const viewLocationsLabel = isHindi ? pillar.viewLocationsLabelHi : pillar.viewLocationsLabelEn;
            const showLocations = pillar.ctaType === "locations";

            return (
              <motion.div
                key={pillar.id}
                id={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center scroll-mt-28 sm:scroll-mt-32 md:scroll-mt-36"
              >
                <div
                  className={`col-span-12 lg:col-span-6 flex flex-col justify-center max-w-xl ${
                    isReversed ? "lg:order-2 lg:pl-4" : "lg:order-1 lg:pr-4"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
                    <span className="h-px w-6 bg-[#5d7d37]" aria-hidden="true" />
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                      {tag}
                    </p>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.12]">
                    {title}
                  </h2>

                  <p className="font-sans mt-3.5 text-sm sm:text-base text-[#4f624f] leading-relaxed font-normal">
                    {description}
                  </p>

                  <div className="my-6 border-y border-[#143d31]/10 py-4 grid grid-cols-3 gap-2">
                    {pillar.metrics.map((stat, mIdx) => {
                      const label = isHindi ? stat.labelHi : stat.labelEn;
                      return (
                        <div
                          key={label}
                          className={`text-left ${
                            mIdx > 0 ? "border-l border-[#143d31]/10 pl-3" : "first:border-l-0 first:pl-0"
                          }`}
                        >
                          <p className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#143d31] tracking-tight">
                            <HomeChapterStatValue stat={stat} isHindi={isHindi} />
                          </p>
                          <p className="font-mono text-[9px] sm:text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                            {label}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                    {features.map((feat) => (
                      <div
                        key={feat}
                        className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#143d31]"
                      >
                        <CheckCircle className="h-4 w-4 text-[#5d7d37] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {showLocations ? (
                      <>
                        <SlideUpPillButton
                          type="button"
                          onClick={() => setIsVisitModalOpen(true)}
                          variant="dark"
                          size="md"
                          label={ctaText}
                          icon={<ArrowRight className="h-4 w-4" />}
                          iconPosition="right"
                        />
                        {viewLocationsLabel && (
                          <button
                            type="button"
                            onClick={() => setIsLocationsModalOpen(true)}
                            className="inline-flex items-center gap-2 rounded-full border border-[#143d31]/20 bg-white/80 hover:bg-white hover:border-[#143d31] px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#143d31] shadow-xs transition-all duration-300 cursor-pointer"
                          >
                            <MapPin weight="fill" className="h-4 w-4 text-[#5d7d37]" />
                            <span>{viewLocationsLabel}</span>
                          </button>
                        )}
                      </>
                    ) : (
                      <SlideUpPillButton
                        href={pillar.ctaType === "whatsapp" ? agronomistUrl : undefined}
                        variant="dark"
                        size="md"
                        label={ctaText}
                        icon={<ArrowRight className="h-4 w-4" />}
                        iconPosition="right"
                      />
                    )}
                  </div>
                </div>

                <div
                  className={`col-span-12 lg:col-span-6 relative flex items-center justify-center ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="relative w-full flex items-center justify-center">
                    {showLocations && locationsBadge && (
                      <button
                        type="button"
                        onClick={() => setIsLocationsModalOpen(true)}
                        className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20 flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 border border-[#143d31]/15 shadow-md hover:shadow-lg hover:border-[#5d7d37] hover:scale-105 transition-all duration-300 group cursor-pointer"
                        title="Click to view all Agaate facilities on Google Maps"
                      >
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5d7d37] opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#5d7d37]" />
                        </span>
                        <MapPin weight="fill" className="h-4 w-4 text-[#143d31] group-hover:text-[#5d7d37] transition-colors" />
                        <div className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs font-bold text-[#143d31]">
                          <span>{locationsBadge}</span>
                          <ArrowSquareOut className="h-3.5 w-3.5 text-[#5d7d37] opacity-70 group-hover:opacity-100 transition-opacity ml-0.5" />
                        </div>
                      </button>
                    )}

                    <TiltCard maxTilt={4} glare={false} className="w-full">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="relative w-full flex items-center justify-center p-0"
                      >
                        <img
                          src={pillar.imageUrl}
                          alt={imageAlt}
                          className="w-full max-h-[380px] sm:max-h-[440px] lg:max-h-[480px] object-contain drop-shadow-xl"
                        />
                      </motion.div>
                    </TiltCard>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {isVisitModalOpen && (
        <AgriParkVisitModal isOpen={isVisitModalOpen} onClose={() => setIsVisitModalOpen(false)} />
      )}

      {isLocationsModalOpen && (
        <LocationsModal isOpen={isLocationsModalOpen} onClose={() => setIsLocationsModalOpen(false)} />
      )}
    </>
  );
}
