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
    quote: "Agaate's Bio-Boosted nursery plug seedlings gave us 98% survival. My input cost dropped by 40%.",
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
    quote: "Doorstep delivery in 24 hours with QR batch tracking. Highest tomato harvest our farm has ever recorded.",
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
    quote: "Visiting the 17-acre Agri Park before installing my drip fertigation kit eliminated all guesswork.",
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
    quote: "Agronomist field visits and stage-wise spray charts saved us ₹85,000 on unnecessary pesticides.",
    thumbnail: "/farm.png",
    videoUrl: "/hero1.mp4",
  },
  {
    id: "short-5",
    name: "Pankaj Gupta",
    role: "Capsicum Farmer",
    location: "Karnal, Haryana",
    acres: "12 Acres",
    quote: "Batch-verified Bio-Cure biologicals from Agaate Mall stopped bacterial wilt across my 12-acre polyhouse.",
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
    quote: "Direct institutional market linkage gave us guaranteed price contracts with zero middleman deductions.",
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
    quote: "अगाते की बायो-बूस्टेड नर्सरी पौध का 98% जमाव रहा। सीधी बुवाई के मुकाबले लागत 40% कम हो गई।",
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
    quote: "24 घंटे में खेत तक असली इनपुट्स की डिलीवरी और क्यूआर कोड से जांच। इस बार टमाटर का रिकॉर्ड उत्पादन मिला।",
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
    quote: "17 एकड़ के एग्री पार्क में ड्रिप और खाद का असर लाइव देखने के बाद खेत में लगाया। बिना किसी दुविधा के शानदार परिणाम मिला।",
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
    quote: "कृषि वैज्ञानिकों के सीधे खेत दौरे और सही स्प्रे चार्ट से इस सीजन हमारे ₹85,000 के अनावश्यक कीटनाशक बच गए।",
    thumbnail: "/farm.png",
    videoUrl: "/hero1.mp4",
  },
  {
    id: "short-5",
    name: "पंकज गुप्ता",
    role: "शिमला मिर्च उत्पादक",
    location: "करनाल, हरियाणा",
    acres: "12 एकड़",
    quote: "अगाते किसान मॉल की बायो-दवाओं से 12 एकड़ पॉलीहाउस में उकठा (Wilt) रोग तुरंत रुक गया और फसल बच गई।",
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
    quote: "सीधे खरीदारों से पक्का बायबैक अनुबंध मिलने से बिना किसी आढ़तिया कमीशन के पूरी फसल का सही दाम मिला।",
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

  const handleOpenShort = (short: FarmerShort) => {
    setActiveModalShort(short);
  };

  const handleNextModalShort = () => {
    if (!activeModalShort) return;
    const currentIndex = shortsData.findIndex((s) => s.id === activeModalShort.id);
    const nextIndex = (currentIndex + 1) % shortsData.length;
    setActiveModalShort(shortsData[nextIndex]);
  };

  const handlePrevModalShort = () => {
    if (!activeModalShort) return;
    const currentIndex = shortsData.findIndex((s) => s.id === activeModalShort.id);
    const prevIndex = (currentIndex - 1 + shortsData.length) % shortsData.length;
    setActiveModalShort(shortsData[prevIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModalShort) return;
      if (e.key === "Escape") setActiveModalShort(null);
      if (e.key === "ArrowRight") handleNextModalShort();
      if (e.key === "ArrowLeft") handlePrevModalShort();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalShort]);

  return (
    <div className="space-y-4">
      {/* ── 1. Compact Full-Width Top Header ── */}
      <div className="space-y-1.5 max-w-4xl">
        <div className="flex items-center gap-2.5">
          <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
            {isHindi ? "किसान अनुभव व वीडियो शॉर्ट्स" : "Farmer Stories & Video Shorts"}
          </p>
        </div>

        <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#143d31] tracking-tight leading-tight">
          {isHindi ? "खेत से सीधे किसानों की वास्तविक आवाज" : "Real Farmers. Real Ground Results."}
        </h2>
      </div>

      {/* ── 2. Split Content: Snug Left Column & Right Video Track ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center pt-1">
        {/* Left Subtext & Narrative Anchor (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <p className="font-sans text-[#4f624f] text-xs sm:text-sm leading-relaxed">
            {isHindi
              ? "हरियाणा और एनसीआर के अगाते परिवार किसानों के वास्तविक वीडियो अनुभव — नर्सरी पौध जमाव, सटीक खाद और सीधी बिक्री के वास्तविक नतीजे।"
              : "Watch authentic video shorts from progressive growers across Haryana & NCR sharing their lived results on survival rates and crop yield."}
          </p>

          {/* Compact Hairline Impact Numbers */}
          <div className="border-y border-[#143d31]/10 py-3 grid grid-cols-2 gap-3 font-sans">
            <div>
              <p className="font-display text-xl sm:text-2xl font-bold text-[#143d31] tracking-tight">
                98%
              </p>
              <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                {isHindi ? "पौध जमाव दर" : "Plug Survival"}
              </p>
            </div>
            <div className="border-l border-[#143d31]/10 pl-3">
              <p className="font-display text-xl sm:text-2xl font-bold text-[#143d31] tracking-tight">
                2,000+
              </p>
              <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                {isHindi ? "जुड़े किसान" : "Farmers Enrolled"}
              </p>
            </div>
          </div>

          {/* Bottom Actions: Navigation Arrows + Link */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#143d31]/15 bg-white text-[#143d31] hover:bg-[#143d31] hover:text-white transition-colors cursor-pointer shadow-xs"
              >
                <CaretLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#143d31]/15 bg-white text-[#143d31] hover:bg-[#143d31] hover:text-white transition-colors cursor-pointer shadow-xs"
              >
                <CaretRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <a
              href="https://wa.me/918350085005?text=Namaste%20Agaate%20Team%2C%20I%20want%20to%20share%20my%20farm%20story."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#143d31] hover:text-[#5d7d37] transition-colors"
            >
              <span>{isHindi ? "अपनी कहानी साझा करें" : "Share Your Story"}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Right Horizontal Scrolling Video Reels (8 Cols) */}
        <div className="lg:col-span-8 min-w-0 relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 pt-1 snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: "none" }}
          >
            {shortsData.map((short) => (
              <div
                key={short.id}
                onClick={() => handleOpenShort(short)}
                className="group relative w-[190px] sm:w-[210px] md:w-[220px] shrink-0 h-[290px] sm:h-[310px] rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 snap-start border border-[#143d31]/15 bg-[#143d31]"
              >
                {/* Poster Image */}
                <img
                  src={short.thumbnail}
                  alt={short.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/25" />

                {/* Center Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white shadow-md group-hover:scale-110 group-hover:bg-[#a3e635] group-hover:text-[#143d31] transition-all duration-200">
                    <Play className="h-4 w-4 ml-0.5" weight="fill" />
                  </div>
                </div>

                {/* Bottom Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-3.5 z-10 space-y-1 text-white">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-display text-xs sm:text-sm font-bold text-white leading-tight truncate">
                        {short.name}
                      </p>
                      <CheckCircle className="h-3 w-3 text-[#a3e635] shrink-0" weight="fill" />
                    </div>
                    <p className="font-sans text-[10px] text-white/80 truncate">
                      {short.location} · {short.acres}
                    </p>
                  </div>

                  {/* Quote Snippet */}
                  <p className="font-sans text-[10px] sm:text-[11px] text-white/90 line-clamp-1 leading-tight font-normal italic pt-0.5">
                    "{short.quote}"
                  </p>

                  {/* Watch Action Pill */}
                  <div className="pt-0.5 flex items-center justify-between text-[10px] font-mono font-bold text-[#a3e635]">
                    <span className="group-hover:underline flex items-center gap-0.5">
                      {isHindi ? "वीडियो देखें" : "Watch Reel"} ▶
                    </span>
                    <span className="text-white/60 text-[9px] truncate max-w-[80px]">{short.role}</span>
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
                    {isMuted ? <SpeakerSlash className="h-3.5 w-3.5" /> : <SpeakerHigh className="h-3.5 w-3.5" />}
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
                      {activeModalShort.role} · {activeModalShort.location} ({activeModalShort.acres})
                    </p>
                  </div>

                  <p className="font-sans text-xs text-white/95 leading-relaxed italic bg-black/40 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                    "{activeModalShort.quote}"
                  </p>

                  {/* Connect with Agronomist Action */}
                  <div className="pt-0.5">
                    <a
                      href={`https://wa.me/918350085005?text=Hello%20Agaate%20Team%2C%20I%20saw%20${encodeURIComponent(
                        activeModalShort.name
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
