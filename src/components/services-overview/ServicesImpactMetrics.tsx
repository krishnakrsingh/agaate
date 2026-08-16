import { ArrowRight, PhoneCall } from "@phosphor-icons/react";
import { CountUp, MagneticButton } from "@/components/common/motion";
import { getLocalizedPath } from "@/lib/i18n";
import { IMPACT_STATS } from "./services-overview-data";

export function ServicesImpactMetrics({ currentLang }: { currentLang: string }) {
  return (
    <>
      {/* Section 4: Operational Impact Metrics Band */}
      <section className="relative overflow-hidden rounded-[3rem] bg-forest-deep px-6 py-20 text-cream shadow-2xl md:px-16 md:py-24">
        <div className="relative z-10 mx-auto max-w-4xl space-y-4 text-center">
          <span className="font-jet text-xs font-bold uppercase tracking-[0.2em] text-moss">
            QUANTIFIABLE SCALE & TRUST
          </span>
          <h2 className="font-serif text-4xl font-bold text-cream md:text-6xl">
            The Numbers Behind Agaate's Growth.
          </h2>
          <p className="mx-auto max-w-xl text-base text-cream/80">
            Real results across Haryana and NCR region — building economic resilience for
            cultivators.
          </p>

          <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
            {IMPACT_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <CountUp
                  to={stat.to}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={2}
                  className="block font-serif text-4xl font-bold tracking-tight text-cream md:text-5xl"
                />
                <span className="mt-2 block font-jet text-[10px] font-semibold uppercase tracking-wider text-cream/60">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Bottom Final CTA Banner */}
      <section className="rounded-[2.5rem] border border-border bg-card p-10 text-center shadow-sm md:p-16">
        <div className="mx-auto max-w-2xl space-y-6">
          <span className="font-jet text-xs font-bold uppercase tracking-[0.2em] text-moss">
            READY TO LEVEL UP YOUR FARM YIELD?
          </span>
          <h2 className="font-serif text-3xl font-bold text-forest-deep md:text-5xl">
            Consult Our Senior Agronomists.
          </h2>
          <p className="text-base text-forest/80">
            Book a complimentary on-field soil assessment and customized fertigation prescription
            for your upcoming cropping cycle.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <MagneticButton as="a" href={getLocalizedPath("/contact", currentLang)} strength={0.3}>
              <span className="inline-flex items-center gap-2 rounded-full bg-forest-deep px-8 py-4 text-sm font-bold text-cream shadow-xl transition-colors hover:bg-forest">
                Book Free Consultation <ArrowRight className="h-4 w-4" />
              </span>
            </MagneticButton>
            <MagneticButton as="a" href="tel:8350085005" strength={0.3}>
              <span className="inline-flex items-center gap-2 rounded-full border border-forest/25 bg-card px-8 py-4 text-sm font-bold text-forest-deep shadow-sm hover:bg-cream">
                <PhoneCall className="h-4 w-4 text-moss" />
                Call Helpline
              </span>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
