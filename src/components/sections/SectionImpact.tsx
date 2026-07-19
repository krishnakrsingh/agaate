import { useEffect, useState, useRef, ComponentType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutFarmerAdvisor from "@/assets/about-farmer-advisor.png";
import { ArchTransition } from "./SectionTransitions";
import { AlgorithmicCanvas } from "./AlgorithmicCanvas";
import { Award, TrendingUp, Users, Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedStatProps {
  num: number;
  suffix: string;
  label: string;
  isLeftColumn: boolean;
  isTopRow: boolean;
  index: number;
  icon: ComponentType<{ className?: string }>;
}

function AnimatedStatCard({
  num,
  suffix,
  label,
  isLeftColumn,
  isTopRow,
  index,
  icon: Icon,
}: AnimatedStatProps) {
  const [val, setVal] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { v: 0 };

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          delay: index * 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 95%",
            once: true,
          },
        },
      );

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
      className={`text-left p-6 md:p-8 group transition-all duration-500 hover:translate-y-[-4px] hover:bg-forest/[0.02] rounded-2xl border border-transparent hover:border-forest/10
        ${isLeftColumn ? "md:border-r md:border-[#E7ECE8]/50" : ""} 
        ${isTopRow ? "border-b border-[#E7ECE8]/50 md:border-b-0" : ""}
      `}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-forest/5 flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-cream transition-colors duration-300">
          <Icon className="w-4 h-4" />
        </div>
        <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40">
          Scale Metric
        </span>
      </div>
      <div className="font-serif text-[40px] sm:text-[48px] text-forest-deep font-bold tracking-tight leading-none mb-2">
        <span>{val.toLocaleString()}</span>
        <span className="text-terracotta">{suffix}</span>
      </div>
      <div className="font-sans text-xs md:text-sm font-semibold text-forest/70 group-hover:text-forest-deep transition-colors">
        {label}
      </div>
    </div>
  );
}

export default function SectionImpact() {
  const stats = [
    { num: 15000, suffix: "+", label: "Acres Under Association", icon: TrendingUp },
    { num: 10, suffix: "Cr+", label: "Farmer Capital Enabled", icon: Award },
    { num: 500, suffix: "+", label: "Verified Inputs Available", icon: Heart },
    { num: 2000, suffix: "+", label: "Agaate Parivaar Farmers", icon: Users },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true },
        },
      );

      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true },
        },
      );

      gsap.fromTo(
        imageRef.current,
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", scale: 1.05 },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          scale: 1,
          duration: 0.9,
          ease: "power3.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true },
        },
      );

      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.25,
          ease: "back.out(1.2)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true },
        },
      );

      gsap.to(imageRef.current, {
        y: -6,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <ArchTransition topColor="#FFFFFF" bottomColor="#FFFFFF" />
      <section
        id="overview-section"
        ref={sectionRef}
        className="bg-white py-20 md:py-28 px-6 lg:px-12 relative overflow-hidden text-left"
      >
        <AlgorithmicCanvas mode="rhizome" opacity={0.28} />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-20 relative z-10">
          {/* Left Side Copy */}
          <div className="w-full lg:w-[46%] flex flex-col items-start">
            <span className="font-jet text-[11px] md:text-xs uppercase tracking-[0.22em] text-forest mb-4 block font-semibold">
              01 / Our Philosophy
            </span>

            <h2
              ref={headingRef}
              className="font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.08] text-forest-deep mb-6 tracking-tight"
            >
              Built around the farmer. Connected from{" "}
              <span className="italic text-terracotta underline decoration-terracotta/20 underline-offset-8">
                seed to sale.
              </span>
            </h2>

            <div ref={descRef} className="flex flex-col items-start">
              <p className="text-[#59635D] text-[16px] md:text-[18px] leading-[1.7] max-w-xl mb-8">
                Agaate brings trusted input retail, technical telemetry, agronomic field advisors,
                and secure post-harvest market channels into a single unified framework — mitigating
                farmer risk.
              </p>

              <a
                href="#services-grid"
                className="inline-flex items-center gap-2.5 rounded-full bg-forest-deep text-cream px-7 py-4 text-[15px] font-semibold hover:bg-forest transition-all duration-300 cursor-pointer"
              >
                Discover our approach
                <span className="translate-y-[1px]">→</span>
              </a>
            </div>
          </div>

          {/* Right Side Image and Note */}
          <div className="w-full lg:w-[50%] relative">
            <div
              ref={imageRef}
              className="aspect-[4/3] w-full rounded-[2rem] overflow-hidden border border-[#E7ECE8] shadow-xl relative group bg-bone"
            >
              <img
                src={aboutFarmerAdvisor}
                alt="Indian vegetable farmer and Agaate agronomist naturally examining crops"
                className="w-full h-full object-cover rounded-[2rem] transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Founder Note quote panel */}
            <div
              ref={quoteRef}
              className="mt-6 lg:mt-0 lg:absolute lg:-bottom-10 lg:-left-10 lg:max-w-[400px] bg-white/95 backdrop-blur-md border border-[#E7ECE8] shadow-2xl rounded-2xl p-6 lg:p-8 z-20 text-left hover:border-forest/40 transition-all duration-300"
            >
              <span className="text-[10px] font-mono tracking-[0.15em] text-terracotta mb-3 font-semibold uppercase block">
                Founder's Note
              </span>
              <blockquote className="font-serif text-lg leading-relaxed text-forest-deep mb-4">
                “We built Agaate with a simple belief: every vegetable farmer deserves the right
                science, inputs, and linkage so their risk decreases and yields increase.”
              </blockquote>
              <div className="flex items-center justify-between border-t border-[#E7ECE8] pt-3 mt-3">
                <span className="text-xs text-forest/70 font-semibold">Ankit Rawat, Founder</span>
                <span className="font-mono text-[9px] text-forest bg-forest/5 px-2 py-0.5 rounded border border-forest/10">
                  Verified Mission
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Trust and Impact Stats Grid */}
        <div className="border-t border-[#E7ECE8] pt-14 mt-20 max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            {stats.map((s, i) => (
              <AnimatedStatCard
                key={i}
                index={i}
                num={s.num}
                suffix={s.suffix}
                label={s.label}
                icon={s.icon}
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
