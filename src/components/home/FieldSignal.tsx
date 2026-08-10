import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";

import fieldAdvisory from "@/assets/field-advisory-gen.png";
import fertiliser from "@/assets/product-fertiliser.jpg";
import seeds from "@/assets/product-seeds.jpg";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText);



/* ─── Animated SVG infographics for each pain point ─── */

/** Pain 01: Wilting plant with a question mark */
const PlantSVG = () => (
  <svg className="svg-infographic" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stem */}
    <path className="draw-line" d="M100 200 C100 160 100 120 100 80" stroke="#143d31" strokeWidth="3" strokeLinecap="round"/>
    {/* Drooping leaf left */}
    <path className="draw-line" d="M100 120 C80 100 50 110 40 130" stroke="#5d7d37" strokeWidth="2.5" strokeLinecap="round"/>
    {/* Drooping leaf right */}
    <path className="draw-line" d="M100 100 C120 80 150 90 160 115" stroke="#5d7d37" strokeWidth="2.5" strokeLinecap="round"/>
    {/* Small dead leaf tip left */}
    <path className="draw-line" d="M40 130 C35 140 38 145 45 140" stroke="#5d7d37" strokeWidth="2" strokeLinecap="round"/>
    {/* Small dead leaf tip right */}
    <path className="draw-line" d="M160 115 C165 125 162 130 155 128" stroke="#5d7d37" strokeWidth="2" strokeLinecap="round"/>
    {/* Warning spots */}
    <circle className="spot-1" cx="75" cy="112" r="4" fill="#e8b84b" opacity="0"/>
    <circle className="spot-2" cx="130" cy="102" r="3.5" fill="#e8b84b" opacity="0"/>
    <circle className="spot-3" cx="50" cy="128" r="3" fill="#e8b84b" opacity="0"/>
    {/* Question mark above */}
    <text x="100" y="60" textAnchor="middle" fontSize="36" fontFamily="Georgia, serif" fontStyle="italic" fill="#143d31" opacity="0" className="svg-question">?</text>
    {/* Root system */}
    <path className="draw-line" d="M100 200 C90 210 80 215 70 212" stroke="#143d31" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
    <path className="draw-line" d="M100 200 C110 210 120 215 130 212" stroke="#143d31" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
  </svg>
);

/** Pain 02: Product shelf / compare bars */
const ShelfSVG = () => (
  <svg className="svg-infographic" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shelf line */}
    <path className="draw-line" d="M20 160 L180 160" stroke="#143d31" strokeWidth="2.5" strokeLinecap="round"/>
    {/* Bottles */}
    <rect className="bar bar-1" x="35" y="100" width="22" height="60" rx="4" fill="#5d7d37" opacity="0"/>
    <rect className="bar bar-2" x="68" y="80" width="22" height="80" rx="4" fill="#5d7d37" opacity="0"/>
    <rect className="bar bar-3" x="101" y="110" width="22" height="50" rx="4" fill="#5d7d37" opacity="0"/>
    <rect className="bar bar-4" x="134" y="90" width="22" height="70" rx="4" fill="#5d7d37" opacity="0"/>
    {/* Labels on bottles */}
    <line className="draw-line" x1="38" y1="125" x2="54" y2="125" stroke="white" strokeWidth="1.5" opacity="0"/>
    <line className="draw-line" x1="71" y1="105" x2="87" y2="105" stroke="white" strokeWidth="1.5" opacity="0"/>
    {/* X marks - confusion */}
    <text x="82" y="55" textAnchor="middle" fontSize="30" fontFamily="Georgia, serif" fill="#e74c3c" opacity="0" className="svg-question">✕</text>
    <text x="130" y="68" textAnchor="middle" fontSize="20" fontFamily="Georgia, serif" fill="#e74c3c" opacity="0" className="svg-question-2">?</text>
    {/* Ground shadow */}
    <ellipse cx="100" cy="168" rx="70" ry="5" fill="#143d31" opacity="0.06"/>
  </svg>
);

