import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sprout, Store, Smartphone, Leaf, Warehouse, ShoppingCart } from "lucide-react";
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
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)", scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: Sprout,
      title: "Bio-Boosted Nursery",
      desc: "Our 17-acre smart facility where strong crops begin. Accelerate root density and ensure higher survival rates.",
      link: "/services/nursery",
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      icon: Store,
      title: "Kisaan Mall",
      desc: "Your complete agri-input store with over 500 verified products. Seeds, bio-inputs, and hardware in one place.",
      link: "/services/kisaan-mall",
      color: "bg-orange-50 text-orange-600"
    },
    {
      icon: Smartphone,
      title: "Farm Management & Tech",
      desc: "Sensors, drones, and AI working on your farm. See more, act earlier, and reduce waste with precision data.",
      link: "/services/farm-tech",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: Leaf,
      title: "Carbon Credit Program",
      desc: "Earn extra income by farming sustainably. We help you measure, verify, and monetise your climate-friendly practices.",
      link: "/services/carbon-credits",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: Warehouse,
      title: "Big Farm Setup",
      desc: "Turnkey establishment for commercial farms. We plan, build, and run large-scale operations from bare land to first harvest.",
      link: "/services/big-farm-setup",
      color: "bg-slate-50 text-slate-600"
    },
    {
      icon: ShoppingCart,
      title: "Market Linkage",
      desc: "Direct market integration with better pricing access. Eliminate middlemen and secure your buyback ecosystem.",
      link: "/services/market-linkage",
      color: "bg-yellow-50 text-yellow-600"
    }
  ];

  return (
    <>
      <ArchUpTransition topColor="#F9FAF9" bottomColor="#FFFFFF" />
      <section ref={sectionRef} id="services-grid" className="py-12 md:py-16 lg:py-20 px-6 lg:px-12 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-forest mb-4">An Integrated Ecosystem</h2>
            <p className="text-lg text-forest/70 max-w-2xl mx-auto">
              From the first seed to the final sale, our specialized service verticals are designed to create a closed-loop system for maximum cultivator success.
            </p>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <Link key={idx} to={service.link} className="group block bg-white rounded-3xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#E7ECE8] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${service.color}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-forest mb-3 group-hover:text-emerald-600 transition-colors">{service.title}</h3>
                  <p className="text-forest/70 mb-6 leading-relaxed">{service.desc}</p>
                  <div className="font-semibold text-forest group-hover:text-emerald-600 flex items-center gap-2 transition-colors">
                    Explore Service <span className="text-xl leading-none translate-y-[1px] group-hover:translate-x-1 transition-transform">→</span>
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
