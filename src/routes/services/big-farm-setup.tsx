import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Hammer, ShieldCheck, Calendar, ArrowRight, ClipboardList, PenTool } from "lucide-react";

export const Route = createFileRoute("/services/big-farm-setup")({
  component: BigFarmSetup,
});

function BigFarmSetup() {
  const [scoped, setScoped] = useState(false);

  const steps = [
    {
      num: "01",
      title: "Land Survey & Soil Mapping",
      desc: "Digital elevation modeling, soil core sampling, and blocks planning.",
      duration: "Weeks 1-2",
    },
    {
      num: "02",
      title: "Automated Drip Setup",
      desc: "Sizing pump stations, laying drip pipes, and automated fertigation systems.",
      duration: "Weeks 3-6",
    },
    {
      num: "03",
      title: "Input Sourcing at Scale",
      desc: "Tray block nursery reserving, custom basal manure mixes, and protective bio-stimulants.",
      duration: "Weeks 7-8",
    },
    {
      num: "04",
      title: "Field SOP Training",
      desc: "Training local workers, implementing digital field schedules, and log sheets.",
      duration: "Ongoing",
    },
  ];

  const handleScope = (e: React.FormEvent) => {
    e.preventDefault();
    setScoped(true);
    setTimeout(() => setScoped(false), 3000);
  };

  return (
    <main className="bg-white text-ink antialiased min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <div className="pt-36 pb-20 px-6 lg:px-12 bg-bone border-b border-[#E7ECE8]">
        <div className="max-w-4xl mx-auto text-left">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-semibold">
            SERVICE VERTICAL · 05
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            Big Farm <span className="italic text-terracotta">Setup.</span>
          </h1>
          <p className="text-lg md:text-xl text-forest/80 leading-relaxed font-sans max-w-2xl">
            Complete turnkey establishment of commercial vegetable setups — from bare soil to your
            initial institutional buyer shipments.
          </p>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-12 bg-white max-w-7xl mx-auto w-full flex-grow space-y-24">
        {/* Step Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12 text-left">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-forest-deep font-bold tracking-tight mb-4">
                Structured stages for riskless execution
              </h2>
              <p className="text-[#59635D] text-sm md:text-base leading-relaxed">
                Large scale commercial farming projects usually fail during the first 6 months due
                to uncalibrated soil structures, incorrect water sizing layouts, or input logistical
                shortages. Agaate controls every phase directly to ensure commercial viability.
              </p>
            </div>

            <div className="space-y-6 relative pl-6 border-l border-forest/10">
              {steps.map((s, idx) => (
                <div key={idx} className="relative py-2">
                  <span className="absolute left-[-29px] top-[14px] w-3 h-3 rounded-full bg-forest border-2 border-white shadow-sm" />
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-mono tracking-wider text-terracotta font-semibold uppercase">
                      Phase {s.num} · {s.duration}
                    </span>
                  </div>
                  <h4 className="font-serif text-xl font-bold text-forest-deep mb-1">{s.title}</h4>
                  <p className="text-xs text-[#59635D] leading-relaxed max-w-lg">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Consultation request */}
          <div className="bg-bone rounded-[2rem] border border-[#E7ECE8] p-8 text-left space-y-8">
            <div>
              <span className="font-jet text-[9px] tracking-widest uppercase text-terracotta font-bold block mb-1">
                Turnkey Project Scoping
              </span>
              <h3 className="font-serif text-2xl text-forest-deep font-bold">
                Request a Development Quote
              </h3>
            </div>

            {scoped ? (
              <div className="p-8 text-center bg-forest/5 border border-forest/10 rounded-2xl flex flex-col items-center justify-center min-h-[300px] animate-in fade-in">
                <ShieldCheck className="w-12 h-12 text-emerald-500 mb-4 animate-bounce" />
                <h4 className="font-serif text-2xl text-forest-deep font-bold mb-2">
                  Project Registered
                </h4>
                <p className="text-xs text-forest/75 max-w-xs">
                  We have received your project details. A senior construction engineer will call
                  you to arrange a field survey visit.
                </p>
              </div>
            ) : (
              <form onSubmit={handleScope} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full bg-white border border-[#E7ECE8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest"
                    placeholder="e.g. Abhay Ranjan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                    Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    className="w-full bg-white border border-[#E7ECE8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest"
                    placeholder="e.g. +91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                    Target Farm Size (in acres)
                  </label>
                  <input
                    required
                    type="number"
                    className="w-full bg-white border border-[#E7ECE8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest"
                    placeholder="e.g. 15"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                    Land Location (District, State)
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full bg-white border border-[#E7ECE8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest"
                    placeholder="e.g. Rohtak, Haryana"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-forest-deep hover:bg-forest text-cream font-semibold text-sm py-4 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <ClipboardList className="w-4 h-4" />
                  <span>Request Field Survey Consult</span>
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
