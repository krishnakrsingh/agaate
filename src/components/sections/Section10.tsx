import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroPlant from "@/assets/hero-plant.jpg";
import { ArchDownTransition } from "./SectionTransitions";

gsap.registerPlugin(ScrollTrigger);

/* 9. MARKET ACCESS */
export default function Section10() {
  const [activeMarket, setActiveMarket] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  const channels = [
    { title: "Better Pricing", desc: "Direct integration with institutional channels & transparent grading.", premium: "+18% Avg Price Uplift" },
    { title: "Direct Market Linkage", desc: "Structured harvesting aligned with live wholesale demand.", premium: "Zero Post-Harvest Glut" },
    { title: "Quality Standards", desc: "Grading and sorting standards to match institutional specifications.", premium: "100% Verified Quality" }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftColRef.current,
        { opacity: 0, x: -35, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true } }
      );
      gsap.fromTo(rightColRef.current?.children || [],
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate ticker when switching active market
  useEffect(() => {
    if (!tickerRef.current) return;
    const t = gsap.fromTo(tickerRef.current,
      { y: 8, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }
    );
    return () => {
      t.kill();
    };
  }, [activeMarket]);

  return (
    <>
      <ArchDownTransition topColor="#E3EBE6" bottomColor="#FFFFFF" />
      <section ref={sectionRef} className="bg-white py-24 lg:py-32 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with Interactive Floating Ticker Card */}
          <div className="lg:col-span-6 relative" ref={leftColRef}>
            <div className="aspect-[4/3] rounded-[28px] overflow-hidden border border-[#E7ECE8] shadow-xl group relative">
              <img src={heroPlant} alt="Harvest vegetables moving to market" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17211B]/60 via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Floating Live Harvest Ticker */}
            <div
              ref={tickerRef}
              className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md border border-forest/30 rounded-2xl p-5 shadow-2xl flex items-center justify-between z-10"
            >
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-ink/50 flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-forest animate-pulse"></span>
                  LIVE INSTITUTIONAL LINKAGE
                </span>
                <div className="font-display font-bold text-xl text-forest mt-1">{channels[activeMarket].premium}</div>
              </div>
              <span className="px-3 py-1.5 bg-forest/10 text-forest font-mono text-xs rounded-full font-bold">
                ACTIVE CHANNEL
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Channel Cards */}
          <div className="lg:col-span-6 text-left" ref={rightColRef}>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-forest/[0.08] border border-forest/20 font-mono text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse"></span>
              MARKET ACCESS
            </div>
            <h2 className="font-display text-[32px] sm:text-[40px] md:text-[46px] lg:text-[52px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
              Grow better. Harvest at the right time. Reach the right market.
            </h2>
            <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[640px] mb-8">
              Agaate coordinates direct buyer integrations and grading standards to minimize price risk and crop waste after the harvest. Click or hover below to explore:
            </p>
            
            <div className="space-y-4">
              {channels.map((benefit, i) => {
                const isActive = activeMarket === i;
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setActiveMarket(i)}
                    onClick={() => setActiveMarket(i)}
                    className={`p-5.5 rounded-2xl border cursor-pointer transition-all duration-300 flex items-start justify-between ${
                      isActive
                        ? "bg-[#E3EBE6] border-forest shadow-lg scale-[1.02]"
                        : "bg-white border-[#E7ECE8] hover:border-forest/40 hover:bg-white/90"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <span className={`w-3 h-3 rounded-full mt-1.5 transition-all flex-shrink-0 ${isActive ? "bg-forest shadow-[0_0_10px_#2D6A4F] animate-pulse" : "bg-[#C4CFC8]"}`}></span>
                      <div>
                        <div className={`font-sans font-bold text-[18px] sm:text-[19px] ${isActive ? "text-forest" : "text-[#17211B]"}`}>{benefit.title}</div>
                        <div className="text-[#667069] text-[14px] sm:text-[15px] mt-1 leading-relaxed">{benefit.desc}</div>
                      </div>
                    </div>
                    <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full self-center flex-shrink-0 ${
                      isActive ? "bg-forest text-cream shadow-sm" : "bg-forest/10 text-forest"
                    }`}>
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

