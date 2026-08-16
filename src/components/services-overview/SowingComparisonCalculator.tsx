import { useState } from "react";
import { Plant, X } from "@phosphor-icons/react";
import { SectionHeader } from "@/components/common/motion";

export function SowingComparisonCalculator() {
  const [calculatorAcres, setCalculatorAcres] = useState<number>(5);

  const chemicalCostPerAcreDirect = 18000;
  const chemicalCostPerAcreBio = 7500; // 58% savings
  const yieldPerAcreDirectQuintals = 120;
  const yieldPerAcreBioQuintals = 150; // +25%
  const pricePerQuintal = 1800;

  const totalRevenueDirect = calculatorAcres * yieldPerAcreDirectQuintals * pricePerQuintal;
  const totalRevenueBio = calculatorAcres * yieldPerAcreBioQuintals * pricePerQuintal;
  const extraRevenue = totalRevenueBio - totalRevenueDirect;
  const chemicalSavings = calculatorAcres * (chemicalCostPerAcreDirect - chemicalCostPerAcreBio);
  const totalNetGain = extraRevenue + chemicalSavings;

  return (
    <section id="comparison-slider" className="scroll-mt-28">
      <SectionHeader
        align="center"
        eyebrow="THE PARADIGM SHIFT"
        title="Risky Direct Sowing vs Bio-Boosted Nursery Model."
        description="Use the acreage slider below to calculate your estimated net financial savings and yield gain per season."
      />

      {/* Interactive Acreage Slider Widget */}
      <div className="mt-10 rounded-[2.5rem] border border-border bg-card p-8 shadow-sm md:p-12">
        <div className="mx-auto max-w-xl space-y-4 text-center">
          <label
            htmlFor="acreage-range"
            className="font-mono text-xs font-bold uppercase tracking-wider text-forest/60"
          >
            Select Your Cultivated Acreage:
          </label>
          <div className="flex items-center justify-center gap-4 font-serif text-4xl font-bold text-forest-deep">
            <span>{calculatorAcres}</span>
            <span className="font-sans text-lg font-normal text-forest/60">Acres</span>
          </div>
          <input
            id="acreage-range"
            type="range"
            min={1}
            max={50}
            value={calculatorAcres}
            onChange={(e) => setCalculatorAcres(Number(e.target.value))}
            className="w-full cursor-pointer accent-forest"
          />
          <div className="flex justify-between font-mono text-[10px] text-forest/50">
            <span>1 Acre</span>
            <span>25 Acres</span>
            <span>50 Acres</span>
          </div>
        </div>

        {/* Comparison Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Card 1: Traditional Direct Sowing */}
          <div className="space-y-6 rounded-3xl border border-destructive/20 bg-red-50/30 p-8 text-left">
            <div className="flex items-center justify-between border-b border-destructive/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/15 font-bold text-destructive">
                  <X className="h-4 w-4" />
                </span>
                <h3 className="font-serif text-2xl font-bold text-forest-deep">
                  Traditional Direct Sowing
                </h3>
              </div>
              <span className="font-mono text-xs font-bold uppercase text-destructive">
                High Risk
              </span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-forest/60">GERMINATION & SURVIVAL</span>
                  <span className="font-bold text-destructive">50% - 70%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-border">
                  <div className="h-full w-[60%] bg-destructive/70" />
                </div>
              </div>

              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-forest/60">SEED WASTE RATE</span>
                  <span className="font-bold text-destructive">30% - 50% Waste</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-border">
                  <div className="h-full w-[45%] bg-destructive/70" />
                </div>
              </div>

              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-forest/60">
                    ESTIMATED REVENUE ({calculatorAcres} ACRES)
                  </span>
                  <span className="font-bold text-forest-deep">
                    ₹{totalRevenueDirect.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-destructive/20 bg-card p-4 font-sans text-xs text-forest/70">
                High root mortality due to soil heat, uncontrolled damping-off fungal attacks, and
                heavy chemical runoff.
              </div>
            </div>
          </div>

          {/* Card 2: Agaate Bio-Boosted Nursery */}
          <div className="relative space-y-6 overflow-hidden rounded-3xl border border-forest/30 bg-emerald-50/40 p-8 text-left">
            <div className="flex items-center justify-between border-b border-forest/15 pb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest font-bold text-cream">
                  <Plant className="h-4 w-4" />
                </span>
                <h3 className="font-serif text-2xl font-bold text-forest-deep">
                  Agaate Bio-Boosted Nursery
                </h3>
              </div>
              <span className="font-mono text-xs font-bold uppercase text-emerald-700">
                High Yield
              </span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-forest/60">GERMINATION & SURVIVAL</span>
                  <span className="font-bold text-emerald-700">90% - 98% (+40% Boost)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-border">
                  <div className="h-full w-[95%] bg-emerald-600" />
                </div>
              </div>

              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-forest/60">SEED WASTE RATE</span>
                  <span className="font-bold text-emerald-700">Near Zero Waste</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-border">
                  <div className="h-full w-[5%] bg-emerald-600" />
                </div>
              </div>

              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-forest/60">
                    ESTIMATED REVENUE ({calculatorAcres} ACRES)
                  </span>
                  <span className="font-bold text-emerald-800">
                    ₹{totalRevenueBio.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-forest/20 bg-forest-deep p-4 font-sans text-xs text-cream">
                <span className="font-mono text-[10px] font-bold uppercase text-terracotta">
                  NET FARMER GAIN DELTA
                </span>
                <p className="font-serif text-xl font-bold text-cream">
                  +₹{totalNetGain.toLocaleString("en-IN")} Extra Net Profit
                </p>
                <p className="text-[11px] text-cream/70">
                  Includes +25% crop yield optimization and ₹
                  {chemicalSavings.toLocaleString("en-IN")} input chemical savings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
