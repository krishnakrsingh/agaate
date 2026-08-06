import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Wifi, Battery, Signal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ImageItem {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface PhoneCarouselProps {
  images: ImageItem[];
  autoPlayInterval?: number;
  className?: string;
}

export function PhoneCarousel({
  images,
  autoPlayInterval = 4000,
  className = "",
}: PhoneCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState(false);

  const slideNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const slidePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (isPaused || autoPlayInterval <= 0) return;
    const timer = setInterval(() => {
      slideNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlayInterval, isPaused, slideNext]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <div
      className={`relative mx-auto flex flex-col items-center justify-center py-4 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Glow background effect */}
      <div className="absolute -inset-4 rounded-[3.5rem] bg-gradient-to-tr from-[#a3e635]/20 via-[#102c24]/30 to-[#476f2d]/20 blur-2xl opacity-70 pointer-events-none" />

      {/* Phone Frame Container */}
      <div className="relative w-[300px] sm:w-[320px] h-[610px] sm:h-[650px] rounded-[3.2rem] border-[10px] border-[#1c2b26] bg-[#0d1815] shadow-2xl shadow-black/60 ring-1 ring-white/10 overflow-hidden flex flex-col justify-between select-none">
        
        {/* Hardware side buttons */}
        <div className="absolute -left-[14px] top-24 h-10 w-1.5 rounded-l-sm bg-[#283832]" />
        <div className="absolute -left-[14px] top-38 h-12 w-1.5 rounded-l-sm bg-[#283832]" />
        <div className="absolute -left-[14px] top-54 h-12 w-1.5 rounded-l-sm bg-[#283832]" />
        <div className="absolute -right-[14px] top-32 h-16 w-1.5 rounded-r-sm bg-[#283832]" />

        {/* Dynamic Island / Top Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-40 flex items-center justify-between px-2.5 w-[110px] h-[26px] bg-black rounded-full shadow-md">
          <div className="h-3 w-3 rounded-full bg-[#0a1512] ring-1 ring-white/10 flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-[#1e3d33]" />
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 animate-pulse" />
          </div>
        </div>

        {/* Top Status Bar */}
        <div className="relative z-30 flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-medium text-white/80">
          <span>9:41</span>
          <div className="flex items-center gap-1.5 text-white/80">
            <Signal className="h-3 w-3" />
            <Wifi className="h-3 w-3" />
            <Battery className="h-3.5 w-3.5 fill-current" />
          </div>
        </div>

        {/* Display Viewport */}
        <div className="relative flex-1 overflow-hidden bg-[#0a1512] mx-1 my-1 rounded-[2.4rem] border border-white/5">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full flex flex-col"
            >
              {/* Screen Content Image */}
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={images[currentIndex]?.src}
                  alt={images[currentIndex]?.alt || `App screen ${currentIndex + 1}`}
                  className="w-full h-full object-cover object-top"
                />
                
                {/* Gradient overlay at bottom of screen */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex flex-col justify-end text-white">
                  <div className="flex items-center gap-1.5 text-[#a3e635] text-[11px] font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="h-3 w-3" />
                    <span>Agaate Agronomist App</span>
                  </div>
                  <p className="text-xs font-semibold line-clamp-2 text-white/95">
                    {images[currentIndex]?.alt}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Touch overlay overlay for swipe gesture visual */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/5 via-transparent to-black/20" />
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="relative z-30 flex items-center justify-center pb-2 pt-1">
          <div className="h-1 w-32 rounded-full bg-white/40" />
        </div>
      </div>

      {/* Carousel Controls & Indicators underneath */}
      <div className="mt-5 flex items-center gap-4 z-20">
        <Button
          variant="outline"
          size="icon"
          onClick={slidePrev}
          aria-label="Previous image"
          className="h-9 w-9 rounded-full border-white/20 bg-[#143d31]/80 text-white hover:bg-[#a3e635] hover:text-[#102c24] hover:border-[#a3e635] transition-all shadow-md"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Dot Indicators */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#102c24]/90 border border-white/10 shadow-inner">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-6 bg-[#a3e635]"
                  : "w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={slideNext}
          aria-label="Next image"
          className="h-9 w-9 rounded-full border-white/20 bg-[#143d31]/80 text-white hover:bg-[#a3e635] hover:text-[#102c24] hover:border-[#a3e635] transition-all shadow-md"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
