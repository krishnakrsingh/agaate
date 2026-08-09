import { MapPin } from "lucide-react";
import { Parallax, Reveal, Stagger, StaggerItem } from "@/components/common/motion";
import { NURSERY_INFRA } from "./data";

export function SmartNursery() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-forest-deep px-6 py-16 text-cream shadow-xl shadow-forest-deep/10 md:px-14 md:py-24">
      <Parallax offset={130} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:26px_26px]" />
      </Parallax>
      <div className="absolute -right-24 top-1/3 h-80 w-80">
        <Parallax offset={-70} className="h-full w-full">
          <div className="h-full w-full rounded-full bg-terracotta/30 blur-3xl" />
        </Parallax>
      </div>
      <div className="absolute -left-20 -top-24 h-72 w-72">
        <Parallax offset={-110} className="h-full w-full">
          <div className="h-full w-full rounded-full bg-moss/25 blur-3xl" />
        </Parallax>
      </div>
      <div className="relative z-10">
        <Reveal variant="clip-up">
          <p className="font-jet text-[10px] font-bold uppercase tracking-[0.2em] text-cream/60">
            The 17-acre smart nursery · Kukrola, Gurugram
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl">
            Seedless farming, <span className="italic text-moss">under controlled skies.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/80 md:text-lg">
            Every tray is raised inside our 17-acre smart nursery — a strictly controlled,
            AI-monitored environment with in-house production and trials, integrated pest and
            disease management, and standardized protocols from germination to dispatch.
          </p>
        </Reveal>
        <Stagger
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.09}
        >
          {NURSERY_INFRA.map((f, i) => {
            const Icon = f.icon;
            return (
              <StaggerItem key={f.label} variant={i % 2 ? "fade-down" : "fade-up"}>
                <div className="group flex h-full flex-col gap-3 rounded-2xl border border-cream/15 bg-cream/5 p-5 backdrop-blur-sm transition-colors duration-300 hover:bg-cream/10">
                  <Icon className="h-5 w-5 text-moss" strokeWidth={2} />
                  <div>
                    <p className="text-sm font-bold leading-snug">{f.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-cream/60">{f.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
        <Reveal variant="fade-up" delay={0.2} className="mt-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/10 px-4 py-2 font-jet text-[10px] font-bold uppercase tracking-widest text-cream/80">
            <MapPin className="h-3.5 w-3.5 text-moss" />
            NH8, Kukrola, Gurugram, Haryana — 17 acres
          </span>
        </Reveal>
      </div>
    </section>
  );
}
