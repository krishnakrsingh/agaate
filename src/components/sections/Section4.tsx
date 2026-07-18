import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArchUpTransition } from "./SectionTransitions";

gsap.registerPlugin(ScrollTrigger);

export default function Section4() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  const categories = ["All", "Nursery & Seed", "Nutrition", "Disease Protection", "Market Linkage"];

  const transformations = [
    {
      category: "Nursery & Seed",
      challenge: "Uncertain seed selection and inconsistent germination rates",
      intervention: "Scientific crop planning & bio-boosted nursery support",
      outcome: "98% Stronger crop establishment",
      badge: "Stage 01"
    },
    {
      category: "Nutrition",
      challenge: "Incorrect soil nutrition and fertilizer miscalculations",
      intervention: "Soil-based basal planning & stage-wise custom fertigation",
      outcome: "+25% More efficient input use",
      badge: "Stage 02"
    },
    {
      category: "Disease Protection",
      challenge: "Unpredictable pest attacks and preventable yield loss",
      intervention: "Weather-informed preventive advisory & AI diagnostic alerts",
      outcome: "Earlier action & reduced crop risk",
      badge: "Stage 03"
    },
    {
      category: "Market Linkage",
      challenge: "Uncertain market access and lack of pricing visibility",
      intervention: "Structured harvest planning & direct institutional linkage",
      outcome: "Premium pricing readiness",
      badge: "Stage 04"
    }
  ];

  const filteredTransformations = activeCategory === "All"
    ? transformations
    : transformations.filter(t => t.category === activeCategory);

  // Animate initial header & row entrances
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current?.children || [],
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true }
        }
      );

      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        const challenge = row.querySelector(".challenge-block");
        const point = row.querySelector(".point-anim");
        const line = row.querySelector(".line-anim-desktop");
        const solution = row.querySelector(".solution-block");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 92%", once: true }
        });

        tl.fromTo(challenge, { opacity: 0, x: -30, scale: 0.96 }, { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "power3.out" })
          .fromTo(point, { opacity: 0, scale: 0.3, rotation: -90 }, { opacity: 1, scale: 1.15, rotation: 0, duration: 0.45, ease: "back.out(2.2)" }, "-=0.35")
          .to(point, { scale: 1, duration: 0.2 })
          .fromTo(line, { width: "0%" }, { width: "100%", duration: 0.45, ease: "power2.inOut" }, "-=0.3")
          .fromTo(solution, { opacity: 0, x: 30, scale: 0.96 }, { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "power3.out" }, "-=0.35");
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth filter transition animation
  useEffect(() => {
    if (!cardsContainerRef.current) return;
    gsap.fromTo(cardsContainerRef.current.children,
      { opacity: 0, y: 15, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.07, ease: "power2.out" }
    );
  }, [activeCategory]);

  return (
    <>
      <ArchUpTransition topColor="#FFFFFF" bottomColor="#E3EBE6" />
      <section ref={sectionRef} className="bg-[#E3EBE6] py-12 md:py-16 lg:py-20 px-6 lg:px-12 relative overflow-hidden border-b border-[#E7ECE8] text-left">
        {/* Subtle decorative background grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#2D6A4F_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.06] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Introduction & Interactive Stage Filter */}
          <div className="mb-14 md:mb-18 max-w-4xl" ref={headerRef}>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-forest/[0.08] border border-forest/20 font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.1em] text-forest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse"></span>
              INTERACTIVE TRANSFORMATION MATRIX
            </div>
            <h2 className="font-display text-[32px] sm:text-[40px] md:text-[46px] lg:text-[52px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
              Farming Should Not Depend on Guesswork.
            </h2>
            <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[740px] mb-8">
              Every farming decision affects yield, cost, and profitability. Filter by stage to see how Agaate replaces guesswork with data-driven action across your entire crop cycle:
            </p>

            {/* Interactive Stage Filter Pills */}
            <div className="flex flex-wrap gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-forest text-cream shadow-md scale-105 border border-forest"
                      : "bg-white border border-[#E7ECE8] text-[#59635D] hover:border-forest/40 hover:text-forest hover:bg-white/90"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Problem-to-Solution Interactive Cards */}
          <div ref={cardsContainerRef} className="flex flex-col gap-6 lg:gap-8 relative z-10">
            {filteredTransformations.map((item, i) => (
              <div
                key={item.badge}
                ref={(el) => { rowsRef.current[i] = el; }}
                className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-0 group p-2 sm:p-3 rounded-3xl bg-white/40 backdrop-blur-sm border border-white/60 transition-all duration-300 hover:shadow-lg hover:border-forest/20"
              >
                {/* Left: Challenge Card */}
                <div className="challenge-block w-full lg:w-[42%] bg-white border border-[#E7ECE8] rounded-2xl p-6 md:p-8 shadow-sm group-hover:border-terracotta/40 group-hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-terracotta/10 text-terracotta font-mono text-xs rounded-full font-bold">
                      CHALLENGE • {item.badge}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-terracotta/60 group-hover:scale-125 transition-transform"></span>
                  </div>
                  <p className="text-[#17211B] text-[17px] md:text-[19px] leading-[1.5] font-semibold">
                    {item.challenge}
                  </p>
                </div>

                {/* Center: Laser Connector Node */}
                <div className="hidden lg:flex w-[16%] relative items-center justify-center">
                  <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-terracotta/40 via-forest to-forest line-anim-desktop"></div>
                  <div className="point-anim relative z-10 w-12 h-12 rounded-full bg-white border-2 border-forest shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:border-forest-deep transition-all duration-300">
                    <div className="w-6 h-6 rounded-full bg-forest flex items-center justify-center text-cream text-xs font-bold animate-pulse group-hover:bg-forest-deep">
                      →
                    </div>
                  </div>
                </div>

                {/* Mobile visual connector indicator */}
                <div className="flex lg:hidden items-center justify-center py-1 text-forest font-bold text-lg animate-bounce">
                  ↓
                </div>

                {/* Right: Solution & Outcome Card */}
                <div className="solution-block w-full lg:w-[42%] bg-white border border-[#E7ECE8] rounded-2xl p-6 md:p-8 shadow-sm group-hover:border-forest/50 group-hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 bg-moss/15 text-forest font-mono text-xs rounded-full font-bold">
                      AGAATE INTERVENTION
                    </span>
                    <span className="text-xs font-mono font-bold text-forest bg-forest/10 px-2.5 py-1 rounded-md border border-forest/20">
                      ✓ {item.outcome}
                    </span>
                  </div>
                  <p className="text-[#17211B] text-[17px] md:text-[19px] leading-[1.5] font-bold text-forest">
                    {item.intervention}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* End Statement & Connection */}
          <div className="mt-16 md:mt-24 pt-14 border-t border-[#E4EAE5] flex flex-col items-center text-center">
            <p className="font-display text-[22px] md:text-[28px] font-bold text-[#17211B] leading-[1.4] max-w-[720px]">
              <span className="text-forest">Better decisions</span> at every stage. More confidence across the entire crop journey.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

