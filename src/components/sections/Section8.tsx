import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import agroPark from "@/assets/agro-park.jpg";
import { WaveTransition } from "./SectionTransitions";

gsap.registerPlugin(ScrollTrigger);

/* 7. AGRI-ENTREPRENEURSHIP AND BIG-FARM SETUP */
export default function Section8() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const steps = [
    { num: "01", title: "Land Planning & Layout", desc: "Site survey, soil mapping, and block layout.", time: "Week 1-2", deliverable: "Master Blueprint" },
    { num: "02", title: "Infrastructure Build-out", desc: "Drip lines, fertigation systems, and polyhouses.", time: "Week 3-6", deliverable: "Automated Drip Grid" },
    { num: "03", title: "Inputs at Scale", desc: "Bulk seeds, bio-boosted nursery, and fertilizers.", time: "Week 7-8", deliverable: "Stage-Mapped Basal" },
    { num: "04", title: "Operations & Manpower", desc: "Labour schedules, daily SOPs, and logging.", time: "Ongoing", deliverable: "Digital Field SOPs" },
    { num: "05", title: "Cost & ROI Planning", desc: "Phased budgets, profit projections, and cash flow.", time: "Phased", deliverable: "Financial Telemetry" },
    { num: "06", title: "Ongoing Management", desc: "Agronomy support, alerts, and market linkage.", time: "Full Season", deliverable: "Harvest Buyback Link" }
  ];

  const current = steps[activeStep];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftColRef.current?.children || [],
        { opacity: 0, x: -35, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 0.75, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true } }
      );
      gsap.fromTo(stepsContainerRef.current?.children || [],
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Smooth bounce animation on badge when step changes
  useEffect(() => {
    if (!badgeRef.current) return;
    const t = gsap.fromTo(badgeRef.current,
      { y: 10, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }
    );
    return () => {
      t.kill();
    };
  }, [activeStep]);

  return (
    <>
      <WaveTransition topColor="#FFFFFF" bottomColor="#FFFFFF" />
      <section ref={sectionRef} className="bg-white py-12 md:py-16 lg:py-20 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Commercial Farm Image with Step Progress Overlay */}
          <div className="lg:col-span-5 text-left sticky top-28" ref={leftColRef}>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-forest/[0.08] border border-forest/20 font-mono text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse"></span>
              COMMERCIAL FARMING
            </div>
            <h2 className="font-display text-[32px] sm:text-[40px] md:text-[46px] lg:text-[52px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
              Build and Scale Your Agricultural Venture
            </h2>
            <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[640px] mb-8">
              From empty land to a fully productive commercial farm — Agaate plans, builds, and runs large-scale vegetable operations end-to-end.
            </p>
            <div className="aspect-[4/3] rounded-[28px] overflow-hidden border border-[#E7ECE8] shadow-xl relative group">
              <img src={agroPark} alt="Commercial big farm setup" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17211B]/85 via-transparent to-transparent"></div>

              {/* Dynamic Active Step Badge */}
              <div
                ref={badgeRef}
                className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-forest/20 shadow-2xl"
              >
                <div className="flex items-center justify-between text-xs font-mono text-ink/60 uppercase tracking-wider mb-1.5">
                  <span className="font-bold text-terracotta">STEP {current.num} OF 06</span>
                  <span className="text-forest font-bold bg-forest/10 px-2.5 py-0.5 rounded">{current.time}</span>
                </div>
                <div className="font-display font-bold text-xl text-[#17211B]">{current.title}</div>
                <div className="text-xs text-forest mt-1.5 font-semibold flex items-center gap-2 border-t border-[#E7ECE8] pt-2">
                  <span className="w-2 h-2 rounded-full bg-forest animate-pulse"></span>
                  <span>Key Deliverable: <span className="underline decoration-terracotta/50">{current.deliverable}</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Step Pipeline */}
          <div className="lg:col-span-7 space-y-4 lg:mt-4" ref={stepsContainerRef}>
            <div className="font-mono text-xs text-ink/50 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse"></span>
              CLICK OR HOVER ANY PHASE TO EXPLORE DETAILS
            </div>
            {steps.map((s, i) => {
              const isActive = activeStep === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActiveStep(i)}
                  onClick={() => setActiveStep(i)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 flex gap-5 items-start text-left ${
                    isActive
                      ? "bg-[#E3EBE6] border-forest shadow-lg scale-[1.02]"
                      : "bg-white border-[#E7ECE8] hover:border-forest/40 hover:bg-white/80"
                  }`}
                >
                  <span className={`font-mono text-sm font-bold px-3.5 py-2 rounded-xl transition-all flex-shrink-0 ${
                    isActive ? "bg-forest text-cream shadow-md scale-110" : "bg-gray-100 text-terracotta"
                  }`}>
                    {s.num}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className={`font-sans font-bold text-[18px] sm:text-[21px] leading-[1.3] ${
                        isActive ? "text-forest" : "text-[#17211B]"
                      }`}>{s.title}</h3>
                      <span className={`text-xs font-mono px-2.5 py-0.5 rounded ${isActive ? "bg-forest/10 text-forest font-bold" : "text-ink/40"}`}>{s.time}</span>
                    </div>
                    <p className={`text-[15px] sm:text-[16px] leading-[1.6] mt-1.5 ${isActive ? "text-[#17211B]" : "text-[#667069]"}`}>{s.desc}</p>
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

