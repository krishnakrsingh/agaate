import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Activity, Clock, Droplets, Thermometer } from "lucide-react";
import { EASE, Reveal, motion } from "@/components/common/motion";
import { BATCHES, type Batch } from "./data";
import { Orb } from "./deco";

function TelemetryDot() {
  return (
    <span className="relative flex h-2 w-2">
      <motion.span
        className="absolute inline-flex h-full w-full rounded-full bg-emerald-500"
        animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
      />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
    </span>
  );
}

function BatchCard({ batch, index }: { batch: Batch; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.12 }}
      whileHover={{ y: -6 }}
      className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-6 shadow-sm"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-emerald-500/5 blur-2xl" />

      <div className="mb-6 flex items-center justify-between">
        <span className="rounded border border-forest/10 bg-[#eef3f0] px-2 py-0.5 font-mono text-[10px] font-bold text-forest">
          Batch {batch.id}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-emerald-500">
          <TelemetryDot /> {batch.health}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <span className="block font-mono text-[10px] text-forest/40">CROP VARIETY</span>
          <h4 className="text-base font-bold text-forest-deep">{batch.crop}</h4>
        </div>
        <div>
          <span className="block font-mono text-[10px] text-forest/40">GERMINATION STAGE</span>
          <span className="text-sm font-semibold text-forest">{batch.stage}</span>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between font-mono text-[10px] text-forest/50">
            <span>CHAMBER GROWTH PROGRESS</span>
            <span>{batch.progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-bone">
            <motion.div
              className="relative h-full overflow-hidden rounded-full bg-forest"
              initial={{ width: "0%" }}
              whileInView={{ width: `${batch.progress}%` }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.2 + index * 0.15 }}
            >
              <motion.div
                className="absolute inset-y-0 w-1/3 bg-cream/40 blur-[2px]"
                animate={{ x: ["-120%", "340%"] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 0.7,
                }}
              />
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-border/50 pt-4 font-mono text-xs">
          <div className="flex items-center gap-1.5">
            <Thermometer className="h-4 w-4 text-terracotta" />
            <div>
              <span className="block text-[9px] text-forest/40">TEMP</span>
              <span className="font-bold text-forest-deep">{batch.temp}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Droplets className="h-4 w-4 text-blue-500" />
            <div>
              <span className="block text-[9px] text-forest/40">HUMIDITY</span>
              <span className="font-bold text-forest-deep">{batch.humidity}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 border-t border-border/50 pt-4 text-xs text-forest/70">
          <Clock className="h-4 w-4 text-forest/45" />
          <span>
            Hardening finishes in{" "}
            <span className="font-bold text-forest-deep">{batch.daysLeft} days</span>
          </span>
        </div>
      </div>

      <AnimatePresence>
        {hovered ? (
          <motion.div
            key="overlay"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute inset-x-4 bottom-4 rounded-2xl border border-forest/15 bg-cream/95 p-4 shadow-lg backdrop-blur"
          >
            <span className="flex items-center gap-1.5 font-jet text-[9px] font-bold uppercase tracking-widest text-forest">
              <Activity className="h-3 w-3" /> Live chamber detail
            </span>
            <div className="mt-2.5 grid grid-cols-2 gap-2 font-mono text-[10px]">
              <span className="text-forest/50">AI CLIMATE MONITOR</span>
              <span className="flex items-center justify-end gap-1 font-bold text-forest">
                <TelemetryDot /> Online
              </span>
              <span className="text-forest/50">IPM STATUS</span>
              <span className="text-right font-bold text-forest">Protected</span>
              <span className="text-forest/50">TRACEABILITY</span>
              <span className="text-right font-bold text-forest">Serial linked</span>
              <span className="text-forest/50">ROOT ZONE</span>
              <span className="text-right font-bold text-terracotta">{batch.temp}</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export function Batches() {
  return (
    <section className="relative border-t border-border pt-24 text-left">
      <Orb from="moss" className="-top-10 -left-24 h-72 w-72 opacity-10" />
      <Reveal variant="fade-up">
        <span className="mb-2 block font-jet text-[10px] font-bold uppercase tracking-widest text-forest/40">
          Real-time chamber system
        </span>
        <h2 className="font-serif text-4xl font-bold tracking-tight text-forest-deep">
          Active Seedling Batch Telemetry
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-forest/70">
          Every germinated batch is tracked by automated ambient sensor clusters inside our smart
          greenhouses. Review active readings below before placing orders.
        </p>
      </Reveal>
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {BATCHES.map((b, idx) => (
          <BatchCard key={b.id} batch={b} index={idx} />
        ))}
      </div>
    </section>
  );
}
