import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CountUp, EASE } from "@/components/common/motion";

const MOLECULES = [
  { left: "6%", top: "10%", delay: 0, duration: 10, size: "text-[11px]" },
  { left: "22%", top: "4%", delay: 2.2, duration: 12, size: "text-sm" },
  { left: "40%", top: "16%", delay: 4.5, duration: 9, size: "text-[10px]" },
  { left: "58%", top: "6%", delay: 1.2, duration: 11, size: "text-xs" },
  { left: "74%", top: "20%", delay: 3.4, duration: 10.5, size: "text-[11px]" },
  { left: "90%", top: "8%", delay: 5.6, duration: 9.5, size: "text-xs" },
];

function FloatingMolecule({
  left,
  top,
  delay,
  duration,
  size,
}: {
  left: string;
  top: string;
  delay: number;
  duration: number;
  size: string;
}) {
  return (
    <motion.div
      className={`absolute font-mono font-bold text-forest/45 ${size}`}
      style={{ left, top }}
      animate={{ y: [0, -160], x: [0, 14, 0], opacity: [0, 0.9, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeOut" }}
    >
      CO₂
    </motion.div>
  );
}

function CarbonGauge() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <div className="flex items-end gap-3">
        <div className="flex h-44 w-1.5 flex-col justify-between">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-px w-full bg-forest/15" />
          ))}
        </div>
        <div className="relative h-44 w-4 overflow-hidden rounded-full border border-forest/10 bg-forest/5">
          <motion.div
            className="absolute inset-x-0 bottom-0 rounded-full bg-gradient-to-t from-forest-deep to-moss"
            initial={{ height: "0%" }}
            animate={inView ? { height: "72%" } : { height: "0%" }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.5 }}
          />
          <motion.div
            className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/40 to-transparent"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          />
        </div>
      </div>
      <div className="text-center">
        <p className="font-jet text-[9px] font-bold uppercase tracking-[0.22em] text-forest/50">
          Soil carbon · tCO₂e
        </p>
        <p className="mt-1 font-mono text-2xl font-bold text-forest-deep">
          <CountUp to={72} suffix="%" duration={1.8} />
        </p>
      </div>
    </div>
  );
}

export function HeroCo2Visual() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[420px] lg:block">
      <div className="absolute inset-0">
        {MOLECULES.map((m, i) => (
          <FloatingMolecule key={i} {...m} />
        ))}
        <div className="absolute right-16 top-1/2 -translate-y-1/2">
          <CarbonGauge />
        </div>
        <motion.div
          className="absolute right-40 top-16 h-24 w-24 rounded-full opacity-20 blur-2xl"
          style={{ background: "radial-gradient(circle, var(--color-moss) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.25, 1], y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
