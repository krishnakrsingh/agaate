import { useEffect } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { setLocale, getLocalizedPath } from "@/lib/i18n";
import { motion } from "framer-motion";

export function LanguageSwitcher({
  layoutId = "active-lang-pill",
  className = "",
  variant = "dark",
}: {
  layoutId?: string;
  className?: string;
  variant?: "dark" | "light";
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();

  const isHindi =
    location.pathname === "/hi" || location.pathname.startsWith("/hi/");
  const currentLangCode = isHindi ? "hi" : "en";

  // Keep i18next language synchronized with the current route pathname
  useEffect(() => {
    const expectedLang = isHindi ? "hi" : "en";
    if (i18n.language !== expectedLang) {
      setLocale(expectedLang);
    }
  }, [isHindi, i18n]);

  const switchTo = async (lng: string) => {
    if (lng === currentLangCode) return;
    await setLocale(lng);
    const targetPath = getLocalizedPath(location.pathname, lng);
    navigate({
      to: targetPath as any,
      replace: true,
      resetScroll: false,
    });
  };

  const inactiveTextClass =
    variant === "light"
      ? "text-slate-600 hover:text-slate-900"
      : "text-cream/70 hover:text-cream";

  const containerTrackClass =
    variant === "light"
      ? `relative flex items-center rounded-full bg-slate-100/90 border border-slate-200/80 p-0.5 ${className}`
      : `relative flex items-center rounded-full border border-white/20 bg-white/5 p-0.5 backdrop-blur-md ${className}`;

  return (
    <div className={containerTrackClass}>
      <button
        type="button"
        onClick={() => switchTo("en")}
        className={`relative z-10 rounded-full px-3 py-1 text-xs font-sans font-semibold transition-colors duration-300 ${
          currentLangCode === "en" ? "text-[#0d2820]" : inactiveTextClass
        }`}
      >
        En
        {currentLangCode === "en" && (
          <motion.div
            layoutId={layoutId}
            className="absolute inset-0 -z-10 rounded-full bg-[#a3e635] shadow-sm"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </button>

      <button
        type="button"
        onClick={() => switchTo("hi")}
        className={`relative z-10 rounded-full px-3 py-1 text-xs font-sans font-semibold transition-colors duration-300 ${
          currentLangCode === "hi" ? "text-[#0d2820]" : inactiveTextClass
        }`}
      >
        हि
        {currentLangCode === "hi" && (
          <motion.div
            layoutId={layoutId}
            className="absolute inset-0 -z-10 rounded-full bg-[#a3e635] shadow-sm"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </button>
    </div>
  );
}
