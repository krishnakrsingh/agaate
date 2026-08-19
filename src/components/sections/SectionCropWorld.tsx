import { useRef, useEffect, useState, lazy, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  CheckCircle,
  Drop,
  Flower,
  Plant,
  ShieldCheck,
  ShoppingBagOpen,
} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";

const CropWorld = lazy(() => import("../crop-world"));

gsap.registerPlugin(ScrollTrigger);

interface StageData {
  num: string;
  key: string;
  icon: typeof Plant;
  badge: string;
  title: string;
  desc: string;
  metrics: string[];
  ctaText: string;
  ctaLink: string;
}

const stages: StageData[] = [
  {
    num: "01",
    key: "01",
    icon: Plant,
    badge: "Stage 01 • Bio Nursery",
    title: "Bio-Boosted Nursery Plant",
    desc: "Pathogen-free, climate-controlled plug nurseries inoculated with Trichoderma & Mycorrhiza for 100% strong crop start.",
    metrics: ["98% Survival Rate", "15 Days Saved"],
    ctaText: "Order Nursery Seedlings",
    ctaLink: "/services#nursery",
  },
  {
    num: "02",
    key: "02",
    icon: Drop,
    badge: "Stage 02 • Precision Planting",
    title: "Soil & Root Optimization",
    desc: "Field mapping and custom fertigation schedules that maximize root-zone nutrient absorption and stop water waste.",
    metrics: ["35% Water Saved", "Optimal Root Setup"],
    ctaText: "Book Soil & Drip Audit",
    ctaLink: "/services#farm-tech",
  },
  {
    num: "03",
    key: "03",
    icon: ShieldCheck,
    badge: "Stage 03 • AI Advisory & Protection",
    title: "Biological Crop Shield",
    desc: "Real-time photo pest diagnosis via Agaate App + 100% authentic bio-inputs delivered from your local Kisaan Mall.",
    metrics: ["40% Chemical Savings", "< 15-Min Advisory"],
    ctaText: "Talk to Agronomist",
    ctaLink: "/services#farm-tech",
  },
  {
    num: "04",
    key: "04",
    icon: Flower,
    badge: "Stage 04 • Growth & Flowering",
    title: "Bloom Retention & Sizing",
    desc: "Stage-wise micronutrient boosting to maximize flower retention, uniform fruit sizing, and peak harvest quality.",
    metrics: ["+25% Yield Increase", "Grade-A Crop Quality"],
    ctaText: "Get Fertigation Plan",
    ctaLink: "/services#kisaan-mall",
  },
  {
    num: "05",
    key: "05",
    icon: ShoppingBagOpen,
    badge: "Stage 05 • Market Linkage",
    title: "Guaranteed Farm-Gate Sale",
    desc: "Direct buyer buyback contracts for hotels, exporters, and retail chains with digital weighment and instant payouts.",
    metrics: ["+20% Net Income", "Zero Mandi Cut"],
    ctaText: "Connect with Buyers",
    ctaLink: "/services#market-linkage",
  },
];

