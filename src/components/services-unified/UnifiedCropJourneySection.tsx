import { CropJourneyStepper, SowingComparisonCalculator } from "@/components/services-overview";

export function UnifiedCropJourneySection() {
  return (
    <section
      id="integrated-journey"
      className="relative scroll-mt-24 overflow-hidden bg-white py-16 sm:py-20 lg:py-28 border-t border-[#143d31]/10"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-16">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-base sm:text-lg font-extrabold text-[#5d7d37]">07</span>
            <span className="h-3.5 w-[1.5px] bg-[#143d31]/20" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#143d31]">
              Seed-to-Market Lifecycle
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#143d31] leading-[1.12]">
            The 8-stage crop workflow.{" "}
            <span className="font-serif italic font-normal text-[#5d7d37]">
              Integrated end-to-end.
            </span>
          </h2>

          <p className="font-sans text-sm sm:text-base leading-relaxed text-[#4f624f]">
            See how all 6 Agaate pillars collaborate across every phase of your season — saving
            inputs, boosting survival, eliminating middleman cuts, and capturing carbon revenue.
          </p>
        </div>

        <div className="space-y-16">
          <CropJourneyStepper />
          <SowingComparisonCalculator />
        </div>
      </div>
    </section>
  );
}
