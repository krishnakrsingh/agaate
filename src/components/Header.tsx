import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CaretDown,
  Compass,
  House,
  Info,
  List,
  Phone,
  Stack,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import {
  Sprout,
  Store,
  Cpu,
  ShieldCheck,
  Trees,
  TrendingUp,
} from "lucide-react";
import { Link, useLocation, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getLocalizedPath, stripLocalePrefix } from "@/lib/i18n";
import { LanguageSwitcher } from "./common/LanguageSwitcher";

type NavItem = {
  key: string;
  href: string;
  icon?: any;
  subLinks?: { key: string; href: string; label?: string; desc?: string; icon?: any }[];
};

const navStructure: NavItem[] = [
  { key: "home", href: "/", icon: House },
  {
    key: "services",
    href: "/services",
    icon: Stack,
    subLinks: [
      {
        key: "nursery",
        href: "/services/nursery",
        label: "Bio-Boosted Nursery",
        desc: "High-yield saplings & automated plug plants",
        icon: Sprout,
      },
      {
        key: "kisaanMall",
        href: "/services/kisaan-mall",
        label: "Kisaan Mall",
        desc: "Verified seeds, fertilizers & machinery store",
        icon: Store,
      },
      {
        key: "farmTech",
        href: "/services/farm-tech",
        label: "Farm Tech",
        desc: "Drones, IoT sensors & AI crop health monitoring",
        icon: Cpu,
      },
      {
        key: "carbonCredits",
        href: "/services/carbon-credits",
        label: "Carbon Credits",
        desc: "Monetize sustainable farming & carbon offsets",
        icon: ShieldCheck,
      },
      {
        key: "bigFarmSetup",
        href: "/services/big-farm-setup",
        label: "Big Farm Setup",
        desc: "Turnkey orchards & commercial estate setups",
        icon: Trees,
      },
      {
        key: "marketLinkage",
        href: "/services/market-linkage",
        label: "Market Linkage",
        desc: "Direct buyer connect & guaranteed buyback",
        icon: TrendingUp,
      },
    ],
  },
  { key: "agriPark", href: "/agri-park", icon: Compass },
  { key: "about", href: "/about", icon: Info },
  { key: "contact", href: "/contact", icon: Phone },
];

