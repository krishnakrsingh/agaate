import { useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { setLocale, getLocalizedPath } from "@/lib/i18n";

const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिंदी" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "ur", label: "Urdu", native: "اردو" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "or", label: "Odia", native: "ଓଡ଼ିଆ" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "as", label: "Assamese", native: "অসমীয়া" },
  { code: "ne", label: "Nepali", native: "नेपाली" },
  { code: "mai", label: "Maithili", native: "मैथिली" },
  { code: "sat", label: "Santali", native: "ᱥᱟᱱᱛᱟᱲᱤ" },
  { code: "ks", label: "Kashmiri", native: "کٲشُر" },
  { code: "kok", label: "Konkani", native: "कोंकणी" },
  { code: "sd", label: "Sindhi", native: "سنڌي" },
  { code: "doi", label: "Dogri", native: "डोगरी" },
  { code: "mni", label: "Manipuri", native: "ꯃꯤꯇꯩꯂꯣꯟ" },
  { code: "sa", label: "Sanskrit", native: "संस्कृतम्" },
  { code: "brx", label: "Bodo", native: "बड़ो" },
  { code: "es", label: "Spanish", native: "Español" },
];

function GlobeIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

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
    });
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 text-xs font-medium text-cream shrink-0 backdrop-blur-md">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#a3e635]/20 text-[#a3e635] border border-[#a3e635]/30 ml-0.5">
        <GlobeIcon className="h-3.5 w-3.5" />
      </div>
      <button
        type="button"
        onClick={() => switchTo("en")}
        className={`rounded-full px-3 py-1 text-xs font-sans font-semibold transition-all duration-300 ${
          currentLangCode === "en"
            ? "bg-[#a3e635] text-[#0d2820] shadow-sm"
            : "text-cream/70 hover:text-cream hover:bg-white/10"
        }`}
      >
        English
      </button>
      <button
        type="button"
        onClick={() => switchTo("hi")}
        className={`rounded-full px-3 py-1 text-xs font-sans font-semibold transition-all duration-300 ${
          currentLangCode === "hi"
            ? "bg-[#a3e635] text-[#0d2820] shadow-sm"
            : "text-cream/70 hover:text-cream hover:bg-white/10"
        }`}
      >
        हिंदी
      </button>
    </div>
  );
}
