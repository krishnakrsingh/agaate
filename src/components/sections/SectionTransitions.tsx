import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Linear interpolation helper
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/*
 * ArchUpTransition — opens a colored section (white → color).
 * As it scrolls into view: curve morphs from concave bowl `)` → convex dome `(`
 * Uses raw onUpdate so the d attribute is guaranteed to animate on every scroll tick.
 */
export function ArchUpTransition({
  topColor = "#FFFFFF",
  bottomColor = "#E3EBE6",
}: {
  topColor?: string;
  bottomColor?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (topColor === bottomColor) return;
    if (!pathRef.current || !containerRef.current) return;

    const buildPath = (progress: number) => {
      // progress 0 → `)` bowl  (yCorner=0,   yCtrl=35)
      // progress 1 → `(` dome  (yCorner=120, yCtrl=60)
      const yCorner = lerp(0, 120, progress);
      const yCtrl   = lerp(35, 60, progress);
      return `M0,${yCorner} C360,${yCtrl} 1080,${yCtrl} 1440,${yCorner} L1440,120 L0,120 Z`;
    };

    pathRef.current.setAttribute("d", buildPath(0));

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        if (pathRef.current) {
          pathRef.current.setAttribute("d", buildPath(self.progress));
        }
      },
    });

    return () => st.kill();
  }, [topColor, bottomColor]);

  if (topColor === bottomColor) return null;

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden leading-none relative z-10"
      style={{ backgroundColor: topColor }}
    >
      <svg
        className="relative block w-full h-16 sm:h-20 md:h-28 lg:h-36"
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M0,0 C360,70 1080,70 1440,0 L1440,120 L0,120 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
}

/*
 * ArchDownTransition — closes a colored section (color → white).
 * As it scrolls into view: curve morphs from convex dome `(` → concave bowl `)`
 */
export function ArchDownTransition({
  topColor = "#E3EBE6",
  bottomColor = "#FFFFFF",
}: {
  topColor?: string;
  bottomColor?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (topColor === bottomColor) return;
    if (!pathRef.current || !containerRef.current) return;

    const buildPath = (progress: number) => {
      // progress 0 → `(` dome  (yCorner=120, yCtrl=60)
      // progress 1 → `)` bowl  (yCorner=0,   yCtrl=35)
      const yCorner = lerp(120, 0,  progress);
      const yCtrl   = lerp(60,  35, progress);
      return `M0,${yCorner} C360,${yCtrl} 1080,${yCtrl} 1440,${yCorner} L1440,120 L0,120 Z`;
    };

    pathRef.current.setAttribute("d", buildPath(0));

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        if (pathRef.current) {
          pathRef.current.setAttribute("d", buildPath(self.progress));
        }
      },
    });

    return () => st.kill();
  }, [topColor, bottomColor]);

  if (topColor === bottomColor) return null;

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden leading-none relative z-10"
      style={{ backgroundColor: topColor }}
    >
      <svg
        className="relative block w-full h-16 sm:h-20 md:h-28 lg:h-36"
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M0,120 C360,0 1080,0 1440,120 L1440,120 L0,120 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
}

// Smart dispatcher
export function ArchTransition(props: {
  topColor?: string;
  bottomColor?: string;
  shape?: "up" | "down";
}) {
  const { topColor = "#FFFFFF", bottomColor = "#E3EBE6", shape } = props;
  if (topColor === bottomColor) return null;

  if (shape === "down" || (shape !== "up" && bottomColor === "#FFFFFF")) {
    return <ArchDownTransition topColor={topColor} bottomColor={bottomColor} />;
  }
  return <ArchUpTransition topColor={topColor} bottomColor={bottomColor} />;
}

export const WaveTransition = ArchTransition;
