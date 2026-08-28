import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ContactHero,
  MobileStickyContactBar,
  ContactForm,
  FacilitiesSection,
  TrustBand,
  ContactFaq,
  CtaBanner,
  ToastProvider,
} from "@/components/contact";
import { CONTACT_PAGE_FALLBACK } from "@/data/contact-page-fallback";
import { getContactPage } from "@/functions/public-cms";
import { isAdminOk } from "@/lib/admin-api";
import { ContactPageProvider } from "@/contexts/ContactPageContext";
import { useSiteContact } from "@/contexts/SiteContactContext";
import { fetchPageSeo, headFromSeo } from "@/lib/route-seo";
import { SeoBreadcrumbs } from "@/components/seo/SeoBreadcrumbs";

export const Route = createFileRoute("/{-$locale}/contact")({
  loader: async ({ params }) => {
    const locale = params.locale ?? "en";
    try {
      const res = await getContactPage();
      const seo = await fetchPageSeo("static_page", "contact", locale);
      if (isAdminOk<{ content: typeof CONTACT_PAGE_FALLBACK }>(res)) {
        return { contactPage: res.content, locale, seo };
      }
    } catch (err) {
      console.warn("Contact page loader fallback:", err);
    }
    return {
      contactPage: CONTACT_PAGE_FALLBACK,
      locale,
      seo: await fetchPageSeo("static_page", "contact", locale),
    };
  },
  head: ({ loaderData }) => headFromSeo(loaderData),
  component: ContactPage,
});

function ContactPage() {
  const { contactPage, locale } = Route.useLoaderData();
  const [formSuccess, setFormSuccess] = useState(false);
  const { contact } = useSiteContact();
  const onSuccessChange = useCallback((success: boolean) => {
    setFormSuccess(success);
  }, []);

  return (
    <ContactPageProvider content={contactPage}>
      <ToastProvider>
        <main className="min-h-screen bg-[#f4f8f5] font-sans text-[#143d31] antialiased pb-20 sm:pb-0 overflow-x-clip">
          <Header />
          <div className="mx-auto max-w-6xl px-4 pt-4">
            <SeoBreadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Contact", path: "/contact" },
              ]}
              locale={locale}
            />
          </div>
          <ContactHero />
          <ContactForm onSuccessChange={onSuccessChange} />
          <FacilitiesSection />
          <TrustBand />
          <ContactFaq />
          <CtaBanner />
          <Footer />
          <MobileStickyContactBar hidden={formSuccess} />
          <p className="sr-only">
            Call {contact.primaryPhoneDisplay} or email {contact.primaryEmail} for agronomy support
            in Gurugram.
          </p>
        </main>
      </ToastProvider>
    </ContactPageProvider>
  );
}
