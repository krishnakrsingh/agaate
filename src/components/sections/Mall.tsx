import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import pSeeds from "@/assets/product-seeds.jpg";
import pFert from "@/assets/product-fertiliser.jpg";
import pIrr from "@/assets/product-irrigation.jpg";
import pTools from "@/assets/product-tools.jpg";
import { WaveTransition } from "./SectionTransitions";

gsap.registerPlugin(ScrollTrigger);

/* 5. AGAATE KISAAN MALL */
export default function Mall() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const categories = [
    { title: "Hybrid Vegetable Seeds", desc: "Certified high-germination varieties for Indian soils.", img: pSeeds, badge: "98% Germination Rate" },
    { title: "Bio-Boosted Saplings", desc: "Pre-hardened nursery saplings with active mycorrhizae.", img: pSeeds, badge: "14-Day Advance Rooting" },
    { title: "Custom Soil Nutrition", desc: "Stage-wise NPK & micronutrient blends based on soil tests.", img: pFert, badge: "Custom Basal Formulations" },
    { title: "Crop Protection & Bio-Inputs", desc: "Preventive organic bio-fungicides and integrated pest control.", img: pFert, badge: "Residue-Free Verified" },
    { title: "Smart Irrigation Systems", desc: "Precision drip lines, filters, and automated fertigation systems.", img: pIrr, badge: "40% Water Saved" },
    { title: "Farming Tools & Mulch", desc: "UV-stabilized mulching film and durable ergonomic implements.", img: pTools, badge: "Grade-A Durability" }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftColRef.current,
        { opacity: 0, x: -25 },
        { opacity: 1, x: 0, duration: 0.65, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 92%", once: true } }
      );
      gsap.fromTo(rightColRef.current?.children || [],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.05, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 92%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const currentCat = categories[activeIdx];

  return (
    <>
      <WaveTransition topColor="#F8FAF7" bottomColor="#FFFFFF" />
      <section id="mall-section" ref={sectionRef} className="bg-white py-24 lg:py-32 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Product Visual with Floating Badge */}
          <div className="lg:col-span-6 relative" ref={leftColRef}>
            <div className="aspect-[4/3] w-full rounded-3xl overflow-hidden border border-[#E7ECE8] shadow-lg relative group">
              <img
                src={currentCat.img}
                alt={currentCat.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent opacity-80"></div>
              
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-cream">
                <div>
                  <span className="text-[11px] font-mono tracking-widest uppercase bg-forest/80 px-3 py-1 rounded-full border border-cream/20">
                    STAGE-MAPPED INPUT
                  </span>
                  <h3 className="font-display text-2xl font-bold mt-2">{currentCat.title}</h3>
                </div>
              </div>
            </div>

            {/* Floating Live Verification Badge */}
            <div className="absolute -top-5 -right-5 md:right-4 bg-white/95 backdrop-blur-md border border-forest/30 shadow-xl rounded-2xl p-4 animate-float-slow z-20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest/15 text-forest flex items-center justify-center font-bold text-lg">
                ✓
              </div>
              <div className="text-left">
                <div className="text-[11px] font-mono text-ink/50 uppercase">QUALITY STANDARD</div>
                <div className="font-sans font-bold text-sm text-forest">{currentCat.badge}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Hoverable Category Cards */}
          <div className="lg:col-span-6 text-left" ref={rightColRef}>
            <div className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">
              KISAAN MALL
            </div>
            <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
              Everything Your Farm Needs, in One Place
            </h2>
            <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[640px] mb-8">
              Hover over a category below to explore tested agricultural inputs directly mapped to your crop stages:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-9">
              {categories.map((c, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <div
                    key={c.title}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => setActiveIdx(idx)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-start gap-3.5 ${
                      isActive
                        ? "bg-forest text-cream border-forest shadow-md scale-[1.02]"
                        : "bg-[#F8FAF7] border-[#E7ECE8] text-[#17211B] hover:border-forest/40"
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${isActive ? "bg-cream animate-pulse" : "bg-forest"}`}></span>
                    <div>
                      <div className="font-sans font-bold text-[15px] leading-tight">{c.title}</div>
                      <div className={`text-xs mt-1 leading-relaxed ${isActive ? "text-cream/80" : "text-[#59635D]"}`}>{c.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="rounded-full bg-forest-deep hover:bg-forest text-cream px-8 py-4 text-[15px] font-semibold tracking-[-0.005em] transition-all duration-300 shadow-md hover:shadow-lg">
              Explore Kisaan Mall Catalog →
            </button>
          </div>

        </div>
      </section>
    </>
  );
}
