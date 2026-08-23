import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CaretDown, WhatsappLogo, X } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18n";
import { LanguageSwitcher } from "../common/LanguageSwitcher";
import {
  NAV_STRUCTURE,
  NAV_SUBTITLES,
  WHATSAPP_AGRONOMIST_URL,
  WHATSAPP_CONSULTATION_URL,
} from "./header-data";

interface NavMobileProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: string;
}

export function NavMobile({ isOpen, onClose, currentLang }: NavMobileProps) {
  const { t } = useTranslation("common");
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="pointer-events-auto fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] lg:hidden"
          />

          {/* Floating Mobile Card Drawer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto fixed inset-x-4 top-20 z-50 flex max-h-[82vh] flex-col gap-3 overflow-y-auto rounded-[24px] border border-slate-200/90 bg-white/98 p-4.5 text-slate-900 shadow-[0_20px_50px_-10px_rgba(13,40,32,0.25),0_0_0_1px_rgba(0,0,0,0.04)] backdrop-blur-md lg:hidden"
          >
            {/* Top Bar inside Floating Card */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <Link
                to={getLocalizedPath("/", currentLang) as any}
                onClick={onClose}
                className="flex items-center gap-2 rounded-full bg-[#0d2a21] px-3.5 py-1.5 shadow-sm"
              >
                <img src="/logo.svg" alt="Agaate" className="h-5 w-auto object-contain" />
              </Link>

              <div className="flex items-center gap-2.5">
                <LanguageSwitcher layoutId="active-lang-pill-mobile" variant="light" />
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-800 transition-colors hover:bg-slate-200"
                  aria-label="Close menu"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* Middle Navigation Tree */}
            <div className="flex flex-col gap-1.5">
              <span className="px-1 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Main Navigation
              </span>

              {NAV_STRUCTURE.map((link) => {
                const IconComp = link.icon;
                const isServices = link.key === "services";
                const subLabel = NAV_SUBTITLES[link.key] || "";

                return (
                  <div key={"mobile-" + link.key + link.href} className="flex flex-col">
                    {isServices ? (
                      <button
                        type="button"
                        onClick={() => setServicesOpen((prev) => !prev)}
                        className="group flex w-full items-center justify-between rounded-[18px] p-2.5 text-left transition-colors hover:bg-slate-100/90 active:bg-slate-100"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] border border-slate-200/80 bg-slate-100 text-[#0d2a21] transition-all group-hover:bg-[#0d2a21] group-hover:text-[#a3e635]">
                            {IconComp && <IconComp className="h-5 w-5" strokeWidth={1.85} />}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900">
                              {t(`nav.${link.key}` as any, link.key)}
                            </span>
                            <span className="text-[11px] font-normal text-slate-500">
                              {subLabel}
                            </span>
                          </div>
                        </div>
                        <CaretDown
                          className={`h-4.5 w-4.5 text-slate-500 transition-transform duration-300 ${
                            servicesOpen ? "rotate-180 text-[#0d2a21]" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        to={getLocalizedPath(link.href, currentLang) as any}
                        onClick={onClose}
                        className="group flex items-center justify-between rounded-[18px] p-2.5 transition-colors hover:bg-slate-100/90 active:bg-slate-100"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] border border-slate-200/80 bg-slate-100 text-[#0d2a21] transition-all group-hover:bg-[#0d2a21] group-hover:text-[#a3e635]">
                            {IconComp && <IconComp className="h-5 w-5" strokeWidth={1.85} />}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900">
                              {t(`nav.${link.key}` as any, link.key)}
                            </span>
                            {subLabel && (
                              <span className="text-[11px] font-normal text-slate-500">
                                {subLabel}
                              </span>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 -translate-x-1 text-slate-400 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    )}

                    {/* Accordion Content for Services */}
                    {isServices && servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-slate-100 py-1 pl-3"
                      >
                        {link.subLinks?.map((sub) => {
                          const SubIcon = sub.icon;
                          const subTitle = t(`servicesSub.${sub.key}` as any, sub.label || sub.key);
                          const subDesc = t(`servicesSubDesc.${sub.key}` as any, sub.desc || "");
                          const isExternal = (sub as any).external || sub.href.startsWith("http");

                          return isExternal ? (
                            <a
                              key={"mobile-sub-" + sub.key + sub.href}
                              href={sub.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={onClose}
                              className="group/sub flex items-center gap-2.5 rounded-[12px] p-2 transition-colors hover:bg-slate-100/90"
                            >
                              <div className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-[10px] bg-[#23634f] text-white shadow-2xs transition-all group-hover/sub:bg-[#143d31] group-hover/sub:text-[#a3e635]">
                                {SubIcon && <SubIcon className="h-4 w-4" weight="bold" />}
                              </div>
                              <div className="flex min-w-0 flex-1 flex-col">
                                <span className="text-xs font-bold text-slate-800 group-hover/sub:text-[#0d2a21]">
                                  {subTitle}
                                </span>
                                {subDesc && (
                                  <span className="line-clamp-1 text-[10.5px] font-normal text-slate-500">
                                    {subDesc}
                                  </span>
                                )}
                              </div>
                            </a>
                          ) : (
                            <Link
                              key={"mobile-sub-" + sub.key + sub.href}
                              to={getLocalizedPath(sub.href, currentLang) as any}
                              onClick={onClose}
                              className="group/sub flex items-center gap-2.5 rounded-[12px] p-2 transition-colors hover:bg-slate-100/90"
                            >
                              <div className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-[10px] bg-[#23634f] text-white shadow-2xs transition-all group-hover/sub:bg-[#143d31] group-hover/sub:text-[#a3e635]">
                                {SubIcon && <SubIcon className="h-4 w-4" weight="bold" />}
                              </div>
                              <div className="flex min-w-0 flex-1 flex-col">
                                <span className="text-xs font-bold text-slate-800 group-hover/sub:text-[#0d2a21]">
                                  {subTitle}
                                </span>
                                {subDesc && (
                                  <span className="line-clamp-1 text-[10.5px] font-normal text-slate-500">
                                    {subDesc}
                                  </span>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Footer Action Area */}
            <div className="flex flex-col gap-2.5 rounded-[20px] border border-slate-200/80 bg-slate-50 p-3.5 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">Custom farm advisory?</span>
                  <span className="text-[10.5px] font-normal text-slate-500">
                    Talk to our agronomists
                  </span>
                </div>
                <a
                  href={WHATSAPP_AGRONOMIST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 transition-colors hover:text-emerald-800"
                >
                  <WhatsappLogo className="h-4 w-4 text-emerald-600" weight="fill" />
                  <span>Agronomist</span>
                </a>
              </div>

              <a
                href={WHATSAPP_CONSULTATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-[13px] bg-[#0d2a21] px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#14332b] active:scale-[0.98]"
              >
                <span>{t("nav.letsTalk", "Let's Talk")}</span>
                <ArrowRight className="h-4 w-4 text-[#a3e635]" />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
