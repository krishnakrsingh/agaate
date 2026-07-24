import { useRef, useEffect, useState, lazy, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Leaf,
  Trees,
  Tractor,
  BrainCircuit,
  Shield,
  Droplets,
  ArrowUpToLine,
  Apple,
  ShoppingBasket,
} from "lucide-react";

const CropWorld = lazy(() => import("../CropWorld"));

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    num: "01",
    title: "Seed Selection",
    desc: "High-yield, disease-resistant hybrid varieties.",
    icon: Leaf,
  },
  {
    num: "02",
    title: "Nursery Growth",
    desc: "Bio-boosted programs for stronger roots and healthier early growth.",
    icon: Trees,
  },
  {
    num: "03",
    title: "Land Preparation",
    desc: "Scientific soil analysis, basal-dose planning, irrigation, and mulching.",
    icon: Tractor,
  },
  {
    num: "04",
    title: "Expert Advisory",
    desc: "Crop-specific strategies and stage-wise guidance from sowing to harvest.",
    icon: BrainCircuit,
  },
  {
    num: "05",
    title: "Preventive Care",
    desc: "Weather-based disease prevention and crop-specific protection.",
    icon: Shield,
  },
  {
    num: "06",
    title: "Smart Fertigation",
    desc: "Stage-wise water and nutrition based on crop and soil data.",
    icon: Droplets,
  },
  {
    num: "07",
    title: "Crop Support",
    desc: "Trellising solutions that encourage healthier vertical crop growth.",
    icon: ArrowUpToLine,
  },
  {
    num: "08",
    title: "Harvest",
    desc: "Peak-ripeness checks and proper harvesting practices.",
    icon: Apple,
  },
  {
    num: "09",
    title: "Market Access",
    desc: "Direct market integration and better pricing opportunities.",
    icon: ShoppingBasket,
  },
];

