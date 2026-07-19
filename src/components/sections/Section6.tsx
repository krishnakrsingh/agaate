import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlgorithmicCanvas } from "./AlgorithmicCanvas";
import { Radio, ShieldCheck, Activity, Target, Cpu, Layers } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const techList = [
  {
    title: "Crop Tracking",
    desc: "WhatsApp stage updates with expert image checks.",
    plot: "Plot 01 — Hybrid Tomato",
    stage: "Stage 3 · Flowering",
    m1l: "CANOPY COVERAGE",
    m1v: "88%",
    m2l: "HEALTH INDEX",
    m2v: "9.4 / 10",
    status: "Verified by agronomist",
    icon: Target,
  },
  {
    title: "IoT Soil & Weather",
    desc: "Real-time moisture, temperature and field weather nodes.",
    plot: "Plot 04 — Sweet Chilli",
    stage: "Day 45 · Active",
    m1l: "SOIL MOISTURE",
    m1v: "42% optimal",
    m2l: "NITROGEN (N)",
    m2v: "Balanced",
    status: "IoT sensor node live",
    icon: Radio,
  },
  {
    title: "AI Crop-Health Scan",
    desc: "Photo uploads diagnosed instantly for disease pressure.",
    plot: "AI Vision Scanner",
    stage: "Diagnostic run",
    m1l: "PATHOGEN ALERT",
    m1v: "0% detected",
    m2l: "CHLOROPHYLL",
    m2v: "Excellent",
    status: "Scan complete · healthy",
    icon: Cpu,
  },
  {
    title: "Smart Irrigation",
    desc: "Automated schedules that save water and fertilizer.",
    plot: "Drip Zone B",
    stage: "Auto-cycle #2",
    m1l: "FLOW RATE",
    m1v: "14 L/hr",
    m2l: "WATER SAVINGS",
    m2v: "+38%",
    status: "Fertigation valve open",
    icon: Layers,
  },
  {
    title: "Drone Monitoring",
    desc: "Aerial checks and targeted input spraying on demand.",
    plot: "Aerial Grid 12",
    stage: "Altitude 30m",
    m1l: "COVERAGE SPEED",
    m1v: "5 ac/min",
    m2l: "SPRAY DRIFT",
    m2v: "< 2%",
    status: "GPS RTK locked",
    icon: Activity,
  },
  {
    title: "Data Advisory",
    desc: "Decisions backed by local historical soil profiles.",
    plot: "Regional Soil Data",
    stage: "Basal planning",
    m1l: "YIELD PREDICTION",
    m1v: "+24%",
    m2l: "RISK PROFILE",
    m2v: "Low",
    status: "Advisory synchronized",
    icon: ShieldCheck,
  },
];

const TICKER = [
  "SOIL MOISTURE 42%",
  "NPK BALANCED",
  "DRONE SORTIE COMPLETE",
  "pH 6.8 OPTIMAL",
  "HUMIDITY 61%",
  "PEST PRESSURE LOW",
  "DRIP PRESSURE 1.2 BAR",
  "YIELD FORECAST +24%",
  "CANOPY 88%",
  "NEXT FERTIGATION 06:00",
];

