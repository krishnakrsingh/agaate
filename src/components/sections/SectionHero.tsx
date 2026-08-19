import { useEffect, useRef, memo, useState } from "react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";

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
  const pRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const { t } = useTranslation("hero");

  const [activeIndex, setActiveIndex] = useState(0);
  const subtitlePoints = t("subtitle_points", { returnObjects: true }) as string[];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % subtitlePoints.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [subtitlePoints.length]);
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
      // Start reveal immediately (loader circular wipe has started opening)
      const tl = gsap.timeline({
        delay: 0,
        onComplete: () => {
          onAnimationCompleteRef.current?.();
        },
      });

      // 1. Cinematic reveal: container scales smoothly on GPU, curtain fades out smoothly without layout thrashing
      tl.fromTo(
        containerRef.current,
        { scale: 0.985 },
        {
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          force3D: true,
          clearProps: "transform",
        },
      )
        .fromTo(
          curtainRef.current,
          { opacity: 0.75, display: "block" },
          {
            opacity: 0,
            duration: 1.4,
            ease: "power3.out",
            force3D: true,
            onComplete: () => {
              if (curtainRef.current) curtainRef.current.style.display = "none";
            },
          },
          "<",
        )
        // 2. Hardware-accelerated text reveal on GPU compositor thread (zero layout thrashing)
        .fromTo(
          h1Ref.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            force3D: true,
            clearProps: "transform",
          },
          "-=0.7",
        )
        .fromTo(
          pRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            force3D: true,
            clearProps: "transform",
          },
          "-=0.7",
        )
        .fromTo(
          btnRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            force3D: true,
            clearProps: "transform",
          },
          "-=0.7",
        );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [startAnimation]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-[100dvh] p-2 md:p-2.5 bg-[#fafbf7]"
    >
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden rounded-[16px] bg-[#fafbf7]"
      >
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
          className="absolute inset-0 z-[1] bg-[#fafbf7] pointer-events-none opacity-0"
        />

        {/* Overlay — strong bottom floor so text always reads */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom,
                rgba(0,0,0,0.0) 0%,
                rgba(0,0,0,0.0) 42%,
                rgba(0,0,0,0.52) 72%,
                rgba(0,0,0,0.78) 100%
              )
            `,
          }}
        />

        {/* ── SPLIT BOTTOM LAYOUT ── */}
        <div className="absolute inset-0 z-10 flex items-end px-5 sm:px-8 md:px-14 pb-8 md:pb-9">
          <div className="w-full min-w-0 flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12">
            {/* LEFT — Elegant display headline (pure white, larger scale) */}
            <h1
              ref={h1Ref}
              className="opacity-0 text-cream max-w-full min-w-0 break-words md:max-w-[62%]"
              style={{
                fontSize: "clamp(2.2rem, 7.5vw, 5.5rem)",
                fontWeight: 300,
                letterSpacing: "-0.035em",
                lineHeight: 1.02,
                textShadow: "0 4px 30px rgba(0,0,0,0.5)",
                willChange: "transform, opacity",
                transform: "translate3d(0, 30px, 0)",
              }}
            >
              <span style={{ color: "#ffffff", fontWeight: 500 }}>{t("title_start")}</span>
              <br />
              {t("title_end")
                .split("\n")
                .map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
            </h1>

            {/* RIGHT — Subordinate clean subtext + CTAs (balanced scale) */}
            <div
              className="flex flex-col gap-4 md:max-w-[460px] shrink-0"
              style={{
                borderLeft: "2px solid rgba(255,255,255,0.18)",
                paddingLeft: "1.25rem",
              }}
            >
              <div
                ref={pRef}
                className="opacity-0 flex flex-col gap-3"
                style={{
                  willChange: "transform, opacity",
                  transform: "translate3d(0, 20px, 0)",
                }}
              >
                {/* Lead line */}
                <p
                  style={{
                    fontSize: "clamp(0.85rem, 0.92vw, 0.9rem)",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 1.5,
                  }}
                >
                  {t("subtitle_lead")}
                </p>

                {/* Rotating tag */}
                <div className="flex items-center gap-2.5 mt-0.5">
                  <span
                    className="shrink-0 rounded-full bg-[#a3e635]"
                    style={{ width: 4.5, height: 4.5, boxShadow: "0 0 6px rgba(163,230,53,0.5)" }}
                    aria-hidden
                  />
                  <div className="relative h-6 flex-1 overflow-hidden">
                    {subtitlePoints.map((point, i) => (
                      <span
                        key={i}
                        className="absolute inset-0 flex items-center truncate"
                        style={{
                          fontSize: "clamp(0.85rem, 0.92vw, 0.9rem)",
                          fontWeight: 400,
                          color: "rgba(255,255,255,0.78)",
                          letterSpacing: "0.01em",
                          opacity: activeIndex === i ? 1 : 0,
                          transform:
                            activeIndex === i ? "translate3d(0, 0, 0)" : "translate3d(0, 6px, 0)",
                          filter: activeIndex === i ? "blur(0px)" : "blur(4px)",
                          transition:
                            "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1), filter 600ms cubic-bezier(0.16, 1, 0.3, 1)",
                          pointerEvents: activeIndex === i ? "auto" : "none",
                        }}
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Buttons (Slide-Up Capsule Pills — Side by Side on Same Horizontal Line) */}
              <div
                ref={btnRef}
                className="opacity-0 flex flex-row flex-nowrap items-center gap-2.5 sm:gap-3"
                style={{
                  willChange: "transform, opacity",
                  transform: "translate3d(0, 15px, 0)",
                }}
              >
                <SlideUpPillButton
                  href="#agaate-app"
                  variant="hero-primary"
                  size="hero"
                  label={t("cta_primary")}
                  icon={
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
                  }
                  iconPosition="right"
                  className="whitespace-nowrap shrink-0 px-4 sm:px-5 py-2.5 text-xs sm:text-[13px] font-semibold shadow-none hover:shadow-none"
                />

                <a
                  href="#kisaan-mall"
                  className="inline-flex items-center gap-1.5 text-cream/80 transition-all duration-200 hover:text-cream px-2 py-2 font-normal whitespace-nowrap shrink-0 group"
                  style={{
                    fontSize: "13.5px",
                    letterSpacing: "-0.005em",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {t("cta_secondary")}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  >
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

        {/* Scroll cue */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 pointer-events-none">
          <div className="w-px h-5 bg-cream/20 animate-pulse" />
        </div>
      </div>
    </section>
  );
});
