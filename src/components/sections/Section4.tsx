import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArchTransition } from "./SectionTransitions";

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSolution() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current?.children || [],
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 92%", once: true }
        }
      );

      rowsRef.current.forEach((row) => {
        if (!row) return;
        const challenge = row.querySelector(".challenge-block");
        const point = row.querySelector(".point-anim");
        const line = row.querySelector(".line-anim-desktop");
        const solution = row.querySelector(".solution-block");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 95%", once: true }
        });

        tl.fromTo(challenge, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" })
          .fromTo(point, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1.1, duration: 0.35, ease: "back.out(2)" }, "-=0.3")
          .to(point, { scale: 1, duration: 0.2 })
          .fromTo(line, { width: "0%" }, { width: "100%", duration: 0.4, ease: "power2.inOut" }, "-=0.25")
          .fromTo(solution, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <>
      <ArchTransition topColor="#FFFFFF" bottomColor="#F8FAF7" />
      <section ref={sectionRef} className="bg-[#F8FAF7] py-24 lg:py-32 px-6 lg:px-12 relative overflow-hidden border-b border-[#E7ECE8] text-left">
        <div className="max-w-[1400px] mx-auto">
          {/* Introduction & Interactive Stage Filter */}
          <div className="mb-16 md:mb-20 max-w-4xl" ref={headerRef}>
            <div className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">
              INTERACTIVE TRANSFORMATION MATRIX
            </div>
            <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
              Farming Should Not Depend on Guesswork.
            </h2>
            <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[740px] mb-8">
              Every farming decision affects yield, cost, and profitability. Filter by stage to see how Agaate replaces guesswork with data-driven action:
            </p>

            {/* Interactive Stage Filter Pills */}
            <div className="flex flex-wrap gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-forest text-cream shadow-md scale-105"
                      : "bg-white border border-[#E7ECE8] text-[#59635D] hover:border-forest/40 hover:text-forest"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Problem-to-Solution Interactive Cards */}
          <div className="flex flex-col gap-8 relative z-10">
            {filteredTransformations.map((item, i) => (
              <div
                key={item.badge}
                ref={(el) => { rowsRef.current[i] = el; }}
                className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-0 group p-2 rounded-2xl transition-all duration-300"
              >
                {/* Left: Challenge Card */}
                <div className="challenge-block w-full lg:w-[42%] bg-white border border-[#E7ECE8] rounded-2xl p-6 md:p-8 shadow-sm group-hover:border-terracotta/40 group-hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-terracotta/10 text-terracotta font-mono text-xs rounded-full font-bold">
                      CHALLENGE • {item.badge}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-terracotta/60"></span>
                  </div>
                  <p className="text-[#17211B] text-[17px] md:text-[19px] leading-[1.5] font-semibold">
                    {item.challenge}
                  </p>
                </div>

                {/* Center: Laser Connector Node */}
                <div className="hidden lg:flex w-[16%] relative items-center justify-center">
                  <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-terracotta/30 via-forest to-forest line-anim-desktop"></div>
                  <div className="point-anim relative z-10 w-12 h-12 rounded-full bg-white border-2 border-forest shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-5 h-5 rounded-full bg-forest flex items-center justify-center text-cream text-xs font-bold animate-pulse">
                      →
                    </div>
                  </div>
                </div>

                {/* Right: Solution & Outcome Card */}
                <div className="solution-block w-full lg:w-[42%] bg-white border border-[#E7ECE8] rounded-2xl p-6 md:p-8 shadow-sm group-hover:border-forest/50 group-hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-moss/15 text-forest font-mono text-xs rounded-full font-bold">
                      AGAATE INTERVENTION
                    </span>
                    <span className="text-xs font-mono font-bold text-forest bg-forest/10 px-2.5 py-1 rounded-md">
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
          <div className="mt-20 md:mt-28 pt-16 border-t border-[#E4EAE5] flex flex-col items-center text-center">
            <p className="font-display text-[22px] md:text-[28px] font-bold text-[#17211B] leading-[1.4] max-w-[720px]">
              <span className="text-forest">Better decisions</span> at every stage. More confidence across the entire crop journey.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
