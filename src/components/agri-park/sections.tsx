import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import {
  AnimatedHeadline,
  MagneticButton,
  motion,
  Parallax,
  Reveal,
  SectionHeader,
  Stagger,
  StaggerItem,
  TiltCard,
  useScroll,
  useSpring,
} from "@/components/common/motion";
import { FIRST_OF_KIND, LIFECYCLE, NURSERY_STORY, ZONES_EIGHT, lifecycleVariants } from "./data";
import { Orb, PulseRing } from "./deco";

export function ZonesOverview() {
  return (
    <section className="relative">
      <Orb from="moss" className="-top-20 -right-24 h-72 w-72 opacity-15" />
      <Orb from="terracotta" className="bottom-0 -left-28 h-80 w-80 opacity-10" />
      <SectionHeader
        align="center"
        eyebrow="Walk the entire crop journey in one visit"
        title={
          <>
            Eight dedicated zones, <span className="italic text-terracotta">one living farm.</span>
          </>
        }
        description="Dedicated zones, each powered by trusted agri partners — from the first seed to the final market."
      />
      <Stagger
        className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        stagger={0.08}
      >
        {ZONES_EIGHT.map((z) => {
          const Icon = z.icon;
          return (
            <StaggerItem key={z.label} variant="scale-up">
              <TiltCard
                maxTilt={7}
                className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-moss/10 blur-xl transition-all duration-500 group-hover:scale-150" />
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-bone transition-colors duration-300 group-hover:bg-moss/15">
                  <Icon className="h-6 w-6 text-forest" strokeWidth={1.8} />
                </div>
                <p className="font-serif text-lg font-bold text-forest-deep">{z.label}</p>
                <p className="mt-1.5 text-xs leading-5 text-forest/70">{z.benefit}</p>
              </TiltCard>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}

export function FirstOfKind() {
  return (
    <section className="relative">
      <Reveal variant="fade-left" className="text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-forest px-4 py-2 text-xs font-bold text-cream shadow-sm">
          ★ India's First of Its Kind
        </div>
        <h2 className="mt-5 max-w-2xl font-serif text-4xl font-bold leading-[1.08] tracking-tight text-forest-deep md:text-5xl">
          Why it's <span className="italic text-terracotta">first of its kind.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-forest/70 md:text-lg">
          A single, living farm where India's leading seed, irrigation, nutrition, protection,
          machinery, and market partners come together — demonstrated on real crops across the full
          seed-to-sale journey.
        </p>
      </Reveal>
      <Stagger
        className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        stagger={0.08}
      >
        {FIRST_OF_KIND.map((r, i) => {
          const Icon = r.icon;
          return (
            <StaggerItem key={r.title} variant={i % 2 === 0 ? "fade-up" : "blur-in"}>
              <div className="group flex h-full items-start gap-4 rounded-3xl border border-border bg-bone/60 p-6 transition-colors duration-300 hover:bg-card">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-forest text-cream shadow-md transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <h3 className="font-serif text-xl font-bold text-forest-deep">{r.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-forest/70">{r.desc}</p>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}

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
            A living lab, <span className="italic text-moss">under controlled skies.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/80 md:text-lg">
            Agaate's Bio-Boosted nursery replaces risky direct seed sowing with seedlings raised in
            a 17-acre, AI-monitored facility — dramatically better survival, reduced chemical need,
            and higher final yield.
          </p>
        </Reveal>
        <Stagger
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
          stagger={0.09}
        >
          {NURSERY_STORY.map((f, i) => {
            const Icon = f.icon;
            return (
              <StaggerItem key={f.label} variant={i % 2 ? "fade-down" : "fade-up"}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-cream/15 bg-cream/5 p-5 backdrop-blur-sm transition-colors duration-300 hover:bg-cream/10">
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
      </div>
    </section>
  );
}

export function Lifecycle() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.45"],
  });
  const progressScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  return (
    <section ref={ref} className="relative">
      <Orb from="terracotta" className="-top-16 right-0 h-72 w-72 opacity-10" />
      <SectionHeader
        eyebrow="From lab to land"
        title={
          <>
            The four-phase <span className="italic text-terracotta">seed-to-sale</span> lifecycle.
          </>
        }
        description="Research & Development, Cultivation, Quality Testing, Distribution — every sapling moves through the same verified pipeline."
      />
      <div className="relative mt-14">
        <div className="absolute left-0 right-0 top-[5px] h-[2px] rounded-full bg-border" />
        <motion.div
          className="absolute left-0 right-0 top-[5px] h-[2px] origin-left rounded-full bg-terracotta"
          style={{ scaleX: progressScale }}
        />
        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-4">
          {LIFECYCLE.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} variant={lifecycleVariants[i]} delay={0.05 * i}>
                <div className="group">
                  <div className="mb-5 flex h-3 items-center">
                    <span className="relative flex h-3 w-3 rounded-full border-2 border-terracotta bg-cream">
                      <motion.span
                        className="absolute inset-0 rounded-full bg-terracotta"
                        animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                        transition={{
                          duration: 2.6,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: i * 0.5,
                        }}
                      />
                    </span>
                  </div>
                  <span className="font-jet text-xs font-bold text-terracotta">{p.phase}</span>
                  <div className="mt-3 flex items-center gap-2.5">
                    <Icon className="h-5 w-5 text-moss" strokeWidth={2} />
                    <h3 className="font-serif text-2xl font-bold text-forest-deep">{p.title}</h3>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-forest/70">{p.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function TaglineBand() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card px-6 py-16 text-center md:py-24">
      <PulseRing className="left-1/2 top-10 h-56 w-56 -translate-x-1/2" />
      <Orb from="moss" className="-bottom-24 -left-20 h-72 w-72 opacity-15" />
      <Orb from="terracotta" className="-right-24 -top-20 h-64 w-64 opacity-10" />
      <Reveal variant="fade-down">
        <p className="font-jet text-[10px] font-bold uppercase tracking-[0.2em] text-moss">
          India's First of Its Kind
        </p>
      </Reveal>
      <AnimatedHeadline
        as="h2"
        className="mx-auto mt-5 max-w-4xl font-serif text-4xl font-bold leading-[1.08] tracking-tight text-forest-deep md:text-6xl"
        text="One farm. Every solution. Built for the Indian farmer."
        delay={0.15}
        highlight={(w) => w === "farm." || w === "solution."}
      />
      <Reveal
        variant="fade-up"
        delay={0.3}
        className="mt-9 flex flex-wrap items-center justify-center gap-4"
      >
        <MagneticButton as="a" href="#tour" strength={0.35}>
          <span className="inline-flex items-center gap-2 rounded-full bg-forest-deep px-8 py-4 text-sm font-bold text-cream shadow-lg transition-colors hover:bg-forest">
            Plan your Agri Park visit
            <ArrowRight className="h-4 w-4" />
          </span>
        </MagneticButton>
        <a
          href="tel:9487263498"
          className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-card px-8 py-4 text-sm font-bold text-forest-deep transition-all hover:-translate-y-0.5 hover:bg-cream"
        >
          Call 9487263498
        </a>
      </Reveal>
    </section>
  );
}
