import { LayoutGrid, Phone, ShieldCheck, Sprout, Target, type LucideIcon } from "lucide-react";
import { AnimatedHeadline, MagneticButton, Reveal, motion } from "@/components/common/motion";

const TRUST_POINTS: { icon: LucideIcon; label: string }[] = [
  { icon: ShieldCheck, label: "Turnkey liability" },
  { icon: Sprout, label: "Bio-boosted inputs" },
  { icon: Target, label: "Assured market linkage" },
];

export function FinalCta({ onOpenConsultation }: { onOpenConsultation?: () => void }) {
  return (
    <section className="relative overflow-hidden py-28 px-6 lg:px-12 bg-forest-deep">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-cream)_0.8px,transparent_0.8px)] [background-size:26px_26px] opacity-[0.05]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="h-[420px] w-[420px] rounded-full border border-cream/10"
          animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
        />
      </div>
      <div className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full opacity-20 blur-3xl">
        <motion.div
          className="h-full w-full rounded-full"
          style={{ background: "radial-gradient(circle, var(--color-moss) 0%, transparent 70%)" }}
          animate={{ y: [0, -24, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full opacity-20 blur-3xl">
        <motion.div
          className="h-full w-full rounded-full"
          style={{
            background: "radial-gradient(circle, var(--color-terracotta) 0%, transparent 70%)",
          }}
          animate={{ y: [0, 22, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal variant="blur-in">
          <p className="font-jet text-[10px] font-semibold uppercase tracking-[0.22em] text-moss mb-4">
            Start your turnkey build
          </p>
        </Reveal>
        <AnimatedHeadline
          text="Big farms are built, not bought."
          as="h2"
          className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-cream"
          highlight={(word) => word === "built,"}
        />
        <Reveal variant="fade-up" delay={0.25}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-cream/70 md:text-lg">
            From bare land to a fully productive commercial farm — one partner, from empty land to
            your first harvest.
          </p>
        </Reveal>
        <Reveal variant="fade-up" delay={0.4}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton as="a" href="tel:9487263498" strength={0.28}>
              <span className="inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-4 text-sm font-semibold text-cream shadow-lg shadow-terracotta/25">
                <Phone className="h-4 w-4" />
                Call Agaate · 9487263498
              </span>
            </MagneticButton>
            <button
              type="button"
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-8 py-4 text-sm font-semibold text-cream/90 transition-all hover:-translate-y-0.5 hover:border-cream/50 cursor-pointer"
            >
              <LayoutGrid className="h-4 w-4" />
              Request Field Survey
            </button>
          </div>
        </Reveal>
        <Reveal variant="fade-up" delay={0.55}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-cream/45">
            {TRUST_POINTS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-2 font-jet text-[10px] font-semibold uppercase tracking-[0.18em]"
              >
                <Icon className="h-4 w-4 text-moss" />
                {label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
