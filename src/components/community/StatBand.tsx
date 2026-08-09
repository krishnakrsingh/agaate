import { motion } from "framer-motion";
import { CountUp, Stagger, StaggerItem } from "@/components/common/motion";
import { STATS } from "./community-data";

export default function StatBand() {
  return (
    <section className="relative border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <Stagger className="grid gap-12 sm:grid-cols-3" stagger={0.14}>
          {STATS.map((s, i) => (
            <StaggerItem
              key={s.label}
              variant="scale-up"
              className={i > 0 ? "sm:border-l sm:border-border sm:pl-12" : ""}
            >
              <div className="relative">
                <motion.div
                  className="pointer-events-none absolute -left-6 -top-6 h-16 w-16 rounded-full opacity-10"
                  style={{
                    background: "radial-gradient(circle, var(--color-moss) 0%, transparent 70%)",
                  }}
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="font-serif text-6xl font-bold tracking-tight text-forest-deep md:text-7xl">
                  <CountUp to={s.value} suffix={s.suffix} duration={2} />
                </div>
                <p className="label-mono mt-2">{s.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
