import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";
import { ArchUpTransition } from "./SectionTransitions";
import { Star, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Section9() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftBoxRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      name: "Avinash Kumar",
      place: "Haryana Cluster",
      time: "June 2026",
      crop: "Bio-Boosted Nursery Customer",
      quote:
        "Outstanding seedling transplant uniformity. Out of 10,000 tomato seedlings we bought, we had less than 1% mortality. Root density was twice what we get locally.",
      img: t1,
    },
    {
      name: "Pankaj Gupta",
      place: "Gurugram Region",
      time: "May 2026",
      crop: "Kisaan Mall Customer",
      quote:
        "Agaate Kisan Mall has changed how we buy fertilizers. No duplicates, direct receipts, and custom agronomist prescriptions mapped to our soil report.",
      img: t2,
    },
    {
      name: "Sanjay Bhora",
      place: "Bhora Kalan Region",
      time: "April 2026",
      crop: "Carbon Credits Participant",
      quote:
        "Verified carbon credit payout received direct to my bank account. Our organic carbon conservation practices earned us ₹8,400 with zero hassle.",
      img: t3,
    },
  ];

  const getStepWidth = () => {
    if (!sliderRef.current || !sliderRef.current.children[0]) return 364;
    const firstCard = sliderRef.current.children[0] as HTMLElement;
    const cardWidth = firstCard.clientWidth;
    const gap = 24;
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
      gsap.fromTo(
        headerRef.current?.children || [],
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true },
        },
      );
      gsap.fromTo(
        leftBoxRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        },
      );
      gsap.fromTo(
        sliderRef.current?.children || [],
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "back.out(1.2)",
          scrollTrigger: { trigger: sliderRef.current, start: "top 88%", once: true },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <ArchUpTransition topColor="var(--bone)" bottomColor="#FFFFFF" />
      <section
        ref={sectionRef}
        className="bg-white py-20 md:py-28 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left"
      >
        {/* Subtle organic pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(var(--forest)_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header block */}
          <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto" ref={headerRef}>
            <span className="font-jet text-[11px] md:text-xs uppercase tracking-[0.22em] text-forest mb-4 block font-semibold">
              07 / Cultivator Trust
            </span>
            <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.08] text-forest-deep mb-4 tracking-tight">
              Reviews from real vegetable growers
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-forest-deep">
              <span className="font-mono text-base font-bold">4.9/5 Rating</span>
              <div className="flex items-center text-terracotta">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-[#59635D] text-xs font-normal">
                based on 1,420+ farmers in Bhora Kalan and regional districts.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Box controls */}
            <div className="lg:col-span-3 text-left sticky top-28" ref={leftBoxRef}>
              <span className="text-6xl leading-none font-serif text-[#C4CFC8] select-none block -mb-4">
                “
              </span>
              <h3 className="font-serif text-2xl text-forest-deep mb-8 font-semibold">
                What the community says
              </h3>

              {/* Sliders navigation */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrev}
                  aria-label="Previous review"
                  className="w-10 h-10 rounded-full border border-[#E7ECE8] hover:border-forest hover:bg-forest hover:text-cream text-forest flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex-1 h-[2px] bg-[#E7ECE8] relative rounded-full overflow-hidden">
                  <div
                    className="h-full bg-forest transition-all duration-300 rounded-full"
                    style={{ width: `${((currentIndex + 1) / reviews.length) * 100}%` }}
                  />
                </div>
                <button
                  onClick={handleNext}
                  aria-label="Next review"
                  className="w-10 h-10 rounded-full border border-[#E7ECE8] hover:border-forest hover:bg-forest hover:text-cream text-forest flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <span className="text-[10px] font-mono text-forest/40 mt-3 block">
                Drag or toggle arrows ({currentIndex + 1}/{reviews.length})
              </span>
            </div>

            {/* Slider track */}
            <div
              ref={sliderRef}
              onScroll={handleScroll}
              className="lg:col-span-9 flex gap-6 overflow-x-auto py-4 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
            >
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="w-[300px] sm:w-[350px] flex-shrink-0 snap-start flex flex-col justify-between group py-2"
                >
                  <div className="bg-bone rounded-[2rem] p-7 border border-[#E7ECE8] transition-all duration-300 relative flex flex-col justify-between min-h-[220px]">
                    <p className="text-forest-deep text-[15px] leading-relaxed mb-6 font-serif font-medium">
                      "{r.quote}"
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-[#E7ECE8]">
                      <div className="flex items-center text-terracotta">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-forest bg-forest/5 px-2.5 py-1 rounded border border-forest/10 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" /> Verified
                      </span>
                    </div>

                    {/* Bubble arrow */}
                    <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-bone absolute -bottom-[11px] left-8"></div>
                  </div>

                  {/* Customer details */}
                  <div className="mt-6 flex items-center gap-3.5 pl-4">
                    <img
                      src={r.img}
                      alt={r.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#E7ECE8] shadow-sm flex-shrink-0"
                    />
                    <div>
                      <div className="font-sans font-bold text-forest-deep text-[15px] leading-tight">
                        {r.name}
                      </div>
                      <div className="text-forest/60 text-xs mt-0.5 font-medium">
                        {r.place} ·{" "}
                        <span className="text-[10px] font-mono uppercase text-forest/40">
                          {r.crop}
                        </span>
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
