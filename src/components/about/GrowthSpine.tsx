import { useRef } from "react";
import {
  Plant
} from "@phosphor-icons/react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Signature scroll-linked growth spine.
 * Thin vertical rail that "grows" as the about page is scrolled.
 * Desktop-only; static fill when prefers-reduced-motion.
 */
export default function GrowthSpine() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });
  const scaleY = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-20 hidden lg:block"
      aria-hidden="true"
    >
      <div className="sticky top-0 flex h-screen w-10 items-stretch py-28 xl:w-14">
        <div className="relative mx-auto h-full w-px bg-forest/12">
          {reduced ? (
            <div className="absolute inset-x-0 top-0 h-full w-px bg-gradient-to-b from-moss via-forest to-terracotta opacity-60" />
          ) : (
            <motion.div
              className="absolute inset-x-0 top-0 h-full w-px origin-top bg-gradient-to-b from-moss via-forest to-terracotta"
              style={{ scaleY }}
            />
          )}

          {/* Root node */}
          <div className="absolute -left-[5px] top-0 flex h-3 w-3 items-center justify-center rounded-full bg-forest-deep ring-2 ring-cream">
            <span className="h-1.5 w-1.5 rounded-full bg-moss" />
          </div>

          {/* Mid markers */}
          {[0.2, 0.4, 0.6, 0.8].map((t) => (
            <div
              key={t}
              className="absolute -left-[3.5px] h-2 w-2 rounded-full border border-forest/25 bg-cream"
              style={{ top: `${t * 100}%` }}
            />
          ))}

          {/* Plant tip */}
          <div className="absolute -bottom-0.5 -left-[7px] flex h-4 w-4 items-center justify-center rounded-full bg-moss text-cream shadow-sm">
            <Plant className="h-2.5 w-2.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
