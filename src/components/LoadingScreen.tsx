import { useEffect, useRef } from 'react';
import gsap from 'gsap';
interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !logoRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete, delay: 0.05 });

      // 1. Logo floats up smoothly at locked 60 FPS
      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.1,
        ease: 'power3.out',
        force3D: true,
      })
      // 2. Logo shrinks out smoothly
      .to(logoRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.in',
        force3D: true,
      }, "-=0.15")
      .to(containerRef.current, {
        clipPath: 'circle(0% at 50% 50%)',
        duration: 0.9,
        ease: 'expo.inOut',
        force3D: true,
      }, "-=0.5")
      .set(containerRef.current, { pointerEvents: 'none' });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f4f8f5',
        clipPath: 'circle(150% at 50% 50%)',
        willChange: 'clip-path',
        transform: 'translateZ(0)',
      }}
    >
      {/* Logo optimized with inline initial transform so 0 layout shift or jank occurs */}
      <img
        ref={logoRef}
        src="/logo.png"
        alt="Agaate"
        decoding="async"
        fetchPriority="high"
        style={{
          width: 'clamp(160px, 20vw, 260px)',
          height: 'auto',
          objectFit: 'contain',
          userSelect: 'none',
          pointerEvents: 'none',
          opacity: 0,
          transform: 'translate3d(0, 35px, 0) scale(0.85)',
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
}
