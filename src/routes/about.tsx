import { SVGProps } from "react";
import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Leaf, Award, Globe, Shield, Calendar, Users, Eye } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  const pillars = [
    {
      title: "Agronomy-First Advice",
      desc: "We never prescribe inputs without verifying soil, weather and crop stages.",
      icon: Leaf,
    },
    {
      title: "Input Integrity",
      desc: "Every seed packet, fertilizer bag and organic boost is 100% verified authentic.",
      icon: Shield,
    },
    {
      title: "Ecosystem Linkage",
      desc: "Connecting local grower groups directly to retail supermarkets to limit pricing waste.",
      icon: Globe,
    },
  ];

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
      icon: CompassIcon,
    },
    {
      name: "Ravi Kumar",
      role: "Data Scientist",
      focus: "Satellite & Weather Models",
      icon: Shield,
    },
  ];

  const milestones = [
    {
      year: "2024",
      title: "Haryana Nursery Setup",
      desc: "Agaate was born with a 1-acre experimental nursery block testing root density variables.",
    },
    {
      year: "2025",
      title: "17-Acre Smart Chamber",
      desc: "Scaled to our modern container facility, distributing over 4 million seedlings.",
    },
    {
      year: "2026",
      title: "Agri Park & Linkage launch",
      desc: "Inaugurated India's first 20-acre collaborative Agri Park and live contract buyback loops.",
    },
  ];

  return (
    <main className="bg-white text-ink antialiased min-h-screen flex flex-col">
      <Header />

      {/* Hero Header */}
      <div className="pt-36 pb-20 px-6 lg:px-12 bg-bone border-b border-[#E7ECE8]">
        <div className="max-w-4xl mx-auto text-left">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-semibold">
            ABOUT AGAATE
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            Growing better <span className="italic text-terracotta">together.</span>
          </h1>
          <p className="text-lg md:text-xl text-forest/80 leading-relaxed font-sans max-w-2xl">
            Agaate combines scientific input planning, real-time IoT sensors, on-ground agronomists,
            and direct contract buybacks to reduce risk across your complete vegetable crop cycle.
          </p>
        </div>
      </div>

      {/* Pillars Section */}
      <div className="py-20 px-6 lg:px-12 bg-white max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-[2rem] bg-bone/35 border border-[#E7ECE8] transition-all hover:border-forest/20"
              >
                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest mb-6">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-forest-deep mb-3">{p.title}</h3>
                <p className="text-[#59635D] text-sm leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Timeline block */}
        <div className="border-t border-[#E7ECE8] pt-20 mb-24">
          <div className="max-w-2xl mb-12">
            <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block mb-2">
              Our Milestones
            </span>
            <h2 className="font-serif text-4xl text-forest-deep font-bold tracking-tight">
              How we built the ecosystem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="relative pl-8 md:pl-0 border-l border-forest/10 md:border-l-0 md:border-t pt-0 md:pt-6 md:pb-0 pb-6"
              >
                <span className="absolute left-0 top-0 md:top-[-9px] -translate-x-1/2 md:translate-x-0 w-4 h-4 rounded-full bg-forest border-4 border-white shadow-sm block" />
                <span className="font-serif text-4xl font-bold text-terracotta block mb-2">
                  {m.year}
                </span>
                <h4 className="font-sans font-bold text-forest-deep text-base mb-2">{m.title}</h4>
                <p className="text-[#59635D] text-xs md:text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team block */}
        <div className="border-t border-[#E7ECE8] pt-20">
          <div className="max-w-2xl mb-12">
            <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block mb-2">
              Operational Leadership
            </span>
            <h2 className="font-serif text-4xl text-forest-deep font-bold tracking-tight">
              Ecosystem guides
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {team.map((member, idx) => {
              const Icon = member.icon;
              return (
                <div
                  key={idx}
                  className="bg-bone/45 rounded-[1.5rem] p-6 border border-[#E7ECE8] flex flex-col justify-between min-h-[220px]"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-forest/5 flex items-center justify-center text-forest mb-4">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-forest-deep mb-0.5">
                      {member.name}
                    </h3>
                    <p className="text-terracotta font-mono text-[9px] tracking-wider uppercase font-semibold">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-forest/70 text-xs border-t border-[#E7ECE8]/50 pt-3 mt-4">
                    {member.focus}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function CompassIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}
