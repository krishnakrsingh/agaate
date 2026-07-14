import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import heroPlant from "@/assets/hero-plant.jpg";
import rottenPlant from "@/assets/rotten-plant.jpg";
import agroPark from "@/assets/agro-park.jpg";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";
import pSeeds from "@/assets/product-seeds.jpg";
import pFert from "@/assets/product-fertiliser.jpg";
import pIrr from "@/assets/product-irrigation.jpg";
import pTools from "@/assets/product-tools.jpg";
import aboutFarmerAdvisor from "@/assets/about-farmer-advisor.png";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PlantJourney from "@/components/PlantJourney";
import LoadingScreen from "@/components/LoadingScreen";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agaate — Connected Agri-Ecosystem" },
      { name: "description", content: "Agaate combines trusted agricultural inputs, expert guidance, farm technology, and market access." },
    ],
  }),
  component: Index,
});

/* SECTION DIVIDER HELPERS */
function WaveTransition({ topColor = "#FFFFFF", bottomColor = "#F8FAF7" }: { topColor?: string; bottomColor?: string }) {
  return (
    <div className="w-full overflow-hidden leading-none relative z-10" style={{ backgroundColor: topColor }}>
      <svg className="relative block w-full h-12 md:h-20" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
        <path
          d="M0 0C320 80 640 100 960 60C1200 30 1360 80 1440 100V120H0V0Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
}

function ArchTransition({ topColor = "#FFFFFF", bottomColor = "#F8FAF7" }: { topColor?: string; bottomColor?: string }) {
  return (
    <div className="w-full overflow-hidden leading-none relative z-10" style={{ backgroundColor: topColor }}>
      <svg className="relative block w-full h-12 md:h-16" viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
        <path d="M0,80 C480,0 960,0 1440,80 L1440,80 L0,80 Z" fill={bottomColor} />
      </svg>
    </div>
  );
}

/* ANIMATED STAT COUNTER */
function AnimatedStatCard({ num, suffix, label, isLeftColumn, isTopRow }: { num: number; suffix: string; label: string; isLeftColumn: boolean; isTopRow: boolean }) {
  const [val, setVal] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { v: 0 };
      gsap.to(obj, {
        v: num,
        duration: 2.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        },
        onUpdate: () => setVal(Math.floor(obj.v)),
      });
    }, cardRef);
    return () => ctx.revert();
  }, [num]);

  return (
    <div
      ref={cardRef}
      className={`text-left md:px-8 first:pl-0 last:pr-0 group transition-all duration-300 hover:translate-y-[-4px]
        ${isLeftColumn ? "pr-6 border-r border-[#E7ECE8] md:border-r-0" : "pl-6"} 
        ${isTopRow ? "pb-6 border-b border-[#E7ECE8] md:border-b-0 md:pb-0" : ""}
      `}
    >
      <div className="font-display text-[42px] md:text-[56px] text-forest font-bold tracking-[-0.04em] leading-none mb-3 group-hover:text-forest-deep transition-colors">
        {val.toLocaleString()}{suffix}
      </div>
      <div className="font-sans text-sm md:text-[15px] font-medium text-[#59635D] leading-snug group-hover:text-ink transition-colors">
        {label}
      </div>
    </div>
  );
}

