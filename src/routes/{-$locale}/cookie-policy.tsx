import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useMemo, useState } from "react";
import { useSiteContact } from "@/contexts/SiteContactContext";
import {
  CaretRight,
  Check,
  Cookie,
  Envelope,
  Globe,
  Info,
  Lock,
  Shield,
  ShieldCheck,
  Sliders,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, PageHero, Reveal } from "@/components/common/motion";
import { fetchPageSeo, headFromSeo } from "@/lib/route-seo";

export const Route = createFileRoute("/{-$locale}/cookie-policy")({
  loader: async ({ params }) => ({
    locale: params.locale ?? "en",
    seo: await fetchPageSeo("legal_page", "cookie-policy", params.locale ?? "en"),
  }),
  head: ({ loaderData }) => headFromSeo(loaderData),
  component: CookiePolicyPage,
});

const POLICY_SECTIONS = [
  {
    id: "overview",
    title: "1. Overview & Purpose",
    content:
      "This Cookie Policy explains how Anzix Farm Technologies Private Limited ('Agaate', 'we', 'us', or 'our'), operating through our primary website agaate.in, utilizes cookies, local storage objects, and telemetry session identifiers. We respect the privacy of our agricultural partners, farmers, enterprise clients, and website visitors. This policy outlines what cookies are, how we use them, and the controls available to you.",
  },
  {
    id: "essential",
    title: "2. Essential System Cookies",
    content:
      "Essential cookies are strictly necessary for the technical operation and security of the agaate.in platform. They enable essential functions such as session authentication, secure submission of consultation forms, nursery pre-order processing, and load balancing across our servers. These cookies cannot be disabled without compromising fundamental website functionality.",
    items: [
      {
        name: "__agaate_session",
        purpose: "Maintains secure session state across navigation",
        duration: "Session",
      },
      {
        name: "__agaate_csrf",
        purpose: "Protects against Cross-Site Request Forgery attacks",
        duration: "Session",
      },
    ],
  },
  {
    id: "preferences",
    title: "3. Language & Regional Preference Cookies",
    content:
      "Agaate serves a diverse demographic of farmers across Haryana, NCR, and neighboring states. To provide an accessible experience, our platform stores your preferred language selection (such as English or Hindi) and regional preferences. This ensures the site automatically opens in your preferred language upon subsequent visits without requiring manual re-selection.",
    items: [
      {
        name: "__agaate_locale",
        purpose: "Stores user selected language preference (en / hi)",
        duration: "365 Days",
      },
      {
        name: "__agaate_region",
        purpose: "Stores regional agricultural hub preference (e.g. Gurugram)",
        duration: "180 Days",
      },
    ],
  },
  {
    id: "telemetry",
    title: "4. Agronomy Telemetry & Analytics",
    content:
      "We utilize aggregated analytics tools to understand how growers interact with our digital tools, such as the Smart Nursery calculator, Kisaan Mall inventory, and Crop Advisory guides. This data is strictly anonymized and used exclusively to optimize page load speeds on rural mobile networks, streamline navigation, and refine agronomic content.",
    items: [
      {
        name: "__agaate_analytics",
        purpose: "Tracks anonymized page navigation patterns & load times",
        duration: "90 Days",
      },
    ],
  },
  {
    id: "thirdparty",
    title: "5. Third-Party Integrations & Services",
    content:
      "Certain features on agaate.in rely on trusted third-party providers. For instance, our Interactive Facilities Locator uses Google Maps API to provide satellite navigation to Agaate Anzix Farm and Kisan Mall, while our Agronomy Connect button integrates WhatsApp web services. These third parties may set cookies in accordance with their respective privacy policies.",
  },
  {
    id: "control",
    title: "6. Managing & Disabling Cookies",
    content:
      "You have full control over your cookie preferences. You can adjust your browser settings to decline or delete cookies at any time. Please note that blocking essential cookies may affect the operation of form submissions, sapling pre-booking portals, and language persistence.",
  },
  {
    id: "contact",
    title: "7. Governance & Legal Contact",
    content:
      "If you have questions regarding this Cookie Policy or data practices at Anzix Farm Technologies Private Limited, please contact our administrative desk:\n\nEmail: info@agaate.in\nRegistered Office: Anzix Farm Technologies Private Limited, I-205 Bestech Park View Ananda, Sector-81, Narsinghpur, Gurugram, Haryana 122004\nCorporate Identification Number (CIN): U46200HR2024PTC121982",
  },
];

function CookiePolicyPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const { contact } = useSiteContact();
  const cookieSections = useMemo(
    () =>
      POLICY_SECTIONS.map((section) =>
        section.id === "contact"
          ? {
              ...section,
              content: `If you have questions regarding this Cookie Policy or data practices at Anzix Farm Technologies Private Limited, please contact our administrative desk:\n\nEmail: ${contact.primaryEmail}\nRegistered Office: Anzix Farm Technologies Private Limited, ${contact.registeredOfficeEn}\n${contact.cin}`,
            }
          : section,
      ),
    [contact],
  );
  const [cookiePrefs, setCookiePrefs] = useState({
    essential: true, // Always true
    preferences: true,
    analytics: true,
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSavePrefs = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="min-h-screen bg-cream font-sans text-ink antialiased">
      <Header />

      <PageHero
        eyebrow="LEGAL & GOVERNANCE"
        title={
          <>
            Cookie Policy & <br />
            <span className="italic text-terracotta">Preference Controls.</span>
          </>
        }
        description="Transparent information on how Anzix Farm Technologies Private Limited utilizes cookies and local storage to deliver language preferences and secure agronomy services."
      >
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-forest/20 bg-cream/90 px-4 py-2 font-jet text-[11px] font-bold uppercase tracking-wider text-forest">
          <ShieldCheck className="h-4 w-4 text-moss" />
          <span>Last Updated: August 2026 · Anzix Farm Technologies Pvt Ltd</span>
        </div>
      </PageHero>

      {/* Interactive Cookie Preference Manager Banner */}
      <section className="relative z-10 border-y border-forest/15 bg-bone/90 py-8 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="rounded-3xl border border-forest/20 bg-cream p-6 sm:p-8 shadow-md">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-2 text-moss">
                  <Sliders className="h-4 w-4" />
                  <span className="font-jet text-[10px] font-bold uppercase tracking-wider">
                    Interactive Privacy Controls
                  </span>
                </div>
                <h3 className="mt-1 font-serif text-2xl font-bold text-forest-deep">
                  Manage Your Cookie Preferences
                </h3>
                <p className="mt-1 text-xs text-forest/70 max-w-xl">
                  Customise non-essential cookies. Essential cookies remain active to preserve site
                  security and form functionality.
                </p>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-9 rounded-full bg-forest-deep p-0.5 opacity-60 cursor-not-allowed">
                    <div className="h-4 w-4 rounded-full bg-cream translate-x-4" />
                  </div>
                  <div>
                    <span className="block font-jet text-[10px] font-bold uppercase text-forest">
                      Essential
                    </span>
                    <span className="text-[10px] text-forest/60">Required</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setCookiePrefs({ ...cookiePrefs, preferences: !cookiePrefs.preferences })
                    }
                    className={`h-5 w-9 rounded-full p-0.5 transition-colors ${
                      cookiePrefs.preferences ? "bg-moss" : "bg-forest/20"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-cream transition-transform ${
                        cookiePrefs.preferences ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <div>
                    <span className="block font-jet text-[10px] font-bold uppercase text-forest">
                      Language & Locale
                    </span>
                    <span className="text-[10px] text-forest/60">
                      {cookiePrefs.preferences ? "Active" : "Disabled"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setCookiePrefs({ ...cookiePrefs, analytics: !cookiePrefs.analytics })
                    }
                    className={`h-5 w-9 rounded-full p-0.5 transition-colors ${
                      cookiePrefs.analytics ? "bg-moss" : "bg-forest/20"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-cream transition-transform ${
                        cookiePrefs.analytics ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <div>
                    <span className="block font-jet text-[10px] font-bold uppercase text-forest">
                      Analytics
                    </span>
                    <span className="text-[10px] text-forest/60">
                      {cookiePrefs.analytics ? "Active" : "Disabled"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSavePrefs}
                  className="rounded-xl bg-forest-deep px-5 py-2.5 font-sans text-xs font-bold text-cream hover:bg-forest transition-all"
                >
                  {savedSuccess ? "Preferences Saved!" : "Save Choices"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Sticky Table of Contents */}
      <section className="relative overflow-hidden py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left: Sticky Table of Contents Navigation */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-2 rounded-3xl border border-forest/15 bg-bone/70 p-6 backdrop-blur-md">
                <span className="block font-jet text-[10px] font-bold uppercase tracking-[0.2em] text-moss mb-4">
                  TABLE OF CONTENTS
                </span>
                {cookieSections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left rounded-xl px-4 py-2.5 font-sans text-xs font-bold transition-all ${
                      activeSection === sec.id
                        ? "bg-forest-deep text-cream shadow-sm"
                        : "text-forest/80 hover:bg-cream hover:text-forest-deep"
                    }`}
                  >
                    {sec.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Policy Document Body */}
            <div className="lg:col-span-8 space-y-12">
              {cookieSections.map((sec) => (
                <div
                  key={sec.id}
                  id={sec.id}
                  className="scroll-mt-32 rounded-3xl border border-forest/15 bg-cream p-8 sm:p-10 shadow-sm"
                >
                  <h2 className="font-serif text-2xl font-bold text-forest-deep sm:text-3xl">
                    {sec.title}
                  </h2>
                  <p className="mt-4 font-sans text-sm sm:text-base leading-relaxed text-forest/80 whitespace-pre-line">
                    {sec.content}
                  </p>

                  {/* Cookie Table if present */}
                  {sec.items && (
                    <div className="mt-6 overflow-x-auto">
                      <table className="w-full text-left font-sans text-xs">
                        <thead>
                          <tr className="border-b border-forest/20 bg-bone/70 text-forest-deep font-jet text-[10px] uppercase">
                            <th className="p-3">Cookie Identifier</th>
                            <th className="p-3">Purpose</th>
                            <th className="p-3">Lifespan</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-forest/10">
                          {sec.items.map((item, idx) => (
                            <tr key={idx} className="hover:bg-bone/40">
                              <td className="p-3 font-mono font-bold text-terracotta">
                                {item.name}
                              </td>
                              <td className="p-3 text-forest/80">{item.purpose}</td>
                              <td className="p-3 font-mono text-moss">{item.duration}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
