import { CheckCircle, MapPin } from "@phosphor-icons/react";
import { SectionHeader, TiltCard } from "@/components/common/motion";
import { CASE_STUDIES } from "./community-data";

export function CommunityCaseStudies() {
  return (
    <section id="case-studies" className="scroll-mt-28">
      <SectionHeader
        align="center"
        eyebrow="GROWER TRIUMPHS & EVIDENCE"
        title="Verified Farmer Impact Stories."
        description="Authentic case studies from real fields across Haryana documenting precision spacing, bio-boosted survival rates, and additional revenue gains."
      />

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {CASE_STUDIES.map((study) => (
          <TiltCard key={study.id} maxTilt={7} className="h-full">
            <div className="flex h-full flex-col justify-between rounded-3xl border border-forest/15 bg-card p-8 shadow-sm transition-all hover:border-forest/40 hover:shadow-xl">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-forest-deep px-3 py-1 font-mono text-[10px] font-bold uppercase text-cream">
                    {study.crop}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-terracotta">
                    {study.tag}
                  </span>
                </div>

                <h4 className="mt-4 font-serif text-2xl font-bold text-forest-deep">
                  {study.farmer}
                </h4>
                <div className="mt-1 flex items-center gap-1 font-mono text-xs text-forest/60">
                  <MapPin className="h-3.5 w-3.5 text-moss" />
                  <span>
                    {study.location} · {study.acres}
                  </span>
                </div>

                <div className="my-6 grid grid-cols-3 gap-2 border-y border-border py-4 text-center">
                  {study.metrics.map((m) => (
                    <div key={m.label}>
                      <span className="font-serif text-xl font-bold text-terracotta">
                        {m.value}
                      </span>
                      <p className="mt-0.5 font-mono text-[9px] font-bold uppercase text-forest/50">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="text-xs leading-relaxed text-forest/80">{study.summary}</p>
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-xs font-semibold text-emerald-800">
                <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>Verified Field Technique: {study.technique}</span>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
