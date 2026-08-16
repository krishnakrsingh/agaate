import { ArrowRight } from "@phosphor-icons/react";
import { CountUp, MagneticButton, SectionHeader } from "@/components/common/motion";
import { getLocalizedPath } from "@/lib/i18n";
import { CYCLE, STATS } from "./farm-tech-data";

export function CropCycleWorkflow({ currentLang }: { currentLang: string }) {
  return (
    <>
      {/* 5-Stage Precision Cropping Cycle */}
      <section id="crop-cycle" className="scroll-mt-28">
        <SectionHeader
          align="center"
          eyebrow="CLOSED LOOP EXECUTION"
          title="Data-Driven 5-Stage Crop Cycle."
          description="How hardware telemetry, IoT automation, and AI advisory link together seamlessly across each phase of production."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CYCLE.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.label}
                className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:border-forest/40"
              >
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase text-terracotta">
                    PHASE 0{idx + 1}
                  </span>
                  <div className="my-4 flex h-12 w-12 items-center justify-center rounded-xl bg-bone text-forest">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-forest-deep">{step.label}</h4>
                  <p className="mt-2 text-xs text-forest/70">{step.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats Scale Band */}
      <section className="relative overflow-hidden rounded-[3rem] bg-forest-deep px-6 py-20 text-cream shadow-2xl md:px-16">
        <div className="relative z-10 mx-auto max-w-4xl space-y-4 text-center">
          <span className="font-jet text-xs font-bold uppercase tracking-[0.2em] text-moss">
            SCALE & ADOPTION
          </span>
          <h2 className="font-serif text-4xl font-bold text-cream md:text-5xl">
            Real Hardware in Real Indian Soil.
          </h2>

          <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <CountUp
                  to={stat.to}
                  suffix={stat.suffix}
                  duration={2}
                  className="block font-serif text-4xl font-bold text-cream md:text-5xl"
                />
                <span className="mt-2 block font-jet text-[10px] uppercase text-cream/60">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="rounded-[2.5rem] border border-border bg-card p-10 text-center shadow-sm md:p-16">
        <div className="mx-auto max-w-2xl space-y-6">
          <span className="font-jet text-xs font-bold uppercase tracking-[0.2em] text-moss">
            MODERNIZE YOUR ACREAGE
          </span>
          <h2 className="font-serif text-3xl font-bold text-forest-deep md:text-5xl">
            Ready to Deploy Farm Tech?
          </h2>
          <p className="text-base text-forest/80">
            Talk with an Agaate IoT systems engineer for soil probe layout, drone flight planning,
            and custom automated fertigation schematics.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <MagneticButton as="a" href={getLocalizedPath("/contact", currentLang)} strength={0.3}>
              <span className="inline-flex items-center gap-2 rounded-full bg-forest-deep px-8 py-4 text-sm font-bold text-cream shadow-xl transition-colors hover:bg-forest">
                Schedule IoT Demo <ArrowRight className="h-4 w-4" />
              </span>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
