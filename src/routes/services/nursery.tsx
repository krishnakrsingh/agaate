import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Sprout, ShieldCheck, Calendar, ArrowRight, Activity, ShoppingCart } from "lucide-react";

export const Route = createFileRoute("/services/nursery")({
  component: Nursery,
});

function Nursery() {
  const [crop, setCrop] = useState("Tomato");
  const [acres, setAcres] = useState(1);
  const [booked, setBooked] = useState(false);

  // Recommendations: seedlings per acre
  const recommendations: Record<string, { qty: number; cost: number; desc: string }> = {
    Tomato: {
      qty: 7000,
      cost: 2.5,
      desc: "Containerized hybrid tomato seedlings with double root density.",
    },
    Chilli: { qty: 9000, cost: 1.8, desc: "Fungal-resistant organic bio-boosted chilli plugs." },
    Capsicum: { qty: 11000, cost: 3.2, desc: "Sturdy greenhouse-grade bell pepper seedlings." },
  };

  const currentRec = recommendations[crop] || recommendations.Tomato;
  const totalSeedlings = currentRec.qty * acres;
  const estimatedCost = totalSeedlings * currentRec.cost;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
    }, 3000);
  };

  return (
    <main className="bg-white text-ink antialiased min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <div className="pt-36 pb-20 px-6 lg:px-12 bg-bone border-b border-[#E7ECE8]">
        <div className="max-w-4xl mx-auto text-left">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-semibold">
            SERVICE VERTICAL · 01
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            Bio-Boosted <span className="italic text-terracotta">Nursery.</span>
          </h1>
          <p className="text-lg md:text-xl text-forest/80 leading-relaxed font-sans max-w-2xl">
            Replace risky direct field seeding with premium, containerized plug seedlings raised
            inside our 17-acre smart climate-controlled chambers.
          </p>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-12 bg-white max-w-7xl mx-auto w-full flex-grow space-y-24">
        {/* Core details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6 text-left">
            <h2 className="font-serif text-3xl md:text-4xl text-forest-deep font-bold tracking-tight">
              Why seedling quality dictates final yield
            </h2>
            <p className="text-[#59635D] text-sm md:text-base leading-relaxed">
              Direct seed sowing has high mortality due to heat, uneven moisture, and soil fungal
              spores. Agaate's seedlings are germinated in sterile cocopeat plugs inoculated with
              biological beneficials (Trichoderma, Pseudomonas).
            </p>

            <div className="border-t border-[#E7ECE8] pt-6 space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-forest/5 flex items-center justify-center text-forest flex-shrink-0">
                  <ShieldCheck className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-forest-deep text-sm md:text-base">
                    Organic Bio-Inoculation
                  </h4>
                  <p className="text-xs text-[#59635D] leading-relaxed">
                    Accelerates root colonization, preventing damping-off and soil fungi attacks.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-forest/5 flex items-center justify-center text-forest flex-shrink-0">
                  <Activity className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-forest-deep text-sm md:text-base">
                    Double Root Density
                  </h4>
                  <p className="text-xs text-[#59635D] leading-relaxed">
                    Chamber temperature controls stimulate high lateral root branching for immediate
                    crop establishment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Calculator Box */}
          <div className="bg-bone rounded-[2rem] border border-[#E7ECE8] p-8 text-left space-y-8">
            <div>
              <span className="font-jet text-[9px] tracking-widest uppercase text-terracotta font-bold block mb-1">
                Interactive Planner
              </span>
              <h3 className="font-serif text-2xl text-forest-deep font-bold">
                Seedling Booking Calculator
              </h3>
            </div>

            {booked ? (
              <div className="p-8 text-center bg-forest/5 border border-forest/10 rounded-2xl flex flex-col items-center justify-center min-h-[300px] animate-in fade-in">
                <ShieldCheck className="w-12 h-12 text-emerald-500 mb-4 animate-bounce" />
                <h4 className="font-serif text-2xl text-forest-deep font-bold mb-2">
                  Booking Requested
                </h4>
                <p className="text-xs text-forest/75 max-w-xs">
                  We have logged your request. An advisor will contact you to coordinate delivery
                  dates and tray availability.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                    Select Vegetable Crop
                  </label>
                  <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    className="w-full bg-white border border-[#E7ECE8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest"
                  >
                    <option>Tomato</option>
                    <option>Chilli</option>
                    <option>Capsicum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                    Total Acreage ({acres} Acres)
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={25}
                    value={acres}
                    onChange={(e) => setAcres(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-[#E7ECE8] rounded-lg appearance-none cursor-pointer accent-forest"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-forest/40 mt-1">
                    <span>1 Acre</span>
                    <span>25 Acres</span>
                  </div>
                </div>

                <div className="p-5 bg-white border border-[#E7ECE8] rounded-2xl grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-forest/40 block">SEEDLINGS NEEDED</span>
                    <span className="text-forest-deep font-bold text-sm">
                      {totalSeedlings.toLocaleString()} Plugs
                    </span>
                  </div>
                  <div>
                    <span className="text-forest/40 block">EST. ACCELERATOR COST</span>
                    <span className="text-terracotta font-bold text-sm">
                      ₹{estimatedCost.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="col-span-2 pt-3 border-t border-[#E7ECE8]/50">
                    <span className="text-forest/40 block">PRODUCT DESCRIPTION</span>
                    <span className="text-forest/80 font-sans text-xs mt-1 block leading-normal">
                      {currentRec.desc}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-forest-deep hover:bg-forest text-cream font-semibold text-sm py-4 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Reserve Seedling Trays</span>
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
