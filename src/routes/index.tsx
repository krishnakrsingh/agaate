import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import heroPlant from "@/assets/hero-plant.jpg";
import rottenPlant from "@/assets/rotten-plant.jpg";
import agroPark from "@/assets/agro-park.jpg";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";
import pSeeds from "@/assets/product-seeds.jpg";
import pFert from "@/assets/product-fertiliser.jpg";
import pIrr from "@/assets/product-irrigation.jpg";
import pTools from "@/assets/product-tools.jpg";
import aboutFarmerAdvisor from "@/assets/about-farmer-advisor.png";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PlantJourney from "@/components/PlantJourney";
import LoadingScreen from "@/components/LoadingScreen";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agaate — Connected Agri-Ecosystem" },
      { name: "description", content: "Agaate combines trusted agricultural inputs, expert guidance, farm technology, and market access." },
    ],
  }),
  component: Index,
});

/* 2.5 AGAATE INTRODUCTION & IMPACT */
function Introduction() {
  const stats = [
    { value: "1,000+", label: "Farmers Connected" },
    { value: "30+", label: "Vegetable Crops" },
    { value: "50+", label: "Ecosystem Partners" },
    { value: "100%", label: "Seed-to-Sale Support" },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(headingRef.current, 
        { opacity: 0, y: 16 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Description & link reveal
      gsap.fromTo(descRef.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.25,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Image soft vertical mask reveal (using clip-path)
      gsap.fromTo(imageRef.current,
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0 },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          opacity: 1,
          duration: 0.9,
          delay: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      // Founder quote fade & slide
      gsap.fromTo(quoteRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="overview-section" 
      ref={sectionRef}
      className="bg-white py-24 lg:py-32 px-6 lg:px-12 relative overflow-hidden text-left"
    >
      {/* Subtle organic line guiding the eye downwards to the Crop Journey */}
      <svg className="absolute left-[40%] bottom-0 w-32 h-[380px] text-[#A5D3DE]/35 pointer-events-none hidden lg:block" fill="none" viewBox="0 0 100 300" preserveAspectRatio="none">
        <path d="M10,0 Q25,90 40,160 T90,300" stroke="currentColor" strokeWidth="1" />
      </svg>

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-20">
        
        {/* Left Side: About Copy (46% width) */}
        <div className="w-full lg:w-[46%] flex flex-col items-start relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-[1px] bg-forest/30"></span>
            <span className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest">
              ABOUT AGAATE
            </span>
          </div>
          
          <h2 
            ref={headingRef}
            className="font-display text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6"
          >
            Built around the farmer. <br />
            Connected from <span className="italic font-normal text-forest">seed to sale</span>.
          </h2>
          
          <div ref={descRef} className="flex flex-col items-start">
            <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[600px] mb-8">
              Agaate brings trusted agricultural inputs, expert guidance, farm technology, and market access together in one connected ecosystem—helping farmers make better decisions, reduce risk, and grow with confidence.
            </p>
            
            <a 
              href="#approach-link" 
              className="text-forest hover:text-forest-deep font-semibold text-[15px] md:text-[16px] flex items-center gap-1.5 transition-colors group"
            >
              Discover our approach 
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>

        {/* Right Side: Image and integrated Founder's Note (50% width) */}
        <div className="w-full lg:w-[50%] relative">
          <div 
            ref={imageRef} 
            className="aspect-[4/3] w-full rounded-[20px] overflow-hidden border border-[#E7ECE8] shadow-sm relative"
          >
            <img 
              src={aboutFarmerAdvisor} 
              alt="Indian vegetable farmer and Agaate agronomist naturally examining crops" 
              className="w-full h-full object-cover rounded-[20px]" 
            />
          </div>

          {/* Founder's note quote panel */}
          <div 
            ref={quoteRef}
            className="mt-6 lg:mt-0 lg:absolute lg:-bottom-8 lg:-left-8 lg:max-w-[380px] bg-white border border-[#E7ECE8] shadow-[0_4px_24px_rgba(0,0,0,0.03)] rounded-[16px] p-6 lg:p-7 z-20 text-left"
          >
            <div className="text-[11px] font-mono tracking-[0.1em] text-terracotta mb-3 font-bold uppercase">
              FOUNDER'S NOTE
            </div>
            <blockquote className="font-sans text-[18px] font-medium leading-[1.5] text-[#17211B] mb-3">
              “We built Agaate with a simple belief: every farmer deserves the right guidance, the right tools, and the right support—so their hard work never goes to loss.”
            </blockquote>
            <span className="text-xs text-[#59635D] font-sans font-medium block">
              Founder, Agaate
            </span>
          </div>
        </div>

      </div>

      {/* Trust and Impact Transition Strip */}
      <div className="border-t border-[#E7ECE8] pt-14 md:pt-16 mt-20 md:mt-28 max-w-[1400px] mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-[#E7ECE8]">
          {stats.map((s, i) => {
            const isLeftColumn = i % 2 === 0;
            const isTopRow = i < 2;
            return (
              <div 
                key={i} 
                className={`text-left md:px-8 first:pl-0 last:pr-0 
                  ${isLeftColumn ? 'pr-6 border-r border-[#E7ECE8] md:border-r-0' : 'pl-6'} 
                  ${isTopRow ? 'pb-6 border-b border-[#E7ECE8] md:border-b-0 md:pb-0' : ''}
                `}
              >
                <div className="font-display text-[42px] md:text-[56px] text-forest font-bold tracking-[-0.04em] leading-none mb-3">
                  {s.value}
                </div>
                <div className="font-sans text-sm md:text-[15px] font-medium text-[#59635D] leading-snug">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* 4. THE PROBLEM AND AGAATE'S SOLUTION */
function ProblemSolution() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current?.children || [],
        { opacity: 0, y: 15 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
        }
      );

      // Desc animation
      gsap.fromTo(descRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
        }
      );

      // Rows animation
      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        const challenge = row.querySelector('.challenge-block');
        const points = row.querySelectorAll('.point-anim');
        const lineDesktop = row.querySelector('.line-anim-desktop');
        const lineMobile = row.querySelector('.line-anim-mobile');
        const solution = row.querySelector('.solution-block');

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 85%" }
        });

        tl.fromTo(challenge, { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" })
          .fromTo(points, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, "-=0.2")
          .addLabel("lines", "-=0.1");
          
        if (lineDesktop) {
          tl.fromTo(lineDesktop, { width: "0%" }, { width: "50%", duration: 0.4, ease: "power2.out" }, "lines");
        }
        if (lineMobile) {
          tl.fromTo(lineMobile, { height: "0%" }, { height: "50%", duration: 0.4, ease: "power2.out" }, "lines");
        }
        
        tl.fromTo(solution, { opacity: 0, x: 15 }, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, "-=0.2");
      });

      // End statement & connection line animation
      const lineEnd = endRef.current?.parentElement?.querySelector('.line-anim-end');
      const endTl = gsap.timeline({
        scrollTrigger: { trigger: endRef.current, start: "top 85%" }
      });
      
      endTl.fromTo(endRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
      if (lineEnd) {
        endTl.fromTo(lineEnd,
          { scaleY: 0 },
          { scaleY: 1, duration: 1, ease: "power2.out" },
          "-=0.2"
        );
      }

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const transformations = [
    {
      challenge: "Uncertain seed selection and inconsistent germination",
      intervention: "Scientific crop planning and bio-boosted nursery support",
      outcome: "Stronger crop establishment"
    },
    {
      challenge: "Incorrect soil nutrition and fertilizer decisions",
      intervention: "Soil-based basal planning and stage-wise fertigation",
      outcome: "More efficient input use"
    },
    {
      challenge: "Unpredictable crop diseases and preventable losses",
      intervention: "Weather-informed preventive advisory and expert support",
      outcome: "Earlier action and reduced crop risk"
    },
    {
      challenge: "Uncertain market access and limited pricing visibility",
      intervention: "Structured harvest planning and direct market linkage",
      outcome: "Better market readiness"
    }
  ];

  return (
    <section ref={sectionRef} className="bg-white py-24 lg:py-32 px-6 lg:px-12 relative overflow-hidden border-b border-[#E7ECE8] text-left">
      <div className="max-w-[1400px] mx-auto">
        {/* Introduction */}
        <div className="mb-20 md:mb-28 max-w-4xl" ref={headerRef}>
          <div className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">OUR APPROACH</div>
          <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
            Farming Should Not Depend on Guesswork.
          </h2>
          <p ref={descRef} className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[740px]">
            Every farming decision affects yield, cost, and profitability. Agaate connects scientific planning, expert guidance, trusted agricultural solutions, and market access—so farmers can act with greater clarity at every stage.
          </p>
        </div>

        {/* Problem-to-Solution Mapping */}
        <div className="flex flex-col gap-16 md:gap-12 relative z-10">
          {transformations.map((item, i) => (
            <div 
              key={i} 
              ref={el => { rowsRef.current[i] = el; }}
              className="flex flex-col md:flex-row items-start md:items-stretch gap-6 md:gap-0 group"
            >
              {/* Left: Challenge */}
              <div className="challenge-block w-full md:w-[38%] md:pr-10 lg:pr-16 flex flex-col justify-center">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 text-[#C97855]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <path d="M12 17h.01" />
                    </svg>
                  </div>
                  <p className="text-[#7B857F] text-[16px] md:text-[17px] leading-[1.5]">
                    {item.challenge}
                  </p>
                </div>
              </div>

              {/* Center: Visual Transition (Desktop) */}
              <div className="hidden md:flex w-[12%] lg:w-[16%] relative min-h-[60px]">
                {/* Dashed line (left half) */}
                <div className="absolute top-1/2 left-0 w-1/2 h-[1.5px] border-b-[1.5px] border-dashed border-[#E4EAE5] -translate-y-1/2"></div>
                {/* Intervention point */}
                <div className="point-anim absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18px] h-[18px] bg-white border-[1.5px] border-forest rounded-full flex items-center justify-center z-10 opacity-0">
                  <div className="w-[6px] h-[6px] bg-forest rounded-full"></div>
                </div>
                {/* Solid line (right half) */}
                <div className="line-anim-desktop absolute top-1/2 left-1/2 h-[1.5px] bg-[#4E735D] -translate-y-1/2 w-0"></div>
              </div>

              {/* Mobile center transition (Vertical) */}
              <div className="md:hidden flex flex-col relative w-full h-[40px] pl-[1.125rem]">
                {/* Dashed line (top half) */}
                <div className="absolute top-0 left-[21px] h-1/2 w-[1.5px] border-l-[1.5px] border-dashed border-[#E4EAE5]"></div>
                {/* Intervention point */}
                <div className="point-anim absolute top-1/2 left-[15.5px] -translate-y-1/2 w-[12px] h-[12px] bg-white border-[1.5px] border-forest rounded-full flex items-center justify-center z-10 opacity-0">
                  <div className="w-[4px] h-[4px] bg-forest rounded-full"></div>
                </div>
                {/* Solid line (bottom half) */}
                <div className="line-anim-mobile absolute top-1/2 left-[21px] w-[1.5px] bg-[#4E735D] h-0"></div>
              </div>

              {/* Right: Solution & Outcome */}
              <div className="solution-block w-full md:w-[50%] lg:w-[46%] md:pl-10 lg:pl-12 flex flex-col justify-center mt-2 md:mt-0">
                <div className="flex items-start gap-3 mb-2">
                  <div className="mt-1 flex-shrink-0 text-forest">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                      <polyline points="16 7 22 7 22 13" />
                    </svg>
                  </div>
                  <p className="text-[#17211B] text-[16px] md:text-[17px] leading-[1.5] font-medium">
                    {item.intervention}
                  </p>
                </div>
                <div className="outcome-label flex items-center gap-2 pl-[30px] opacity-100">
                  <span className="w-4 h-[1px] bg-[#4E735D]/30"></span>
                  <span className="text-[#4E735D] text-[13px] md:text-[14px] font-semibold tracking-wide">
                    {item.outcome}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* End Statement & Connection to next section */}
        <div className="mt-24 md:mt-32 pt-16 md:pt-24 border-t border-[#E4EAE5] relative flex flex-col items-center text-center">
          <div ref={endRef} className="max-w-[700px]">
            <p className="font-display text-[22px] md:text-[26px] font-semibold text-[#17211B] leading-[1.4]">
              <span className="text-forest">Better decisions</span> at every stage. More confidence across the entire crop journey.
            </p>
          </div>
          
          {/* Subtle connection line moving downwards */}
          <div className="mt-12 md:mt-16 w-[1px] h-[80px] md:h-[120px] bg-gradient-to-b from-[#123F2E] to-transparent opacity-40 origin-top line-anim-end"></div>
        </div>
      </div>
    </section>
  );
}

/* 5. AGAATE KISAAN MALL */
function Mall() {
  const categories = [
    "Hybrid Vegetable Seeds",
    "Bio-Boosted Saplings",
    "Custom Soil Nutrition & Fertilizers",
    "Crop Protection & Bio-Inputs",
    "Drip & Smart Irrigation Components",
    "Farming Tools & Mulching Materials"
  ];

  return (
    <section id="mall-section" className="bg-white py-24 lg:py-32 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Single Premium Image */}
        <div className="lg:col-span-6">
          <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#E7ECE8] shadow-sm">
            <img src={pSeeds} alt="High quality inputs at Agaate Kisaan Mall" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Right Column: Copy & Simple Category List */}
        <div className="lg:col-span-6 text-left">
          <div className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">KISAAN MALL</div>
          <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
            Everything Your Farm Needs, in One Place
          </h2>
          <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[640px] mb-8">
            Access genuine, tested inputs directly mapped to your vegetable crop stages. We work with leading brands to supply what your soil and crops require.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {categories.map((c, i) => (
              <div key={i} className="flex items-center gap-2 text-[#59635D] text-[15px] font-medium">
                <span className="text-forest">•</span>
                <span>{c}</span>
              </div>
            ))}
          </div>

          <button className="rounded-full bg-forest-deep hover:bg-forest text-cream px-8 py-3.5 text-[15px] font-semibold tracking-[-0.005em] transition-colors">
            Explore Kisaan Mall
          </button>
        </div>

      </div>
    </section>
  );
}

/* 6. TECHNOLOGY AND FARM MANAGEMENT */
function AgriTech() {
  const techList = [
    { title: "Crop tracking", desc: "WhatsApp-based stage updates & expert image-checks." },
    { title: "IoT soil & weather monitoring", desc: "Real-time moisture, temp, and field weather tracking." },
    { title: "AI crop-health detection", desc: "Upload photos for instant disease diagnostics." },
    { title: "Smart irrigation", desc: "Automated schedules that save water & fertilizer." },
    { title: "Drone monitoring", desc: "High-visibility aerial checks & targeted input spraying." },
    { title: "Data-driven advisory", desc: "Decisions backed by local, historical soil profiles." }
  ];

  return (
    <section id="tech-section" className="bg-[#F8FAF7] py-24 lg:py-32 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Text & Clean List */}
        <div className="lg:col-span-6 text-left">
          <div className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">SMART FARMING</div>
          <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
            Manage Your Farm, Not Just Grow It
          </h2>
          <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[640px] mb-8">
            Agaate brings data-driven tools directly to the field. Track, decide, and coordinate crop health from one unified control dashboard.
          </p>

          <div className="space-y-6">
            {techList.map((t, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="text-forest font-bold text-lg mt-0.5">•</span>
                <div>
                  <h3 className="font-sans font-semibold text-[#17211B] text-[18px] md:text-[20px] leading-[1.3]">{t.title}</h3>
                  <p className="text-[#667069] text-[15px] md:text-[16px] leading-[1.6] mt-1">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Dashboard Tech Visual */}
        <div className="lg:col-span-6">
          <div className="aspect-[4/3] w-full bg-white border border-[#E7ECE8] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#E7ECE8] pb-4 mb-6">
                <div>
                  <span className="font-mono text-[12px] text-ink/40 uppercase">ACTIVE PLOT</span>
                  <div className="font-sans font-bold text-[#17211B]">Plot 04 — Sweet Chilli</div>
                </div>
                <span className="px-3 py-1 bg-moss/10 text-forest text-xs font-mono rounded-full">Day 45</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-[#E7ECE8] rounded-xl p-4">
                  <div className="text-[12px] text-ink/40 font-mono">SOIL MOISTURE</div>
                  <div className="text-xl font-bold text-[#17211B] mt-1">42%</div>
                </div>
                <div className="border border-[#E7ECE8] rounded-xl p-4">
                  <div className="text-[12px] text-ink/40 font-mono">NITROGEN (N)</div>
                  <div className="text-xl font-bold text-[#17211B] mt-1">Optimal</div>
                </div>
              </div>
            </div>
            <div className="border-t border-[#E7ECE8] pt-4 mt-6 text-xs text-ink/50 font-mono">
              Last check: 10 minutes ago via IoT Node
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* 6.5 CARBON CREDIT PROGRAM (NEW Section & Signature Element) */
function CarbonCredits() {
  const [selectedPractices, setSelectedPractices] = useState<string[]>(["drip"]);
  const practices = [
    { id: "drip", name: "Drip Irrigation", desc: "Saves water and reduces pumping energy footprint.", value: 1.5 },
    { id: "tillage", name: "Zero Tillage", desc: "Keeps carbon locked deep in the soil structure.", value: 2.0 },
    { id: "bio", name: "Organic & Bio-Inputs", desc: "Cuts chemical nitrogen gas emissions.", value: 1.8 },
    { id: "burning", name: "No Residue Burning", desc: "Returns natural biomass back to the field.", value: 1.2 },
    { id: "cover", name: "Cover Cropping", desc: "Continually builds organic soil carbon levels.", value: 2.2 }
  ];

  const handleToggle = (id: string) => {
    setSelectedPractices(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const totalCredits = practices
    .filter(p => selectedPractices.includes(p.id))
    .reduce((sum, p) => sum + p.value, 0)
    .toFixed(1);

  const estimatedEarnings = Math.round(Number(totalCredits) * 1200);

  return (
    <section className="bg-white py-24 lg:py-32 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Info */}
        <div className="lg:col-span-6 text-left">
          <div className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">CARBON CREDITS</div>
          <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
            Earn Extra Income from Sustainable Practices
          </h2>
          <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[640px] mb-8">
            Good farming already saves carbon. Agaate helps you measure, verify, and monetise it — turning sustainable practices into a regular payout stream with no extra land.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="border-l border-[#E7ECE8] pl-4">
              <div className="text-xl font-bold font-mono text-[#17211B]">1 Carbon Credit</div>
              <div className="text-xs text-ink/50 mt-1">Earned per tonne of CO₂ reduced or stored.</div>
            </div>
            <div className="border-l border-[#E7ECE8] pl-4">
              <div className="text-xl font-bold font-mono text-[#17211B]">Full Verification</div>
              <div className="text-xs text-ink/50 mt-1">Measuring & verification handled directly on-app.</div>
            </div>
          </div>
        </div>

        {/* Right Column: Estimator Widget */}
        <div className="lg:col-span-6">
          <div className="bg-[#F8FAF7] border border-[#E7ECE8] rounded-2xl p-8 shadow-sm">
            <h3 className="font-mono text-[12px] uppercase tracking-wider text-forest font-bold mb-6">Practice Estimator Widget</h3>
            <div className="space-y-4 mb-8">
              {practices.map(p => {
                const isSelected = selectedPractices.includes(p.id);
                return (
                  <div 
                    key={p.id} 
                    onClick={() => handleToggle(p.id)}
                    className={`p-4 rounded-xl border cursor-pointer bg-white transition-all ${
                      isSelected ? "border-forest" : "border-[#E7ECE8] hover:border-forest/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                        isSelected ? "bg-forest border-forest text-cream" : "border-[#E7ECE8]"
                      }`}>{isSelected && "✓"}</div>
                      <div className="text-left">
                        <div className="font-sans font-bold text-[#17211B] text-[18px] md:text-[20px] leading-[1.3]">{p.name}</div>
                        <div className="text-xs text-ink/50 mt-0.5">{p.desc}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="bg-white rounded-xl p-5 border border-[#E7ECE8] flex justify-between items-center text-left">
              <div>
                <div className="text-xs text-ink/40 font-mono">ESTIMATED CREDITS</div>
                <div className="text-xl font-bold font-mono text-[#17211B] mt-1">{totalCredits} tCO₂/ha</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-ink/40 font-mono">ESTIMATED PAYOUT</div>
                <div className="text-xl font-bold font-mono text-forest mt-1">₹{estimatedEarnings.toLocaleString()}/yr</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* 7. AGRI-ENTREPRENEURSHIP AND BIG-FARM SETUP */
function CommercialFarming() {
  const steps = [
    { num: "01", title: "Land Planning & Layout", desc: "Site survey, soil mapping, and block layout." },
    { num: "02", title: "Infrastructure Build-out", desc: "Drip lines, fertigation systems, and polyhouses." },
    { num: "03", title: "Inputs at Scale", desc: "Bulk seeds, bio-boosted nursery, and fertilizers." },
    { num: "04", title: "Operations & Manpower", desc: "Labour schedules, daily SOPs, and logging." },
    { num: "05", title: "Cost & ROI Planning", desc: "Phased budgets, profit projections, and cash flow." },
    { num: "06", title: "Ongoing Management", desc: "Agronomy support, alerts, and market linkage." }
  ];

  return (
    <section className="bg-white py-24 lg:py-32 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Commercial Farm Image */}
        <div className="lg:col-span-5 text-left">
          <div className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">COMMERCIAL FARMING</div>
          <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
            Build and Scale Your Agricultural Venture
          </h2>
          <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[640px] mb-8">
            From empty land to a fully productive commercial farm — Agaate plans, builds, and runs large-scale vegetable operations end-to-end.
          </p>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#E7ECE8]">
            <img src={agroPark} alt="Commercial big farm setup" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Right Column: Service List */}
        <div className="lg:col-span-7 space-y-6 lg:mt-16">
          {steps.map((s, i) => (
            <div key={i} className="border-b border-[#E7ECE8] pb-4 flex gap-4 items-start text-left">
              <span className="font-mono text-xs text-terracotta font-semibold mt-1">{s.num}</span>
              <div>
                <h3 className="font-sans font-bold text-[#17211B] text-[18px] md:text-[20px] leading-[1.3]">{s.title}</h3>
                <p className="text-[#667069] text-[15px] md:text-[16px] leading-[1.6] mt-1">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* 8. FARMER TESTIMONIALS */
function Testimonials() {
  const reviews = [
    { name: "Ramesh Patel", place: "Anand, Gujarat", crop: "Tomatoes", quote: "Agaate caught a fungal issue early. My tomato crop quality has never been better and yield is up 25%.", img: t1 },
    { name: "Lakshmi Devi", place: "Warangal, Telangana", crop: "Chilli", quote: "The nursery saplings establish far better. Sourcing fertilizers is transparent and on time.", img: t2 },
    { name: "Arjun Singh", place: "Ludhiana, Punjab", crop: "Cabbage", quote: "With stage-wise harvest advice, we achieved better pricing and direct institutional buyers.", img: t3 }
  ];

  return (
    <section className="bg-white py-24 lg:py-32 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <div className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">TRUSTED BY FARMERS</div>
          <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em]">Trusted by Farmers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="border border-[#E7ECE8] rounded-2xl p-8 flex flex-col justify-between text-left hover:border-forest/20 transition-colors">
              <p className="text-[#17211B] text-[20px] md:text-[24px] font-normal leading-[1.5] tracking-[-0.01em] mb-8">"{r.quote}"</p>
              <div className="flex items-center gap-4 pt-6 border-t border-[#E7ECE8]">
                <img src={r.img} alt={r.name} className="w-12 h-12 rounded-full object-cover border border-[#E7ECE8]" />
                <div>
                  <div className="font-sans font-bold text-[#17211B] text-[16px]">{r.name}</div>
                  <div className="text-[#59635D] text-[14px] mt-0.5">{r.place} • <span className="text-forest font-mono">{r.crop}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 9. MARKET ACCESS */
function MarketAccess() {
  return (
    <section className="bg-white py-24 lg:py-32 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Image */}
        <div className="lg:col-span-6">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#E7ECE8]">
            <img src={heroPlant} alt="Harvest vegetables moving to market" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Right Column: Info */}
        <div className="lg:col-span-6 text-left">
          <div className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">MARKET ACCESS</div>
          <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
            Grow better. Harvest at the right time. Reach the right market.
          </h2>
          <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[640px] mb-8">
            Agaate coordinates direct buyer integrations and grading standards to minimize price risk and crop waste after the harvest.
          </p>
          
          <div className="space-y-4">
            {[
              { title: "Better Pricing", desc: "Direct integration with institutional channels." },
              { title: "Direct Market Linkage", desc: "Structured harvesting aligned with current market demand." },
              { title: "Quality Standards", desc: "Grading and sorting standards to match buyer specifications." }
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-forest font-bold mt-0.5">•</span>
                <div className="text-[15px] md:text-[16px] leading-[1.6]">
                  <span className="font-sans font-bold text-[#17211B] mr-2">{benefit.title}</span>
                  <span className="text-[#667069]">— {benefit.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

/* 10. AGRI PARK */
function AgriPark() {
  const zones = ["Seed", "Nursery", "Irrigation", "Nutrition", "Crop Protection", "Technology", "Training", "Market"];
  return (
    <section id="park-section" className="bg-[#F8FAF7] py-24 lg:py-32 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Info & Zones */}
        <div className="lg:col-span-5 text-left">
          <div className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">AGRI PARK</div>
          <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em] mb-6">
            Agaate Integrated Agri Park
          </h2>
          <p className="text-[#59635D] text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[640px] mb-8">
            A single living farm where India's leading seed, irrigation, nutrition, protection, and machinery partners come together. See products perform on real crops before making any farm input decisions.
          </p>
          
          <div>
            <div className="text-[12px] uppercase font-mono tracking-[0.1em] text-ink/40 mb-3 font-semibold">Park Zones</div>
            <div className="flex flex-wrap gap-2">
              {zones.map((z, idx) => (
                <span key={idx} className="px-3 py-1 bg-white border border-[#E7ECE8] rounded-full text-xs text-ink/70 font-mono">
                  {z}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Agri Park Image */}
        <div className="lg:col-span-7">
          <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-[#E7ECE8]">
            <img src={agroPark} alt="Agaate Agri Park layout" className="w-full h-full object-cover" />
          </div>
        </div>

      </div>
    </section>
  );
}

/* 11. FINAL CALL-TO-ACTION SECTION */
function CTA() {
  return (
    <section id="cta-section" className="bg-forest-deep py-24 lg:py-32 px-6 lg:px-12 text-cream text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] font-bold mb-6 leading-[1.1] tracking-[-0.03em]">
          Ready to grow with confidence?
        </h2>
        <p className="text-cream/80 text-[16px] md:text-[18px] font-normal leading-[1.7] max-w-[640px] mx-auto mb-10">
          From choosing the right seed to reaching the right market, Agaate supports your complete crop journey.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="tel:9487263498"
            className="rounded-full bg-yellow-400 text-forest-deep hover:bg-white hover:text-forest-deep px-8 py-4 text-[15px] md:text-[16px] font-semibold tracking-[-0.005em] transition-colors"
          >
            Start Your Journey
          </a>
          <button className="rounded-full border border-cream/20 hover:border-cream/50 px-8 py-4 text-[15px] md:text-[16px] font-semibold tracking-[-0.005em] transition-colors">
            Talk to an Expert
          </button>
        </div>
      </div>
    </section>
  );
}

function Index() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <main className="bg-white text-ink antialiased">
        <Header />
        <Hero />
        <PlantJourney />
        <Introduction />
        <ProblemSolution />
        <Mall />
        <AgriTech />
        <CarbonCredits />
        <CommercialFarming />
        <Testimonials />
        <MarketAccess />
        <AgriPark />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
