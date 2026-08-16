import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Plant,
  TrendUp,
  HouseLine,
  Drop,
  UsersThree,
  Handshake,
  Package,
  Users,
  type Icon,
} from "@phosphor-icons/react";

type StatItem = {
  icon: Icon;
  value: string;
  label: string;
};

const row1: StatItem[] = [
  {
    icon: HouseLine,
    value: "15,00,000+",
    label: "ACRES ASSOCIATED",
  },
  {
    icon: Plant,
    value: "5,00,000+",
    label: "BIO PLANTS DELIVERED",
  },
  {
    icon: TrendUp,
    value: "₹10 Cr+",
    label: "ANNUAL VALUE MANAGED",
  },
  {
    icon: Handshake,
    value: "25+",
    label: "SUPPLY PARTNERS",
  },
];

const row2: StatItem[] = [
  {
    icon: Package,
    value: "500+",
    label: "AGRI-INPUT SKUS",
  },
  {
    icon: Drop,
    value: "200+",
    label: "SMART IRRIGATIONS",
  },
  {
    icon: UsersThree,
    value: "20+",
    label: "KISAAN SATHI EXPERTS",
  },
  {
    icon: Users,
    value: "2,000+",
    label: "PARIVAAR",
  },
];

function StatPill({ item }: { item: StatItem }) {
  const Icon = item.icon;

  return (
    <div className="group inline-flex shrink-0 cursor-grab active:cursor-grabbing select-none items-center rounded-[20px] border border-[#143d31]/10 bg-white p-1.5 shadow-[0_2px_8px_rgba(20,61,49,0.05)] transition-all duration-300 hover:border-[#143d31]/25 hover:shadow-[0_4px_14px_rgba(20,61,49,0.1)] hover:-translate-y-0.5">
      {/* Icon badge — subtle squircle */}
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] bg-[#143d31] text-white transition-all duration-300 group-hover:bg-[#0d2a21] group-hover:scale-105 shadow-xs">
        <Icon weight="fill" className="h-[21px] w-[21px]" />
      </span>

      {/* Metric value — high contrast dark text */}
      <span className="ml-3 font-sans text-[17px] font-extrabold tracking-tight text-[#0d2a21] tabular-nums leading-none whitespace-nowrap">
        {item.value}
      </span>

      {/* Divider line */}
      <span className="mx-3.5 h-4.5 w-[1.5px] bg-[#143d31]/20 shrink-0" />

      {/* Label — crisp, dark, highly readable */}
      <span className="mr-4 font-sans text-[12px] font-bold tracking-wider text-[#143d31]/90 whitespace-nowrap leading-none uppercase">
        {item.label}
      </span>
    </div>
  );
}

interface InteractiveMarqueeTrackProps {
  items: StatItem[];
  baseSpeed: number; // Pixels per frame (e.g., -0.9 for left, 0.9 for right)
  className?: string;
}

function InteractiveMarqueeTrack({
  items,
  baseSpeed,
  className = "",
}: InteractiveMarqueeTrackProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const lastXRef = useRef(0);
  const dragMomentumRef = useRef(0);

  // 6 repetitions ensure seamless infinite looping on any display width
  const repeatedItems = [...items, ...items, ...items, ...items, ...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onTick = (_time: number, deltaTime: number) => {
      if (!track) return;

      const singleLoopWidth = track.scrollWidth / 2;
      if (singleLoopWidth <= 0) return;

      const dtFactor = Math.min(deltaTime / 16.667, 2.5);

      if (!isDraggingRef.current) {
        // Slow down slightly on hover for easy reading
        const currentBase = isHoveredRef.current ? baseSpeed * 0.3 : baseSpeed;

        // Advance position by base speed + drag momentum
        xRef.current += (currentBase + dragMomentumRef.current) * dtFactor;

        // Smooth physics damping on drag release
        dragMomentumRef.current *= Math.pow(0.88, dtFactor);

        if (Math.abs(dragMomentumRef.current) < 0.01) dragMomentumRef.current = 0;
      }

      // Infinite seamless loop wrapping
      while (xRef.current <= -singleLoopWidth) {
        xRef.current += singleLoopWidth;
      }
      while (xRef.current > 0) {
        xRef.current -= singleLoopWidth;
      }

      track.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
    };

    gsap.ticker.add(onTick);

    return () => {
      gsap.ticker.remove(onTick);
    };
  }, [baseSpeed]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    lastXRef.current = e.clientX;
    dragMomentumRef.current = 0;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - lastXRef.current;
    xRef.current += delta;
    dragMomentumRef.current = delta * 1.1;
    lastXRef.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div
      className={`relative w-full cursor-grab select-none active:cursor-grabbing ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      <div
        ref={trackRef}
        className="flex w-max items-center gap-4 will-change-transform"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        {repeatedItems.map((stat, idx) => (
          <StatPill key={`${stat.label}-${idx}`} item={stat} />
        ))}
      </div>
    </div>
  );
}

export default function SectionStatsMarquee() {
  return (
    <section className="relative w-full overflow-hidden bg-[#fafbf7] py-6 md:py-8">
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 md:w-52 bg-gradient-to-r from-[#fafbf7] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 md:w-52 bg-gradient-to-l from-[#fafbf7] to-transparent" />

      {/* Row 1: slides left (baseSpeed < 0) */}
      <InteractiveMarqueeTrack items={row1} baseSpeed={-0.45} className="mb-3.5 px-3" />

      {/* Row 2: slides right (baseSpeed > 0) */}
      <InteractiveMarqueeTrack items={row2} baseSpeed={0.4} className="px-3" />
    </section>
  );
}
