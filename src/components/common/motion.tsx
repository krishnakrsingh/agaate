import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export type RevealVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale-up"
  | "blur-in"
  | "flip"
  | "clip-up";

const revealVariants: Record<RevealVariant, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -48 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -64 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 64 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.88, y: 24 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
  },
  "blur-in": {
    hidden: { opacity: 0, filter: "blur(14px)", y: 20 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.9, ease: EASE },
    },
  },
  flip: {
    hidden: { opacity: 0, rotateX: -60, y: 32, transformPerspective: 900 },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      transformPerspective: 900,
      transition: { duration: 0.9, ease: EASE },
    },
  },
  "clip-up": {
    hidden: { clipPath: "inset(0 0 100% 0)", y: 24 },
    visible: {
      clipPath: "inset(0 0 0% 0)",
      y: 0,
      transition: { duration: 1, ease: EASE },
    },
  },
};

type RevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  style?: CSSProperties;
};

export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  className,
  once = true,
  amount = 0.2,
  style,
}: RevealProps) {
  const base = revealVariants[variant];
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: base.hidden,
        visible: {
          ...base.visible,
          transition: {
            ...(base.visible as any).transition,
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
};

export function Stagger({
  children,
  className,
  stagger = 0.09,
  delayChildren = 0.05,
  once = true,
  amount = 0.15,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  variant = "fade-up",
  style,
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  style?: CSSProperties;
}) {
  return (
    <motion.div className={className} style={style} variants={revealVariants[variant]}>
      {children}
    </motion.div>
  );
}

type CountUpProps = {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
  format?: (value: number) => string;
};

export function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.8,
  className,
  format,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  const formatted = format
    ? format(display)
    : `${prefix}${display.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`;

  return (
    <span ref={ref} className={className}>
      {formatted}
    </span>
  );
}

type MarqueeProps = {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
};

export function Marquee({
  children,
  duration = 28,
  reverse = false,
  className,
  itemClassName,
}: MarqueeProps) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className ?? ""}`}>
      <motion.div
        className="flex w-max items-center gap-6 pr-6"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function PageHero({ eyebrow, title, description, children, className }: PageHeroProps) {
  return (
    <div
      className={`relative overflow-hidden bg-bone border-b border-border pt-40 pb-24 px-6 lg:px-12 ${className ?? ""}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-forest)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-5" />
      <motion.div
        className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-moss) 0%, transparent 70%)" }}
        animate={{ y: [0, -24, 0], x: [0, 12, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-40 -left-24 h-[380px] w-[380px] rounded-full opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--color-terracotta) 0%, transparent 70%)",
        }}
        animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative z-10 mx-auto max-w-4xl text-left">
        <motion.span
          className="mb-4 block font-jet text-[11px] font-bold uppercase tracking-[0.22em] text-forest"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          className="mb-6 font-serif text-6xl font-bold leading-[1.05] tracking-tight text-forest-deep md:text-8xl"
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        >
          {title}
        </motion.h1>
        {description ? (
          <motion.p
            className="max-w-2xl text-xl font-normal leading-relaxed text-forest/80 md:text-2xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          >
            {description}
          </motion.p>
        ) : null}
        {children ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          >
            {children}
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  const alignCls = align === "center" ? "mx-auto text-center" : "text-left";
  return (
    <Reveal variant="fade-up" className={className}>
      <div className={`max-w-2xl ${alignCls}`}>
        {eyebrow ? (
          <p className="mb-3 font-jet text-[10px] font-semibold uppercase tracking-[0.18em] text-moss">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-serif text-4xl font-bold tracking-tight text-forest-deep md:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-base leading-relaxed text-forest/70 md:text-lg">{description}</p>
        ) : null}
      </div>
    </Reveal>
  );
}

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
};

export function TiltCard({ children, className, maxTilt = 10, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothX = useSpring(rotateX, { stiffness: 250, damping: 20 });
  const smoothY = useSpring(rotateY, { stiffness: 250, damping: 20 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * maxTilt);
    rotateX.set(-py * maxTilt);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX: smoothX, rotateY: smoothY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
      {glare ? (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.35) 0%, transparent 55%)",
          }}
          whileHover={{ opacity: 1 }}
        />
      ) : null}
    </motion.div>
  );
}

type ParallaxProps = {
  children: ReactNode;
  offset?: number;
  className?: string;
};

export function Parallax({ children, offset = 80, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

type AnimatedHeadlineProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  highlight?: (word: string) => boolean;
};

export function AnimatedHeadline({
  text,
  className,
  as = "h2",
  delay = 0,
  highlight,
}: AnimatedHeadlineProps) {
  const words = text.split(" ");
  const Tag = as;
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            className={`inline-block will-change-transform ${highlight && highlight(word) ? "italic text-terracotta" : ""}`}
            initial={{ y: "110%", opacity: 0, rotate: 4 }}
            whileInView={{ y: "0%", opacity: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.7, ease: EASE, delay: delay + i * 0.06 }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "a" | "button";
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  download?: boolean | string;
};

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  as = "button",
  href,
  onClick,
  target,
  rel,
  download,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const content = (
    <motion.div
      style={{ x: sx, y: sy }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );

  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className={className}>
      {as === "a" && href ? (
        <a href={href} target={target} rel={rel} download={download}>
          {content}
        </a>
      ) : (
        <button type="button" onClick={onClick}>
          {content}
        </button>
      )}
    </div>
  );
}
