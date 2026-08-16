import React from 'react';
import {
  MapTrifold,
  Plant,
  CurrencyInr,
  Handshake,
  Users,
  Package,
  Drop,
  UsersThree,
} from "@phosphor-icons/react";

const stats = [
  {
    icon: MapTrifold,
    value: "15,000+",
    label: "ACRES ASSOCIATED",
  },
  {
    icon: Plant,
    value: "500,000+",
    label: "PLANTS DELIVERED",
  },
  {
    icon: CurrencyInr,
    value: "₹10 CR+",
    label: "VALUE MANAGED",
  },
  {
    icon: Handshake,
    value: "25+",
    label: "SUPPLY PARTNERS",
  },
  {
    icon: Users,
    value: "20+",
    label: "KISAAN SATHI EXPERTS",
  },
  {
    icon: Package,
    value: "500+",
    label: "AGRI-INPUT SKUS",
  },
  {
    icon: Drop,
    value: "200+",
    label: "SMART IRRIGATIONS",
  },
  {
    icon: UsersThree,
    value: "2,000+",
    label: "PARIVAAR FARMERS",
  },
];

export default function SectionStatsMarquee() {
  // Duplicate stats to create a seamless infinite loop
  const marqueeItems = [...stats, ...stats, ...stats, ...stats];

  return (
    <section className="relative w-full bg-white py-3.5 border-y border-[#143d31]/10 overflow-hidden">
      {/* Smooth edge fade masks matching the background */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-28 bg-gradient-to-r from-white via-white/95 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-28 bg-gradient-to-l from-white via-white/95 to-transparent" />

      <style>
        {`
          @keyframes marquee-stats-glide {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .animate-marquee-stats {
            display: flex;
            width: fit-content;
            animation: marquee-stats-glide 38s linear infinite;
            will-change: transform;
          }
        `}
      </style>

      <div className="animate-marquee-stats items-center gap-4 px-1.5">
        {marqueeItems.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="group flex items-center gap-3.5 rounded-xl border border-[#143d31]/8 bg-white/95 px-4.5 py-2 shadow-[0_2px_8px_rgba(20,61,49,0.03)] hover:border-[#143d31]/20 hover:bg-white hover:shadow-[0_6px_20px_rgba(20,61,49,0.08)] hover:-translate-y-0.5 transition-all duration-300 shrink-0 cursor-default select-none"
            >
              {/* Premium Gradient Icon Container */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-[#143d31] to-[#2d6a4f] text-[#fafbf7] shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
                <Icon weight="bold" className="h-4 w-4" />
              </div>

              {/* Number Value - Serif Italic */}
              <span className="font-serif text-[16px] font-bold italic tracking-tight text-[#143d31] leading-none">
                {stat.value}
              </span>

              {/* Terracotta Brand Diamond Spark */}
              <span className="text-terracotta text-[10px] font-bold leading-none select-none">✦</span>

              {/* Metric Label */}
              <span className="font-mono text-[9px] font-bold tracking-[0.16em] text-[#5d7d37] uppercase leading-none pr-1">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
