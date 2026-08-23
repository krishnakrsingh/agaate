import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CaretLeft,
  CaretRight,
  Play,
  X,
  WhatsappLogo,
  SpeakerHigh,
  SpeakerSlash,
  Plant,
} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { EASE } from "@/components/common/motion";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
import {
  SHORTS_DATA_EN,
  SHORTS_DATA_HI,
  type FarmerShortItem,
} from "@/data/farmerShortsData";
import type { HomeCmsStory } from "@/lib/cms-types";
import { RotatingTestimonialCard } from "./RotatingTestimonialCard";
import { EmbedVideoPlayer } from "@/components/ui/EmbedVideoPlayer";
import { parseVideoSource } from "@/lib/video-source";

export default function FarmerShortsShowcase({
  storiesEn,
  storiesHi,
}: {
  storiesEn?: HomeCmsStory[];
  storiesHi?: HomeCmsStory[];
}) {
  const { i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");
  const enData = storiesEn ?? SHORTS_DATA_EN;
  const hiData = storiesHi ?? SHORTS_DATA_HI;
  const shortsData: FarmerShortItem[] = (isHindi ? hiData : enData).map((s) => ({
    id: s.id,
    name: s.name,
    role: s.role,
    location: s.location,
    acres: s.acres,
    crop: s.crop,
    quote: s.quote,
    thumbnail: s.thumbnail,
    videoUrl: s.videoUrl,
    badge: s.badge,
  }));

  const [activeModalShort, setActiveModalShort] = useState<FarmerShortItem | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);


  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.7;
      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleOpenShort = useCallback((short: FarmerShortItem) => {
    setActiveModalShort(short);
  }, []);

  const handleNextModalShort = useCallback(() => {
    if (!activeModalShort) return;
    const currentIndex = shortsData.findIndex((s) => s.id === activeModalShort.id);
    const nextIndex = (currentIndex + 1) % shortsData.length;
    setActiveModalShort(shortsData[nextIndex] ?? null);
  }, [activeModalShort, shortsData]);

  const handlePrevModalShort = useCallback(() => {
    if (!activeModalShort) return;
    const currentIndex = shortsData.findIndex((s) => s.id === activeModalShort.id);
    const prevIndex = (currentIndex - 1 + shortsData.length) % shortsData.length;
    setActiveModalShort(shortsData[prevIndex] ?? null);
  }, [activeModalShort, shortsData]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModalShort) return;
      if (e.key === "Escape") setActiveModalShort(null);
      if (e.key === "ArrowRight") handleNextModalShort();
      if (e.key === "ArrowLeft") handlePrevModalShort();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalShort, handleNextModalShort, handlePrevModalShort]);

  return (
    <div className="space-y-6">
      {/* ── 1. Header with Title on Left & Carousel Controls on Right ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
              {isHindi ? "किसान अनुभव व वीडियो शॉर्ट्स" : "Farmer Stories & Video Shorts"}
            </p>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#143d31] tracking-tight leading-[1.1]">
            {isHindi
              ? "खेत से सीधे किसानों की वास्तविक आवाज"
              : "Real Farmers. Real Ground Results."}
          </h2>
        </div>

        {/* Top Right Actions: Carousel Controls & WhatsApp Share */}
        <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0">
          <div className="flex items-center gap-1 bg-white border border-[#143d31]/15 rounded-full p-1 shadow-xs">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#143d31] hover:bg-[#143d31] hover:text-white transition-colors cursor-pointer"
            >
              <CaretLeft className="h-4 w-4" />
            </button>
            <span className="h-3.5 w-px bg-[#143d31]/15" />
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#143d31] hover:bg-[#143d31] hover:text-white transition-colors cursor-pointer"
            >
              <CaretRight className="h-4 w-4" />
            </button>
          </div>

          <SlideUpPillButton
            href="https://wa.me/918350085005?text=Namaste%20Agaate%20Team%2C%20I%20want%20to%20share%20my%20farm%20story."
            target="_blank"
            rel="noopener noreferrer"
            variant="dark"
            size="sm"
            label={isHindi ? "अपनी कहानी साझा करें" : "Share Your Story"}
            icon={<WhatsappLogo className="h-4 w-4" weight="fill" />}
            iconPosition="left"
          />
        </div>
      </div>

      {/* ── 2. Split Content: Subtexts/Metrics on Left & Video Track on Right ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Left: single auto-rotating testimonial card (CMS-driven) */}
        <div className="lg:col-span-5 flex flex-col justify-stretch">
          <RotatingTestimonialCard
            stories={shortsData}
            tapHint={isHindi ? "अगली कहानी के लिए टैप करें" : "Tap for next story"}
          />
        </div>

        {/* Right Horizontal Scrolling Video Reels (7 Cols) */}
        <div className="lg:col-span-7 min-w-0 relative flex flex-col justify-stretch">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto pb-1 pt-0.5 snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: "none" }}
          >
            {shortsData.map((short) => (
              <div
                key={short.id}
                onClick={() => handleOpenShort(short)}
                className="group relative w-[215px] sm:w-[235px] md:w-[245px] shrink-0 h-[380px] sm:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 snap-start border border-[#143d31]/15 bg-[#0e2720]"
              >
                {/* Poster Image */}
                <img
                  src={short.thumbnail}
                  alt={short.name}
                  className="h-full w-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />

                {/* Top Badge Pill */}
                {short.badge && (
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10.5px] font-mono font-bold text-[#a3e635] border border-white/15 shadow-sm">
                      <Plant className="h-3 w-3" weight="fill" />
                      <span>{short.badge}</span>
                    </span>
                  </div>
                )}

                {/* Center Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white shadow-lg group-hover:scale-115 group-hover:bg-[#a3e635] group-hover:text-[#143d31] transition-all duration-300">
                    <Play className="h-5 w-5 ml-0.5" weight="fill" />
                  </div>
                </div>

                {/* Bottom Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-4.5 z-10 space-y-0.5 text-white">
                  <p className="font-display text-[15px] font-bold text-white leading-tight truncate">
                    {short.name}
                  </p>
                  <p className="font-sans text-[11px] text-white/80 truncate">
                    {short.location}
                  </p>
                  <p className="font-mono text-[11px] font-semibold text-[#a3e635] truncate">
                    {short.crop}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Fullscreen Interactive Shorts Video Modal ── */}
      <AnimatePresence>
        {activeModalShort && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="relative w-full max-w-[380px] aspect-[9/16] max-h-[82vh] rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/15 flex flex-col justify-between"
            >
              {/* Video Player Element */}
              <div className="relative w-full h-full">
                {activeModalShort.videoUrl ? (
                  <EmbedVideoPlayer
                    videoUrl={activeModalShort.videoUrl}
                    poster={activeModalShort.thumbnail}
                    muted={isMuted}
                    loop
                    autoPlay
                  />
                ) : (
                  <img
                    src={activeModalShort.thumbnail}
                    alt={activeModalShort.name}
                    className="w-full h-full object-cover"
                  />
                )}

                {parseVideoSource(activeModalShort.videoUrl).type === "unknown" &&
                  activeModalShort.videoUrl && (
                    <a
                      href={activeModalShort.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 text-sm font-semibold text-white"
                    >
                      Open video
                    </a>
                  )}

                {/* Ambient Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60 pointer-events-none" />

                {/* Top Control Bar with Badge */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20">
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono font-bold text-[#a3e635] border border-white/10">
                    <Plant className="h-3 w-3" weight="fill" />
                    <span>{activeModalShort.badge || activeModalShort.crop}</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-white/20 transition-colors cursor-pointer"
                      aria-label="Toggle Sound"
                    >
                      {isMuted ? (
                        <SpeakerSlash className="h-3.5 w-3.5" />
                      ) : (
                        <SpeakerHigh className="h-3.5 w-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveModalShort(null)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-white/20 transition-colors cursor-pointer"
                      aria-label="Close modal"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Modal Navigation Arrows (Left/Right) */}
                <button
                  type="button"
                  onClick={handlePrevModalShort}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/70 transition-colors cursor-pointer"
                  aria-label="Previous story"
                >
                  <CaretLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextModalShort}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/70 transition-colors cursor-pointer"
                  aria-label="Next story"
                >
                  <CaretRight className="h-4 w-4" />
                </button>

                {/* Bottom Story Card Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-5 z-20 space-y-2.5 text-white">
                  <div>
                    <p className="font-display text-base font-bold text-white">
                      {activeModalShort.name}
                    </p>
                    <p className="font-sans text-xs text-white/80">
                      {activeModalShort.location}
                    </p>
                  </div>

                  <p className="font-sans text-xs text-white/95 leading-relaxed italic bg-black/40 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                    "{activeModalShort.quote}"
                  </p>

                  {/* Connect with Agronomist Action */}
                  <div className="pt-0.5">
                    <SlideUpPillButton
                      href={`https://wa.me/918350085005?text=Hello%20Agaate%20Team%2C%20I%20saw%20${encodeURIComponent(
                        activeModalShort.name,
                      )}%27s%20story%20on%20${encodeURIComponent(activeModalShort.crop)}%20and%20want%20guidance.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="lime"
                      size="sm"
                      fullWidth
                      label={isHindi ? "इस फसल के बारे में पूछें" : "Ask About This Crop"}
                      icon={<WhatsappLogo className="h-4 w-4" weight="fill" />}
                      iconPosition="left"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
