import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18n";
import type { NavSubLink } from "./header-data";
import { WHATSAPP_AGRONOMIST_URL } from "./header-data";

interface NavDropdownProps {
  subLinks: NavSubLink[];
  isOpen: boolean;
  currentLang: string;
}

export function NavDropdown({ subLinks, isOpen, currentLang }: NavDropdownProps) {
  const { t } = useTranslation("common");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="pointer-events-auto absolute left-1/2 top-full z-50 w-[550px] -translate-x-1/2 pt-2.5">
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0, y: 7, scale: 0.97 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.18,
                  ease: [0.16, 1, 0.3, 1],
                  staggerChildren: 0.025,
                },
              },
              exit: { opacity: 0, y: 4, scale: 0.97, transition: { duration: 0.12 } },
            }}
            className="overflow-hidden rounded-[22px] border border-slate-200/80 bg-white/98 p-3.5 text-slate-900 shadow-[0_24px_60px_-15px_rgba(13,40,32,0.16),0_0_0_1px_rgba(0,0,0,0.03)] backdrop-blur-2xl"
          >
            {/* 2-Column Grid of 8 Services */}
            <div className="grid grid-cols-2 gap-x-1.5 gap-y-1">
              {subLinks.map((subLink) => {
                const SubIcon = subLink.icon;
                const subTitle = t(
                  `servicesSub.${subLink.key}` as any,
                  subLink.label || subLink.key,
                );
                const subDesc = t(`servicesSubDesc.${subLink.key}` as any, subLink.desc || "");

                return (
                  <motion.div
                    key={subLink.key + subLink.href}
                    variants={{
                      hidden: { opacity: 0, y: 4 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.16, ease: "easeOut" },
                      },
                    }}
                  >
                    <Link
                      to={getLocalizedPath(subLink.href, currentLang) as any}
                      className="group relative flex items-center gap-3 overflow-hidden rounded-[12px] p-2 px-2.5 transition-all duration-200 hover:bg-slate-50"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#23634f] text-white shadow-2xs transition-all duration-200 group-hover:scale-105 group-hover:bg-[#143d31] group-hover:text-[#a3e635]">
                        {SubIcon && (
                          <SubIcon
                            className="h-4.5 w-4.5 transition-transform duration-200 group-hover:scale-110"
                            weight="bold"
                          />
                        )}
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] font-bold text-slate-800 transition-colors group-hover:text-[#0d2a21] leading-tight">
                            {subTitle}
                          </span>
                          <ArrowRight className="h-3 w-3 -translate-x-1 text-[#0d2a21] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                        </div>
                        {subDesc && (
                          <p className="mt-0.5 line-clamp-1 text-[11px] font-normal leading-tight text-slate-500 transition-colors group-hover:text-slate-600">
                            {subDesc}
                          </p>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Balanced Dropdown Footer */}
            <div className="mt-2 flex items-center justify-between rounded-[14px] border border-slate-200/70 bg-slate-50/90 p-2.5 px-3.5 shadow-2xs">
              <div className="flex min-w-0 flex-col">
                <span className="text-[12px] font-bold text-slate-800">
                  Need custom farm setup or advisory?
                </span>
                <a
                  href={WHATSAPP_AGRONOMIST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/agrolink mt-0.5 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
                >
                  <WhatsappLogo className="h-3.5 w-3.5 text-emerald-600" weight="fill" />
                  <span>Talk to Agronomist</span>
                  <span className="text-[10px] text-emerald-600/70 transition-transform group-hover/agrolink:translate-x-0.5">
                    →
                  </span>
                </a>
              </div>

              <Link
                to={getLocalizedPath("/services", currentLang) as any}
                className="group/btn flex shrink-0 items-center gap-1.5 rounded-[10px] bg-[#0d2a21] px-3.5 py-2 text-[11.5px] font-bold text-white shadow-2xs transition-all duration-200 hover:bg-[#14332b] active:scale-[0.98]"
              >
                <span>Explore All Services</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
