import { Marquee } from "@/components/ui/testimonials-13-utils/marquee";
import {
  Sprout,
  TrendingUp,
  ShieldCheck,
  Users,
  ShoppingBag,
  Droplets,
  HeartHandshake,
  Landmark,
} from "lucide-react";

const stats = [
  { value: "15,000+", label: "Acres Associated", icon: Landmark },
  { value: "500,000+", label: "Bio Plants Delivered", icon: Sprout },
  { value: "₹10 Cr+", label: "Annual Recurring Revenue", icon: TrendingUp },
  { value: "25+", label: "Direct Supply Partners", icon: ShieldCheck },
  { value: "20+", label: "Kisaan Sathi Field Experts", icon: Users },
  { value: "500+", label: "Agri-Input Products", icon: ShoppingBag },
  { value: "200+", label: "Smart Irrigations", icon: Droplets },
  { value: "2,000+", label: "Parivaar Farmers", icon: HeartHandshake },
];

export default function SectionStatsMarquee() {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-1 pb-3.5 md:pt-1.5 md:pb-4.5">
      {/* Soft gradient edge masks matching page white background */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white via-white/80 to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white via-white/80 to-transparent md:w-40" />

      <Marquee className="[--duration:35s] [--gap:0.75rem] md:[--gap:1rem]" pauseOnHover>
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="group flex items-center gap-3 rounded-[20px] border border-[#143d31]/12 bg-[#fffdf5] pl-2 pr-4.5 py-2 shadow-[0_2px_8px_-2px_rgba(20,61,49,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#143d31]/30 hover:bg-white hover:shadow-[0_6px_20px_-4px_rgba(20,61,49,0.12)]"
            >
              {/* Concentric Geometry: R_outer (20px) = R_inner (12px) + Padding (8px) */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[12px] bg-[#143d31]/8 text-[#143d31] transition-colors group-hover:bg-[#143d31] group-hover:text-white">
                <Icon className="h-4 w-4" />
              </div>
              <span className="font-display text-sm font-bold tracking-tight text-[#143d31] md:text-base">
                {stat.value}
              </span>
              <span className="h-3.5 w-[1px] bg-[#143d31]/15" />
              <span className="whitespace-nowrap font-jet text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#3D6547]">
                {stat.label}
              </span>
            </div>
          );
        })}
      </Marquee>
    </section>
  );
}

