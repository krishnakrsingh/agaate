import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Store, ShieldCheck, Heart, Package, ArrowRight, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/services/kisaan-mall")({
  component: KisaanMall,
});

function KisaanMall() {
  const [selectedCrop, setSelectedCrop] = useState("Tomato");
  const [ordered, setOrdered] = useState(false);

  const packages: Record<
    string,
    { title: string; basal: string; foliar: string; protection: string; price: number }
  > = {
    Tomato: {
      title: "Solanaceae Nutrition Package",
      basal: "Humic granules + Micorrhiza bio-inoculant + slow-release SSP.",
      foliar: "Stage 02 calcium nitrate spray + growth boosters.",
      protection: "Residue-free systemic bio-fungicides for early blight control.",
      price: 12400,
    },
    Chilli: {
      title: "Capsicum Soluble Package",
      basal: "Composted poultry manure + biological Trichoderma soil packs.",
      foliar: "High potassium soluble spray for fruit sizing and color shine.",
      protection: "Botanical extracts for whitefly repellent and leaf curl virus mitigation.",
      price: 9800,
    },
    Capsicum: {
      title: "Greenhouse Hydro-Soluble Package",
      basal: "Micronutrient chelate blend + slow-release nitrogen base.",
      foliar: "Foliar trace element boosters mapping cell wall expansion stages.",
      protection: "Biological mites control and predatory insect traps.",
      price: 14500,
    },
  };

  const currentPack = packages[selectedCrop] || packages.Tomato;

  const handlePreorder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrdered(true);
    setTimeout(() => setOrdered(false), 3000);
  };

  return (
    <main className="bg-white text-ink antialiased min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <div className="pt-36 pb-20 px-6 lg:px-12 bg-bone border-b border-[#E7ECE8]">
        <div className="max-w-4xl mx-auto text-left">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-semibold">
            SERVICE VERTICAL · 02
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            Kisaan <span className="italic text-terracotta">Mall.</span>
          </h1>
          <p className="text-lg md:text-xl text-forest/80 leading-relaxed font-sans max-w-2xl">
            A comprehensive agricultural input store containing over 500+ verified fertilizers,
            seeds, biological boosters, and drip line accessories.
          </p>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-12 bg-white max-w-7xl mx-auto w-full flex-grow space-y-24">
        {/* Detail text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6 text-left">
            <h2 className="font-serif text-3xl md:text-4xl text-forest-deep font-bold tracking-tight">
              100% Genuine inputs. Prescribed correctly.
            </h2>
            <p className="text-[#59635D] text-sm md:text-base leading-relaxed">
              Input duplicate counterfeiting and incorrect dosing calculations waste farmer
              resources and damage soil life. At Agaate Kisan Malls, every seed package, chemical
              protection pouch, or organic conditioner is tracked directly from factory source to
              your billing receipt.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#E7ECE8]">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-forest/5 flex items-center justify-center text-forest flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-forest-deep text-xs md:text-sm">Verified Source</h4>
                  <p className="text-[11px] text-[#59635D] mt-1 leading-relaxed">
                    Direct partner contracts with Bayer, Yara, Sakata, and Netafim.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-forest/5 flex items-center justify-center text-forest flex-shrink-0">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-forest-deep text-xs md:text-sm">
                    Calibrated Delivery
                  </h4>
                  <p className="text-[11px] text-[#59635D] mt-1 leading-relaxed">
                    Input packages staged to your crop schedule, delivered to your door.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Input planner box */}
          <div className="bg-bone rounded-[2rem] border border-[#E7ECE8] p-8 text-left space-y-8">
            <div>
              <span className="font-jet text-[9px] tracking-widest uppercase text-terracotta font-bold block mb-1">
                Ecosystem Package
              </span>
              <h3 className="font-serif text-2xl text-forest-deep font-bold">Crop Input Planner</h3>
            </div>

            {ordered ? (
              <div className="p-8 text-center bg-forest/5 border border-forest/10 rounded-2xl flex flex-col items-center justify-center min-h-[300px] animate-in fade-in">
                <ShieldCheck className="w-12 h-12 text-emerald-500 mb-4 animate-bounce" />
                <h4 className="font-serif text-2xl text-forest-deep font-bold mb-2">
                  Package Reserved
                </h4>
                <p className="text-xs text-forest/75 max-w-xs">
                  Your crop input reservation has been recorded. An agronomist will review your soil
                  profile to verify dosage before packing.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePreorder} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                    Select Target Crop
                  </label>
                  <div className="flex gap-2">
                    {["Tomato", "Chilli", "Capsicum"].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setSelectedCrop(c)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                          selectedCrop === c
                            ? "bg-forest text-cream border border-forest"
                            : "bg-white border border-[#E7ECE8] text-forest/70 hover:border-forest"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-5 bg-white border border-[#E7ECE8] rounded-2xl space-y-4 text-xs font-mono">
                  <div className="border-b border-[#E7ECE8]/50 pb-3">
                    <span className="text-forest/40 block">PACKAGE SPECIFICATION</span>
                    <span className="text-forest-deep font-bold text-sm">{currentPack.title}</span>
                  </div>
                  <div>
                    <span className="text-forest/40 block">STAGE 1: BASAL APPLICATION</span>
                    <span className="text-[#59635D] text-xs font-sans mt-0.5 block leading-relaxed">
                      {currentPack.basal}
                    </span>
                  </div>
                  <div>
                    <span className="text-forest/40 block">STAGE 2: FOLIAR SCHEDULING</span>
                    <span className="text-[#59635D] text-xs font-sans mt-0.5 block leading-relaxed">
                      {currentPack.foliar}
                    </span>
                  </div>
                  <div>
                    <span className="text-forest/40 block">STAGE 3: ROTATION PROTECTION</span>
                    <span className="text-[#59635D] text-xs font-sans mt-0.5 block leading-relaxed">
                      {currentPack.protection}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-[#E7ECE8]/50 flex justify-between items-baseline">
                    <span className="text-forest/40">EST. PACKAGE COST (PER ACRE)</span>
                    <span className="text-terracotta font-bold text-base">
                      ₹{currentPack.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-forest-deep hover:bg-forest text-cream font-semibold text-sm py-4 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Reserve Input Package</span>
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
