import { useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { setLocale, getLocalizedPath } from "@/lib/i18n";

export function LanguageSwitcher() {
  const navigate = useNavigate();
  const location = useLocation();
  const { locale } = useParams({ strict: false }) as { locale?: string };
  const { i18n } = useTranslation();

  const currentLangCode = locale ?? i18n.language ?? "en";
  const isHindi = currentLangCode === "hi";

  const switchTo = async (lng: "en" | "hi") => {
    if (lng === currentLangCode) return;
    await setLocale(lng);
    const targetPath = getLocalizedPath(location.pathname, lng);
    navigate({
      to: targetPath as any,
      replace: true,
    });
  };

  return (
    <div
      role="group"
      aria-label="Language"
      className="relative inline-flex shrink-0 items-center rounded-full border border-white/15 bg-white/5 p-0.5"
    >
      {/* Sliding thumb */}
      <span
        aria-hidden
        className={`pointer-events-none absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-[#a3e635] shadow-sm transition-transform duration-300 ease-out ${
          isHindi ? "translate-x-[calc(100%+2px)]" : "translate-x-0"
        }`}
      />

      <button
        type="button"
        onClick={() => switchTo("en")}
        aria-pressed={!isHindi}
        className={`relative z-10 min-w-[2rem] rounded-full px-2 py-1 text-[11px] font-bold tracking-wide transition-colors duration-300 md:min-w-[2.5rem] md:px-2.5 md:text-xs ${
          !isHindi ? "text-[#0d2820]" : "text-cream/70 hover:text-cream"
        }`}
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => switchTo("hi")}
        aria-pressed={isHindi}
        className={`relative z-10 min-w-[2rem] rounded-full px-2 py-1 text-[11px] font-bold tracking-wide transition-colors duration-300 md:min-w-[2.5rem] md:px-2.5 md:text-xs ${
          isHindi ? "text-[#0d2820]" : "text-cream/70 hover:text-cream"
        }`}
      >
        हिं
      </button>
    </div>
  );
}
