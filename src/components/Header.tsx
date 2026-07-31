"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { navContent } from "@/lib/home-content";

const navStructure = [
  { key: "home", href: "/" },
  {
    key: "services",
    href: "/services",
    subLinks: [
      { key: "nursery", href: "/services" },
      { key: "kisaanMall", href: "/services" },
      { key: "farmTech", href: "/technology" },
      { key: "carbonCredits", href: "/services" },
      { key: "bigFarmSetup", href: "/services" },
      { key: "marketLinkage", href: "/services" },
    ],
  },
  { key: "agriPark", href: "/agri-park" },
  { key: "community", href: "/success-stories" },
  { key: "about", href: "/about" },
  { key: "careers", href: "/contact" },
];

const morph =
  "transition-[width,height,padding,border-radius,background-color,box-shadow,gap,backdrop-filter] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

function shouldHeaderFloat() {
  const hero = document.getElementById("hero");
  if (!hero) return true;
  return hero.getBoundingClientRect().bottom <= 64;
}

export default function Header() {
  const [floating, setFloating] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useLayoutEffect(() => {
    let ticking = false;

    const update = () => {
      const next = shouldHeaderFloat();
      setFloating((prev) => (prev !== next ? next : prev));
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <>
      <div
        className={`pointer-events-none fixed top-0 left-0 z-50 flex w-full justify-center transition-[padding] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          floating || mobileOpen ? "px-3 pt-4 md:px-0 md:pt-5" : "pt-4 md:pt-2.5"
        }`}
      >
        <header
          className={`pointer-events-auto flex w-full items-center justify-between ${morph} ${
            floating || mobileOpen
              ? "h-14 w-full gap-4 rounded-full border border-white/10 bg-[#14332b]/95 py-2 pl-5 pr-2 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-xl md:h-14 md:w-[min(92%,72rem)] md:gap-6 md:pl-7 md:pr-1.5"
              : "h-16 gap-4 rounded-none border border-transparent bg-transparent px-6 backdrop-blur-none md:h-20 md:gap-8 md:px-10 lg:px-16"
          }`}
        >
          <div className="flex shrink-0 items-center justify-start">
            <Link
              href="/"
              onClick={closeMobile}
              className="flex items-center text-cream transition-opacity duration-300 hover:opacity-80"
            >
              <img
                src="/logo.svg"
                alt="Agaate"
                className={`w-auto transition-[height] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  floating || mobileOpen ? "h-8 md:h-7" : "h-9 md:h-9"
                }`}
              />
            </Link>
          </div>

          <nav
            className={`hidden items-center justify-center lg:flex transition-[gap] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              floating ? "gap-7" : "gap-9 xl:gap-11"
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
                  href={link.href}
                  className="whitespace-nowrap flex items-center gap-1.5 font-body text-[15px] font-semibold tracking-[-0.01em] text-cream transition-colors duration-300 hover:text-[#c8e3d4]"
                >
                  {navContent.nav[link.key as keyof typeof navContent.nav]}
                  {link.subLinks && <ChevronDown className="h-3.5 w-3.5 opacity-70" />}
                </Link>

                {link.subLinks && hoveredMenu === link.key && (
                  <div className="absolute left-1/2 top-full w-52 -translate-x-1/2 pt-3">
                    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#14332b]/95 p-2 shadow-none backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-300">
                      {link.subLinks.map((subLink) => (
                        <Link
                          key={subLink.key}
                          href={subLink.href}
                          className="block whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium text-cream/80 transition-colors duration-200 hover:bg-white/10 hover:text-cream"
                        >
                          {navContent.servicesSub[subLink.key as keyof typeof navContent.servicesSub]}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div
            className={`flex shrink-0 items-center justify-end transition-[gap] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              floating || mobileOpen ? "gap-2 md:gap-3.5" : "gap-2.5 md:gap-5"
            }`}
          >
            <Link
              href="/contact"
              onClick={closeMobile}
              aria-label={navContent.nav.contactUs}
              className={`hidden sm:inline-flex whitespace-nowrap shrink-0 group items-center justify-center gap-2 rounded-full font-body font-semibold text-[#0d2820] bg-[#a3e635] hover:bg-[#91d820] shadow-none transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                floating
                  ? "h-9 px-3 text-xs md:h-auto md:px-5 md:py-2.5"
                  : "h-9 px-3 text-xs md:h-auto md:px-6 md:py-2.5 md:text-sm"
              }`}
            >
              <span>{navContent.nav.contactUs}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1 md:h-4 md:w-4" />
            </Link>

            <button
              type="button"
              className="lg:hidden flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-cream transition-colors hover:bg-white/15"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </header>
      </div>

      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          className="absolute inset-0 bg-[#0d2820]/70 backdrop-blur-sm"
          aria-label="Close menu"
          onClick={closeMobile}
        />

        <nav
          className={`absolute inset-x-3 top-[5.5rem] bottom-4 overflow-y-auto rounded-3xl border border-white/10 bg-[#14332b] p-6 shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:inset-x-4 ${
            mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-1">
            {navStructure.map((link) => (
              <li key={link.key}>
                {link.subLinks ? (
                  <div>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-left font-body text-lg font-semibold text-cream transition-colors hover:bg-white/5"
                      onClick={() => setMobileServicesOpen((open) => !open)}
                      aria-expanded={mobileServicesOpen}
                    >
                      {navContent.nav[link.key as keyof typeof navContent.nav]}
                      <ChevronDown
                        className={`h-5 w-5 opacity-70 transition-transform duration-300 ${
                          mobileServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        mobileServicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <ul className="mb-2 ml-2 flex flex-col gap-0.5 border-l border-white/10 pl-3">
                          <li>
                            <Link
                              href={link.href}
                              onClick={closeMobile}
                              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-cream/70 transition-colors hover:bg-white/5 hover:text-cream"
                            >
                              {navContent.nav[link.key as keyof typeof navContent.nav]}
                            </Link>
                          </li>
                          {link.subLinks.map((subLink) => (
                            <li key={subLink.key}>
                              <Link
                                href={subLink.href}
                                onClick={closeMobile}
                                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-cream/70 transition-colors hover:bg-white/5 hover:text-cream"
                              >
                                {navContent.servicesSub[subLink.key as keyof typeof navContent.servicesSub]}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={closeMobile}
                    className="block rounded-xl px-3 py-3.5 font-body text-lg font-semibold text-cream transition-colors hover:bg-white/5"
                  >
                    {navContent.nav[link.key as keyof typeof navContent.nav]}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6">
            <Link
              href="/contact"
              onClick={closeMobile}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#a3e635] px-5 py-3.5 font-body text-sm font-semibold text-[#0d2820] transition-colors hover:bg-[#91d820]"
            >
              {navContent.nav.contactUs}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
