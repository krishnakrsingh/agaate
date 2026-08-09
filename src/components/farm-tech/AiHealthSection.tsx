import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, CheckCircle2, Radar, ScanSearch, ShieldCheck, Sprout } from "lucide-react";
import { EASE } from "@/components/common/motion";

const AI_STEPS = [
  { icon: Radar, label: "Analyzing leaf tissue", sub: "Scanning for disease & pest signatures" },
  {
    icon: ScanSearch,
    label: "Early blight detected",
    sub: "Tomato · 3rd leaf cluster · North Nursery",
  },
  {
    icon: ShieldCheck,
    label: "Crop-specific protocol ready",
    sub: "Foliar bio-input · repeat in 7 days",
  },
];

const AI_ROAD = [
  {
    icon: Camera,
    title: "Snap a photo",
    text: "Leaf spots, yellowing or pest attack — shoot it directly from the field.",
  },
  {
    icon: Radar,
    title: "AI reads the issue",
    text: "Disease & pest signatures matched in seconds from a smartphone photo.",
  },
  {
    icon: CheckCircle2,
    title: "Act immediately",
    text: "Instant, crop-specific advice — plus a direct connect to a real agronomist.",
  },
];

export function AiHealthSection() {
  return (
    <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
      <div className="space-y-6">
        <span className="block font-jet text-[10px] font-bold uppercase tracking-widest text-moss">
          AI CROP-HEALTH DETECTION
        </span>
        <h2 className="font-serif text-4xl font-bold leading-tight tracking-tight text-forest-deep md:text-5xl">
          Snap a photo. Spot the problem.{" "}
          <span className="italic text-terracotta">Act before it spreads.</span>
        </h2>
        <p className="text-sm leading-relaxed text-forest/75 md:text-base">
          Spot disease & pests early from a smartphone photo — get instant, crop-specific advice.
        </p>
        <div className="space-y-5">
          {AI_ROAD.map((s, i) => (
            <motion.div
              key={s.title}
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-forest-deep text-cream shadow-sm">
                <s.icon className="h-4.5 w-4.5" strokeWidth={1.8} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-forest-deep md:text-base">{s.title}</h4>
                <p className="mt-0.5 text-xs leading-relaxed text-forest/65">{s.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <AiPhoneScan />
      </motion.div>
    </div>
  );
}

function AiPhoneScan() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % AI_STEPS.length), 2600);
    return () => clearInterval(id);
  }, []);

  const current = AI_STEPS[step];

  return (
    <div className="relative mx-auto w-72">
      <motion.div
        className="absolute -inset-10 rounded-full opacity-20 blur-2xl"
        style={{ background: "radial-gradient(circle, var(--color-moss) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute -left-8 top-10 h-16 w-16 rounded-full border border-moss"
        animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
      />
      <div className="relative rounded-[2.8rem] border-4 border-forest-deep bg-ink p-2.5 shadow-2xl">
        <div className="relative overflow-hidden rounded-[2.2rem] bg-bone">
          <div className="flex h-40 items-center justify-center bg-[radial-gradient(var(--color-forest)_0.8px,transparent_0.8px)] [background-size:14px_14px] opacity-30">
            <Sprout className="h-14 w-14 text-forest" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px animate-radar-scan bg-gradient-to-r from-transparent via-terracotta/60 to-transparent" />
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-forest-deep text-cream">
                  <current.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-forest-deep">{current.label}</p>
                  <p className="font-mono text-[9px] text-forest/50">{current.sub}</p>
                </div>
              </div>
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-border">
                <motion.div
                  key={`bar-${step}`}
                  className="h-full rounded-full bg-forest"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.4, ease: "linear" }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
