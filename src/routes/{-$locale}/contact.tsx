import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ContactHero,
  QuickContactBar,
  MobileStickyContactBar,
  ContactForm,
  FacilitiesSection,
  TrustBand,
  ContactFaq,
  CtaBanner,
  ToastProvider,
  FACILITIES,
  EMAIL,
  PRIMARY_PHONE,
  TEL_PRIMARY,
} from "@/components/contact";

const PAGE_TITLE = "Contact Agaate — Talk to an Agronomist | Gurugram";
const PAGE_DESCRIPTION =
  "Reach Agaate agronomists in Gurugram for crop advice, nursery pre-orders, Big Farm setup, and market linkage. Typical reply within 2 business hours.";

function buildJsonLd() {
  const organization = {
    "@type": "Organization",
    "@id": "https://agaate.in/#organization",
    name: "Agaate",
    legalName: "Anzix Farm Technologies Pvt Ltd",
    url: "https://agaate.in",
    email: EMAIL,
    telephone: TEL_PRIMARY,
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

  const businesses = FACILITIES.map((f) => ({
    "@type": "LocalBusiness",
    "@id": `https://agaate.in/contact#${f.id}`,
    name: f.name,
    description: f.tagline,
    telephone: f.telRaw,
    email: f.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: f.address,
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: f.coordinates.lat,
      longitude: f.coordinates.lng,
    },
    openingHours: f.hours,
    url: f.mapsUrl,
    parentOrganization: { "@id": "https://agaate.in/#organization" },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [organization, contactPage, ...businesses],
  };
}

export const Route = createFileRoute("/{-$locale}/contact")({
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
  const [formSuccess, setFormSuccess] = useState(false);
  const onSuccessChange = useCallback((success: boolean) => {
    setFormSuccess(success);
  }, []);

  return (
    <ToastProvider>
      <main className="min-h-screen bg-white pb-20 font-sans text-ink antialiased sm:pb-0">
      <Header />
        <ContactHero />
        <QuickContactBar />
        <ContactForm onSuccessChange={onSuccessChange} />
        <FacilitiesSection />
        <TrustBand />
        <ContactFaq />
        <CtaBanner />
        <Footer />
        <MobileStickyContactBar hidden={formSuccess} />
        <p className="sr-only">
          Call {PRIMARY_PHONE} or email {EMAIL} for agronomy support in Gurugram.
        </p>
    </main>
    </ToastProvider>
  );
}
