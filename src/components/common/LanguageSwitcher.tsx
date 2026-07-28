import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Globe, ChevronDown, Check, Search } from "lucide-react";
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

export function LanguageSwitcher() {
  const navigate = useNavigate();
  const location = useLocation();
  const { locale } = useParams({ strict: false }) as any;
  const { i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLangCode = locale ?? i18n.language ?? "en";
  const currentLang = LANGUAGES.find((l) => l.code === currentLangCode) || LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchTo = async (lng: string) => {
    setIsOpen(false);
    setSearch("");
    await setLocale(lng);
    const targetPath = getLocalizedPath(location.pathname, lng);
    navigate({
      to: targetPath as any,
      replace: true,
    });
  };

  const filteredLanguages = LANGUAGES.filter(
    (l) =>
      l.label.toLowerCase().includes(search.toLowerCase()) ||
      l.native.toLowerCase().includes(search.toLowerCase()) ||
      l.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative inline-block text-left shrink-0" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="whitespace-nowrap shrink-0 group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs md:text-sm font-medium text-cream backdrop-blur-md transition-all duration-300 hover:border-[#a3e635]/60 hover:bg-white/20 hover:shadow-lg hover:shadow-[#a3e635]/10"
        aria-expanded={isOpen}
      >
        <Globe className="h-4 w-4 text-[#a3e635] transition-transform duration-500 group-hover:rotate-45" />
        <span className="font-sans font-semibold tracking-wide">{currentLang.native}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 opacity-70 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[#a3e635]" : ""
          }`}
        />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2.5 w-64 origin-top-right rounded-2xl border border-white/15 bg-[#122b23]/95 p-2 text-cream shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 z-50">
          {/* Search Box */}
          <div className="relative mb-2 px-1 pt-1">
            <Search className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-cream/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search language..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-1.5 pl-8 pr-3 text-xs text-cream placeholder-cream/40 focus:border-[#a3e635]/50 focus:bg-white/10 focus:outline-none"
              autoFocus
            />
          </div>

          {/* Language Options List */}
          <div className="max-h-60 overflow-y-auto space-y-0.5 pr-1 custom-scrollbar">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang) => {
                const isActive = lang.code === currentLangCode;
                return (
                  <button
                    key={lang.code}
                    onClick={() => switchTo(lang.code)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-all ${
                      isActive
                        ? "bg-[#a3e635]/20 font-bold text-[#a3e635]"
                        : "text-cream/80 hover:bg-white/10 hover:text-cream"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{lang.native}</span>
                      <span className="text-[10px] text-cream/40 font-mono">({lang.label})</span>
                    </div>
                    {isActive && <Check className="h-3.5 w-3.5 text-[#a3e635]" />}
                  </button>
                );
              })
            ) : (
              <p className="p-3 text-center text-xs text-cream/40">No language found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
