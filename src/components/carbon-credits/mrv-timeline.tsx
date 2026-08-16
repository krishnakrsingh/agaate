import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { EASE } from "@/components/common/motion";
import { mrvSteps } from "./data";

export function MrvTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.55"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });

  return (
    <div ref={ref} className="relative mx-auto max-w-4xl">
      <div className="absolute bottom-0 left-4 top-0 w-px bg-forest/10 md:left-1/2" />
      <motion.div
        style={{ scaleY }}
        className="absolute bottom-0 left-4 top-0 w-px origin-top bg-forest md:left-1/2"
      />
      <div className="space-y-12 md:space-y-16">
        {mrvSteps.map((s, i) => {
          const leftSide = i % 2 === 0;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: leftSide ? -40 : 40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
              className={`relative pl-14 md:pl-0 ${
                leftSide ? "md:pr-[calc(50%+3.5rem)]" : "md:ml-[calc(50%+3.5rem)]"
              }`}
            >
              <div className="absolute left-4 top-2 -translate-x-1/2 md:left-1/2">
                <motion.span
                  className="absolute inset-0 rounded-full bg-forest/30"
                  animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.45, ease: "easeOut" }}
                />
                <span className="relative block h-3.5 w-3.5 rounded-full border-2 border-cream bg-forest shadow" />
              </div>
              <div className="group rounded-3xl border border-forest/10 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-forest/20 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest/8 text-forest transition-transform duration-300 group-hover:scale-110">
                    <s.icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <span className="font-jet text-xs font-bold tracking-[0.2em] text-forest/30">
                    {s.step}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-xl font-bold leading-snug text-forest-deep">
                  {s.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-forest/65">{s.text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
