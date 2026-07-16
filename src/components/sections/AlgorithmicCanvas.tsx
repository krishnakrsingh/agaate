import { useEffect, useRef } from "react";

interface AlgorithmicCanvasProps {
  mode?: "rhizome" | "telemetry" | "canopy" | "particles";
  opacity?: number;
  className?: string;
}

/**
 * AlgorithmicCanvas — brings the 'Rhizomatic Telemetry' computational movement directly
 * into Agaate's section backgrounds with high-performance HTML5 Canvas animation.
 */
export function AlgorithmicCanvas({
  mode = "rhizome",
  opacity = 0.25,
  className = "",
}: AlgorithmicCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number | null = null;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.parentElement?.clientHeight || 600;

    const setupDimensions = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupDimensions();

    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setupDimensions();
      }, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Particle class for organic capillary/rhizome flow
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      angle: number;
      speed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.8 + 0.2;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.size = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.2;

        const colors =
          mode === "canopy"
            ? ["#2D6A4F", "#52B788", "#74C69D"]
            : mode === "telemetry"
            ? ["#52B788", "#D97757", "#95D5B2"]
            : ["#2D6A4F", "#D97757", "#40916C"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(time: number) {
        // Simplex/trig approximation for organic vector flow field
        const n =
          Math.sin(this.x * 0.003 + time * 0.001) +
          Math.cos(this.y * 0.003 + time * 0.001);
        this.angle += n * 0.05;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = this.alpha * opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particleCount = Math.min(Math.floor((width * height) / 14000), 55);
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Telemetry radar waves
    let radarRadius = 0;
    const maxRadar = Math.max(width, height) * 0.8;

    const render = (time: number) => {
      if (!isVisibleRef.current) {
        animationFrameId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Draw particle trails and connections
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(time);
        particles[i].draw(ctx);

        // Connect nearby rhizome nodes (optimized with squared distance)
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 14400) {
            const dist = Math.sqrt(distSq);
            ctx.globalAlpha = (1 - dist / 120) * opacity * 0.35;
            ctx.strokeStyle = particles[i].color;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // If telemetry mode, draw sweeping radar wave circles
      if (mode === "telemetry") {
        radarRadius += 1.2;
        if (radarRadius > maxRadar) radarRadius = 0;

        ctx.globalAlpha = (1 - radarRadius / maxRadar) * opacity * 0.4;
        ctx.strokeStyle = "#52B788";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, radarRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // IntersectionObserver to start/stop loop based on viewport visibility
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const wasVisible = isVisibleRef.current;
        isVisibleRef.current = entry.isIntersecting && entry.intersectionRatio > 0;

        if (isVisibleRef.current && !wasVisible && animationFrameId === null) {
          animationFrameId = requestAnimationFrame(render);
        } else if (!isVisibleRef.current && animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      },
      { threshold: 0 }
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [mode, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
