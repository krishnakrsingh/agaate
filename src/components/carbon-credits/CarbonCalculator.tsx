import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowRight, Check, Coins } from "@phosphor-icons/react";
import { CountUp, MagneticButton, Reveal } from "@/components/common/motion";
import { carbonPractices as practices } from "@/data/services-data";
import { RATE } from "./data";
import type { ForecastPoint } from "@/types";

interface CarbonCalculatorProps {
  onOpenModal: () => void;
}

export function CarbonCalculator({ onOpenModal }: CarbonCalculatorProps) {
  const [selected, setSelected] = useState<string[]>(["drip", "tillage", "bio"]);
  const [acres, setAcres] = useState(25);
  const [forecastData, setForecastData] = useState<ForecastPoint[]>([]);

  const creditsPerAc = practices
    .filter((p) => selected.includes(p.id))
    .reduce((sum, p) => sum + p.value, 0);

  const totalCredits = creditsPerAc * acres;
  const annualPayout = totalCredits * RATE;

  useEffect(() => {
    const data: ForecastPoint[] = Array.from({ length: 5 }, (_, i) => {
      const accumulationFactor = 1 + i * 0.18;
      const carbonLocked = totalCredits * accumulationFactor;
      return {
        year: `Year 0${i + 1}`,
        "CO2 Locked (Tons)": parseFloat(carbonLocked.toFixed(1)),
        "Estimated Payout (₹)": Math.round(carbonLocked * RATE),
      };
    });
    setForecastData(data);
  }, [totalCredits]);

  const handleToggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const sliderPct = ((acres - 1) / 99) * 100;

  return (
    <section id="calculator" className="scroll-mt-28">
      <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
        {/* Left Narrative Column */}
        <div className="space-y-8 text-left lg:col-span-6">
          <Reveal variant="fade-up">
            <span className="font-jet text-[10px] font-bold uppercase tracking-widest text-moss">
              Interactive Income Estimator
            </span>
            <h2 className="mt-2 font-serif text-4xl font-bold leading-tight tracking-tight text-forest-deep md:text-5xl">
              Turn Carbon Savings into{" "}
              <span className="italic text-terracotta">Direct Cash-Flow.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-forest/75">
              Select the practices currently active or planned on your farmland. Our MRV algorithms
              project seasonal credits and expected bank payouts over a 5-year cycle.
            </p>
          </Reveal>

          {/* Practices Checkbox List */}
          <div className="space-y-3 pt-2">
            <span className="font-jet text-[11px] font-bold uppercase tracking-wider text-forest/60">
              Select Your Farming Practices:
            </span>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {practices.map((p) => {
                const isSelected = selected.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleToggle(p.id)}
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? "border-forest bg-bone shadow-sm"
                        : "border-border bg-card hover:border-forest/30"
                    }`}
                  >
                    <div>
                      <p className="font-serif text-sm font-bold text-forest-deep">{p.name}</p>
                      <span className="font-mono text-[10px] text-forest/60">
                        +{p.value} tCO₂e / acre / yr
                      </span>
                    </div>
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                        isSelected ? "border-forest bg-forest text-cream" : "border-border bg-white"
                      }`}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Acreage Slider */}
          <div className="space-y-3 rounded-2xl border border-forest/15 bg-bone p-5">
            <div className="flex items-center justify-between font-mono text-xs font-bold">
              <span className="text-forest/60">CULTIVATED ACREAGE:</span>
              <span className="font-serif text-2xl text-forest-deep">{acres} Acres</span>
            </div>
            <input
              type="range"
              min={1}
              max={100}
              value={acres}
              onChange={(e) => setAcres(Number(e.target.value))}
              className="w-full cursor-pointer accent-forest"
            />
            <div className="flex justify-between font-mono text-[9px] text-forest/40">
              <span>1 Acre</span>
              <span>50 Acres</span>
              <span>100 Acres</span>
            </div>
          </div>
        </div>

        {/* Right Output Dashboard Column */}
        <div className="space-y-8 lg:col-span-6">
          {/* Summary Box */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-forest-deep p-8 text-cream shadow-2xl">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between border-b border-cream/15 pb-4">
                <span className="font-mono text-xs font-bold uppercase text-moss">
                  ANNUAL PROJECTED EARNINGS
                </span>
                <span className="rounded-full bg-cream/10 px-3 py-1 font-mono text-xs font-bold text-cream">
                  ₹{RATE}/Credit
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block font-mono text-[10px] uppercase text-cream/60">
                    ESTIMATED ANNUAL PAYOUT
                  </span>
                  <p className="font-serif text-4xl font-bold text-terracotta md:text-5xl">
                    ₹{annualPayout.toLocaleString("en-IN")}
                  </p>
                  <span className="text-xs text-cream/70">Per year directly to bank</span>
                </div>

                <div>
                  <span className="block font-mono text-[10px] uppercase text-cream/60">
                    CARBON ACCUMULATED
                  </span>
                  <p className="font-serif text-4xl font-bold text-cream md:text-5xl">
                    {totalCredits.toFixed(1)}
                  </p>
                  <span className="text-xs text-cream/70">tCO₂e Sequestered</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenModal}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-terracotta py-4 font-mono text-xs font-bold uppercase tracking-wider text-cream shadow-xl transition-all hover:bg-terracotta/90"
              >
                <span>Enrol Farmland in Carbon MRV</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* 5-Year Forecast Chart */}
          <div className="rounded-[2.5rem] border border-border bg-card p-6 shadow-sm">
            <span className="mb-4 block font-mono text-xs font-bold uppercase text-forest/60">
              5-Year Compounding Payout Projection:
            </span>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={forecastData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#6b7280" }} stroke="#d1d5db" />
                  <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} stroke="#d1d5db" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0d2a21",
                      border: "none",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                  <Bar
                    dataKey="Estimated Payout (₹)"
                    name="Estimated Payout (₹)"
                    fill="#143d31"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
