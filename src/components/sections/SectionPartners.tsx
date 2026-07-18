import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArchDownTransition } from "./SectionTransitions";

gsap.registerPlugin(ScrollTrigger);

export default function SectionPartners() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Marquee animation
      if (marqueeRef.current) {
        // Find total scrollable width
        const totalWidth = marqueeRef.current.scrollWidth / 2;
        
        gsap.to(marqueeRef.current, {
          x: -totalWidth,
          ease: "none",
          duration: 30,
          repeat: -1,
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const partners = [
    "ICAR", "NABARD", "John Deere", "Mahindra Agri", 
    "Climate Corp", "AWS", "Google Cloud", "SAU"
  ];
  
  // Duplicate for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  return (
    <>
      <ArchDownTransition topColor="#E3EBE6" bottomColor="#FFFFFF" />
      <section ref={sectionRef} className="py-12 md:py-16 lg:py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-forest/5 text-forest/70 text-sm font-bold tracking-wider mb-4 uppercase">Ecosystem Partners</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-forest mb-4">Trusted By 25+ Industry Leaders</h2>
          <p className="text-forest/70 max-w-2xl mx-auto">We partner with India's top agricultural institutions, equipment manufacturers, and global technology leaders to bring world-class solutions to every farm.</p>
        </div>

        <div className="relative w-full overflow-hidden flex items-center h-24">
          {/* Gradient masks for smooth fade effect at edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          <div ref={marqueeRef} className="flex gap-16 md:gap-32 items-center whitespace-nowrap pl-8 pr-8 min-w-max">
            {duplicatedPartners.map((partner, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-default"
              >
                <span className="text-2xl md:text-3xl font-display font-bold tracking-tight text-forest uppercase">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