/** Pain 03: Calendar / planning grid */
const CalendarSVG = () => (
  <svg className="svg-infographic" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Calendar outline */}
    <rect className="draw-line" x="20" y="40" width="160" height="140" rx="10" stroke="#143d31" strokeWidth="2.5" fill="none"/>
    {/* Header bar */}
    <rect x="20" y="40" width="160" height="36" rx="10" fill="#143d31" opacity="0" className="cal-header"/>
    {/* Month label */}
    <text x="100" y="65" textAnchor="middle" fontSize="14" fontFamily="Georgia, serif" fontStyle="italic" fill="white" opacity="0" className="cal-month">Kharif Season</text>
    {/* Ring pins */}
    <circle className="draw-line" cx="55" cy="40" r="6" stroke="#143d31" strokeWidth="2" fill="none"/>
    <circle className="draw-line" cx="145" cy="40" r="6" stroke="#143d31" strokeWidth="2" fill="none"/>
    {/* Grid cells - animated one by one */}
    <rect className="cal-cell" x="28" y="84" width="24" height="20" rx="3" fill="#5d7d37" opacity="0"/>
    <rect className="cal-cell" x="58" y="84" width="24" height="20" rx="3" fill="#5d7d37" opacity="0"/>
    <rect className="cal-cell" x="88" y="84" width="24" height="20" rx="3" fill="#e8b84b" opacity="0"/>
    <rect className="cal-cell" x="118" y="84" width="24" height="20" rx="3" fill="#5d7d37" opacity="0"/>
    <rect className="cal-cell" x="148" y="84" width="24" height="20" rx="3" fill="#5d7d37" opacity="0"/>
    <rect className="cal-cell" x="28" y="112" width="24" height="20" rx="3" fill="#5d7d37" opacity="0"/>
    <rect className="cal-cell" x="58" y="112" width="24" height="20" rx="3" fill="#e74c3c" opacity="0"/>
    <rect className="cal-cell" x="88" y="112" width="24" height="20" rx="3" fill="#5d7d37" opacity="0"/>
    <rect className="cal-cell" x="118" y="112" width="24" height="20" rx="3" fill="#5d7d37" opacity="0"/>
    <rect className="cal-cell" x="148" y="112" width="24" height="20" rx="3" fill="#5d7d37" opacity="0"/>
    <rect className="cal-cell" x="28" y="140" width="24" height="20" rx="3" fill="#5d7d37" opacity="0"/>
    <rect className="cal-cell" x="58" y="140" width="24" height="20" rx="3" fill="#5d7d37" opacity="0"/>
    <rect className="cal-cell" x="88" y="140" width="24" height="20" rx="3" fill="#5d7d37" opacity="0"/>
    {/* Solo farmer icon */}
    <circle className="draw-line" cx="100" cy="168" r="8" stroke="#143d31" strokeWidth="2" fill="none"/>
    <path className="draw-line" d="M100 176 L100 190" stroke="#143d31" strokeWidth="2" strokeLinecap="round"/>
    <path className="draw-line" d="M88 183 L100 179 L112 183" stroke="#143d31" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const slides = [
  {
    seq: "seq-intro",
    image: fieldAdvisory,
    imageAlt: "A farmer in the field",
    label: "The farmer's reality",
    isIntro: true,
    headline: ["Every farmer faces moments where", "guesswork costs money."],
    SVGComponent: null,
  },
  {
    seq: "seq-0",
    number: "01",
    image: fieldAdvisory,
    imageAlt: "Farmer inspecting crop",
    label: "Crop health",
    headline: "Something is wrong with the crop.",
    body: "Yellowing leaves. Wilting at the tips. Spots that appeared overnight. The problem is clear — but the cause, and the right fix, is not.",
    SVGComponent: PlantSVG,
    svgAnimClass: "plant-svg",
  },
  {
    seq: "seq-1",
    number: "02",
    image: fertiliser,
    imageAlt: "Fertiliser products",
    label: "Input selection",
    headline: "Which input is actually right?",
    body: "Hundreds of packets on the shelf. Similar names, overlapping claims. No clear way to know which one fits your crop, your soil, your stage.",
    SVGComponent: ShelfSVG,
    svgAnimClass: "shelf-svg",
  },
  {
    seq: "seq-2",
    number: "03",
    image: seeds,
    imageAlt: "Farmer planning season",
    label: "Season planning",
    headline: "Planning alone, without a guide.",
    body: "Every season starts with big decisions — seed choice, sowing dates, fertigation plan, harvest timing. Most farmers make them without expert input and hope for the best.",
    SVGComponent: CalendarSVG,
    svgAnimClass: "cal-svg",
  },
];

