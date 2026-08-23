import { CheckCircle } from "@phosphor-icons/react";
import { Reveal } from "@/components/common/motion";
import { milestones } from "./data";

export default function MilestonesSection() {
  return (
    <section
      id="milestones"
      aria-labelledby="milestones-heading"
      className="relative overflow-hidden border-b border-[#143d31]/10 bg-[#f4f8f5] py-16 sm:py-20 md:py-24 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-12">
        {/* Section Header */}
        <Reveal variant="fade-up" className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
              Our Journey &amp; Milestones
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              id="milestones-heading"
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#143d31] tracking-tight leading-[1.1] max-w-2xl"
            >
              From seed to sale —{" "}
              <span className="text-[#5d7d37]">
                building India's agri infrastructure
              </span>
            </h2>

            <p className="font-sans text-[#4f624f] text-sm sm:text-base max-w-md leading-relaxed">
              Three years of verified progress — from a 1-acre trial plot to a 5-acre Smart Nursery,
              India's first Agri Park, and a Carbon Credit program for sustainable farming.
            </p>
          </div>
        </Reveal>

        {/* 3-Column Milestone Journey Grid */}
        <Reveal variant="fade-up" delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#143d31]/10 border-y border-[#143d31]/10 py-2">
            {milestones.map((m, idx) => (
              <div
                key={m.year}
                className="p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:bg-white/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#143d31] tracking-tight">
                      {m.year}
                    </span>
                    <span className="rounded-full bg-[#143d31]/5 border border-[#143d31]/10 px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">
                      Phase 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#143d31] tracking-tight">
                    {m.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#4f624f]">
                    {m.desc}
                  </p>

                  {/* Key Highlights */}
                  {m.highlights && (
                    <ul className="space-y-1.5 pt-1">
                      {m.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-xs text-[#143d31]/80">
                          <CheckCircle weight="fill" className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#5d7d37]" />
                          <span className="leading-snug">{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

