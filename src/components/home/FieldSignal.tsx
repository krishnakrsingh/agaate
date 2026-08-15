import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Intro backdrop only
import fieldAdvisory from "@/assets/field-advisory-gen.png";

gsap.registerPlugin(ScrollTrigger, SplitText);

const slides = [
  {
    seq: "seq-intro",
    image: fieldAdvisory,
    imageAlt: "A farmer in the field",
    label: "The farmer's reality",
    isIntro: true,
    headline: ["Every farmer faces moments where", "guesswork costs money."],
  },
  {
    seq: "seq-0",
    number: "01",
    label: "Crop health",
    headline: "Something is wrong with the crop.",
    body: "Yellowing leaves. Wilting at the tips. Spots that appeared overnight. The problem is clear — but the cause, and the right fix, is not.",
    deckClass: "deck-health",
    cards: [
      { icon: "🌿", caption: "Advisor Visit",  detail: "On-field agronomist" },
      { icon: "🔬", caption: "Diagnosis",      detail: "Soil & leaf analysis" },
      { icon: "💧", caption: "Foliar Check",   detail: "Nutrient deficiency" },
    ],
  },
  {
    seq: "seq-1",
    number: "02",
    label: "Input selection",
    headline: "Which input is actually right?",
    body: "Hundreds of packets on the shelf. Similar names, overlapping claims. No clear way to know which one fits your crop, your soil, your stage.",
    deckClass: "deck-shelf",
    cards: [
      { icon: "🧪", caption: "Bio-Nutrition",  detail: "Stage-matched inputs" },
      { icon: "💧", caption: "Precision Drip", detail: "Water-use optimised" },
      { icon: "🌱", caption: "Starter Seeds",  detail: "Verified batch stock" },
    ],
  },
  {
    seq: "seq-2",
    number: "03",
    label: "Season planning",
    headline: "Planning alone, without a guide.",
    body: "Every season starts with big decisions — seed choice, sowing dates, fertigation plan, harvest timing. Most farmers make them without expert input and hope for the best.",
    deckClass: "deck-calendar",
    cards: [
      { icon: "📅", caption: "Season Plan",    detail: "Sowing to harvest" },
      { icon: "🌾", caption: "Crop Advisory",  detail: "Expert-led guidance" },
      { icon: "📦", caption: "Market Ready",   detail: "Sell at peak price" },
    ],
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

      // Animate premium card deck fan-out on scroll
      const animateDeck = (cls: string) => {
        tl.fromTo(`.${cls} .card-0`,
          { x: 0, y: 0, rotation: -3, opacity: 0, scale: 0.95 },
          { x: -55, y: -15, rotation: -12, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
          "<+=0.2"
        )
        .fromTo(`.${cls} .card-1`,
          { x: 0, y: 0, rotation: 1, opacity: 0, scale: 0.95 },
          { x: 5, y: 5, rotation: -1, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
          "<"
        )
        .fromTo(`.${cls} .card-2`,
          { x: 0, y: 0, rotation: 5, opacity: 0, scale: 0.95 },
          { x: 65, y: 20, rotation: 10, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
          "<"
        );
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
      animateDeck("deck-health");
      tl.to(".seq-0", { opacity: 0, y: -40, duration: 1.2, ease: "power2.in" }, "+=0.5");

      /* ── SLIDE 02 ── */
      tl.fromTo(".seq-1", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.6")
        .fromTo(".seq-1 .img-panel", { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 0.15, duration: 1 }, "<");
      typeHeadline(".seq-1 .type-headline", "<+=0.3");
      typeBody(".seq-1 .scramble-body", "<+=0.2");
      animateDeck("deck-shelf");
      tl.to(".seq-1", { opacity: 0, y: -40, duration: 1.2, ease: "power2.in" }, "+=0.5");

      /* ── SLIDE 03 ── */
      tl.fromTo(".seq-2", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.6")
        .fromTo(".seq-2 .img-panel", { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 0.15, duration: 1 }, "<");
      typeHeadline(".seq-2 .type-headline", "<+=0.3");
      typeBody(".seq-2 .scramble-body", "<+=0.2");
      animateDeck("deck-calendar");
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
              <h2 className="type-headline font-sans text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-[#143d31] leading-[1.05]" style={{ perspective: 600 }}>
                Every farmer faces moments where guesswork costs money.
              </h2>
            </div>
          </div>

          {/* ── PAIN POINT SLIDES ── */}
          {slides.slice(1).map((slide) => {
            return (
              <div
                key={slide.number}
                className={`${slide.seq} absolute inset-0 flex items-center justify-center opacity-0 will-change-transform`}
              >
                {/* No image backdrop for pain-point slides */}

                {/* Content layout: text left, card deck right */}
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
                      className="type-headline font-sans text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight text-[#143d31] mb-7"
                      style={{ perspective: 600 }}
                    >
                      {slide.headline}
                    </h3>
                    <p className="scramble-body font-sans text-lg md:text-xl lg:text-2xl leading-relaxed text-[#536253] font-normal max-w-xl min-h-[5em]">
                      {slide.body}
                    </p>
                  </div>

                  {/* RIGHT: Typographic Icon Card Stack — no images */}
                  <div className={`${slide.deckClass} relative w-full h-[320px] sm:h-[380px] flex items-center justify-center`}>
                    {slide.cards && slide.cards.map((card, idx) => (
                      <div
                        key={idx}
                        className={`card-${idx} absolute w-[155px] sm:w-[185px] bg-white border border-stone-200 rounded-2xl shadow-[0_15px_40px_rgba(20,61,49,0.10)] select-none overflow-hidden`}
                        style={{ zIndex: 10 + idx }}
                      >
                        {/* Icon area */}
                        <div className="flex items-center justify-center h-[110px] sm:h-[130px] bg-[#f3f6ee] border-b border-stone-100">
                          <span className="text-5xl sm:text-6xl" role="img" aria-label={card.caption}>{card.icon}</span>
                        </div>
                        {/* Label area */}
                        <div className="px-3 py-3 text-center">
                          <p className="font-mono text-[9px] sm:text-[10px] font-bold tracking-widest text-[#143d31] uppercase mb-1">{card.caption}</p>
                          <p className="font-sans text-[10px] sm:text-[11px] text-[#5d7d37] leading-snug">{card.detail}</p>
                        </div>
                      </div>
                    ))}
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
