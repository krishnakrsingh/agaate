import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
  videoLoaded: boolean;
  onWipeStart?: () => void;
}

export default function LoadingScreen({
  onComplete,
  videoLoaded,
  onWipeStart,
}: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
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
    if (!containerRef.current || !logoRef.current || !wipeRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => onCompleteRef.current(),
        delay: 0.05,
      });
      tlRef.current = tl;

      // 1. Logo floats up smoothly at locked 60 FPS
      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        force3D: true,
      })
        // 2. Logo shrinks out smoothly
        .to(
          logoRef.current,
          {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: "power3.in",
            force3D: true,
          },
          "-=0.1",
        )
        // Pause point: Wait here if the hero video is not yet loaded
        .add(() => {
          if (!videoLoadedRef.current) {
            tl.pause();
          }
        })
        // Hardware-accelerated circular clip-path transition (GPU composited, zero layout thrashing)
        .to(
          wipeRef.current,
          {
            clipPath: "circle(0% at 50% 50%)",
            duration: 1.1,
            ease: "power3.inOut",
            onStart: () => {
              onWipeStartRef.current?.();
            },
          },
          "-=0.15",
        )
        .set(containerRef.current, { pointerEvents: "none" });
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
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        pointerEvents: "auto",
      }}
    >
      {/* GPU-composited Iris Wipe Overlay */}
      <div
        ref={wipeRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "#f4f8f5",
          clipPath: "circle(150% at 50% 50%)",
          willChange: "clip-path",
          pointerEvents: "none",
        }}
      />

      {/* Logo optimized with inline initial transform so 0 layout shift or jank occurs */}
      <img
        ref={logoRef}
        src="/logo.png"
        alt="Agaate"
        decoding="async"
        fetchPriority="high"
        style={{
          position: "relative",
          zIndex: 1,
          width: "clamp(160px, 20vw, 260px)",
          height: "auto",
          objectFit: "contain",
          userSelect: "none",
          pointerEvents: "none",
          opacity: 0,
          transform: "translate3d(0, 35px, 0) scale(0.85)",
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
}
