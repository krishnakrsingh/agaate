import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@tanstack/react-router";

gsap.registerPlugin(ScrollTrigger);

export default function SectionTeamPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const centerColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        },
      );

      const cols = [leftColRef.current, centerColRef.current, rightColRef.current].filter(Boolean);
      gsap.fromTo(
        cols,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team-preview-section"
      className="py-24 md:py-32 px-6 lg:px-12 bg-white relative text-left overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div ref={headerRef} className="mb-16 md:mb-20 max-w-3xl mx-auto text-center">
          <span className="font-jet text-[11px] md:text-xs uppercase tracking-[0.22em] text-forest mb-4 block font-semibold">
            08 / Operational Guidance
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-forest-deep mb-5 tracking-tight leading-[1.1]">
            Guided by agronomic expertise
          </h2>
          <p className="text-base md:text-lg text-forest/70 max-w-2xl mx-auto leading-relaxed">
            A specialized group merging agronomic science, boots-on-the-ground supply execution, and
            remote data engineering.
          </p>
        </div>

        {/* 3-Column Grid Layout matching the exact image mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {/* Left Column (2 Stacked Light Cards with Headshots) */}
          <div ref={leftColRef} className="flex flex-col gap-6">
            {/* Top-Left Card: Kuldeep Singh Singhar */}
            <div className="bg-[#F3F4F3] rounded-[2.2rem] p-7 md:p-8 relative overflow-hidden flex flex-col justify-between min-h-[260px] md:min-h-[280px] border border-[#E4E8E5] transition-all duration-300 hover:shadow-xl hover:border-forest/20 hover:bg-white group">
              <div className="relative z-10 max-w-[62%]">
                <h3 className="font-serif text-xl font-bold text-forest-deep mb-1">
                  Kuldeep Singh Singhar
                </h3>
                <p className="text-xs font-mono tracking-wider uppercase text-forest/60 font-semibold mb-2">
                  Head of Operations
                </p>
                <p className="text-forest/70 text-xs font-medium leading-relaxed mt-3">
                  Supply Chain & Input Logistics
                </p>
              </div>
              <img
                src="/team/kuldeep.png"
                alt="Kuldeep Singh Singhar - Head of Operations"
                className="absolute bottom-0 right-1 w-40 md:w-44 h-48 md:h-52 object-contain object-bottom z-0 pointer-events-none transition-transform duration-500 group-hover:scale-105 drop-shadow-md"
              />
            </div>

            {/* Bottom-Left Card: Abhay Ranjan */}
            <div className="bg-[#F3F4F3] rounded-[2.2rem] p-7 md:p-8 relative overflow-hidden flex flex-col justify-between min-h-[260px] md:min-h-[280px] border border-[#E4E8E5] transition-all duration-300 hover:shadow-xl hover:border-forest/20 hover:bg-white group">
              <div className="relative z-10 max-w-[62%]">
                <h3 className="font-serif text-xl font-bold text-forest-deep mb-1">
                  Abhay Ranjan
                </h3>
                <p className="text-xs font-mono tracking-wider uppercase text-forest/60 font-semibold mb-2">
                  Chief of Staff
                </p>
                <p className="text-forest/70 text-xs font-medium leading-relaxed mt-3">
                  Ecosystem Infrastructure
                </p>
              </div>
              <img
                src="/team/abhay.png"
                alt="Abhay Ranjan - Chief of Staff"
                className="absolute bottom-0 right-1 w-40 md:w-44 h-48 md:h-52 object-contain object-bottom z-0 pointer-events-none transition-transform duration-500 group-hover:scale-105 drop-shadow-md"
              />
            </div>
          </div>

          {/* Center Column (Featured Tall Dark Card + Compact Bottom Card) */}
          <div ref={centerColRef} className="flex flex-col gap-6">
            {/* Featured Center Card: Ankit Rawat */}
            <div className="bg-gradient-to-b from-[#1E1916] via-[#3B2016] to-[#68301B] rounded-[2.5rem] p-8 md:p-9 relative overflow-hidden flex flex-col justify-between min-h-[420px] md:min-h-[440px] text-white shadow-2xl border border-white/10 group transition-all duration-300 hover:shadow-[0_20px_50px_rgba(104,48,27,0.35)]">
              {/* Warm glow aura */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(217,130,91,0.28),transparent_70%)] pointer-events-none" />
              
              <div className="relative z-10">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-1">
                  Ankit Rawat
                </h3>
                <p className="text-terracotta text-xs font-mono tracking-widest uppercase font-bold mb-4 block">
                  Founder & CEO
                </p>
                <p className="text-white/85 text-xs md:text-sm leading-relaxed max-w-sm font-normal">
                  Expert in transforming agricultural supply chains through meaningful grower linkages, precision telemetry, and sustainable agronomic vision.
                </p>
              </div>

              <img
                src="/team/ankit.png"
                alt="Ankit Rawat - Founder & CEO"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 md:w-64 h-64 md:h-72 object-contain object-bottom z-0 pointer-events-none transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_12px_25px_rgba(0,0,0,0.6)]"
              />
            </div>

            {/* Bottom-Center Compact Card: Dr. Prakash Sharma */}
            <div className="bg-[#F3F4F3] rounded-[2rem] p-6 md:p-7 border border-[#E4E8E5] transition-all duration-300 hover:shadow-md hover:bg-white hover:border-forest/20 flex flex-col justify-center min-h-[120px]">
              <h3 className="font-serif text-lg font-bold text-forest-deep mb-1">
                Dr. Prakash Sharma
              </h3>
              <p className="text-xs font-mono uppercase tracking-wider text-forest/60 font-semibold mb-1.5">
                Senior Soil Scientist
              </p>
              <p className="text-forest/70 text-xs font-medium">
                Soil Fertility & Bio-Inoculant Formulations
              </p>
            </div>
          </div>

          {/* Right Column (2 Stacked Light Cards with Headshots) */}
          <div ref={rightColRef} className="flex flex-col gap-6">
            {/* Top-Right Card: Chanchala Shukla */}
            <div className="bg-[#F3F4F3] rounded-[2.2rem] p-7 md:p-8 relative overflow-hidden flex flex-col justify-between min-h-[260px] md:min-h-[280px] border border-[#E4E8E5] transition-all duration-300 hover:shadow-xl hover:border-forest/20 hover:bg-white group">
              <div className="relative z-10 max-w-[62%]">
                <h3 className="font-serif text-xl font-bold text-forest-deep mb-1">
                  Chanchala Shukla
                </h3>
                <p className="text-xs font-mono tracking-wider uppercase text-forest/60 font-semibold mb-2">
                  Lead Agronomist
                </p>
                <p className="text-forest/70 text-xs font-medium leading-relaxed mt-3">
                  Pathology & Integrated Pest Mgt
                </p>
              </div>
              <img
                src="/team/chanchala.png"
                alt="Chanchala Shukla - Lead Agronomist"
                className="absolute bottom-0 right-1 w-40 md:w-44 h-48 md:h-52 object-contain object-bottom z-0 pointer-events-none transition-transform duration-500 group-hover:scale-105 drop-shadow-md"
              />
            </div>

            {/* Bottom-Right Card: Ravi Kumar */}
            <div className="bg-[#F3F4F3] rounded-[2.2rem] p-7 md:p-8 relative overflow-hidden flex flex-col justify-between min-h-[260px] md:min-h-[280px] border border-[#E4E8E5] transition-all duration-300 hover:shadow-xl hover:border-forest/20 hover:bg-white group">
              <div className="relative z-10 max-w-[62%]">
                <h3 className="font-serif text-xl font-bold text-forest-deep mb-1">
                  Ravi Kumar
                </h3>
                <p className="text-xs font-mono tracking-wider uppercase text-forest/60 font-semibold mb-2">
                  Data Scientist
                </p>
                <p className="text-forest/70 text-xs font-medium leading-relaxed mt-3">
                  Satellite & Weather Models
                </p>
              </div>
              <img
                src="/team/ravi.png"
                alt="Ravi Kumar - Data Scientist"
                className="absolute bottom-0 right-1 w-40 md:w-44 h-48 md:h-52 object-contain object-bottom z-0 pointer-events-none transition-transform duration-500 group-hover:scale-105 drop-shadow-md"
              />
            </div>
          </div>
        </div>

        {/* CTA Link */}
        <div className="mt-16 text-center">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 font-semibold text-xs md:text-sm text-forest hover:text-forest-deep transition-all duration-300 group bg-bone/60 hover:bg-forest/10 px-6 py-3 rounded-full border border-[#E7ECE8]"
          >
            Meet the full leadership team
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

