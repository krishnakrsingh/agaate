import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Cpu, ShieldCheck, Activity, Wifi, Compass, Sparkles } from "lucide-react";

export const Route = createFileRoute("/services/farm-tech")({
  component: FarmTech,
});

function FarmTech() {
  const [moisture, setMoisture] = useState(38); // percentage

  const getAdvice = (m: number) => {
    if (m < 30) {
      return {
        status: "Critical Low",
        color: "text-red-500",
        text: "Soil moisture is below threshold. Trigger Netafim drip grid lines for 45 minutes immediately.",
      };
    } else if (m >= 30 && m <= 45) {
      return {
        status: "Optimal Range",
        color: "text-emerald-500",
        text: "Soil moisture is in balance. No immediate irrigation cycle required. Blight risk index is low.",
      };
    } else {
      return {
        status: "Saturated",
        color: "text-yellow-600",
        text: "Soil moisture is high. Suspend irrigation cycles to prevent anaerobic root stress.",
      };
    }
  };

  const advice = getAdvice(moisture);

  return (
    <main className="bg-white text-ink antialiased min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <div className="pt-36 pb-20 px-6 lg:px-12 bg-bone border-b border-[#E7ECE8]">
        <div className="max-w-4xl mx-auto text-left">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-semibold">
            SERVICE VERTICAL · 03
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            Farm Tech & <span className="italic text-terracotta">IoT.</span>
          </h1>
          <p className="text-lg md:text-xl text-forest/80 leading-relaxed font-sans max-w-2xl">
            Continuous telemetry solar probes, LoRa mesh node channels, and drone multispectral
            mapping giving you complete soil visibility.
          </p>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-12 bg-white max-w-7xl mx-auto w-full flex-grow space-y-24">
        {/* Core Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6 text-left">
            <h2 className="font-serif text-3xl md:text-4xl text-forest-deep font-bold tracking-tight">
              Science on the field, telemetry in the pocket
            </h2>
            <p className="text-[#59635D] text-sm md:text-base leading-relaxed">
              Traditional crop scouting only catches disease after visual leaf lesions appear. Our
              LoRa field arrays monitor soil moisture tension, electro-conductivity (EC), and
              ambient humidity continuously, catching growth halts 5 days before visible wilting.
            </p>

            <div className="border-t border-[#E7ECE8] pt-6 space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-forest/5 flex items-center justify-center text-forest flex-shrink-0">
                  <Wifi className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-forest-deep text-sm md:text-base">
                    LoRa Mesh Node Coverage
                  </h4>
                  <p className="text-xs text-[#59635D] leading-relaxed">
                    Continuous transmission up to 3km from regional hubs with zero cell-tower
                    dependency.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-forest/5 flex items-center justify-center text-forest flex-shrink-0">
                  <Compass className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-forest-deep text-sm md:text-base">
                    Drone Multispectral Mapping
                  </h4>
                  <p className="text-xs text-[#59635D] leading-relaxed">
                    Bi-weekly flyover flights evaluating NDVI leaf indices to target fertilizer
                    dosing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Telemetry Simulator Box */}
          <div className="bg-bone rounded-[2rem] border border-[#E7ECE8] p-8 text-left space-y-8">
            <div>
              <span className="font-jet text-[9px] tracking-widest uppercase text-terracotta font-bold block mb-1">
                Live Telemetry Simulator
              </span>
              <h3 className="font-serif text-2xl text-forest-deep font-bold">
                Node-04 Active Reading
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                  Adjust Soil Moisture tension ({moisture}%)
                </label>
                <input
                  type="range"
                  min={10}
                  max={65}
                  value={moisture}
                  onChange={(e) => setMoisture(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-[#E7ECE8] rounded-lg appearance-none cursor-pointer accent-forest"
                />
              </div>

              {/* Simulation readout dashboard */}
              <div className="p-6 bg-white border border-[#E7ECE8] rounded-2xl space-y-5 text-xs font-mono">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#E7ECE8]/50">
                  <div>
                    <span className="text-forest/40 block">SOIL MOISTURE</span>
                    <span className={`text-sm font-bold ${advice.color}`}>
                      {moisture}% ({advice.status})
                    </span>
                  </div>
                  <div>
                    <span className="text-forest/40 block">WEATHER RISK LEVEL</span>
                    <span className="text-emerald-500 text-sm font-bold flex items-center gap-1">
                      <ShieldCheck className="w-4.5 h-4.5" /> Low Blight
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 py-1 text-[10px]">
                  <div>
                    <span className="text-forest/40 block">NITROGEN</span>
                    <span className="text-forest font-bold">Optimal</span>
                  </div>
                  <div>
                    <span className="text-forest/40 block">PHOSPHATE</span>
                    <span className="text-terracotta font-bold">Deficient</span>
                  </div>
                  <div>
                    <span className="text-forest/40 block">POTASSIUM</span>
                    <span className="text-forest font-bold">Optimal</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E7ECE8]/50 space-y-2">
                  <span className="text-forest/40 block flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-terracotta animate-pulse" />
                    AGRONOMIC SYSTEM PRESCRIPTION:
                  </span>
                  <p className="text-forest-deep text-xs font-sans font-semibold leading-relaxed">
                    {advice.text}
                  </p>
                </div>
              </div>

              <div className="text-center">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold bg-[#E7ECE8] text-forest px-3.5 py-1.5 rounded-full border border-forest/10 shadow-sm">
                  <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                  Satellite node feed synchronised
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
