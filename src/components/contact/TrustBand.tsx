import { useRef } from "react";
import { TRUST_METRICS } from "./data";
import { CountUp } from "@/components/common/motion";
import { ShieldCheck } from "@phosphor-icons/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function TrustBand() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reduceMotion } = context.conditions as { reduceMotion: boolean };
          if (reduceMotion) return;

          gsap.fromTo(
            ".trust-stat-col",
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            },
          );
        },
      );

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="trust-commitments"
      aria-labelledby="trust-heading"
      className="bg-[#f4f8f5] text-[#143d31] py-16 sm:py-20 md:py-24 border-b border-[#143d31]/10 relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-6 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                05 · Response Commitments & Proving Grounds
              </p>
            </div>
            <h2
              id="trust-heading"
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.12]"
            >
              Clear Response SLAs. Real Proving Grounds in Gurugram.
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#4f624f] leading-relaxed">
              We believe scientific agronomy begins with transparency. Every grower receives guaranteed response timelines, validated diagnostic advice, and access to living crop trials.
            </p>
          </div>

          {/* Standard Operating Protocol Badge */}
          <div className="flex items-center gap-3 p-3 px-4 rounded-2xl bg-white border border-[#143d31]/10 shadow-2xs shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#143d31] text-[#a3e635]">
              <ShieldCheck className="h-5 w-5" weight="fill" />
            </div>
            <div className="text-left">
              <p className="font-mono text-[10px] font-bold uppercase text-[#5d7d37]">Standard Operating Protocol</p>
              <p className="font-display text-xs font-bold text-[#143d31]">ICAR-Compliant Soil Diagnostics</p>
            </div>
          </div>
        </div>

        {/* 4-Column Card-Less Architectural Ledger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#143d31]/10 border-y border-[#143d31]/10 py-4">
          {TRUST_METRICS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="trust-stat-col p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:bg-white/50 transition-colors duration-300 text-left"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#143d31]/10 text-[#143d31]">
                      <Icon className="h-5 w-5" weight="duotone" />
                    </span>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5d7d37]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div>
                    <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#143d31] tracking-tight tabular-nums">
                      <CountUp
                        to={item.number}
                        prefix={item.prefix}
                        suffix={item.suffix}
                        duration={2}
                      />
                    </div>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5d7d37] mt-1">
                      {item.label}
                    </p>
                  </div>
                </div>

                <p className="pt-3 border-t border-[#143d31]/10 font-sans text-xs text-[#4f624f] leading-relaxed">
                  {item.sub}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
