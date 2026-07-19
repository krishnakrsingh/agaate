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

const metrics = [
  {
    label: "Germination & survival",
    traditional: "50–70%",
    boosted: "90–98%",
    from: 58,
    to: 94,
    note: "+40% base survival",
  },
  {
    label: "Seed waste",
    traditional: "High baseline",
    boosted: "Near zero",
    from: 100,
    to: 8,
    note: "30–50% reduction",
  },
  {
    label: "Chemical dependency",
    traditional: "High baseline",
    boosted: "Significantly reduced",
    from: 100,
    to: 38,
    note: "50–70% cut",
  },
  {
    label: "Overall crop yield",
    traditional: "Average baseline",
    boosted: "Optimized",
    from: 72,
    to: 100,
    note: "15–30% increase",
  },
];

export default function SectionValueProp() {
  const sectionRef = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLParagraphElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

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

      // Dark paradigm panel entrance
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 60, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: panelRef.current, start: "top 85%", once: true },
        },
      );

      // Comparison bars grow on entry
      gsap.utils.toArray<HTMLElement>(".bar-fill", barsRef.current).forEach((bar) => {
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: bar.dataset.w + "%",
            duration: 1.3,
            ease: "power3.inOut",
            scrollTrigger: { trigger: bar, start: "top 90%", once: true },
          },
        );
      });

      // Founder quote
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: quoteRef.current, start: "top 88%", once: true },
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
        <div ref={pillarsRef} className="border-t border-ink/10 mb-24 md:mb-32">
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

        {/* Paradigm Shift — dark data panel */}
        <div
          ref={panelRef}
          className="bg-night text-cream rounded-[2rem] md:rounded-[2.5rem] p-7 md:p-12 lg:p-16 relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-forest/40 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-14">
              <div>
                <span className="font-jet text-[11px] md:text-xs uppercase tracking-[0.22em] text-terracotta">
                  The Paradigm Shift
                </span>
                <h3 className="font-serif text-[clamp(1.7rem,3.4vw,2.9rem)] leading-[1.12] mt-4 max-w-[560px]">
                  Traditional direct sowing vs the{" "}
                  <span className="italic text-emerald-400">Bio-Boosted nursery</span>
                </h3>
              </div>
              <p className="font-jet text-[11px] uppercase tracking-[0.18em] text-cream/40 max-w-[220px] leading-relaxed">
                We don't sell plants. We sell risk mitigation.
              </p>
            </div>

            <div ref={barsRef} className="border-t border-cream/10">
              {metrics.map((m, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-8 items-center py-6 md:py-7 border-b border-cream/10"
                >
                  <div className="lg:col-span-3 flex lg:flex-col items-baseline lg:items-start justify-between gap-2">
                    <span className="font-sans font-bold text-[15px] md:text-[17px]">
                      {m.label}
                    </span>
                    <span className="font-jet text-[10px] uppercase tracking-[0.16em] text-emerald-400">
                      {m.note}
                    </span>
                  </div>
                  <div className="lg:col-span-6 space-y-2.5">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-[7px] rounded-full bg-cream/[0.07] overflow-hidden">
                        <div
                          className="bar-fill h-full rounded-full bg-terracotta/70"
                          data-w={m.from}
                          style={{ width: 0 }}
                        />
                      </div>
                      <span className="font-jet text-[10px] md:text-[11px] text-cream/45 w-[104px] md:w-[132px] text-right flex-shrink-0">
                        {m.traditional}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-[7px] rounded-full bg-cream/[0.07] overflow-hidden">
                        <div
                          className="bar-fill h-full rounded-full bg-emerald-400"
                          data-w={m.to}
                          style={{ width: 0 }}
                        />
                      </div>
                      <span className="font-jet text-[10px] md:text-[11px] text-emerald-300 w-[104px] md:w-[132px] text-right flex-shrink-0">
                        {m.boosted}
                      </span>
                    </div>
                  </div>
                  <div className="hidden lg:flex lg:col-span-3 justify-end">
                    <div className="flex items-center gap-3 font-jet text-[10px] uppercase tracking-[0.16em] text-cream/40">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-terracotta/70" /> Traditional
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" /> Agaate
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Founder pull-quote */}
        <div ref={quoteRef} className="max-w-[880px] mx-auto text-center mt-24 md:mt-32">
          <div className="font-serif text-terracotta text-[64px] leading-[0.4] select-none">“</div>
          <blockquote className="font-serif italic text-[clamp(1.4rem,2.8vw,2.2rem)] leading-[1.35] text-forest-deep mt-6 mb-8">
            We built Agaate with a simple belief — every farmer deserves the right guidance, the
            right tools, and the right support, so their hard work never goes to loss.
          </blockquote>
          <div className="font-jet text-[11px] uppercase tracking-[0.22em] text-ink/50 mb-8">
            Ankit Rawat — Founder & CEO
          </div>
          <Link
            to="/about"
            className="inline-flex items-center gap-2.5 rounded-full border border-forest/30 px-7 py-3.5 text-[15px] font-semibold text-forest hover:bg-forest hover:text-cream transition-all duration-300 group"
          >
            Read our story
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
