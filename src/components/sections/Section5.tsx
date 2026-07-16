import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import pSeeds from "@/assets/product-seeds.jpg";
import pFert from "@/assets/product-fertiliser.jpg";
import pIrr from "@/assets/product-irrigation.jpg";
import pTools from "@/assets/product-tools.jpg";
import { ArchDownTransition } from "./SectionTransitions";

gsap.registerPlugin(ScrollTrigger);

/* 5. AGAATE KISAAN MALL */
export default function Section5() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const categories = [
    { title: "Hybrid Vegetable Seeds", desc: "Certified high-germination varieties for Indian soils.", img: pSeeds, badge: "98% Germination Rate", stage: "Pre-Sowing" },
    { title: "Bio-Boosted Saplings", desc: "Pre-hardened nursery saplings with active mycorrhizae.", img: pSeeds, badge: "14-Day Advance Rooting", stage: "Transplanting" },
    { title: "Custom Soil Nutrition", desc: "Stage-wise NPK & micronutrient blends based on soil tests.", img: pFert, badge: "Custom Basal Formulations", stage: "Vegetative Growth" },
    { title: "Crop Protection & Bio-Inputs", desc: "Preventive organic bio-fungicides and integrated pest control.", img: pFert, badge: "Residue-Free Verified", stage: "Flowering & Fruiting" },
    { title: "Smart Irrigation Systems", desc: "Precision drip lines, filters, and automated fertigation systems.", img: pIrr, badge: "40% Water Saved", stage: "Full Cycle" },
    { title: "Farming Tools & Mulch", desc: "UV-stabilized mulching film and durable ergonomic implements.", img: pTools, badge: "Grade-A Durability", stage: "Field Preparation" }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftColRef.current,
        { opacity: 0, x: -35, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true } }
      );
      gsap.fromTo(rightColRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Smooth image & badge transition when activeIdx changes
  useEffect(() => {
    if (!imageRef.current || !badgeRef.current) return;
    gsap.fromTo(imageRef.current,
      { scale: 1.08, opacity: 0.6 },
      { scale: 1, opacity: 1, duration: 0.45, ease: "power2.out" }
    );
    gsap.fromTo(badgeRef.current,
      { y: 8, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, ease: "back.out(2)" }
    );
  }, [activeIdx]);

  const currentCat = categories[activeIdx];

  return (
    <>
      <ArchDownTransition topColor="#E3EBE6" bottomColor="#FFFFFF" />
      <section id="mall-section" ref={sectionRef} className="bg-white py-24 lg:py-32 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Product Visual with Floating Badge */}
          <div className="lg:col-span-6 relative" ref={leftColRef}>
            <div className="aspect-[4/3] w-full rounded-[28px] overflow-hidden border border-[#E7ECE8] shadow-xl relative group bg-forest/5">
              <img
                ref={imageRef}
                src={currentCat.img}
                alt={currentCat.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-forest-deep/20 to-transparent opacity-85"></div>
              
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-cream z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/90 border border-cream/20 text-[11px] font-mono tracking-widest uppercase shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
                    STAGE: {currentCat.stage}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold mt-2.5 text-cream drop-shadow-md">{currentCat.title}</h3>
                </div>
              </div>
            </div>

            {/* Floating Live Verification Badge */}
            <div
              ref={badgeRef}
              className="absolute -top-5 -right-3 md:right-4 bg-white/95 backdrop-blur-md border border-forest/30 shadow-2xl rounded-2xl p-4 sm:p-5 z-20 flex items-center gap-3.5 hover:scale-105 transition-transform"
            >
              <div className="w-11 h-11 rounded-full bg-forest/15 text-forest flex items-center justify-center font-bold text-lg shadow-inner">
                ✓
              </div>
              <div className="text-left">
                <div className="text-[11px] font-mono text-ink/50 uppercase tracking-wider">VERIFIED STANDARD</div>
                <div className="font-sans font-bold text-sm sm:text-[15px] text-forest">{currentCat.badge}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Hoverable Category Cards */}
          <div className="lg:col-span-6 text-left" ref={rightColRef}>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-forest/[0.08] border border-forest/20 font-mono text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest animate-ping"></span>
              KISAAN MALL
            </div>
            <h2 className="font-display text-[32px] sm:text-[40px] md:text-[46px] lg:text-[52px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
              Everything Your Farm Needs, in One Place
            </h2>
            <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[640px] mb-8">
              Click or hover over a category below to explore tested agricultural inputs directly mapped to your vegetable crop stages:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-9">
              {categories.map((c, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <div
                    key={c.title}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => setActiveIdx(idx)}
                    className={`p-4 sm:p-4.5 rounded-2xl border cursor-pointer transition-all duration-300 flex items-start gap-3.5 ${
                      isActive
                        ? "bg-forest text-cream border-forest shadow-lg scale-[1.03]"
                        : "bg-[#E3EBE6]/60 border-[#E7ECE8] text-[#17211B] hover:border-forest/40 hover:bg-white"
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 transition-colors ${isActive ? "bg-yellow-400 animate-pulse shadow-[0_0_8px_#FACC15]" : "bg-forest/60"}`}></span>
                    <div>
                      <div className="font-sans font-bold text-[15px] sm:text-[16px] leading-tight">{c.title}</div>
                      <div className={`text-xs mt-1 leading-relaxed ${isActive ? "text-cream/80" : "text-[#59635D]"}`}>{c.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="rounded-full bg-forest-deep hover:bg-forest text-cream px-8 py-4.5 text-[15px] sm:text-[16px] font-semibold tracking-[-0.005em] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02]">
              Explore Kisaan Mall Catalog →
            </button>
          </div>

        </div>
      </section>
    </>
  );
}

