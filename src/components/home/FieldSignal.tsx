import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Image backdrops for each scroll sequence
import fieldAdvisory from "@/assets/field-advisory-gen.png";
import cropHealthImg from "@/assets/crop_health_diagnostic.png";
import inputSelectionImg from "@/assets/organic_fertilizer_shelf.png";
import seasonPlanningImg from "@/assets/crop_planning_calendar.png";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    seq: "seq-intro",
    image: fieldAdvisory,
    label: "The farmer's reality",
    headline: "Every farmer faces moments where guesswork costs money.",
  },
  {
    seq: "seq-0",
    number: "01",
    label: "01 · Crop health",
    headline: "Something is wrong with the crop.",
    body: "Yellowing leaves. Wilting at the tips. Spots that appeared overnight. The problem is clear — but the cause, and the right fix, is not.",
    image: cropHealthImg,
  },
  {
    seq: "seq-1",
    number: "02",
    label: "02 · Input selection",
    headline: "Which input is actually right?",
    body: "Hundreds of packets on the shelf. Similar names, overlapping claims. No clear way to know which one fits your crop, your soil, your stage.",
    image: inputSelectionImg,
  },
  {
    seq: "seq-2",
    number: "03",
    label: "03 · Season planning",
    headline: "Planning alone, without a guide.",
    body: "Every season starts with big decisions — seed choice, sowing dates, fertigation plan, harvest timing. Most farmers make them without expert input and hope for the best.",
    image: seasonPlanningImg,
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
          scrub: 0.3,
        },
      });

      /* ── Helpers ── */

      // Snappy headline reveal
      const typeHeadline = (selector: string, position?: string) => {
        const el = document.querySelector(selector) as HTMLElement;
        if (!el) return;
        const pos = position ?? ">";
        tl.fromTo(
          el,
          { opacity: 0, y: 35, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" },
          pos,
        );
      };

      /* ── INTRO SLIDE ── */
      tl.fromTo(
        ".seq-intro",
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" },
      ).fromTo(
        ".seq-intro .img-panel",
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 0.22, duration: 0.8, ease: "power3.out" },
        "<",
      );
      typeHeadline(".seq-intro .type-headline", "<+=0.1");
      tl.to(
        ".seq-intro",
        { opacity: 0, scale: 1.08, y: -50, duration: 0.6, ease: "power3.in" },
        "+=0.2",
      );

      /* ── SLIDE 01 ── */
      tl.fromTo(
        ".seq-0",
        { opacity: 0, scale: 0.92, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.2",
      ).fromTo(
        ".seq-0 .img-panel",
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 0.22, duration: 0.8, ease: "power3.out" },
        "<",
      );
      typeHeadline(".seq-0 .type-headline", "<+=0.1");
      tl.to(
        ".seq-0",
        { opacity: 0, scale: 1.08, y: -50, duration: 0.6, ease: "power3.in" },
        "+=0.2",
      );

      /* ── SLIDE 02 ── */
      tl.fromTo(
        ".seq-1",
        { opacity: 0, scale: 0.92, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.2",
      ).fromTo(
        ".seq-1 .img-panel",
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 0.22, duration: 0.8, ease: "power3.out" },
        "<",
      );
      typeHeadline(".seq-1 .type-headline", "<+=0.1");
      tl.to(
        ".seq-1",
        { opacity: 0, scale: 1.08, y: -50, duration: 0.6, ease: "power3.in" },
        "+=0.2",
      );

      /* ── SLIDE 03 ── */
      tl.fromTo(
        ".seq-2",
        { opacity: 0, scale: 0.92, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.2",
      ).fromTo(
        ".seq-2 .img-panel",
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 0.22, duration: 0.8, ease: "power3.out" },
        "<",
      );
      typeHeadline(".seq-2 .type-headline", "<+=0.1");
      tl.to(
        ".seq-2",
        { opacity: 0, scale: 1.05, duration: 0.8, ease: "power3.in" },
        "+=0.3",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="start-here" className="relative bg-[#fafbf7]">
      <div className="h-[320vh] w-full relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* ── INTRO SLIDE ── */}
          <div className="seq-intro absolute inset-0 flex flex-col items-center justify-center text-center px-6 opacity-0 will-change-transform">
            {/* Full-bleed photo backdrop */}
            <div className="img-panel absolute inset-0 opacity-0 will-change-transform">
              <img
                src={fieldAdvisory}
                alt="The farmer's reality"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-[#fafbf7]/85 backdrop-blur-[2px]" />
            </div>
            <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
              <h2
                className="type-headline font-sans text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-[#143d31] leading-[1.05]"
              >
                Every farmer faces moments where guesswork costs money.
              </h2>
            </div>
          </div>

          {/* ── PAIN POINT SLIDES (CENTERED LARGE HEADLINES ONLY) ── */}
          {slides.slice(1).map((slide) => {
            return (
              <div
                key={slide.number}
                className={`${slide.seq} absolute inset-0 flex flex-col items-center justify-center text-center px-6 opacity-0 will-change-transform`}
              >
                {/* Full-bleed photo backdrop */}
                <div className="img-panel absolute inset-0 opacity-0 will-change-transform">
                  <img
                    src={slide.image}
                    alt={slide.headline}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-[#fafbf7]/88 backdrop-blur-[2px]" />
                </div>

                {/* Centered Large Display Headline */}
                <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
                  <h3 className="type-headline font-sans text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight text-[#143d31]">
                    {slide.headline}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

