import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18n";
import { LanguageSwitcher } from "./common/LanguageSwitcher";

const navStructure = [
  { key: "home", href: "/" },
  {
    key: "services",
    href: "/services",
    subLinks: [
      { key: "nursery", href: "/services/nursery" },
      { key: "kisaanMall", href: "/services/kisaan-mall" },
      { key: "farmTech", href: "/services/farm-tech" },
      { key: "carbonCredits", href: "/services/carbon-credits" },
      { key: "bigFarmSetup", href: "/services/big-farm-setup" },
      { key: "marketLinkage", href: "/services/market-linkage" },
    ],
  },
  { key: "agriPark", href: "/agri-park" },
  { key: "community", href: "/community" },
  { key: "about", href: "/about" },
  { key: "careers", href: "/careers" },
];

export default function Header() {
  const { t, i18n } = useTranslation("common");
  const { locale } = useParams({ strict: false }) as any;
  const currentLang = locale ?? i18n.language ?? "en";

  const [scrolled, setScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  useEffect(() => {
    let ticking = false;
    const threshold = 50;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isOverThreshold = window.scrollY > threshold;
          setScrolled((prev) => (prev !== isOverThreshold ? isOverThreshold : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed top-0 left-0 z-50 flex w-full justify-center pt-2 md:pt-4">
      <header
        className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-in-out ${
          scrolled
            ? "w-[92%] max-w-5xl translate-y-1 rounded-full bg-[#14332b]/95 backdrop-blur-xl border border-white/10 px-6 shadow-2xl md:translate-y-0 md:px-8"
            : "w-[96%] max-w-7xl translate-y-0 rounded-2xl bg-transparent px-6 pt-4 md:px-10"
        }`}
        style={{ height: scrolled ? "60px" : "76px" }}
      >
        {/* Brand Logo */}
        <div className="flex shrink-0 items-center justify-start">
          <Link
            to={getLocalizedPath("/", currentLang) as any}
            className="flex items-center text-cream transition-opacity hover:opacity-80"
          >
            <img
              src="/logo.svg"
              alt="Agaate"
              className={`w-auto transition-all duration-500 ease-in-out ${
                scrolled ? "h-6 md:h-7" : "h-8 drop-shadow-md md:h-9"
              }`}
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav
          className={`hidden items-center justify-center transition-all duration-500 ease-in-out lg:flex ${
            scrolled ? "gap-6" : "gap-7"
          }`}
        >
          {navStructure.map((link) => (
            <div
              key={link.key}
              className="relative"
              onMouseEnter={() => setHoveredMenu(link.key)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link
                to={getLocalizedPath(link.href, currentLang) as any}
                className={`whitespace-nowrap flex items-center gap-1 font-body text-[15px] font-medium transition-colors hover:text-[#c8e3d4] ${
                  scrolled ? "text-cream/90" : "text-cream drop-shadow-md"
                }`}
              >
                {t(`nav.${link.key}` as any)}
                {link.subLinks && <ChevronDown className="h-3.5 w-3.5 opacity-70" />}
              </Link>

              {link.subLinks && hoveredMenu === link.key && (
                <div className="absolute left-1/2 top-full w-48 -translate-x-1/2 pt-4">
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-[#14332b]/95 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.href}
                        to={getLocalizedPath(subLink.href, currentLang) as any}
                        className="block whitespace-nowrap rounded-lg px-3 py-2 text-sm text-cream/80 transition-colors hover:bg-white/10 hover:text-cream"
                      >
                        {t(`servicesSub.${subLink.key}` as any)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Actions: Language Switcher & Contact Button */}
        <div className="flex shrink-0 items-center justify-end gap-3 md:gap-4">
          <LanguageSwitcher />

          <Link
            to={getLocalizedPath("/contact", currentLang) as any}
            className={`whitespace-nowrap shrink-0 group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-body font-bold text-[#091e17] bg-[#a3e635] hover:bg-[#8ee01d] transition-all duration-300 shadow-[0_0_20px_rgba(163,230,53,0.35)] hover:shadow-[0_0_25px_rgba(163,230,53,0.55)] hover:scale-[1.02] active:scale-95 ${
              scrolled ? "px-4 py-2 text-xs" : "px-5 py-2.5 text-sm"
            }`}
          >
            {/* Glossy shimmer shine effect */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

            <span className="relative z-10">{t("nav.contactUs")}</span>
            <ArrowRight
              className={`relative z-10 transition-transform duration-300 group-hover:translate-x-1 ${
                scrolled ? "h-3.5 w-3.5" : "h-4 w-4"
              }`}
            />
          </Link>
        </div>
      </header>
    </div>
  );
}
