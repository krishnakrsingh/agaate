import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Land Planning & Layout",
    desc: "Site survey, soil mapping and block-level layout engineering.",
    time: "Week 1–2",
    deliverable: "Master Blueprint",
  },
  {
    num: "02",
    title: "Infrastructure Build-out",
    desc: "Drip grids, fertigation units, polyhouses and mulching systems.",
    time: "Week 3–6",
    deliverable: "Automated Drip Grid",
  },
  {
    num: "03",
    title: "Inputs at Scale",
    desc: "Bulk certified seed, bio-boosted nursery stock and staged nutrition.",
    time: "Week 7–8",
    deliverable: "Stage-Mapped Basal",
  },
  {
    num: "04",
    title: "Operations & Manpower",
    desc: "Labour scheduling, daily SOPs and digital field logging.",
    time: "Ongoing",
    deliverable: "Digital Field SOPs",
  },
  {
    num: "05",
    title: "Cost & ROI Planning",
    desc: "Phased budgets, profit projections and cash-flow telemetry.",
    time: "Phased",
    deliverable: "Financial Telemetry",
  },
  {
    num: "06",
    title: "Ongoing Management",
    desc: "Agronomy support, alerts and institutional market linkage.",
    time: "Full Season",
    deliverable: "Harvest Buyback Link",
  },
];

export default function SectionSetupSteps() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current?.children || [],
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        },
      );

      // Progress line draws down the timeline
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 65%",
            end: "bottom 65%",
            scrub: 0.5,
          },
        },
      );

      // Activate steps as they cross the reading line
      stepRefs.current.forEach((step, i) => {
        if (!step) return;
        ScrollTrigger.create({
          trigger: step,
          start: "top 62%",
          end: "bottom 62%",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });
        gsap.fromTo(
          step,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 88%", once: true },
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white text-ink py-20 md:py-28 lg:py-32 px-6 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">
        {/* Sticky left column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start" ref={leftRef}>
          <div className="flex items-center gap-6 border-t border-ink/10 pt-5 mb-8">
            <span className="font-jet text-[11px] md:text-xs uppercase tracking-[0.22em] text-forest">
              05 / Big Farm Setup
            </span>
          </div>
          <h2 className="font-serif text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.08] text-forest-deep mb-5">
            From bare land to <span className="italic text-forest">first harvest</span>
          </h2>
          <p className="text-[#59635D] text-[16px] md:text-[17px] leading-[1.7] max-w-[480px] mb-10">
            A turnkey build for commercial vegetable ventures — Agaate plans, builds and runs the
            operation end-to-end. Scroll the blueprint.
          </p>

          {/* Giant ghost step number */}
          <div className="relative h-[110px] md:h-[150px] mb-10 select-none" aria-hidden>
            {steps.map((s, i) => (
              <span
                key={i}
                className={`absolute left-0 top-0 font-serif text-[96px] md:text-[140px] leading-none transition-all duration-500 ${
                  active === i
                    ? "opacity-100 translate-y-0 text-forest/15"
                    : "opacity-0 translate-y-4 text-forest/15"
                }`}
              >
                {s.num}
              </span>
            ))}
            <span className="absolute left-1 bottom-0 font-jet text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-terracotta">
              Phase {steps[active].num} / 06 — {steps[active].time}
            </span>
          </div>

          <Link
            to="/services/big-farm-setup"
            className="inline-flex items-center gap-2.5 rounded-full bg-forest-deep text-cream px-7 py-4 text-[15px] font-semibold hover:bg-forest transition-all duration-300 group"
          >
            Plan my farm
            <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Timeline */}
        <div className="lg:col-span-7 relative pl-8 md:pl-12" ref={listRef}>
          <div className="absolute left-0 top-2 bottom-2 w-px bg-ink/10" />
          <div
            ref={lineRef}
            className="absolute left-0 top-2 bottom-2 w-px bg-forest origin-top"
            style={{ transform: "scaleY(0)" }}
          />
          {steps.map((s, i) => {
            const isActive = active === i;
            return (
              <div
                key={i}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="relative py-7 md:py-9 border-b border-ink/10 last:border-b-0"
              >
                <span
                  className={`absolute -left-8 md:-left-12 top-9 md:top-11 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 transition-all duration-500 ${
                    isActive
                      ? "bg-forest border-forest shadow-[0_0_0_6px_rgba(45,106,79,0.15)]"
                      : "bg-white border-ink/20"
                  }`}
                />
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <span
                    className={`font-jet text-[10px] md:text-[11px] uppercase tracking-[0.2em] transition-colors ${isActive ? "text-terracotta" : "text-ink/35"}`}
                  >
                    Phase {s.num} — {s.time}
                  </span>
                  <span
                    className={`font-jet text-[10px] md:text-[11px] uppercase tracking-[0.14em] px-3 py-1 rounded-full border transition-all duration-500 ${
                      isActive
                        ? "border-forest/40 text-forest bg-forest/5"
                        : "border-ink/10 text-ink/35"
                    }`}
                  >
                    ✦ {s.deliverable}
                  </span>
                </div>
                <h3
                  className={`font-serif text-[24px] md:text-[30px] leading-tight transition-colors duration-500 ${
                    isActive ? "text-forest-deep" : "text-ink/45"
                  }`}
                >
                  {s.title}
                </h3>
                <p
                  className={`text-[14px] md:text-[16px] leading-[1.65] mt-2 max-w-[520px] transition-colors duration-500 ${
                    isActive ? "text-[#59635D]" : "text-ink/30"
                  }`}
                >
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
