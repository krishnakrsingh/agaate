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

export function DotGrid({ className }: { className: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute z-0 ${className}`}>
      <motion.div
        animate={{ y: [0, -10, 0], x: [0, 6, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 25 }, (_, i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-forest-deep"
              animate={{ opacity: [0.15, 0.6, 0.15], scale: [1, 1.5, 1] }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (i % 5) * 0.4,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function Shimmer({ className }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-forest/10 to-transparent ${
        className ?? ""
      }`}
      animate={{ x: ["-150%", "380%"] }}
      transition={{ duration: 3.6, repeat: Infinity, ease: "linear", repeatDelay: 1.6 }}
    />
  );
}
