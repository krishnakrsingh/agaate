import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sprout, Store, Cpu, Coins, Hammer, Truck, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ArchUpTransition } from "./SectionTransitions";

gsap.registerPlugin(ScrollTrigger);

export default function SectionServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: Sprout,
      title: "Bio-Boosted Nursery",
      desc: "Agaate's 17-acre smart facility providing containerized vegetable seedlings with accelerated root density and high field survival.",
      link: "/services/nursery",
      tag: "Seedlings",
    },
    {
      icon: Store,
      title: "Kisaan Mall",
      desc: "Your comprehensive agri-input hub featuring 500+ verified fertilizers, seeds, and precision tools with agronomic prescriptions.",
      link: "/services/kisaan-mall",
      tag: "Input Retail",
    },
    {
      icon: Cpu,
      title: "Farm Management & Tech",
      desc: "Continuous soil moisture sensors, weather stations, and drone telemetry mapping your field health in real-time.",
      link: "/services/farm-tech",
      tag: "IoT & Drones",
    },
    {
      icon: Coins,
      title: "Carbon Credit Program",
      desc: "Unlock extra seasonal revenue by practicing satellite-verified sustainable farming. We handle the auditing end-to-end.",
      link: "/services/carbon-credits",
      tag: "Sustainability",
    },
    {
      icon: Hammer,
      title: "Big Farm Setup",
      desc: "Complete turnkey planning, automated drip setup, polyhouse engineering, and operational management for large commercial plots.",
      link: "/services/big-farm-setup",
      tag: "Turnkey Project",
    },
    {
      icon: Truck,
      title: "Market Linkage",
      desc: "Secured pre-harvest buyback agreements and logistics to ship directly to premium supermarkets and processors.",
      link: "/services/market-linkage",
      tag: "Logistics",
    },
  ];

  return (
    <>
      <ArchUpTransition topColor="#FFFFFF" bottomColor="var(--bone)" />
      <section
        ref={sectionRef}
        id="services-grid"
        className="py-20 md:py-28 px-6 lg:px-12 bg-bone relative"
      >
        {/* Subtle decorative texture */}
        <div className="absolute inset-0 bg-[radial-gradient(var(--forest)_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <span className="font-jet text-[11px] md:text-xs uppercase tracking-[0.22em] text-forest mb-4 block font-semibold">
              02 / Ecosystem Verticals
            </span>
            <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.08] text-forest-deep mb-4 tracking-tight">
              An integrated closed-loop system
            </h2>
            <p className="text-[#59635D] text-[16px] md:text-[18px] leading-[1.7] max-w-xl mx-auto">
              From the initial seed planning to post-harvest institutional sales, our specialized
              services work in synergy to maximize cultivator success.
            </p>
          </div>

          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <Link
                  key={idx}
                  to={service.link}
                  className="group block bg-white/70 backdrop-blur-sm rounded-[2rem] p-8 shadow-sm border border-[#E7ECE8] hover:border-forest/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-forest/5 flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-cream transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-forest/40 bg-bone px-2.5 py-1 rounded">
                      {service.tag}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-forest-deep mb-3 font-semibold group-hover:text-forest transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#59635D] text-sm md:text-[15px] leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  <div className="font-semibold text-xs md:text-sm text-forest group-hover:text-forest-deep flex items-center gap-1.5 transition-colors pt-2 border-t border-[#E7ECE8]/50">
                    Explore Vertical
                    <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
