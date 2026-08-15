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
    <section className="relative w-full bg-[#fafbf7] py-2.5 md:py-3 overflow-hidden">
      {/* Smooth edge fade masks matching the background */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-28 bg-gradient-to-r from-[#fafbf7] via-[#fafbf7]/90 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-28 bg-gradient-to-l from-[#fafbf7] via-[#fafbf7]/90 to-transparent" />

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
          .animate-marquee-stats:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="animate-marquee-stats items-center gap-3 px-1.5">
        {marqueeItems.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="group flex items-center gap-3 rounded-full bg-white pl-1.5 pr-4 py-1.5 border border-[#143d31]/10 hover:border-[#143d31]/25 shadow-[0_1.5px_6px_rgba(20,61,49,0.06)] hover:shadow-[0_4px_16px_rgba(20,61,49,0.12)] hover:-translate-y-0.5 transition-all duration-200 shrink-0 cursor-default select-none"
            >
              {/* Dark Forest Icon Pod */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#143d31] text-[#f0f7f2] shadow-sm transition-all duration-200 group-hover:bg-[#0c241d] group-hover:scale-105">
                <Icon weight="bold" className="h-4.5 w-4.5" />
              </div>

              {/* Number Value */}
              <span className="font-sans text-[15px] font-bold text-[#143d31] tracking-tight leading-none">
                {stat.value}
              </span>

              {/* Subtle Hairline Divider */}
              <span className="h-3.5 w-px bg-[#143d31]/20" />

              {/* Metric Label */}
              <span className="font-mono text-[11px] font-semibold tracking-[0.12em] text-[#335345] uppercase leading-none pr-0.5">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
