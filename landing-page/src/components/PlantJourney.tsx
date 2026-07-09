"use client";

import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";

// ─── Tunable constants ─────────────────────────────────────────────────────────
const TOTAL_FRAMES = 240;
const FRAME_PATH = (n: number) =>
  `/tomato-grow/ezgif-frame-${String(n).padStart(3, "0")}.png`;

// Stage breakpoints as scroll-progress fractions (0 → 1)
const STAGE_BREAKS = {
  seed:    0,
  sapling: 0.33,
  grown:   0.66,
} as const;

// ─── Stage data ────────────────────────────────────────────────────────────────
interface StageData {
  id: string;
  tag: string;
  eyebrow: string;
  title: ReactNode;
  stat: string;
  statLabel: string;
  body: string;
}

const STAGES: StageData[] = [
  {
    id: "seed",
    tag: "Seed",
    eyebrow: "GERMINATION & SOWING",
    title: (
      <>
        Hybrid Tomato <br />
        <span className="italic text-terracotta">Propagation.</span>
      </>
    ),
    stat: "98%",
    statLabel: "Target Germination Rate",
    body: "Every premium vine starts here. We verify seed genetics for high germination rates, disease resistance (like leaf curl virus), and robust early root development in local soils.",
  },
  {
    id: "sapling",
    tag: "Flowering",
    eyebrow: "GROWING SEASON",
    title: (
      <>
        Vine Support &amp; <br />
        <span className="italic text-forest">Blossom Care.</span>
      </>
    ),
    stat: "24 / 7",
    statLabel: "Agronomist Monitoring",
    body: "As the plant flowers and climbs, precise nutrition and pest tracking are vital. Get targeted spray schedules, staking advice, and real-time alerts to prevent early blight.",
  },
  {
    id: "grown",
    tag: "Harvest",
    eyebrow: "RED TOMATO HARVEST",
    title: (
      <>
        High-Yield <br />
        <span className="italic text-terracotta">Red Harvest.</span>
      </>
    ),
    stat: "2.5x",
    statLabel: "Average yield increase",
    body: "From green fruit to brilliant red tomatoes. We connect you with direct institutional buyers for your vine-ripened tomatoes, securing high market rates and minimal post-harvest loss.",
  },
];

type StageIndex = 0 | 1 | 2;

