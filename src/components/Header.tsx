import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link, useLocation, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getLocalizedPath, stripLocalePrefix } from "@/lib/i18n";
import { LanguageSwitcher } from "./common/LanguageSwitcher";

type NavItem = {
  key: string;
  href: string;
  subLinks?: { key: string; href: string }[];
};

const navStructure: NavItem[] = [
  { key: "about", href: "/about" },
  { key: "agriPark", href: "/agri-park" },
  {
    key: "offerings",
    href: "/services",
    subLinks: [
      { key: "services", href: "/services" },
      { key: "technology", href: "/technology" },
    ],
  },
  {
    key: "learn",
    href: "/knowledge-center",
    subLinks: [
      { key: "successStories", href: "/success-stories" },
      { key: "knowledgeCenter", href: "/knowledge-center" },
    ],
  },
];

export default function Header() {
  const { t, i18n } = useTranslation("common");
  const location = useLocation();
  const { locale } = useParams({ strict: false }) as any;
  const currentLang = locale ?? i18n.language ?? "en";

  const isHome = stripLocalePrefix(location.pathname) === "/";
  const [scrolled, setScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  // Solid dark bar on every light page; homepage stays transparent until scroll
  const solid = !isHome || scrolled;

  useEffect(() => {
    if (!isHome) {
      setScrolled(false);
      return;
    }

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

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <div className="pointer-events-none fixed top-0 left-0 z-50 flex w-full justify-center pt-2 md:pt-4">
      <header
        className={`pointer-events-auto flex items-center justify-between transition-[width,max-width,padding,background-color,transform,box-shadow,height,border-radius] duration-300 ease-out ${
          solid
            ? "w-[92%] max-w-5xl translate-y-1 rounded-full bg-[#14332b]/95 backdrop-blur-xl px-6 shadow-none md:translate-y-0 md:px-8"
            : "w-[96%] max-w-7xl translate-y-0 rounded-2xl bg-transparent px-6 pt-4 md:px-10"
        }`}
        style={{ height: solid ? "60px" : "76px" }}
      >
        <div className="flex shrink-0 items-center justify-start">
          <Link
            to={getLocalizedPath("/", currentLang) as any}
            className="flex items-center text-cream transition-opacity hover:opacity-80"
          >
            <img
              src="/logo.svg"
              alt="Agaate"
              className={`w-auto transition-[height] duration-300 ease-out ${
                solid ? "h-6 md:h-7" : "h-8 drop-shadow-md md:h-9"
              }`}
            />
          </Link>
        </div>

        <nav
          className={`hidden items-center justify-center transition-[gap] duration-300 ease-out lg:flex ${
            solid ? "gap-6" : "gap-7"
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
                  solid ? "text-cream/90" : "text-cream drop-shadow-md"
                }`}
              >
                {t(`nav.${link.key}` as any)}
                {link.subLinks && <ChevronDown className="h-3.5 w-3.5 opacity-70" />}
              </Link>

              {link.subLinks && hoveredMenu === link.key && (
                <div className="absolute left-1/2 top-full w-52 -translate-x-1/2 pt-3">
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-[#14332b]/95 p-2 shadow-lg backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.href}
                        to={getLocalizedPath(subLink.href, currentLang) as any}
                        className="block whitespace-nowrap rounded-lg px-3 py-2 text-sm text-cream/80 transition-colors hover:bg-white/10 hover:text-cream"
                      >
                        {t(`nav.${subLink.key}` as any)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-3 md:gap-4">
          <LanguageSwitcher />

          <Link
            to={getLocalizedPath("/free-farm-consultation", currentLang) as any}
            className={`whitespace-nowrap shrink-0 group flex items-center justify-center gap-2 rounded-full font-body font-semibold text-[#0d2820] bg-[#a3e635] hover:bg-[#91d820] transition-colors shadow-none ${
              solid ? "px-4 py-2 text-xs" : "px-5 py-2.5 text-sm"
            }`}
          >
            <span>{t("nav.contactUs")}</span>
            <ArrowRight
              className={`transition-transform duration-300 group-hover:translate-x-1 ${
                solid ? "h-3.5 w-3.5" : "h-4 w-4"
              }`}
            />
          </Link>
        </div>
      </header>
    </div>
  );
}
