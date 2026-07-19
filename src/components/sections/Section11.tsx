import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import agroPark from "@/assets/agro-park.jpg";
import { ArchUpTransition } from "./SectionTransitions";
import { AlgorithmicCanvas } from "./AlgorithmicCanvas";
import { Sprout, Activity, Eye } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Section11() {
  const [activeZone, setActiveZone] = useState("Seed");
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const zones = [
    {
      name: "Seed",
      desc: "Live comparative test beds demonstrating germination percentages, early vigor, and pest resistance across 12 crop varieties.",
      crop: "Hybrid Tomatoes & Peppers",
      stat: "99.2% Germination vigor",
      sensor: "EC & Temperature Online",
    },
    {
      name: "Nursery",
      desc: "Smart polyhouse chamber verifying root-growth density using organic bio-inoculants in sterile cocopeat plugs.",
      crop: "Bio-Boosted Chillies",
      stat: "2.4x Lateral root density",
      sensor: "Humidity Dome Connected",
    },
    {
      name: "Irrigation",
      desc: "Pressure-compensating drip layout showing real-time flow monitoring, sand filtration, and automated venturi fertigation loops.",
      crop: "Cucumbers & Melons",
      stat: "-40% Water consumption",
      sensor: "Flowmeter telemetric active",
    },
    {
      name: "Nutrition",
      desc: "Trial plots demonstrating organic carbon accumulation under staged macronutrient dosing and custom mineral supplements.",
      crop: "Leafy Greens (Spinach/Lettuce)",
      stat: "+1.2% Soil Organic Carbon",
      sensor: "N-P-K optical spectrometer",
    },
    {
      name: "Crop Protection",
      desc: "Residue-free protection demo beds using botanical repellents and targeted bio-fungicides under dynamic weather advisories.",
      crop: "Cabbage & Broccoli",
      stat: "Zero chemical residues detected",
      sensor: "Spore trap telemetry live",
    },
    {
      name: "Technology",
      desc: "Command hub showing IoT solar node arrays, precision agricultural drone tracks, and micro-climate weather metrics.",
      crop: "Multi-Crop Field A",
      stat: "4G LoRa Mesh coverage active",
      sensor: "Drone multispectral scan complete",
    },
    {
      name: "Training",
      desc: "Practical hands-on training zones for agronomists, regional dealers, and progressive farming clusters.",
      crop: "Agronomist Cohort 04",
      stat: "120+ Farmers certified monthly",
      sensor: "Training hub audio-visual live",
    },
    {
      name: "Market",
      desc: "Cold storage chambers and automated sorting-grading lines showing post-harvest cooling and shipping package prep.",
      crop: "Mixed Vegetables",
      stat: "12-Day shelf life extension",
      sensor: "Chamber 02 Temp: 4.2°C",
    },
  ];

  const currentZoneInfo = zones.find((z) => z.name === activeZone) || zones[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: -35, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true },
        },
      );
      gsap.fromTo(
        rightColRef.current,
        { opacity: 0, x: 35, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.75,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!bannerRef.current || !overlayRef.current) return;
    const t1 = gsap.fromTo(
      bannerRef.current,
      { y: 8, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.5)" },
    );
    const t2 = gsap.fromTo(
      overlayRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
    );
    return () => {
      t1.kill();
      t2.kill();
    };
  }, [activeZone]);

  return (
    <>
      <ArchUpTransition topColor="var(--bone)" bottomColor="#FFFFFF" />
      <section
        id="park-section"
        ref={sectionRef}
        className="bg-white py-20 md:py-28 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left"
      >
        <AlgorithmicCanvas mode="canopy" opacity={0.24} />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
          {/* Left Column: Interactive zone selector */}
          <div className="lg:col-span-5 text-left" ref={leftColRef}>
            <span className="font-jet text-[11px] md:text-xs uppercase tracking-[0.22em] text-forest mb-4 block font-semibold">
              05 / Agri Park Demonstration
            </span>
            <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.08] text-forest-deep mb-6 tracking-tight">
              A living testbed of <span className="italic text-terracotta">agritech.</span>
            </h2>
            <p className="text-[#59635D] text-[16px] md:text-[18px] leading-[1.7] max-w-xl mb-8">
              Agaate’s 20-acre Integrated Agri Park brings leading seed houses, irrigation
              designers, and smart telemetry manufacturers to the soil. Evaluate product performance
              live on real crops.
            </p>

            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-forest/40 mb-4 font-bold flex items-center gap-2">
                <Sprout className="w-4 h-4 text-forest" />
                Select a Zone to Inspect Telemetry:
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {zones.map((z, idx) => {
                  const isSelected = activeZone === z.name;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveZone(z.name)}
                      className={`px-4 py-2.5 rounded-full text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "bg-forest text-cream shadow-md border border-forest"
                          : "bg-bone/50 border border-[#E7ECE8] text-forest/70 hover:border-forest"
                      }`}
                    >
                      {z.name}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Zone Description Banner */}
              <div
                ref={bannerRef}
                className="bg-bone rounded-2xl p-6 border border-[#E7ECE8] shadow-sm mb-6 flex flex-col gap-4"
              >
                <div>
                  <span className="text-[10px] font-mono text-terracotta font-bold uppercase tracking-wider block mb-1">
                    Live Demo · {currentZoneInfo.name} Block
                  </span>
                  <p className="text-sm md:text-base text-forest-deep font-semibold leading-relaxed">
                    {currentZoneInfo.desc}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#E7ECE8] text-xs font-mono">
                  <div>
                    <span className="text-forest/40 block">CROP SPECIES</span>
                    <span className="text-forest font-bold">{currentZoneInfo.crop}</span>
                  </div>
                  <div>
                    <span className="text-forest/40 block">TRIAL RESULT</span>
                    <span className="text-terracotta font-bold">{currentZoneInfo.stat}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-forest/40 block">TELEMETRY SCANNER</span>
                    <span className="text-forest-deep font-bold flex items-center gap-1.5 mt-0.5">
                      <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                      {currentZoneInfo.sensor}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="/agri-park"
                  className="inline-flex items-center gap-1.5 font-semibold text-xs md:text-sm text-forest hover:text-forest-deep transition-colors"
                >
                  Explore full park map details
                  <Eye className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Layout */}
          <div className="lg:col-span-7 relative" ref={rightColRef}>
            <div className="aspect-[16/10] rounded-[2rem] overflow-hidden border border-[#E7ECE8] shadow-2xl relative group bg-bone">
              <img
                src={agroPark}
                alt="Agaate Agri Park layout"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/50 via-transparent to-transparent opacity-85"></div>

              <div
                ref={overlayRef}
                className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 text-cream z-10"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-forest-deep/90 border border-cream/10 text-[9px] font-mono tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Demonstration Field
                  </div>
                  <h3 className="font-serif text-2xl font-bold mt-2">
                    {activeZone} Zone Telemetry
                  </h3>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-[10px] font-mono">
                  <span>Sensors Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
