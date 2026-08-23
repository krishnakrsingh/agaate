import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CaretLeft,
  CaretRight,
  CheckCircle,
  Star,
} from "@phosphor-icons/react";
import { EASE } from "@/components/common/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { FarmerShortItem } from "@/data/farmerShortsData";

const ROTATE_MS = 6500;

type RotatingTestimonialCardProps = {
  stories: FarmerShortItem[];
  tapHint?: string;
};

export function RotatingTestimonialCard({
  stories,
}: RotatingTestimonialCardProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cycleStartRef = useRef(Date.now());

  const advance = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % stories.length);
    setProgress(0);
    cycleStartRef.current = Date.now();
  }, [stories.length]);

  const prevStory = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + stories.length) % stories.length);
    setProgress(0);
    cycleStartRef.current = Date.now();
  }, [stories.length]);

  useEffect(() => {
    if (stories.length <= 1 || paused || reducedMotion) return;

    cycleStartRef.current = Date.now();
    setProgress(0);

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - cycleStartRef.current;
      setProgress(Math.min(elapsed / ROTATE_MS, 1));
    }, 40);

    timerRef.current = setTimeout(advance, ROTATE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [index, paused, reducedMotion, stories.length, advance]);

  if (!stories.length) return null;

  const story = stories[index]!;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative flex h-[380px] sm:h-[400px] w-full flex-col justify-between rounded-2xl sm:rounded-3xl border border-[#143d31]/10 bg-white p-6 sm:p-7 shadow-xs hover:border-[#5d7d37]/30 hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      {/* Subtle Background Radial Glow */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(163,230,53,0.12),transparent_70%)]"
        aria-hidden="true"
      />

      {/* Top Section: Segmented Story Bars + Rating */}
      <div className="space-y-4">
        {/* Story Progress Segmented Bars */}
        {stories.length > 1 && (
          <div className="grid grid-flow-col auto-cols-fr gap-1.5" aria-hidden="true">
            {stories.map((s, i) => (
              <div
                key={s.id}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                  setProgress(0);
                  cycleStartRef.current = Date.now();
                }}
                className="h-1 rounded-full bg-[#143d31]/10 overflow-hidden cursor-pointer"
              >
                <div
                  className="h-full bg-[#5d7d37] transition-all duration-100"
                  style={{
                    width:
                      i === index
                        ? `${progress * 100}%`
                        : i < index
                          ? "100%"
                          : "0%",
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Rating and Verification */}
        <div className="flex items-center gap-1.5 pt-1">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 text-amber-500 fill-amber-500"
                weight="fill"
              />
            ))}
          </div>
          <span className="font-mono text-xs font-bold text-[#143d31]">5.0</span>
          <span className="text-[11px] font-sans font-medium text-[#536253]">
            · Verified Farmer
          </span>
        </div>
      </div>

      {/* Main Testimonial Body with Animation */}
      <div className="my-auto py-2">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={story.id}
            custom={direction}
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <blockquote className="font-display italic text-lg sm:text-xl lg:text-[21px] font-normal text-[#143d31] leading-snug tracking-tight">
              “{story.quote}”
            </blockquote>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Profile Lockup & Controls */}
      <div className="flex items-center justify-between gap-4 border-t border-[#143d31]/10 pt-4">
        {/* Author Details */}
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={story.thumbnail}
            alt={story.name}
            className="h-12 w-12 sm:h-13 sm:w-13 shrink-0 rounded-full border-2 border-white object-cover shadow-xs ring-1 ring-[#143d31]/15"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="truncate font-display text-base font-bold text-[#143d31] leading-tight">
                {story.name}
              </p>
              <CheckCircle
                className="h-4 w-4 shrink-0 text-[#5d7d37]"
                weight="fill"
              />
            </div>
            <p className="truncate font-sans text-xs text-[#536253] mt-0.5">
              {story.location}
            </p>
            <p className="truncate font-mono text-[10.5px] font-semibold text-[#5d7d37] mt-0.5">
              🌱 {story.crop} ({story.acres})
            </p>
          </div>
        </div>

        {/* Story Switcher Buttons */}
        {stories.length > 1 && (
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={prevStory}
              aria-label="Previous story"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#143d31]/15 text-[#143d31] hover:bg-[#143d31] hover:text-white transition-colors cursor-pointer"
            >
              <CaretLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={advance}
              aria-label="Next story"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#143d31]/15 text-[#143d31] hover:bg-[#143d31] hover:text-white transition-colors cursor-pointer"
            >
              <CaretRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