export default function FieldSignal() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      /* ── Helpers ── */

      // Typewriter character reveal for headlines
      const typeHeadline = (selector: string, position?: string) => {
        const el = document.querySelector(selector) as HTMLElement;
        if (!el) return;
        const split = SplitText.create(el, { type: "chars,words", wordsClass: "inline-block" });
        const pos = position ?? ">";
        tl.fromTo(split.chars,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.04, stagger: 0.02, ease: "power1.out" },
          pos
        );
      };

      // Clean typewriter character reveal for body text (no gibberish)
      const typeBody = (selector: string, position?: string) => {
        const el = document.querySelector(selector) as HTMLElement;
        if (!el) return;
        const split = SplitText.create(el, { type: "chars,words", wordsClass: "inline-block" });
        const pos = position ?? "<+=0.2";
        tl.fromTo(split.chars,
          { opacity: 0 },
          { opacity: 1, duration: 0.03, stagger: 0.015, ease: "none" },
          pos
        );
      };

      // Draw SVG (plant)
      const animateSVG = (cls: string) => {
        tl.fromTo(`.${cls} .draw-line`, { drawSVG: "0%" }, { drawSVG: "100%", duration: 1, stagger: 0.06, ease: "power2.inOut" }, "<+=0.2")
          .to(`.${cls} .spot-1, .${cls} .spot-2, .${cls} .spot-3`, { opacity: 1, duration: 0.4, stagger: 0.15 }, "<+=0.5")
          .to(`.${cls} .svg-question`, { opacity: 1, scale: 1.2, duration: 0.5, ease: "back.out(1.7)" }, "<+=0.3");
      };

      // Draw SVG (shelf)
      const animateShelfSVG = (cls: string) => {
        tl.fromTo(`.${cls} .draw-line`, { drawSVG: "0%" }, { drawSVG: "100%", duration: 1, ease: "power2.inOut" }, "<+=0.2")
          .to(`.${cls} .bar`, { opacity: 0.85, y: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.4)" }, "<+=0.3")
          .to(`.${cls} .svg-question, .${cls} .svg-question-2`, { opacity: 1, duration: 0.5, stagger: 0.2 }, "<+=0.5");
      };

      // Draw SVG (calendar)
      const animateCalSVG = (cls: string) => {
        tl.fromTo(`.${cls} .draw-line`, { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.2, stagger: 0.05, ease: "power2.inOut" }, "<+=0.2")
          .to(`.${cls} .cal-header`, { opacity: 1, duration: 0.4 }, "<+=0.5")
          .to(`.${cls} .cal-month`, { opacity: 1, duration: 0.4 }, "<")
          .to(`.${cls} .cal-cell`, { opacity: 0.8, duration: 0.3, stagger: 0.04, ease: "back.out(1.2)" }, "<+=0.2");
      };

      /* ── INTRO ── */
      tl.fromTo(".seq-intro", { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" })
        .fromTo(".seq-intro .img-panel", { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 0.18, duration: 1.2 }, "<");
      typeHeadline(".seq-intro .type-headline", "<+=0.3");
      tl.to(".seq-intro", { opacity: 0, scale: 1.04, y: -40, duration: 1.2, ease: "power2.in" }, "+=0.8");

      /* ── SLIDE 01 ── */
      tl.fromTo(".seq-0", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.6")
        .fromTo(".seq-0 .img-panel", { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 0.15, duration: 1 }, "<");
      typeHeadline(".seq-0 .type-headline", "<+=0.3");
      typeBody(".seq-0 .scramble-body", "<+=0.2");
      animateSVG("plant-svg");
      tl.to(".seq-0", { opacity: 0, y: -40, duration: 1.2, ease: "power2.in" }, "+=0.5");

      /* ── SLIDE 02 ── */
      tl.fromTo(".seq-1", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.6")
        .fromTo(".seq-1 .img-panel", { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 0.15, duration: 1 }, "<");
      typeHeadline(".seq-1 .type-headline", "<+=0.3");
      typeBody(".seq-1 .scramble-body", "<+=0.2");
      animateShelfSVG("shelf-svg");
      tl.to(".seq-1", { opacity: 0, y: -40, duration: 1.2, ease: "power2.in" }, "+=0.5");

      /* ── SLIDE 03 ── */
      tl.fromTo(".seq-2", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.6")
        .fromTo(".seq-2 .img-panel", { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 0.15, duration: 1 }, "<");
      typeHeadline(".seq-2 .type-headline", "<+=0.3");
      typeBody(".seq-2 .scramble-body", "<+=0.2");
      animateCalSVG("cal-svg");
      tl.to(".seq-2", { opacity: 0, scale: 1.03, duration: 1.5, ease: "power2.in" }, "+=1");

    }, containerRef);

    return () => ctx.revert();
  }, []);


  return (
    <section
      ref={containerRef}
      id="start-here"
      className="relative bg-[#fafbf7]"
    >
      <div className="h-[500vh] w-full relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* ── INTRO SLIDE ── */}
          <div className="seq-intro absolute inset-0 flex flex-col items-center justify-center text-center px-6 opacity-0 will-change-transform">
            {/* Full-bleed image backdrop */}
            <div className="img-panel absolute inset-0 opacity-0 will-change-transform">
              <img src={fieldAdvisory} alt="A farmer in the field" className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-[#fafbf7]/85" />
            </div>
            <div className="relative z-10 max-w-5xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="w-16 h-[1.5px] bg-[#5d7d37]" />
                <p className="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.28em] text-[#5d7d37]">
                  The farmer's reality
                </p>
                <span className="w-16 h-[1.5px] bg-[#5d7d37]" />
              </div>
              <h2 className="type-headline font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-[#143d31] leading-[1.05]" style={{ perspective: 600 }}>
                Every farmer faces moments where guesswork costs money.
              </h2>
            </div>
          </div>

          {/* ── PAIN POINT SLIDES ── */}
          {slides.slice(1).map((slide) => {
            const SVGComp = slide.SVGComponent!;
            return (
              <div
                key={slide.number}
                className={`${slide.seq} absolute inset-0 flex items-center justify-center opacity-0 will-change-transform`}
              >
                {/* Full-bleed image backdrop */}
                <div className="img-panel absolute inset-0 opacity-0 will-change-transform">
                  <img src={slide.image} alt={slide.imageAlt} className="w-full h-full object-cover object-center" />
                  <div className="absolute inset-0 bg-[#fafbf7]/88" />
                </div>

                {/* Content layout: text left, SVG right */}
                <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                  {/* LEFT: Text */}
                  <div className="text-left">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="w-8 h-[1.5px] bg-[#5d7d37]" />
                      <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#5d7d37]">
                        {slide.label}
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="font-serif italic text-7xl md:text-8xl text-[#143d31]/10 leading-none select-none">
                        {slide.number}
                      </span>
                    </div>
                    <h3
                      className="type-headline font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight text-[#143d31] mb-7"
                      style={{ perspective: 600 }}
                    >
                      {slide.headline}
                    </h3>
                    <p className="scramble-body font-sans text-lg md:text-xl lg:text-2xl leading-relaxed text-[#536253] font-normal max-w-xl min-h-[5em]">
                      {slide.body}
                    </p>
                  </div>

                  {/* RIGHT: Animated SVG infographic */}
                  <div className={`${slide.svgAnimClass} flex items-center justify-center`}>
                    <div className="w-full max-w-[340px] mx-auto aspect-square">
                      <SVGComp />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}

