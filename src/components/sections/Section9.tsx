import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";
import farmerHands from "@/assets/farmer-hands.jpg";
import { ArchUpTransition } from "./SectionTransitions";

gsap.registerPlugin(ScrollTrigger);

/* 8. FARMER TESTIMONIALS (REVIEWS FROM REAL PEOPLE CAROUSEL) */
export default function Section9() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftBoxRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      name: "Ramesh Patel",
      place: "Anand, Gujarat",
      time: "2 days ago",
      crop: "Tomatoes & Capsicum",
      quote: "Agaate caught early blight on our tomato crop using their AI diagnosis before it spread. We saved ₹45,000 in fungicides and our net yield jumped by 25% this season.",
      img: t1
    },
    {
      name: "Lakshmi Devi",
      place: "Warangal, Telangana",
      time: "3 days ago",
      crop: "Chilli & Bhendi",
      quote: "The nursery saplings establish far faster with bio-inoculants. Sourcing water-soluble fertilizers through Kisaan Mall is transparent, genuine, and delivered right to our field.",
      img: t2
    },
    {
      name: "Arjun Singh",
      place: "Ludhiana, Punjab",
      time: "1 week ago",
      crop: "Cabbage & Cauliflower",
      quote: "With stage-wise harvest advice and direct institutional linkage, we stopped dumping produce at mandi distress prices. We get direct bank transfer within 24 hours.",
      img: t3
    },
    {
      name: "Sunita Kulkarni",
      place: "Nashik, Maharashtra",
      time: "1 week ago",
      crop: "Onion & Green Peas",
      quote: "Our drip irrigation grid planned by Agaate cut daily pumping hours from 8 hours down to 3. The automated fertigation schedule improved bulb size uniformity across 12 acres.",
      img: farmerHands
    },
    {
      name: "Devendra Sharma",
      place: "Karnal, Haryana",
      time: "2 weeks ago",
      crop: "Potato & Gourds",
      quote: "The carbon credit program is a game changer. We practiced zero tillage and cover cropping, and received an extra ₹38,000 annual payout just for farming sustainably.",
      img: t1
    },
    {
      name: "Priya Reddy",
      place: "Kolar, Karnataka",
      time: "2 weeks ago",
      crop: "Carrots & Beetroot",
      quote: "Agronomist weekly visits and soil testing recommendations meant we stopped over-applying urea. Soil health is restored and root coloration is top tier for export quality.",
      img: t2
    },
    {
      name: "Vikramsinh Jadeja",
      place: "Rajkot, Gujarat",
      time: "3 weeks ago",
      crop: "Brinjal & Ridge Gourd",
      quote: "Before Agaate, we lost 30% of harvested brinjal to post-harvest rot. Now with structured grading and cold-chain pickup right at our block, rejection rate is zero.",
      img: t3
    },
    {
      name: "Harjit Singh",
      place: "Amritsar, Punjab",
      time: "1 month ago",
      crop: "Green Peas & Beans",
      quote: "The seed trial demos at the Agri Park gave me total confidence before sowing. Disease resistance of the new hybrid pea varieties exceeded all our expectations.",
      img: farmerHands
    }
  ];

  const getStepWidth = () => {
    if (!sliderRef.current || !sliderRef.current.children[0]) return 364;
    const firstCard = sliderRef.current.children[0] as HTMLElement;
    const cardWidth = firstCard.clientWidth;
    const gap = 24; // gap-6 = 24px
    return cardWidth + gap;
  };

  const handlePrev = () => {
    if (!sliderRef.current) return;
    const step = getStepWidth();
    sliderRef.current.scrollBy({ left: -step, behavior: "smooth" });
  };

  const handleNext = () => {
    if (!sliderRef.current) return;
    const step = getStepWidth();
    sliderRef.current.scrollBy({ left: step, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const scrollLeft = sliderRef.current.scrollLeft;
    const step = getStepWidth();
    const newIdx = Math.round(scrollLeft / step);
    setCurrentIndex(Math.min(reviews.length - 1, Math.max(0, newIdx)));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current?.children || [],
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true } }
      );
      gsap.fromTo(leftBoxRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true } }
      );
      gsap.fromTo(sliderRef.current?.children || [],
        { opacity: 0, y: 35, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08, ease: "back.out(1.3)", scrollTrigger: { trigger: sliderRef.current, start: "top 88%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <ArchUpTransition topColor="#FFFFFF" bottomColor="#E3EBE6" />
      <section ref={sectionRef} className="bg-[#E3EBE6] py-24 lg:py-32 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
        {/* Decorative ambient dot pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#2D6A4F_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.05] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          
          {/* Top Header & Rating Score matching screenshot */}
          <div className="text-center mb-16 md:mb-20 max-w-4xl mx-auto" ref={headerRef}>
            <h2 className="font-display text-[36px] sm:text-[44px] md:text-[50px] lg:text-[56px] font-bold text-[#17211B] leading-[1.15] tracking-[-0.03em] mb-4">
              Reviews from <span className="underline decoration-forest/60 decoration-2 underline-offset-8">real vegetable growers</span>
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-sm sm:text-base font-semibold text-[#17211B]">
              <span className="font-bold text-lg font-mono">4.9/5</span>
              <div className="flex items-center text-emerald-600 tracking-wider text-lg">
                ★★★★★
              </div>
              <span className="font-mono font-bold text-forest bg-forest/10 border border-forest/20 px-3.5 py-1 rounded-full text-xs flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse"></span>
                AGAATE VERIFIED
              </span>
              <span className="text-[#59635D] text-xs sm:text-sm">Based on 1,420+ farmer check-ins across India</span>
            </div>
          </div>

          {/* Split Carousel Container: Left Quote Header & Arrows + Right Speech Bubble Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Box: Quote Icon & Controls */}
            <div className="lg:col-span-3 text-left sticky top-28 pr-2" ref={leftBoxRef}>
              <div className="text-[72px] sm:text-[84px] leading-none font-serif text-[#C4CFC8] select-none -mb-2">
                “
              </div>
              <h3 className="font-display text-[24px] sm:text-[28px] font-bold text-[#17211B] leading-[1.25] mb-8">
                What our vegetable growers are saying
              </h3>
              
              {/* Navigation Arrows & Progress Track */}
              <div className="flex items-center gap-4 max-w-[240px]">
                <button
                  onClick={handlePrev}
                  aria-label="Previous review"
                  className="w-11 h-11 rounded-full border border-[#C4CFC8] hover:border-forest hover:bg-forest hover:text-cream text-[#17211B] flex items-center justify-center transition-all duration-300 flex-shrink-0 shadow-sm text-lg"
                >
                  ←
                </button>
                <div className="flex-1 h-[3px] bg-[#C4CFC8]/60 relative rounded-full overflow-hidden">
                  <div
                    className="h-full bg-forest transition-all duration-300 rounded-full"
                    style={{ width: `${((currentIndex + 1) / reviews.length) * 100}%` }}
                  />
                </div>
                <button
                  onClick={handleNext}
                  aria-label="Next review"
                  className="w-11 h-11 rounded-full border border-[#C4CFC8] hover:border-forest hover:bg-forest hover:text-cream text-[#17211B] flex items-center justify-center transition-all duration-300 flex-shrink-0 shadow-sm text-lg"
                >
                  →
                </button>
              </div>
              <div className="text-xs font-mono text-ink/40 mt-3">
                Drag or use arrows to slide ({currentIndex + 1}/{reviews.length})
              </div>
            </div>

            {/* Right Track: Horizontal Scrolling Speech Bubble Carousel */}
            {/* px-4 and scroll-pl-4 ensure leftmost card never gets cropped or loses box shadow on scroll */}
            <div
              ref={sliderRef}
              onScroll={handleScroll}
              className="lg:col-span-9 flex gap-6 overflow-x-auto px-4 py-8 -my-8 scroll-pl-4 sm:scroll-pl-6 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
            >
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="w-[300px] sm:w-[340px] flex-shrink-0 snap-start flex flex-col justify-between group py-2"
                >
                  {/* Speech Bubble Card Container */}
                  <div className="bg-white rounded-[26px] p-6 sm:p-7 shadow-md hover:shadow-xl border border-[#E7ECE8] transition-all duration-300 relative flex flex-col justify-between min-h-[235px]">
                    <div>
                      <p className="text-[#17211B] text-[15px] sm:text-[16px] leading-[1.65] font-normal mb-6">
                        {r.quote}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-[#F0F4F1]">
                      <div className="flex items-center text-emerald-500 text-sm tracking-widest font-bold">
                        ★★★★★
                      </div>
                      <span className="text-[11px] font-mono font-bold text-forest bg-forest/[0.08] px-2.5 py-0.5 rounded">
                        {r.crop}
                      </span>
                    </div>

                    {/* Speech Bubble Downward Tail Pointer */}
                    <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[16px] border-t-white absolute -bottom-[15px] left-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.04)]"></div>
                  </div>

                  {/* Avatar, Name & Location / Time below Speech Bubble */}
                  <div className="mt-6 flex items-center gap-3.5 pl-5">
                    <img
                      src={r.img}
                      alt={r.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-forest/30 shadow-sm group-hover:scale-105 transition-transform flex-shrink-0"
                    />
                    <div>
                      <div className="font-sans font-bold text-[#17211B] text-[15px] leading-tight group-hover:text-forest transition-colors">
                        {r.name}
                      </div>
                      <div className="text-[#667069] text-xs mt-0.5 font-medium">
                        {r.place} • <span className="text-ink/50">{r.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>
    </>
  );
}



