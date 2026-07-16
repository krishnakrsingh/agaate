import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutFarmerAdvisor from "@/assets/about-farmer-advisor.png";
import { WaveTransition } from "./SectionTransitions";
import { AlgorithmicCanvas } from "./AlgorithmicCanvas";

gsap.registerPlugin(ScrollTrigger);

/* ANIMATED STAT COUNTER */
function AnimatedStatCard({ num, suffix, label, isLeftColumn, isTopRow, index }: { num: number; suffix: string; label: string; isLeftColumn: boolean; isTopRow: boolean; index: number }) {
  const [val, setVal] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { v: 0 };
      
      // Card entrance reveal with stagger delay based on index
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          delay: index * 0.1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 95%",
            once: true,
          }
        }
      );

      // Number counter
      gsap.to(obj, {
        v: num,
        duration: 1.8,
        delay: index * 0.1,
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
  }, [num, index]);

  return (
    <div
      ref={cardRef}
      className={`text-left p-6 md:px-8 first:pl-0 last:pr-0 group transition-all duration-500 hover:translate-y-[-6px] hover:bg-forest/[0.02] rounded-2xl
        ${isLeftColumn ? "md:pr-6 md:border-r border-[#E7ECE8]" : "md:pl-6"} 
        ${isTopRow ? "border-b border-[#E7ECE8] md:border-b-0 md:pb-0" : ""}
      `}
    >
      <div className="font-display text-[40px] sm:text-[48px] md:text-[56px] text-forest font-bold tracking-[-0.04em] leading-none mb-3 group-hover:text-forest-deep transition-colors flex items-baseline gap-0.5">
        <span>{val.toLocaleString()}</span>
        <span className="text-terracotta">{suffix}</span>
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true }
        }
      );

      // Description reveal
      gsap.fromTo(descRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true }
        }
      );

      // Dramatic diagonal clip mask reveal
      gsap.fromTo(imageRef.current,
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", scale: 1.08 },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          scale: 1,
          duration: 0.9,
          ease: "power3.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true }
        }
      );

      // Founder quote elastic entrance
      gsap.fromTo(quoteRef.current,
        { opacity: 0, y: 35, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.25,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true }
        }
      );

      // Subtle continuous organic floating on the image wrapper after entrance
      gsap.to(imageRef.current, {
        y: -6,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.2
      });

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
        {/* Living Algorithmic Background Canvas */}
        <AlgorithmicCanvas mode="rhizome" opacity={0.28} />

        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-20 relative z-10">
          {/* Left Side: About Copy */}
          <div className="w-full lg:w-[46%] flex flex-col items-start">
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-forest/[0.08] border border-forest/20 mb-5">
              <span className="w-2 h-2 rounded-full bg-forest animate-ping"></span>
              <span className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest">
                ABOUT AGAATE
              </span>
            </div>

            <h2
              ref={headingRef}
              className="font-display text-[32px] sm:text-[40px] md:text-[46px] lg:text-[52px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6"
            >
              Built around the farmer. <br />
              Connected from <span className="italic font-normal text-forest underline decoration-terracotta/40 decoration-wavy underline-offset-8">seed to sale</span>.
            </h2>

            <div ref={descRef} className="flex flex-col items-start">
              <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[600px] mb-8">
                Agaate brings trusted agricultural inputs, expert guidance, farm technology, and market access together in one connected ecosystem—helping farmers make better decisions, reduce risk, and grow with confidence.
              </p>

              <a
                href="#mall-section"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-forest text-cream hover:bg-forest-deep font-semibold text-[15px] md:text-[16px] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] group"
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
              className="aspect-[4/3] w-full rounded-[24px] overflow-hidden border border-[#E7ECE8] shadow-xl relative group"
            >
              <img
                src={aboutFarmerAdvisor}
                alt="Indian vegetable farmer and Agaate agronomist naturally examining crops"
                className="w-full h-full object-cover rounded-[24px] transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17211B]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Founder's note quote panel */}
            <div
              ref={quoteRef}
              className="mt-6 lg:mt-0 lg:absolute lg:-bottom-10 lg:-left-10 lg:max-w-[410px] bg-white/95 backdrop-blur-md border border-[#E7ECE8] shadow-[0_12px_40px_rgba(0,0,0,0.08)] rounded-[22px] p-6 lg:p-8 z-20 text-left hover:border-forest/40 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-[11px] font-mono tracking-[0.1em] text-terracotta mb-3 font-bold uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse"></span>
                FOUNDER'S NOTE
              </div>
              <blockquote className="font-sans text-[16px] sm:text-[17px] font-medium leading-[1.6] text-[#17211B] mb-3">
                “We built Agaate with a simple belief: every farmer deserves the right guidance, the right tools, and the right support—so their hard work never goes to loss.”
              </blockquote>
              <div className="flex items-center justify-between border-t border-[#E7ECE8] pt-3 mt-3">
                <span className="text-xs text-[#59635D] font-sans font-semibold">
                  Founder, Agaate
                </span>
                <span className="font-mono text-[10px] text-forest font-bold tracking-wider uppercase bg-forest/10 px-2 py-0.5 rounded">
                  VERIFIED MISSION
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust and Impact Transition Strip with Animated Counters */}
        <div className="border-t border-[#E7ECE8] pt-14 md:pt-16 mt-20 md:mt-28 max-w-[1400px] mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            {stats.map((s, i) => (
              <AnimatedStatCard
                key={i}
                index={i}
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

