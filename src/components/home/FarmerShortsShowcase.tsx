import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CaretLeft,
  CaretRight,
  Play,
  X,
  CheckCircle,
  WhatsappLogo,
  SpeakerHigh,
  SpeakerSlash,
  ArrowUpRight,
  Star,
  ShieldCheck,
} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { EASE } from "@/components/common/motion";

export interface FarmerShort {
  id: string;
  name: string;
  role: string;
  location: string;
  acres: string;
  quote: string;
  thumbnail: string;
  videoUrl?: string;
}

const SHORTS_DATA_EN: FarmerShort[] = [
  {
    id: "short-1",
    name: "Rajesh Yadav",
    role: "Lead Chilli Grower",
    location: "Rewari, Haryana",
    acres: "18 Acres",
    quote:
      "Agaate's Bio-Boosted nursery plug seedlings gave us 98% survival. My input cost dropped by 40%.",
    thumbnail:
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80",
    videoUrl: "/hero1.mp4",
  },
  {
    id: "short-2",
    name: "Sunita Devi",
    role: "Agri-Entrepreneur",
    location: "Sonipat, Haryana",
    acres: "15 Acres",
    quote:
      "Doorstep delivery in 24 hours with QR batch tracking. Highest tomato harvest our farm has ever recorded.",
    thumbnail:
      "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80",
    videoUrl: "/hero1.mp4",
  },
  {
    id: "short-3",
    name: "Rameshwar Singh",
    role: "Vegetable Grower",
    location: "Kukrola, Gurugram",
    acres: "8 Acres",
    quote:
      "Visiting the 17-acre Agri Park before installing my drip fertigation kit eliminated all guesswork.",
    thumbnail:
      "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80",
    videoUrl: "/hero1.mp4",
  },
  {
    id: "short-4",
    name: "Vikramaditya Rao",
    role: "Horticulture Specialist",
    location: "Rohtak, Haryana",
    acres: "25 Acres",
    quote:
      "Agronomist field visits and stage-wise spray charts saved us ₹85,000 on unnecessary pesticides.",
    thumbnail: "/farm.png",
    videoUrl: "/hero1.mp4",
  },
  {
    id: "short-5",
    name: "Pankaj Gupta",
    role: "Capsicum Farmer",
    location: "Karnal, Haryana",
    acres: "12 Acres",
    quote:
      "Batch-verified Bio-Cure biologicals from Agaate Mall stopped bacterial wilt across my 12-acre polyhouse.",
    thumbnail:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80",
    videoUrl: "/hero1.mp4",
  },
  {
    id: "short-6",
    name: "Abhay Ranjan",
    role: "Agaate Parivaar",
    location: "Farrukhnagar, Haryana",
    acres: "10 Acres",
    quote:
      "Direct institutional market linkage gave us guaranteed price contracts with zero middleman deductions.",
    thumbnail: "/about-hero-nursery.png",
    videoUrl: "/hero1.mp4",
  },
];

