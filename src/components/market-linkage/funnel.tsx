import { ArrowDown, Handshake, ShoppingCart, Sprout } from "lucide-react";
import {
  EASE,
  motion,
  Reveal,
  SectionHeader,
  Stagger,
  StaggerItem,
} from "@/components/common/motion";
import { Orb, PulseRing } from "./deco";
import { FLOW_NODES } from "./data";

const PATH_A = "M 262 155 C 278 90, 302 90, 318 155";
const PATH_B = "M 542 155 C 558 90, 582 90, 598 155";
const PATH_C = "M 598 165 C 582 240, 278 240, 262 165";

const NODE_ICONS = [Sprout, Handshake, ShoppingCart];

function TravelingDot({
  path,
  duration,
  delay = 0,
  reverse = false,
  color,
}: {
  path: string;
  duration: number;
  delay?: number;
  reverse?: boolean;
  color: string;
}) {
  return (
    <motion.circle
      r={5}
      fill={color}
      style={{ offsetPath: `path("${path}")` }}
      animate={{ offsetDistance: reverse ? ["100%", "0%"] : ["0%", "100%"] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function FlowDiagram() {
  return (
    <div className="relative hidden lg:block">
      <svg
        viewBox="0 0 860 320"
        className="h-auto w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d={PATH_A}
          stroke="var(--color-moss)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease: EASE }}
        />
        <motion.path
          d={PATH_B}
          stroke="var(--color-moss)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.35 }}
        />
        <motion.path
          d={PATH_C}
          stroke="var(--color-terracotta)"
          strokeWidth="2"
          strokeDasharray="2 6"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.7 }}
        />
        <g>
          <TravelingDot path={PATH_A} duration={2.6} color="var(--color-moss)" />
          <TravelingDot path={PATH_B} duration={2.6} delay={0.5} color="var(--color-moss)" />
          <TravelingDot path={PATH_C} duration={3.4} reverse color="var(--color-terracotta)" />
        </g>
        {[150, 430, 710].map((x, i) => (
          <g key={x}>
            <motion.circle
              cx={x}
              cy={160}
              r={14}
              fill={i === 1 ? "var(--color-terracotta)" : "var(--color-forest)"}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: i * 0.6 }}
            />
            <circle
              cx={x}
              cy={160}
              r={6}
              fill={i === 1 ? "var(--color-terracotta)" : "var(--color-forest)"}
            />
          </g>
        ))}
        {FLOW_NODES.map((n, i) => {
          const Icon = NODE_ICONS[i];
          return (
            <foreignObject key={n.label} x={150 + i * 280 - 115} y={84} width={230} height={150}>
              <div className="flex h-full w-full items-center justify-center">
                <motion.div
                  className="w-full rounded-2xl border border-border bg-cream p-4 text-center shadow-sm"
                  initial={{ opacity: 0, y: 26, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.8, ease: EASE, delay: i * 0.18 }}
                >
                  <Icon
                    className={`mx-auto mb-2 h-5 w-5 ${i === 1 ? "text-terracotta" : "text-forest"}`}
                    strokeWidth={2}
                  />
                  <p className="font-serif text-xl font-bold text-forest-deep">{n.label}</p>
                  <p className="mt-1 font-jet text-[9px] font-bold uppercase tracking-widest text-moss">
                    {n.sub}
                  </p>
                </motion.div>
              </div>
            </foreignObject>
          );
        })}
        <motion.text
          x={290}
          y={52}
          fill="var(--color-moss)"
          fontSize="9"
          fontFamily="var(--font-mono)"
          fontWeight="bold"
          letterSpacing="2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.9 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          QUALITY PRODUCE · MARKET-READY
        </motion.text>
        <motion.text
          x={560}
          y={292}
          fill="var(--color-terracotta)"
          fontSize="9"
          fontFamily="var(--font-mono)"
          fontWeight="bold"
          letterSpacing="2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.9 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          PAYOUT RETURNS · GUARANTEED FLOOR RATE
        </motion.text>
      </svg>
    </div>
  );
}

function MobileFlow() {
  return (
    <Stagger className="flex flex-col items-stretch gap-3 lg:hidden">
      {FLOW_NODES.map((n, i) => {
        const Icon = NODE_ICONS[i];
        return (
          <div key={n.label}>
            <StaggerItem variant="fade-up">
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <span
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${
                    i === 1 ? "bg-terracotta/10 text-terracotta" : "bg-forest/5 text-forest"
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <p className="font-serif text-lg font-bold text-forest-deep">{n.label}</p>
                  <p className="text-xs text-forest/70">{n.sub}</p>
                </div>
              </div>
            </StaggerItem>
            {i < FLOW_NODES.length - 1 ? (
              <div className="flex justify-center py-2">
                <motion.span
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-forest/15 bg-cream text-forest"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </motion.span>
              </div>
            ) : null}
          </div>
        );
      })}
    </Stagger>
  );
}

export function SeedToSaleFlow() {
  return (
    <section className="relative">
      <Orb from="terracotta" className="-right-24 -top-20 h-80 w-80 opacity-10" />
      <Orb from="moss" className="-left-24 bottom-0 h-72 w-72 opacity-10" />
      <PulseRing className="right-10 top-10 h-40 w-40" />
      <SectionHeader
        align="center"
        eyebrow="The seed-to-sale pipeline"
        title={
          <>
            From field to shelf, <span className="italic text-terracotta">zero middlemen.</span>
          </>
        }
        description="Tie-ups and direct market integration connect farmers straight to buyers — eliminating unnecessary middlemen so quality produce earns optimal value."
      />
      <Reveal variant="fade-up" delay={0.15} className="mt-14">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-bone/60 p-6 shadow-sm md:p-10">
          <FlowDiagram />
          <MobileFlow />
          <motion.div
            key="captions"
            className="mt-8 hidden grid-cols-1 gap-3 md:grid-cols-3 lg:grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.14, delayChildren: 0.5 } },
            }}
          >
            {FLOW_NODES.map((n) => (
              <motion.p
                key={n.label}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                }}
                className="rounded-xl border border-border bg-cream px-4 py-3 text-center font-jet text-[10px] font-medium leading-relaxed text-forest/70"
              >
                {n.desc}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}
