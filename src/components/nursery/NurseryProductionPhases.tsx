import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle } from "@phosphor-icons/react";
import { EASE, SectionHeader } from "@/components/common/motion";
import { PHASES } from "./nursery-data";

export function NurseryProductionPhases() {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const activePhase = PHASES[activePhaseIndex];

  return (
    <section id="nursery-phases" className="scroll-mt-28">
      <SectionHeader
        align="center"
        eyebrow="BIO-CONTROLLED CULTIVATION"
        title="The 4-Phase Propagation Standard."
        description="Every seedling is tracked through sterile emergence, biological root coating, and temperature-controlled logistics."
      />

      <div className="mt-12 rounded-[2.5rem] border border-border bg-card p-6 shadow-sm md:p-10">
        {/* Phase Selector Tabs */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PHASES.map((p, idx) => {
            const isActive = activePhaseIndex === idx;
            const PhaseIcon = p.icon;
            return (
              <button
                key={p.phase}
                type="button"
                onClick={() => setActivePhaseIndex(idx)}
                className={`relative flex cursor-pointer flex-col items-center justify-center rounded-2xl p-4 text-center transition-all ${
                  isActive
                    ? "bg-forest-deep text-cream shadow-md"
                    : "border border-border bg-bone text-forest/80 hover:border-forest/40"
                }`}
              >
                <span
                  className={`font-mono text-[9px] font-bold ${
                    isActive ? "text-terracotta" : "text-forest/40"
                  }`}
                >
                  PHASE {p.phase}
                </span>
                <PhaseIcon className="my-2 h-6 w-6" />
                <span className="font-serif text-xs font-bold leading-tight">{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Phase Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase.phase}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mt-8 rounded-3xl border border-forest/15 bg-bone p-6 shadow-sm md:p-8"
          >
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-8">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-forest-deep px-3 py-1 font-mono text-xs font-bold text-cream">
                    Phase {activePhase.phase} of 04
                  </span>
                  <span className="font-mono text-xs font-bold text-terracotta">
                    Sterile Nursery SOP
                  </span>
                </div>

                <h3 className="font-serif text-3xl font-bold text-forest-deep">
                  {activePhase.title}
                </h3>
                <p className="text-base leading-relaxed text-forest/80">{activePhase.desc}</p>

                <ul className="space-y-2 pt-2">
                  {activePhase.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-center gap-2 text-sm font-medium text-forest/90"
                    >
                      <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-forest/15 bg-card p-6 text-center lg:col-span-4">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-deep text-cream">
                  {(() => {
                    const IconComponent = activePhase.icon;
                    return <IconComponent className="h-7 w-7" />;
                  })()}
                </div>
                <span className="font-mono text-xs font-bold uppercase text-moss">
                  QUALITY ASSURANCE
                </span>
                <p className="mt-1 font-serif text-lg font-bold text-forest-deep">
                  Zero Soil Contamination
                </p>
                <p className="mt-1 text-xs text-forest/70">
                  Fully verified by on-site microbial assays before transit approval.
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
