import { TRUST_METRICS } from "./data";
import { CountUp, Reveal } from "@/components/common/motion";
import { ShieldCheck, Certificate, Plant, Clock } from "@phosphor-icons/react";

export default function TrustBand() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="bg-[#fbfcf9] text-[#143d31] py-16 sm:py-20 border-b border-[#143d31]/10 relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Reveal variant="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl text-left">
              <div className="flex items-center gap-2.5">
                <span className="h-px w-6 bg-[#5d7d37]" aria-hidden="true" />
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                  02 · Verified Response Commitments & Proving Grounds
                </p>
              </div>
              <h2
                id="trust-heading"
                className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#143d31] leading-[1.15]"
              >
                Clear Response SLAs. Real Proving Grounds in Gurugram.
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#4f624f] leading-relaxed">
                We believe scientific agronomy begins with transparency. Every grower receives guaranteed response timelines, validated diagnostic advice, and access to living crop trials.
              </p>
            </div>

            {/* ICAR Protocols Trust Badge */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#143d31]/10 shadow-xs shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#143d31] text-[#a3e635]">
                <ShieldCheck className="h-5 w-5" weight="fill" />
              </div>
              <div className="text-left">
                <p className="font-mono text-[10px] font-bold uppercase text-[#5d7d37]">Standard Operating Protocol</p>
                <p className="font-display text-xs font-bold text-[#143d31]">ICAR-Compliant Soil Diagnostics</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 4 Interactive Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TRUST_METRICS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.label} variant="fade-up" delay={idx * 0.08}>
                <div className="group relative rounded-3xl border border-[#143d31]/10 bg-white p-6 shadow-xs transition-all duration-300 hover:border-[#143d31]/25 hover:shadow-md hover:-translate-y-1 text-left flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f4f8f5] text-[#5d7d37] border border-[#143d31]/8 transition-colors group-hover:bg-[#143d31] group-hover:text-[#a3e635]">
                        <Icon className="h-5 w-5" weight="duotone" />
                      </span>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]/80">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div>
                      <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5d7d37]">
                        {item.label}
                      </p>
                      <div className="mt-1 font-display text-3xl sm:text-4xl font-extrabold text-[#143d31] tracking-tight">
                        <CountUp
                          to={item.number}
                          prefix={item.prefix}
                          suffix={item.suffix}
                          duration={2}
                        />
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 pt-3 border-t border-[#143d31]/8 font-sans text-xs text-[#4f624f] leading-relaxed">
                    {item.sub}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
