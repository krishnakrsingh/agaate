"use client";

import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { heroContent } from "@/lib/home-content";

interface HeroProps {
  onVideoLoaded?: () => void;
  startAnimation?: boolean;
  onAnimationComplete?: () => void;
}

export default memo(function SectionHero({
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
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
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
      const tl = gsap.timeline({
        delay: 0,
        onComplete: () => {
          onAnimationCompleteRef.current?.();
        },
      });

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

        <div
          ref={curtainRef}
          className="absolute inset-0 z-[1] bg-ink pointer-events-none opacity-0"
        />

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

        <div className="absolute inset-0 z-10 flex items-end px-5 pb-10 sm:px-8 md:px-14 md:pb-16">
          <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12">
            <h1
              ref={h1Ref}
              className="opacity-0 text-cream md:max-w-[62%]"
              style={{
                fontFamily: "var(--font-manrope), Manrope, Inter, Arial, sans-serif",
                fontSize: "clamp(2.5rem, 6.8vw, 6.5rem)",
                fontWeight: 300,
                letterSpacing: "-0.035em",
                lineHeight: 1.05,
                textShadow: "0 4px 30px rgba(0,0,0,0.5)",
              }}
            >
              <span style={{ color: "#ffffff", fontWeight: 500 }}>{heroContent.titleStart}</span>
              <br />
              {heroContent.titleEnd.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </h1>

            <div className="flex flex-col gap-5 border-l-2 border-white/25 pl-4 md:max-w-[32%] md:gap-4 md:pl-[1.35rem]">
              <p
                ref={pRef}
                className="opacity-0 text-cream"
                style={{
                  fontFamily: "var(--font-manrope), Manrope, Inter, Arial, sans-serif",
                  fontSize: "clamp(0.83rem, 0.92vw, 0.88rem)",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.82)",
                  lineHeight: 1.55,
                }}
              >
                {heroContent.subtitle}
              </p>

              <div
                ref={btnRef}
                className="opacity-0 flex flex-col items-start gap-3 pt-1 sm:flex-row sm:items-center sm:flex-wrap"
              >
                <a
                  href="#services"
                  className="group inline-flex items-center gap-2 rounded-full text-[#0f2d25] px-5 py-2 font-semibold transition-all duration-300 hover:opacity-90 hover:-translate-y-px active:scale-[0.98]"
                  style={{
                    fontFamily: "var(--font-manrope), Manrope, Inter, Arial, sans-serif",
                    fontSize: "13.5px",
                    letterSpacing: "-0.01em",
                    background: "#a3e635",
                  }}
                >
                  {heroContent.ctaPrimary}
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
                </a>
                <a
                  href="#journey-section"
                  className="inline-flex items-center gap-2 text-cream/80 transition-all duration-200 hover:text-cream px-2 py-2 font-normal"
                  style={{
                    fontFamily: "var(--font-manrope), Manrope, Inter, Arial, sans-serif",
                    fontSize: "13.5px",
                    letterSpacing: "-0.005em",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {heroContent.ctaSecondary}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25" />
                    <path
                      d="M6.5 8h3.25M8.5 6.5L10 8l-1.5 1.5"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 right-0 h-28 z-[1] bg-gradient-to-b from-black/25 to-transparent pointer-events-none" />

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5">
          <div className="w-px h-7 bg-cream/20 animate-pulse" />
        </div>
      </div>
    </section>
  );
});
