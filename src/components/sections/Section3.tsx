import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutFarmerAdvisor from "@/assets/about-farmer-advisor.png";
import { WaveTransition } from "./SectionTransitions";

gsap.registerPlugin(ScrollTrigger);

/* ANIMATED STAT COUNTER */
function AnimatedStatCard({ num, suffix, label, isLeftColumn, isTopRow }: { num: number; suffix: string; label: string; isLeftColumn: boolean; isTopRow: boolean }) {
  const [val, setVal] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { v: 0 };
      gsap.to(obj, {
        v: num,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 95%",
          once: true,
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
export default function Section3() {
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
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 92%", once: true }
        }
      );

      // Description reveal
      gsap.fromTo(descRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 92%", once: true }
        }
      );

      // Dramatic diagonal clip mask reveal
      gsap.fromTo(imageRef.current,
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", scale: 1.04 },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          scale: 1,
          duration: 0.75,
          ease: "power3.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 92%", once: true }
        }
      );

      // Founder quote elastic entrance
      gsap.fromTo(quoteRef.current,
        { opacity: 0, y: 25, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          delay: 0.15,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 92%", once: true }
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
            start: "top 80%",
            end: "bottom 30%",
            scrub: 0.5
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
