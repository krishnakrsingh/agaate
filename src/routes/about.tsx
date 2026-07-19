import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useRef } from "react";
import { Leaf, Award, Globe, Shield, Calendar, Compass, ChevronRight, BookOpen } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [activeLeader, setActiveLeader] = useState<number | null>(null);

  const pillars = [
    {
      title: "Agronomy-First Advice",
      desc: "We never prescribe inputs without verifying soil organic tension, regional moisture sensors, and active crop stage telemetry.",
      icon: Leaf,
    },
    {
      title: "Input Integrity",
      desc: "Every seed packet, fertilizer bag, and biological soil booster sowed is checked via factory QR signatures for 100% authenticity.",
      icon: Shield,
    },
    {
      title: "Ecosystem Linkage",
      desc: "Connecting local grower clusters directly to retail supermarkets to limit peak pricing waste and eliminate auction middlemen cuts.",
      icon: Globe,
    },
  ];

  const team = [
    {
      name: "Ankit Rawat",
      role: "Founder & CEO",
      focus: "Sustainability & Agro-Strategy",
      icon: Leaf,
      pub: "Investigating Nitrogen optimization loops in sub-tropical Solanaceae cultivation blocks (2024).",
    },
    {
      name: "Kuldeep Singh Singhar",
      role: "Head of Operations",
      focus: "Supply Chain & Input Logistics",
      icon: Award,
      pub: "Cold chain logistics models for high-density nursery distribution hubs (2025).",
    },
    {
      name: "Abhay Ranjan",
      role: "Chief of Staff",
      focus: "Ecosystem Infrastructure",
      icon: Globe,
      pub: "Closed-loop agricultural business frameworks in North India (2025).",
    },
    {
      name: "Chanchala Shukla",
      role: "Lead Agronomist",
      focus: "Pathology & Integrated Pest Mgt",
      icon: Compass,
      pub: "Managing Early Blight resistance using targeted botanical sprays and spore traps (2026).",
    },
    {
      name: "Ravi Kumar",
      role: "Data Scientist",
      focus: "Satellite & Weather Models",
      icon: Shield,
      pub: "NDVI canopy analysis from Sentinel-2 radar scans in vegetable crop rotations (2026).",
    },
  ];

  const milestones = [
    {
      year: "2024",
      title: "Haryana Nursery Block Setup",
      desc: "Agaate sowed its first seeds with a 1-acre experimental nursery block testing root density variables under controlled bio-inoculation.",
    },
    {
      year: "2025",
      title: "17-Acre Smart Climate Chambers",
      desc: "Scaled up to our modern container facility, distributing over 4 million seedlings to regional Jhajjar clusters with zero transit shock.",
    },
    {
      year: "2026",
      title: "Agri Park & Buyback Launch",
      desc: "Inaugurated India's first 20-acre collaborative Agri Park and live buyback ledger systems securing floor prices for 2,000+ growers.",
    },
  ];

  return (
    <main className="bg-cream text-ink antialiased min-h-screen flex flex-col font-sans">
      <Header />

      {/* Hero Header */}
      <div className="pt-40 pb-24 px-6 lg:px-12 bg-bone border-b border-[#E7ECE8] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-forest)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-left relative z-10">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-bold">
            ABOUT AGAATE
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            Growing better <span className="italic text-terracotta">together.</span>
          </h1>
          <p className="text-xl md:text-2xl text-forest/80 leading-relaxed font-normal max-w-2xl">
            Agaate combines scientific input planning, real-time IoT sensors, on-ground agronomists,
            and direct contract buybacks to reduce risk across your complete vegetable crop cycle.
          </p>
        </div>
      </div>

      {/* Pillars Section */}
      <div className="py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full space-y-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-[2.5rem] bg-white border border-[#E7ECE8] transition-all duration-300 hover:border-forest/20 hover:shadow-md text-left"
              >
                <div className="w-12 h-12 rounded-2xl bg-forest/5 flex items-center justify-center text-forest mb-6 border border-forest/10">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-forest-deep mb-4">{p.title}</h3>
                <p className="text-forest/70 text-sm leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Interactive Timeline block */}
        <div className="border-t border-[#E7ECE8] pt-24 text-left">
          <div className="max-w-2xl mb-12">
            <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block mb-2">
              Our Milestones
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-forest-deep font-bold tracking-tight">
              How we built the ecosystem
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left side: Timeline Nav buttons */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {milestones.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMilestone(idx)}
                  className={`w-full text-left p-6 border rounded-[2rem] transition-all cursor-pointer ${
                    activeMilestone === idx
                      ? "bg-forest border-forest text-cream shadow-md"
                      : "bg-white border-[#E7ECE8] hover:border-forest/30 text-forest-deep"
                  }`}
                >
                  <span className="font-serif text-3xl font-bold block">{m.year}</span>
                  <span className="text-xs font-semibold opacity-85 mt-1 block">{m.title}</span>
                </button>
              ))}
            </div>

            {/* Right side: Detailed Milestone View */}
            <div className="lg:col-span-8 bg-bone rounded-[3rem] p-8 md:p-12 min-h-[260px] flex flex-col justify-between border border-[#E7ECE8] text-left relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-64 h-64 bg-forest/5 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <span className="font-jet text-[10px] tracking-widest text-terracotta font-bold uppercase block">MILESTONE HIGHLIGHT</span>
                <h3 className="font-serif text-3xl md:text-4xl text-forest-deep font-bold leading-tight">
                  {milestones[activeMilestone].title}
                </h3>
                <p className="text-forest/75 text-sm md:text-base leading-relaxed">
                  {milestones[activeMilestone].desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Team block */}
        <div className="border-t border-[#E7ECE8] pt-24 text-left">
          <div className="max-w-2xl mb-12">
            <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block mb-2">
              Operational Leadership
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-forest-deep font-bold tracking-tight">
              Ecosystem guides
            </h2>
            <p className="text-forest/70 text-sm mt-2 leading-relaxed">
              Click on any leadership profile to view their recent agronomy publications or field data research papers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {team.map((member, idx) => {
              const Icon = member.icon;
              const isSelected = activeLeader === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveLeader(isSelected ? null : idx)}
                  className={`rounded-[2rem] p-6 border transition-all duration-300 flex flex-col justify-between min-h-[240px] cursor-pointer text-left ${
                    isSelected
                      ? "bg-forest border-forest text-cream shadow-md scale-[1.02]"
                      : "bg-white border-[#E7ECE8] hover:border-forest/20 hover:shadow-sm text-forest-deep"
                  }`}
                >
                  <div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 border ${
                      isSelected ? "bg-white/10 border-white/20 text-cream" : "bg-forest/5 border-forest/10 text-forest"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-xl font-bold mb-1">{member.name}</h3>
                    <p className={`font-mono text-[9px] tracking-wider uppercase font-semibold ${
                      isSelected ? "text-terracotta/90" : "text-terracotta"
                    }`}>
                      {member.role}
                    </p>
                  </div>
                  <div>
                    <span className={`text-[10px] font-semibold border-t pt-3 mt-4 block flex items-center justify-between ${
                      isSelected ? "border-white/10 text-cream/80" : "border-[#E7ECE8] text-forest/60"
                    }`}>
                      <span>{isSelected ? "Hide details" : "View research"}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transform transition-transform ${isSelected ? "rotate-90" : ""}`} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Research Publication Details Tray */}
          {activeLeader !== null && (
            <div className="bg-[#eef3f0]/50 rounded-[2rem] border border-forest/15 p-6 md:p-8 mt-8 text-left animate-in slide-in-from-top duration-300 flex gap-4 items-start">
              <BookOpen className="w-6 h-6 text-forest flex-shrink-0 mt-1" />
              <div>
                <span className="font-jet text-[9px] tracking-widest text-forest font-bold uppercase block mb-1">
                  AGRONOMY PUBLICATION DETAILS · {team[activeLeader].name}
                </span>
                <p className="text-forest-deep text-xs font-mono font-medium leading-relaxed">
                  "{team[activeLeader].pub}"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
