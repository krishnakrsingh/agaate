import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArchUpTransition } from "./SectionTransitions";
import { AlgorithmicCanvas } from "./AlgorithmicCanvas";

gsap.registerPlugin(ScrollTrigger);

/* 11. FINAL CALL-TO-ACTION SECTION */
export default function Section12() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current?.children || [],
        { opacity: 0, y: 35, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.85, stagger: 0.12, ease: "back.out(1.5)", scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <ArchUpTransition topColor="#E3EBE6" bottomColor="#17211B" />
      <section id="cta-section" ref={sectionRef} className="bg-[#17211B] py-24 lg:py-36 px-6 lg:px-12 text-cream text-center relative overflow-hidden">
        {/* Living rhizome background behind CTA */}
        <AlgorithmicCanvas mode="rhizome" opacity={0.32} />

        {/* Ambient background glowing orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-forest/30 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10" ref={contentRef}>
          <div className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-forest/40 border border-cream/20 text-cream font-mono text-xs tracking-widest uppercase mb-6 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            START YOUR TRANSFORMATION
          </div>
          <h2 className="font-display text-[36px] sm:text-[46px] md:text-[54px] lg:text-[64px] font-bold mb-6 leading-[1.08] tracking-[-0.03em] text-cream drop-shadow-lg">
            Ready to grow with <span className="text-emerald-400 underline decoration-yellow-400/60 decoration-wavy">confidence?</span>
          </h2>
          <p className="text-cream/80 text-[16px] sm:text-[18px] md:text-[20px] font-normal leading-[1.7] max-w-[680px] mx-auto mb-10">
            From choosing the right seed to reaching the right institutional buyer, Agaate supports your complete vegetable crop journey with AI, IoT verification, and on-ground agronomists.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a
              href="tel:9487263498"
              className="rounded-full bg-yellow-400 text-forest-deep hover:bg-white hover:text-forest-deep px-10 py-5 text-[17px] font-bold tracking-[-0.005em] transition-all duration-300 shadow-2xl hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>Start Your Journey Today</span>
              <span className="text-xl">→</span>
            </a>
            <button className="rounded-full border-2 border-cream/30 hover:border-cream/80 hover:bg-white/10 px-9 py-5 text-[17px] font-semibold tracking-[-0.005em] transition-all duration-300">
              Talk to an Expert
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