const SHORTS_DATA_HI: FarmerShort[] = [
  {
    id: "short-1",
    name: "राजेश यादव",
    role: "प्रमुख मिर्च उत्पादक",
    location: "रेवाड़ी, हरियाणा",
    acres: "18 एकड़",
    quote:
      "अगाते की बायो-बूस्टेड नर्सरी पौध का 98% जमाव रहा। सीधी बुवाई के मुकाबले लागत 40% कम हो गई।",
    thumbnail:
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80",
    videoUrl: "/hero1.mp4",
  },
  {
    id: "short-2",
    name: "सुनीता देवी",
    role: "महिला कृषि उद्यमी",
    location: "सोनीपत, हरियाणा",
    acres: "15 एकड़",
    quote:
      "24 घंटे में खेत तक असली इनपुट्स की डिलीवरी और क्यूआर कोड से जांच। इस बार टमाटर का रिकॉर्ड उत्पादन मिला।",
    thumbnail:
      "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80",
    videoUrl: "/hero1.mp4",
  },
  {
    id: "short-3",
    name: "रामेश्वर सिंह",
    role: "सब्जी उत्पादक",
    location: "कुकरोला, गुरुग्राम",
    acres: "8 एकड़",
    quote:
      "17 एकड़ के एग्री पार्क में ड्रिप और खाद का असर लाइव देखने के बाद खेत में लगाया। बिना किसी दुविधा के शानदार परिणाम मिला।",
    thumbnail:
      "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80",
    videoUrl: "/hero1.mp4",
  },
  {
    id: "short-4",
    name: "विक्रमादित्य राव",
    role: "उद्यानिकी विशेषज्ञ",
    location: "रोहतक, हरियाणा",
    acres: "25 एकड़",
    quote:
      "कृषि वैज्ञानिकों के सीधे खेत दौरे और सही स्प्रे चार्ट से इस सीजन हमारे ₹85,000 के अनावश्यक कीटनाशक बच गए।",
    thumbnail: "/farm.png",
    videoUrl: "/hero1.mp4",
  },
  {
    id: "short-5",
    name: "पंकज गुप्ता",
    role: "शिमला मिर्च उत्पादक",
    location: "करनाल, हरियाणा",
    acres: "12 एकड़",
    quote:
      "अगाते किसान मॉल की बायो-दवाओं से 12 एकड़ पॉलीहाउस में उकठा (Wilt) रोग तुरंत रुक गया और फसल बच गई।",
    thumbnail:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80",
    videoUrl: "/hero1.mp4",
  },
  {
    id: "short-6",
    name: "अभय रंजन",
    role: "अगाते परिवार सदस्य",
    location: "फारुखनगर, हरियाणा",
    acres: "10 एकड़",
    quote:
      "सीधे खरीदारों से पक्का बायबैक अनुबंध मिलने से बिना किसी आढ़तिया कमीशन के पूरी फसल का सही दाम मिला।",
    thumbnail: "/about-hero-nursery.png",
    videoUrl: "/hero1.mp4",
  },
];

