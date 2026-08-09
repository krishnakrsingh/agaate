import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence } from "framer-motion";
import { Check, ShieldCheck, ShoppingCart } from "lucide-react";
import { EASE, MagneticButton, animate, motion, useMotionValue } from "@/components/common/motion";
import { MAX_ACRES, RECOMMENDATIONS, SLOTS } from "./data";
import { Orb, PulseRing } from "./deco";

const THUMB_W = 24;

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    const controls = animate(fromRef.current, value, {
      duration: 0.9,
      ease: EASE,
      onUpdate: (v) => setDisplay(v),
    });
    fromRef.current = value;
    return () => controls.stop();
  }, [value]);

  return (
    <span className={className}>
      {prefix}
      {Math.round(display).toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function Calculator({
  crop,
  onCropChange,
}: {
  crop: string;
  onCropChange: (crop: string) => void;
}) {
  const [acres, setAcres] = useState(2);
  const [booked, setBooked] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbX = useMotionValue(0);

  const rec = RECOMMENDATIONS[crop] ?? RECOMMENDATIONS.Tomato;
  const totalSeedlings = rec.qty * acres;
  const estimatedCost = totalSeedlings * rec.cost;
  const ratio = (acres - 1) / (MAX_ACRES - 1);

  const setFromClientX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const r = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    setAcres(Math.round(1 + r * (MAX_ACRES - 1)));
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const usable = el.getBoundingClientRect().width - THUMB_W;
    animate(thumbX, ratio * usable, { duration: 0.45, ease: EASE });
  }, [acres, thumbX, ratio]);

  const handleBooking = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
      setSelectedSlot(null);
    }, 4000);
  };

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-bone p-8 text-left shadow-sm">
      <Orb from="moss" className="-top-20 -right-16 h-56 w-56 opacity-15" />
      <PulseRing className="bottom-10 -left-6 h-20 w-20" />
      <div className="relative z-10">
        <span className="mb-1 block font-jet text-[9px] font-bold uppercase tracking-widest text-terracotta">
          Interactive Planner
        </span>
        <h3 className="font-serif text-3xl font-bold text-forest-deep">Seedling Calculator</h3>

        <AnimatePresence mode="wait">
          {booked ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="mt-8 flex min-h-[380px] flex-col items-center justify-center rounded-3xl border border-forest/10 bg-card p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 16, delay: 0.15 }}
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500"
              >
                <ShieldCheck className="h-8 w-8 animate-pulse" />
              </motion.div>
              <h4 className="mb-2 font-serif text-3xl font-bold text-forest-deep">
                Booking Registered
              </h4>
              <p className="max-w-xs text-xs leading-relaxed text-forest/70">
                We have reserved your seedling trays for{" "}
                <span className="font-semibold text-forest">
                  {selectedSlot || "the next available slot"}
                </span>
                . An agronomy coordinator will contact you to finalize delivery logistics.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              ref={formRef}
              onSubmit={handleBooking}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="mt-6 space-y-6"
            >
              <div>
                <label className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-wider text-forest/60">
                  Select Vegetable Crop
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(RECOMMENDATIONS).map((name) => {
                    const isActive = crop === name;
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => onCropChange(name)}
                        className={`relative cursor-pointer rounded-xl px-4 py-2.5 font-mono text-xs font-bold transition-colors ${
                          isActive
                            ? "text-cream"
                            : "border border-border bg-card text-forest/70 hover:border-forest"
                        }`}
                      >
                        {isActive ? (
                          <motion.span
                            layoutId="crop-pill"
                            className="absolute inset-0 rounded-xl border border-forest bg-forest"
                            transition={{ type: "spring", stiffness: 340, damping: 30 }}
                          />
                        ) : null}
                        <span className="relative z-10">{name}</span>
                      </button>
                    );
                  })}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={crop}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="mt-3 rounded-xl border border-forest/10 bg-card p-4"
                  >
                    <span className="block font-jet text-[9px] font-bold uppercase tracking-widest text-moss">
                      Raised for {crop}
                    </span>
                    <p className="mt-1 text-xs leading-relaxed text-forest/70">{rec.desc}</p>
                    <div className="mt-2 flex gap-3 font-mono text-[10px] font-semibold text-forest/60">
                      <span>{rec.qty.toLocaleString("en-IN")} plugs / acre</span>
                      <span className="text-terracotta">₹{rec.cost} / plug</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div>
                <label className="mb-2 flex items-baseline justify-between font-mono text-[10px] font-semibold uppercase tracking-wider text-forest/60">
                  <span>Total Acreage</span>
                  <span className="rounded-md bg-forest/10 px-2 py-0.5 text-forest">
                    <AnimatedNumber value={acres} suffix=" Acres" />
                  </span>
                </label>
                <div
                  ref={trackRef}
                  onClick={(e) => setFromClientX(e.clientX)}
                  className="relative h-1.5 w-full cursor-pointer rounded-full bg-border"
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-forest"
                    animate={{ width: `${ratio * 100}%` }}
                    transition={{ duration: 0.45, ease: EASE }}
                  />
                  <div className="absolute left-0 top-1/2 z-10 -translate-y-1/2">
                    <motion.div
                      role="slider"
                      aria-label="Total acreage"
                      aria-valuemin={1}
                      aria-valuemax={MAX_ACRES}
                      aria-valuenow={acres}
                      drag="x"
                      dragConstraints={trackRef}
                      dragElastic={0}
                      dragMomentum={false}
                      onDrag={(_, info) => setFromClientX(info.point.x)}
                      style={{ x: thumbX }}
                      className="h-6 w-6 -ml-3 cursor-grab rounded-full border-2 border-cream bg-forest shadow-md active:cursor-grabbing"
                    />
                  </div>
                </div>
                <div className="mt-2 flex justify-between font-mono text-[10px] text-forest/40">
                  <span>1 Acre</span>
                  <span>{MAX_ACRES} Acres</span>
                </div>
              </div>

              <div>
                <label className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-wider text-forest/60">
                  Select Delivery Slot
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {SLOTS.map((s) => {
                    const isFullyBooked = s.status === "Fully Booked";
                    const isSelected = selectedSlot === s.date;
                    return (
                      <button
                        key={s.date}
                        type="button"
                        disabled={isFullyBooked}
                        onClick={() => setSelectedSlot(s.date)}
                        className={`relative w-full cursor-pointer rounded-xl border p-3 text-left font-mono text-xs transition-colors ${
                          isFullyBooked
                            ? "cursor-not-allowed border-border/50 bg-bone/40 text-forest/30 opacity-50"
                            : isSelected
                              ? "text-cream"
                              : "border-border bg-card text-forest-deep hover:border-forest"
                        }`}
                      >
                        {isSelected ? (
                          <motion.span
                            layoutId="slot-pill"
                            className="absolute inset-0 rounded-xl border border-forest bg-forest"
                            transition={{ type: "spring", stiffness: 340, damping: 30 }}
                          />
                        ) : null}
                        <span className="relative z-10 flex items-center justify-between gap-3">
                          <span>
                            {s.date}
                            <span className="mt-0.5 block font-sans text-[10px] opacity-75">
                              {s.desc}
                            </span>
                          </span>
                          <span
                            className={`shrink-0 rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                              isFullyBooked
                                ? "bg-forest/10"
                                : isSelected
                                  ? "bg-cream/20 text-cream"
                                  : s.status === "Available"
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "bg-amber-50 text-amber-600"
                            }`}
                          >
                            {s.status}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-5 font-mono text-xs shadow-sm">
                <div>
                  <span className="block text-forest/40">SEEDLINGS REQUIRED</span>
                  <span className="block text-sm font-bold text-forest-deep">
                    <AnimatedNumber value={totalSeedlings} suffix=" Plugs" />
                  </span>
                </div>
                <div>
                  <span className="block text-forest/40">EST. ACCELERATOR COST</span>
                  <span className="block text-sm font-bold text-terracotta">
                    <AnimatedNumber value={estimatedCost} prefix="₹" />
                  </span>
                </div>
                <div className="col-span-2 border-t border-border/50 pt-3">
                  <span className="block text-forest/40">DESCRIPTION</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={crop}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="mt-1 block font-sans text-xs leading-relaxed text-forest/70"
                    >
                      {rec.desc}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              <MagneticButton
                strength={0.35}
                onClick={() => formRef.current?.requestSubmit()}
                className="w-full"
              >
                <span
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-semibold transition-colors ${
                    selectedSlot
                      ? "bg-forest-deep text-cream hover:bg-forest"
                      : "bg-forest/35 text-cream/70"
                  }`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Reserve Seedling Trays</span>
                  {selectedSlot ? <Check className="h-4 w-4" strokeWidth={3} /> : null}
                </span>
              </MagneticButton>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
