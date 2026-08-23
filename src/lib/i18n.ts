import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Bundle English as default fallback for instant 0ms rendering
const enModules = import.meta.glob("/src/locales/en/*.json", { eager: true });
// Lazy-load other languages on demand
const lazyLocaleModules = import.meta.glob("/src/locales/*/*.json");

const resources: Record<string, Record<string, any>> = { en: {} };
const namespaces = new Set<string>();

for (const path in enModules) {
  const match = path.match(/\/src\/locales\/en\/([^/]+)\.json$/);
  if (match) {
    const [, ns] = match;
    const mod = enModules[path] as any;
    resources.en[ns] = mod.default || mod;
    namespaces.add(ns);
  }
}

// Supported languages: English (en) and Hindi (hi)
const SUPPORTED_LNGS = ["en", "hi"];

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  supportedLngs: SUPPORTED_LNGS,
  defaultNS: "common",
  ns: Array.from(namespaces),
  resources,
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

const loadedLanguages = new Set<string>(["en"]);

export async function setLocale(locale: string) {
  const resolved = SUPPORTED_LNGS.includes(locale) ? locale : "en";

  if (resolved !== "en" && !loadedLanguages.has(resolved)) {
    const loaders: Promise<any>[] = [];
    for (const path in lazyLocaleModules) {
      if (path.startsWith(`/src/locales/${resolved}/`)) {
        const match = path.match(/\/src\/locales\/[^/]+\/([^/]+)\.json$/);
        if (match) {
          const ns = match[1];
          loaders.push(
            lazyLocaleModules[path]().then((mod: any) => {
              const data = mod.default || mod;
              i18n.addResourceBundle(resolved, ns, data, true, true);
            }),
          );
        }
      }
    }
    await Promise.all(loaders);
    loadedLanguages.add(resolved);
  }

  if (i18n.language !== resolved) {
    await i18n.changeLanguage(resolved);
  }
}

export function stripLocalePrefix(pathName: string): string {
  if (!pathName) return "/";
  const slugs = SUPPORTED_LNGS.filter((l) => l !== "en").join("|");
  const regex = new RegExp(`^\\/(${slugs})(?=\\/|$)`);
  const stripped = pathName.replace(regex, "");
  return stripped === "" ? "/" : stripped;
}

export function getLocalizedPath(pathName: string, locale?: string): string {
  const cleanPath = stripLocalePrefix(pathName);
  if (!locale || locale === "en") return cleanPath;
  if (cleanPath === "/") return `/${locale}`;
  if (cleanPath.startsWith("/#")) return `/${locale}${cleanPath.substring(1)}`;
  return `/${locale}${cleanPath}`;
}

export { SUPPORTED_LNGS };
export default i18n;
