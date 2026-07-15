import { useState } from "react";
import agroPark from "@/assets/agro-park.jpg";
import { ArchTransition } from "./SectionTransitions";

/* 7. AGRI-ENTREPRENEURSHIP AND BIG-FARM SETUP */
export default function Section8() {
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
