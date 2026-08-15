import React from 'react';
import { ArrowRight, MapTrifold, Plant, CurrencyInr, Handshake, Users, Package, Drop, UsersThree } from "@phosphor-icons/react";

const stats = [
  { icon: MapTrifold, value: "15,000+", label: "Acres Associated", bg: "#f7b733", color: "#000" },
  { icon: Plant,      value: "500+",    label: "Plants Delivered", bg: "#a0c870", color: "#000" },
  { icon: CurrencyInr,value: "₹10 Cr+", label: "Value Managed",   bg: "#547cf4", color: "#fff" },
  { icon: Handshake,  value: "25+",     label: "Supply Partners",  bg: "#f38137", color: "#fff" },
  { icon: Users,      value: "20+",     label: "Kisan Sathi",      bg: "#f7b733", color: "#000" },
  { icon: Package,    value: "500+",    label: "Agri-Input SKUs",  bg: "#547cf4", color: "#fff" },
  { icon: Drop,       value: "200+",    label: "Installations",    bg: "#a0c870", color: "#000" },
  { icon: UsersThree, value: "2,000+",  label: "Parivaar Farmers", bg: "#f38137", color: "#fff" },
];

export default function SectionStatsMarquee() {
  return (
    <section className="relative w-full bg-[#f4f8f5] py-6 md:py-8 overflow-hidden">

      {/* Decorative flower on the far left */}
      <div className="absolute left-0 top-0 bottom-0 w-[300px] md:w-[400px] pointer-events-none hidden lg:block opacity-70 z-0">
        <img src="/flowerDesign.96b985b9.svg" className="w-full h-full object-contain object-left" alt="" />
      </div>

      {/* Card — flush to the right edge, rounded only on the left */}
      <div className="relative ml-auto w-full md:w-[95%] lg:w-[93%] rounded-l-[2.5rem] md:rounded-l-[3.5rem] overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row min-h-[320px] md:min-h-[380px]">

        {/* ── LEFT: image panel ── */}
        <div className="w-full md:w-[38%] lg:w-[40%] shrink-0 relative">
          <img
            src="/trust-retailer-farmer.jpg"
            alt="Smiling farmer retailer"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>

        {/* ── RIGHT: content panel ── */}
        <div className="flex-1 bg-[#487a4d] p-6 md:p-8 lg:p-10 flex flex-col justify-center relative">

          {/* Subtle texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, #000 40px, #000 80px)' }}
          />

          {/* Label */}
          <p className="text-white/80 text-[10px] md:text-xs uppercase tracking-[0.18em] mb-2 font-medium relative z-10">
            Agaate Impact
          </p>

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] leading-[1.15] text-white font-semibold mb-6 relative z-10">
            <span className="font-bold">Empowering 2,000+ Farmers</span>{" "}
            with Science-Backed Solutions
          </h2>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-4 mb-7 relative z-10 lg:pr-[160px]">
            {stats.map(({ icon: Icon, value, label, bg, color }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <div
                  className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: bg, color }}
                >
                  <Icon weight="fill" className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-white font-bold text-base md:text-lg leading-tight">{value}</div>
                  <div className="text-white/75 text-[11px] md:text-xs leading-snug">{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="relative z-10">
            <button className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-[#487a4d] font-bold py-2.5 px-6 text-sm md:text-base rounded-lg shadow-xl transition-transform hover:-translate-y-0.5 group">
              Start Your Journey
              <ArrowRight weight="bold" className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Bottom-right accent image */}
          <img
            src="/garden-tools.jpg"
            alt="Garden tools"
            className="absolute bottom-0 right-0 hidden md:block rounded-tl-[28px] w-[130px] lg:w-[165px] object-cover shadow-[-4px_-4px_16px_rgba(0,0,0,0.12)]"
          />
        </div>
      </div>
    </section>
  );
}
