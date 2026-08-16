import { useEffect, useState, useRef } from "react";
import { ArrowRight, List, X } from "@phosphor-icons/react";
import { Link, useLocation, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getLocalizedPath, stripLocalePrefix } from "@/lib/i18n";
import { LanguageSwitcher } from "../common/LanguageSwitcher";
import { NavDesktop } from "./NavDesktop";
import { NavMobile } from "./NavMobile";
import { WHATSAPP_CONSULTATION_URL } from "./header-data";

export function Header() {
  const { t, i18n } = useTranslation("common");
  const location = useLocation();
  const { locale } = useParams({ strict: false }) as any;
  const currentLang = locale ?? i18n.language ?? "en";

  const strippedPath = stripLocalePrefix(location.pathname);
  const isHome = strippedPath === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Solid dark bar on every light page; homepage stays transparent until scroll
  const solid = !isHome || scrolled;

  // Track page path (without locale prefix) to only close drawer when navigating to a new page
  const prevPathRef = useRef(strippedPath);

  useEffect(() => {
    if (prevPathRef.current !== strippedPath) {
      prevPathRef.current = strippedPath;
      setMobileMenuOpen(false);
    }
  }, [strippedPath]);

  useEffect(() => {
    if (!isHome) {
      setScrolled(false);
      return;
    }

    let ticking = false;
    const threshold = 30;

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
    <div className="pointer-events-none fixed left-0 top-0 z-50 flex w-full justify-center pt-2 md:pt-3">
      <header
        className={`pointer-events-auto relative flex items-center justify-between gap-3 rounded-full border transition-all duration-500 ease-out ${
          solid
            ? "h-14 w-[92%] max-w-5xl border-[#0d2a21] bg-[#0d2a21] py-2 pl-3 pr-2 shadow-2xl shadow-black/25"
            : "h-16 w-[96%] max-w-6xl border-transparent bg-transparent px-4 sm:px-6"
        }`}
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
              className="h-8 w-auto object-contain drop-shadow-md transition-all duration-300 ease-out"
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <NavDesktop solid={solid} currentLang={currentLang} />

        {/* Right Actions: Language Switcher, CTA, Mobile Menu Button */}
        <div className="relative z-10 ml-auto flex shrink-0 items-center justify-end gap-2 sm:gap-2.5 md:gap-4">
          <div className="hidden lg:block">
            <LanguageSwitcher layoutId="active-lang-pill-desktop" />
          </div>

          <a
            href={WHATSAPP_CONSULTATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-10 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#a3e635] px-5 font-body text-sm font-semibold text-[#0d2820] shadow-sm transition-colors hover:bg-[#91d820]"
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
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <List className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <NavMobile
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        currentLang={currentLang}
      />
    </div>
  );
}

export default Header;
