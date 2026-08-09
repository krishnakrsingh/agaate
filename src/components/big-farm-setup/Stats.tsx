import { CountUp, Marquee, Stagger, StaggerItem } from "@/components/common/motion";

const MARQUEE_ITEMS = [
  "Land Planning",
  "Infrastructure Build-Out",
  "Inputs at Scale",
  "Operations",
  "Cost & ROI",
  "Ongoing Management",
];

const STATS = [
  { to: 200, suffix: "+", label: "Irrigation installations" },
  { to: 15000, suffix: "+", label: "Acres under association" },
  { to: 25, suffix: "+", label: "Manufacturer partners" },
];

export function MarqueeStrip() {
  return (
    <div className="border-y border-forest/15 bg-forest-deep py-4 overflow-hidden">
      <Marquee duration={30} className="text-cream/70">
        {MARQUEE_ITEMS.map((item) => (
          <span key={item} className="flex items-center gap-6">
            <span className="font-jet text-xs font-bold uppercase tracking-[0.22em]">{item}</span>
            <span className="text-moss">✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

export function StatsBand() {
  return (
    <section className="relative py-20 px-6 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-forest)_0.8px,transparent_0.8px)] [background-size:28px_28px] opacity-[0.05]" />
      <Stagger className="relative mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-10">
        {STATS.map((stat) => (
          <StaggerItem key={stat.label} variant="scale-up" className="text-center">
            <div className="font-serif text-5xl md:text-6xl font-bold text-forest-deep">
              <CountUp to={stat.to} suffix={stat.suffix} />
            </div>
            <p className="mt-3 font-jet text-[10px] font-semibold uppercase tracking-[0.18em] text-forest/50">
              {stat.label}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
