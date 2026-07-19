import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArchDownTransition } from "./SectionTransitions";

export default function SectionPartners() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (marqueeRef.current) {
        const totalWidth = marqueeRef.current.scrollWidth / 2;

        gsap.to(marqueeRef.current, {
          x: -totalWidth,
          ease: "none",
          duration: 25,
          repeat: -1,
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const partners = [
    { name: "ICAR", sub: "Agri Research" },
    { name: "NABARD", sub: "Rural Finance" },
    { name: "John Deere", sub: "Farm Machinery" },
    { name: "Mahindra Agri", sub: "Crop Input" },
    { name: "Climate Corp", sub: "Weather Tech" },
    { name: "AWS", sub: "Cloud Logistics" },
    { name: "Google Cloud", sub: "AI Models" },
    { name: "SAU", sub: "State Universities" },
  ];

  const duplicatedPartners = [...partners, ...partners];

  return (
    <>
      <ArchDownTransition topColor="#FFFFFF" bottomColor="var(--bone)" />
      <section
        ref={sectionRef}
        className="py-20 bg-bone relative overflow-hidden text-left border-b border-[#E7ECE8]"
      >
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <span className="font-jet text-[11px] md:text-xs uppercase tracking-[0.22em] text-forest mb-4 block font-semibold">
            06 / Ecosystem Alignment
          </span>
          <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.08] text-forest-deep mb-4 tracking-tight">
            Trusted by 25+ industry leaders
          </h2>
          <p className="text-[#59635D] text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Agaate partners with India's apex research councils, equipment manufacturers, and global
            compute providers to deliver structured advice to the field.
          </p>
        </div>

        <div className="relative w-full overflow-hidden flex items-center h-28">
          {/* Edge gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-bone to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-bone to-transparent z-10 pointer-events-none" />

          <div
            ref={marqueeRef}
            className="flex gap-6 items-center whitespace-nowrap pl-6 pr-6 min-w-max"
          >
            {duplicatedPartners.map((partner, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-center px-8 py-4 bg-white/60 backdrop-blur-sm rounded-xl border border-[#E7ECE8] min-w-[200px] text-center transition-all duration-300 hover:border-forest/30 cursor-default hover:bg-white"
              >
                <span className="text-lg md:text-xl font-serif font-bold tracking-tight text-forest-deep">
                  {partner.name}
                </span>
                <span className="text-[9px] font-mono tracking-wider uppercase text-forest/40 mt-1 block">
                  {partner.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
