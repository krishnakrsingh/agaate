import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trees, Microscope, Handshake, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

gsap.registerPlugin(ScrollTrigger);

const ACCENT_WORDS = new Set(["science-backed", "certainty,", "roots", "sale."]);

const MANIFESTO =
  "Agaate replaces risky guesswork with science-backed farming — so every grower can plant with certainty, build from stronger roots, and finish at the right sale.";

const pillars = [
  {
    icon: Trees,
    title: "Seeds to sales, one partner",
    desc: "Complete crop support across the entire vegetable journey — sowing, growing, protecting, harvesting, selling.",
  },
  {
    icon: Microscope,
    title: "Science over superstition",
    desc: "Practical field research converted into stage-wise actions a farmer can actually execute on an acre.",
  },
  {
    icon: Handshake,
    title: "Partnerships that hold",
    desc: "Certified inputs from 25+ manufacturers and institutional buyers who pay for verified quality.",
  },
];



export default function SectionValueProp() {
  const sectionRef = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLParagraphElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Manifesto: word-by-word scrub reveal
      const words = gsap.utils.toArray<HTMLElement>(".manifesto-word", sectionRef.current);
      gsap.fromTo(
        words,
        { opacity: 0.13 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: "top 80%",
            end: "bottom 45%",
            scrub: 0.6,
          },
        },
      );

      // Pillars ruled rows
      gsap.fromTo(
        pillarsRef.current?.children || [],
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: pillarsRef.current, start: "top 85%", once: true },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="value-prop-section"
      className="bg-cream text-ink py-20 md:py-28 lg:py-36 px-6 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Kicker */}
        <div className="flex items-center justify-between gap-6 border-t border-ink/10 pt-5 mb-14 md:mb-20">
          <span className="font-jet text-[11px] md:text-xs uppercase tracking-[0.22em] text-forest">
            01 / The Proposition
          </span>
          <span className="hidden md:block font-jet text-[11px] uppercase tracking-[0.22em] text-ink/40">
            Seed → Sale
          </span>
        </div>

        {/* Manifesto */}
        <p
          ref={manifestoRef}
          className="font-serif text-[clamp(1.9rem,4.6vw,4rem)] leading-[1.18] tracking-[-0.01em] text-forest-deep max-w-[1200px] mb-20 md:mb-28"
        >
          {MANIFESTO.split(" ").map((word, i) => (
            <span
              key={i}
              className={`manifesto-word inline-block mr-[0.28em] ${
                ACCENT_WORDS.has(word) ? "italic text-terracotta" : ""
              }`}
            >
              {word}
            </span>
          ))}
        </p>

        {/* Pillars as ruled rows */}
        <div ref={pillarsRef} className="border-t border-ink/10">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="group grid grid-cols-12 items-start gap-4 md:gap-8 py-7 md:py-9 border-b border-ink/10 hover:bg-forest/[0.03] transition-colors duration-300 px-2 md:px-4 -mx-2 md:-mx-4"
              >
                <div className="col-span-2 md:col-span-1 font-jet text-xs md:text-sm text-terracotta pt-1.5">
                  0{i + 1}
                </div>
                <div className="col-span-10 md:col-span-4 flex items-center gap-4">
                  <span className="w-10 h-10 rounded-full border border-forest/25 flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-cream transition-all duration-300 flex-shrink-0">
                    <Icon className="w-4.5 h-4.5" strokeWidth={1.6} />
                  </span>
                  <h3 className="font-serif text-[22px] md:text-[28px] text-forest-deep leading-tight">
                    {p.title}
                  </h3>
                </div>
                <p className="col-span-10 col-start-3 md:col-span-6 md:col-start-6 text-[#59635D] text-[15px] md:text-[17px] leading-[1.65]">
                  {p.desc}
                </p>
                <div className="hidden md:flex col-span-1 justify-end pt-1">
                  <ArrowUpRight className="w-5 h-5 text-ink/25 group-hover:text-terracotta group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
              </div>
            );
          })}
        </div>




      </div>
    </section>
  );
}
