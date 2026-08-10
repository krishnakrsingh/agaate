import { useState } from "react";
import { Reveal, SectionHeader } from "@/components/common/motion";
import { milestones } from "./data";

export default function JourneyTimeline() {
  const [activeMilestone, setActiveMilestone] = useState(0);

  return (
    <section
      id="journey"
      className="relative overflow-hidden border-t border-border bg-bone py-20 px-6 md:py-28 lg:px-12"
      aria-labelledby="journey-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-forest)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-5" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Our Journey"
          title={<span id="journey-heading">How we built the ecosystem.</span>}
          description="From a 1-acre experimental nursery in 2024 to a 17-acre Smart Nursery, 15,000+ associated acres, and India's first Agri Park."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3" role="list">
          {milestones.map((m, idx) => {
            const active = activeMilestone === idx;
            return (
              <Reveal key={m.year} variant="fade-up" delay={idx * 0.1}>
                <button
                  type="button"
                  role="listitem"
                  onClick={() => setActiveMilestone(idx)}
                  aria-pressed={active}
                  className={`group relative h-full w-full rounded-[2.5rem] border p-8 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 ${
                    active
                      ? "border-forest bg-forest text-cream shadow-lg"
                      : "border-border bg-card text-forest-deep hover:border-forest/30"
                  }`}
                >
                  <span
                    className={`font-serif text-5xl font-bold ${
                      active ? "text-terracotta" : "text-forest/30"
                    }`}
                  >
                    {m.year}
                  </span>
                  <h3
                    className={`mt-3 font-serif text-2xl font-bold ${
                      active ? "text-cream" : "text-forest-deep"
                    }`}
                  >
                    {m.title}
                  </h3>
                  <p
                    className={`mt-3 text-xs leading-relaxed ${
                      active ? "text-cream/80" : "text-forest/70"
                    }`}
                  >
                    {m.desc}
                  </p>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
