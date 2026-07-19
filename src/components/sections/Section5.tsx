import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import pSeeds from "@/assets/product-seeds.jpg";
import pFert from "@/assets/product-fertiliser.jpg";
import pIrr from "@/assets/product-irrigation.jpg";
import pTools from "@/assets/product-tools.jpg";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: "Hybrid Vegetable Seeds",
    desc: "Certified high-germination varieties selected for Indian soils and seasons.",
    img: pSeeds,
    stat: "98% germination",
    stage: "Pre-Sowing",
  },
  {
    title: "Bio-Boosted Saplings",
    desc: "Pre-hardened nursery saplings with active mycorrhizal root networks.",
    img: pSeeds,
    stat: "14-day advanced rooting",
    stage: "Transplanting",
  },
  {
    title: "Custom Soil Nutrition",
    desc: "Stage-wise NPK and micronutrient blends built from your soil test.",
    img: pFert,
    stat: "Soil-mapped basal",
    stage: "Vegetative Growth",
  },
  {
    title: "Crop Protection",
    desc: "Preventive organic bio-fungicides and integrated pest management kits.",
    img: pFert,
    stat: "Residue-free verified",
    stage: "Flowering & Fruiting",
  },
  {
    title: "Smart Irrigation",
    desc: "Precision drip lines, filters, and automated fertigation hardware.",
    img: pIrr,
    stat: "40% water saved",
    stage: "Full Cycle",
  },
  {
    title: "Tools & Mulch",
    desc: "UV-stabilized mulching film and durable ergonomic field implements.",
    img: pTools,
    stat: "Grade-A durability",
    stage: "Field Prep",
  },
];

export default function Section5() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children || [],
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        },
      );
    }, sectionRef);

    // Pinned horizontal shelf on desktop only
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      if (!track) return;

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight * 0.2}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });
    });

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="mall-section"
      ref={sectionRef}
      className="bg-white text-ink py-20 md:py-24 lg:py-0 lg:h-screen relative overflow-hidden flex flex-col justify-center"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-10 lg:mb-14">
          <div className="flex items-center justify-between gap-6 border-t border-ink/10 pt-5 mb-8">
            <span className="font-jet text-[11px] md:text-xs uppercase tracking-[0.22em] text-forest">
              02 / Kisaan Mall
            </span>
            <span className="hidden md:block font-jet text-[11px] uppercase tracking-[0.22em] text-ink/40">
              500+ verified SKUs
            </span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-serif text-[clamp(2rem,4.4vw,3.8rem)] leading-[1.08] text-forest-deep max-w-[640px]">
              Everything your farm needs, <span className="italic text-forest">on one shelf</span>
            </h2>
            <div className="hidden lg:block w-[240px]">
              <div className="font-jet text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-3">
                Scroll to browse the shelf →
              </div>
              <div className="h-[2px] bg-ink/10 rounded-full overflow-hidden">
                <div
                  ref={progressRef}
                  className="h-full w-full bg-terracotta origin-left"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shelf viewport: native swipe on mobile, GSAP-pinned on desktop */}
      <div
        ref={viewportRef}
        className="w-full overflow-x-auto lg:overflow-hidden snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div ref={trackRef} className="flex gap-5 md:gap-7 w-max px-6 lg:px-12 pb-4 items-stretch">
          {categories.map((c, i) => (
            <article
              key={i}
              className="group relative w-[78vw] sm:w-[400px] lg:w-[430px] flex-shrink-0 snap-start bg-cream border border-ink/10 rounded-[1.6rem] overflow-hidden hover:border-forest/40 transition-colors duration-300"
            >
              <div className="relative h-[220px] md:h-[250px] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 font-jet text-[10px] uppercase tracking-[0.18em] bg-cream/95 text-forest px-3 py-1.5 rounded-full">
                  {c.stage}
                </span>
                <span className="absolute bottom-4 right-5 font-serif italic text-[56px] leading-none text-cream/70 select-none">
                  0{i + 1}
                </span>
              </div>
              <div className="p-6 md:p-7">
                <h3 className="font-serif text-[24px] md:text-[27px] text-forest-deep leading-tight mb-2.5">
                  {c.title}
                </h3>
                <p className="text-[#59635D] text-[14px] md:text-[15px] leading-[1.6] mb-5">
                  {c.desc}
                </p>
                <div className="flex items-center justify-between border-t border-ink/10 pt-4">
                  <span className="font-jet text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-terracotta">
                    ✓ {c.stat}
                  </span>
                  <ArrowRight className="w-4 h-4 text-ink/30 group-hover:text-forest group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </article>
          ))}

          {/* End cap CTA card */}
          <Link
            to="/services/kisaan-mall"
            className="group relative w-[78vw] sm:w-[400px] lg:w-[430px] flex-shrink-0 snap-start bg-forest-deep text-cream rounded-[1.6rem] overflow-hidden flex flex-col justify-between p-7 md:p-9"
          >
            <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
            <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-emerald-400">
              Full catalogue
            </span>
            <div className="relative z-10">
              <div className="font-serif text-[clamp(2rem,3vw,2.8rem)] leading-[1.1] mb-6">
                Browse all <span className="italic text-emerald-400">500+</span> farm inputs
              </div>
              <span className="inline-flex items-center gap-2.5 rounded-full bg-terracotta px-7 py-4 text-[15px] font-bold text-cream group-hover:gap-4 transition-all">
                Explore Kisaan Mall <ArrowRight className="w-4.5 h-4.5" />
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile progress hint */}
      <div className="lg:hidden px-6 mt-4">
        <div className="font-jet text-[10px] uppercase tracking-[0.2em] text-ink/40">
          Swipe to browse →
        </div>
      </div>
    </section>
  );
}