export default function SectionCropWorld() {
  const containerRef = useRef<HTMLElement>(null);

  // This ref is sent down to CropWorld to natively drive 3D transforms
  const progressRef = useRef(0);
  const introRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);

  // React state for text / progress UI
  const [activeStage, setActiveStage] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: "-100px 0px -100px 0px", threshold: 0 },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
    } else {
      mediaQuery.addListener(handler);
    }
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handler);
      } else {
        mediaQuery.removeListener(handler);
      }
    };
  }, []);

  useEffect(() => {
    if (!mounted || reducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Send raw progress (0 -> 1) down to the 3D scene without React re-renders
          progressRef.current = self.progress;

          if (introRef.current) introRef.current.style.opacity = self.progress > 0.03 ? "0" : "1";
          if (lineRef.current) lineRef.current.style.width = `${self.progress * 100}%`;
          if (playheadRef.current) playheadRef.current.style.left = `${self.progress * 100}%`;

          // The 9 stages are evenly distributed across the 0-1 progress
          const currentStage = Math.min(Math.floor(self.progress * 9), 8);
          setActiveStage((prev) => (prev !== currentStage ? currentStage : prev));
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, [mounted, reducedMotion]);

  if (!mounted) return null;

  // --- REDUCED MOTION FALLBACK ---
  // If user disables animations, or WebGL completely fails, we show a clean vertical timeline.
  if (reducedMotion) {
    return (
      <section className="bg-card py-12 md:py-16 lg:py-20 px-6 md:px-12 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-left">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[1px] bg-forest/30"></span>
              <span className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest">
                CROP LIFECYCLE
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-forest-deep leading-tight">
              One Partner for Your <span className="italic text-forest">Complete Crop Journey</span>
            </h2>
            <p className="text-ink/60 text-sm md:text-base mt-2 max-w-xl">
              Agaate brings agricultural guidance, trusted inputs, technology, and market access
              together in one connected ecosystem.
            </p>
          </div>
          <div className="relative pl-8 border-l border-forest/20 space-y-16 mt-8">
            {stages.map((stage) => {
              const Icon = stage.icon;
              return (
                <div key={stage.num} className="relative flex flex-col items-start">
                  <div className="absolute -left-[56px] top-0 w-12 h-12 rounded-full border border-forest/30 bg-forest/[0.02] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-forest" strokeWidth={1.5} />
                  </div>
                  <div className="font-mono text-xs font-semibold mb-1 pl-2 text-forest">
                    {stage.num}
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2 pl-2 text-forest-deep">
                    {stage.title}
                  </h3>
                  <p className="text-sm leading-relaxed pl-2 text-ink/70">{stage.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // --- 3D SCROLL PINNED EXPERIENCE ---
  return (
    <section
      id="journey-section"
      ref={containerRef}
      className="bg-card relative"
      style={{ height: "450vh" }}
    >
      {/* 100vh Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden">
        {/* Main 3D / Info Area */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          {/* Top fading intro text - visible briefly at scroll start */}
          <div
            ref={introRef}
            className="absolute top-12 left-6 lg:left-12 z-20 transition-opacity duration-700 max-w-lg pointer-events-none hidden lg:block"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[1px] bg-forest/30"></span>
              <span className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest">
                CROP LIFECYCLE
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-forest-deep leading-tight font-bold">
              One Partner for Your <br />
              <span className="italic font-normal text-forest">Complete Crop Journey</span>
            </h2>
            <p className="text-ink/65 text-sm md:text-base mt-3 max-w-md font-normal leading-relaxed">
              Agaate brings agricultural guidance, trusted inputs, technology, and market access
              together in one connected ecosystem.
            </p>
          </div>

          {/* Canvas Area (approx 55-60%) */}
          <div className="w-full lg:w-3/5 h-[50vh] lg:h-full relative z-10 flex items-center justify-center">
            <Suspense fallback={null}>
              <div className="w-full h-full absolute inset-0">
                <CropWorld progressRef={progressRef} inView={inView} />
              </div>
            </Suspense>
          </div>

          {/* Text Area (approx 40%) */}
          <div className="w-full lg:w-2/5 flex items-center justify-start lg:pl-16 relative z-20 h-[30vh] lg:h-auto">
            <div className="relative w-full max-w-md h-full flex items-center">
              {stages.map((stage, idx) => {
                const isActive = activeStage === idx;
                return (
                  <div
                    key={stage.num}
                    className="absolute left-0 w-full transition-all duration-700 ease-out"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: `translateY(${isActive ? "0" : idx < activeStage ? "-20px" : "20px"})`,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <div className="font-mono text-[14px] lg:text-[16px] text-forest font-bold mb-2">
                      {stage.num}
                    </div>
                    <h3 className="font-display text-2xl lg:text-4xl text-forest-deep font-bold mb-4">
                      {stage.title}
                    </h3>
                    <p className="text-ink/70 text-base lg:text-lg leading-relaxed">{stage.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="w-full bg-card py-6 px-6 lg:px-12 relative z-30 mt-auto">
          <div className="max-w-[1400px] mx-auto">
            {/* Desktop Labels */}
            <div className="justify-between items-end mb-8 hidden sm:flex">
              {stages.map((stage, idx) => {
                const isActive = activeStage === idx;
                const isPast = activeStage > idx;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center transition-all duration-300 w-16 relative"
                  >
                    <span
                      className={`font-mono text-[9px] uppercase tracking-wider transition-all duration-300 ${isActive ? "text-forest font-bold scale-110 -translate-y-1" : isPast ? "text-forest/70" : "text-ink/30"}`}
                    >
                      {stage.num}
                    </span>
                    <span
                      className={`text-[10px] lg:text-[11px] font-semibold mt-1.5 tracking-wider uppercase transition-all duration-300 ${isActive ? "text-forest-deep scale-105" : isPast ? "text-forest/75" : "text-ink/30"}`}
                    >
                      {stage.title.split(" ")[0]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Mobile Simple Label */}
            <div className="sm:hidden flex justify-between items-center mb-8 font-mono text-xs font-bold text-forest">
              <span>{stages[activeStage]?.title}</span>
              <span>{stages[activeStage]?.num} / 09</span>
            </div>

            {/* Unique "Precision Playhead" Track */}
            <div className="w-full h-[1px] bg-border relative mb-4">
              {/* Trailing Progress Line */}
              <div
                ref={lineRef}
                className="absolute top-0 left-0 h-[1.5px] bg-forest/40 -translate-y-[0.25px] transition-none"
                style={{ width: "0%" }}
              />

              {/* Static Segment Ticks */}
              {stages.map((_, idx) => (
                <div
                  key={idx}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[1px] h-[8px] bg-[#C6CFC9]"
                  style={{ left: `${(idx / 8) * 100}%` }}
                ></div>
              ))}

              {/* Smooth Gliding Playhead Monolith */}
              <div
                ref={playheadRef}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[2px] h-[28px] bg-forest pointer-events-none z-10 shadow-[0_0_12px_rgba(18,63,46,0.15)] rounded-[1px] transition-none"
                style={{ left: "0%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
