import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroPlant from "@/assets/hero-plant.jpg";
import { ArchDownTransition } from "./SectionTransitions";
import { ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function SectionMarketLinkage() {
  const [activeMarket, setActiveMarket] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  const channels = [
    {
      title: "Assured Buybacks",
      desc: "Contractual price guarantee signed before the season starts, reducing harvest price risk.",
      premium: "+18% Avg Price Uplift",
    },
    {
      title: "Direct Retail Supply",
      desc: "Skip traditional wholesale markets and supply directly to premium supermarkets.",
      premium: "Zero Post-Harvest Glut",
    },
    {
      title: "Digital Grading Hubs",
      desc: "Transparent weight, size, and health assays ensuring honest product value.",
      premium: "100% Verified Quality",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: -35, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true },
        },
      );
      gsap.fromTo(
        rightColRef.current?.children || [],
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!tickerRef.current) return;
    const t = gsap.fromTo(
      tickerRef.current,
      { y: 8, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.5)" },
    );
    return () => {
      t.kill();
    };
  }, [activeMarket]);

  return (
    <>
      <ArchDownTransition topColor="var(--bone)" bottomColor="#FFFFFF" />
      <section
        ref={sectionRef}
        className="bg-white py-20 md:py-28 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Image with floating card */}
          <div className="lg:col-span-6 relative" ref={leftColRef}>
            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden border border-[#E7ECE8] shadow-2xl group relative bg-bone">
              <img
                src={heroPlant}
                alt="Harvest vegetables moving to market"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Floating Live Harvest Ticker */}
            <div
              ref={tickerRef}
              className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md border border-forest/20 rounded-2xl p-5 shadow-2xl flex items-center justify-between z-10"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-forest font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-forest animate-pulse"></span>
                  Institutional Linkage
                </span>
                <div className="font-serif text-lg md:text-xl text-forest-deep mt-1 font-bold">
                  {channels[activeMarket].premium}
                </div>
              </div>
              <span className="px-3 py-1.5 bg-forest-deep text-cream font-mono text-[9px] tracking-wider rounded-md font-bold uppercase">
                Active Channel
              </span>
            </div>
          </div>

          {/* Right Column: Copy & Selector list */}
          <div className="lg:col-span-6 text-left" ref={rightColRef}>
            <span className="font-jet text-[11px] md:text-xs uppercase tracking-[0.22em] text-forest mb-4 block font-semibold">
              04 / Market Access
            </span>
            <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.08] text-forest-deep mb-6 tracking-tight">
              Grow better. Sell <span className="italic text-terracotta">directly.</span>
            </h2>
            <p className="text-[#59635D] text-[16px] md:text-[18px] leading-[1.7] max-w-xl mb-10">
              Agaate connects farm networks to premium retail chains and institutional processors —
              stripping away middlemen margin leakage and establishing true crop demand security.
            </p>

            <div className="space-y-4">
              {channels.map((benefit, i) => {
                const isActive = activeMarket === i;
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setActiveMarket(i)}
                    onClick={() => setActiveMarket(i)}
                    className={`p-6 rounded-[1.5rem] border cursor-pointer transition-all duration-300 flex items-start justify-between ${
                      isActive
                        ? "bg-bone/50 border-forest shadow-md"
                        : "bg-white border-[#E7ECE8] hover:border-forest/40"
                    }`}
                  >
                    <div className="flex items-start gap-4 pr-3">
                      <span
                        className={`w-2 h-2 rounded-full mt-2 transition-all duration-300 ${
                          isActive ? "bg-terracotta" : "bg-forest/20"
                        }`}
                      />
                      <div>
                        <div
                          className={`font-sans font-bold text-base md:text-lg transition-colors ${
                            isActive ? "text-forest-deep" : "text-ink"
                          }`}
                        >
                          {benefit.title}
                        </div>
                        <div className="text-[#59635D] text-xs md:text-sm mt-1 leading-relaxed">
                          {benefit.desc}
                        </div>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 transition-transform duration-300 self-center ${
                        isActive ? "text-forest translate-x-1" : "text-forest/30"
                      }`}
                    />
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