export default function FarmerShortsShowcase() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");
  const shortsData = isHindi ? SHORTS_DATA_HI : SHORTS_DATA_EN;

  const [activeModalShort, setActiveModalShort] = useState<FarmerShort | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.7;
      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleOpenShort = useCallback((short: FarmerShort) => {
    setActiveModalShort(short);
  }, []);

  const handleNextModalShort = useCallback(() => {
    if (!activeModalShort) return;
    const currentIndex = shortsData.findIndex((s) => s.id === activeModalShort.id);
    const nextIndex = (currentIndex + 1) % shortsData.length;
    setActiveModalShort(shortsData[nextIndex] ?? null);
  }, [activeModalShort, shortsData]);

  const handlePrevModalShort = useCallback(() => {
    if (!activeModalShort) return;
    const currentIndex = shortsData.findIndex((s) => s.id === activeModalShort.id);
    const prevIndex = (currentIndex - 1 + shortsData.length) % shortsData.length;
    setActiveModalShort(shortsData[prevIndex] ?? null);
  }, [activeModalShort, shortsData]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModalShort) return;
      if (e.key === "Escape") setActiveModalShort(null);
      if (e.key === "ArrowRight") handleNextModalShort();
      if (e.key === "ArrowLeft") handlePrevModalShort();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalShort, handleNextModalShort, handlePrevModalShort]);

  return (
    <div className="space-y-6">
      {/* ── 1. Header with Title on Left & Carousel Controls on Right ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
              {isHindi ? "किसान अनुभव व वीडियो शॉर्ट्स" : "Farmer Stories & Video Shorts"}
            </p>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#143d31] tracking-tight leading-[1.1]">
            {isHindi
              ? "खेत से सीधे किसानों की वास्तविक आवाज"
              : "Real Farmers. Real Ground Results."}
          </h2>
        </div>

        {/* Top Right Actions: Carousel Controls & WhatsApp Share */}
        <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0">
          <div className="flex items-center gap-1 bg-white border border-[#143d31]/15 rounded-full p-1 shadow-xs">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#143d31] hover:bg-[#143d31] hover:text-white transition-colors cursor-pointer"
            >
              <CaretLeft className="h-4 w-4" />
            </button>
            <span className="h-3.5 w-px bg-[#143d31]/15" />
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#143d31] hover:bg-[#143d31] hover:text-white transition-colors cursor-pointer"
            >
              <CaretRight className="h-4 w-4" />
            </button>
          </div>

          <a
            href="https://wa.me/918350085005?text=Namaste%20Agaate%20Team%2C%20I%20want%20to%20share%20my%20farm%20story."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#143d31] px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#1a4d3e] transition-all cursor-pointer"
          >
            <WhatsappLogo className="h-4 w-4 text-[#a3e635]" weight="fill" />
            <span>{isHindi ? "अपनी कहानी साझा करें" : "Share Your Story"}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* ── 2. Split Content: Subtexts/Metrics on Left & Video Track on Right ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Subtext, Ground Proof & Social Trust (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <p className="font-sans text-[#4f624f] text-base md:text-[17px] leading-relaxed font-normal">
            {isHindi
              ? "हरियाणा और एनसीआर के प्रगतिशील किसानों के वास्तविक वीडियो अनुभव — बायो-बूस्टेड नर्सरी पौध जमाव, सटीक खाद और सीधी बिक्री के वास्तविक नतीजे।"
              : "Watch authentic video shorts from progressive growers across Haryana & NCR sharing their lived results on survival rates, crop yield, and input savings."}
          </p>

          {/* 2x2 Impact Numbers Matrix Card */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white border border-[#143d31]/10 shadow-xs">
            <div className="space-y-0.5">
              <p className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                98%
              </p>
              <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider">
                {isHindi ? "पौध जमाव दर" : "Plug Survival"}
              </p>
              <p className="font-sans text-[11px] text-[#4f624f]/80">
                {isHindi ? "बायो-बूस्टेड प्लग पौध" : "Bio-boosted seedlings"}
              </p>
            </div>

            <div className="space-y-0.5 border-l border-[#143d31]/10 pl-3">
              <p className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                2,000+
              </p>
              <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider">
                {isHindi ? "जुड़े किसान" : "Farmers Enrolled"}
              </p>
              <p className="font-sans text-[11px] text-[#4f624f]/80">
                {isHindi ? "हरियाणा व एनसीआर क्षेत्र" : "Across North India"}
              </p>
            </div>

            <div className="space-y-0.5 border-t border-[#143d31]/10 pt-2.5">
              <p className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                ₹85K+
              </p>
              <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider">
                {isHindi ? "औसत बचत / सीजन" : "Avg. Saved / Season"}
              </p>
              <p className="font-sans text-[11px] text-[#4f624f]/80">
                {isHindi ? "अनावश्यक स्प्रे पर बचत" : "Reduced input waste"}
              </p>
            </div>

            <div className="space-y-0.5 border-t border-l border-[#143d31]/10 pt-2.5 pl-3">
              <p className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                15,000+
              </p>
              <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider">
                {isHindi ? "एकड़ निगरानी" : "Acres Monitored"}
              </p>
              <p className="font-sans text-[11px] text-[#4f624f]/80">
                {isHindi ? "वैज्ञानिक फील्ड विजिट्स" : "Agronomist visits"}
              </p>
            </div>
          </div>

          {/* Farmer Community Social Proof / Rating Strip */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/80 border border-[#143d31]/10 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="flex -space-x-2 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=120&q=80"
                  alt="Rajesh Yadav"
                  className="h-7 w-7 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=120&q=80"
                  alt="Sunita Devi"
                  className="h-7 w-7 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=120&q=80"
                  alt="Rameshwar Singh"
                  className="h-7 w-7 rounded-full border-2 border-white object-cover"
                />
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#143d31] text-[9px] font-bold text-white">
                  +2k
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-amber-500" weight="fill" />
                  ))}
                  <span className="font-mono text-[11px] font-bold text-[#143d31] ml-0.5">
                    4.9 / 5
                  </span>
                </div>
                <p className="font-sans text-[11px] text-[#4f624f]">
                  {isHindi ? "प्रगतिशील किसानों का भरोसा" : "Verified Farmer Trust"}
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 rounded-full bg-[#5d7d37]/15 px-2.5 py-1 font-mono text-[10px] font-bold text-[#3e5920]">
              <ShieldCheck className="h-3 w-3 text-[#5d7d37]" weight="fill" />
              <span>{isHindi ? "सत्यापित" : "Field Verified"}</span>
            </span>
          </div>
        </div>

        {/* Right Horizontal Scrolling Video Reels (7 Cols) */}
        <div className="lg:col-span-7 min-w-0 relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto pb-2 pt-0.5 snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: "none" }}
          >
            {shortsData.map((short) => (
              <div
                key={short.id}
                onClick={() => handleOpenShort(short)}
                className="group relative w-[210px] sm:w-[230px] md:w-[240px] shrink-0 h-[350px] sm:h-[370px] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 snap-start border border-[#143d31]/15 bg-[#143d31]"
              >
                {/* Poster Image */}
                <img
                  src={short.thumbnail}
                  alt={short.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />

                {/* Center Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white shadow-md group-hover:scale-110 group-hover:bg-[#a3e635] group-hover:text-[#143d31] transition-all duration-200">
                    <Play className="h-5 w-5 ml-0.5" weight="fill" />
                  </div>
                </div>

                {/* Bottom Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4 z-10 space-y-1 text-white">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-display text-sm font-bold text-white leading-tight truncate">
                        {short.name}
                      </p>
                      <CheckCircle className="h-3 w-3 text-[#a3e635] shrink-0" weight="fill" />
                    </div>
                    <p className="font-sans text-[10px] text-white/80 truncate">
                      {short.location} · {short.acres}
                    </p>
                  </div>

                  {/* Quote Snippet */}
                  <p className="font-sans text-[11px] text-white/90 line-clamp-1 leading-snug font-normal italic pt-0.5">
                    "{short.quote}"
                  </p>

                  {/* Watch Action Pill */}
                  <div className="pt-1 flex items-center justify-between text-[10px] font-mono font-bold text-[#a3e635]">
                    <span className="group-hover:underline flex items-center gap-0.5">
                      {isHindi ? "वीडियो देखें" : "Watch Reel"} ▶
                    </span>
                    <span className="text-white/60 text-[9px]">{short.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Fullscreen Interactive Shorts Video Modal ── */}
      <AnimatePresence>
        {activeModalShort && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="relative w-full max-w-[380px] aspect-[9/16] max-h-[82vh] rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/15 flex flex-col justify-between"
            >
              {/* Video Player Element */}
              <div className="relative w-full h-full">
                {activeModalShort.videoUrl ? (
                  <video
                    src={activeModalShort.videoUrl}
                    poster={activeModalShort.thumbnail}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={activeModalShort.thumbnail}
                    alt={activeModalShort.name}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Ambient Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60 pointer-events-none" />

                {/* Top Control Bar */}
                <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-white/20 transition-colors"
                    aria-label="Toggle Sound"
                  >
                    {isMuted ? (
                      <SpeakerSlash className="h-3.5 w-3.5" />
                    ) : (
                      <SpeakerHigh className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModalShort(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-white/20 transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Modal Navigation Arrows (Left/Right) */}
                <button
                  type="button"
                  onClick={handlePrevModalShort}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
                  aria-label="Previous story"
                >
                  <CaretLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextModalShort}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
                  aria-label="Next story"
                >
                  <CaretRight className="h-4 w-4" />
                </button>

                {/* Bottom Story Card Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-5 z-20 space-y-2.5 text-white">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-display text-base font-bold text-white">
                        {activeModalShort.name}
                      </p>
                      <CheckCircle className="h-3.5 w-3.5 text-[#a3e635]" weight="fill" />
                    </div>
                    <p className="font-sans text-xs text-white/80">
                      {activeModalShort.role} · {activeModalShort.location} (
                      {activeModalShort.acres})
                    </p>
                  </div>

                  <p className="font-sans text-xs text-white/95 leading-relaxed italic bg-black/40 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                    "{activeModalShort.quote}"
                  </p>

                  {/* Connect with Agronomist Action */}
                  <div className="pt-0.5">
                    <a
                      href={`https://wa.me/918350085005?text=Hello%20Agaate%20Team%2C%20I%20saw%20${encodeURIComponent(
                        activeModalShort.name,
                      )}%27s%20story%20and%20want%20to%20learn%20more.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#a3e635] px-4 py-2.5 text-xs font-bold text-[#143d31] hover:bg-[#b5f247] transition-all cursor-pointer shadow-md"
                    >
                      <WhatsappLogo className="h-4 w-4" />
                      <span>{isHindi ? "इस फसल के बारे में पूछें" : "Ask About This Crop"}</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
