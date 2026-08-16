import React from 'react';
import {
  Plant,
  TrendUp,
  ShieldCheck,
  HouseLine,
  ShoppingBag,
  Drop,
  UsersThree,
  Heart,
} from "@phosphor-icons/react";
import { CountUp } from "@/components/common/motion";

const row1 = [
  {
    icon: Plant,
    value: 500000,
    suffix: "+",
    label: "BIO PLANTS DELIVERED",
    desc: "98% seedling survival rate",
  },
  {
    icon: TrendUp,
    value: 10,
    prefix: "₹",
    suffix: " Cr+",
    label: "ANNUAL VALUE MANAGED",
    desc: "1.8x transactional growth YoY",
  },
  {
    icon: ShieldCheck,
    value: 25,
    suffix: "+",
    label: "DIRECT SUPPLY PARTNERS",
    desc: "Verified brand integrations",
  },
  {
    icon: HouseLine,
    value: 15000,
    suffix: "+",
    label: "ACRES ASSOCIATED",
    desc: "Haryana & Rajasthan network",
  },
];

const row2 = [
  {
    icon: ShoppingBag,
    value: 500,
    suffix: "+",
    label: "AGRI-INPUT PRODUCTS",
    desc: "Direct-to-farm secure commerce",
  },
  {
    icon: Drop,
    value: 200,
    suffix: "+",
    label: "SMART IRRIGATIONS",
    desc: "Water-saving precision drip kits",
  },
  {
    icon: UsersThree,
    value: 20,
    suffix: "+",
    label: "KISAAN SATHI EXPERTS",
    desc: "15-minute response on-ground",
  },
  {
    icon: Heart,
    value: 2000,
    suffix: "+",
    label: "PARIVAAR FARMERS",
    desc: "Active collaborative community",
  },
];

export default function SectionStatsMarquee() {
  const row1Items = [...row1, ...row1, ...row1, ...row1];
  const row2Items = [...row2, ...row2, ...row2, ...row2];

  return (
    <section className="relative w-full bg-gradient-to-b from-[#f4f8f5] to-[#fafbf7] py-10 overflow-hidden flex flex-col gap-5">
      {/* Smooth edge fade masks matching the background gradient */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 md:w-32 bg-gradient-to-r from-[#f4f8f5] via-[#f4f8f5]/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 md:w-32 bg-gradient-to-l from-[#fafbf7] via-[#fafbf7]/80 to-transparent" />

      <style>
        {`
          @keyframes marquee-stats-left {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          @keyframes marquee-stats-right {
            0% { transform: translate3d(-50%, 0, 0); }
            100% { transform: translate3d(0, 0, 0); }
          }
          .animate-marquee-left {
            display: flex;
            width: fit-content;
            animation: marquee-stats-left 46s linear infinite;
            will-change: transform;
          }
          .animate-marquee-right {
            display: flex;
            width: fit-content;
            animation: marquee-stats-right 46s linear infinite;
            will-change: transform;
          }
          .animate-marquee-left:hover,
          .animate-marquee-right:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* Row 1: Leftwards Gliding Marquee */}
      <div className="animate-marquee-left items-center gap-4 px-1.5">
        {row1Items.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={`row1-${idx}`}
              className="group flex items-start gap-3.5 rounded-2xl border border-[#143d31]/12 bg-white p-4 shadow-[0_4px_18px_rgba(20,61,49,0.03)] transition-all duration-300 hover:border-[#143d31]/25 hover:shadow-[0_12px_32px_rgba(20,61,49,0.09)] hover:-translate-y-1.5 hover:scale-[1.02] shrink-0 cursor-default select-none min-w-[310px]"
            >
              {/* Soft Icon Container */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#143d31]/5 text-[#143d31] transition-all duration-300 group-hover:bg-gradient-to-tr group-hover:from-[#143d31] group-hover:to-[#2d6a4f] group-hover:text-white group-hover:scale-110 group-hover:rotate-[6deg] group-hover:shadow-sm">
                <Icon weight="bold" className="h-4.5 w-4.5" />
              </div>

              {/* Text Area */}
              <div className="flex flex-col text-left">
                {/* Top Row: Value + Label */}
                <div className="flex items-center gap-2">
                  <span className="font-serif text-[17px] font-bold italic tracking-tight text-[#143d31] leading-none transition-colors duration-300 group-hover:text-emerald-900">
                    <CountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} duration={2.5} />
                  </span>
                  <span className="h-3 w-px bg-[#143d31]/15 transition-all duration-300 group-hover:bg-[#143d31]/30 group-hover:scale-y-110" />
                  <span className="font-mono text-[9px] font-bold tracking-[0.12em] text-[#5d7d37] uppercase leading-none transition-colors duration-300 group-hover:text-[#143d31]">
                    {stat.label}
                  </span>
                </div>

                {/* Bottom Row: Description */}
                <span className="font-sans text-[11px] text-[#4f624f]/85 leading-normal mt-1.5 font-normal transition-colors duration-300 group-hover:text-slate-700">
                  {stat.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 2: Rightwards Gliding Marquee */}
      <div className="animate-marquee-right items-center gap-4 px-1.5">
        {row2Items.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={`row2-${idx}`}
              className="group flex items-start gap-3.5 rounded-2xl border border-[#143d31]/12 bg-white p-4 shadow-[0_4px_18px_rgba(20,61,49,0.03)] transition-all duration-300 hover:border-[#143d31]/25 hover:shadow-[0_12px_32px_rgba(20,61,49,0.09)] hover:-translate-y-1.5 hover:scale-[1.02] shrink-0 cursor-default select-none min-w-[310px]"
            >
              {/* Soft Icon Container */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#143d31]/5 text-[#143d31] transition-all duration-300 group-hover:bg-gradient-to-tr group-hover:from-[#143d31] group-hover:to-[#2d6a4f] group-hover:text-white group-hover:scale-110 group-hover:rotate-[6deg] group-hover:shadow-sm">
                <Icon weight="bold" className="h-4.5 w-4.5" />
              </div>

              {/* Text Area */}
              <div className="flex flex-col text-left">
                {/* Top Row: Value + Label */}
                <div className="flex items-center gap-2">
                  <span className="font-serif text-[17px] font-bold italic tracking-tight text-[#143d31] leading-none transition-colors duration-300 group-hover:text-emerald-900">
                    <CountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} duration={2.5} />
                  </span>
                  <span className="h-3 w-px bg-[#143d31]/15 transition-all duration-300 group-hover:bg-[#143d31]/30 group-hover:scale-y-110" />
                  <span className="font-mono text-[9px] font-bold tracking-[0.12em] text-[#5d7d37] uppercase leading-none transition-colors duration-300 group-hover:text-[#143d31]">
                    {stat.label}
                  </span>
                </div>

                {/* Bottom Row: Description */}
                <span className="font-sans text-[11px] text-[#4f624f]/85 leading-normal mt-1.5 font-normal transition-colors duration-300 group-hover:text-slate-700">
                  {stat.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
