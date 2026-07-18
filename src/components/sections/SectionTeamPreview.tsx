import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@tanstack/react-router";

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
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } }
      );
      
      gsap.fromTo(
        teamRef.current?.children || [],
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)", scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const team = [
    { name: "Ankit Rawat", role: "Founder & CEO", focus: "Sustainability & Strategy" },
    { name: "Kuldeep Singh Singhar", role: "Head of Operations", focus: "Logistics & Execution" },
    { name: "Abhay Ranjan", role: "Chief of Staff", focus: "Infrastructure Management" },
    { name: "Chanchala Shukla", role: "Agronomist", focus: "Crop Viability & IPM" },
    { name: "Ravi Kumar", role: "Data & Strategy", focus: "Analytics & Crop Cycles" }
  ];

  return (
    <section ref={sectionRef} id="team-preview-section" className="py-12 md:py-16 lg:py-20 px-6 lg:px-12 bg-[#F9FAF9] relative">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-forest mb-4">Guided by Expertise</h2>
          <p className="text-lg text-forest/70 max-w-2xl mx-auto">
            A strategic blend of agronomic vision, operational execution, and deep technical expertise driving the future of farming.
          </p>
        </div>

        <div ref={teamRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {team.map((member, idx) => (
            <div key={idx} className={`bg-white rounded-3xl p-6 shadow-sm border border-[#E7ECE8] text-center ${idx === 0 ? 'md:col-span-2 lg:col-span-2 bg-forest/[0.02]' : ''}`}>
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4 text-emerald-700 font-display font-bold text-2xl">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-lg font-bold text-forest mb-1">{member.name}</h3>
              <p className="text-emerald-600 font-semibold text-sm mb-2">{member.role}</p>
              <p className="text-forest/60 text-sm">{member.focus}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/about" className="inline-flex items-center gap-2 font-semibold text-forest hover:text-emerald-600 transition-colors">
            Meet the Full Team <span className="text-xl leading-none translate-y-[1px]">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
