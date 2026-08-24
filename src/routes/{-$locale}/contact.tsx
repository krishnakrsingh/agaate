import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_CONTACT_FALLBACK } from "@/data/site-contact-fallback";
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

const PAGE_TITLE = "Contact Agaate — Talk to an Agronomist | Gurugram";
const PAGE_DESCRIPTION =
  "Reach Agaate agronomists in Gurugram for crop advice, nursery pre-orders, Big Farm setup, and market linkage. Typical reply within 2 business hours.";

function buildJsonLd() {
  const fb = SITE_CONTACT_FALLBACK;
  const organization = {
    "@type": "Organization",
    "@id": "https://agaate.in/#organization",
    name: "Agaate",
    legalName: "Anzix Farm Technologies Pvt Ltd",
    url: "https://agaate.in",
    email: fb.primaryEmail,
    telephone: fb.primaryTel,
    logo: "https://agaate.in/favicon.ico",
  };

  const contactPage = {
    "@type": "ContactPage",
    "@id": "https://agaate.in/contact#page",
    url: "https://agaate.in/contact",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    isPartOf: { "@id": "https://agaate.in/#organization" },
  };

  const businesses = fb.facilities.map((f) => ({
    "@type": "LocalBusiness",
    "@id": `https://agaate.in/contact#${f.id}`,
    name: f.nameEn,
    description: f.taglineEn,
    telephone: f.telRaw,
    email: f.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: f.addressEn,
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: f.lat,
      longitude: f.lng,
    },
    openingHours: f.hoursEn,
    url: f.mapsUrl,
    parentOrganization: { "@id": "https://agaate.in/#organization" },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [organization, contactPage, ...businesses],
  };
}

export const Route = createFileRoute("/{-$locale}/contact")({
  loader: async () => {
    try {
      const res = await getContactPage();
      if (isAdminOk<{ content: typeof CONTACT_PAGE_FALLBACK }>(res)) {
        return { contactPage: res.content };
      }
    } catch (err) {
      console.warn("Contact page loader fallback:", err);
    }
    return { contactPage: CONTACT_PAGE_FALLBACK };
  },
  head: () => {
    const jsonLd = JSON.stringify(buildJsonLd());
    return {
      meta: [
        { title: PAGE_TITLE },
        { name: "description", content: PAGE_DESCRIPTION },
        { property: "og:title", content: PAGE_TITLE },
        { property: "og:description", content: PAGE_DESCRIPTION },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://agaate.in/contact" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: PAGE_TITLE },
        { name: "twitter:description", content: PAGE_DESCRIPTION },
      ],
      links: [{ rel: "canonical", href: "https://agaate.in/contact" }],
      scripts: [
        {
          type: "application/ld+json",
          children: jsonLd,
        },
      ],
    };
  },
  component: ContactPage,
});

function ContactPage() {
  const { contactPage } = Route.useLoaderData();
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
