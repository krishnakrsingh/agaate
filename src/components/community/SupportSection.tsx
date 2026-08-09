import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Battery,
  Camera,
  Check,
  ChevronRight,
  PhoneCall,
  Send,
  ShieldCheck,
  Signal,
  Wifi,
} from "lucide-react";
import { EASE, Reveal, SectionHeader } from "@/components/common/motion";
import {
  APP_FEATURES,
  CHAT_CHIPS,
  SERVICE_TABS,
  STAGE_CHIPS,
  VENTURE_STEPS,
  WHATSAPP_SCRIPTS,
  type ChatMsg,
  type TabId,
} from "./community-data";

function TypingBubble() {
  return (
    <div className="flex w-max items-center gap-2 rounded-2xl rounded-bl-sm border border-border bg-white px-4 py-3 shadow-sm">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-moss"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function ScriptedChat({ script }: { script: ChatMsg[] }) {
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (count >= script.length) {
      const t = setTimeout(() => setCount(0), 4200);
      return () => clearTimeout(t);
    }
    if (script[count].from === "farmer") {
      const t = setTimeout(() => setCount((c) => c + 1), 1100);
      return () => clearTimeout(t);
    }
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      setCount((c) => c + 1);
    }, 1500);
    return () => clearTimeout(t);
  }, [count, script]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [count, typing]);

  return (
    <div className="flex h-full flex-col bg-[#fdfbf3]">
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
        {script.slice(0, count).map((msg, i) => (
          <motion.div
            key={`${msg.from}-${i}`}
            initial={{ opacity: 0, y: 18, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className={`flex ${msg.from === "farmer" ? "justify-end" : "items-start gap-2"}`}
          >
            {msg.from === "farmer" ? (
              <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-forest-deep px-3.5 py-2.5 text-xs leading-relaxed text-cream shadow-sm">
                {msg.image && (
                  <div className="mb-2 flex items-center gap-1.5 rounded-xl bg-cream/10 px-3 py-2 text-[10px] font-bold text-moss">
                    <Camera className="h-3.5 w-3.5" /> Field photo attached
                  </div>
                )}
                <p>{msg.text}</p>
              </div>
            ) : (
              <div className="max-w-[88%] rounded-2xl rounded-bl-sm border border-border bg-white px-3.5 py-2.5 text-xs leading-relaxed text-ink shadow-sm">
                <div className="mb-1.5 flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-bone px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-forest">
                    <ShieldCheck className="h-2.5 w-2.5" /> Kisan Sathi
                  </span>
                </div>
                <p className="leading-relaxed">{msg.text}</p>
              </div>
            )}
          </motion.div>
        ))}
        {typing && <TypingBubble />}
      </div>
      <div className="flex items-center gap-2 border-t border-border/70 bg-cream p-2.5">
        <div className="flex-1 rounded-full bg-white px-3.5 py-2 text-[11px] text-forest/50">
          Reply on WhatsApp…
        </div>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-deep text-moss transition-transform hover:scale-105 active:scale-95">
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function AppPanel() {
  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto bg-[#fdfbf3] p-4">
      <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-jet text-[9px] font-bold uppercase tracking-[0.18em] text-moss">
            Crop Cycle Tracker
          </span>
          <span className="font-mono text-[9px] text-forest/60">Chilli · Plot A</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {STAGE_CHIPS.map((s) => (
            <span
              key={s.label}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-bold ${
                s.current
                  ? "bg-forest-deep text-cream ring-2 ring-moss/40"
                  : s.done
                    ? "bg-moss/15 text-forest"
                    : "bg-bone text-forest/40"
              }`}
            >
              {s.done && <Check className="h-2.5 w-2.5" />}
              {s.label}
            </span>
          ))}
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-bone">
          <motion.div
            className="h-full rounded-full bg-moss"
            initial={{ width: "0%" }}
            animate={{ width: "60%" }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
          />
        </div>
      </div>
      {APP_FEATURES.map((f, i) => {
        const Icon = f.icon;
        return (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0.3 + i * 0.16 }}
            className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-bone text-forest">
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-forest-deep">{f.title}</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-forest/70">{f.text}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function VenturePanel() {
  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto bg-[#fdfbf3] p-4">
      <div className="rounded-2xl bg-forest-deep p-4 text-cream shadow-sm">
        <p className="font-jet text-[9px] font-bold uppercase tracking-[0.18em] text-moss">
          Agri-Venture Studio
        </p>
        <p className="mt-1 font-serif text-lg font-bold">From field worker to farm entrepreneur.</p>
        <p className="mt-1 text-[11px] leading-relaxed text-cream/70">
          Agaate helps you set up agri businesses — with structured planning, inputs and direct
          market access.
        </p>
      </div>
      {VENTURE_STEPS.map((step, i) => (
        <motion.div
          key={step.number}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0.25 + i * 0.16 }}
          className="relative flex items-start gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm"
        >
          <span className="font-serif text-3xl font-bold leading-none text-terracotta">
            {step.number}
          </span>
          <div>
            <p className="text-xs font-bold text-forest-deep">{step.title}</p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-forest/70">{step.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function SupportSection() {
  const [tab, setTab] = useState<TabId>("track");

  return (
    <section
      id="farm-support"
      className="relative overflow-hidden border-y border-border bg-bone py-24"
    >
      <motion.div
        className="pointer-events-none absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--color-terracotta) 0%, transparent 70%)",
        }}
        animate={{ y: [0, -24, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="From Advice to Action"
              title={
                <>
                  Manage your farm,{" "}
                  <span className="italic text-terracotta">not just grow it.</span>
                </>
              }
              description="Farming is no longer guesswork. Agaate helps you track, decide, and grow — every day, on WhatsApp and in the field."
            />
            <div className="mt-8 space-y-3">
              {SERVICE_TABS.map((t) => {
                const Icon = t.icon;
                const isActive = t.id === tab;
                return (
                  <motion.button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    whileHover={{ x: 6 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-colors duration-300 ${
                      isActive
                        ? "border-forest/30 bg-card shadow-sm"
                        : "border-border bg-transparent hover:border-forest/20"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                        isActive ? "bg-forest-deep text-moss" : "bg-card text-forest"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <span className="block font-serif text-lg font-bold leading-tight text-forest-deep">
                        {t.label}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-forest/70">
                        {t.blurb}
                      </span>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 shrink-0 ${isActive ? "text-terracotta" : "text-forest/30"}`}
                    />
                  </motion.button>
                );
              })}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {CHAT_CHIPS.map((chip, i) => (
                <motion.span
                  key={chip}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: EASE }}
                  className="rounded-full border border-forest/15 bg-card px-3.5 py-1.5 text-[11px] font-semibold text-forest"
                >
                  {chip}
                </motion.span>
              ))}
            </div>
          </div>

          <Reveal variant="fade-right" amount={0.1}>
            <div className="relative mx-auto w-full max-w-[380px]">
              <motion.div
                className="pointer-events-none absolute -inset-5 rounded-[3rem] border border-forest/15"
                animate={{ scale: [1, 1.03, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-[2.6rem] border-[3px] border-forest-deep bg-forest-deep p-1.5 shadow-2xl shadow-forest-deep/25"
              >
                <div className="flex h-[560px] flex-col overflow-hidden rounded-[2.1rem] bg-cream">
                  <div className="flex shrink-0 items-center justify-between bg-cream px-4 pb-1 pt-2.5 text-[10px] font-bold text-ink">
                    <span>9:41</span>
                    <span className="h-2.5 w-2.5 rounded-full bg-black" />
                    <span className="flex items-center gap-1.5">
                      <Signal className="h-3 w-3" />
                      <Wifi className="h-3 w-3" />
                      <Battery className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center justify-between border-b border-border/70 bg-cream px-3.5 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="relative h-8 w-8 shrink-0 rounded-full border border-forest/15 bg-bone p-0.5">
                        <img
                          src="/logo11.png"
                          alt="Agaate"
                          className="h-full w-full rounded-full object-cover"
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-moss ring-2 ring-cream" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-forest-deep">Agaate Parivaar</p>
                        <span className="flex items-center gap-1 text-[9px] font-semibold text-moss">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-moss" />
                          Online · Sathi Active
                        </span>
                      </div>
                    </div>
                    <a
                      href="tel:9487263498"
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-deep text-moss transition-transform hover:scale-110"
                      title="Call Kisan Sathi"
                    >
                      <PhoneCall className="h-3.5 w-3.5" />
                    </a>
                  </div>
                  <div className="min-h-0 flex-1 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={tab}
                        initial={{ opacity: 0, y: 24, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -16, scale: 0.98 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="h-full"
                      >
                        {tab === "app" ? (
                          <AppPanel />
                        ) : tab === "venture" ? (
                          <VenturePanel />
                        ) : (
                          <ScriptedChat script={WHATSAPP_SCRIPTS[tab]} />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="flex shrink-0 items-center justify-around rounded-b-[2rem] border-t border-forest-deep/20 bg-forest-deep px-2 py-2.5">
                    {SERVICE_TABS.map((t) => {
                      const Icon = t.icon;
                      const isActive = t.id === tab;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTab(t.id)}
                          className="relative flex flex-col items-center gap-0.5 px-2 py-1"
                        >
                          {isActive && (
                            <motion.span
                              layoutId="support-tab-pill"
                              className="absolute inset-0 rounded-full bg-moss"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                          )}
                          <Icon
                            className={`relative h-3.5 w-3.5 ${isActive ? "text-forest-deep" : "text-cream/60"}`}
                          />
                          <span
                            className={`relative text-[8px] font-bold ${
                              isActive ? "text-forest-deep" : "text-cream/60"
                            }`}
                          >
                            {t.label.split(" ")[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
