import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkle, WhatsappLogo } from "@phosphor-icons/react";
import { UNIFIED_SERVICES_NAV } from "./services-unified-data";
import { WHATSAPP_CONSULTATION_URL } from "@/components/header/header-data";

interface ServicesNavDockProps {
  activeSection: string;
  onSectionClick: (id: string) => void;
  onOpenConsultation: () => void;
}

export function ServicesNavDock({
  activeSection,
  onSectionClick,
  onOpenConsultation,
}: ServicesNavDockProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 350);

      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (winHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / winHeight) * 100)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-20 z-40 w-full px-3 sm:px-6 py-2.5 transition-all duration-300">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`flex items-center justify-between gap-3 overflow-x-auto no-scrollbar rounded-2xl border p-2 backdrop-blur-xl transition-all duration-300 ${
            isSticky
              ? "border-[#143d31]/20 bg-[#143d31]/95 text-white shadow-[0_20px_50px_rgba(20,61,49,0.25)]"
              : "border-[#143d31]/10 bg-white/95 text-[#143d31] shadow-sm"
          }`}
        >
          {/* Progress Indicator */}
          <div className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-[#a3e635] transition-all duration-150 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Section Pills */}
          <div className="flex items-center gap-1.5 min-w-max">
            {UNIFIED_SERVICES_NAV.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;

              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => onSectionClick(sec.id)}
                  className={`group relative flex cursor-pointer items-center gap-2 rounded-xl px-3.5 py-2 font-mono text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? isSticky
                        ? "text-[#143d31]"
                        : "text-white"
                      : isSticky
                        ? "text-white/70 hover:bg-white/10 hover:text-white"
                        : "text-[#4f624f] hover:bg-[#143d31]/5 hover:text-[#143d31]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-services-dock-pill"
                      className={`absolute inset-0 rounded-xl shadow-md ${
                        isSticky ? "bg-[#a3e635]" : "bg-[#143d31]"
                      }`}
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <Icon
                    className={`relative z-10 h-4 w-4 transition-transform group-hover:scale-110 ${
                      isActive
                        ? isSticky
                          ? "text-[#143d31]"
                          : "text-[#a3e635]"
                        : isSticky
                          ? "text-[#a3e635]/80"
                          : "text-[#5d7d37]"
                    }`}
                  />
                  <span className="relative z-10 tracking-tight">{sec.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="hidden items-center gap-2 sm:flex shrink-0 pl-2">
            <a
              href={WHATSAPP_CONSULTATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl border border-[#a3e635]/30 bg-[#5d7d37]/20 px-3 py-1.5 font-mono text-[11px] font-bold text-[#a3e635] transition-colors hover:bg-[#5d7d37]/40"
            >
              <WhatsappLogo className="h-4 w-4 text-[#a3e635]" weight="fill" />
              <span>WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={onOpenConsultation}
              className={`flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-1.5 font-mono text-[11px] font-bold shadow-sm transition-all ${
                isSticky
                  ? "bg-[#5d7d37] text-white hover:bg-[#a3e635] hover:text-[#143d31]"
                  : "bg-[#143d31] text-white hover:bg-[#5d7d37]"
              }`}
            >
              <Sparkle className="h-3.5 w-3.5" />
              <span>Book Farm Audit</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
