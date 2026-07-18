import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArchDownTransition } from "./SectionTransitions";

gsap.registerPlugin(ScrollTrigger);

/* 6.5 CARBON CREDIT PROGRAM */
export default function Section7() {
  const [selectedPractices, setSelectedPractices] = useState<string[]>(["drip", "tillage"]);
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftColRef.current?.children || [],
        { opacity: 0, x: -35, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 0.75, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true } }
      );
      gsap.fromTo(widgetRef.current,
        { opacity: 0, y: 35, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "back.out(1.4)", scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Subtle bounce feedback on banner when total changes
  useEffect(() => {
    if (!bannerRef.current) return;
    const t = gsap.fromTo(bannerRef.current,
      { scale: 0.96 },
      { scale: 1, duration: 0.35, ease: "back.out(2)" }
    );
    return () => {
      t.kill();
    };
  }, [totalCredits]);

  return (
    <>
      <ArchDownTransition topColor="#E3EBE6" bottomColor="#FFFFFF" />
      <section ref={sectionRef} className="bg-white py-12 md:py-16 lg:py-20 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Info */}
          <div className="lg:col-span-6 text-left" ref={leftColRef}>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-forest/[0.08] border border-forest/20 font-mono text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse"></span>
              MONETIZE SUSTAINABILITY
            </div>
            <h2 className="font-display text-[32px] sm:text-[40px] md:text-[46px] lg:text-[52px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
              Earn Extra Income from Sustainable Practices
            </h2>
            <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[640px] mb-8">
              Good farming already saves carbon. Agaate helps you measure, verify, and monetise it — turning sustainable practices into a regular payout stream with zero extra land required.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border-l-2 border-forest pl-4 py-1 bg-forest/[0.02] rounded-r-xl">
                <div className="text-xl font-bold font-mono text-forest flex items-center gap-2">
                  <span>1 Carbon Credit</span>
                  <span className="text-xs bg-forest/10 px-2 py-0.5 rounded text-forest">VERIFIED</span>
                </div>
                <div className="text-xs text-ink/60 mt-1 leading-relaxed">Satellite & IoT verification handled seamlessly by Agaate AI.</div>
              </div>
              <div className="border-l-2 border-terracotta pl-4 py-1 bg-terracotta/[0.02] rounded-r-xl">
                <div className="text-xl font-bold font-mono text-terracotta flex items-center gap-2">
                  <span>Zero Hassle</span>
                  <span className="text-xs bg-terracotta/10 px-2 py-0.5 rounded text-terracotta">DIRECT PAY</span>
                </div>
                <div className="text-xs text-ink/60 mt-1 leading-relaxed">Direct bank deposit once annual carbon audit completes.</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Estimator Widget */}
          <div className="lg:col-span-6" ref={widgetRef}>
            <div className="bg-[#E3EBE6] border border-[#E7ECE8] rounded-[28px] p-6 sm:p-8 shadow-xl relative group hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-mono text-[12px] uppercase tracking-wider text-forest font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-forest"></span>
                  INTERACTIVE PRACTICE ESTIMATOR
                </h3>
                <span className="text-xs font-mono text-ink/60 bg-white/60 px-2.5 py-1 rounded-md border border-[#C4CFC8]">Click to toggle practices</span>
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
                          : "bg-white/50 border-[#E7ECE8] hover:border-forest/40 hover:bg-white/80"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          <div className={`w-6 h-6 rounded-lg border flex items-center justify-center text-xs font-bold transition-all flex-shrink-0 ${
                            isSelected ? "bg-forest border-forest text-cream shadow-sm scale-110" : "border-[#C4CFC8] text-transparent bg-white"
                          }`}>
                            ✓
                          </div>
                          <div className="text-left">
                            <div className="font-sans font-bold text-[#17211B] text-[16px] sm:text-[17px] leading-tight">{p.name}</div>
                            <div className="text-xs text-ink/60 mt-0.5">{p.desc}</div>
                          </div>
                        </div>
                        <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md flex-shrink-0 ${
                          isSelected ? "bg-forest/15 text-forest border border-forest/20" : "bg-gray-200/60 text-gray-500"
                        }`}>
                          +{p.value} tCO₂
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Live Total & Payout Banner */}
              <div
                ref={bannerRef}
                className="bg-forest text-cream rounded-2xl p-6 shadow-xl flex flex-wrap justify-between items-center gap-4 text-left border border-forest-deep"
              >
                <div>
                  <div className="text-[11px] text-cream/70 font-mono tracking-wider uppercase">ESTIMATED CREDITS</div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-cream mt-1">{totalCredits} <span className="text-lg font-normal">tCO₂/ha</span></div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-[11px] text-cream/70 font-mono tracking-wider uppercase">ANNUAL PAYOUT</div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-yellow-300 mt-1 drop-shadow">₹{estimatedEarnings.toLocaleString()}<span className="text-sm font-normal text-cream/80">/yr</span></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

