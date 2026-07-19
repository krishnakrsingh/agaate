import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArchUpTransition } from "./SectionTransitions";
import { ArrowRight, HelpCircle, ShieldCheck, ChevronRight } from "lucide-react";

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
      challenge:
        "Uncertain seed selection and inconsistent germination rates leading to uneven plant stands.",
      intervention:
        "Scientific crop planning, bio-boosted custom seedling nursery, and direct transplant scheduling.",
      outcome: "98% Stronger crop establishment",
      badge: "Stage 01",
    },
    {
      category: "Nutrition",
      challenge:
        "Incorrect soil nutrition ratios, chemical run-off, and heavy fertilizer cost miscalculations.",
      intervention:
        "Custom soil-profile basal planning, automated slow-release nutrition, and stage-wise fertigation.",
      outcome: "+25% More efficient input use",
      badge: "Stage 02",
    },
    {
      category: "Disease Protection",
      challenge:
        "Unpredictable fungal/pest attacks, lack of early diagnostics, and late-stage preventative losses.",
      intervention:
        "Weather-integrated preventive agronomy forecasts, AI leaf diagnostics, and zero-residue bio-fungicides.",
      outcome: "3x Earlier threat detection",
      badge: "Stage 03",
    },
    {
      category: "Market Linkage",
      challenge:
        "Uncertain post-harvest pricing, middleman exploitation, and lack of cold logistics coordination.",
      intervention:
        "Pre-harvest buyback commitments, crop grading standardization, and direct institutional retail supply chains.",
      outcome: "Premium pricing guaranteed",
      badge: "Stage 04",
    },
  ];

  const filteredTransformations =
    activeCategory === "All"
      ? transformations
      : transformations.filter((t) => t.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children || [],
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true },
        },
      );

      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        const challenge = row.querySelector(".challenge-block");
        const point = row.querySelector(".point-anim");
        const line = row.querySelector(".line-anim-desktop");
        const solution = row.querySelector(".solution-block");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 92%", once: true },
        });

        tl.fromTo(
          challenge,
          { opacity: 0, x: -30, scale: 0.98 },
          { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "power3.out" },
        )
          .fromTo(
            point,
            { opacity: 0, scale: 0.3, rotation: -90 },
            { opacity: 1, scale: 1, rotation: 0, duration: 0.45, ease: "back.out(2)" },
            "-=0.3",
          )
          .fromTo(
            line,
            { width: "0%" },
            { width: "100%", duration: 0.45, ease: "power2.inOut" },
            "-=0.25",
          )
          .fromTo(
            solution,
            { opacity: 0, x: 30, scale: 0.98 },
            { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "power3.out" },
            "-=0.3",
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!cardsContainerRef.current) return;
    gsap.fromTo(
      cardsContainerRef.current.children,
      { opacity: 0, y: 15, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.07, ease: "power2.out" },
    );
  }, [activeCategory]);

  return (
    <>
      <ArchUpTransition topColor="#FFFFFF" bottomColor="var(--bone)" />
      <section
        ref={sectionRef}
        className="bg-bone py-20 md:py-28 px-6 lg:px-12 relative overflow-hidden border-b border-[#E7ECE8] text-left"
      >
        {/* Fine organic background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(var(--forest)_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Block */}
          <div className="mb-16 max-w-4xl" ref={headerRef}>
            <span className="font-jet text-[11px] md:text-xs uppercase tracking-[0.22em] text-forest mb-4 block font-semibold">
              03 / Decision Intelligence
            </span>
            <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.08] text-forest-deep mb-6 tracking-tight">
              Farming shouldn't depend on <span className="italic text-terracotta">guesswork.</span>
            </h2>
            <p className="text-[#59635D] text-[16px] md:text-[18px] leading-[1.7] max-w-2xl mb-10">
              Every critical crop decision dictates your end-season profit. Explore how the Agaate
              ecosystem replaces traditional uncertainty with verified, science-backed field
              operations:
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-forest-deep text-cream shadow-md border border-forest-deep"
                      : "bg-white border border-[#E7ECE8] text-forest/70 hover:border-forest/40 hover:text-forest-deep"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Core Interactive Cards Grid */}
          <div ref={cardsContainerRef} className="flex flex-col gap-6 relative z-10">
            {filteredTransformations.map((item, i) => (
              <div
                key={item.badge}
                ref={(el) => {
                  rowsRef.current[i] = el;
                }}
                className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-0 group p-4 rounded-[2rem] bg-white/70 backdrop-blur-sm border border-white/80 transition-all duration-300 hover:shadow-xl hover:border-forest/20"
              >
                {/* Left Card: Challenge */}
                <div className="challenge-block w-full lg:w-[45%] bg-white border border-[#E7ECE8] rounded-2xl p-6 md:p-8 shadow-sm group-hover:border-terracotta/20 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-terracotta/10 text-terracotta font-mono text-[10px] tracking-widest rounded-full font-bold uppercase">
                        {item.badge} · Challenge
                      </span>
                      <HelpCircle className="w-4 h-4 text-terracotta/40" />
                    </div>
                    <p className="text-ink font-serif text-xl md:text-2xl leading-snug font-medium">
                      {item.challenge}
                    </p>
                  </div>
                </div>

                {/* Center Node Indicator */}
                <div className="hidden lg:flex w-[10%] relative items-center justify-center">
                  <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-terracotta/20 via-forest to-forest line-anim-desktop"></div>
                  <div className="point-anim relative z-10 w-9 h-9 rounded-full bg-cream border border-forest shadow-md flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                    <ChevronRight className="w-4 h-4 text-forest-deep" />
                  </div>
                </div>

                {/* Mobile Arrow */}
                <div className="flex lg:hidden items-center justify-center py-2 text-forest-deep">
                  <span className="text-sm font-mono tracking-widest text-forest">
                    AGAATE INTERVENTION
                  </span>
                </div>

                {/* Right Card: Intervention */}
                <div className="solution-block w-full lg:w-[45%] bg-white border border-[#E7ECE8] rounded-2xl p-6 md:p-8 shadow-sm group-hover:border-forest/40 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-forest/10 text-forest font-mono text-[10px] tracking-widest rounded-full font-bold uppercase">
                        Agaate System
                      </span>
                      <span className="text-[11px] font-mono font-bold text-forest bg-forest/5 px-2.5 py-1 rounded border border-forest/10">
                        {item.outcome}
                      </span>
                    </div>
                    <p className="text-[#1a3c34] font-sans text-[15px] md:text-[16px] leading-relaxed font-semibold">
                      {item.intervention}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* End Note */}
          <div className="mt-16 text-center">
            <p className="font-serif text-[22px] md:text-[26px] text-forest-deep max-w-xl mx-auto leading-snug">
              Making precision decisions at every single stage of the crop lifecycle.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
