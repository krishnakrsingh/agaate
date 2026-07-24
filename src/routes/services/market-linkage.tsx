import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import {
  Truck,
  ShieldCheck,
  TrendingUp,
  Check,
  ArrowRight,
  UserCheck,
  FileText,
  Building,
} from "lucide-react";

export const Route = createFileRoute("/services/market-linkage")({
  component: MarketLinkage,
});

function MarketLinkage() {
  const [inquired, setInquired] = useState(false);
  const [contractCrop, setContractCrop] = useState("Tomato");
  const [contractAcres, setContractAcres] = useState(3);
  const [showContractDraft, setShowContractDraft] = useState(false);

  const pricing = [
    {
      crop: "Tomato (A-Grade)",
      local: "₹18 / kg",
      buyback: "₹23 / kg",
      premium: "+27%",
      buyer: "BigBasket Hubs",
    },
    {
      crop: "Chilli (Tejaswini)",
      local: "₹42 / kg",
      buyback: "₹50 / kg",
      premium: "+19%",
      buyer: "Spices Processors",
    },
    {
      crop: "Capsicum (Green)",
      local: "₹30 / kg",
      buyback: "₹38 / kg",
      premium: "+26%",
      buyer: "Reliance Retail",
    },
  ];

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquired(true);
    setTimeout(() => {
      setInquired(false);
      setShowContractDraft(false);
    }, 4000);
  };

  const getContractDetails = () => {
    const rate = contractCrop === "Tomato" ? 23 : contractCrop === "Chilli" ? 50 : 38;
    const estYieldKg = contractAcres * 12000; // 12,000 kg per acre
    const minPayout = estYieldKg * rate;
    return {
      rate,
      estYieldKg,
      minPayout,
    };
  };

  const contract = getContractDetails();

  return (
    <main className="bg-cream text-ink antialiased min-h-screen flex flex-col font-sans">
      <Header />

      {/* Hero */}
      <div className="pt-40 pb-24 px-6 lg:px-12 bg-bone border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-forest)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-left relative z-10">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-bold">
            SERVICE VERTICAL · 06
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            Market <span className="italic text-terracotta">Linkage.</span>
          </h1>
          <p className="text-xl md:text-2xl text-forest/80 leading-relaxed font-normal max-w-2xl">
            Bypass local middleman commissions and trade directly with leading supermarket networks
            and institutional food processors.
          </p>
        </div>
      </div>

      <div className="py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full flex-grow space-y-32">
        {/* Core detail & Pricing Index */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7 space-y-8 text-left">
            <h2 className="font-serif text-4xl md:text-5xl text-forest-deep font-bold tracking-tight leading-tight">
              Contract security before the seed lands
            </h2>
            <p className="text-forest/75 text-sm md:text-base leading-relaxed">
              Price collapses during harvest peaks wipe out grower margins. Agaate establishes buyer
              demand loops, signing minimum buyback commitments with farmers based on size and
              weight parameters to ensure stable returns.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest flex-shrink-0 border border-forest/10">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-forest-deep text-sm md:text-base">
                    Guaranteed Price Baselines
                  </h4>
                  <p className="text-xs text-forest/65 leading-relaxed mt-1">
                    We establish floor rates in contracts, guarding against sudden mandi auction
                    crashes.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest flex-shrink-0 border border-forest/10">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-forest-deep text-sm md:text-base">
                    Integrated Logistics
                  </h4>
                  <p className="text-xs text-forest/65 leading-relaxed mt-1">
                    Agaate coordinates direct collection runs from regional hubs to minimize transit
                    waste.
                  </p>
                </div>
              </div>
            </div>

            {/* Buyer Integration Logos strip */}
            <div className="bg-[#eef3f0]/50 rounded-[2rem] border border-forest/10 p-8 space-y-4">
              <span className="font-jet text-[9px] tracking-widest text-forest font-bold uppercase block">
                Partner buyer networks
              </span>
              <h3 className="font-serif text-2xl text-forest-deep font-bold">
                Institutional Purchasing Chains
              </h3>
              <div className="grid grid-cols-3 gap-4 pt-2">
                {[
                  { name: "BigBasket", tags: "Supermarkets" },
                  { name: "Reliance Retail", tags: "Hypermarkets" },
                  { name: "Zomato Hyperpure", tags: "Kitchen Supply" },
                ].map((buyer, idx) => (
                  <div
                    key={idx}
                    className="bg-card p-4 rounded-xl border border-border text-center text-xs font-mono"
                  >
                    <Building className="w-5 h-5 text-forest/40 mx-auto mb-2" />
                    <span className="font-bold text-forest-deep block">{buyer.name}</span>
                    <span className="text-[9px] text-forest/50 mt-0.5 block">{buyer.tags}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing board & inquiry */}
          <div className="lg:col-span-5 bg-bone rounded-[2.5rem] border border-border p-8 text-left space-y-8 shadow-sm">
            <div>
              <span className="font-jet text-[9px] tracking-widest uppercase text-terracotta font-bold block mb-1">
                Contract Telemetry
              </span>
              <h3 className="font-serif text-3xl text-forest-deep font-bold">Buyer Index</h3>
            </div>

            <div className="space-y-6">
              <div className="overflow-hidden border border-border rounded-2xl bg-card shadow-sm text-xs">
                <div className="grid grid-cols-4 gap-2 bg-[#F9FAF9] p-3 border-b border-border font-mono text-[9px] tracking-wider text-forest/40 uppercase font-semibold">
                  <span>COMMODITY</span>
                  <span>MANDI</span>
                  <span>AGAATE</span>
                  <span>BUYER</span>
                </div>
                {pricing.map((p, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-4 gap-2 p-3 border-b border-border last:border-b-0 items-center"
                  >
                    <span className="font-bold text-forest-deep">{p.crop.split(" ")[0]}</span>
                    <span className="text-forest/65 line-through">{p.local}</span>
                    <span className="text-terracotta font-mono font-bold">{p.buyback}</span>
                    <span className="text-[10px] text-forest/50 truncate font-semibold">
                      {p.buyer.split(" ")[0]}
                    </span>
                  </div>
                ))}
              </div>

              {inquired ? (
                <div className="p-8 text-center bg-card border border-forest/10 rounded-3xl flex flex-col items-center justify-center min-h-[300px] animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6">
                    <UserCheck className="w-8 h-8 animate-bounce" />
                  </div>
                  <h4 className="font-serif text-3xl text-forest-deep font-bold mb-2">
                    Contract Requested
                  </h4>
                  <p className="text-xs text-forest/70 max-w-xs leading-relaxed">
                    We have logged your buyback inquiry. A market linkages advisor will review your
                    acreage capacity and call with a draft agreement.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquiry} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      required
                      type="text"
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-forest"
                      placeholder="Name"
                    />
                    <input
                      required
                      type="tel"
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-forest"
                      placeholder="Phone"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-forest-deep hover:bg-forest text-cream font-semibold text-xs py-4 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Inquire for Buyback Contract</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Contract draft generator */}
        <div className="border-t border-border pt-24 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block">
                BUYBACK PREVIEW GENERATOR
              </span>
              <h3 className="font-serif text-4xl md:text-5xl text-forest-deep font-bold leading-tight">
                Preview Purchase Agreements
              </h3>
              <p className="text-forest/75 text-sm leading-relaxed">
                Input your target crop and acreage scale to compile an instant draft minimum
                guarantee schedule detailing floor payout models and collection logistics intervals.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                    Crop Type
                  </label>
                  <select
                    value={contractCrop}
                    onChange={(e) => {
                      setContractCrop(e.target.value);
                      setShowContractDraft(true);
                    }}
                    className="w-full bg-card border border-border rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-forest font-bold text-forest-deep"
                  >
                    <option>Tomato</option>
                    <option>Chilli</option>
                    <option>Capsicum</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                    Acreage
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={contractAcres}
                    onChange={(e) => {
                      setContractAcres(parseInt(e.target.value) || 1);
                      setShowContractDraft(true);
                    }}
                    className="w-full bg-card border border-border rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-forest font-bold text-forest-deep"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {showContractDraft ? (
                <div className="bg-card border border-border rounded-[2.5rem] p-8 space-y-6 text-xs font-mono text-left shadow-sm animate-in slide-in-from-right duration-300">
                  <div className="flex justify-between items-center border-b border-border/50 pb-3">
                    <span className="font-bold text-forest flex items-center gap-1.5">
                      <FileText className="w-4 h-4" /> DRAFT AGREEMENT SCHEDULING
                    </span>
                    <span className="text-forest/40">CODE: AG-ML-DRAFT</span>
                  </div>

                  <div className="space-y-4 text-forest-deep/80 leading-relaxed font-sans">
                    <p>
                      <strong>1. GUARANTEED RATE FLOOR:</strong> Agaate agrees to purchase certified
                      A-Grade {contractCrop} from the grower at a minimum floor rate of{" "}
                      <strong>₹{contract.rate} / kg</strong>.
                    </p>
                    <p>
                      <strong>2. ESTIMATED DELIVERY CAPACITY:</strong> The contract block covering{" "}
                      {contractAcres} acres targets a seasonal harvest of{" "}
                      <strong>{contract.estYieldKg.toLocaleString()} kg</strong>.
                    </p>
                    <p>
                      <strong>3. LOGISTICS DISPATCH SCHEDULE:</strong> Agaate vehicles will run
                      collection sweeps directly from the Jhajjar Regional Hub every{" "}
                      <strong>48 hours</strong> during peak picking.
                    </p>
                    <p className="border-t border-border/50 pt-4 text-xs font-mono text-forest font-bold">
                      ESTIMATED FLOOR REVENUE: ₹{contract.minPayout.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-bone rounded-[2.5rem] border border-border p-12 text-center flex flex-col justify-center min-h-[220px]">
                  <FileText className="w-10 h-10 text-forest/30 mx-auto mb-4" />
                  <h4 className="font-serif text-2xl text-forest-deep font-bold mb-1">
                    Contract Draft Standby
                  </h4>
                  <p className="text-xs text-forest/65 max-w-xs mx-auto">
                    Select crop and acreage in the inputs generator to compile purchase baseline
                    floor clauses.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
