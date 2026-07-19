import { useEffect, useRef, memo } from "react";
import gsap from "gsap";

interface HeroProps {
  onVideoLoaded?: () => void;
  startAnimation?: boolean;
  onAnimationComplete?: () => void;
}

export default memo(function Section1({
  onVideoLoaded,
  startAnimation = false,
  onAnimationComplete,
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  // Keep latest callback ref to avoid re-running effects or re-binding listeners
  const onVideoLoadedRef = useRef(onVideoLoaded);
  const onAnimationCompleteRef = useRef(onAnimationComplete);

  useEffect(() => {
    onVideoLoadedRef.current = onVideoLoaded;
  }, [onVideoLoaded]);

  useEffect(() => {
    onAnimationCompleteRef.current = onAnimationComplete;
  }, [onAnimationComplete]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let notified = false;
    const handleVideoLoaded = () => {
      if (notified) return;
      notified = true;
      onVideoLoadedRef.current?.();
    };

    // Check readystate to see if it is already loaded/playable
    if (video.readyState >= 3) {
      handleVideoLoaded();
    } else {
      video.addEventListener("canplay", handleVideoLoaded);
      video.addEventListener("canplaythrough", handleVideoLoaded);
    }

    return () => {
      video.removeEventListener("canplay", handleVideoLoaded);
      video.removeEventListener("canplaythrough", handleVideoLoaded);
    };
  }, []); // Run only once on mount

  // Pause video when hero section scrolls out of view to save CPU/GPU decode memory
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      },
      { threshold: 0.01 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startAnimation || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const ctx = gsap.context(() => {
      // Start reveal immediately (loader circular wipe has started opening)
      const tl = gsap.timeline({
        delay: 0,
        onComplete: () => {
          onAnimationCompleteRef.current?.();
        },
      });

      // 1. Cinematic morph: video starts full-screen and contracts into the rounded padded card as the loader clears
      tl.fromTo(
        sectionRef.current,
        { padding: "0px" },
        {
          padding: window.innerWidth < 768 ? "8px" : "10px",
          duration: 1.6,
          ease: "power4.out",
          clearProps: "padding",
        },
      )
        .fromTo(
          containerRef.current,
          { borderRadius: "0px" },
          {
            borderRadius: "16px",
            duration: 1.6,
            ease: "power4.out",
            clearProps: "borderRadius,transform,willChange",
          },
          "<",
        )
        .fromTo(
          curtainRef.current,
          { opacity: 0.75, display: "block" },
          {
            opacity: 0,
            duration: 1.6,
            ease: "power4.out",
            onComplete: () => {
              if (curtainRef.current) curtainRef.current.style.display = "none";
            },
          },
          "<",
        )
        // 2. Text floats in (pure transform & opacity, avoiding heavy filter: blur shaders)
        .fromTo(
          h1Ref.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", clearProps: "transform" },
          "-=0.6",
        )
        .fromTo(
          pRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", clearProps: "transform" },
          "-=0.8",
        )
        .fromTo(
          btnRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", clearProps: "transform" },
          "-=0.8",
        );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [startAnimation]);

  return (
    <section ref={sectionRef} id="hero" className="relative w-full h-[100dvh] p-2 md:p-2.5">
      <div ref={containerRef} className="relative w-full h-full overflow-hidden rounded-[16px]">
        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 z-0 w-full h-full object-cover"
          src="/hero1.mp4"
          preload="auto"
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
        />

        {/* Cinematic reveal curtain (hardware-composited opacity instead of heavy CSS filter shader on video container) */}
        <div
          ref={curtainRef}
          className="absolute inset-0 z-[1] bg-black pointer-events-none opacity-0"
        />

        {/* Overlay — strong bottom floor so text always reads, light top scrim for nav */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom,
                rgba(0,0,0,0.18) 0%,
                rgba(0,0,0,0.0) 28%,
                rgba(0,0,0,0.0) 42%,
                rgba(0,0,0,0.52) 72%,
                rgba(0,0,0,0.78) 100%
              )
            `,
          }}
        />

        {/* ── SPLIT BOTTOM LAYOUT ── */}
        <div className="absolute inset-0 z-10 flex items-end px-8 md:px-14 pb-14 md:pb-16">
          <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12">

            {/* LEFT — Elegant lightweight display headline (pure white) */}
            <h1
              ref={h1Ref}
              className="opacity-0 text-white md:max-w-[58%]"
              style={{
                fontFamily: "Manrope, Inter, Arial, sans-serif",
                fontSize: "clamp(3rem, 5vw, 4.75rem)",
                fontWeight: 300,
                letterSpacing: "-0.025em",
                lineHeight: 1.06,
                textShadow: "0 4px 30px rgba(0,0,0,0.5)",
              }}
            >
              <span style={{ color: "#ffffff", fontWeight: 500 }}>
                Precision Science
              </span>
              <br />
              for a Stronger
              <br />
              Agriculture.
            </h1>

            {/* RIGHT — Subordinate clean subtext + CTAs (balanced scale) */}
            <div
              className="flex flex-col gap-4 md:max-w-[32%]"
              style={{
                borderLeft: "2px solid rgba(255,255,255,0.25)",
                paddingLeft: "1.35rem",
              }}
            >
              <p
                ref={pRef}
                className="opacity-0 text-white"
                style={{
                  fontFamily: "Manrope, Inter, Arial, sans-serif",
                  fontSize: "clamp(0.83rem, 0.92vw, 0.88rem)",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.82)",
                  lineHeight: 1.55,
                }}
              >
                Your crop has one season. We give it every advantage — AI that watches
                the field, agronomists who answer the call, inputs that actually work.
              </p>

              {/* CTA Buttons (Balanced scale) */}
              <div
                ref={btnRef}
                className="opacity-0 flex flex-row items-center flex-wrap gap-3 pt-0.5"
              >
                <button
                  className="group inline-flex items-center gap-2 rounded-full text-[#0f2d25] px-5 py-2 font-semibold transition-all duration-300 hover:opacity-90 hover:-translate-y-px active:scale-[0.98]"
                  style={{
                    fontFamily: "Manrope, Inter, Arial, sans-serif",
                    fontSize: "13.5px",
                    letterSpacing: "-0.01em",
                    background: "#a3e635",
                  }}
                >
                  Start for free
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  className="inline-flex items-center gap-2 text-white/80 transition-all duration-200 hover:text-white px-2 py-2 font-normal"
                  style={{
                    fontFamily: "Manrope, Inter, Arial, sans-serif",
                    fontSize: "13.5px",
                    letterSpacing: "-0.005em",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Watch the demo
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25" />
                    <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Navbar top gradient scrim */}
        <div className="absolute top-0 left-0 right-0 h-28 z-[1] bg-gradient-to-b from-black/25 to-transparent pointer-events-none" />

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5">
          <div className="w-px h-7 bg-white/20 animate-pulse" />
        </div>
      </div>
    </section>
  );
});
