import { useEffect, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import { Play, ArrowClockwise } from "@phosphor-icons/react";
import { AnimatedHeadline, EASE, Reveal, SectionHeader } from "@/components/common/motion";

type NodeInfo = {
  label: string;
  type: string;
  status: "Active" | "Standby";
  battery: number;
  moisture: number;
  ec: number;
  temp: number;
  x: number;
  y: number;
};

const HUB = { x: 400, y: 255 };

const NETWORK_NODES: NodeInfo[] = [
  {
    label: "Node-04 (West Block)",
    type: "IoT Soil Probe",
    status: "Active",
    battery: 92,
    moisture: 38,
    ec: 1.82,
    temp: 28.4,
    x: 150,
    y: 340,
  },
  {
    label: "Node-07 (North Nursery)",
    type: "Weather + Soil Combo",
    status: "Active",
    battery: 85,
    moisture: 42,
    ec: 1.65,
    temp: 26.1,
    x: 230,
    y: 140,
  },
  {
    label: "Node-02 (East Polyhouse)",
    type: "Climate Node",
    status: "Standby",
    battery: 98,
    moisture: 31,
    ec: 2.1,
    temp: 31.2,
    x: 560,
    y: 130,
  },
  {
    label: "Node-09 (South Field)",
    type: "IoT Soil Probe",
    status: "Active",
    battery: 78,
    moisture: 45,
    ec: 1.58,
    temp: 27.7,
    x: 630,
    y: 380,
  },
];

const PLOTS = [
  { label: "NORTH NURSERY", x: 60, y: 60, w: 320, h: 165 },
  { label: "EAST POLYHOUSE", x: 420, y: 60, w: 320, h: 165 },
  { label: "WEST BLOCK · TOMATO", x: 60, y: 265, w: 320, h: 185 },
  { label: "SOUTH FIELD · CHILLI", x: 420, y: 265, w: 320, h: 185 },
];

const FLIGHT_PATH = "M 60 100 L 740 100 L 740 200 L 60 200 L 60 300 L 740 300 L 740 400 L 60 400";

const PATROL_PATH =
  "M 400 60 C 560 60 680 140 640 240 C 610 320 500 380 400 380 C 290 380 190 330 170 240 C 150 140 260 60 400 60 Z";

const PATROL_START = { x: 400, y: 60 };

type FieldNetworkSectionProps = {
  nodeActive: string;
  setNodeActive: (label: string) => void;
  isPlayingFlight: boolean;
  flightProgress: number;
  runDroneFlight: () => void;
};

export function FieldNetworkSection({
  nodeActive,
  setNodeActive,
  isPlayingFlight,
  flightProgress,
  runDroneFlight,
}: FieldNetworkSectionProps) {
  const activeNode = NETWORK_NODES.find((n) => n.label === nodeActive) ?? NETWORK_NODES[0];
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-12">
      <SectionHeader
        align="center"
        eyebrow="Field network · live"
        title={
          <AnimatedHeadline
            as="h2"
            text="Sensors, Drones, and AI Working on Your Farm"
            highlight={(w) => w === "AI"}
            className="font-serif text-4xl font-bold tracking-tight text-forest-deep md:text-5xl"
          />
        }
        description="See more, act earlier, waste less. Your farm, fully visible — anytime, anywhere."
      />
      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <Reveal variant="scale-up" className="lg:col-span-7">
          <FieldMap
            isPlayingFlight={isPlayingFlight}
            flightProgress={flightProgress}
            runDroneFlight={runDroneFlight}
          />
        </Reveal>
        <Reveal variant="fade-left" className="lg:col-span-5">
          <NodePanel activeNode={activeNode} setNodeActive={setNodeActive} />
        </Reveal>
      </div>
    </section>
  );
}

