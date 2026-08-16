import { CheckCircle } from "@phosphor-icons/react";
import { SectionHeader, TiltCard } from "@/components/common/motion";
import { MODULES } from "./farm-tech-data";

export function TechModulesGrid() {
  return (
    <section id="tech-modules" className="scroll-mt-28">
      <SectionHeader
        align="center"
        eyebrow="SIX CORE HARDWARE & AI STACKS"
        title="Comprehensive AgTech Engineering."
        description="Every component is engineered specifically for harsh Indian field conditions — high heat, dusty soil, and variable power grids."
      />

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((mod) => {
          const Icon = mod.icon;
          return (
            <TiltCard key={mod.id} maxTilt={9} className="h-full">
              <div className="flex h-full flex-col justify-between rounded-[2.2rem] border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-forest/40 hover:shadow-xl">
                <div>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-forest/15 bg-bone text-forest">
                    <Icon className="h-7 w-7" />
                  </div>

                  <span className="mb-2 inline-block font-mono text-[10px] font-bold uppercase tracking-widest text-moss">
                    {mod.tag}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-forest-deep">{mod.name}</h3>
                  <p className="mt-2 font-mono text-xs text-terracotta">{mod.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-forest/75">{mod.text}</p>

                  <ul className="mt-6 space-y-2 border-t border-border/60 pt-4">
                    {mod.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-center gap-2 text-xs font-medium text-forest/80"
                      >
                        <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
}