function getStage(p: number): StageIndex {
  if (p >= STAGE_BREAKS.grown)   return 2;
  if (p >= STAGE_BREAKS.sapling) return 1;
  return 0;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function PlantJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const imagesRef  = useRef<HTMLImageElement[]>([]);
  const scrollRef  = useRef(0);
  const rafRef     = useRef<number | null>(null);
  const pendingRef = useRef(false);

  const [stage, setStage]         = useState<StageIndex>(0);
  const [prevStage, setPrevStage] = useState<StageIndex>(0);
  const [loaded, setLoaded]       = useState(false);
  const [loadPct, setLoadPct]     = useState(0);

  // ── Draw one frame with object-contain to ensure the plant is never clipped ──
  const drawFrame = useCallback((fi: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const imgs = imagesRef.current;
    if (!imgs.length) return;

    let img = imgs[fi];
    if (!img?.complete || !img.naturalWidth) {
      for (let d = 1; d < TOTAL_FRAMES; d++) {
        const l = fi - d, r = fi + d;
        if (l >= 0 && imgs[l]?.complete && imgs[l].naturalWidth) { img = imgs[l]; break; }
        if (r < TOTAL_FRAMES && imgs[r]?.complete && imgs[r].naturalWidth) { img = imgs[r]; break; }
      }
    }
    if (!img?.complete || !img.naturalWidth) return;

    const cw = canvas.width, ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);

    // Object-contain calculation
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    let dw = cw, dh = ch, dx = 0, dy = 0;
    if (cr > ir) {
      dh = ch;
      dw = ch * ir;
      dx = (cw - dw) / 2;
    } else {
      dw = cw;
      dh = cw / ir;
      dy = (ch - dh) / 2;
    }
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, dx, dy, dw, dh);
  }, []);

  // ── Size canvas to its container (HiDPI-safe) ─────────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const p = canvas.parentElement;
    if (!p) return;
    const dpr = window.devicePixelRatio || 1;
    const r   = p.getBoundingClientRect();
    canvas.style.width  = `${r.width}px`;
    canvas.style.height = `${r.height}px`;
    canvas.width  = Math.round(r.width  * dpr);
    canvas.height = Math.round(r.height * dpr);
    const fi = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(scrollRef.current * TOTAL_FRAMES)));
    drawFrame(fi);
  }, [drawFrame]);

  // ── Preload all frames ─────────────────────────────────────────────────────
  useEffect(() => {
    let done = 0;
    const imgs: HTMLImageElement[] = [];

    const tick = () => {
      done++;
      setLoadPct(done / TOTAL_FRAMES);
      if (done === TOTAL_FRAMES) {
        imagesRef.current = imgs;
        setLoaded(true);
        drawFrame(0);
      }
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src    = FRAME_PATH(i);
      img.onload = tick;
      img.onerror = tick;
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, [drawFrame]);

  // ── Scroll + resize wiring ─────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect       = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const p  = Math.min(1, Math.max(0, -rect.top / scrollable));
      scrollRef.current = p;

      const ns = getStage(p);
      setStage(prev => { if (prev !== ns) setPrevStage(prev); return ns; });

      if (!pendingRef.current) {
        pendingRef.current = true;
        rafRef.current = requestAnimationFrame(() => {
          pendingRef.current = false;
          const fi = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(p * TOTAL_FRAMES)));
          drawFrame(fi);
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas, { passive: true });
    resizeCanvas();
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resizeCanvas);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame, resizeCanvas]);

  useEffect(() => { if (loaded) resizeCanvas(); }, [loaded, resizeCanvas]);

  // ── Scroll to a stage's midpoint ──────────────────────────────────────────
  const goToStage = (idx: StageIndex) => {
    const el = sectionRef.current;
    if (!el) return;
    const mids = [0.15, 0.5, 0.85] as const;
    window.scrollTo({
      top: el.offsetTop + mids[idx] * (el.offsetHeight - window.innerHeight),
      behavior: "smooth",
    });
  };

  const isForward = stage > prevStage;

  // Panel transition with buttery exponential ease-out
  const panelStyle = (active: boolean): React.CSSProperties => ({
    opacity:    active ? 1 : 0,
    transform:  active ? "none" : `translateY(${isForward ? 28 : -28}px)`,
    transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
    pointerEvents: active ? "auto" : "none",
    willChange: "opacity, transform",
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "350vh" }}
      aria-label="Agaate plant journey — seed to harvest"
    >
      {/* ── STICKY VIEWPORT ─────────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-cream">

        {/* ── FULL-VIEWPORT CANVAS ──────────────────────────────────────── */}
        <div className="absolute inset-0 z-0">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-cream">
              <img
                src={FRAME_PATH(1)}
                alt=""
                className="absolute inset-0 w-full h-full object-contain opacity-30 scale-95"
              />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="label-mono text-forest-deep/60 tracking-[0.25em]">
                  LOADING 10 FPS JOURNEY
                </div>
                <div className="w-40 h-0.5 bg-forest-deep/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-terracotta rounded-full"
                    style={{
                      width: `${loadPct * 100}%`,
                      transition: "width 0.12s ease-out",
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="w-full h-full block transition-opacity duration-700"
            style={{ opacity: loaded ? 1 : 0 }}
          />

          {/* Seamless edge blending vignettes */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: [
                "linear-gradient(to right, oklch(0.965 0.018 90 / 0.95) 0%, oklch(0.965 0.018 90 / 0.7) 22%, transparent 40%)",
                "linear-gradient(to left,  oklch(0.965 0.018 90 / 0.95) 0%, oklch(0.965 0.018 90 / 0.7) 22%, transparent 40%)",
                "linear-gradient(to bottom, oklch(0.965 0.018 90 / 0.8) 0%, transparent 16%)",
                "linear-gradient(to top, oklch(0.965 0.018 90 / 0.85) 0%, transparent 20%)",
              ].join(", "),
            }}
          />
        </div>

        {/* ── SECTION MARKER (top-left) ─────────────────────────────────── */}
        <div className="absolute top-8 left-6 md:left-12 z-30 flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-terracotta inline-block" />
          <span className="label-mono text-forest-deep/60 tracking-[0.22em] font-medium">
            02 / PLANT JOURNEY
          </span>
        </div>

        {/* ── EDITORIAL TEXT GRID (12 Columns) ──────────────────────────── */}
        <div className="absolute inset-0 z-20 grid grid-cols-1 md:grid-cols-12 items-center px-6 md:px-12 lg:px-20 pointer-events-none">

          {/* LEFT COLUMN — Eyebrow, Large Serif Title, Body Copy */}
          <div className="col-span-1 md:col-span-5 lg:col-span-4 relative h-[320px] md:h-[380px] flex items-center">
            {STAGES.map((st, idx) => {
              const active = idx === stage;
              return (
                <div
                  key={st.id}
                  className="absolute inset-x-0 flex flex-col justify-center"
                  style={panelStyle(active)}
                >
                  {/* Eyebrow */}
                  <div className="label-mono text-terracotta tracking-[0.22em] font-semibold mb-4 flex items-center gap-2.5">
                    <span className="w-5 h-px bg-terracotta inline-block" />
                    <span>{st.eyebrow}</span>
                  </div>

                  {/* Editorial Heading matching Hero styling */}
                  <h2 className="font-display text-forest-deep text-5xl md:text-6xl lg:text-7xl leading-[1.04] tracking-tight mb-6">
                    {st.title}
                  </h2>

                  {/* Supporting Body Text */}
                  <p className="text-ink/80 text-base md:text-lg leading-[1.7] font-normal max-w-sm text-balance">
                    {st.body}
                  </p>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN — Clean Massive Stat Callout */}
          <div className="col-span-1 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9 relative h-[220px] md:h-[300px] flex items-center">
            {STAGES.map((st, idx) => {
              const active = idx === stage;
              return (
                <div
                  key={st.id}
                  className="absolute inset-x-0 flex flex-col justify-center items-start md:items-end md:text-right"
                  style={{
                    ...panelStyle(active),
                    // Stagger stat entry slightly behind heading for a high-end feel
                    transitionDelay: active ? "120ms" : "0ms",
                  }}
                >
                  <div className="label-mono text-forest-deep/50 tracking-[0.2em] mb-3">
                    — IMPACT &amp; OUTCOME
                  </div>

                  {/* Massive Stat Number */}
                  <div className="font-display text-6xl md:text-7xl lg:text-8xl text-forest-deep leading-none tracking-tight mb-3">
                    {st.stat}
                  </div>

                  {/* Crisp Stat Label */}
                  <div className="font-mono text-xs md:text-sm uppercase tracking-widest text-terracotta font-medium max-w-[220px] leading-relaxed">
                    {st.statLabel}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ── MINIMAL SLEEK BOTTOM NAV ──────────────────────────────────── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
          <div className="flex items-center gap-1.5 bg-cream/85 backdrop-blur-md px-4 py-2 rounded-full border border-forest-deep/10 shadow-sm">
            {STAGES.map((st, idx) => {
              const active = idx === stage;
              return (
                <button
                  key={st.id}
                  onClick={() => goToStage(idx as StageIndex)}
                  aria-label={`Go to ${st.tag} section`}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none group"
                >
                  <span
                    className={`h-2 rounded-full transition-all duration-300 ${
                      active
                        ? "w-5 bg-terracotta ring-4 ring-terracotta/20"
                        : "w-2 bg-forest-deep/30 group-hover:bg-forest-deep/60"
                    }`}
                  />
                  <span
                    className={`label-mono tracking-[0.18em] transition-colors duration-300 ${
                      active
                        ? "text-forest-deep font-semibold"
                        : "text-forest-deep/40 group-hover:text-forest-deep/70"
                    }`}
                  >
                    {st.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── SCROLL CUE (visible at stage 0) ───────────────────────────── */}
        <div
          className="absolute bottom-10 right-8 md:right-12 z-30 hidden md:flex items-center gap-3 pointer-events-none transition-opacity duration-500"
          style={{ opacity: stage === 0 ? 0.6 : 0 }}
          aria-hidden="true"
        >
          <span className="label-mono text-forest-deep/60 tracking-[0.2em] text-[10px]">
            SCROLL TO GROW
          </span>
          <span className="w-8 h-px bg-forest-deep/40 block animate-pulse" />
        </div>

      </div>
    </section>
  );
}