export default function Section6() {
  const [activeTech, setActiveTech] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const hudContentRef = useRef<HTMLDivElement>(null);
  const sparkStrokeRef = useRef<SVGPathElement>(null);
  const sparkFillRef = useRef<SVGPathElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children || [],
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        },
      );
      gsap.fromTo(
        listRef.current?.children || [],
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: listRef.current, start: "top 85%", once: true },
        },
      );
      gsap.fromTo(
        hudRef.current,
        { opacity: 0, y: 40, scale: 0.975 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: hudRef.current, start: "top 88%", once: true },
        },
      );

      // Ticker marquee
      if (tickerRef.current) {
        gsap.to(tickerRef.current, {
          xPercent: -50,
          ease: "none",
          duration: 32,
          repeat: -1,
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Redraw sparkline + flash HUD on tab change
  useEffect(() => {
    if (hudContentRef.current) {
      gsap.fromTo(
        hudContentRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      );
    }
    const strokePath = sparkStrokeRef.current;
    const fillPath = sparkFillRef.current;
    if (strokePath && fillPath) {
      const pts: number[] = [];
      for (let i = 0; i < 24; i++) {
        pts.push(34 + Math.sin((i + activeTech * 5) * 0.7) * 22 + ((activeTech * 13 + i * 7) % 17));
      }
      const dStroke = pts
        .map((v, i) => `${i === 0 ? "M" : "L"}${(i / 23) * 560},${100 - v}`)
        .join(" ");
      const dFill = `${dStroke} L560,100 L0,100 Z`;

      strokePath.setAttribute("d", dStroke);
      fillPath.setAttribute("d", dFill);

      const len = strokePath.getTotalLength();
      gsap.fromTo(
        strokePath,
        { strokeDasharray: len, strokeDashoffset: len },
        { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" },
      );
      gsap.fromTo(fillPath, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: "power2.out" });
    }
  }, [activeTech]);

  const current = techList[activeTech];

  return (
    <section
      id="tech-section"
      ref={sectionRef}
      className="bg-[#faf9f5] text-[#141413] py-20 md:py-28 lg:py-32 relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-14 md:mb-18">
          <div className="flex items-center justify-between gap-6 border-t border-[#e6dfd8] pt-5 mb-8">
            <span className="font-jet text-[11px] md:text-xs uppercase tracking-[0.22em] text-[#cc785c] font-semibold">
              03 / Farm Telemetry
            </span>
            <span className="hidden md:flex items-center gap-2 font-jet text-[11px] uppercase tracking-[0.22em] text-[#8e8b82]">
              Live signal index
            </span>
          </div>
          <h2 className="font-serif text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.08] max-w-[720px] text-[#141413] font-normal">
            Manage the farm, <span className="italic text-[#cc785c]">not just the crop</span>
          </h2>
          <p className="text-[#3d3d3a] text-[15px] md:text-[16px] leading-[1.7] max-w-[560px] mt-5 font-sans">
            Six distinct field technologies linked to a unified diagnostic interface. Select a
            system to inspect its live agricultural waveform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Tab list */}
          <div ref={listRef} className="lg:col-span-5 border-t border-[#e6dfd8]">
            {techList.map((t, i) => {
              const isActive = activeTech === i;
              const Icon = t.icon;
              return (
                <button
                  key={i}
                  onMouseEnter={() => setActiveTech(i)}
                  onClick={() => setActiveTech(i)}
                  className={`w-full text-left flex items-start gap-4 md:gap-5 py-5 md:py-6 border-b border-[#e6dfd8] px-4 -mx-4 transition-all duration-300 relative rounded-xl ${
                    isActive ? "bg-[#efe9de] pl-5" : "hover:bg-[#f5f0e8]"
                  }`}
                >
                  {/* Floating Left Indicator Bar */}
                  <div
                    className={`absolute left-0 top-3 bottom-3 w-[4px] rounded-r bg-[#cc785c] transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <span
                    className={`font-mono text-xs pt-1 transition-colors ${isActive ? "text-[#cc785c] font-bold" : "text-[#8e8b82]"}`}
                  >
                    0{i + 1}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="flex items-center gap-2">
                      <span
                        className={`p-1 rounded bg-[#efe9de] text-[#cc785c] transition-opacity ${isActive ? "opacity-100" : "opacity-50"}`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      <span
                        className={`block font-serif text-[19px] md:text-[22px] leading-tight transition-colors ${isActive ? "text-[#cc785c] font-semibold" : "text-[#141413]"}`}
                      >
                        {t.title}
                      </span>
                    </span>
                    <span
                      className={`block text-[13px] leading-relaxed mt-1.5 transition-colors ${isActive ? "text-[#3d3d3a] font-sans" : "text-[#6c6a64] font-sans"}`}
                    >
                      {t.desc}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* HUD console */}
          <div className="lg:col-span-7 lg:sticky lg:top-24" ref={hudRef}>
            <div className="relative rounded-2xl border border-[#252320] bg-[#181715] p-6 md:p-9 overflow-hidden shadow-[0_24px_80px_rgba(20,20,19,0.15)]">
              <AlgorithmicCanvas mode="telemetry" opacity={0.06} />

              <div ref={hudContentRef} className="relative z-10 text-[#faf9f5]">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#252320] pb-5 mb-6">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#a09d96] flex items-center gap-2 font-semibold">
                      Telemetry Node
                    </span>
                    <div className="font-serif text-[28px] md:text-[32px] mt-2 leading-tight text-[#faf9f5]">
                      {current.plot}
                    </div>
                  </div>
                  <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-[#cc785c] border border-[#cc785c]/30 bg-[#cc785c]/10 px-3.5 py-1.5 rounded-full">
                    {current.stage}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="rounded-xl border border-[#252320] bg-[#252320] p-4 md:p-5">
                    <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#a09d96]">
                      {current.m1l}
                    </div>
                    <div className="font-serif text-[26px] md:text-[32px] text-[#cc785c] mt-1.5 leading-none">
                      {current.m1v}
                    </div>
                  </div>
                  <div className="rounded-xl border border-[#252320] bg-[#252320] p-4 md:p-5">
                    <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#a09d96]">
                      {current.m2l}
                    </div>
                    <div className="font-serif text-[26px] md:text-[32px] mt-1.5 leading-none text-[#faf9f5]">
                      {current.m2v}
                    </div>
                  </div>
                </div>

                {/* Sparkline chart with fill gradient */}
                <div className="rounded-xl border border-[#252320] bg-[#1f1e1b] p-5 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#a09d96]">
                      Signal Waveform
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#cc785c] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#cc785c]" /> Nominal
                    </span>
                  </div>
                  <svg viewBox="0 0 560 100" className="w-full h-[80px]" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="sparkline-coral-fade" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#cc785c" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#cc785c" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Fill Area */}
                    <path
                      ref={sparkFillRef}
                      d="M0,100 L560,100 Z"
                      fill="url(#sparkline-coral-fade)"
                      stroke="none"
                    />
                    {/* Stroke Line */}
                    <path
                      ref={sparkStrokeRef}
                      d="M0,50 L560,50"
                      fill="none"
                      stroke="#cc785c"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#252320] pt-4 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.16em] text-[#a09d96]">
                  <span>
                    Status: <span className="text-[#faf9f5] font-semibold">{current.status}</span>
                  </span>
                  <span className="text-[#cc785c] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#cc785c]" />
                    Agaate Core System Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker marquee */}
      <div className="mt-16 md:mt-20 border-y border-[#e6dfd8] py-5 bg-[#efe9de]">
        <div ref={tickerRef} className="flex gap-10 w-max whitespace-nowrap pl-6">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span
              key={i}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#3d3d3a] flex items-center gap-10"
            >
              {item} <span className="text-[#cc785c]">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
