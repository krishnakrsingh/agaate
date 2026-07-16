import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArchUpTransition } from "./SectionTransitions";
import { AlgorithmicCanvas } from "./AlgorithmicCanvas";

gsap.registerPlugin(ScrollTrigger);

/* 6. TECHNOLOGY AND FARM MANAGEMENT */
export default function Section6() {
  const [activeTech, setActiveTech] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const hudContentRef = useRef<HTMLDivElement>(null);

  const techList = [
    {
      title: "Crop tracking",
      desc: "WhatsApp-based stage updates & expert image-checks.",
      plot: "Plot 01 — Hybrid Tomato",
      stage: "Stage 3: Flowering",
      metric1Label: "CANOPY COVERAGE",
      metric1Val: "88%",
      metric2Label: "HEALTH INDEX",
      metric2Val: "9.4 / 10",
      status: "Verified by Agronomist"
    },
    {
      title: "IoT soil & weather monitoring",
      desc: "Real-time moisture, temp, and field weather tracking.",
      plot: "Plot 04 — Sweet Chilli",
      stage: "Day 45 Active",
      metric1Label: "SOIL MOISTURE",
      metric1Val: "42% Optimal",
      metric2Label: "NITROGEN (N)",
      metric2Val: "Balanced",
      status: "IoT Sensor Node Active"
    },
    {
      title: "AI crop-health detection",
      desc: "Upload photos for instant disease diagnostics.",
      plot: "AI Vision Scanner",
      stage: "Diagnostic Run",
      metric1Label: "PATHOGEN ALERT",
      metric1Val: "0% Detected",
      metric2Label: "LEAF CHLOROPHYLL",
      metric2Val: "Excellent",
      status: "Scan Complete • Healthy"
    },
    {
      title: "Smart irrigation",
      desc: "Automated schedules that save water & fertilizer.",
      plot: "Drip Zone B",
      stage: "Auto-Cycle #2",
      metric1Label: "FLOW RATE",
      metric1Val: "14 L/hr",
      metric2Label: "WATER SAVINGS",
      metric2Val: "+38% vs Flood",
      status: "Fertigation Valve Open"
    },
    {
      title: "Drone monitoring",
      desc: "High-visibility aerial checks & targeted input spraying.",
      plot: "Aerial Grid 12",
      stage: "Altitude 30m",
      metric1Label: "COVERAGE SPEED",
      metric1Val: "5 Acres / min",
      metric2Label: "SPRAY DRIFT",
      metric2Val: "< 2% Low",
      status: "GPS RTK Locked"
    },
    {
      title: "Data-driven advisory",
      desc: "Decisions backed by local, historical soil profiles.",
      plot: "Regional Soil Data",
      stage: "Basal Planning",
      metric1Label: "YIELD PREDICTION",
      metric1Val: "+24% Uplift",
      metric2Label: "RISK PROFILE",
      metric2Val: "Low Risk",
      status: "Advisory Synchronized"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(hudRef.current,
        { scale: 0.94, opacity: 0, y: 25 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate HUD transition when changing tech tab
  useEffect(() => {
    if (!hudContentRef.current) return;
    gsap.fromTo(hudContentRef.current,
      { opacity: 0, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }
    );
  }, [activeTech]);

  const current = techList[activeTech];

  return (
    <>
      <ArchUpTransition topColor="#FFFFFF" bottomColor="#E3EBE6" />
      <section id="tech-section" ref={sectionRef} className="bg-[#E3EBE6] py-24 lg:py-32 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          
          {/* Left Column: Interactive Tech Selector Tabs */}
          <div className="lg:col-span-6 text-left">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-forest/[0.08] border border-forest/20 font-mono text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse"></span>
              SMART FARMING TELEMETRY
            </div>
            <h2 className="font-display text-[32px] sm:text-[40px] md:text-[46px] lg:text-[52px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
              Manage Your Farm, Not Just Grow It
            </h2>
            <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[640px] mb-8">
              Click or hover any technology below to inspect live field data from Agaate's unified control dashboard:
            </p>

            <div className="space-y-3">
              {techList.map((t, i) => {
                const isActive = activeTech === i;
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setActiveTech(i)}
                    onClick={() => setActiveTech(i)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-start justify-between ${
                      isActive
                        ? "bg-white border-forest shadow-lg scale-[1.02]"
                        : "bg-white/40 border-transparent hover:bg-white/80 hover:border-[#E7ECE8]"
                    }`}
                  >
                    <div className="flex gap-3.5 items-start">
                      <span className={`w-3 h-3 rounded-full mt-1.5 transition-all flex-shrink-0 ${isActive ? "bg-forest shadow-[0_0_12px_#2D6A4F] animate-pulse" : "bg-[#C4CFC8]"}`}></span>
                      <div>
                        <h3 className={`font-sans font-bold text-[17px] sm:text-[19px] leading-[1.3] ${isActive ? "text-forest" : "text-[#17211B]"}`}>{t.title}</h3>
                        <p className="text-[#667069] text-[14px] sm:text-[15px] leading-[1.5] mt-1">{t.desc}</p>
                      </div>
                    </div>
                    {isActive && (
                      <span className="text-xs font-mono font-bold text-forest bg-forest/10 px-2.5 py-1 rounded-md self-center border border-forest/20 flex-shrink-0">
                        ACTIVE HUD
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Telemetry HUD Simulation with Algorithmic Radar Canvas */}
          <div className="lg:col-span-6" ref={hudRef}>
            <div className="aspect-[4/3] w-full bg-[#111A15] border border-emerald-500/40 rounded-[28px] p-6 sm:p-8 shadow-2xl flex flex-col justify-between text-cream relative overflow-hidden group">
              {/* Embedded Algorithmic Telemetry Canvas */}
              <AlgorithmicCanvas mode="telemetry" opacity={0.35} />

              {/* Subtle grid line background pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1F2E25_1px,transparent_1px),linear-gradient(to_bottom,#1F2E25_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none"></div>

              {/* Scanning laser beam effect */}
              <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-radar-scan pointer-events-none opacity-80"></div>

              {/* Top HUD Header */}
              <div ref={hudContentRef} className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cream/15 pb-5 mb-6">
                    <div>
                      <span className="font-mono text-[11px] text-emerald-400 tracking-widest uppercase flex items-center gap-2 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        LIVE SENSOR TELEMETRY
                      </span>
                      <div className="font-display font-bold text-2xl sm:text-3xl text-cream mt-1 drop-shadow">{current.plot}</div>
                    </div>
                    <span className="px-3.5 py-1.5 bg-emerald-400/15 border border-emerald-400/40 text-emerald-300 text-xs font-mono rounded-full font-bold shadow-inner">
                      {current.stage}
                    </span>
                  </div>

                  {/* Live Dynamic Telemetry Gauges */}
                  <div className="grid grid-cols-2 gap-4 sm:gap-5">
                    <div className="bg-white/[0.07] border border-cream/15 rounded-2xl p-4 sm:p-5 backdrop-blur-md group-hover:border-emerald-400/50 transition-colors shadow-lg">
                      <div className="text-[11px] text-cream/60 font-mono tracking-wider">{current.metric1Label}</div>
                      <div className="text-2xl sm:text-3xl font-display font-bold text-emerald-400 mt-2">{current.metric1Val}</div>
                    </div>
                    <div className="bg-white/[0.07] border border-cream/15 rounded-2xl p-4 sm:p-5 backdrop-blur-md group-hover:border-emerald-400/50 transition-colors shadow-lg">
                      <div className="text-[11px] text-cream/60 font-mono tracking-wider">{current.metric2Label}</div>
                      <div className="text-2xl sm:text-3xl font-display font-bold text-cream mt-2">{current.metric2Val}</div>
                    </div>
                  </div>
                </div>

                {/* Interactive Signal Graph Visual */}
                <div className="relative z-10 my-6 flex items-end gap-1.5 sm:gap-2 h-20 bg-black/30 p-3 rounded-xl border border-cream/10">
                  {[40, 65, 80, 50, 90, 75, 85, 60, 95, 70, 85, 90, 60, 80].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-emerald-500/30 to-emerald-400 rounded-full transition-all duration-500 hover:brightness-125"
                      style={{ height: `${Math.max(16, (h * ((activeTech + 1) * 11 + i * 7) % 64) + 12)}px` }}
                    ></div>
                  ))}
                </div>

                {/* Bottom HUD Footer */}
                <div className="relative z-10 border-t border-cream/15 pt-4 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-cream/70">
                  <span>STATUS: <span className="text-cream font-bold">{current.status}</span></span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                    SYNCED WITH AGAATE AI ✓
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