function FieldMap({
  isPlayingFlight,
  flightProgress,
  runDroneFlight,
}: {
  isPlayingFlight: boolean;
  flightProgress: number;
  runDroneFlight: () => void;
}) {
  const droneX = useMotionValue(PATROL_START.x);
  const droneY = useMotionValue(PATROL_START.y);
  const patrolProgress = useRef(0);
  const flying = useRef(false);
  const patrolPathRef = useRef<SVGPathElement | null>(null);
  const flightPathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    flying.current = isPlayingFlight;
  }, [isPlayingFlight]);

  useEffect(() => {
    const el = flightPathRef.current;
    if (!el || !isPlayingFlight) return;
    const pt = el.getPointAtLength((flightProgress / 100) * el.getTotalLength());
    droneX.set(pt.x);
    droneY.set(pt.y);
  }, [flightProgress, isPlayingFlight, droneX, droneY]);

  useAnimationFrame((_, delta) => {
    const el = patrolPathRef.current;
    if (!el || flying.current) return;
    patrolProgress.current += delta * 0.025;
    const pt = el.getPointAtLength(patrolProgress.current % el.getTotalLength());
    droneX.set(pt.x);
    droneY.set(pt.y);
  });

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-bone p-4 shadow-sm sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-forest)_0.9px,transparent_0.9px)] [background-size:16px_16px] opacity-10" />
      <div className="pointer-events-none absolute inset-x-0 h-px animate-radar-scan bg-gradient-to-r from-transparent via-moss/50 to-transparent" />
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-forest/50">
          <span>Field network · Kukrola</span>
          <span className="inline-flex items-center gap-1.5 text-forest">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-forest" />
            </span>
            {isPlayingFlight ? "Drone scan live" : "Live"}
          </span>
        </div>
        <svg viewBox="0 0 800 500" className="h-auto w-full">
          {PLOTS.map((p) => (
            <g key={p.label}>
              <rect
                x={p.x}
                y={p.y}
                width={p.w}
                height={p.h}
                rx="18"
                fill="var(--color-cream)"
                stroke="var(--color-border)"
              />
              <text
                x={p.x + p.w / 2}
                y={p.y + p.h / 2}
                textAnchor="middle"
                fill="var(--color-forest)"
                opacity="0.45"
                fontFamily="var(--font-mono)"
                fontSize="11"
                fontWeight="700"
                letterSpacing="0.18em"
              >
                {p.label}
              </text>
            </g>
          ))}
          <circle cx={HUB.x} cy={HUB.y} r="26" fill="var(--color-forest-deep)" opacity="0.08" />
          <circle cx={HUB.x} cy={HUB.y} r="14" fill="var(--color-forest-deep)" />
          <motion.circle
            cx={HUB.x}
            cy={HUB.y}
            r="14"
            fill="none"
            stroke="var(--color-forest)"
            strokeWidth="2"
            animate={{ scale: [1, 2.6], opacity: [0.8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          />
          <text
            x={HUB.x}
            y={HUB.y + 44}
            textAnchor="middle"
            fill="var(--color-forest)"
            opacity="0.7"
            fontFamily="var(--font-mono)"
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.2em"
          >
            FARM HUB
          </text>
          {NETWORK_NODES.map((n) => (
            <g key={`link-${n.label}`}>
              <path
                d={`M ${n.x} ${n.y} L ${HUB.x} ${HUB.y}`}
                fill="none"
                stroke="var(--color-forest)"
                strokeWidth="1.5"
                strokeDasharray="4 8"
                opacity="0.3"
              />
              <motion.path
                d={`M ${n.x} ${n.y} L ${HUB.x} ${HUB.y}`}
                fill="none"
                stroke="var(--color-moss)"
                strokeWidth="1"
                strokeDasharray="10 14"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: EASE }}
              />
              <circle r="2.5" fill="var(--color-terracotta)">
                <animateMotion
                  dur={`${3 + (n.x % 3)}s`}
                  repeatCount="indefinite"
                  path={`M ${n.x} ${n.y} L ${HUB.x} ${HUB.y}`}
                />
              </circle>
            </g>
          ))}
          <path
            ref={patrolPathRef}
            d={PATROL_PATH}
            fill="none"
            stroke="var(--color-moss)"
            strokeWidth="1"
            strokeDasharray="3 7"
            opacity="0.35"
          />
          <path
            ref={flightPathRef}
            d={FLIGHT_PATH}
            fill="none"
            stroke="var(--color-terracotta)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            opacity="0.35"
          />
          <motion.path
            d={FLIGHT_PATH}
            fill="none"
            stroke="var(--color-terracotta)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isPlayingFlight ? 1 : 0 }}
            transition={{ duration: 3, ease: EASE }}
          />
          {NETWORK_NODES.map((n) => (
            <g key={n.label}>
              <motion.circle
                cx={n.x}
                cy={n.y}
                r="9"
                fill="none"
                stroke={n.status === "Active" ? "var(--color-moss)" : "var(--color-terracotta)"}
                strokeWidth="1.5"
                animate={{ scale: [1, 2.2], opacity: [0.9, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              />
              <circle
                cx={n.x}
                cy={n.y}
                r="7"
                fill={n.status === "Active" ? "var(--color-forest)" : "var(--color-terracotta)"}
                stroke="var(--color-cream)"
                strokeWidth="2"
              />
              <text
                x={n.x}
                y={n.y - 16}
                textAnchor="middle"
                fill="var(--color-forest)"
                opacity="0.8"
                fontFamily="var(--font-mono)"
                fontSize="10"
                fontWeight="700"
              >
                {n.label}
              </text>
            </g>
          ))}
          <DroneSprite x={droneX} y={droneY} />
        </svg>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-forest/55">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-forest" /> Active node
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-terracotta" /> Standby
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-moss" /> Drone patrol
            </span>
          </div>
          <button
            type="button"
            onClick={runDroneFlight}
            disabled={isPlayingFlight}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-jet text-[10px] font-bold uppercase tracking-[0.16em] text-cream shadow-md transition-colors ${
              isPlayingFlight
                ? "cursor-not-allowed bg-forest/40 text-cream/70"
                : "bg-forest-deep hover:bg-forest"
            }`}
          >
            {isPlayingFlight ? (
              <>
                <ArrowClockwise className="h-3.5 w-3.5 animate-spin" /> Scanning… {flightProgress}%
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-cream" /> Launch scan pattern
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function DroneSprite({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
  return (
    <motion.g style={{ x, y }}>
      <motion.circle
        r="14"
        fill="var(--color-moss)"
        opacity="0.25"
        animate={{ scale: [1, 1.5], opacity: [0.25, 0.05] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle r="8" fill="var(--color-forest-deep)" stroke="var(--color-cream)" strokeWidth="2" />
      <circle cx="-7" cy="-7" r="2" fill="var(--color-cream)" opacity="0.7" />
      <circle cx="7" cy="-7" r="2" fill="var(--color-cream)" opacity="0.7" />
      <circle cx="-7" cy="7" r="2" fill="var(--color-cream)" opacity="0.7" />
      <circle cx="7" cy="7" r="2" fill="var(--color-cream)" opacity="0.7" />
    </motion.g>
  );
}

function NodePanel({
  activeNode,
  setNodeActive,
}: {
  activeNode: NodeInfo;
  setNodeActive: (label: string) => void;
}) {
  return (
    <div className="flex h-full flex-col gap-6 rounded-[2.5rem] border border-border bg-bone p-6 shadow-sm lg:p-8">
      <div className="flex items-center justify-between">
        <span className="font-jet text-[10px] font-bold uppercase tracking-[0.18em] text-terracotta">
          Live node selector
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-forest">
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-forest opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-forest" />
          </span>
          Streaming
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {NETWORK_NODES.map((n) => {
          const active = n.label === activeNode.label;
          return (
            <button
              key={n.label}
              type="button"
              onClick={() => setNodeActive(n.label)}
              className={`relative rounded-full px-3.5 py-1.5 font-mono text-[10px] font-bold transition-colors ${
                active ? "text-cream" : "border border-border text-forest/60 hover:text-forest"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="node-pill"
                  className="absolute inset-0 rounded-full bg-forest"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{n.label.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.label}
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-serif text-2xl font-bold text-forest-deep md:text-3xl">
                {activeNode.label}
              </h3>
              <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-forest/45">
                {activeNode.type}
              </p>
            </div>
            <span
              className={`rounded-full px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider ${
                activeNode.status === "Active"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {activeNode.status}
            </span>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            {[
              {
                label: "Soil moisture",
                value: `${activeNode.moisture}%`,
                accent: "text-forest-deep",
              },
              { label: "EC", value: `${activeNode.ec} mS/cm`, accent: "text-moss" },
              { label: "Soil temp", value: `${activeNode.temp}°C`, accent: "text-terracotta" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card p-3">
                <span className="block font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-forest/40">
                  {s.label}
                </span>
                <span className={`mt-1 block font-mono text-sm font-bold ${s.accent}`}>
                  {s.value}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-1.5">
            <div className="flex items-center justify-between font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-forest/45">
              <span>Node battery</span>
              <span className="text-forest-deep">{activeNode.battery}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
              <motion.div
                className="h-full rounded-full bg-forest"
                initial={{ width: 0 }}
                animate={{ width: `${activeNode.battery}%` }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </div>
          </div>
          <div className="mt-6">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-forest/45">
              Block moisture · all nodes (%)
            </span>
            <div className="mt-3 flex h-24 items-end gap-2">
              {NETWORK_NODES.map((n, idx) => (
                <div key={n.label} className="flex flex-1 flex-col items-center gap-1.5">
                  <motion.div
                    className={`w-full origin-bottom rounded-t-md ${
                      n.label === activeNode.label
                        ? "bg-gradient-to-t from-forest-deep to-moss"
                        : "bg-forest/30"
                    }`}
                    style={{ height: `${n.moisture * 1.8}px` }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.06 * idx }}
                  />
                  <span className="font-mono text-[8px] font-bold text-forest/45">
                    {n.label.split(" ")[0].replace("Node-", "N")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <p className="mt-auto border-t border-border pt-4 font-mono text-[9px] leading-relaxed tracking-wide text-forest/50">
        IoT Soil & Weather Sensors — live moisture, temperature & nutrient data; real-time
        field-level weather tracking.
      </p>
    </div>
  );
}
