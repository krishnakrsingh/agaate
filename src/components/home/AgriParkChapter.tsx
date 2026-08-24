import { useAgriParkChapter } from "@/contexts/AgriParkChapterContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  Compass,
  MapPin,
  MagnifyingGlassPlus,
  X,
  Play,
} from "@phosphor-icons/react";
import { useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18n";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import { CountUp, EASE } from "@/components/common/motion";
import { AgriParkVisitModal } from "@/components/agri-park/AgriParkVisitModal";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
import { VideoPlayerModal } from "@/components/ui/VideoPlayerModal";
import type { HomeCmsAgriParkTour } from "@/lib/cms-types";
import { DEFAULT_HOME_CMS_AGRI_PARK_TOUR } from "@/lib/cms-types";

type AgriParkChapterProps = {
  agriParkTour?: HomeCmsAgriParkTour;
};

export default function AgriParkChapter({ agriParkTour }: AgriParkChapterProps) {
  const chapter = useAgriParkChapter();
  const [isVisitModalOpen, setIsVisitModalOpen] = useState<boolean>(false);
  const [isMapZoomOpen, setIsMapZoomOpen] = useState<boolean>(false);
  const [isTourVideoOpen, setIsTourVideoOpen] = useState<boolean>(false);

  const { i18n } = useTranslation();
  const { locale } = useParams({ strict: false }) as any;
  const currentLang = locale ?? i18n.language ?? "en";
  const isHindi = currentLang.startsWith("hi");
  const sectionRef = useHomeChapterReveal("fade-up");
  const tourMedia = agriParkTour ?? DEFAULT_HOME_CMS_AGRI_PARK_TOUR;

  const checklistItems = isHindi ? chapter.checklistHi : chapter.checklistEn;
  const mapAlt = isHindi ? chapter.mapAltHi : chapter.mapAltEn;

  return (
    <>
      <section
        ref={sectionRef}
        id="agri-park"
        className="relative scroll-mt-20 overflow-hidden bg-[#f4f8f5] py-16 sm:py-20 md:py-24 border-t border-[#143d31]/10 text-[#143d31]"
      >
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Headline, Narrative, Metrics Strip & Actions */}
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
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                  {isHindi ? chapter.badgeHi : chapter.badgeEn}
                </p>
              </div>

              {/* Display Headline */}
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.1]">
                {isHindi ? chapter.titleHi : chapter.titleEn}
              </h2>

              <p className="font-sans mt-3 text-sm sm:text-base text-[#4f624f] leading-relaxed font-normal">
                {isHindi ? chapter.descriptionHi : chapter.descriptionEn}
              </p>

              <div className="my-6 border-y border-[#143d31]/10 py-4 grid grid-cols-3 gap-2">
                {chapter.stats.map((stat, idx) => {
                  const label = isHindi ? stat.labelHi : stat.labelEn;
                  const suffix = isHindi ? stat.suffixHi : stat.suffixEn;
                  return (
                    <div
                      key={label}
                      className={idx > 0 ? "text-left border-l border-[#143d31]/10 pl-3" : "text-left first:border-l-0 first:pl-0"}
                    >
                      <p className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                        <CountUp to={stat.numValue} suffix={suffix} />
                      </p>
                      <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                        {label}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Feature Highlights Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {checklistItems.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#143d31]"
                  >
                    <CheckCircle className="h-4 w-4 text-[#143d31] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <SlideUpPillButton
                  onClick={() => setIsVisitModalOpen(true)}
                  variant="dark"
                  size="md"
                  label={isHindi ? chapter.bookVisitLabelHi : chapter.bookVisitLabelEn}
                  icon={<Calendar className="h-4 w-4" />}
                  iconPosition="left"
                />

                <SlideUpPillButton
                  onClick={() => setIsTourVideoOpen(true)}
                  variant="outline"
                  size="md"
                  label={isHindi ? chapter.watchTourLabelHi : chapter.watchTourLabelEn}
                  icon={<Play className="h-4 w-4 text-[#5d7d37]" weight="fill" />}
                  iconPosition="left"
                />
              </div>
            </motion.div>

            {/* Right Column: Clean, High-Impact Floating 3D Visual */}
            <motion.div
              className="lg:col-span-6 relative flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div className="relative w-full max-w-xl group flex flex-col items-center">
                {/* Top Location Badge */}
                <div className="w-full flex items-center justify-end mb-3 px-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-mono font-bold text-[#143d31] backdrop-blur-md shadow-sm border border-[#143d31]/10">
                    <MapPin className="h-3.5 w-3.5 text-[#5d7d37]" weight="fill" />
                    <span>{isHindi ? chapter.locationBadgeHi : chapter.locationBadgeEn}</span>
                  </div>
                </div>

                {/* Floating 3D Transparent Model */}
                <div
                  onClick={() => setIsMapZoomOpen(true)}
                  className="relative w-full cursor-pointer transition-transform duration-500 group-hover:scale-[1.02] flex items-center justify-center p-2"
                >
                  <img
                    src={chapter.mapImageUrl}
                    alt={mapAlt}
                    className="w-full h-auto max-h-[460px] object-contain"
                  />

                  {/* Hover Enlarge Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#143d31]/90 backdrop-blur-md px-4 py-1.5 text-xs font-mono font-bold text-white shadow-xl border border-white/20">
                      <MagnifyingGlassPlus className="h-4 w-4 text-[#a3e635]" />
                      <span>{isHindi ? "बड़ा करके देखें" : "Click to Enlarge Layout"}</span>
                    </span>
                  </div>
                </div>

                {/* Subtitle Under Model */}
                <p className="font-mono text-[11px] text-[#5d7d37] font-semibold tracking-wider text-center mt-2">
                  {isHindi
                    ? "5-एकड़ बहुस्तरीय फार्म · PI · Koppert · Coromandel · T.Stanes · Agaate"
                    : "5-ACRE MULTI-LAYER PROVING GROUND · PI · KOPPERT · COROMANDEL · T.STANES · AGAATE"}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* High-Resolution Map Lightbox Modal */}
      <AnimatePresence>
        {isMapZoomOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/20 flex flex-col text-white max-h-[92vh]"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/70">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-[#a3e635] animate-pulse" />
                  <p className="font-mono text-xs uppercase font-bold text-[#a3e635] tracking-wider">
                    {isHindi
                      ? "अगाते एग्री पार्क — 5-एकड़ विस्तृत मास्टर लेआउट"
                      : "AGAATE AGRI PARK — 5-ACRE MASTER PLOT & PARTNER BLUEPRINT"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMapZoomOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="relative flex-1 overflow-auto p-2 bg-black flex items-center justify-center">
                <img
                  src={chapter.mapImageUrl}
                  alt={mapAlt}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <VideoPlayerModal
        open={isTourVideoOpen}
        onClose={() => setIsTourVideoOpen(false)}
        src={tourMedia.videoUrl}
        poster={tourMedia.posterUrl}
        title={
          isHindi
            ? "एग्री पार्क व स्मार्ट नर्सरी वीडियो टूर"
            : "Agri Park & Smart Nursery Video Tour"
        }
      />

      {/* Interactive VIP Farm Visit Booking Modal */}
      <AgriParkVisitModal
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
      />
    </>
  );
}
