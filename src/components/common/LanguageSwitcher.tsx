import { useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { setLocale, getLocalizedPath } from "@/lib/i18n";
import { motion } from "framer-motion";

export function LanguageSwitcher() {
  const navigate = useNavigate();
  const location = useLocation();
  const { locale } = useParams({ strict: false }) as any;
  const { i18n } = useTranslation();

  const currentLangCode = (locale ?? i18n.language ?? "en").startsWith("hi") ? "hi" : "en";

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

  return (
    <div className="relative flex items-center rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-md">
      <button
        type="button"
        onClick={() => switchTo("en")}
        className={`relative z-10 rounded-full px-3 py-1 text-xs font-sans font-semibold transition-colors duration-300 ${
          currentLangCode === "en" ? "text-[#0d2820]" : "text-cream/70 hover:text-cream"
        }`}
      >
        En
        {currentLangCode === "en" && (
          <motion.div
            layoutId="active-lang-pill"
            className="absolute inset-0 -z-10 rounded-full bg-[#a3e635] shadow-sm"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </button>

      <button
        type="button"
        onClick={() => switchTo("hi")}
        className={`relative z-10 rounded-full px-3 py-1 text-xs font-sans font-semibold transition-colors duration-300 ${
          currentLangCode === "hi" ? "text-[#0d2820]" : "text-cream/70 hover:text-cream"
        }`}
      >
        हि
        {currentLangCode === "hi" && (
          <motion.div
            layoutId="active-lang-pill"
            className="absolute inset-0 -z-10 rounded-full bg-[#a3e635] shadow-sm"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </button>
    </div>
  );
}
