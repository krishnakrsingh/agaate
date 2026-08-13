import {
  Plant
} from "@phosphor-icons/react";
import {
  AnimatedHeadline,
  Marquee,
  Reveal,
} from "@/components/common/motion";
import { marqueePhrases, mission } from "./data";

export default function MissionSection() {
  return (
    <section
      id="mission"
      className="relative overflow-hidden bg-forest-deep text-cream"
      aria-labelledby="mission-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-cream)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-10" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center md:py-28 lg:px-12">
        <Reveal variant="fade-up">
          <p className="mb-4 font-jet text-[10px] font-bold uppercase tracking-[0.22em] text-terracotta">
            {mission.eyebrow}
          </p>
          <h2 id="mission-heading" className="sr-only">
            {mission.title}
          </h2>
          <AnimatedHeadline
            as="p"
            text={mission.title}
            highlight={(w) =>
              w.toLowerCase().startsWith("better") || w.toLowerCase().startsWith("tomorrow")
            }
            className="font-serif text-4xl font-bold tracking-tight text-cream md:text-6xl"
          />
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-cream/80 md:text-lg">
            {mission.body}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream/60 md:text-base">
            {mission.support}
          </p>
        </Reveal>
      </div>

      <Marquee duration={32} className="relative z-10 border-t border-cream/10 py-4">
        <span className="flex items-center gap-10">
          {marqueePhrases.map((phrase) => (
            <span key={phrase} className="flex items-center gap-10">
              <span className="font-serif text-xl italic text-cream/90 md:text-2xl">{phrase}</span>
              <Plant className="h-4 w-4 text-moss" />
            </span>
          ))}
        </span>
      </Marquee>
    </section>
  );
}
