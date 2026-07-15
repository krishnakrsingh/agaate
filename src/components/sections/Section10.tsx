import { useState } from "react";
import heroPlant from "@/assets/hero-plant.jpg";
import { ArchTransition } from "./SectionTransitions";

/* 9. MARKET ACCESS */
export default function Section10() {
  const [activeMarket, setActiveMarket] = useState(0);
  const channels = [
    { title: "Better Pricing", desc: "Direct integration with institutional channels & transparent grading.", premium: "+18% Avg Price Uplift" },
    { title: "Direct Market Linkage", desc: "Structured harvesting aligned with live wholesale demand.", premium: "Zero Post-Harvest Glut" },
    { title: "Quality Standards", desc: "Grading and sorting standards to match institutional specifications.", premium: "100% Verified Quality" }
  ];

  return (
    <>
      <ArchTransition topColor="#F8FAF7" bottomColor="#FFFFFF" />
      <section className="bg-white py-24 lg:py-32 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with Interactive Floating Ticker Card */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-[#E7ECE8] shadow-lg group">
              <img src={heroPlant} alt="Harvest vegetables moving to market" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>

            {/* Floating Live Harvest Ticker */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md border border-forest/30 rounded-2xl p-4 shadow-xl flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase text-ink/50">LIVE INSTITUTIONAL LINKAGE</span>
                <div className="font-display font-bold text-lg text-forest">{channels[activeMarket].premium}</div>
              </div>
              <span className="w-3 h-3 rounded-full bg-forest animate-ping"></span>
            </div>
          </div>

          {/* Right Column: Interactive Channel Cards */}
          <div className="lg:col-span-6 text-left">
            <div className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">MARKET ACCESS</div>
            <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
              Grow better. Harvest at the right time. Reach the right market.
            </h2>
            <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[640px] mb-8">
              Agaate coordinates direct buyer integrations and grading standards to minimize price risk and crop waste after the harvest. Hover below to explore:
            </p>
            
            <div className="space-y-4">
              {channels.map((benefit, i) => {
                const isActive = activeMarket === i;
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setActiveMarket(i)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex items-start justify-between ${
                      isActive
                        ? "bg-[#F8FAF7] border-forest shadow-md scale-[1.01]"
                        : "bg-white border-[#E7ECE8] hover:border-forest/30"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <span className={`w-3 h-3 rounded-full mt-1.5 ${isActive ? "bg-forest animate-pulse" : "bg-[#C4CFC8]"}`}></span>
                      <div>
                        <div className="font-sans font-bold text-[#17211B] text-[18px]">{benefit.title}</div>
                        <div className="text-[#667069] text-sm mt-1 leading-relaxed">{benefit.desc}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-forest bg-forest/10 px-3 py-1 rounded-full self-center">
                      {benefit.premium}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
