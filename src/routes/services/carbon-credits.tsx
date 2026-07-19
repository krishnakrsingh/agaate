import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Coins, Check, ShieldCheck, ArrowRight, Activity, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/services/carbon-credits")({
  component: CarbonCredits,
});

function CarbonCredits() {
  const [selected, setSelected] = useState<string[]>(["drip", "tillage"]);
  const [ha, setHa] = useState(2); // total hectares (1 ha = 2.47 acres)
  const [joined, setJoined] = useState(false);

  const practices = [
    {
      id: "drip",
      name: "Drip Irrigation Setup",
      desc: "Reduces pumping energy emissions and water runoff waste.",
      value: 1.5,
    },
    {
      id: "tillage",
      name: "Zero Tillage Method",
      desc: "Preserves soil structure, locking atmospheric carbon in the organic layer.",
      value: 2.0,
    },
    {
      id: "bio",
      name: "Organic Bio-Inputs Dosing",
      desc: "Replaces chemical ammonia synthetic nitrogen emissions.",
      value: 1.8,
    },
    {
      id: "burning",
      name: "Zero Residue Burning",
      desc: "Incorporates organic biomass waste back into the field layer.",
      value: 1.2,
    },
    {
      id: "cover",
      name: "Cover Cropping Cycle",
      desc: "Fixes biological nitrogen and builds organic matter year-round.",
      value: 2.2,
    },
  ];

  const RATE = 1200; // ₹ per tCO2 credit

  const creditsPerHa = practices
    .filter((p) => selected.includes(p.id))
    .reduce((sum, p) => sum + p.value, 0);

  const totalCredits = creditsPerHa * ha;
  const annualPayout = totalCredits * RATE;

  const handleToggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    setJoined(true);
    setTimeout(() => setJoined(false), 3000);
  };

  return (
    <main className="bg-white text-ink antialiased min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <div className="pt-36 pb-20 px-6 lg:px-12 bg-bone border-b border-[#E7ECE8]">
        <div className="max-w-4xl mx-auto text-left">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-semibold">
            SERVICE VERTICAL · 04
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            Carbon Credits <span className="italic text-terracotta">Program.</span>
          </h1>
          <p className="text-lg md:text-xl text-forest/80 leading-relaxed font-sans max-w-2xl">
            Mitigate climate risk and earn annual bank transfer payouts by practicing
            satellite-verified sustainable soil cultivation methods.
          </p>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-12 bg-white max-w-7xl mx-auto w-full flex-grow space-y-24">
        {/* Core detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6 text-left">
            <h2 className="font-serif text-3xl md:text-4xl text-forest-deep font-bold tracking-tight">
              Turn carbon savings into cash-flow
            </h2>
            <p className="text-[#59635D] text-sm md:text-base leading-relaxed">
              Every ton of carbon dioxide equivalents (tCO2e) you lock into your soil or prevent
              from entering the atmosphere through zero residue burning generates one carbon credit.
              Agaate coordinates satellite surveys and verification audits, distributing payouts
              directly to grower accounts.
            </p>

            <div className="border-t border-[#E7ECE8] pt-6 space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-forest/5 flex items-center justify-center text-forest flex-shrink-0">
                  <ShieldCheck className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-forest-deep text-sm md:text-base">
                    No Extra Land Needed
                  </h4>
                  <p className="text-xs text-[#59635D] leading-relaxed">
                    Monetise existing acreage operations. Simply change conservation practices.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-forest/5 flex items-center justify-center text-forest flex-shrink-0">
                  <TrendingUp className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-forest-deep text-sm md:text-base">
                    End-to-End Auditing
                  </h4>
                  <p className="text-xs text-[#59635D] leading-relaxed">
                    Agaate coordinates soil organic matter (SOM) checks and satellite monitoring
                    audits.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-bone rounded-[2rem] border border-[#E7ECE8] p-8 text-left space-y-8">
            <div>
              <span className="font-jet text-[9px] tracking-widest uppercase text-terracotta font-bold block mb-1">
                Indicative Estimator
              </span>
              <h3 className="font-serif text-2xl text-forest-deep font-bold">
                Carbon Payout Calculator
              </h3>
            </div>

            {joined ? (
              <div className="p-8 text-center bg-forest/5 border border-forest/10 rounded-2xl flex flex-col items-center justify-center min-h-[300px] animate-in fade-in">
                <ShieldCheck className="w-12 h-12 text-emerald-500 mb-4 animate-bounce" />
                <h4 className="font-serif text-2xl text-forest-deep font-bold mb-2">
                  Audit Registered
                </h4>
                <p className="text-xs text-forest/75 max-w-xs">
                  Your carbon registration has been logged. An agronomist will schedule a soil
                  mapping visit to check baseline values.
                </p>
              </div>
            ) : (
              <form onSubmit={handleJoin} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono tracking-wider text-forest/60 mb-3 uppercase font-semibold">
                    Select Current Practices
                  </label>
                  <div className="space-y-2.5">
                    {practices.map((p) => {
                      const isOn = selected.includes(p.id);
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handleToggle(p.id)}
                          className={`w-full flex items-center gap-3 py-3 border-b border-[#E7ECE8] text-left px-2 -mx-2 transition-colors cursor-pointer ${
                            isOn
                              ? "bg-white rounded-xl border border-[#E7ECE8]"
                              : "hover:bg-white/40"
                          }`}
                        >
                          <span
                            className={`w-4.5 h-4.5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                              isOn
                                ? "bg-terracotta border-terracotta text-cream"
                                : "border-[#E7ECE8]"
                            }`}
                          >
                            {isOn && <Check className="w-3 h-3" strokeWidth={3} />}
                          </span>
                          <span className="flex-1 min-w-0 text-xs">
                            <span className="block font-bold text-forest-deep">{p.name}</span>
                            <span className="block text-forest/50 text-[10px] truncate">
                              {p.desc}
                            </span>
                          </span>
                          <span
                            className={`font-mono text-xs ${isOn ? "text-forest font-bold" : "text-forest/30"}`}
                          >
                            +{p.value.toFixed(1)} tCO₂
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                    Total Farming Hectares ({ha} ha)
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={15}
                    value={ha}
                    onChange={(e) => setHa(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-[#E7ECE8] rounded-lg appearance-none cursor-pointer accent-forest"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-forest/40 mt-1">
                    <span>1 Hectare</span>
                    <span>15 Hectares</span>
                  </div>
                </div>

                <div className="p-5 bg-white border border-[#E7ECE8] rounded-2xl grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-forest/40 block">TOTAL CREDITS / YR</span>
                    <span className="text-forest-deep font-bold text-sm">
                      {totalCredits.toFixed(1)} tCO₂
                    </span>
                  </div>
                  <div>
                    <span className="text-forest/40 block">EST. ANNUAL PAYOUT</span>
                    <span className="text-terracotta font-bold text-sm">
                      ₹{Math.round(annualPayout).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-forest-deep hover:bg-forest text-cream font-semibold text-sm py-4 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Coins className="w-4 h-4" />
                  <span>Register for Carbon Auditing</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
