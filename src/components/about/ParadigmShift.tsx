import { Reveal, SectionHeader } from "@/components/common/motion";
import { paradigmMetrics } from "./data";

export default function ParadigmShift() {
  return (
    <section
      id="bio-boosted"
      className="relative overflow-hidden py-20 px-6 md:py-28 lg:px-12"
      aria-labelledby="bio-boosted-heading"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Why Bio-Boosted"
          title={<span id="bio-boosted-heading">Risky direct sowing vs. Agaate nursery.</span>}
          description="Quantifiable proof showing why starting with strong seedling roots transforms farmer profitability."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {paradigmMetrics.map((m, idx) => (
            <Reveal key={m.id} variant="fade-up" delay={0.05 + idx * 0.1}>
              <div className="flex h-full flex-col justify-between rounded-[2rem] border border-border bg-card p-8 text-left shadow-sm transition-all duration-300 hover:border-forest/30 hover:shadow-md">
                <div>
                  <span className="font-jet text-[10px] font-bold uppercase tracking-widest text-terracotta">
                    {m.label}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-forest-deep">{m.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-forest/70">{m.desc}</p>
                </div>
                <div className="mt-6 flex items-center justify-between rounded-xl bg-forest/5 p-3.5 font-jet text-xs font-bold text-forest-deep">
                  <span>{m.metricLabel}</span>
                  <span className="text-moss">{m.metricValue}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
