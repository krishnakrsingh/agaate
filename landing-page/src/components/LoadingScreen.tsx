import { useEffect, useRef } from 'react';
import gsap from 'gsap';
interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(logoRef.current, { opacity: 0, y: 40, scale: 0.8 });
      gsap.set(containerRef.current, { clipPath: 'circle(150% at 50% 50%)' });

      const tl = gsap.timeline({ onComplete });

      // 1. Logo floats up elegantly
      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
      })
      // 2. The Surprise: Logo shrinks continuously without stopping and no rotation
      .to(logoRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.in',
      }, "-=0.2") // Overlaps with the previous animation to prevent a dead stop
      .to(containerRef.current, {
        clipPath: 'circle(0% at 50% 50%)',
        duration: 1.0,
        ease: 'expo.inOut',
      }, "-=0.6")
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
        gap: '52px',
        // Lightest whisper of a green tint — almost pure white
        background: '#f4f8f5',
      }}
    >
      {/* Logo — darkened so it reads cleanly on the near-white bg */}
      <img
        ref={logoRef}
        src="/logo.svg"
        alt="Agaate"
        style={{
          width: 'clamp(160px, 20vw, 260px)',
          height: 'auto',
          userSelect: 'none',
          pointerEvents: 'none',
          // Push logo toward the brand's dark forest tone
          filter: 'brightness(0.18) saturate(1.5) hue-rotate(-5deg)',
        }}
      />

    </div>
  );
}