export default function SectionCropWorld() {
  const { t } = useTranslation("crop-world");
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

          // The 5 stages are evenly distributed across the 0-1 progress
          const currentStage = Math.min(Math.floor(self.progress * 5), 4);
          setActiveStage((prev) => (prev !== currentStage ? currentStage : prev));
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, [mounted, reducedMotion]);

  const scrollToStage = (stageIdx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const targetProgress = stageIdx / 4;
    const sectionHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScrollY = scrollTop + rect.top + targetProgress * sectionHeight;
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  };

  if (!mounted) return null;

  // Safe translation helper
  const getStageField = (
    key: string,
    field: "badge" | "title" | "desc" | "ctaText" | "ctaLink",
    fallback: string,
  ): string => {
    const res = t(`cropWorld.stages.${key}.${field}` as any);
    return typeof res === "string" && res ? res : fallback;
  };

  // --- REDUCED MOTION FALLBACK ---
  if (reducedMotion) {
    return (
      <section className="bg-white py-12 md:py-16 lg:py-20 px-6 md:px-12 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-left">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[1px] bg-forest/30"></span>
              <span className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest">
                {t("cropWorld.eyebrow")}
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-forest-deep leading-tight">
              {t("cropWorld.title1")}{" "}
              <span className="italic text-forest">{t("cropWorld.title2")}</span>
            </h2>
            <p className="text-ink/60 text-sm md:text-base mt-2 max-w-xl">
              {t("cropWorld.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {stages.map((stage) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.num}
                  className="border border-border rounded-2xl p-6 bg-cream/30 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-full border border-forest/30 bg-forest/5 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-forest" strokeWidth={1.5} />
                      </div>
                      <span className="font-mono text-xs font-bold text-forest/60">
                        {stage.num} / 05
                      </span>
                    </div>
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-forest/10 text-forest mb-2">
                      {getStageField(stage.key, "badge", stage.badge)}
                    </span>
                    <h3 className="font-display text-xl font-bold mb-2 text-forest-deep">
                      {getStageField(stage.key, "title", stage.title)}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink/70 mb-4">
                      {getStageField(stage.key, "desc", stage.desc)}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {stage.metrics.map((m, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono bg-forest/10 text-forest-deep border border-forest/20"
                        >
                          <CheckCircle className="w-3 h-3 text-forest" />
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <SlideUpPillButton
                    href={getStageField(stage.key, "ctaLink", stage.ctaLink)}
                    variant="dark"
                    size="sm"
                    fullWidth
                    label={getStageField(stage.key, "ctaText", stage.ctaText)}
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                    iconPosition="right"
                  />
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
      className="bg-white relative"
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
              <span className="font-jet text-[11px] font-bold uppercase tracking-[0.2em] text-forest">
                {t("cropWorld.eyebrow")}
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-forest-deep leading-tight font-extrabold tracking-tight">
              {t("cropWorld.title1")} <br />
              <span className="font-serif italic font-normal text-forest">
                {t("cropWorld.title2")}
              </span>
            </h2>
            <p className="font-sans text-ink/75 text-sm md:text-base mt-3 max-w-md font-normal leading-relaxed">
              {t("cropWorld.description")}
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
          <div className="w-full lg:w-2/5 flex items-center justify-start lg:pl-16 relative z-20 h-[36vh] lg:h-auto">
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
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-forest/10 text-forest border border-forest/20 mb-3">
                      <span>{getStageField(stage.key, "badge", stage.badge)}</span>
                    </div>

                    <h3 className="font-display text-2xl lg:text-3xl text-forest-deep font-bold mb-3 tracking-tight">
                      {getStageField(stage.key, "title", stage.title)}
                    </h3>

                    <p className="font-sans text-ink/75 text-sm lg:text-base leading-relaxed mb-4">
                      {getStageField(stage.key, "desc", stage.desc)}
                    </p>

                    {/* Impact Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {stage.metrics.map((m, mIdx) => (
                        <span
                          key={mIdx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white text-forest-deep border border-forest/20 shadow-sm"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-forest" />
                          {m}
                        </span>
                      ))}
                    </div>

                    {/* Direct Action CTA Button */}
                    <SlideUpPillButton
                      href={getStageField(stage.key, "ctaLink", stage.ctaLink)}
                      variant="dark"
                      size="md"
                      label={getStageField(stage.key, "ctaText", stage.ctaText)}
                      icon={<ArrowRight className="w-4 h-4" />}
                      iconPosition="right"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="w-full bg-white pt-4 pb-6 md:pb-8 px-6 lg:px-12 relative z-30 mt-auto">
          <div className="max-w-[1400px] mx-auto">
            {/* Desktop Stage Selector Buttons */}
            <div className="justify-between items-end mb-4 hidden sm:flex">
              {stages.map((stage, idx) => {
                const isActive = activeStage === idx;
                const isPast = activeStage > idx;
                const Icon = stage.icon;

                return (
                  <button
                    key={idx}
                    onClick={() => scrollToStage(idx)}
                    className="flex flex-col items-center transition-all duration-300 w-24 relative group cursor-pointer"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 mb-1.5 ${
                        isActive
                          ? "bg-forest-deep text-cream shadow-md scale-110"
                          : isPast
                            ? "bg-forest/10 text-forest"
                            : "bg-gray-100 text-ink/40 group-hover:bg-forest/10 group-hover:text-forest"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`font-jet text-[10px] uppercase tracking-wider transition-all duration-300 ${
                        isActive
                          ? "text-forest font-bold"
                          : isPast
                            ? "text-forest/70"
                            : "text-ink/40"
                      }`}
                    >
                      {stage.num}
                    </span>
                    <span
                      className={`font-sans text-[11px] font-semibold mt-0.5 tracking-tight text-center leading-tight transition-all duration-300 ${
                        isActive
                          ? "text-forest-deep font-bold"
                          : isPast
                            ? "text-forest/75"
                            : "text-ink/40"
                      }`}
                    >
                      {getStageField(stage.key, "title", stage.title).split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Simple Label */}
            <div className="sm:hidden flex justify-between items-center mb-4 font-mono text-xs font-bold text-forest">
              <span>
                {stages[activeStage] &&
                  getStageField(stages[activeStage].key, "title", stages[activeStage].title)}
              </span>
              <span>{stages[activeStage]?.num} / 05</span>
            </div>

            {/* Precision Playhead Track */}
            <div className="w-full h-[1px] bg-border relative mb-3">
              {/* Trailing Progress Line */}
              <div
                ref={lineRef}
                className="absolute top-0 left-0 h-[1.5px] bg-forest/40 -translate-y-[0.25px] transition-none"
                style={{ width: "0%" }}
              />

              {/* Static Segment Ticks */}
              {stages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToStage(idx)}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[3px] h-[10px] bg-[#C6CFC9] hover:bg-forest transition-colors cursor-pointer"
                  style={{ left: `${(idx / 4) * 100}%` }}
                ></button>
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
