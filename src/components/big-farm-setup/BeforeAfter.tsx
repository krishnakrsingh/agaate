import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { AnimatedHeadline, EASE, Reveal } from "@/components/common/motion";

export function BeforeAfter() {
  return (
    <section className="relative overflow-hidden bg-bone/50 border-y border-border py-24 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl text-center">
        <Reveal variant="fade-up">
          <p className="font-jet text-[10px] font-semibold uppercase tracking-[0.2em] text-moss mb-3">
            The transformation
          </p>
        </Reveal>
        <AnimatedHeadline
          text="One partner, from empty land to your first harvest."
          as="h2"
          className="mx-auto max-w-3xl font-serif text-4xl md:text-6xl font-bold tracking-tight text-forest-deep"
          highlight={(word) => word === "harvest."}
        />

        <div className="relative mt-16 grid gap-6 md:grid-cols-2">
          <Reveal variant="fade-left" amount={0.3}>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: EASE }}
              style={{ transformOrigin: "left" }}
              className="relative overflow-hidden rounded-[2.5rem] bg-forest-deep p-10 md:p-12 text-left min-h-[380px] flex flex-col justify-end"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-cream)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-[0.06]" />
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
                style={{ transformOrigin: "center" }}
                className="relative"
              >
                <span className="font-jet text-[10px] font-bold uppercase tracking-[0.2em] text-cream/40 block mb-4">
                  Before · Bare land
                </span>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-cream">
                  An empty acreage. Zero lines. Zero layout.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/60 max-w-sm">
                  No irrigation map, no drainage design, no input pipeline — every commercial farm
                  starts as a blank canvas.
                </p>
              </motion.div>
            </motion.div>
          </Reveal>

          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 hidden md:block">
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.75 }}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-terracotta text-cream shadow-lg shadow-terracotta/30"
            >
              <ArrowRight className="h-6 w-6" />
            </motion.div>
          </div>

          <Reveal variant="fade-right" amount={0.3}>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: EASE }}
              style={{ transformOrigin: "right" }}
              className="relative overflow-hidden rounded-[2.5rem] bg-card border border-forest/15 p-10 md:p-12 text-left min-h-[380px] flex flex-col justify-end"
            >
              <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-15">
                <motion.div
                  className="h-full w-full rounded-full"
                  style={{
                    background: "radial-gradient(circle, var(--color-moss) 0%, transparent 70%)",
                  }}
                  animate={{ y: [0, -16, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
                style={{ transformOrigin: "center" }}
                className="relative"
              >
                <span className="font-jet text-[10px] font-bold uppercase tracking-[0.2em] text-terracotta block mb-4">
                  After · First harvest
                </span>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-forest-deep">
                  Sized, planted, irrigated, managed.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-forest/70 max-w-sm">
                  Drip-ready beds, shade structures, trained manpower and assured market linkage —
                  market-ready produce leaving the block.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Drip & fertigation", "Bio-boosted nursery", "On-field agronomy"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-forest/10 border border-forest/15 px-3.5 py-1.5 font-jet text-[10px] font-semibold uppercase tracking-wider text-forest"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
