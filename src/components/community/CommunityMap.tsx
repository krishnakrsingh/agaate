import { motion } from "framer-motion";
import { EASE, Parallax, Reveal } from "@/components/common/motion";
import { MAP_NODES } from "./community-data";

export default function CommunityMap() {
  return (
    <section className="relative overflow-hidden bg-forest-deep py-24 text-cream">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-moss)_0.8px,transparent_0.8px)] [background-size:26px_26px] opacity-10" />
      <motion.div
        className="pointer-events-none absolute -top-24 left-1/4 h-[360px] w-[360px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-moss) 0%, transparent 70%)" }}
        animate={{ y: [0, 24, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-jet text-[10px] font-semibold uppercase tracking-[0.18em] text-moss">
            Parivaar Network
          </p>
          <h2 className="mt-3 font-serif text-4xl font-bold tracking-tight md:text-5xl">
            2,000+ farmers, <span className="italic text-moss">one connected field.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cream/70">
            From the Jhajjar hub to the Rohtak Agri Park, the Kisan Mall to the Kukrola nursery —
            every node is a promise of guidance, inputs and market linkage.
          </p>
        </Reveal>

        <Parallax offset={70} className="relative mt-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] border border-cream/15 bg-night/50 sm:aspect-[16/9] md:aspect-[21/9]">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              {MAP_NODES.slice(1).map((n, i) => (
                <motion.path
                  key={n.label}
                  d={`M50 50 L${n.x} ${n.y}`}
                  fill="none"
                  stroke="var(--color-moss)"
                  strokeWidth="0.4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.45 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: EASE, delay: 0.4 + i * 0.2 }}
                />
              ))}
              <motion.circle
                cx={50}
                cy={50}
                r={16}
                fill="none"
                stroke="var(--color-moss)"
                strokeWidth="0.6"
                initial={{ opacity: 0.5 }}
                animate={{ r: [16, 40], opacity: [0.5, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.circle
                cx={50}
                cy={50}
                r={16}
                fill="none"
                stroke="var(--color-moss)"
                strokeWidth="0.6"
                initial={{ opacity: 0.5 }}
                animate={{ r: [16, 40], opacity: [0.5, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 1.3 }}
              />
              <motion.circle
                cx={50}
                cy={50}
                r={3.5}
                fill="var(--color-terracotta)"
                animate={{ r: [3.5, 4.5, 3.5] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
              {MAP_NODES.slice(1).map((n, i) => (
                <motion.circle
                  key={`dot-${n.label}`}
                  cx={n.x}
                  cy={n.y}
                  r={2.2}
                  fill="var(--color-moss)"
                  animate={{ r: [2.2, 3.2, 2.2], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
                />
              ))}
            </svg>

            {MAP_NODES.map((n) => (
              <motion.div
                key={n.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border backdrop-blur-md ${
                  n.hub
                    ? "border-moss/40 bg-forest-deep/90 px-5 py-2.5 text-center"
                    : "border-cream/20 bg-night/70 px-3 py-1.5"
                }`}
              >
                <span
                  className={`block font-bold ${n.hub ? "font-serif text-sm md:text-base" : "text-[9px] md:text-[10px]"}`}
                >
                  {n.label}
                </span>
                <span className="block text-[8px] uppercase tracking-wider text-moss md:text-[9px]">
                  {n.sub}
                </span>
              </motion.div>
            ))}
          </div>
        </Parallax>
      </div>
    </section>
  );
}
