import { MutableRefObject, useEffect, useRef } from "react";

export interface CropJourneyArtProps {
  progressRef: MutableRefObject<number>;
  inView?: boolean;
}

const mapRange = (val: number, min: number, max: number) =>
  Math.max(0, Math.min(1, (val - min) / (max - min)));

const smooth = (t: number) => t * t * (3 - 2 * t);

function setOpacity(el: SVGGElement | null, v: number) {
  if (!el) return;
  el.style.opacity = String(Math.max(0, Math.min(1, v)));
}

function setScale(el: SVGGElement | null, s: number, ox = 320, oy = 340) {
  if (!el) return;
  el.style.transformOrigin = `${ox}px ${oy}px`;
  el.style.transform = `scale(${s})`;
}

/** Isometric tomato with radial shading */
function Tomato3D({
  cx,
  cy,
  r = 16,
  tone = "a",
}: {
  cx: number;
  cy: number;
  r?: number;
  tone?: "a" | "b" | "c";
}) {
  const fill = tone === "b" ? "url(#cj-tomato-b)" : tone === "c" ? "url(#cj-tomato-c)" : "url(#cj-tomato-a)";
  return (
    <g>
      <ellipse cx={cx + 2} cy={cy + r * 0.85} rx={r * 0.85} ry={r * 0.28} fill="#1a1410" opacity="0.22" />
      <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.92} fill={fill} />
      <ellipse cx={cx - r * 0.28} cy={cy - r * 0.32} rx={r * 0.28} ry={r * 0.16} fill="#fff" opacity="0.35" />
      <path
        d={`M${cx} ${cy - r * 0.85}
           l${-r * 0.35} ${-r * 0.25} l${r * 0.35} ${r * 0.12}
           l${r * 0.35} ${-r * 0.12} Z`}
        fill="#2D5A27"
      />
      <circle cx={cx} cy={cy - r * 0.78} r={r * 0.12} fill="#1E3D1A" />
    </g>
  );
}

