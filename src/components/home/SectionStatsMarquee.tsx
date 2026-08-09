import { Marquee } from "@/components/ui/testimonials-13-utils/marquee";

const stats = [
  { value: "15000+", label: "Farmer's Land Associated" },
  { value: "500+", label: "Nursery Plants Delivered" },
  { value: "₹10 Cr+", label: "Annual Recurring Revenue" },
  { value: "25+", label: "Direct Supply from Manufacturers" },
  { value: "20+", label: "Kisan sathi team" },
  { value: "500+", label: "Agri - input Products" },
  { value: "200+", label: "Irrigation installed" },
  { value: "2000+", label: "Parivaar Farmers" },
];

export default function SectionStatsMarquee() {
  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="relative w-full py-10 md:py-14">
        <Marquee className="[--duration:30s] [--gap:2rem] md:[--gap:4rem]" pauseOnHover>
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="min-w-[200px] sm:min-w-[240px] md:min-w-[280px] text-center px-4 flex flex-col items-center justify-center"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#9a5a2c] font-display tracking-tight leading-none">
                {stat.value}
              </h2>
              <p className="mt-2 text-xs sm:text-sm font-medium uppercase tracking-wider text-[#4b5f51]/80 font-mono">
                {stat.label}
              </p>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
