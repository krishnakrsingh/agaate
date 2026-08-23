import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { setLocale, SUPPORTED_LNGS } from "@/lib/i18n";
import { getSiteContact } from "@/functions/public-cms";
import { SiteContactProvider } from "@/contexts/SiteContactContext";

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
  loader: async () => {
    const res = await getSiteContact();
    return { siteContact: res.contact };
  },
  component: LocaleLayout,
});

function LocaleLayout() {
  const { siteContact } = Route.useLoaderData();
  return (
    <SiteContactProvider contact={siteContact}>
      <Outlet />
    </SiteContactProvider>
  );
}
