import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Bundle all locales directly into module graph for instant 100% reliable 0ms rendering & SSR
const localeModules = import.meta.glob('/src/locales/**/*.json', { eager: true });

const resources: Record<string, Record<string, any>> = {};
const namespaces = new Set<string>();

for (const path in localeModules) {
  const match = path.match(/\/src\/locales\/([^/]+)\/([^/]+)\.json$/);
  if (match) {
    const [, lng, ns] = match;
    resources[lng] = resources[lng] || {};
    const mod = localeModules[path] as any;
    resources[lng][ns] = mod.default || mod;
    namespaces.add(ns);
  }
}

// All 22 Official Scheduled Languages of India + English + Spanish
const SUPPORTED_LNGS = [
  'en', 'hi', 'bn', 'te', 'mr', 'ta', 'ur', 'gu', 'kn', 'or', 'ml', 'pa', 'as',
  'ne', 'mai', 'sat', 'ks', 'kok', 'sd', 'doi', 'mni', 'sa', 'brx', 'es'
];

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: SUPPORTED_LNGS,
  defaultNS: 'common',
  ns: Array.from(namespaces),
  resources,
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export async function setLocale(locale: string) {
  const resolved = SUPPORTED_LNGS.includes(locale) ? locale : 'en';
  if (i18n.language !== resolved) {
    await i18n.changeLanguage(resolved);
  }
}

export function stripLocalePrefix(pathName: string): string {
  if (!pathName) return '/';
  const slugs = SUPPORTED_LNGS.filter(l => l !== 'en').join('|');
  const regex = new RegExp(`^\\/(${slugs})(?=\\/|$)`);
  const stripped = pathName.replace(regex, '');
  return stripped === '' ? '/' : stripped;
}

export function getLocalizedPath(pathName: string, locale?: string): string {
  const cleanPath = stripLocalePrefix(pathName);
  if (!locale || locale === 'en') return cleanPath;
  return cleanPath === '/' ? `/${locale}` : `/${locale}${cleanPath}`;
}

export { SUPPORTED_LNGS };
export default i18n;
