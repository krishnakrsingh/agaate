import { useState } from "react";
import agroPark from "@/assets/agro-park.jpg";
import { WaveTransition } from "./SectionTransitions";

/* 10. AGRI PARK */
export default function Section11() {
  const [activeZone, setActiveZone] = useState("Seed");
  const zones = [
    { name: "Seed", desc: "Live trial blocks comparing germination & disease resistance." },
    { name: "Nursery", desc: "Bio-inoculated saplings with accelerated root density." },
    { name: "Irrigation", desc: "Pressure-compensating drip & automated fertigation demos." },
    { name: "Nutrition", desc: "Basal & foliar test beds for soil organic matter." },
    { name: "Crop Protection", desc: "Integrated pest management and residue-free bio-fungicides." },
    { name: "Technology", desc: "IoT sensor nodes, drone sprayers & weather stations live." },
    { name: "Training", desc: "Practical hands-on workshops for agronomists and farmers." },
    { name: "Market", desc: "Post-harvest sorting, grading, and cooling demo facility." }
  ];

  const currentZoneInfo = zones.find(z => z.name === activeZone) || zones[0];

  return (
    <>
      <WaveTransition topColor="#FFFFFF" bottomColor="#F8FAF7" />
      <section id="park-section" className="bg-[#F8FAF7] py-24 lg:py-32 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Zone Selector */}
          <div className="lg:col-span-5 text-left">
            <div className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">AGRI PARK</div>
            <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
              Agaate Integrated Agri Park
            </h2>
            <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[640px] mb-8">
              A single living farm where India's leading seed, irrigation, nutrition, protection, and machinery partners come together. See products perform on real crops before making any farm input decisions.
            </p>
            
            <div>
              <div className="text-[12px] uppercase font-mono tracking-[0.1em] text-ink/40 mb-3 font-semibold">
                SELECT A PARK ZONE TO EXPLORE:
              </div>
              <div className="flex flex-wrap gap-2.5 mb-6">
                {zones.map((z, idx) => {
                  const isSelected = activeZone === z.name;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveZone(z.name)}
                      className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
                        isSelected
                          ? "bg-forest text-cream shadow-md scale-105"
                          : "bg-white border border-[#E7ECE8] text-ink/70 hover:border-forest/40"
                      }`}
                    >
                      {z.name} Zone
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Zone Description Banner */}
              <div className="bg-white border border-forest/30 rounded-2xl p-5 shadow-sm">
                <div className="text-xs font-mono text-forest font-bold uppercase mb-1">
                  ACTIVE EXPLORING: {currentZoneInfo.name} ZONE
                </div>
                <p className="text-sm text-[#17211B] font-medium leading-relaxed">
                  {currentZoneInfo.desc}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Agri Park Interactive Visual */}
          <div className="lg:col-span-7 relative">
            <div className="aspect-[16/10] rounded-3xl overflow-hidden border border-[#E7ECE8] shadow-lg relative group">
              <img src={agroPark} alt="Agaate Agri Park layout" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17211B]/60 via-transparent to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-cream">
                <div>
                  <span className="text-[11px] font-mono tracking-widest uppercase bg-forest/90 px-3 py-1 rounded-full">
                    LIVE FIELD TRIAL FACILITY
                  </span>
                  <div className="font-display text-2xl font-bold mt-2">{activeZone} Demo Block Active</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
