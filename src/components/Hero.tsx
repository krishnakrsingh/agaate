import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroProps {
  onVideoLoaded?: () => void;
  startAnimation?: boolean;
}

export default function Hero({ onVideoLoaded, startAnimation = false }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleVideoLoaded = () => {
        onVideoLoaded?.();
      };

      // Check readystate to see if it is already loaded/playable
      if (video.readyState >= 3) {
        handleVideoLoaded();
      } else {
        video.addEventListener('canplay', handleVideoLoaded);
        video.addEventListener('canplaythrough', handleVideoLoaded);
      }

      return () => {
        video.removeEventListener('canplay', handleVideoLoaded);
        video.removeEventListener('canplaythrough', handleVideoLoaded);
      };
    }
  }, [onVideoLoaded]);

  useEffect(() => {
    if (!startAnimation) return;

    // Start reveal immediately (loader circular wipe has started opening)
    const tl = gsap.timeline({ delay: 0 });

    // 1. Cinematic reveal of the hero container and video (Parallax scale)
    tl.fromTo(
      containerRef.current,
      { scale: 0.8, borderRadius: '60px', filter: 'brightness(0.3)' },
      { scale: 1, borderRadius: '16px', filter: 'brightness(1)', duration: 1.6, ease: 'expo.inOut' }
    )
    .fromTo(
      videoRef.current,
      { scale: 1.5 },
      { scale: 1, duration: 1.6, ease: 'expo.inOut' },
      "<" // Sync with container
    )
    // 2. Text floats in
    .fromTo(
      h1Ref.current,
      { opacity: 0, y: 40, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
      "-=0.6"
    )
    .fromTo(
      pRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo(
      btnRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.8'
    );

    return () => {
      tl.kill();
    };
  }, [startAnimation]);

  return (
    <section id="hero" className="relative w-full h-screen p-2 md:p-2.5">
      <div ref={containerRef} className="relative w-full h-full overflow-hidden">

        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 z-0 w-full h-full object-cover"
          src="/assets/hero.mp4"
          preload="auto"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Overlay — cinematic vignette */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 85% 85% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 100%),
              linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.35) 100%)
            `,
          }}
        />

        {/* ── CENTERED EDITORIAL CENTERPIECE ── */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto pt-12">
          
          {/* Headline */}
          <h1
            ref={h1Ref}
            className="opacity-0 text-white"
            style={{
              fontFamily: 'Manrope, Inter, Arial, sans-serif',
              fontSize: 'clamp(2.375rem, 5vw, 4.25rem)',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
              textWrap: 'balance',
              textShadow: '0 4px 30px rgba(0,0,0,0.5)',
            }}
          >
            We grow{' '}
            <span style={{ color: '#facc15', fontWeight: 800 }}>
              smarter
            </span>
            ,<br />
            with every seed.
          </h1>

          {/* Subheading */}
          <p
            ref={pRef}
            className="opacity-0 mt-6 text-white/80 max-w-xl mx-auto"
            style={{
              fontFamily: 'Manrope, Inter, Arial, sans-serif',
              fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
              fontWeight: 400,
              lineHeight: 1.7,
              textWrap: 'balance',
              textShadow: '0 2px 15px rgba(0,0,0,0.8)',
            }}
          >
            From the first seed to harvest — AI-driven monitoring, real agronomists, and science-backed inputs, all in one place.
          </p>

          {/* CTA Buttons */}
          <div ref={btnRef} className="opacity-0 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="group inline-flex items-center gap-3 rounded-full bg-white text-[#1a3c34] px-8 py-3.5 text-sm font-semibold transition-all duration-300 hover:bg-[#c8e3d4] hover:shadow-xl hover:-translate-y-0.5"
              style={{ fontFamily: 'Manrope, Inter, Arial, sans-serif', fontSize: '15px', fontWeight: 600, letterSpacing: '-0.005em' }}
            >
              Get started free
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white px-8 py-3.5 text-sm font-medium transition-all duration-300 hover:bg-white/20"
              style={{ fontFamily: 'Manrope, Inter, Arial, sans-serif', fontSize: '15px', fontWeight: 600, letterSpacing: '-0.005em' }}
            >
              See how it works
            </button>
          </div>
        </div>

        {/* Navbar top gradient scrim */}
        <div className="absolute top-0 left-0 right-0 h-32 z-[1] bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />

        {/* Scroll cue — bottom center */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <div className="w-px h-8 bg-white/25 animate-pulse" />
        </div>

      </div>
    </section>
  );
}
