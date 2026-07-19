import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import agroPark from "@/assets/agro-park.jpg";
import seedImg from "@/assets/zones/seed_lab.png";
import nurseryImg from "@/assets/zones/polyhouse_nursery.png";
import irrigationImg from "@/assets/zones/irrigation_drip.png";
import techImg from "@/assets/zones/drone_scan.png";
import fertigationImg from "@/assets/journey-06-fertigation.png";
import protectionImg from "@/assets/hero-plant.jpg";
import trainingImg from "@/assets/about-farmer-advisor.png";
import marketImg from "@/assets/journey-09-market.png";
import { ArchUpTransition } from "./SectionTransitions";
import { AlgorithmicCanvas } from "./AlgorithmicCanvas";
import { 
  Sprout, 
  Droplet, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  GraduationCap, 
  Truck, 
  Trees,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function SectionAgriPark() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const zones = [
    {
      title: "Germination Vigor & Bio-Plugs",
      zone: "Seed & Nursery Block",
      crop: "Hybrid Tomatoes & Peppers",
      stat: "99.2%",
      statLabel: "Germination Vigor Index",
      desc: "Live comparative test beds demonstrating germination percentages, early root vigor, and natural disease resistance across 12 indigenous and hybrid crop varieties.",
      image: seedImg,
      icon: Sprout,
      featured: true,
    },
    {
      title: "Precision Subsurface Drip",
      zone: "Irrigation & Fertigation",
      crop: "Cucumbers & Melons",
      stat: "-40%",
      statLabel: "Water Consumption",
      desc: "Pressure-compensating layout with real-time flow monitoring, multi-stage sand filtration, and automated venturi loops delivering exact nutrients to the root zone.",
      image: irrigationImg,
      icon: Droplet,
      featured: true,
    },
    {
      title: "Smart Polyhouse Chamber",
      zone: "Nursery Growth Hub",
      crop: "Bio-Boosted Chillies",
      stat: "2.4x",
      statLabel: "Lateral Root Density",
      desc: "Climate-controlled nursery verifying organic bio-inoculants and sterile cocopeat plugs with automated micro-misting arrays.",
      image: nurseryImg,
      icon: Trees,
      featured: false,
    },
    {
      title: "Multispectral Drone Mapping",
      zone: "Technology & IoT Hub",
      crop: "Multi-Crop Field Block A",
      stat: "84 Nodes",
      statLabel: "Field Sensor Mesh",
      desc: "Command hub showcasing solar sensor arrays, multispectral drone flight paths, and micro-climate weather stations across the park.",
      image: techImg,
      icon: Cpu,
      featured: false,
    },
    {
      title: "Staged Nutrient & Humic Infusion",
      zone: "Soil Nutrition Block",
      crop: "Leafy Greens & Pulses",
      stat: "+1.2%",
      statLabel: "Soil Organic Carbon",
      desc: "Trial plots demonstrating organic carbon accumulation and micronutrient uptake efficiency under staged macronutrient dosing.",
      image: fertigationImg,
      icon: Sparkles,
      featured: false,
    },
    {
      title: "Residue-Free Botanical Protection",
      zone: "Crop Protection Beds",
      crop: "Cabbage, Broccoli & Cotton",
      stat: "0.00%",
      statLabel: "Chemical Residues",
      desc: "Residue-free protection beds utilizing botanical repellents, pheromone traps, and targeted bio-fungicides synchronized with weather advisories.",
      image: protectionImg,
      icon: ShieldCheck,
      featured: false,
    },
    {
      title: "Practical Agronomy Academy",
      zone: "Training & Advisory",
      crop: "Agronomist Cohort 04",
      stat: "120+",
      statLabel: "Farmers Certified Monthly",
      desc: "Hands-on training zones where progressive farming clusters and regional dealers evaluate live field experiments and smart diagnostics.",
      image: trainingImg,
      icon: GraduationCap,
      featured: false,
    },
    {
      title: "Post-Harvest & Cold Chain Prep",
      zone: "Market Access Hub",
      crop: "Graded Export Vegetables",
      stat: "+12 Days",
      statLabel: "Shelf-Life Extension",
      desc: "Automated sorting, grading, and cold storage chambers demonstrating post-harvest shelf-life extension and traceable packaging prep.",
      image: marketImg,
      icon: Truck,
      featured: false,
    },
  ];

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
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        }
      );
      gsap.fromTo(
        overviewRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );
      gsap.fromTo(
        gridRef.current?.children || [],
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <ArchUpTransition topColor="var(--bone)" bottomColor="#FFFFFF" />
      <section
        id="park-section"
        ref={sectionRef}
        className="bg-white py-20 md:py-28 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left"
      >
        <AlgorithmicCanvas mode="canopy" opacity={0.22} />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Editorial Section Header */}
          <div ref={headerRef} className="max-w-3xl mb-12 lg:mb-16">
            <span className="font-jet text-[11px] md:text-xs uppercase tracking-[0.22em] text-forest mb-4 block font-semibold">
              05 / Agri Park Demonstration
            </span>
            <h2 className="font-serif text-[clamp(2.4rem,4.8vw,4rem)] leading-[1.08] text-forest-deep mb-6 tracking-tight">
              A living testbed of <span className="italic text-terracotta">agritech.</span>
            </h2>
            <p className="text-[#59635D] text-[16px] md:text-[18px] leading-[1.7] max-w-2xl">
              Agaate’s 20-acre Integrated Agri Park brings leading seed houses, irrigation designers, and smart agricultural manufacturers directly to the soil. We evaluate product performance live across crops—giving Indian farmers verified, unbiased agronomic data right in the field.
            </p>
          </div>

          {/* 20-Acre Overview Hero Card */}
          <div
            ref={overviewRef}
            className="rounded-[2rem] bg-bone/60 border border-[#E7ECE8] p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 shadow-sm"
          >
            {/* Left Side: Park Overview Image */}
            <div className="lg:col-span-7 relative">
              <div className="aspect-[16/10] rounded-[1.5rem] overflow-hidden border border-[#E7ECE8] relative shadow-lg group">
                <img
                  src={agroPark}
                  alt="Agaate 20-Acre Integrated Agri Park"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-cream z-10">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase bg-forest/80 px-3 py-1 rounded-full border border-cream/20">
                      Integrated 20-Acre Grounds
                    </span>
                    <h3 className="font-serif text-xl md:text-2xl font-bold mt-2">
                      Live Comparative Demonstration Field
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Key Verification Stats */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-terracotta font-bold block mb-2">
                  Verified Field Trials
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-forest-deep leading-snug">
                  Real crops. Real data. Zero guesswork.
                </h3>
              </div>
              <p className="text-[#59635D] text-sm md:text-base leading-relaxed">
                Every input recommendation made by Agaate—from seed selection to drip spacing and bio-fungicides—is first rigorously proven on our testbed under local soil and weather stresses.
              </p>

              <div className="grid grid-cols-2 gap-5 pt-4 border-t border-[#E7ECE8]">
                <div>
                  <span className="font-serif text-2xl md:text-3xl font-bold text-forest-deep block">12+ Crops</span>
                  <span className="text-xs text-[#59635D] font-medium leading-tight block mt-1">
                    Vegetables, grains &amp; cash crops tested side-by-side
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl md:text-3xl font-bold text-terracotta block">-40% Water</span>
                  <span className="text-xs text-[#59635D] font-medium leading-tight block mt-1">
                    Average irrigation savings with precision subsurface drip
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl md:text-3xl font-bold text-forest block">0.00% Residue</span>
                  <span className="text-xs text-[#59635D] font-medium leading-tight block mt-1">
                    Botanical repellents &amp; biological crop protection
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl md:text-3xl font-bold text-forest-deep block">120+ Farmers</span>
                  <span className="text-xs text-[#59635D] font-medium leading-tight block mt-1">
                    Trained and certified every month at our field academy
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="/agri-park"
                  className="inline-flex items-center gap-2 font-semibold text-xs md:text-sm text-forest hover:text-terracotta transition-colors group"
                >
                  Explore full park map and trial reports
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Scannable Field Blocks Grid (Zero Clicks Needed) */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E7ECE8]">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-forest/60 font-bold block mb-1">
                  Park Layout & Focus Areas
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-forest-deep">
                  Explore the 8 Specialized Testbed Zones
                </h3>
              </div>
              <p className="text-xs text-[#59635D] mt-2 sm:mt-0 font-mono">
                Showing live trial results across all demonstration blocks
              </p>
            </div>

            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {zones.map((item, idx) => {
                const IconComp = item.icon;
                const isFeatured = item.featured;
                return (
                  <div
                    key={idx}
                    className={`bg-white rounded-2xl border border-[#E7ECE8] hover:border-forest/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden group ${
                      isFeatured ? "md:col-span-2 bg-bone/30" : ""
                    }`}
                  >
                    {/* Top Image Thumbnail */}
                    <div className={`w-full overflow-hidden relative ${isFeatured ? "aspect-[16/8] sm:aspect-[16/7]" : "aspect-[16/10]"}`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#E7ECE8] text-[10px] font-mono font-bold text-forest uppercase tracking-wider flex items-center gap-1.5">
                        <IconComp className="w-3.5 h-3.5 text-terracotta" />
                        {item.zone}
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[11px] font-mono text-[#59635D] uppercase tracking-wider">
                            Crop: <strong className="text-forest">{item.crop}</strong>
                          </span>
                        </div>

                        <h4 className="font-serif text-xl font-bold text-forest-deep mb-2 group-hover:text-forest transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[#59635D] text-xs sm:text-sm leading-relaxed mb-6">
                          {item.desc}
                        </p>
                      </div>

                      {/* Stat Footer */}
                      <div className="pt-4 border-t border-[#E7ECE8] flex items-baseline justify-between bg-bone/40 -mx-6 -mb-6 px-6 py-4 mt-auto">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#59635D] block">
                            Trial Metric
                          </span>
                          <span className="font-serif text-2xl font-bold text-forest-deep">
                            {item.stat}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-terracotta text-right max-w-[140px] leading-tight">
                          {item.statLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


