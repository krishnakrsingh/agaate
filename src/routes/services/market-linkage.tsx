import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Truck, ShieldCheck, TrendingUp, Check, ArrowRight, UserCheck } from "lucide-react";

export const Route = createFileRoute("/services/market-linkage")({
  component: MarketLinkage,
});

function MarketLinkage() {
  const [inquired, setInquired] = useState(false);

  const pricing = [
    {
      crop: "Tomato (A-Grade)",
      local: "₹18 / kg",
      buyback: "₹23 / kg",
      volume: "10,000 kg / week",
      buyers: "4 Premium Chains",
    },
    {
      crop: "Chilli (Tejaswini)",
      local: "₹42 / kg",
      buyback: "₹50 / kg",
      volume: "4,500 kg / week",
      buyers: "2 Spices Processors",
    },
    {
      crop: "Capsicum (Green)",
      local: "₹30 / kg",
      buyback: "₹38 / kg",
      volume: "6,000 kg / week",
      buyers: "3 Retail Hubs",
    },
  ];

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquired(true);
    setTimeout(() => setInquired(false), 3000);
  };

  return (
    <main className="bg-white text-ink antialiased min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <div className="pt-36 pb-20 px-6 lg:px-12 bg-bone border-b border-[#E7ECE8]">
        <div className="max-w-4xl mx-auto text-left">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-semibold">
            SERVICE VERTICAL · 06
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            Market <span className="italic text-terracotta">Linkage.</span>
          </h1>
          <p className="text-lg md:text-xl text-forest/80 leading-relaxed font-sans max-w-2xl">
            Bypass local middleman commissions and trade directly with leading supermarket networks
            and institutional food processors.
          </p>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-12 bg-white max-w-7xl mx-auto w-full flex-grow space-y-24">
        {/* Core detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6 text-left">
            <h2 className="font-serif text-3xl md:text-4xl text-forest-deep font-bold tracking-tight">
              Contract security before the seed lands
            </h2>
            <p className="text-[#59635D] text-sm md:text-base leading-relaxed">
              Price collapses during harvest peaks wipe out grower margins. Agaate establishes buyer
              demand loops, signing minimum buyback commitments with farmers based on size and
              weight parameters.
            </p>

            <div className="border-t border-[#E7ECE8] pt-6 space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-forest/5 flex items-center justify-center text-forest flex-shrink-0">
                  <ShieldCheck className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-forest-deep text-sm md:text-base">
                    Guaranteed Price Baselines
                  </h4>
                  <p className="text-xs text-[#59635D] leading-relaxed">
                    We establish floor rates in contracts, guarding against sudden mandi crashes.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-forest/5 flex items-center justify-center text-forest flex-shrink-0">
                  <TrendingUp className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-forest-deep text-sm md:text-base">
                    Integrated Logistics
                  </h4>
                  <p className="text-xs text-[#59635D] leading-relaxed">
                    Agaate coordinates direct collection runs from regional hubs to minimize
                    transport wastage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing board */}
          <div className="bg-bone rounded-[2rem] border border-[#E7ECE8] p-8 text-left space-y-8">
            <div>
              <span className="font-jet text-[9px] tracking-widest uppercase text-terracotta font-bold block mb-1">
                Contract Telemetry
              </span>
              <h3 className="font-serif text-2xl text-forest-deep font-bold">Active Buyer Index</h3>
            </div>

            <div className="space-y-6">
              <div className="overflow-hidden border border-[#E7ECE8] rounded-2xl bg-white shadow-sm text-xs">
                <div className="grid grid-cols-3 gap-2 bg-[#F9FAF9] p-3 border-b border-[#E7ECE8] font-mono text-[9px] tracking-wider text-forest/40 uppercase">
                  <span>COMMODITY</span>
                  <span>MANDI AVG</span>
                  <span>AGAATE BUYBACK</span>
                </div>
                {pricing.map((p, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-3 gap-2 p-3.5 border-b border-[#E7ECE8] last:border-b-0"
                  >
                    <span className="font-bold text-forest-deep">{p.crop}</span>
                    <span className="text-forest/65 line-through">{p.local}</span>
                    <span className="text-terracotta font-mono font-bold">{p.buyback}</span>
                  </div>
                ))}
              </div>

              {inquired ? (
                <div className="p-4 text-center bg-forest/5 border border-forest/10 rounded-xl flex items-center justify-center gap-2 animate-in fade-in">
                  <UserCheck className="w-5 h-5 text-emerald-500" />
                  <span className="text-xs font-mono font-bold text-forest-deep">
                    Linkage request registered! We will call back.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleInquiry} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      required
                      type="text"
                      className="w-full bg-white border border-[#E7ECE8] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-forest"
                      placeholder="Name"
                    />
                    <input
                      required
                      type="tel"
                      className="w-full bg-white border border-[#E7ECE8] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-forest"
                      placeholder="Phone"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-forest-deep hover:bg-forest text-cream font-semibold text-xs py-3.5 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Inquire for Buyback Contract</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