/** Curved leaf with lit top face + shadowed underside */
function Leaf3D({
  x,
  y,
  rot = 0,
  scale = 1,
  flip = false,
}: {
  x: number;
  y: number;
  rot?: number;
  scale?: number;
  flip?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${flip ? -scale : scale} ${scale})`}>
      {/* Shadow under leaf */}
      <ellipse cx="4" cy="6" rx="26" ry="10" fill="#0f1a0e" opacity="0.15" />
      {/* Underside (darker) */}
      <path
        d="M0 0 C8 -4 22 -8 32 0 C22 10 10 14 0 8 C-2 4 -2 2 0 0Z"
        fill="#1F4A1C"
      />
      {/* Top face */}
      <path
        d="M0 0 C8 -6 24 -12 34 -2 C24 6 10 10 0 6 C-1 3 -1 1 0 0Z"
        fill="url(#cj-leaf-lit)"
      />
      {/* Midrib */}
      <path d="M2 2 Q18 0 30 -1" stroke="#1A3D18" strokeWidth="1.2" fill="none" opacity="0.55" />
      {/* Side veins */}
      <path d="M10 1 Q14 -4 18 -2" stroke="#1A3D18" strokeWidth="0.7" fill="none" opacity="0.35" />
      <path d="M16 2 Q20 6 24 4" stroke="#1A3D18" strokeWidth="0.7" fill="none" opacity="0.3" />
      {/* Highlight edge */}
      <path d="M2 -1 Q16 -8 28 -3" stroke="#7CB86A" strokeWidth="1" fill="none" opacity="0.4" />
    </g>
  );
}

export default function CropJourneyArt({ progressRef, inView = true }: CropJourneyArtProps) {
  const soilRef = useRef<SVGGElement>(null);
  const seedRef = useRef<SVGGElement>(null);
  const sproutRef = useRef<SVGGElement>(null);
  const bedsRef = useRef<SVGGElement>(null);
  const plantRef = useRef<SVGGElement>(null);
  const foliageRef = useRef<SVGGElement>(null);
  const stakeRef = useRef<SVGGElement>(null);
  const netRef = useRef<SVGGElement>(null);
  const dripRef = useRef<SVGGElement>(null);
  const dropsRef = useRef<SVGGElement>(null);
  const flowersRef = useRef<SVGGElement>(null);
  const fruitRef = useRef<SVGGElement>(null);
  const crateRef = useRef<SVGGElement>(null);
  const swayRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let t0 = performance.now();

    const tick = (now: number) => {
      if (!inView && !reduce) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const p = reduce ? 0.82 : progressRef.current;
      const elapsed = (now - t0) / 1000;

      const s1 = smooth(mapRange(p, 0.0, 0.11));
      const s2 = smooth(mapRange(p, 0.11, 0.22));
      const s3 = smooth(mapRange(p, 0.22, 0.33));
      const s4 = smooth(mapRange(p, 0.33, 0.44));
      const s5 = smooth(mapRange(p, 0.44, 0.55));
      const s6 = smooth(mapRange(p, 0.55, 0.66));
      const s7 = smooth(mapRange(p, 0.66, 0.77));
      const s8 = smooth(mapRange(p, 0.77, 0.89));
      const s9 = smooth(mapRange(p, 0.89, 1.0));

      setOpacity(soilRef.current, 1);

      setOpacity(
        seedRef.current,
        s1 > 0.02 && s2 < 0.85 ? Math.sin(s1 * Math.PI) * (1 - s2 * 0.9) : 0,
      );
      if (seedRef.current) {
        seedRef.current.style.transform = `translate(0, ${(1 - s1) * 36}px)`;
      }

      setOpacity(
        sproutRef.current,
        s2 > 0.02 && s3 < 0.9 ? Math.min(1, s2 * 1.2) * (1 - s3 * 0.85) : 0,
      );
      setScale(sproutRef.current, 0.4 + s2 * 0.6, 320, 300);

      setOpacity(bedsRef.current, s3);
      setScale(bedsRef.current, 0.2 + s3 * 0.8, 320, 360);

      const plantOn = Math.max(s3, s4);
      setOpacity(plantRef.current, plantOn * (1 - s9 * 0.35));
      setScale(plantRef.current, 0.4 + plantOn * 0.6, 320, 350);
      setOpacity(foliageRef.current, s4 * (1 - s9 * 0.25));
      setOpacity(stakeRef.current, Math.max(s4, s7) * (1 - s9 * 0.2));

      const netRise = Math.sin(s5 * Math.PI);
      const netInWindow = p >= 0.44 && p < 0.58;
      setOpacity(netRef.current, netInWindow ? netRise * 0.9 : 0);

      setOpacity(dripRef.current, s6 > 0.05 ? Math.min(1, s6 * 1.4) * (1 - s9 * 0.3) : 0);
      if (dropsRef.current && !reduce && s6 > 0.1) {
        const fall = (elapsed * 1.15) % 1;
        dropsRef.current.style.transform = `translate(0, ${fall * 40}px)`;
        dropsRef.current.style.opacity = String(Math.sin(s6 * Math.PI) * (1 - fall * 0.75));
      } else {
        setOpacity(dropsRef.current, s6 > 0.1 && s6 < 0.98 ? Math.sin(s6 * Math.PI) : 0);
      }

      setOpacity(flowersRef.current, s7 * (1 - s8 * 0.7));
      setScale(flowersRef.current, 0.55 + s7 * 0.45, 320, 200);

      setOpacity(fruitRef.current, s8 * (1 - s9 * 0.85));
      setScale(fruitRef.current, 0.45 + s8 * 0.55, 320, 230);

      setOpacity(crateRef.current, s9);
      if (crateRef.current) {
        const slide = (1 - s9) * 90;
        crateRef.current.style.transform = `translate(${slide}px, ${-s9 * 6}px)`;
      }

      if (swayRef.current && !reduce && plantOn > 0.2) {
        const sway = Math.sin(elapsed * 1.35) * 1.6 * plantOn * (1 - s9 * 0.5);
        swayRef.current.style.transformOrigin = "320px 350px";
        swayRef.current.style.transform = `rotate(${sway}deg)`;
      }

      raf = requestAnimationFrame(tick);
    };

    if (reduce) {
      tick(performance.now());
      return;
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, progressRef]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg
        viewBox="0 0 640 480"
        className="w-full h-full max-h-[min(72vh,540px)] object-contain"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          {/* Soft ambient shadow */}
          <filter id="cj-soft-shadow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
            <feOffset dx="2" dy="6" result="off" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.28" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="cj-tiny-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="1" dy="3" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.22" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="cj-soil-top" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5C4A32" />
            <stop offset="50%" stopColor="#3B2F1B" />
            <stop offset="100%" stopColor="#2A2118" />
          </linearGradient>
          <linearGradient id="cj-soil-side" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2E2418" />
            <stop offset="100%" stopColor="#1A1510" />
          </linearGradient>
          <linearGradient id="cj-mulch" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2A2A24" />
            <stop offset="40%" stopColor="#14140f" />
            <stop offset="100%" stopColor="#0C0C0A" />
          </linearGradient>
          <linearGradient id="cj-leaf-lit" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6AAF50" />
            <stop offset="55%" stopColor="#3F7A35" />
            <stop offset="100%" stopColor="#2D5A27" />
          </linearGradient>
          <linearGradient id="cj-stem" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2A5226" />
            <stop offset="40%" stopColor="#4A8C3F" />
            <stop offset="100%" stopColor="#1E3D1A" />
          </linearGradient>
          <linearGradient id="cj-bamboo" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8A7A4A" />
            <stop offset="35%" stopColor="#D4C78A" />
            <stop offset="70%" stopColor="#C4B77D" />
            <stop offset="100%" stopColor="#6E6038" />
          </linearGradient>
          <linearGradient id="cj-wood-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4AE6E" />
            <stop offset="100%" stopColor="#A07840" />
          </linearGradient>
          <linearGradient id="cj-wood-side" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8B6B3A" />
            <stop offset="100%" stopColor="#5C4424" />
          </linearGradient>
          <linearGradient id="cj-wood-top" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#E0C08A" />
            <stop offset="100%" stopColor="#C49A5A" />
          </linearGradient>
          <radialGradient id="cj-seed" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#EED7A1" />
            <stop offset="55%" stopColor="#D2A96A" />
            <stop offset="100%" stopColor="#8B6B3A" />
          </radialGradient>
          <radialGradient id="cj-water" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#B8E8F8" />
            <stop offset="50%" stopColor="#5BC0EB" />
            <stop offset="100%" stopColor="#2A7A9A" />
          </radialGradient>
          <radialGradient id="cj-tomato-a" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FF6B5C" />
            <stop offset="45%" stopColor="#E8453C" />
            <stop offset="100%" stopColor="#8B1E18" />
          </radialGradient>
          <radialGradient id="cj-tomato-b" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FF8A7A" />
            <stop offset="45%" stopColor="#D94040" />
            <stop offset="100%" stopColor="#7A1812" />
          </radialGradient>
          <radialGradient id="cj-tomato-c" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#F06050" />
            <stop offset="45%" stopColor="#C83830" />
            <stop offset="100%" stopColor="#6B1510" />
          </radialGradient>
          <linearGradient id="cj-sky-wash" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8F0EA" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#E8F0EA" stopOpacity="0" />
          </linearGradient>
          <pattern id="cj-net-mesh" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M0 5 H10 M5 0 V10" stroke="#143d31" strokeWidth="0.5" opacity="0.25" />
          </pattern>
        </defs>

        {/* Ambient ground */}
        <ellipse cx="320" cy="420" rx="280" ry="36" fill="#143d31" opacity="0.07" />
        <rect x="0" y="0" width="640" height="200" fill="url(#cj-sky-wash)" />

        {/* === ISOMETRIC SOIL PLOT === */}
        <g ref={soilRef} filter="url(#cj-soft-shadow)">
          {/* Plot top (iso diamond-ish ellipse) */}
          <path
            d="M320 300 L460 355 L320 410 L180 355 Z"
            fill="url(#cj-soil-top)"
          />
          {/* Right face */}
          <path d="M460 355 L460 375 L320 430 L320 410 Z" fill="url(#cj-soil-side)" />
          {/* Left face */}
          <path d="M180 355 L180 375 L320 430 L320 410 Z" fill="#1F1812" />
          {/* Soil texture clods on top */}
          <ellipse cx="290" cy="350" rx="16" ry="8" fill="#2A2118" opacity="0.5" transform="skewX(-20)" />
          <ellipse cx="350" cy="365" rx="20" ry="9" fill="#4A3A28" opacity="0.35" transform="skewX(-15)" />
          <ellipse cx="310" cy="380" rx="12" ry="6" fill="#1A1510" opacity="0.45" />
          <ellipse cx="370" cy="345" rx="10" ry="5" fill="#5C4A32" opacity="0.4" />
        </g>

        {/* === 01 SEED (3D) === */}
        <g ref={seedRef} style={{ opacity: 0 }} filter="url(#cj-tiny-shadow)">
          <ellipse cx="322" cy="292" rx="12" ry="5" fill="#1a1410" opacity="0.25" />
          <ellipse cx="320" cy="275" rx="13" ry="20" fill="url(#cj-seed)" />
          <ellipse cx="315" cy="268" rx="4" ry="7" fill="#fff" opacity="0.25" />
          <path
            d="M320 294 C318 302 316 310 314 318"
            stroke="url(#cj-stem)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* === 02 SPROUT (3D) === */}
        <g ref={sproutRef} style={{ opacity: 0 }} filter="url(#cj-tiny-shadow)">
          <path
            d="M320 355 C316 320 324 295 320 270"
            stroke="url(#cj-stem)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <Leaf3D x={298} y={268} rot={-35} scale={0.55} />
          <Leaf3D x={342} y={268} rot={35} scale={0.55} flip />
          <ellipse cx="320" cy="255" rx="7" ry="11" fill="url(#cj-leaf-lit)" />
          <ellipse cx="318" cy="252" rx="2.5" ry="4" fill="#fff" opacity="0.2" />
        </g>

        {/* === 03 ISOMETRIC MULCH BEDS === */}
        <g ref={bedsRef} style={{ opacity: 0 }}>
          {[0, 1, 2].map((row) => {
            const oy = 318 + row * 28;
            return (
              <g key={row} filter="url(#cj-tiny-shadow)">
                {/* Raised bed — iso cylinder look */}
                <ellipse cx="320" cy={oy + 18} rx="195" ry="16" fill="#1A1510" />
                <path
                  d={`M125 ${oy} Q320 ${oy - 22} 515 ${oy} L515 ${oy + 18} Q320 ${oy + 40} 125 ${oy + 18} Z`}
                  fill="url(#cj-soil-top)"
                />
                <path
                  d={`M125 ${oy} Q320 ${oy - 22} 515 ${oy} Q320 ${oy + 4} 125 ${oy} Z`}
                  fill="url(#cj-mulch)"
                />
                {/* Highlight ridge on mulch */}
                <path
                  d={`M160 ${oy - 2} Q320 ${oy - 14} 480 ${oy - 2}`}
                  stroke="#3A3A32"
                  strokeWidth="1.5"
                  opacity="0.5"
                  fill="none"
                />
                {/* Seedling plugs */}
                {[-100, 0, 100].map((dx) =>
                  row === 1 && dx === 0 ? null : (
                    <g key={dx}>
                      <ellipse cx={320 + dx} cy={oy - 2} rx="8" ry="4" fill="#2A2118" />
                      <rect
                        x={320 + dx - 1.5}
                        y={oy - 14}
                        width="3"
                        height="12"
                        rx="1"
                        fill="url(#cj-stem)"
                      />
                      <ellipse cx={320 + dx - 5} cy={oy - 14} rx="6" ry="3" fill="#6AAF50" transform={`rotate(-20 ${320 + dx - 5} ${oy - 14})`} />
                      <ellipse cx={320 + dx + 5} cy={oy - 14} rx="6" ry="3" fill="#4A8C3F" transform={`rotate(20 ${320 + dx + 5} ${oy - 14})`} />
                    </g>
                  ),
                )}
              </g>
            );
          })}
        </g>

        {/* Sway: stakes + plant + foliage + flowers + fruit */}
        <g ref={swayRef}>
          {/* === BAMBOO STAKES (cylindrical) === */}
          <g ref={stakeRef} style={{ opacity: 0 }}>
            {[
              { x: 275, lean: -3 },
              { x: 365, lean: 3 },
            ].map(({ x, lean }) => (
              <g key={x} transform={`rotate(${lean} ${x} 350)`}>
                <rect x={x - 5} y="145" width="10" height="210" rx="3" fill="url(#cj-bamboo)" />
                {[190, 240, 290].map((ny) => (
                  <ellipse key={ny} cx={x} cy={ny} rx="6" ry="3" fill="#A09060" opacity="0.85" />
                ))}
                <rect x={x - 3} y="145" width="3" height="210" fill="#fff" opacity="0.15" />
              </g>
            ))}
            {/* Cross bar */}
            <rect x="275" y="155" width="90" height="7" rx="2" fill="url(#cj-bamboo)" transform="rotate(-2 320 158)" />
            {/* Twine */}
            <ellipse cx="290" cy="230" rx="10" ry="5" fill="#A68B5B" opacity="0.85" />
            <ellipse cx="350" cy="255" rx="10" ry="5" fill="#A68B5B" opacity="0.85" />
          </g>

          {/* === STEM === */}
          <g ref={plantRef} style={{ opacity: 0 }}>
            <path
              d="M320 355 C312 310 328 270 316 225 C310 195 324 170 320 145"
              stroke="url(#cj-stem)"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M320 355 C312 310 328 270 316 225"
              stroke="#7CB86A"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.35"
              transform="translate(-3,0)"
            />
            <ellipse cx="320" cy="355" rx="12" ry="8" fill="#2A5226" />
          </g>

          {/* === FOLIAGE === */}
          <g ref={foliageRef} style={{ opacity: 0 }}>
            <Leaf3D x={255} y={255} rot={-42} scale={1.05} />
            <Leaf3D x={385} y={245} rot={38} scale={1.1} flip />
            <Leaf3D x={245} y={205} rot={-58} scale={0.95} />
            <Leaf3D x={395} y={195} rot={52} scale={1} flip />
            <Leaf3D x={270} y={175} rot={-22} scale={0.88} />
            <Leaf3D x={370} y={168} rot={28} scale={0.9} flip />
            <Leaf3D x={295} y={148} rot={-12} scale={0.72} />
            <Leaf3D x={348} y={142} rot={14} scale={0.75} flip />
            <Leaf3D x={320} y={130} rot={5} scale={0.65} />
          </g>

          {/* === FLOWERS === */}
          <g ref={flowersRef} style={{ opacity: 0 }}>
            {[
              [288, 215],
              [352, 198],
              [308, 178],
              [338, 162],
            ].map(([x, y], i) => (
              <g key={i} transform={`translate(${x} ${y})`} filter="url(#cj-tiny-shadow)">
                {[0, 60, 120, 180, 240, 300].map((a) => (
                  <ellipse
                    key={a}
                    cx={Math.cos((a * Math.PI) / 180) * 8}
                    cy={Math.sin((a * Math.PI) / 180) * 8}
                    rx="4.5"
                    ry="8"
                    fill="#FFD54F"
                    stroke="#E8B820"
                    strokeWidth="0.4"
                    transform={`rotate(${a})`}
                  />
                ))}
                <circle r="4.5" fill="#5D4037" />
                <circle cx="-1" cy="-1" r="1.5" fill="#8D6E63" opacity="0.6" />
              </g>
            ))}
          </g>

          {/* === FRUIT === */}
          <g ref={fruitRef} style={{ opacity: 0 }}>
            <Tomato3D cx={292} cy={235} r={19} />
            <Tomato3D cx={355} cy={208} r={16} tone="b" />
            <Tomato3D cx={325} cy={268} r={17} tone="c" />
          </g>
        </g>

        {/* === 05 NET CLOCHE (3D hoop) === */}
        <g ref={netRef} style={{ opacity: 0 }}>
          <ellipse cx="320" cy="355" rx="110" ry="28" fill="#1a1410" opacity="0.12" />
          {/* Cover volume */}
          <path
            d="M210 355 Q210 175 320 145 Q430 175 430 355"
            fill="url(#cj-net-mesh)"
            opacity="0.55"
          />
          <path
            d="M210 355 Q210 175 320 145 Q430 175 430 355"
            fill="#F5F2EA"
            fillOpacity="0.22"
          />
          {/* Hoops */}
          {[0, 1, 2].map((i) => {
            const inset = i * 22;
            return (
              <path
                key={i}
                d={`M${220 + inset} 355 Q${220 + inset} ${185 + inset * 0.4} 320 ${155 + inset * 0.35} Q${420 - inset} ${185 + inset * 0.4} ${420 - inset} 355`}
                stroke="#7A7E78"
                strokeWidth={2.8 - i * 0.4}
                fill="none"
                strokeLinecap="round"
              />
            );
          })}
          <path d="M220 152 L420 152" stroke="#8A8E86" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
        </g>

        {/* === 06 DRIP (tubular) === */}
        <g ref={dripRef} style={{ opacity: 0 }} filter="url(#cj-tiny-shadow)">
          <path
            d="M145 325 Q240 308 320 315 Q400 322 495 308"
            stroke="#1A1A1A"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M145 323 Q240 306 320 313 Q400 320 495 306"
            stroke="#4A4A4A"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
          {[230, 320, 410].map((x) => (
            <g key={x}>
              <ellipse cx={x} cy="314" rx="7" ry="5" fill="#C5A94E" />
              <ellipse cx={x - 1} cy="312" rx="2.5" ry="1.8" fill="#E8D070" opacity="0.5" />
              <rect x={x - 2.5} y="316" width="5" height="12" rx="1.5" fill="#9AA3AB" />
            </g>
          ))}
        </g>
        <g ref={dropsRef} style={{ opacity: 0 }}>
          {[230, 320, 410].map((x, i) => (
            <g key={x} transform={`translate(0, ${i * 10})`}>
              <ellipse cx={x} cy="338" rx="5" ry="7" fill="url(#cj-water)" />
              <ellipse cx={x - 1.5} cy="335" rx="1.5" ry="2" fill="#fff" opacity="0.45" />
            </g>
          ))}
        </g>

        {/* === 09 ISOMETRIC CRATE === */}
        <g ref={crateRef} style={{ opacity: 0 }} filter="url(#cj-soft-shadow)">
          {/* Floor shadow */}
          <ellipse cx="470" cy="400" rx="95" ry="18" fill="#1a1410" opacity="0.2" />
          {/* Iso crate: front, right, top rim */}
          {/* Front face */}
          <path d="M390 320 L520 320 L520 395 L390 395 Z" fill="url(#cj-wood-front)" />
          {/* Right face (depth) */}
          <path d="M520 320 L555 300 L555 375 L520 395 Z" fill="url(#cj-wood-side)" />
          {/* Top opening (inner) */}
          <path d="M390 320 L425 300 L555 300 L520 320 Z" fill="url(#cj-wood-top)" />
          <path d="M405 318 L430 305 L540 305 L515 318 Z" fill="#3B2F1B" opacity="0.35" />
          {/* Plank lines front */}
          {[335, 355, 375].map((y) => (
            <line key={y} x1="395" y1={y} x2="515" y2={y} stroke="#8B6B3A" strokeWidth="1.2" opacity="0.55" />
          ))}
          {/* Corner posts */}
          <rect x="390" y="318" width="8" height="78" fill="#6E5028" />
          <rect x="512" y="318" width="8" height="78" fill="#6E5028" />
          <path d="M520 320 L528 315 L528 390 L520 395 Z" fill="#5C4424" />
          {/* Tomatoes in crate */}
          <Tomato3D cx={430} cy={345} r={15} />
          <Tomato3D cx={465} cy={338} r={14} tone="b" />
          <Tomato3D cx={498} cy={348} r={15} />
          <Tomato3D cx={445} cy={368} r={13} tone="c" />
          <Tomato3D cx={480} cy={365} r={14} tone="b" />
        </g>
      </svg>
    </div>
  );
}
