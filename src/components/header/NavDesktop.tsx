import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { getLocalizedPath, stripLocalePrefix } from "@/lib/i18n";
import { useSiteContact } from "@/contexts/SiteContactContext";
import type { NavItem } from "./header-data";
import { NavDropdown } from "./NavDropdown";

interface NavDesktopProps {
  solid: boolean;
  currentLang: string;
}

export function NavDesktop({ solid, currentLang }: NavDesktopProps) {
  const { t } = useTranslation("common");
  const { navStructure } = useSiteContact();
  const location = useLocation();
  const strippedPath = stripLocalePrefix(location.pathname);
  const isHome = strippedPath === "/";
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const handleNavClick = (link: NavItem) => {
    if (link.key === "home") {
      if (isHome) {
        const heroEl = document.getElementById("hero");
        if (heroEl) {
          heroEl.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    } else if (link.hash && isHome) {
      const el = document.getElementById(link.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <nav className="pointer-events-auto absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1 lg:flex xl:gap-2">
      {navStructure.map((link) => {
        const isHovered = hoveredMenu === link.key;

        return (
          <div
            key={link.key + link.href}
            className="relative px-0.5 py-1"
            onMouseEnter={() => setHoveredMenu(link.key)}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <Link
              to={getLocalizedPath(link.href, currentLang) as any}
              hash={link.hash}
              onClick={() => handleNavClick(link)}
              className={`relative z-10 flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 font-body text-[14px] font-medium transition-colors duration-200 ${
                isHovered
                  ? "font-semibold text-white"
                  : solid
                    ? "text-cream/90 hover:text-white"
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
                  className="absolute inset-0 -z-10 rounded-full bg-white/10"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
            </Link>

            {link.subLinks && (
              <NavDropdown subLinks={link.subLinks} isOpen={isHovered} currentLang={currentLang} />
            )}
          </div>
        );
      })}
    </nav>
  );
}
