import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
  videoLoaded: boolean;
  onWipeStart?: () => void;
}

export default function LoadingScreen({ onComplete, videoLoaded, onWipeStart }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Keep refs of callbacks and state to prevent stale closures and timeline resets
  const videoLoadedRef = useRef(videoLoaded);
  const onCompleteRef = useRef(onComplete);
  const onWipeStartRef = useRef(onWipeStart);

  useEffect(() => {
    videoLoadedRef.current = videoLoaded;
  }, [videoLoaded]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    onWipeStartRef.current = onWipeStart;
  }, [onWipeStart]);

  useEffect(() => {
    if (!containerRef.current || !logoRef.current || !circleRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        onComplete: () => onCompleteRef.current(), 
        delay: 0.05 
      });
      tlRef.current = tl;

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
      // Pause point: Wait here if the hero video is not yet loaded
      .add(() => {
        if (!videoLoadedRef.current) {
          tl.pause();
        }
      })
      // High-performance circular mask transition (animates SVG circle radius, avoiding CPU-bound clip-path repaints)
      .to(circleRef.current, {
        attr: { r: 2500 },
        duration: 1.3,
        ease: 'power4.inOut',
        onStart: () => {
          onWipeStartRef.current?.();
        }
      }, "-=0.35")
      .set(containerRef.current, { pointerEvents: 'none' });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Resume timeline once the video has loaded
  useEffect(() => {
    if (videoLoaded && tlRef.current) {
      tlRef.current.play();
    }
  }, [videoLoaded]);

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
        background: 'transparent',
        pointerEvents: 'auto',
      }}
    >
      {/* SVG Iris Mask Background - maintains solid background at start and cuts a circular hole dynamically */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <mask id="iris-mask">
            {/* The white rect keeps the loader background visible */}
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {/* The black circle cuts a transparent hole in the background */}
            <circle ref={circleRef} cx="50%" cy="50%" r="0" fill="black" />
          </mask>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="#f4f8f5" mask="url(#iris-mask)" />
      </svg>

      {/* Logo optimized with inline initial transform so 0 layout shift or jank occurs */}
      <img
        ref={logoRef}
        src="/logo.png"
        alt="Agaate"
        decoding="async"
        fetchPriority="high"
        style={{
          position: 'relative',
          zIndex: 1,
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
