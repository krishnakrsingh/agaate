import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import {
  CaretRight,
  Check,
  Database,
  Envelope,
  EyeSlash,
  FileText,
  Lock,
  MapPin,
  Plant,
  ShieldCheck,
  UserCheck
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, PageHero, Reveal } from "@/components/common/motion";

export const Route = createFileRoute("/{-$locale}/privacy-policy")({
  component: PrivacyPolicyPage,
});

const PRIVACY_SECTIONS = [
  {
    id: "overview",
    title: "1. Corporate Scope & Principles",
    content:
      "This Privacy Policy governs the collection, processing, storage, and protection of personal data and agricultural telemetry by Anzix Farm Technologies Private Limited ('Agaate', 'we', 'us', or 'our'), a company incorporated on May 28, 2024 under the Companies Act (CIN: U46200HR2024PTC121982), operating out of Gurugram, Haryana.\n\nWe operate the agaate.in platform, the Agaate Kisan Mall, our 17-acre Smart Nursery facility in Kukrola, and associated farmer WhatsApp services. We are dedicated to safeguarding farmer privacy and enforcing strict data security protocols across all digital and field operations.",
  },
  {
    id: "collection",
    title: "2. Information We Collect",
    content:
      "To provide science-backed agronomy support and nursery seedling fulfillment, we collect specific categories of data:",
    subsections: [
      {
        subtitle: "Personal Contact Data",
        text: "Full name, phone/WhatsApp contact number, postal address, village/tehsil/district, and optional email address shared during consultations, seedling pre-booking, or community registration.",
      },
      {
        subtitle: "Farm & Agronomic Profile",
        text: "Plot acreage, crop choices (e.g. Watermelon, Chilli, Tomato), soil test reports, basal dose history, and fertigation equipment specifications.",
      },
      {
        subtitle: "Crop Diagnostics & Telemetry Images",
        text: "Photos of crop leaves, stems, or soil uploaded via WhatsApp for disease diagnosis or field advisory review.",
      },
      {
        subtitle: "IoT & Drone Sensor Data",
        text: "Micro-climate readings, soil moisture metrics, and drone scouting telemetry captured on farms participating in our Tech-Based Farm Management program.",
      },
    ],
  },
  {
    id: "usage",
    title: "3. How We Use Farmer Data",
    content:
      "All collected information is used strictly to enhance farming outcomes and execute contracted services:",
    points: [
      "Formulating personalized stage-wise spray and fertigation schedules.",
      "Managing Bio-Boosted Nursery seedling germination, pre-orders, and dispatch timing.",
      "Facilitating direct market buyback pickups and processing farmer payments.",
      "Executing Measure, Report, and Verify (MRV) protocols for Carbon Credit payouts.",
      "Improving AI crop-health diagnostic models to provide faster disease identification.",
    ],
  },
  {
    id: "pledge",
    title: "4. Strict Data Protection Pledge — No Third-Party Sales",
    content:
      "We believe that a farmer's crop telemetry and personal data belong to the farmer. Anzix Farm Technologies Private Limited pledges unequivocally:\n\n• WE DO NOT SELL, RENT, OR TRADE INDIVIDUAL FARM DATA, PHONE NUMBERS, OR PLOT TELEMETRY TO THIRD-PARTY DATA BROKERS OR MARKETING FIRMS.\n• Data is shared with certified input partners or buyers only when explicitly authorized by you to fulfill a buyback contract or specialized input delivery.",
  },
  {
    id: "security",
    title: "5. Data Security & Storage Controls",
    content:
      "We implement industry-standard administrative, physical, and technical safeguards to protect your information against unauthorized access, loss, or alteration. Diagnostic images and telemetry data are stored on encrypted cloud servers with role-based access restrictions limited to authorized Agaate agronomists and technical personnel.",
  },
  {
    id: "rights",
    title: "6. Your Rights under Indian Privacy Laws",
    content:
      "In compliance with the Digital Personal Data Protection Act (DPDP Act) and applicable Indian regulations, you hold the following rights:\n\n• Right to Access: Request a summary of your personal data and crop records maintained by Agaate.\n• Right to Correction: Request instant updates to your phone number, farm location, or crop profile.\n• Right to Erasure: Request deletion of your personal account data, subject to statutory tax and financial retention obligations.",
  },
  {
    id: "contact",
    title: "7. Privacy Officer & Legal Contact",
    content:
      "For privacy inquiries, data access requests, or grievance redressal, please contact our Data Governance Desk:\n\nPrivacy Officer: Anzix Farm Technologies Private Limited\nEmail: info@agaate.in\nRegistered Office: I-205 Bestech Park View Ananda, Sector-81, Narsinghpur, Gurugram, Haryana 122004\nCorporate Identification Number (CIN): U46200HR2024PTC121982",
  },
];

function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("overview");

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
        eyebrow="DATA PROTECTION & PRIVACY"
        title={
          <>
            Safeguarding Farmer Telemetry & <br />
            <span className="italic text-terracotta">Personal Information.</span>
          </>
        }
        description="Comprehensive privacy framework of Anzix Farm Technologies Private Limited regarding personal data, farm location, diagnostic images, and agronomy telemetry."
      >
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-forest/20 bg-cream/90 px-4 py-2 font-jet text-[11px] font-bold uppercase tracking-wider text-forest">
          <ShieldCheck className="h-4 w-4 text-moss" />
          <span>DPDP Act Compliant · Anzix Farm Technologies Pvt Ltd</span>
        </div>
      </PageHero>

      {/* At-a-Glance Privacy Guarantees */}
      <section className="relative z-10 border-y border-forest/15 bg-bone/90 py-10 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex items-start gap-4 rounded-2xl bg-cream p-5 border border-forest/15 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-terracotta/15 text-terracotta">
                <EyeSlash className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-forest-deep">Zero Data Selling</h4>
                <p className="mt-1 text-xs text-forest/70 leading-relaxed">
                  We never sell farmer phone numbers, GPS coordinates, or crop records to third parties.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-cream p-5 border border-forest/15 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-moss/20 text-forest-deep">
                <Plant className="h-5 w-5 text-moss" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-forest-deep">Agronomy Use Only</h4>
                <p className="mt-1 text-xs text-forest/70 leading-relaxed">
                  Telemetry and diagnostic photos are strictly used to improve your crop yield and protection.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-cream p-5 border border-forest/15 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest/15 text-forest">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-forest-deep">Encrypted Storage</h4>
                <p className="mt-1 text-xs text-forest/70 leading-relaxed">
                  Stored on secure cloud infrastructure with strict role-based access for agronomists.
                </p>
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
                  PRIVACY TOC
                </span>
                {PRIVACY_SECTIONS.map((sec) => (
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
              {PRIVACY_SECTIONS.map((sec) => (
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

                  {/* Subsections if present */}
                  {sec.subsections && (
                    <div className="mt-6 space-y-4">
                      {sec.subsections.map((sub, idx) => (
                        <div key={idx} className="rounded-2xl bg-bone/60 p-4 border border-forest/10">
                          <h4 className="font-serif text-base font-bold text-forest-deep">
                            {sub.subtitle}
                          </h4>
                          <p className="mt-1 text-xs sm:text-sm text-forest/80 leading-relaxed">
                            {sub.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Points if present */}
                  {sec.points && (
                    <ul className="mt-4 space-y-2 font-sans text-sm text-forest/80">
                      {sec.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-terracotta" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
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
