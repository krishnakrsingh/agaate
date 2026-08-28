import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { setLocale, SUPPORTED_LNGS } from "@/lib/i18n";
import { getPublicAnalytics, getSiteContact } from "@/functions/public-cms";
import { SiteContactProvider } from "@/contexts/SiteContactContext";
import { GoogleAnalytics } from "@/components/common/GoogleAnalytics";

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
    const [contactRes, analyticsRes] = await Promise.all([getSiteContact(), getPublicAnalytics()]);
    const googleAnalyticsId =
      analyticsRes && "ok" in analyticsRes && analyticsRes.ok
        ? analyticsRes.googleAnalyticsId
        : null;
    return { siteContact: contactRes.contact, googleAnalyticsId };
  },
  component: LocaleLayout,
});

function LocaleLayout() {
  const { siteContact, googleAnalyticsId } = Route.useLoaderData();
  return (
    <SiteContactProvider contact={siteContact}>
      <GoogleAnalytics measurementId={googleAnalyticsId} />
      <Outlet />
    </SiteContactProvider>
  );
}
