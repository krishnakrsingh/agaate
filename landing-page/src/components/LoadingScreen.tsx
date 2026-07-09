import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Use gsap.context to fix React Strict Mode double-firing which causes overlapping bugs!
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const videoBox = videoBoxRef.current;
      const overlay = overlayRef.current;
      const texts = textsRef.current ? Array.from(textsRef.current.children) : [];
      const bg = bgRef.current;

      if (!container || !videoBox || !overlay || texts.length === 0 || !bg) return;

      // Initial state setup
      gsap.set(videoBox, { 
        width: '0vw', 
        height: '0vh', 
        borderRadius: '50%',
        opacity: 1 
      });
      // autoAlpha handles both opacity and visibility: hidden reliably in GSAP timelines
      gsap.set(texts, { autoAlpha: 0, scale: 0.8 });
      gsap.set(overlay, { opacity: 1 });

      const tl = gsap.timeline({ onComplete });

      // --- BEAT 1: SOW ---
      tl.to(texts[0], { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'expo.out' })
        .to(texts[0], { autoAlpha: 0, scale: 1.1, duration: 0.2, ease: 'power2.in' }, '+=0.15')
        
      // --- BEAT 2: GROW ---
        .to(texts[1], { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'expo.out' }, '+=0.05')
        // Video punches in as a sharp circle
        .to(videoBox, { width: '28vw', height: '28vw', duration: 0.6, ease: 'elastic.out(1, 0.5)' }, '<')
        .to(texts[1], { autoAlpha: 0, scale: 1.1, duration: 0.2, ease: 'power2.in' }, '+=0.2')

      // --- BEAT 3: AGAATE ---
        .to(texts[2], { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'expo.out' }, '+=0.05')
        // Video violently squashes into an ultra-wide cinematic slit
        .to(videoBox, { width: '75vw', height: '12vh', borderRadius: '100px', duration: 0.5, ease: 'expo.inOut' }, '<')
        
      // --- THE EXPLOSION ---
        // Text explodes toward the camera
        .to(texts[2], { autoAlpha: 0, scale: 4, duration: 0.5, ease: 'power4.in' }, '+=0.35')
        // Background flashes to white/cream
        .to(bg, { backgroundColor: '#f7f5ef', duration: 0.2 }, '<')
        // Video expands to fill the entire screen perfectly
        .to(videoBox, { width: '100vw', height: '100vh', borderRadius: '0px', duration: 0.6, ease: 'expo.inOut' }, '<')
        
      // --- SETTLE ---
        // Morph into the hero section's exact dimensions seamlessly
        .to(videoBox, {
          width: 'calc(100vw - 16px)',
          height: 'calc(100vh - 16px)',
          borderRadius: '16px',
          duration: 0.8,
          ease: 'power3.inOut'
        }, '+=0.1')
        .to(overlay, { opacity: 0, duration: 0.6 }, '-=0.6')
        .to(container, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
    }, containerRef);

    // Clean up timeline on unmount to prevent double-firing!
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
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background that flashes */}
      <div 
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#050505', // Start pitch black
          zIndex: 1
        }}
      />

      {/* Overlay to hide the hero component underneath until handoff */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'transparent',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* Kinetic Text Layer */}
      <div
        ref={textsRef}
        style={{
          position: 'absolute',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <h1 style={{ position: 'absolute', opacity: 0, visibility: 'hidden', color: '#f7f5ef', fontSize: '18vw', fontFamily: 'Instrument Serif', fontStyle: 'italic', lineHeight: 1, textTransform: 'uppercase' }}>
          SOW.
        </h1>
        <h1 style={{ position: 'absolute', opacity: 0, visibility: 'hidden', color: '#f7f5ef', fontSize: '18vw', fontFamily: 'Instrument Serif', fontStyle: 'italic', lineHeight: 1, textTransform: 'uppercase' }}>
          GROW.
        </h1>
        <h1 style={{ position: 'absolute', opacity: 0, visibility: 'hidden', color: '#c46a3a', fontSize: '20vw', fontFamily: 'Inter', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1, textTransform: 'uppercase' }}>
          AGAATE
        </h1>
      </div>

      {/* The Masked Video Box */}
      <div
        ref={videoBoxRef}
        style={{
          position: 'absolute',
          zIndex: 5,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 50px rgba(0,0,0,0.5)',
          willChange: 'width, height, border-radius',
        }}
      >
        <video
          src="/assets/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            // Keep the video full viewport size so the parent div acts purely as a clipping mask
            minWidth: '100vw', 
            minHeight: '100vh',
            objectFit: 'cover',
            position: 'absolute',
          }}
        />
        {/* Cinematic vignette to match hero */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse 85% 85% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 100%),
              linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.35) 100%)
            `,
            pointerEvents: 'none',
            minWidth: '100vw',
            minHeight: '100vh'
          }}
        />
      </div>
    </div>
  );
}
