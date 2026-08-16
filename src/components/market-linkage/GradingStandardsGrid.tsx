import { SectionHeader, TiltCard } from "@/components/common/motion";
import { GRADING_STEPS } from "./market-linkage-data";

export function GradingStandardsGrid() {
  return (
    <section id="grading" className="scroll-mt-28">
      <SectionHeader
        align="center"
        eyebrow="QUALITY & CLASSIFICATION"
        title="Handpick & Buyer Grading Standards."
        description="Transparent grade sorting ensuring even non-export crops earn fair industrial value."
      />

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {GRADING_STEPS.map((gr) => {
          const GIcon = gr.icon;
          return (
            <TiltCard key={gr.grade} maxTilt={8} className="h-full">
              <div className="flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-sm transition-all hover:border-forest/40 hover:shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-forest-deep px-3 py-1 font-mono text-xs font-bold text-cream">
                      {gr.grade}
                    </span>
                    <GIcon className="h-6 w-6 text-moss" />
                  </div>
                  <span className="block font-mono text-[10px] font-bold uppercase text-terracotta">
                    {gr.badge}
                  </span>
                  <h4 className="font-serif text-xl font-bold text-forest-deep">
                    {gr.priceMultiplier}
                  </h4>
                  <p className="text-xs leading-relaxed text-forest/75">{gr.desc}</p>
                </div>

                <div className="mt-6 border-t border-border pt-4 font-mono text-[10px] font-bold uppercase text-forest/60">
                  Transparent Weighing at Farmgate
                </div>
              </div>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
}
