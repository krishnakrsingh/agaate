import { motion } from "@/components/common/motion";

export function Orb({
  from,
  className,
}: {
  from: "moss" | "terracotta" | "forest";
  className: string;
}) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{ background: `radial-gradient(circle, var(--color-${from}) 0%, transparent 70%)` }}
      animate={{ y: [0, -22, 0], x: [0, 14, 0], scale: [1, 1.12, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function PulseRing({ className }: { className: string }) {
  return (
    <motion.span
      aria-hidden
      className={`pointer-events-none absolute rounded-full border border-forest/15 ${className}`}
      animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeOut" }}
    />
  );
}
