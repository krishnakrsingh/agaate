import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18n";
import { NAV_STRUCTURE } from "./header-data";
import { NavDropdown } from "./NavDropdown";

interface NavDesktopProps {
  solid: boolean;
  currentLang: string;
}

export function NavDesktop({ solid, currentLang }: NavDesktopProps) {
  const { t } = useTranslation("common");
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  return (
    <nav className="pointer-events-auto absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1 lg:flex xl:gap-2">
      {NAV_STRUCTURE.map((link) => {
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
