import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { setLocale, SUPPORTED_LNGS } from "@/lib/i18n";

// Non-English supported locales (English is the default at root `/`)
const LOCALE_SLUGS = SUPPORTED_LNGS.filter((l) => l !== "en");

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: async ({ params }) => {
    const locale = params?.locale;
    if (locale && !LOCALE_SLUGS.includes(locale)) {
      throw notFound();
    }
    const resolved = locale && LOCALE_SLUGS.includes(locale) ? locale : "en";
    try {
      await setLocale(resolved);
    } catch (e) {
      console.warn("setLocale error:", e);
    }
    return { locale: resolved };
  },
  component: () => <Outlet />,
});
