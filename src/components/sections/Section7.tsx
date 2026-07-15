import { useState } from "react";
import { WaveTransition } from "./SectionTransitions";

/* 6.5 CARBON CREDIT PROGRAM */
export default function Section7() {
  const [selectedPractices, setSelectedPractices] = useState<string[]>(["drip", "tillage"]);
  const practices = [
    { id: "drip", name: "Drip Irrigation", desc: "Saves water and reduces pumping energy footprint.", value: 1.5 },
    { id: "tillage", name: "Zero Tillage", desc: "Keeps carbon locked deep in the soil structure.", value: 2.0 },
    { id: "bio", name: "Organic & Bio-Inputs", desc: "Cuts chemical nitrogen gas emissions.", value: 1.8 },
    { id: "burning", name: "No Residue Burning", desc: "Returns natural biomass back to the field.", value: 1.2 },
    { id: "cover", name: "Cover Cropping", desc: "Continually builds organic soil carbon levels.", value: 2.2 }
  ];

  const handleToggle = (id: string) => {
    setSelectedPractices(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const totalCredits = practices
    .filter(p => selectedPractices.includes(p.id))
    .reduce((sum, p) => sum + p.value, 0)
    .toFixed(1);

  const estimatedEarnings = Math.round(Number(totalCredits) * 1200);

  return (
    <>
      <WaveTransition topColor="#F8FAF7" bottomColor="#FFFFFF" />
      <section className="bg-white py-24 lg:py-32 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Info */}
          <div className="lg:col-span-6 text-left">
            <div className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">
              MONETIZE SUSTAINABILITY
            </div>
            <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
              Earn Extra Income from Sustainable Practices
            </h2>
            <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[640px] mb-8">
              Good farming already saves carbon. Agaate helps you measure, verify, and monetise it — turning sustainable practices into a regular payout stream with zero extra land required.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border-l-2 border-forest pl-4">
                <div className="text-xl font-bold font-mono text-[#17211B]">1 Carbon Credit</div>
                <div className="text-xs text-ink/60 mt-1">Satellite & IoT verification handled seamlessly by Agaate.</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Estimator Widget */}
          <div className="lg:col-span-6">
            <div className="bg-[#F8FAF7] border border-[#E7ECE8] rounded-3xl p-8 shadow-md relative">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-mono text-[12px] uppercase tracking-wider text-forest font-bold">
                  INTERACTIVE PRACTICE ESTIMATOR
                </h3>
                <span className="text-xs font-mono text-ink/50">Toggle practices below</span>
              </div>

              <div className="space-y-3.5 mb-8">
                {practices.map(p => {
                  const isSelected = selectedPractices.includes(p.id);
                  return (
                    <div
                      key={p.id}
                      onClick={() => handleToggle(p.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? "bg-white border-forest shadow-md scale-[1.01]"
                          : "bg-white/50 border-[#E7ECE8] hover:border-forest/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                          <div className={`w-6 h-6 rounded-lg border flex items-center justify-center text-xs font-bold transition-all ${
                            isSelected ? "bg-forest border-forest text-cream shadow-sm" : "border-[#C4CFC8] text-transparent"
                          }`}>
                            ✓
                          </div>
                          <div className="text-left">
                            <div className="font-sans font-bold text-[#17211B] text-[17px] leading-tight">{p.name}</div>
                            <div className="text-xs text-ink/50 mt-0.5">{p.desc}</div>
                          </div>
                        </div>
                        <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md ${
                          isSelected ? "bg-forest/10 text-forest" : "bg-gray-100 text-gray-400"
                        }`}>
                          +{p.value} tCO₂
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Live Total & Payout Banner */}
              <div className="bg-forest text-cream rounded-2xl p-6 shadow-lg flex justify-between items-center text-left">
                <div>
                  <div className="text-xs text-cream/70 font-mono tracking-wider">ESTIMATED CREDITS</div>
                  <div className="text-2xl font-bold font-mono text-cream mt-1">{totalCredits} tCO₂/ha</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-cream/70 font-mono tracking-wider">ESTIMATED ANNUAL PAYOUT</div>
                  <div className="text-2xl md:text-3xl font-bold font-mono text-yellow-300 mt-1">₹{estimatedEarnings.toLocaleString()}/yr</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
