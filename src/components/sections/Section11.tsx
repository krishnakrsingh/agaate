import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import agroPark from "@/assets/agro-park.jpg";
import { ArchUpTransition } from "./SectionTransitions";
import { AlgorithmicCanvas } from "./AlgorithmicCanvas";

gsap.registerPlugin(ScrollTrigger);

/* 10. AGRI PARK */
export default function Section11() {
  const [activeZone, setActiveZone] = useState("Seed");
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftColRef.current,
        { opacity: 0, x: -35, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true } }
      );
      gsap.fromTo(rightColRef.current,
        { opacity: 0, x: 35, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 0.75, delay: 0.1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Smooth transition when changing activeZone
  useEffect(() => {
    if (!bannerRef.current || !overlayRef.current) return;
    const t1 = gsap.fromTo(bannerRef.current,
      { y: 8, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }
    );
    const t2 = gsap.fromTo(overlayRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
    return () => {
      t1.kill();
      t2.kill();
    };
  }, [activeZone]);

  return (
    <>
      <ArchUpTransition topColor="#FFFFFF" bottomColor="#E3EBE6" />
      <section id="park-section" ref={sectionRef} className="bg-[#E3EBE6] py-12 md:py-16 lg:py-20 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
        {/* Algorithmic Canopy Background */}
        <AlgorithmicCanvas mode="canopy" opacity={0.24} />

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          
          {/* Left Column: Interactive Zone Selector */}
          <div className="lg:col-span-5 text-left" ref={leftColRef}>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-forest/[0.08] border border-forest/20 font-mono text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse"></span>
              AGRI PARK
            </div>
            <h2 className="font-display text-[32px] sm:text-[40px] md:text-[46px] lg:text-[52px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
              Agaate Integrated Agri Park
            </h2>
            <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[640px] mb-8">
              A single living farm where India's leading seed, irrigation, nutrition, protection, and machinery partners come together. See products perform on real crops before making any farm input decisions.
            </p>
            
            <div>
              <div className="text-[12px] uppercase font-mono tracking-[0.1em] text-ink/50 mb-3 font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta"></span>
                SELECT A PARK ZONE TO EXPLORE:
              </div>
              <div className="flex flex-wrap gap-2.5 mb-6">
                {zones.map((z, idx) => {
                  const isSelected = activeZone === z.name;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveZone(z.name)}
                      className={`px-4.5 py-2.5 rounded-full text-xs sm:text-sm font-mono font-bold transition-all duration-300 ${
                        isSelected
                          ? "bg-forest text-cream shadow-md scale-105 border border-forest"
                          : "bg-white/80 border border-[#E7ECE8] text-ink/70 hover:border-forest/40 hover:bg-white"
                      }`}
                    >
                      {z.name} Zone
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Zone Description Banner */}
              <div
                ref={bannerRef}
                className="bg-white/95 backdrop-blur-md border border-forest/30 rounded-2xl p-6 shadow-lg mb-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-forest font-bold uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-forest animate-ping"></span>
                    ACTIVE EXPLORING: {currentZoneInfo.name} ZONE
                  </span>
                  <span className="text-[11px] font-mono text-ink/40">LIVE DEMO BED</span>
                </div>
                <p className="text-[16px] text-[#17211B] font-semibold leading-relaxed">
                  {currentZoneInfo.desc}
                </p>
              </div>

              <div>
                <a href="/agri-park" className="inline-flex items-center gap-2 font-semibold text-forest hover:text-emerald-600 transition-colors">
                  Explore Full Agri Park Details <span className="text-xl leading-none translate-y-[1px]">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Agri Park Interactive Visual */}
          <div className="lg:col-span-7 relative" ref={rightColRef}>
            <div className="aspect-[16/10] rounded-[28px] overflow-hidden border border-[#E7ECE8] shadow-2xl relative group bg-forest/10">
              <img src={agroPark} alt="Agaate Agri Park layout" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17211B]/80 via-transparent to-transparent opacity-85"></div>

              <div
                ref={overlayRef}
                className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 text-cream z-10"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/90 border border-cream/20 text-[11px] font-mono tracking-widest uppercase shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
                    LIVE FIELD TRIAL FACILITY
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold mt-2.5 drop-shadow">{activeZone} Demo Block Active</h3>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-xs font-mono">
                  <span>AGRONEWS: SENSORS ONLINE</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

