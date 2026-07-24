import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    subLinks: [
      { label: "Bio-Boosted Nursery", href: "/services/nursery" },
      { label: "Kisaan Mall", href: "/services/kisaan-mall" },
      { label: "Farm Tech", href: "/services/farm-tech" },
      { label: "Carbon Credits", href: "/services/carbon-credits" },
      { label: "Big Farm Setup", href: "/services/big-farm-setup" },
      { label: "Market Linkage", href: "/services/market-linkage" },
    ],
  },
  { label: "Agri Park", href: "/agri-park" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
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
            ? "w-[92%] max-w-5xl translate-y-1 rounded-full bg-[#1a3c34] px-6 shadow-lg md:translate-y-0 md:px-8"
            : "w-[96%] max-w-7xl translate-y-0 rounded-2xl bg-transparent px-6 pt-4 md:px-10"
        }`}
        style={{ height: scrolled ? "60px" : "76px" }}
      >
        <div className="flex flex-1 items-center justify-start">
          <Link to="/" className="flex items-center text-cream transition-opacity hover:opacity-80">
            <img
              src="/logo.svg"
              alt="Agaate"
              className={`w-auto transition-all duration-500 ease-in-out ${
                scrolled ? "h-6 md:h-7" : "h-8 drop-shadow-md md:h-9"
              }`}
            />
          </Link>
        </div>

        <nav
          className={`hidden items-center justify-center transition-all duration-500 ease-in-out lg:flex ${scrolled ? "gap-6" : "gap-8"}`}
        >
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => setHoveredMenu(link.label)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link
                to={link.href}
                className={`flex items-center gap-1 font-body text-[15px] font-medium transition-colors hover:text-[#c8e3d4] ${
                  scrolled ? "text-cream/90" : "text-cream drop-shadow-md"
                }`}
              >
                {link.label}
                {link.subLinks && <ChevronDown className="h-3.5 w-3.5 opacity-70" />}
              </Link>

              {link.subLinks && hoveredMenu === link.label && (
                <div className="absolute left-1/2 top-full w-48 -translate-x-1/2 pt-4">
                  <div className="overflow-hidden rounded-xl border border-ink/5 bg-card py-2 shadow-xl animate-in fade-in slide-in-from-top-2">
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.href}
                        to={subLink.href}
                        className="block px-4 py-2 text-sm text-forest transition-colors hover:bg-forest/5 hover:text-emerald-600"
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div
          className={`flex flex-1 items-center justify-end transition-all duration-500 ease-in-out ${scrolled ? "gap-4" : "gap-6"}`}
        >
          <Link
            to="/contact"
            className={`group flex items-center gap-2 rounded-full font-body font-semibold transition-all duration-500 ease-in-out ${
              scrolled
                ? "bg-[#a3e635] px-4 py-2 text-xs text-[#0f2d25] shadow-sm hover:bg-[#91d820] hover:shadow-md"
                : "bg-[#a3e635] px-5 py-2.5 text-[15px] text-[#0f2d25] shadow-lg hover:bg-[#91d820]"
            }`}
          >
            Contact Us
            <ArrowRight
              className={`transition-all duration-500 ease-in-out group-hover:translate-x-1 ${scrolled ? "ml-0.5 h-3.5 w-3.5" : "ml-1 h-4 w-4"}`}
            />
          </Link>
        </div>
      </header>
    </div>
  );
}
