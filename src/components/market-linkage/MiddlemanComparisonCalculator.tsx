import { SectionHeader } from "@/components/common/motion";
import { COMMODITIES } from "./market-linkage-data";

interface MiddlemanComparisonCalculatorProps {
  selectedCropIndex: number;
  onSelectCropIndex: (index: number) => void;
  harvestQuintals: number;
  onChangeHarvestQuintals: (val: number) => void;
}

export function MiddlemanComparisonCalculator({
  selectedCropIndex,
  onSelectCropIndex,
  harvestQuintals,
  onChangeHarvestQuintals,
}: MiddlemanComparisonCalculatorProps) {
  const crop = COMMODITIES[selectedCropIndex] ?? COMMODITIES[0]!;
  const harvestKg = harvestQuintals * 100;

  // Financial Calculations
  const mandiRevenue = harvestKg * crop.mandiPrice;
  const mandiMiddlemanCommission = mandiRevenue * 0.1; // 10% commission
  const mandiTransportDeduction = harvestQuintals * 80; // ₹80 per quintal transport
  const mandiWeightLoss = mandiRevenue * 0.05; // 5% shrinkage loss
  const mandiNetIncome =
    mandiRevenue - mandiMiddlemanCommission - mandiTransportDeduction - mandiWeightLoss;

  const agaateRevenue = harvestKg * crop.agaateFloorPrice;
  const agaateNetIncome = agaateRevenue;

  const netExtraProfit = agaateNetIncome - mandiNetIncome;

  return (
    <section id="roi-calculator" className="scroll-mt-28">
      <SectionHeader
        align="center"
        eyebrow="FINANCIAL COMPARISON CALCULATOR"
        title="Middlemen Auctions vs Agaate Direct Buyback."
        description="Adjust harvest volume below to compare net payouts between local mandi agents and Agaate guaranteed buyback."
      />

      <div className="mt-12 space-y-10 rounded-[2.5rem] border border-border bg-card p-8 shadow-sm md:p-12">
        {/* Controls */}
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider text-forest/60">
              Select Crop Variety:
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMODITIES.map((c, idx) => (
                <button
                  key={c.crop}
                  type="button"
                  onClick={() => onSelectCropIndex(idx)}
                  className={`cursor-pointer rounded-xl px-4 py-2 font-mono text-xs font-bold transition-all ${
                    selectedCropIndex === idx
                      ? "bg-forest-deep text-cream shadow-sm"
                      : "border border-border bg-bone text-forest/80 hover:border-forest/40"
                  }`}
                >
                  {c.crop.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-baseline justify-between font-mono text-xs font-bold">
              <span className="text-forest/60">HARVEST VOLUME:</span>
              <span className="rounded-md bg-forest/10 px-3 py-1 font-serif text-xl text-forest-deep">
                {harvestQuintals} Quintals ({harvestKg.toLocaleString("en-IN")} kg)
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={500}
              step={10}
              value={harvestQuintals}
              onChange={(e) => onChangeHarvestQuintals(Number(e.target.value))}
              className="w-full cursor-pointer accent-forest"
            />
          </div>
        </div>

        {/* Side-by-Side Breakdown Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Mandi Card */}
          <div className="space-y-4 rounded-3xl border border-destructive/20 bg-red-50/30 p-8 text-left">
            <div className="flex items-center justify-between border-b border-destructive/10 pb-3">
              <h4 className="font-serif text-2xl font-bold text-forest-deep">
                Local Mandi Auction
              </h4>
              <span className="font-mono text-xs font-bold text-destructive">10%+ Deductions</span>
            </div>

            <div className="space-y-2 font-mono text-xs text-forest/80">
              <div className="flex justify-between">
                <span>Gross Sales (₹{crop.mandiPrice}/kg):</span>
                <span>₹{mandiRevenue.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-destructive">
                <span>Middleman Commission (10%):</span>
                <span>-₹{mandiMiddlemanCommission.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-destructive">
                <span>Transport Fee (₹80/Qtl):</span>
                <span>-₹{mandiTransportDeduction.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-destructive">
                <span>Weight Shrinkage (5%):</span>
                <span>-₹{mandiWeightLoss.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between border-t border-destructive/20 pt-2 text-sm font-bold text-forest-deep">
                <span>Net Farmer Payout:</span>
                <span>₹{mandiNetIncome.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="rounded-xl border border-destructive/20 bg-card p-3 font-sans text-xs text-forest/70">
              Payout delayed 15-30 days with arbitrary price drops upon truck arrival.
            </div>
          </div>

          {/* Agaate Direct Card */}
          <div className="relative space-y-4 overflow-hidden rounded-3xl border border-forest/30 bg-emerald-50/40 p-8 text-left">
            <div className="flex items-center justify-between border-b border-forest/15 pb-3">
              <h4 className="font-serif text-2xl font-bold text-forest-deep">
                Agaate Direct Buyback
              </h4>
              <span className="font-mono text-xs font-bold text-emerald-800">0% Commission</span>
            </div>

            <div className="space-y-2 font-mono text-xs text-forest/80">
              <div className="flex justify-between">
                <span>Gross Sales (₹{crop.agaateFloorPrice}/kg Floor):</span>
                <span>₹{agaateRevenue.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Middleman Commission:</span>
                <span>₹0 (Direct Contract)</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Transport Fee:</span>
                <span>₹0 (Farmgate Pickup)</span>
              </div>
              <div className="flex justify-between border-t border-forest/20 pt-2 text-sm font-bold text-emerald-800">
                <span>Net Farmer Payout:</span>
                <span>₹{agaateNetIncome.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="space-y-1 rounded-xl bg-forest-deep p-4 font-sans text-cream">
              <span className="font-mono text-[10px] font-bold uppercase text-terracotta">
                NET EXTRA PROFIT FOR GROWER
              </span>
              <p className="font-serif text-2xl font-bold">
                +₹{netExtraProfit.toLocaleString("en-IN")} Additional Income
              </p>
              <p className="text-xs text-cream/70">
                Guaranteed contract floor price with direct bank transfer in 24-48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
