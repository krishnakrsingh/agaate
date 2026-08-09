import { useRef } from "react";
import {
  motion,
  Reveal,
  SectionHeader,
  useScroll,
  useSpring,
  type RevealVariant,
} from "@/components/common/motion";
import { LIFECYCLE } from "./data";
import { Orb } from "./deco";

const lifecycleVariants: RevealVariant[] = ["fade-left", "scale-up", "fade-up", "blur-in"];

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
        eyebrow="From lab to field"
        title={
          <>
            The four-phase <span className="italic text-terracotta">seedling lifecycle.</span>
          </>
        }
        description="Research & Development → Cultivation → Quality Testing → Distribution — every tray moves through the same verified pipeline."
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
