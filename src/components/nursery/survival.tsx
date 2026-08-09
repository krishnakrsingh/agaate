import { ArrowUpRight } from "lucide-react";
import { CountUp, EASE, Reveal, SectionHeader, motion } from "@/components/common/motion";
import { SURVIVAL_METRICS, type SurvivalMetric } from "./data";
import { DotGrid } from "./deco";

function MetricBar({
  label,
  value,
  display,
  tone,
  delay,
}: {
  label: string;
  value: number;
  display: string;
  tone: "muted" | "bio";
  delay: number;
}) {
  const fillCls = tone === "bio" ? "bg-forest" : "bg-forest/25";
  const labelCls = tone === "bio" ? "text-forest" : "text-forest/50";
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between font-mono text-[10px]">
        <span className={`font-bold ${labelCls}`}>{label}</span>
        <span className={`font-bold ${labelCls}`}>{display}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full border border-border/60 bg-bone">
        <motion.div
          className={`h-full rounded-full ${fillCls}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          style={{ width: `${value}%`, transformOrigin: "left" }}
          transition={{ duration: 1.2, ease: EASE, delay }}
        />
      </div>
    </div>
  );
}

export function SurvivalCompare() {
  return (
    <section className="relative text-left">
      <DotGrid className="-right-8 -top-6 hidden lg:block" />
      <SectionHeader
        eyebrow="Field-tested survival economics"
        title={
          <>
            From 50–70% survival to <span className="italic text-terracotta">90–98%.</span>
          </>
        }
        description="Replacing risky direct seed sowing with the Bio-Boosted nursery model — measured across germination, seed waste, chemical dependency and final yield."
      />
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {SURVIVAL_METRICS.map((m: SurvivalMetric, i: number) => (
          <Reveal key={m.label} variant="fade-up" delay={i * 0.08}>
            <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-jet text-[9px] font-bold uppercase tracking-widest text-forest/40">
                    Metric 0{i + 1}
                  </span>
                  <h3 className="mt-1 font-serif text-2xl font-bold text-forest-deep">{m.label}</h3>
                </div>
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-moss/10 px-3 py-1.5 font-mono text-sm font-bold text-forest">
                  <ArrowUpRight className="h-3.5 w-3.5 text-moss" />
                  <CountUp
                    to={m.deltaCount}
                    prefix={m.deltaPrefix}
                    suffix={m.deltaSuffix}
                    duration={1.8}
                  />
                </span>
              </div>
              <p className="mt-1 text-xs text-forest/60">{m.deltaNote}</p>
              <div className="mt-6 space-y-5">
                <MetricBar
                  label={m.tradLabel}
                  value={m.tradValue}
                  display={m.tradDisplay}
                  tone="muted"
                  delay={0.15 + i * 0.05}
                />
                <MetricBar
                  label={m.bioLabel}
                  value={m.bioValue}
                  display={m.bioDisplay}
                  tone="bio"
                  delay={0.3 + i * 0.05}
                />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
