import { Activity, Check, ShieldCheck } from "lucide-react";
import { Reveal, Stagger, StaggerItem, motion } from "@/components/common/motion";
import { RECOMMENDATIONS } from "./data";
import { DotGrid, PulseRing } from "./deco";

const features = [
  {
    icon: ShieldCheck,
    title: "Organic Bio-Inoculation",
    text: "Accelerates early root colonization, protecting against damping-off and soil fungi attacks.",
  },
  {
    icon: Activity,
    title: "Double Root Density",
    text: "Chamber temperature rhythms stimulate dense lateral root branching for immediate transplant establishment.",
  },
];

const guarantees = ["Organic & Pure", "Sustainable", "High Quality"];

export function WhySeedlingQuality({ crop }: { crop: string }) {
  const rec = RECOMMENDATIONS[crop] ?? RECOMMENDATIONS.Tomato;

  return (
    <div className="relative space-y-8 text-left">
      <DotGrid className="-left-10 top-2 hidden lg:block" />

      <Reveal variant="fade-up">
        <h2 className="font-serif text-4xl font-bold leading-tight tracking-tight text-forest-deep md:text-5xl">
          Why seedling quality dictates final yield
        </h2>
      </Reveal>

      <Reveal variant="fade-up" delay={0.08}>
        <p className="text-sm leading-relaxed text-forest/75 md:text-base">
          Direct seed sowing has high mortality due to unpredictable heat, uneven moisture, and
          soil-borne fungal spores. Agaate's seedlings are germinated in sterile cocopeat plugs
          inoculated with biological beneficials (Trichoderma, Pseudomonas) inside automated climate
          vaults.
        </p>
      </Reveal>

      <Reveal variant="fade-left" delay={0.12}>
        <div className="relative overflow-hidden rounded-2xl bg-forest-deep p-6 text-cream shadow-md">
          <PulseRing className="right-6 top-6 h-16 w-16" />
          <p className="font-serif text-2xl italic leading-snug">
            "A better harvest must begin with strong roots."
          </p>
          <p className="mt-2 text-xs leading-relaxed text-cream/70">
            Strong root development for robust survival — healthy early-stage growth for a solid
            start in the field.
          </p>
        </div>
      </Reveal>

      <div className="flex flex-wrap gap-2">
        {guarantees.map((g, i) => (
          <Reveal key={g} variant="scale-up" delay={0.15 + i * 0.07}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/15 bg-card px-3.5 py-1.5 font-jet text-[10px] font-bold uppercase tracking-wider text-forest">
              <Check className="h-3 w-3 text-emerald-500" strokeWidth={3} />
              {g}
            </span>
          </Reveal>
        ))}
      </div>

      <Stagger className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <StaggerItem key={f.title} variant="fade-up">
              <div className="flex h-full gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-forest/10 bg-forest/5 text-forest">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-forest-deep md:text-base">{f.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-forest/65">{f.text}</p>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>

      <Reveal variant="blur-in" delay={0.1}>
        <div className="rounded-2xl border border-forest/10 bg-[#eef3f0]/50 p-6">
          <span className="mb-4 block font-jet text-[9px] font-bold uppercase tracking-widest text-forest">
            Yield metrics contrast
          </span>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-4 text-xs">
              <span className="block font-mono text-forest/50">TRADITIONAL SOWING</span>
              <motion.span
                key={`trad-${crop}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-1 block font-serif text-2xl font-bold text-destructive"
              >
                {rec.mortalityTrad}
              </motion.span>
              <span className="mt-1 block text-[10px] text-forest/60">
                Due to weak radicles & weather shock
              </span>
            </div>
            <div className="rounded-xl border border-forest/20 bg-card p-4 text-xs">
              <span className="flex items-center gap-1 font-mono font-bold text-forest">
                <Check className="h-3.5 w-3.5 text-emerald-500" strokeWidth={3} /> AGAATE SMART
                PLUGS
              </span>
              <motion.span
                key={`aga-${crop}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="mt-1 block font-serif text-2xl font-bold text-forest"
              >
                {rec.mortalityAgaate}
              </motion.span>
              <span className="mt-1 block text-[10px] text-forest/60">
                Inoculated roots anchor instantly
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
