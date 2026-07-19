import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@tanstack/react-router";
import { Leaf, Award, Globe, Compass, Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function SectionTeamPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

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

      gsap.fromTo(
        teamRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const team = [
    {
      name: "Ankit Rawat",
      role: "Founder & CEO",
      focus: "Sustainability & Agro-Strategy",
      icon: Leaf,
    },
    {
      name: "Kuldeep Singh Singhar",
      role: "Head of Operations",
      focus: "Supply Chain & Input Logistics",
      icon: Award,
    },
    {
      name: "Abhay Ranjan",
      role: "Chief of Staff",
      focus: "Ecosystem Infrastructure",
      icon: Globe,
    },
    {
      name: "Chanchala Shukla",
      role: "Lead Agronomist",
      focus: "Pathology & Integrated Pest Mgt",
      icon: Compass,
    },
    {
      name: "Ravi Kumar",
      role: "Data Scientist",
      focus: "Satellite & Weather Models",
      icon: Shield,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="team-preview-section"
      className="py-20 md:py-28 px-6 lg:px-12 bg-white relative text-left"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="mb-16 max-w-2xl">
          <span className="font-jet text-[11px] md:text-xs uppercase tracking-[0.22em] text-forest mb-4 block font-semibold">
            08 / Operational Guidance
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-forest-deep mb-4 tracking-tight">
            Guided by agronomic expertise
          </h2>
          <p className="text-lg text-forest/70">
            A specialized group merging agronomic science, boots-on-the-ground supply execution, and
            remote data engineering.
          </p>
        </div>

        <div ref={teamRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {team.map((member, idx) => {
            const Icon = member.icon;
            return (
              <div
                key={idx}
                className={`bg-bone/40 rounded-[2rem] p-8 border border-[#E7ECE8] transition-all duration-300 hover:border-forest/20 hover:shadow-xl hover:bg-white flex flex-col justify-between min-h-[260px] ${
                  idx === 0 ? "md:col-span-2 lg:col-span-2 bg-forest/[0.02] border-forest/10" : ""
                }`}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-forest-deep mb-1">
                    {member.name}
                  </h3>
                  <p className="text-terracotta font-semibold text-xs tracking-wider uppercase font-mono mb-4">
                    {member.role}
                  </p>
                </div>
                <p className="text-forest/70 text-sm border-t border-[#E7ECE8]/50 pt-4 leading-relaxed font-semibold">
                  {member.focus}
                </p>
              </div>
            );
          })}
        </div>

        <div>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 font-semibold text-xs md:text-sm text-forest hover:text-forest-deep transition-colors"
          >
            Meet the full leadership team
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
