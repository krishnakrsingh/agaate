import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArchUpTransition } from "./SectionTransitions";
import { AlgorithmicCanvas } from "./AlgorithmicCanvas";
import { PhoneCall, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function SectionCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <ArchUpTransition topColor="#FFFFFF" bottomColor="var(--color-night)" />
      <section
        ref={sectionRef}
        className="bg-color-night py-24 md:py-32 px-6 lg:px-12 text-cream text-center relative overflow-hidden"
      >
        <AlgorithmicCanvas mode="rhizome" opacity={0.32} />

        {/* Ambient glow maps */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-forest/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10" ref={contentRef}>
          <span className="font-mono text-[10px] tracking-[0.25em] text-emerald-400 mb-6 block uppercase font-bold">
            Start Your Transformation
          </span>
          <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold mb-6 leading-[1.08] text-cream">
            Ready to grow with{" "}
            <span className="italic text-yellow-400 underline decoration-yellow-400/20 underline-offset-8">
              confidence?
            </span>
          </h2>
          <p className="text-cream/80 text-[16px] sm:text-[18px] md:text-[20px] leading-[1.7] max-w-2xl mx-auto mb-12">
            Mitigate your field risk, standardise your nutrition schedules, and secure direct
            buyback channels with Agaate. Talk to a regional advisor.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="tel:9487263498"
              className="w-full sm:w-auto rounded-full bg-yellow-400 text-[#1a3c34] hover:bg-white hover:text-[#1a3c34] px-10 py-5 text-[16px] font-bold tracking-tight transition-all duration-300 shadow-2xl hover:scale-[1.02] flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call advisory channel</span>
            </a>
            <a
              href="/contact"
              className="w-full sm:w-auto rounded-full border border-white/20 hover:border-white bg-white/5 hover:bg-white/10 text-white px-9 py-5 text-[16px] font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request custom consult</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
