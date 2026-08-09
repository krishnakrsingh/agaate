import { ArrowRight, Phone, Star } from "lucide-react";
import { AnimatedHeadline, MagneticButton, Reveal, motion } from "@/components/common/motion";
import { Orb, PulseRing } from "./deco";

export function TestimonialBand() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card px-6 py-16 text-center md:py-20">
      <PulseRing className="left-1/2 top-8 h-48 w-48 -translate-x-1/2" />
      <Orb from="moss" className="-bottom-24 -left-20 h-72 w-72 opacity-15" />
      <Orb from="terracotta" className="-right-24 -top-20 h-64 w-64 opacity-10" />
      <Reveal variant="fade-down">
        <p className="font-jet text-[10px] font-bold uppercase tracking-[0.2em] text-moss">
          Farmer Trust Signal
        </p>
      </Reveal>
      <Reveal variant="scale-up" delay={0.12} className="mt-8">
        <div className="flex items-center justify-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0, rotate: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "backOut", delay: 0.25 + i * 0.09 }}
            >
              <Star className="h-5 w-5 fill-terracotta text-terracotta" />
            </motion.span>
          ))}
        </div>
      </Reveal>
      <AnimatedHeadline
        as="h2"
        className="mx-auto mt-8 max-w-4xl font-serif text-3xl font-bold leading-[1.15] tracking-tight text-forest-deep md:text-5xl"
        text="Agaate Kisan Mall is a one-stop shop for authentic agricultural inputs directly from manufacturers."
        delay={0.2}
        highlight={(w) => w === "one-stop" || w === "authentic"}
      />
      <Reveal variant="fade-up" delay={0.4} className="mt-8">
        <p className="font-jet text-[10px] font-bold uppercase tracking-[0.18em] text-forest/60">
          Pankaj Gupta · Verified Farmer · Karnal, Haryana
        </p>
      </Reveal>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-bone px-6 py-20 text-center md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-forest)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-5" />
      <PulseRing className="left-1/2 top-12 h-56 w-56 -translate-x-1/2" />
      <div className="relative z-10">
        <Reveal variant="fade-up">
          <p className="font-jet text-[10px] font-bold uppercase tracking-[0.2em] text-moss">
            Market Linkage · Buyback Ecosystem
          </p>
        </Reveal>
        <AnimatedHeadline
          as="h2"
          className="mx-auto mt-5 max-w-4xl font-serif text-4xl font-bold leading-[1.08] tracking-tight text-forest-deep md:text-6xl"
          text="Agaate stands with the farmer at every step — from seed to sale."
          delay={0.15}
          highlight={(w) => w === "seed" || w === "sale."}
        />
        <Reveal
          variant="fade-up"
          delay={0.35}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton as="a" href="#contract" strength={0.35}>
            <span className="inline-flex items-center gap-2 rounded-full bg-forest-deep px-8 py-4 text-sm font-bold text-cream shadow-lg transition-colors hover:bg-forest">
              Generate your buyback contract
              <ArrowRight className="h-4 w-4" />
            </span>
          </MagneticButton>
          <a
            href="tel:9487263498"
            className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-card px-8 py-4 text-sm font-bold text-forest-deep transition-all hover:-translate-y-0.5 hover:bg-cream"
          >
            <Phone className="h-4 w-4" />
            Call 9487263498
          </a>
        </Reveal>
      </div>
    </section>
  );
}