export default function Header() {
  const { t, i18n } = useTranslation("common");
  const location = useLocation();
  const { locale } = useParams({ strict: false }) as any;
  const currentLang = locale ?? i18n.language ?? "en";

  const isHome = stripLocalePrefix(location.pathname) === "/";
  const [scrolled, setScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Solid dark bar on every light page; homepage stays transparent until scroll
  const solid = !isHome || scrolled;

  // Auto close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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
        className={`pointer-events-auto relative flex items-center gap-2 transition-all duration-300 ease-out sm:gap-3 ${
          solid
            ? "w-[94%] max-w-6xl translate-y-1 rounded-full bg-[#14332b]/95 border border-white/10 backdrop-blur-xl px-3 shadow-2xl sm:px-5 md:translate-y-0 md:px-7"
            : "w-[96%] max-w-7xl translate-y-0 rounded-2xl bg-transparent px-3 pt-3 sm:px-5 md:px-10"
        }`}
        style={{ height: solid ? "60px" : "74px" }}
      >
        {/* Brand Logo */}
        <div className="relative z-10 flex min-w-0 shrink-0 items-center justify-start">
          <Link
            to={getLocalizedPath("/", currentLang) as any}
            className="flex max-w-[42vw] items-center text-cream transition-opacity hover:opacity-80 sm:max-w-none"
          >
            <img
              src="/logo.svg"
              alt="Agaate"
              className={`h-auto max-h-full w-auto max-w-full object-contain object-left transition-[height] duration-300 ease-out ${
                solid ? "h-6 md:h-7" : "h-7 drop-shadow-md sm:h-8 md:h-9"
              }`}
            />
          </Link>
        </div>

        {/* Desktop Navigation Links — absolute so it never steals mobile flex space */}
        <nav
          className={`pointer-events-auto absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-[gap] duration-300 ease-out lg:flex ${
            solid ? "gap-1 xl:gap-2" : "gap-1.5 xl:gap-2.5"
          }`}
        >
          {navStructure.map((link) => {
            const isHovered = hoveredMenu === link.key;
            return (
              <div
                key={link.key + link.href}
                className="relative py-1 px-0.5"
                onMouseEnter={() => setHoveredMenu(link.key)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link
                  to={getLocalizedPath(link.href, currentLang) as any}
                  className={`relative z-10 whitespace-nowrap flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-body text-[14px] font-medium transition-colors duration-200 ${
                    isHovered
                      ? "text-white font-semibold"
                      : solid
                      ? "text-cream/85 hover:text-white"
                      : "text-cream drop-shadow-md hover:text-white"
                  }`}
                >
                  <span>{t(`nav.${link.key}` as any, link.key)}</span>
                  {link.subLinks && (
                    <CaretDown
                      className={`h-3.5 w-3.5 opacity-80 transition-transform duration-300 ${
                        isHovered ? "rotate-180 text-white opacity-100" : ""
                      }`}
                    />
                  )}
                  {isHovered && (
                    <motion.div
                      layoutId="header-hover-bg"
                      className="absolute inset-0 z-[-1] rounded-full bg-white/10"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                </Link>

                {/* Redesigned Clean & Compact Services Dropdown */}
                <AnimatePresence>
                  {link.subLinks && isHovered && (
                    <div className="absolute left-1/2 top-full w-[580px] -translate-x-1/2 pt-3 pointer-events-auto z-50">
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={{
                          hidden: { opacity: 0, y: 8, scale: 0.97 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: {
                              duration: 0.18,
                              ease: [0.16, 1, 0.3, 1],
                              staggerChildren: 0.03,
                            },
                          },
                          exit: { opacity: 0, y: 5, scale: 0.97, transition: { duration: 0.13 } },
                        }}
                        className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/98 backdrop-blur-2xl p-4 shadow-[0_25px_60px_-15px_rgba(13,40,32,0.16),0_0_0_1px_rgba(0,0,0,0.03)] text-slate-900"
                      >
                        {/* 2-Column Grid */}
                        <div className="grid grid-cols-2 gap-1">
                          {link.subLinks.map((subLink) => {
                            const SubIcon = subLink.icon;
                            const subTitle = t(
                              `servicesSub.${subLink.key}` as any,
                              subLink.label || subLink.key,
                            );
                            const subDesc = t(
                              `servicesSubDesc.${subLink.key}` as any,
                              subLink.desc || "",
                            );
                            return (
                              <motion.div
                                key={subLink.key + subLink.href}
                                variants={{
                                  hidden: { opacity: 0, y: 4 },
                                  visible: { opacity: 1, y: 0, transition: { duration: 0.18, ease: "easeOut" } },
                                }}
                              >
                                <Link
                                  to={getLocalizedPath(subLink.href, currentLang) as any}
                                  className="group flex items-start gap-3 rounded-[14px] p-2.5 transition-all duration-200 hover:bg-slate-50 relative overflow-hidden"
                                >
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-slate-100/80 text-[#0d2a21] border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-300 group-hover:bg-[#0d2a21] group-hover:text-[#a3e635] group-hover:border-[#0d2a21] group-hover:shadow-md group-hover:scale-105 group-hover:-rotate-2">
                                    {SubIcon && <SubIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.85} />}
                                  </div>
                                  <div className="flex flex-col min-w-0 flex-1 pt-0.5">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[13px] font-bold text-slate-800 transition-colors group-hover:text-[#0d2a21]">
                                        {subTitle}
                                      </span>
                                      <ArrowRight className="h-3 w-3 text-[#0d2a21] opacity-0 -translate-x-1.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                                    </div>
                                    {subDesc && (
                                      <p className="text-[11px] text-slate-500 leading-tight line-clamp-1 mt-0.5 font-normal transition-colors group-hover:text-slate-600">
                                        {subDesc}
                                      </p>
                                    )}
                                  </div>
                                </Link>
                              </motion.div>
                            );
                          })}
                        </div>

                        {/* Refined Footer with Proper Visual Hierarchy */}
                        <div className="mt-2.5 flex items-center justify-between rounded-[16px] bg-slate-50/90 border border-slate-200/70 p-3 shadow-xs">
                          <div className="flex flex-col min-w-0">
                            <span className="text-[12px] font-bold text-slate-800">
                              Need custom farm setup or advisory?
                            </span>
                            <a
                              href="https://wa.me/918350085005?text=Hello%20Agaate%20Agronomist%2C%20I%20need%20custom%20farm%20setup%20and%20crop%20advisory."
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 transition-colors group/agrolink"
                            >
                              <WhatsappLogo className="h-3.5 w-3.5 text-emerald-600" weight="fill" />
                              <span>Talk to Agronomist</span>
                              <span className="text-[10px] text-emerald-600/70 group-hover/agrolink:translate-x-0.5 transition-transform">→</span>
                            </a>
                          </div>

                          <Link
                            to={getLocalizedPath("/services", currentLang) as any}
                            className="group/btn shrink-0 flex items-center gap-1.5 text-[11.5px] font-bold text-white bg-[#0d2a21] hover:bg-[#14332b] px-4 py-2 rounded-[11px] shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
                          >
                            <span>Explore All Services</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Right Actions: Language (desktop), CTA, Mobile Menu */}
        <div className="relative z-10 ml-auto flex shrink-0 items-center justify-end gap-2 sm:gap-2.5 md:gap-4">
          <div className="hidden lg:block">
            <LanguageSwitcher layoutId="active-lang-pill-desktop" />
          </div>

          <a
            href="https://wa.me/918350085005?text=Hello%20Agaate%20Team%2C%20I%20would%20like%20to%20know%20more%20about%20your%20farm%20services%20and%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex whitespace-nowrap shrink-0 group items-center justify-center gap-1.5 rounded-full font-body font-semibold text-[#0d2820] bg-[#a3e635] hover:bg-[#91d820] transition-colors shadow-none ${
              solid
                ? "px-4 py-2 text-sm sm:px-5 sm:py-2.5 md:px-5"
                : "px-4 py-2.5 text-sm sm:px-5 sm:py-2.5 md:px-6 md:py-3 md:text-[15px]"
            }`}
          >
            <span>{t("nav.contactUs", "Let's talk")}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-cream transition-colors hover:bg-white/10 focus:outline-none lg:hidden"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <List className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto fixed inset-x-4 top-20 z-50 max-h-[85vh] overflow-y-auto rounded-3xl border border-white/15 bg-[#0e2721]/95 p-6 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 lg:hidden">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[#a3e635]">
                Navigation Menu
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-full p-1 text-cream/70 hover:text-cream"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-cream">Language</span>
                <span className="text-[11px] text-cream/55">Choose English or Hindi</span>
              </div>
              <LanguageSwitcher layoutId="active-lang-pill-mobile" />
            </div>

            <nav className="flex flex-col gap-2">
              {navStructure.map((link) => {
                const IconComp = link.icon;
                return (
                  <div key={"mobile-" + link.key + link.href} className="flex flex-col">
                    <Link
                      to={getLocalizedPath(link.href, currentLang) as any}
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-base font-medium text-cream transition-colors hover:bg-white/10 hover:text-[#a3e635]"
                    >
                      {IconComp && <IconComp className="h-5 w-5 text-[#a3e635]" />}
                      <span>{t(`nav.${link.key}` as any, link.key)}</span>
                    </Link>

                    {link.subLinks && (
                      <div className="ml-8 flex flex-col gap-1 border-l border-white/10 pl-4 my-1">
                        {link.subLinks.map((sub) => {
                          const SubIcon = sub.icon;
                          const subTitle = t(`servicesSub.${sub.key}` as any, sub.label || sub.key);
                          const subDesc = t(`servicesSubDesc.${sub.key}` as any, sub.desc || "");
                          return (
                            <Link
                              key={"mobile-sub-" + sub.key + sub.href}
                              to={getLocalizedPath(sub.href, currentLang) as any}
                              className="flex items-start gap-2.5 rounded-lg px-3 py-2 text-sm text-cream/80 transition-colors hover:bg-white/10 hover:text-[#a3e635]"
                            >
                              {SubIcon && (
                                <SubIcon className="h-4 w-4 text-[#a3e635] shrink-0 mt-0.5" />
                              )}
                              <div className="flex flex-col">
                                <span className="font-medium text-cream">{subTitle}</span>
                                {subDesc && (
                                  <span className="text-[11px] text-cream/60 font-light">
                                    {subDesc}
                                  </span>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="mt-2 pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href="https://wa.me/918350085005?text=Hello%20Agaate%20Team%2C%20I%20would%20like%20to%20know%20more%20about%20your%20farm%20services%20and%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#a3e635] px-5 py-3 font-semibold text-[#0d2820] shadow-md transition-transform active:scale-95"
              >
                <span>{t("nav.contactUs", "Let's talk")}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