/* 2.5 AGAATE INTRODUCTION & IMPACT */
function Introduction() {
  const stats = [
    { num: 1000, suffix: "+", label: "Farmers Connected" },
    { num: 30, suffix: "+", label: "Vegetable Crops" },
    { num: 50, suffix: "+", label: "Ecosystem Partners" },
    { num: 100, suffix: "%", label: "Seed-to-Sale Support" },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const vineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
        }
      );

      // Description reveal
      gsap.fromTo(descRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
        }
      );

      // Dramatic diagonal clip mask reveal
      gsap.fromTo(imageRef.current,
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", scale: 1.08 },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          scale: 1,
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
        }
      );

      // Founder quote elastic entrance
      gsap.fromTo(quoteRef.current,
        { opacity: 0, y: 35, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: 0.35,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
        }
      );

      // Draw organic SVG vine as you scroll
      if (vineRef.current) {
        const length = vineRef.current.getTotalLength();
        gsap.set(vineRef.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(vineRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 30%",
            scrub: 1
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <WaveTransition topColor="#FFFFFF" bottomColor="#FFFFFF" />
      <section
        id="overview-section"
        ref={sectionRef}
        className="bg-white py-24 lg:py-32 px-6 lg:px-12 relative overflow-hidden text-left"
      >
        {/* Animated organic vine SVG line */}
        <svg className="absolute left-[42%] bottom-12 w-36 h-[420px] text-forest/25 pointer-events-none hidden lg:block" fill="none" viewBox="0 0 100 300">
          <path ref={vineRef} d="M10,0 C35,70 15,140 50,190 C75,225 35,260 80,300" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>

        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-20">
          {/* Left Side: About Copy */}
          <div className="w-full lg:w-[46%] flex flex-col items-start relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[1px] bg-forest/30"></span>
              <span className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest">
                ABOUT AGAATE
              </span>
            </div>

            <h2
              ref={headingRef}
              className="font-display text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6"
            >
              Built around the farmer. <br />
              Connected from <span className="italic font-normal text-forest">seed to sale</span>.
            </h2>

            <div ref={descRef} className="flex flex-col items-start">
              <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[600px] mb-8">
                Agaate brings trusted agricultural inputs, expert guidance, farm technology, and market access together in one connected ecosystem—helping farmers make better decisions, reduce risk, and grow with confidence.
              </p>

              <a
                href="#overview-section"
                className="text-forest hover:text-forest-deep font-semibold text-[15px] md:text-[16px] flex items-center gap-2 transition-all group py-2"
              >
                Discover our approach
                <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </a>
            </div>
          </div>

          {/* Right Side: Image and integrated Founder's Note */}
          <div className="w-full lg:w-[50%] relative">
            <div
              ref={imageRef}
              className="aspect-[4/3] w-full rounded-[20px] overflow-hidden border border-[#E7ECE8] shadow-md relative group"
            >
              <img
                src={aboutFarmerAdvisor}
                alt="Indian vegetable farmer and Agaate agronomist naturally examining crops"
                className="w-full h-full object-cover rounded-[20px] transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Founder's note quote panel */}
            <div
              ref={quoteRef}
              className="mt-6 lg:mt-0 lg:absolute lg:-bottom-8 lg:-left-8 lg:max-w-[390px] bg-white/95 backdrop-blur-md border border-[#E7ECE8] shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-[18px] p-6 lg:p-7 z-20 text-left hover:border-forest/30 transition-all duration-300"
            >
              <div className="text-[11px] font-mono tracking-[0.1em] text-terracotta mb-3 font-bold uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse"></span>
                FOUNDER'S NOTE
              </div>
              <blockquote className="font-sans text-[17px] font-medium leading-[1.55] text-[#17211B] mb-3">
                “We built Agaate with a simple belief: every farmer deserves the right guidance, the right tools, and the right support—so their hard work never goes to loss.”
              </blockquote>
              <span className="text-xs text-[#59635D] font-sans font-medium block">
                Founder, Agaate
              </span>
            </div>
          </div>
        </div>

        {/* Trust and Impact Transition Strip with Animated Counters */}
        <div className="border-t border-[#E7ECE8] pt-14 md:pt-16 mt-20 md:mt-28 max-w-[1400px] mx-auto px-6 lg:px-12 w-full relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-[#E7ECE8]">
            {stats.map((s, i) => (
              <AnimatedStatCard
                key={i}
                num={s.num}
                suffix={s.suffix}
                label={s.label}
                isLeftColumn={i % 2 === 0}
                isTopRow={i < 2}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
/* 4. THE PROBLEM AND AGAATE'S SOLUTION */
function ProblemSolution() {
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
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
        }
      );

      rowsRef.current.forEach((row) => {
        if (!row) return;
        const challenge = row.querySelector(".challenge-block");
        const point = row.querySelector(".point-anim");
        const line = row.querySelector(".line-anim-desktop");
        const solution = row.querySelector(".solution-block");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 85%" }
        });

        tl.fromTo(challenge, { opacity: 0, x: -30, rotateY: -6 }, { opacity: 1, x: 0, rotateY: 0, duration: 0.7, ease: "power3.out" })
          .fromTo(point, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1.2, duration: 0.5, ease: "back.out(2.5)" }, "-=0.3")
          .to(point, { scale: 1, duration: 0.3 })
          .fromTo(line, { width: "0%" }, { width: "100%", duration: 0.6, ease: "power2.inOut" }, "-=0.4")
          .fromTo(solution, { opacity: 0, x: 30, rotateY: 6 }, { opacity: 1, x: 0, rotateY: 0, duration: 0.7, ease: "power3.out" }, "-=0.4");
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

/* 5. AGAATE KISAAN MALL */
function Mall() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const categories = [
    { title: "Hybrid Vegetable Seeds", desc: "Certified high-germination varieties for Indian soils.", img: pSeeds, badge: "98% Germination Rate" },
    { title: "Bio-Boosted Saplings", desc: "Pre-hardened nursery saplings with active mycorrhizae.", img: pSeeds, badge: "14-Day Advance Rooting" },
    { title: "Custom Soil Nutrition", desc: "Stage-wise NPK & micronutrient blends based on soil tests.", img: pFert, badge: "Custom Basal Formulations" },
    { title: "Crop Protection & Bio-Inputs", desc: "Preventive organic bio-fungicides and integrated pest control.", img: pFert, badge: "Residue-Free Verified" },
    { title: "Smart Irrigation Systems", desc: "Precision drip lines, filters, and automated fertigation systems.", img: pIrr, badge: "40% Water Saved" },
    { title: "Farming Tools & Mulch", desc: "UV-stabilized mulching film and durable ergonomic implements.", img: pTools, badge: "Grade-A Durability" }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftColRef.current,
        { opacity: 0, x: -35, rotateY: -8 },
        { opacity: 1, x: 0, rotateY: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
      gsap.fromTo(rightColRef.current?.children || [],
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const currentCat = categories[activeIdx];

  return (
    <>
      <WaveTransition topColor="#F8FAF7" bottomColor="#FFFFFF" />
      <section id="mall-section" ref={sectionRef} className="bg-white py-24 lg:py-32 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Product Visual with Floating Badge */}
          <div className="lg:col-span-6 relative" ref={leftColRef}>
            <div className="aspect-[4/3] w-full rounded-3xl overflow-hidden border border-[#E7ECE8] shadow-lg relative group">
              <img
                src={currentCat.img}
                alt={currentCat.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent opacity-80"></div>
              
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-cream">
                <div>
                  <span className="text-[11px] font-mono tracking-widest uppercase bg-forest/80 px-3 py-1 rounded-full border border-cream/20">
                    STAGE-MAPPED INPUT
                  </span>
                  <h3 className="font-display text-2xl font-bold mt-2">{currentCat.title}</h3>
                </div>
              </div>
            </div>

            {/* Floating Live Verification Badge */}
            <div className="absolute -top-5 -right-5 md:right-4 bg-white/95 backdrop-blur-md border border-forest/30 shadow-xl rounded-2xl p-4 animate-float-slow z-20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest/15 text-forest flex items-center justify-center font-bold text-lg">
                ✓
              </div>
              <div className="text-left">
                <div className="text-[11px] font-mono text-ink/50 uppercase">QUALITY STANDARD</div>
                <div className="font-sans font-bold text-sm text-forest">{currentCat.badge}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Hoverable Category Cards */}
          <div className="lg:col-span-6 text-left" ref={rightColRef}>
            <div className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">
              KISAAN MALL
            </div>
            <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
              Everything Your Farm Needs, in One Place
            </h2>
            <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[640px] mb-8">
              Hover over a category below to explore tested agricultural inputs directly mapped to your crop stages:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {categories.map((c, i) => {
                const isActive = activeIdx === i;
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={() => setActiveIdx(i)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-start gap-3 ${
                      isActive
                        ? "bg-forest text-cream border-forest shadow-md scale-[1.02]"
                        : "bg-[#F8FAF7] border-[#E7ECE8] hover:border-forest/30 text-[#17211B]"
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${isActive ? "bg-cream animate-pulse" : "bg-forest"}`}></span>
                    <div>
                      <div className="font-sans font-bold text-[15px] leading-tight">{c.title}</div>
                      <div className={`text-xs mt-1 leading-relaxed ${isActive ? "text-cream/80" : "text-[#59635D]"}`}>{c.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="rounded-full bg-forest-deep hover:bg-forest text-cream px-8 py-4 text-[15px] font-semibold tracking-[-0.005em] transition-all duration-300 shadow-md hover:shadow-lg">
              Explore Kisaan Mall Catalog →
            </button>
          </div>

        </div>
      </section>
    </>
  );
}

/* 6. TECHNOLOGY AND FARM MANAGEMENT */
function AgriTech() {
  const [activeTech, setActiveTech] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  const techList = [
    {
      title: "Crop tracking",
      desc: "WhatsApp-based stage updates & expert image-checks.",
      plot: "Plot 01 — Hybrid Tomato",
      stage: "Stage 3: Flowering",
      metric1Label: "CANOPY COVERAGE",
      metric1Val: "88%",
      metric2Label: "HEALTH INDEX",
      metric2Val: "9.4 / 10",
      status: "Verified by Agronomist"
    },
    {
      title: "IoT soil & weather monitoring",
      desc: "Real-time moisture, temp, and field weather tracking.",
      plot: "Plot 04 — Sweet Chilli",
      stage: "Day 45 Active",
      metric1Label: "SOIL MOISTURE",
      metric1Val: "42% Optimal",
      metric2Label: "NITROGEN (N)",
      metric2Val: "Balanced",
      status: "IoT Sensor Node Active"
    },
    {
      title: "AI crop-health detection",
      desc: "Upload photos for instant disease diagnostics.",
      plot: "AI Vision Scanner",
      stage: "Diagnostic Run",
      metric1Label: "PATHOGEN ALERT",
      metric1Val: "0% Detected",
      metric2Label: "LEAF CHLOROPHYLL",
      metric2Val: "Excellent",
      status: "Scan Complete • Healthy"
    },
    {
      title: "Smart irrigation",
      desc: "Automated schedules that save water & fertilizer.",
      plot: "Drip Zone B",
      stage: "Auto-Cycle #2",
      metric1Label: "FLOW RATE",
      metric1Val: "14 L/hr",
      metric2Label: "WATER SAVINGS",
      metric2Val: "+38% vs Flood",
      status: "Fertigation Valve Open"
    },
    {
      title: "Drone monitoring",
      desc: "High-visibility aerial checks & targeted input spraying.",
      plot: "Aerial Grid 12",
      stage: "Altitude 30m",
      metric1Label: "COVERAGE SPEED",
      metric1Val: "5 Acres / min",
      metric2Label: "SPRAY DRIFT",
      metric2Val: "< 2% Low",
      status: "GPS RTK Locked"
    },
    {
      title: "Data-driven advisory",
      desc: "Decisions backed by local, historical soil profiles.",
      plot: "Regional Soil Data",
      stage: "Basal Planning",
      metric1Label: "YIELD PREDICTION",
      metric1Val: "+24% Uplift",
      metric2Label: "RISK PROFILE",
      metric2Val: "Low Risk",
      status: "Advisory Synchronized"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(hudRef.current,
        { scale: 0.94, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const current = techList[activeTech];

  return (
    <>
      <ArchTransition topColor="#FFFFFF" bottomColor="#F8FAF7" />
      <section id="tech-section" ref={sectionRef} className="bg-[#F8FAF7] py-24 lg:py-32 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Tech Selector Tabs */}
          <div className="lg:col-span-6 text-left">
            <div className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">
              SMART FARMING TELEMETRY
            </div>
            <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
              Manage Your Farm, Not Just Grow It
            </h2>
            <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[640px] mb-8">
              Click or hover any technology below to inspect live field data from Agaate's unified control dashboard:
            </p>

            <div className="space-y-3">
              {techList.map((t, i) => {
                const isActive = activeTech === i;
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setActiveTech(i)}
                    onClick={() => setActiveTech(i)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-start justify-between ${
                      isActive
                        ? "bg-white border-forest shadow-md scale-[1.01]"
                        : "bg-transparent border-transparent hover:bg-white/60 hover:border-[#E7ECE8]"
                    }`}
                  >
                    <div className="flex gap-3.5 items-start">
                      <span className={`w-3 h-3 rounded-full mt-1.5 transition-all ${isActive ? "bg-forest shadow-[0_0_10px_#2D6A4F]" : "bg-[#C4CFC8]"}`}></span>
                      <div>
                        <h3 className={`font-sans font-bold text-[17px] md:text-[19px] leading-[1.3] ${isActive ? "text-forest" : "text-[#17211B]"}`}>{t.title}</h3>
                        <p className="text-[#667069] text-[14px] md:text-[15px] leading-[1.5] mt-1">{t.desc}</p>
                      </div>
                    </div>
                    {isActive && (
                      <span className="text-xs font-mono font-bold text-forest bg-forest/10 px-2.5 py-1 rounded-md self-center">
                        ACTIVE HUD
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Telemetry HUD Simulation */}
          <div className="lg:col-span-6" ref={hudRef}>
            <div className="aspect-[4/3] w-full bg-[#111A15] border border-forest/30 rounded-3xl p-7 shadow-2xl flex flex-col justify-between text-cream relative overflow-hidden group">
              {/* Subtle grid line background pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1F2E25_1px,transparent_1px),linear-gradient(to_bottom,#1F2E25_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none"></div>

              {/* Scanning laser beam effect */}
              <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-radar-scan pointer-events-none opacity-60"></div>

              {/* Top HUD Header */}
              <div className="relative z-10">
                <div className="flex items-center justify-between border-b border-cream/15 pb-5 mb-6">
                  <div>
                    <span className="font-mono text-[11px] text-emerald-400 tracking-widest uppercase flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      LIVE SENSOR FEED
                    </span>
                    <div className="font-display font-bold text-2xl text-cream mt-1">{current.plot}</div>
                  </div>
                  <span className="px-3.5 py-1.5 bg-emerald-400/15 border border-emerald-400/40 text-emerald-300 text-xs font-mono rounded-full">
                    {current.stage}
                  </span>
                </div>

                {/* Live Dynamic Telemetry Gauges */}
                <div className="grid grid-cols-2 gap-5">
                  <div className="bg-white/5 border border-cream/10 rounded-2xl p-5 backdrop-blur-sm group-hover:border-emerald-400/40 transition-colors">
                    <div className="text-[11px] text-cream/50 font-mono tracking-wider">{current.metric1Label}</div>
                    <div className="text-2xl md:text-3xl font-display font-bold text-emerald-400 mt-2">{current.metric1Val}</div>
                  </div>
                  <div className="bg-white/5 border border-cream/10 rounded-2xl p-5 backdrop-blur-sm group-hover:border-emerald-400/40 transition-colors">
                    <div className="text-[11px] text-cream/50 font-mono tracking-wider">{current.metric2Label}</div>
                    <div className="text-2xl md:text-3xl font-display font-bold text-cream mt-2">{current.metric2Val}</div>
                  </div>
                </div>
              </div>

              {/* Interactive Signal Graph Visual */}
              <div className="relative z-10 my-4 flex items-center gap-2">
                {[40, 65, 80, 50, 90, 75, 85, 60, 95, 70, 85, 90].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-emerald-400/30 rounded-full transition-all duration-500"
                    style={{ height: `${Math.max(16, (h * ((activeTech + 1) * 13) % 48) + 16)}px` }}
                  ></div>
                ))}
              </div>

              {/* Bottom HUD Footer */}
              <div className="relative z-10 border-t border-cream/15 pt-4 flex items-center justify-between text-xs font-mono text-cream/60">
                <span>SYSTEM STATUS: {current.status}</span>
                <span className="text-emerald-400 font-bold">SYMBOLS: LOCKED ✓</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

/* 6.5 CARBON CREDIT PROGRAM */
function CarbonCredits() {
  const [selectedPractices, setSelectedPractices] = useState<string[]>(["drip", "tillage"]);
  const practices = [
    { id: "drip", name: "Drip Irrigation", desc: "Saves water and reduces pumping energy footprint.", value: 1.5 },
    { id: "tillage", name: "Zero Tillage", desc: "Keeps carbon locked deep in the soil structure.", value: 2.0 },
    { id: "bio", name: "Organic & Bio-Inputs", desc: "Cuts chemical nitrogen gas emissions.", value: 1.8 },
    { id: "burning", name: "No Residue Burning", desc: "Returns natural biomass back to the field.", value: 1.2 },
    { id: "cover", name: "Cover Cropping", desc: "Continually builds organic soil carbon levels.", value: 2.2 }
  ];

  const handleToggle = (id: string) => {
    setSelectedPractices(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const totalCredits = practices
    .filter(p => selectedPractices.includes(p.id))
    .reduce((sum, p) => sum + p.value, 0)
    .toFixed(1);

  const estimatedEarnings = Math.round(Number(totalCredits) * 1200);

  return (
    <>
      <WaveTransition topColor="#F8FAF7" bottomColor="#FFFFFF" />
      <section className="bg-white py-24 lg:py-32 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Info */}
          <div className="lg:col-span-6 text-left">
            <div className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">
              MONETIZE SUSTAINABILITY
            </div>
            <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
              Earn Extra Income from Sustainable Practices
            </h2>
            <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[640px] mb-8">
              Good farming already saves carbon. Agaate helps you measure, verify, and monetise it — turning sustainable practices into a regular payout stream with zero extra land required.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border-l-2 border-forest pl-4">
                <div className="text-xl font-bold font-mono text-[#17211B]">1 Carbon Credit</div>
                <div className="text-xs text-ink/60 mt-1">Earned per tonne of CO₂ reduced or stored in soil.</div>
              </div>
              <div className="border-l-2 border-forest pl-4">
                <div className="text-xl font-bold font-mono text-[#17211B]">On-App Verification</div>
                <div className="text-xs text-ink/60 mt-1">Satellite & IoT verification handled seamlessly by Agaate.</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Estimator Widget */}
          <div className="lg:col-span-6">
            <div className="bg-[#F8FAF7] border border-[#E7ECE8] rounded-3xl p-8 shadow-md relative">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-mono text-[12px] uppercase tracking-wider text-forest font-bold">
                  INTERACTIVE PRACTICE ESTIMATOR
                </h3>
                <span className="text-xs font-mono text-ink/50">Toggle practices below</span>
              </div>

              <div className="space-y-3.5 mb-8">
                {practices.map(p => {
                  const isSelected = selectedPractices.includes(p.id);
                  return (
                    <div
                      key={p.id}
                      onClick={() => handleToggle(p.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? "bg-white border-forest shadow-md scale-[1.01]"
                          : "bg-white/50 border-[#E7ECE8] hover:border-forest/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                          <div className={`w-6 h-6 rounded-lg border flex items-center justify-center text-xs font-bold transition-all ${
                            isSelected ? "bg-forest border-forest text-cream shadow-sm" : "border-[#C4CFC8] text-transparent"
                          }`}>
                            ✓
                          </div>
                          <div className="text-left">
                            <div className="font-sans font-bold text-[#17211B] text-[17px] leading-tight">{p.name}</div>
                            <div className="text-xs text-ink/50 mt-0.5">{p.desc}</div>
                          </div>
                        </div>
                        <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md ${
                          isSelected ? "bg-forest/10 text-forest" : "bg-gray-100 text-gray-400"
                        }`}>
                          +{p.value} tCO₂
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Live Total & Payout Banner */}
              <div className="bg-forest text-cream rounded-2xl p-6 shadow-lg flex justify-between items-center text-left">
                <div>
                  <div className="text-xs text-cream/70 font-mono tracking-wider">ESTIMATED CREDITS</div>
                  <div className="text-2xl font-bold font-mono text-cream mt-1">{totalCredits} tCO₂/ha</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-cream/70 font-mono tracking-wider">ESTIMATED ANNUAL PAYOUT</div>
                  <div className="text-2xl md:text-3xl font-bold font-mono text-yellow-300 mt-1">₹{estimatedEarnings.toLocaleString()}/yr</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

/* 7. AGRI-ENTREPRENEURSHIP AND BIG-FARM SETUP */
function CommercialFarming() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { num: "01", title: "Land Planning & Layout", desc: "Site survey, soil mapping, and block layout.", time: "Week 1-2", deliverable: "Master Blueprint" },
    { num: "02", title: "Infrastructure Build-out", desc: "Drip lines, fertigation systems, and polyhouses.", time: "Week 3-6", deliverable: "Automated Drip Grid" },
    { num: "03", title: "Inputs at Scale", desc: "Bulk seeds, bio-boosted nursery, and fertilizers.", time: "Week 7-8", deliverable: "Stage-Mapped Basal" },
    { num: "04", title: "Operations & Manpower", desc: "Labour schedules, daily SOPs, and logging.", time: "Ongoing", deliverable: "Digital Field SOPs" },
    { num: "05", title: "Cost & ROI Planning", desc: "Phased budgets, profit projections, and cash flow.", time: "Phased", deliverable: "Financial Telemetry" },
    { num: "06", title: "Ongoing Management", desc: "Agronomy support, alerts, and market linkage.", time: "Full Season", deliverable: "Harvest Buyback Link" }
  ];

  const current = steps[activeStep];

  return (
    <>
      <ArchTransition topColor="#FFFFFF" bottomColor="#FFFFFF" />
      <section className="bg-white py-24 lg:py-32 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Commercial Farm Image with Step Progress Overlay */}
          <div className="lg:col-span-5 text-left sticky top-28">
            <div className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">COMMERCIAL FARMING</div>
            <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
              Build and Scale Your Agricultural Venture
            </h2>
            <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[640px] mb-8">
              From empty land to a fully productive commercial farm — Agaate plans, builds, and runs large-scale vegetable operations end-to-end.
            </p>
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-[#E7ECE8] shadow-lg relative group">
              <img src={agroPark} alt="Commercial big farm setup" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17211B]/80 via-transparent to-transparent"></div>

              {/* Dynamic Active Step Badge */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-forest/20 shadow-xl">
                <div className="flex items-center justify-between text-xs font-mono text-ink/50 uppercase mb-1">
                  <span>STEP {current.num} OF 06</span>
                  <span className="text-forest font-bold">{current.time}</span>
                </div>
                <div className="font-display font-bold text-lg text-[#17211B]">{current.title}</div>
                <div className="text-xs text-forest mt-1 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-forest"></span>
                  Key Deliverable: {current.deliverable}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Step Pipeline */}
          <div className="lg:col-span-7 space-y-4 lg:mt-4">
            <div className="font-mono text-xs text-ink/40 uppercase mb-2">CLICK ANY PHASE TO EXPLORE DETAILS</div>
            {steps.map((s, i) => {
              const isActive = activeStep === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActiveStep(i)}
                  onClick={() => setActiveStep(i)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 flex gap-5 items-start text-left ${
                    isActive
                      ? "bg-[#F8FAF7] border-forest shadow-md scale-[1.01]"
                      : "bg-white border-[#E7ECE8] hover:border-forest/30"
                  }`}
                >
                  <span className={`font-mono text-sm font-bold px-3 py-1.5 rounded-xl transition-colors ${
                    isActive ? "bg-forest text-cream shadow-sm" : "bg-gray-100 text-terracotta"
                  }`}>
                    {s.num}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-sans font-bold text-[18px] md:text-[21px] leading-[1.3] ${
                        isActive ? "text-forest" : "text-[#17211B]"
                      }`}>{s.title}</h3>
                      <span className="text-xs font-mono text-ink/40">{s.time}</span>
                    </div>
                    <p className="text-[#667069] text-[15px] md:text-[16px] leading-[1.6] mt-1.5">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}

/* 8. FARMER TESTIMONIALS */
function Testimonials() {
  const reviews = [
    { name: "Ramesh Patel", place: "Anand, Gujarat", crop: "Tomatoes", yieldGain: "+25% Yield", quote: "Agaate caught a fungal issue early. My tomato crop quality has never been better and yield is up 25%.", img: t1 },
    { name: "Lakshmi Devi", place: "Warangal, Telangana", crop: "Chilli", yieldGain: "40% Less Water", quote: "The nursery saplings establish far better. Sourcing fertilizers is transparent and on time.", img: t2 },
    { name: "Arjun Singh", place: "Ludhiana, Punjab", crop: "Cabbage", yieldGain: "Direct Institutional Buy", quote: "With stage-wise harvest advice, we achieved better pricing and direct institutional buyers.", img: t3 }
  ];

  return (
    <>
      <WaveTransition topColor="#FFFFFF" bottomColor="#F8FAF7" />
      <section className="bg-[#F8FAF7] py-24 lg:py-32 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <div className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">TRUSTED BY FARMERS</div>
            <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em]">
              Real Results from Real Vegetable Growers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-white border border-[#E7ECE8] rounded-3xl p-8 flex flex-col justify-between text-left shadow-sm hover:shadow-xl hover:border-forest/40 hover:-translate-y-1.5 transition-all duration-300 relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 bg-forest/10 text-forest font-mono text-xs font-bold rounded-full">
                      ✓ VERIFIED FARMER
                    </span>
                    <span className="px-3 py-1 bg-moss/15 text-forest font-mono text-xs font-bold rounded-full">
                      {r.yieldGain}
                    </span>
                  </div>
                  <p className="text-[#17211B] text-[18px] md:text-[21px] font-normal leading-[1.6] mb-8 group-hover:text-forest transition-colors">
                    "{r.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-6 border-t border-[#E7ECE8]">
                  <img src={r.img} alt={r.name} className="w-14 h-14 rounded-full object-cover border-2 border-forest/30 shadow-md" />
                  <div>
                    <div className="font-sans font-bold text-[#17211B] text-[17px]">{r.name}</div>
                    <div className="text-[#59635D] text-[14px] mt-0.5">{r.place} • <span className="text-forest font-mono font-bold">{r.crop}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* 9. MARKET ACCESS */
function MarketAccess() {
  const [activeMarket, setActiveMarket] = useState(0);
  const channels = [
    { title: "Better Pricing", desc: "Direct integration with institutional channels & transparent grading.", premium: "+18% Avg Price Uplift" },
    { title: "Direct Market Linkage", desc: "Structured harvesting aligned with live wholesale demand.", premium: "Zero Post-Harvest Glut" },
    { title: "Quality Standards", desc: "Grading and sorting standards to match institutional specifications.", premium: "100% Verified Quality" }
  ];

  return (
    <>
      <ArchTransition topColor="#F8FAF7" bottomColor="#FFFFFF" />
      <section className="bg-white py-24 lg:py-32 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with Interactive Floating Ticker Card */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-[#E7ECE8] shadow-lg group">
              <img src={heroPlant} alt="Harvest vegetables moving to market" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>

            {/* Floating Live Harvest Ticker */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md border border-forest/30 rounded-2xl p-4 shadow-xl flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase text-ink/50">LIVE INSTITUTIONAL LINKAGE</span>
                <div className="font-display font-bold text-lg text-forest">{channels[activeMarket].premium}</div>
              </div>
              <span className="w-3 h-3 rounded-full bg-forest animate-ping"></span>
            </div>
          </div>

          {/* Right Column: Interactive Channel Cards */}
          <div className="lg:col-span-6 text-left">
            <div className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">MARKET ACCESS</div>
            <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
              Grow better. Harvest at the right time. Reach the right market.
            </h2>
            <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[640px] mb-8">
              Agaate coordinates direct buyer integrations and grading standards to minimize price risk and crop waste after the harvest. Hover below to explore:
            </p>
            
            <div className="space-y-4">
              {channels.map((benefit, i) => {
                const isActive = activeMarket === i;
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setActiveMarket(i)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex items-start justify-between ${
                      isActive
                        ? "bg-[#F8FAF7] border-forest shadow-md scale-[1.01]"
                        : "bg-white border-[#E7ECE8] hover:border-forest/30"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <span className={`w-3 h-3 rounded-full mt-1.5 ${isActive ? "bg-forest animate-pulse" : "bg-[#C4CFC8]"}`}></span>
                      <div>
                        <div className="font-sans font-bold text-[#17211B] text-[18px]">{benefit.title}</div>
                        <div className="text-[#667069] text-sm mt-1 leading-relaxed">{benefit.desc}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-forest bg-forest/10 px-3 py-1 rounded-full self-center">
                      {benefit.premium}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

/* 10. AGRI PARK */
function AgriPark() {
  const [activeZone, setActiveZone] = useState("Seed");
  const zones = [
    { name: "Seed", desc: "Live trial blocks comparing germination & disease resistance." },
    { name: "Nursery", desc: "Bio-inoculated saplings with accelerated root density." },
    { name: "Irrigation", desc: "Pressure-compensating drip & automated fertigation demos." },
    { name: "Nutrition", desc: "Basal & foliar test beds for soil organic matter." },
    { name: "Crop Protection", desc: "Integrated pest management and residue-free bio-fungicides." },
    { name: "Technology", desc: "IoT sensor nodes, drone sprayers & weather stations live." },
    { name: "Training", desc: "Practical hands-on workshops for agronomists and farmers." },
    { name: "Market", desc: "Post-harvest sorting, grading, and cooling demo facility." }
  ];

  const currentZoneInfo = zones.find(z => z.name === activeZone) || zones[0];

  return (
    <>
      <WaveTransition topColor="#FFFFFF" bottomColor="#F8FAF7" />
      <section id="park-section" className="bg-[#F8FAF7] py-24 lg:py-32 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Zone Selector */}
          <div className="lg:col-span-5 text-left">
            <div className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">AGRI PARK</div>
            <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
              Agaate Integrated Agri Park
            </h2>
            <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[640px] mb-8">
              A single living farm where India's leading seed, irrigation, nutrition, protection, and machinery partners come together. See products perform on real crops before making any farm input decisions.
            </p>
            
            <div>
              <div className="text-[12px] uppercase font-mono tracking-[0.1em] text-ink/40 mb-3 font-semibold">
                SELECT A PARK ZONE TO EXPLORE:
              </div>
              <div className="flex flex-wrap gap-2.5 mb-6">
                {zones.map((z, idx) => {
                  const isSelected = activeZone === z.name;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveZone(z.name)}
                      className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
                        isSelected
                          ? "bg-forest text-cream shadow-md scale-105"
                          : "bg-white border border-[#E7ECE8] text-ink/70 hover:border-forest/40"
                      }`}
                    >
                      {z.name} Zone
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Zone Description Banner */}
              <div className="bg-white border border-forest/30 rounded-2xl p-5 shadow-sm">
                <div className="text-xs font-mono text-forest font-bold uppercase mb-1">
                  ACTIVE EXPLORING: {currentZoneInfo.name} ZONE
                </div>
                <p className="text-sm text-[#17211B] font-medium leading-relaxed">
                  {currentZoneInfo.desc}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Agri Park Interactive Visual */}
          <div className="lg:col-span-7 relative">
            <div className="aspect-[16/10] rounded-3xl overflow-hidden border border-[#E7ECE8] shadow-lg relative group">
              <img src={agroPark} alt="Agaate Agri Park layout" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17211B]/60 via-transparent to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-cream">
                <div>
                  <span className="text-[11px] font-mono tracking-widest uppercase bg-forest/90 px-3 py-1 rounded-full">
                    LIVE FIELD TRIAL FACILITY
                  </span>
                  <div className="font-display text-2xl font-bold mt-2">{activeZone} Demo Block Active</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

/* 11. FINAL CALL-TO-ACTION SECTION */
function CTA() {
  return (
    <>
      <ArchTransition topColor="#F8FAF7" bottomColor="#17211B" />
      <section id="cta-section" className="bg-[#17211B] py-24 lg:py-32 px-6 lg:px-12 text-cream text-center relative overflow-hidden">
        {/* Ambient background glowing orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-forest/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-forest/40 border border-cream/20 text-cream font-mono text-xs tracking-widest uppercase mb-6">
            START YOUR TRANSFORMATION
          </div>
          <h2 className="font-display text-[36px] sm:text-[44px] md:text-[50px] lg:text-[58px] font-bold mb-6 leading-[1.1] tracking-[-0.03em] text-cream">
            Ready to grow with <span className="text-emerald-400">confidence?</span>
          </h2>
          <p className="text-cream/80 text-[16px] md:text-[19px] font-normal leading-[1.7] max-w-[640px] mx-auto mb-10">
            From choosing the right seed to reaching the right institutional buyer, Agaate supports your complete vegetable crop journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="tel:9487263498"
              className="rounded-full bg-yellow-400 text-forest-deep hover:bg-white hover:text-forest-deep px-9 py-4.5 text-[16px] font-bold tracking-[-0.005em] transition-all duration-300 shadow-xl hover:scale-105"
            >
              Start Your Journey Today →
            </a>
            <button className="rounded-full border border-cream/30 hover:border-cream/70 hover:bg-white/10 px-9 py-4.5 text-[16px] font-semibold tracking-[-0.005em] transition-all duration-300">
              Talk to an Expert
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function Index() {
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [startHeroAnimation, setStartHeroAnimation] = useState(false);

  return (
    <>
      {loading && (
        <LoadingScreen
          onComplete={() => setLoading(false)}
          videoLoaded={videoLoaded}
          onWipeStart={() => setStartHeroAnimation(true)}
        />
      )}
      <main className="bg-white text-ink antialiased">
        <Header />
        <Hero
          onVideoLoaded={() => setVideoLoaded(true)}
          startAnimation={startHeroAnimation}
        />
        {!loading && (
          <>
            <PlantJourney />
            <Introduction />
            <ProblemSolution />
            <Mall />
            <AgriTech />
            <CarbonCredits />
            <CommercialFarming />
            <Testimonials />
            <MarketAccess />
            <AgriPark />
            <CTA />
            <Footer />
          </>
        )}
      </main>
    </>
  );
}
