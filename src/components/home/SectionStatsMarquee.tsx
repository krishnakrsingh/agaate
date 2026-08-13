import { Marquee } from "@/components/ui/testimonials-13-utils/marquee";
import {
  Bank,
  Drop,
  Handshake,
  Plant,
  ShieldCheck,
  ShoppingBag,
  TrendUp,
  Users
} from "@phosphor-icons/react";

interface StatItem {
  value: string;
  label: string;
  context: string;
  icon: React.ComponentType<{ className?: string }>;
}

const statsRow1: StatItem[] = [
  {
    value: "15,000+",
    label: "Acres Associated",
    context: "Haryana & Rajasthan network",
    icon: Bank,
  },
  {
    value: "500,000+",
    label: "Bio Plants Delivered",
    context: "98% seedling survival rate",
    icon: Plant,
  },
  {
    value: "₹10 Cr+",
    label: "Annual Value Managed",
    context: "1.8x transactional growth YoY",
    icon: TrendUp,
  },
  {
    value: "25+",
    label: "Direct Supply Partners",
    context: "Verified brand integrations",
    icon: ShieldCheck,
  },
];

const statsRow2: StatItem[] = [
  {
    value: "20+",
    label: "Kisaan Sathi Experts",
    context: "15-minute response on-ground",
    icon: Users,
  },
  {
    value: "2,000+",
    label: "Parivaar Farmers",
    context: "Active collaborative community",
    icon: Handshake,
  },
  {
    value: "500+",
    label: "Agri-Input Products",
    context: "Direct-to-farm secure commerce",
    icon: ShoppingBag,
  },
  {
    value: "200+",
    label: "Smart Irrigations",
    context: "Water-saving precision drip kits",
    icon: Drop,
  },
];

export default function SectionStatsMarquee() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f4f8f5] py-7 md:py-10 flex flex-col gap-4 md:gap-5">
      {/* Soft gradient edge masks matching Section 2 #f4f8f5 background */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#f4f8f5] via-[#f4f8f5]/90 to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#f4f8f5] via-[#f4f8f5]/90 to-transparent md:w-40" />

      {/* Row 1: Scrolling Left */}
      <Marquee className="[--duration:36s] [--gap:0.75rem] md:[--gap:1rem]" pauseOnHover>
        {statsRow1.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="group flex items-center gap-4 rounded-[24px] border border-[#143d31]/20 bg-white pl-3.5 pr-6 py-3 shadow-[0_6px_20px_-4px_rgba(20,61,49,0.05)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#143d31] hover:bg-[#143d31] hover:shadow-[0_16px_32px_-4px_rgba(20,61,49,0.2)]"
            >
              {/* Concentric Geometry: R_outer (24px) = R_inner (16px) + Padding (8px) */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-[#143d31] text-white transition-all duration-300 group-hover:bg-[#a3e635] group-hover:text-[#143d31] group-hover:scale-110 group-hover:rotate-6">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className="font-serif text-xl md:text-2xl font-normal italic text-[#5d7d37] tracking-tight leading-none group-hover:text-[#a3e635] transition-colors duration-300">
                    {stat.value}
                  </span>
                  <span className="h-3 w-[1px] bg-[#143d31]/20 group-hover:bg-white/20 shrink-0 transition-colors duration-300" />
                  <span className="whitespace-nowrap font-mono text-[9px] md:text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#3D6547] group-hover:text-white leading-none transition-colors duration-300">
                    {stat.label}
                  </span>
                </div>
                <span className="font-sans text-[10.5px] font-medium text-[#4f624f]/75 group-hover:text-white/80 mt-1 tracking-wide leading-none transition-colors duration-300">
                  {stat.context}
                </span>
              </div>
            </div>
          );
        })}
      </Marquee>

      {/* Row 2: Scrolling Right (reverse) */}
      <Marquee className="[--duration:40s] [--gap:0.75rem] md:[--gap:1rem]" pauseOnHover reverse>
        {statsRow2.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="group flex items-center gap-4 rounded-[24px] border border-[#143d31]/20 bg-white pl-3.5 pr-6 py-3 shadow-[0_6px_20px_-4px_rgba(20,61,49,0.05)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#143d31] hover:bg-[#143d31] hover:shadow-[0_16px_32px_-4px_rgba(20,61,49,0.2)]"
            >
              {/* Concentric Geometry: R_outer (24px) = R_inner (16px) + Padding (8px) */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-[#143d31] text-white transition-all duration-300 group-hover:bg-[#a3e635] group-hover:text-[#143d31] group-hover:scale-110 group-hover:rotate-6">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className="font-serif text-xl md:text-2xl font-normal italic text-[#5d7d37] tracking-tight leading-none group-hover:text-[#a3e635] transition-colors duration-300">
                    {stat.value}
                  </span>
                  <span className="h-3 w-[1px] bg-[#143d31]/20 group-hover:bg-white/20 shrink-0 transition-colors duration-300" />
                  <span className="whitespace-nowrap font-mono text-[9px] md:text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#3D6547] group-hover:text-white leading-none transition-colors duration-300">
                    {stat.label}
                  </span>
                </div>
                <span className="font-sans text-[10.5px] font-medium text-[#4f624f]/75 group-hover:text-white/80 mt-1 tracking-wide leading-none transition-colors duration-300">
                  {stat.context}
                </span>
              </div>
            </div>
          );
        })}
      </Marquee>
    </section>
  );
}


