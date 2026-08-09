import { ArrowRight, Phone } from "lucide-react";
import { AnimatedHeadline, MagneticButton, Reveal } from "@/components/common/motion";
import { Orb, PulseRing, Shimmer } from "./deco";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card px-6 py-16 text-center md:py-24">
      <PulseRing className="left-1/2 top-10 h-56 w-56 -translate-x-1/2" />
      <Orb from="moss" className="-bottom-24 -left-20 h-72 w-72 opacity-15" />
      <Orb from="terracotta" className="-right-24 -top-20 h-64 w-64 opacity-10" />
      <Shimmer />
      <Reveal variant="fade-down">
        <p className="font-jet text-[10px] font-bold uppercase tracking-[0.2em] text-moss">
          Begin with strong roots
        </p>
      </Reveal>
      <AnimatedHeadline
        as="h2"
        className="mx-auto mt-5 max-w-4xl font-serif text-4xl font-bold leading-[1.08] tracking-tight text-forest-deep md:text-6xl"
        text="Grow with the Bio-Boosted nursery."
        delay={0.15}
        highlight={(w) => w === "nursery."}
      />
      <Reveal variant="fade-up" delay={0.25} className="mt-8">
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-forest/70">
          Strong root development for robust survival — healthy early-stage growth for a solid
          start, from the smart nursery to your field.
        </p>
      </Reveal>
      <Reveal
        variant="fade-up"
        delay={0.35}
        className="mt-9 flex flex-wrap items-center justify-center gap-4"
      >
        <MagneticButton as="a" href="#calculator" strength={0.35}>
          <span className="inline-flex items-center gap-2 rounded-full bg-forest-deep px-8 py-4 text-sm font-bold text-cream shadow-lg transition-colors hover:bg-forest">
            Order seedling trays
            <ArrowRight className="h-4 w-4" />
          </span>
        </MagneticButton>
        <a
          href="tel:9487263498"
          className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-card px-8 py-4 text-sm font-bold text-forest-deep transition-all hover:-translate-y-0.5 hover:bg-cream"
        >
          <Phone className="h-4 w-4 text-moss" />
          Call 9487263498
        </a>
      </Reveal>
    </section>
  );
}
