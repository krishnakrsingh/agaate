import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Home,
  Layers,
  Compass,
  Users,
  Info,
  Briefcase,
  Sprout,
  ShoppingBag,
  Drone,
  ShieldCheck,
  Landmark,
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
  { key: "home", href: "/", icon: Home },
  {
    key: "services",
    href: "/services",
    icon: Layers,
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
        icon: ShoppingBag,
      },
      {
        key: "farmTech",
        href: "/services/farm-tech",
        label: "Farm Tech",
        desc: "Drones, IoT sensors & AI crop health monitoring",
        icon: Drone,
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
        icon: Landmark,
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
  { key: "community", href: "/community", icon: Users },
  { key: "about", href: "/about", icon: Info },
  { key: "careers", href: "/careers", icon: Briefcase },
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
        className={`pointer-events-auto relative flex items-center justify-between transition-all duration-300 ease-out ${
          solid
            ? "w-[94%] max-w-6xl translate-y-1 rounded-full bg-[#14332b]/95 border border-white/10 backdrop-blur-xl px-5 shadow-2xl md:translate-y-0 md:px-7"
            : "w-[96%] max-w-7xl translate-y-0 rounded-2xl bg-transparent px-5 pt-3 md:px-10"
        }`}
        style={{ height: solid ? "60px" : "74px" }}
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
              className={`w-auto transition-[height] duration-300 ease-out ${
                solid ? "h-6 md:h-7" : "h-8 drop-shadow-md md:h-9"
              }`}
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          className={`hidden items-center justify-center transition-[gap] duration-300 ease-out lg:flex ${
            solid ? "gap-5 xl:gap-6" : "gap-6 xl:gap-7"
          }`}
        >
          {navStructure.map((link) => (
            <div
              key={link.key + link.href}
              className="relative"
              onMouseEnter={() => setHoveredMenu(link.key)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link
                to={getLocalizedPath(link.href, currentLang) as any}
                className={`whitespace-nowrap flex items-center gap-1 font-body text-[15px] font-medium transition-colors hover:text-[#a3e635] ${
                  solid ? "text-cream/90" : "text-cream drop-shadow-md"
                }`}
              >
                {t(`nav.${link.key}` as any, link.key)}
                {link.subLinks && (
                  <ChevronDown
                    className={`h-3.5 w-3.5 opacity-70 transition-transform duration-200 ${
                      hoveredMenu === link.key ? "rotate-180 text-[#a3e635]" : ""
                    }`}
                  />
                )}
              </Link>

              {/* Mega-Dropdown Menu for Services */}
              {link.subLinks && hoveredMenu === link.key && (
                <div className="absolute left-1/2 top-full w-[620px] xl:w-[660px] -translate-x-1/2 pt-3 pointer-events-auto">
                  <div className="overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-[#0d2a21]/98 via-[#091f18]/98 to-[#061510]/99 p-4 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] backdrop-blur-2xl animate-in fade-in zoom-in-95 slide-in-from-top-3 duration-200">
                    {/* Header bar inside dropdown */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-2.5 px-1">
                      <div className="flex items-center gap-2">
                        <span className="flex h-2 w-2 rounded-full bg-[#a3e635] animate-pulse" />
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#a3e635] font-semibold">
                          Solutions & Offerings
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-cream/60 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                        6 Core Pillars
                      </span>
                    </div>

                    {/* 2-Column Grid */}
                    <div className="grid grid-cols-2 gap-2">
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
                          <Link
                            key={subLink.key + subLink.href}
                            to={getLocalizedPath(subLink.href, currentLang) as any}
                            className="group flex items-start gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-white/[0.08] border border-transparent hover:border-white/10 relative overflow-hidden"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#a3e635] border border-white/10 transition-all duration-200 group-hover:scale-105 group-hover:bg-[#a3e635] group-hover:text-[#0b241d] group-hover:shadow-[0_0_18px_rgba(163,230,53,0.4)]">
                              {SubIcon && <SubIcon className="h-5 w-5" />}
                            </div>
                            <div className="flex flex-col min-w-0 flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-[14px] font-semibold text-cream transition-colors group-hover:text-[#a3e635]">
                                  {subTitle}
                                </span>
                                <ArrowRight className="h-3.5 w-3.5 text-[#a3e635] opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                              </div>
                              {subDesc && (
                                <p className="text-[12px] text-cream/60 leading-snug line-clamp-1 mt-0.5 font-normal group-hover:text-cream/85">
                                  {subDesc}
                                </p>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Bottom Action Footer inside dropdown */}
                    <div className="mt-3 flex items-center justify-between rounded-xl bg-white/5 p-3 border border-white/10">
                      <span className="text-xs text-cream/70 font-medium">
                        Need custom farm setup or advisory?
                      </span>
                      <Link
                        to={getLocalizedPath("/services", currentLang) as any}
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#a3e635] hover:underline"
                      >
                        <span>Explore All Services</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Actions: Language Switcher, WhatsApp CTA, Mobile Menu Button */}
        <div className="flex shrink-0 items-center justify-end gap-2.5 md:gap-4">
          <LanguageSwitcher />

          <a
            href="https://wa.me/918350085005?text=Hello%20Agaate%20Team%2C%20I%20would%20like%20to%20know%20more%20about%20your%20farm%20services%20and%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            className={`whitespace-nowrap shrink-0 group flex items-center justify-center gap-1.5 rounded-full font-body font-semibold text-[#0d2820] bg-[#a3e635] hover:bg-[#91d820] transition-colors shadow-none ${
              solid ? "px-4 py-2 text-xs" : "px-5 py-2.5 text-sm"
            }`}
          >
            <span>{t("nav.contactUs", "Let's talk")}</span>
            <ArrowRight
              className={`transition-transform duration-300 group-hover:translate-x-1 ${
                solid ? "h-3.5 w-3.5" : "h-4 w-4"
              }`}
            />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex items-center justify-center rounded-full p-2 text-cream transition-colors hover:bg-white/10 focus:outline-none lg:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-[#a3e635]" />
            ) : (
              <Menu className="h-6 w-6" />
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
              >
                <X className="h-5 w-5" />
              </button>
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
