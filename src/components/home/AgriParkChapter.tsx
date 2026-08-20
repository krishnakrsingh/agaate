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

export default function AgriParkChapter() {
  const [isVisitModalOpen, setIsVisitModalOpen] = useState<boolean>(false);
  const [isMapZoomOpen, setIsMapZoomOpen] = useState<boolean>(false);
  const [isTourVideoOpen, setIsTourVideoOpen] = useState<boolean>(false);

  const { i18n } = useTranslation();
  const { locale } = useParams({ strict: false }) as any;
  const currentLang = locale ?? i18n.language ?? "en";
  const isHindi = currentLang.startsWith("hi");
  const sectionRef = useHomeChapterReveal("fade-up");

  const checklistItems = isHindi
    ? [
      "5 एकड़ बहुस्तरीय अनुसंधान और प्रदर्शन प्लॉट",
      "PI, Koppert, Coromandel, T.Stanes ब्रांड ट्रायल्स",
      "स्मार्ट ड्रिप ऑटोमेशन व फर्टीगेशन तकनीक",
      "किसानों के लिए निःशुल्क व्यावहारिक मास्टरक्लास",
    ]
    : [
      "5-Acre Multi-Layer Proving & Demonstration Plots",
      "Live Partner Trials: PI, Koppert, Coromandel, T.Stanes",
      "Automated drip & precision fertigation setups",
      "Hands-on farmer training & masterclasses",
    ];

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
                  {isHindi ? "03 · 5-एकड़ एग्री पार्क" : "03 · 5-Acre Agri Park"}
                </p>
              </div>

              {/* Display Headline */}
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.1]">
                {isHindi
                  ? "5 एकड़ का जीवित फार्म — हर समाधान जमीन पर प्रमाणित"
                  : "5-Acre Living Proving Ground for Modern Farming"}
              </h2>

              {/* Subtext Description */}
              <p className="font-sans mt-3 text-sm sm:text-base text-[#4f624f] leading-relaxed font-normal">
                {isHindi
                  ? "गुरुग्राम (NH-8) में 5 एकड़ का खुला अनुसंधान व बहुस्तरीय कृषि केंद्र। PI Industries, Koppert, Coromandel, T.Stanes और अगाते प्रैक्टिसेज के लाइव हाइब्रिड बीज, ड्रिप ऑटोमेशन व जैविक परीक्षण।"
                  : "Our 5-acre proving ground in Gurugram features live demonstration plots with global partners (PI Industries, Koppert, Coromandel, T.Stanes) testing seed genetics, drip automation, and multi-layer farming."}
              </p>

              {/* Metrics Strip (Line-Type Design) */}
              <div className="my-6 border-y border-[#143d31]/10 py-4 grid grid-cols-3 gap-2">
                <div className="text-left first:border-l-0 first:pl-0">
                  <p className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                    <CountUp to={5} suffix=" Acres" />
                  </p>
                  <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                    {isHindi ? "जीवित रिसर्च फार्म" : "Live Farm Proving"}
                  </p>
                </div>
                <div className="text-left border-l border-[#143d31]/10 pl-3">
                  <p className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                    <CountUp to={98} suffix="%" />
                  </p>
                  <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                    {isHindi ? "नर्सरी जमाव दर" : "Sapling Survival"}
                  </p>
                </div>
                <div className="text-left border-l border-[#143d31]/10 pl-3">
                  <p className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                    <CountUp to={2000} suffix="+" />
                  </p>
                  <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                    {isHindi ? "प्रशिक्षित किसान" : "Farmers Trained"}
                  </p>
                </div>
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
                  label={isHindi ? "विजिट शेड्यूल करें" : "Book VIP Farm Visit"}
                  icon={<Calendar className="h-4 w-4" />}
                  iconPosition="left"
                />

                <SlideUpPillButton
                  to={getLocalizedPath("/agri-park", currentLang)}
                  variant="outline"
                  size="md"
                  label={isHindi ? "पूरा 8-ज़ोन मॉडल देखें" : "Explore Agri Park"}
                  icon={<Compass className="h-4 w-4" />}
                  iconPosition="left"
                />
              </div>
            </motion.div>

            {/* Right Column: Clean, High-Impact Master Visual */}
            <motion.div
              className="lg:col-span-6 relative flex flex-col justify-center"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div
                onClick={() => setIsMapZoomOpen(true)}
                className="relative overflow-hidden rounded-2xl border border-[#143d31]/20 shadow-xl group aspect-[16/9] sm:aspect-[16/10] cursor-pointer bg-[#05110d]"
              >
                <img
                  src="/images/agri-park-map.webp"
                  alt="Agaate Agri Park 5-Acre Master Layout & Partner Plots"
                  className="h-full w-full object-contain sm:object-cover group-hover:scale-102 transition-transform duration-700"
                />

                {/* Top Location & Action Badges */}
                <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-mono font-bold text-[#143d31] backdrop-blur-md shadow-xs border border-[#143d31]/10">
                    <MapPin className="h-3.5 w-3.5 text-[#5d7d37]" weight="fill" />
                    <span>
                      {isHindi ? "कुकरोला, गुरुग्राम (NH-8)" : "Kukrola, Gurugram (NH-8)"}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-[#143d31]/90 backdrop-blur-md px-3 py-1 text-[10px] font-mono font-bold text-[#a3e635] border border-[#a3e635]/30 shadow-xs">
                    <MagnifyingGlassPlus className="h-3 w-3" />
                    <span>{isHindi ? "फुल लेआउट ज़ूम करें" : "Click to Enlarge"}</span>
                  </span>
                </div>

                {/* Center Hover Zoom Cue */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/20 backdrop-blur-[1px]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#143d31] shadow-lg">
                    <MagnifyingGlassPlus className="h-6 w-6 text-[#143d31]" />
                  </div>
                </div>

                {/* Bottom Card Overlay Pill */}
                <div className="absolute bottom-3 left-3 right-3 bg-[#143d31]/85 backdrop-blur-md p-3 rounded-xl border border-white/10 text-white flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[9px] uppercase font-bold text-[#a3e635] tracking-widest">
                      {isHindi ? "5-एकड़ बहुस्तरीय फार्म लेआउट" : "5-ACRE MULTI-LAYER PROVING GROUND"}
                    </p>
                    <p className="font-sans text-xs font-semibold text-white/95 mt-0.5">
                      PI · Koppert · Coromandel · T.Stanes · Agaate Plots
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsTourVideoOpen(true);
                    }}
                    className="inline-flex items-center gap-1 rounded-lg bg-[#a3e635] hover:bg-[#86efac] text-[#143d31] px-2.5 py-1 text-[11px] font-mono font-bold transition-colors cursor-pointer shrink-0"
                  >
                    <Play className="h-3 w-3" weight="fill" />
                    <span>{isHindi ? "वीडियो टूर" : "Video Tour"}</span>
                  </button>
                </div>
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
                  src="/images/agri-park-map.webp"
                  alt="Agaate Agri Park 5-Acre Master Layout Full Blueprint"
                  className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 17-Acre Farm Tour Video Modal */}
      <AnimatePresence>
        {isTourVideoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/20 flex flex-col text-white"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/70">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-[#a3e635] animate-pulse" />
                  <p className="font-mono text-xs uppercase font-bold text-[#a3e635] tracking-wider">
                    {isHindi ? "एग्री पार्क व स्मार्ट नर्सरी वीडियो टूर" : "AGRI PARK & SMART NURSERY VIDEO TOUR"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTourVideoOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="relative aspect-video w-full bg-black">
                <video
                  src="/videos/farm-first-look.mp4"
                  poster="/videos/posters/farm-first-look.webp"
                  autoPlay
                  controls
                  playsInline
                  className="h-full w-full object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive VIP Farm Visit Booking Modal */}
      <AgriParkVisitModal
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
      />
    </>
  );
}
