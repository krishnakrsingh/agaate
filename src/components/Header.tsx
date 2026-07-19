import { useEffect, useState } from "react";
import { Globe, ArrowRight, ChevronDown } from "lucide-react";
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
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 pt-2 md:pt-4 pointer-events-none flex justify-center">
      <header
        className={`pointer-events-auto transition-all duration-500 ease-in-out flex items-center justify-between ${
          scrolled
            ? "w-[92%] max-w-5xl rounded-full px-6 md:px-8 shadow-lg bg-[#1a3c34] translate-y-1 md:translate-y-0"
            : "w-[96%] max-w-7xl rounded-2xl px-6 md:px-10 bg-transparent translate-y-0 pt-4"
        }`}
        style={{ height: scrolled ? "60px" : "76px" }}
      >
        {/* Left side: Logo */}
        <div className="flex items-center justify-start flex-1">
          <Link to="/" className="flex items-center text-white transition-opacity hover:opacity-80">
            <img
              src="/logo.svg"
              alt="Agaate"
              className={`w-auto transition-all duration-500 ease-in-out ${scrolled ? "h-6 md:h-7" : "h-8 md:h-9 drop-shadow-md"}`}
            />
          </Link>
        </div>

        {/* Center: Nav links */}
        <nav
          className={`hidden lg:flex items-center justify-center transition-all duration-500 ease-in-out ${scrolled ? "gap-6" : "gap-8"}`}
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
                className={`flex items-center gap-1 font-body text-[15px] font-medium transition-colors hover:text-[#c8e3d4] ${scrolled ? "text-white/90" : "text-white drop-shadow-md"}`}
              >
                {link.label}
                {link.subLinks && <ChevronDown className="w-3.5 h-3.5 opacity-70" />}
              </Link>

              {/* Dropdown Menu */}
              {link.subLinks && hoveredMenu === link.label && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48">
                  <div className="bg-white rounded-xl shadow-xl overflow-hidden py-2 border border-black/5 animate-in fade-in slide-in-from-top-2">
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.href}
                        to={subLink.href}
                        className="block px-4 py-2 text-sm text-forest hover:bg-forest/5 hover:text-emerald-600 transition-colors"
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

        {/* Right side: Actions */}
        <div
          className={`flex items-center justify-end flex-1 transition-all duration-500 ease-in-out ${scrolled ? "gap-4" : "gap-6"}`}
        >
          <Link
            to="/contact"
            className={`group flex items-center gap-2 rounded-full font-body font-semibold transition-all duration-500 ease-in-out ${
              scrolled
                ? "bg-[#a3e635] hover:bg-[#91d820] text-[#0f2d25] shadow-sm hover:shadow-md px-4 py-2 text-xs"
                : "bg-[#a3e635] hover:bg-[#91d820] text-[#0f2d25] shadow-lg px-5 py-2.5 text-[15px]"
            }`}
          >
            Contact Us{" "}
            <ArrowRight
              className={`transition-all duration-500 ease-in-out group-hover:translate-x-1 ${scrolled ? "w-3.5 h-3.5 ml-0.5" : "w-4 h-4 ml-1"}`}
            />
          </Link>
        </div>
      </header>
    </div>
  );
}
