import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trees, Microscope, Handshake, ArrowRight, TrendingUp, Sprout, TestTube, AlertTriangle } from "lucide-react";
import { ArchDownTransition } from "./SectionTransitions";
import { Link } from "@tanstack/react-router";

gsap.registerPlugin(ScrollTrigger);

export default function SectionValueProp() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } }
      );
      
      gsap.fromTo(
        tableRef.current?.querySelectorAll('.table-row') || [],
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: tableRef.current, start: "top 80%", once: true } }
      );

      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 0.2, ease: "back.out(1.5)", scrollTrigger: { trigger: quoteRef.current, start: "top 85%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      icon: Trees,
      title: "From Seeds to Sales",
      desc: "Complete crop support, from sowing to selling. We stand with farmers through the entire vegetable crop journey."
    },
    {
      icon: Microscope,
      title: "Science-Backed Decisions",
      desc: "Practical research and actionable scientific advancements to help farmers understand their crops and reduce losses."
    },
    {
      icon: Handshake,
      title: "Trusted Partnerships",
      desc: "Working with the best agri brands for reliable solutions, providing quality inputs and market linkage."
    }
  ];

  const comparisonData = [
    {
      metric: "Germination & Survival",
      icon: Sprout,
      traditional: "50% – 70%",
      bioBoosted: "90% – 98%",
      improvement: "+40% Base Survival"
    },
    {
      metric: "Seed Waste",
      icon: AlertTriangle,
      traditional: "High Baseline",
      bioBoosted: "Near Zero",
      improvement: "30% – 50% Reduction"
    },
    {
      metric: "Chemical Dependency",
      icon: TestTube,
      traditional: "High Baseline",
      bioBoosted: "Significantly Reduced",
      improvement: "50% – 70% Reduction"
    },
    {
      metric: "Overall Crop Yield",
      icon: TrendingUp,
      traditional: "Average Baseline",
      bioBoosted: "Highly Optimized",
      improvement: "15% – 30% Increase"
    }
  ];

  return (
    <>
      <section ref={sectionRef} id="value-prop-section" className="py-12 md:py-16 lg:py-20 px-6 lg:px-12 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-forest mb-4">Agaate is built for farmers, always.</h2>
            <p className="text-lg text-forest/70 max-w-2xl mx-auto">
              Our fundamental value proposition is centered on replacing high-risk, traditional direct seed sowing with science-backed, Bio-Boosted models.
            </p>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="bg-forest/[0.02] border border-[#E7ECE8] rounded-2xl p-8 hover:border-emerald-400 transition-colors">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-forest mb-3">{pillar.title}</h3>
                  <p className="text-forest/70 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Paradigm Shift Comparison Table */}
          <div ref={tableRef} className="mb-24">
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-sm font-bold tracking-wider mb-4 uppercase">The Paradigm Shift</span>
              <h3 className="text-3xl font-display font-bold text-forest">Traditional vs. Bio-Boosted Nursery</h3>
              <p className="text-forest/70 mt-2 max-w-2xl mx-auto">We aren't just selling plants; we are selling risk mitigation and enhanced profitability.</p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-[#E7ECE8] shadow-sm">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-forest/[0.02] border-b border-[#E7ECE8]">
                    <th className="p-6 font-bold text-forest w-1/4">Performance Metric</th>
                    <th className="p-6 font-semibold text-forest/70 w-1/4">Traditional Direct Sowing</th>
                    <th className="p-6 font-bold text-emerald-700 w-1/4 bg-emerald-50/50">Agaate Bio-Boosted</th>
                    <th className="p-6 font-bold text-forest w-1/4">Net Improvement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7ECE8]">
                  {comparisonData.map((row, idx) => {
                    const Icon = row.icon;
                    return (
                      <tr key={idx} className="table-row group hover:bg-forest/[0.01] transition-colors">
                        <td className="p-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-forest/5 text-forest/70 flex items-center justify-center">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="font-semibold text-forest">{row.metric}</span>
                          </div>
                        </td>
                        <td className="p-6 text-forest/70">{row.traditional}</td>
                        <td className="p-6 font-semibold text-emerald-700 bg-emerald-50/30 group-hover:bg-emerald-50/50 transition-colors">
                          <div className="flex items-center gap-2">
                            <ArrowRight className="w-4 h-4 text-emerald-500" />
                            {row.bioBoosted}
                          </div>
                        </td>
                        <td className="p-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm">
                            {row.improvement}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div ref={quoteRef} className="max-w-3xl mx-auto bg-forest text-cream rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            <p className="font-display text-2xl md:text-3xl font-medium leading-snug mb-6 relative z-10">
              "We built Agaate with a simple belief, that every farmer deserves the right guidance, the right tools, and the right support, so that their hard work never goes to loss."
            </p>
            <div className="text-emerald-400 font-semibold tracking-wide uppercase text-sm relative z-10">— Ankit Rawat, Founder & CEO</div>
            
            <div className="mt-8 relative z-10">
              <Link to="/about" className="inline-flex items-center gap-2 text-white border border-white/30 rounded-full px-6 py-2 hover:bg-white/10 transition-colors">
                Read our story
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ArchDownTransition topColor="#FFFFFF" bottomColor="#F9FAF9" />
    </>
  );
}
