import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import {
  ArrowClockwise,
  BookOpen,
  CaretDown,
  CaretRight,
  Check,
  FileText,
  Gavel,
  Plant,
  Question,
  Scales,
  ShieldCheck,
  ShieldWarning,
  Storefront,
  WarningCircle,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, PageHero, Reveal } from "@/components/common/motion";

export const Route = createFileRoute("/{-$locale}/terms-of-service")({
  component: TermsOfServicePage,
});

const TERMS_SECTIONS = [
  {
    id: "corporate",
    title: "1. Corporate Entity & Scope of Agreement",
    content:
      "These Terms of Service ('Terms') constitute a legally binding agreement between you ('User', 'Farmer', or 'Client') and Anzix Farm Technologies Private Limited ('Agaate', 'Company', 'we', or 'us'), incorporated on May 28, 2024 (Corporate Identification Number: U46200HR2024PTC121982), having its registered office at I-205 Bestech Park View Ananda, Sector-81, Narsinghpur, Gurugram, Haryana 122004.\n\nThese Terms govern your access to and use of our digital portal (agaate.in), physical facilities (Agaate Anzix Farm in Kukrola and Agaate Kisan Mall in Bhora Kalan), nursery pre-booking systems, agronomy advisory services, and buyback programs.",
  },
  {
    id: "nursery",
    title: "2. Bio-Boosted Nursery Pre-Orders & Sapling Delivery",
    content:
      "Agaate operates a 17-acre smart nursery facility producing certified Bio-Boosted vegetable seedlings. The following operational terms govern nursery orders:",
    points: [
      "Reservations & Pre-Orders: Seedling orders must be reserved in advance to align with regional crop calendars and nursery propagation schedules.",
      "90%-98% Germination & Survival Baseline: Our Bio-Boosted seedlings are propagated under climate-controlled conditions. Survival guarantees apply provided the cultivator adheres to recommended soil preparation, basal dose planning, and transit care guidelines.",
      "Dispatch Windows & Pickup: Pre-orders must be collected from the Kukrola Farm or designated regional hub within the confirmed 48-hour pickup window to maintain root viability.",
      "Cancellations & Deposits: Cancellations requested 14 days prior to seed propagation are eligible for full refund or deposit transfer. Cancellations requested after propagation has commenced are non-refundable due to biological perishability.",
    ],
  },
  {
    id: "mall",
    title: "3. Kisan Mall Retail Purchases & Hardware",
    content:
      "Purchases made through the Agaate Kisan Mall (physical retail store or digital storefront) for seeds, biocures, biological inputs, drip hardware, and mulching materials are subject to standard quality certifications. All biological inputs (such as Biocure F, Biocure B, Biovita) carry manufacturer expiry dates and dosage instructions that must be strictly followed.",
  },
  {
    id: "buyback",
    title: "4. Buyback Ecosystem & Crop Produce Grading",
    content:
      "Farmers enrolled in Agaate Buyback Programs benefit from guaranteed market linkage and transparent pricing:",
    points: [
      "Grade Verification: Produce purchased under buyback contracts is graded upon farm-gate pickup based on agreed physical standards (e.g. skin quality, average fruit weight, absence of soil rot).",
      "Pricing Structure: Buyback rates are locked via written program agreement or communicated transparently prior to harvest dispatch.",
      "Payout Timelines: Guaranteed buyback payouts are credited directly to the farmer's verified bank account within 3 to 5 business days post-inspection.",
    ],
  },
  {
    id: "advisory",
    title: "5. Agronomic Advisory Scope & Field Disclaimer",
    content:
      "Agaate agronomists provide scientific recommendations based on soil test reports, micro-climate sensor data, and field observations. However, agricultural outcomes depend on extrinsic environmental variables, extreme weather events, pest outbreaks, and grower execution. Advisory services provide optimized decision support but do not guarantee financial returns against unmanageable force majeure occurrences.",
  },
  {
    id: "carbon",
    title: "6. Carbon Credit Program Enrollment",
    content:
      "Farmers participating in the Agaate Carbon Credit Program agree to allow periodic field inspection and practice logging (such as zero-tillage, drip irrigation, and zero residue burning) required for third-party Measure, Report, and Verify (MRV) auditing. Credit payouts are disbursed upon verification of generated carbon credits.",
  },
  {
    id: "intellectual",
    title: "7. Intellectual Property Rights",
    content:
      "All content, branding, proprietary agronomy advisory models, Smart Crop Cycle schedules, logos, and digital code on agaate.in are the sole intellectual property of Anzix Farm Technologies Private Limited. Unauthorized duplication or commercial exploitation is strictly prohibited.",
  },
  {
    id: "jurisdiction",
    title: "8. Governing Law & Dispute Resolution",
    content:
      "These Terms shall be governed by and construed in accordance with the laws of India. Any legal dispute arising out of or in connection with Agaate services shall be subject to the exclusive jurisdiction of the competent courts at Gurugram, Haryana.",
  },
];

const TERMS_FAQ = [
  {
    q: "Can I modify my seedling pre-order quantity after booking?",
    a: "Modifications can be made up to 10 days before seed propagation starts by calling your Kisan Sathi or the Gurugram hotline at +91 83500 85005.",
  },
  {
    q: "What happens if a seedling batch suffers transit damage?",
    a: "If saplings are damaged during Agaate-managed transport, notify the delivery driver immediately. Verified damaged trays will be replaced or credited to your account.",
  },
  {
    q: "How are buyback rates calculated for watermelons and chillies?",
    a: "Buyback rates reflect real-time market benchmark indices plus premium bonuses for export-grade fruit form achieved via recommended staking and mulching techniques.",
  },
];

function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState("corporate");
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

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
        eyebrow="LEGAL TERMS & CONTRACTS"
        title={
          <>
            Terms of Service & <br />
            <span className="italic text-terracotta">Operational Policies.</span>
          </>
        }
        description="Clear operational terms governing Bio-Boosted nursery reservations, Kisan Mall purchases, buyback guarantees, and agronomy advisories under Anzix Farm Technologies Private Limited."
      >
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-forest/20 bg-cream/90 px-4 py-2 font-jet text-[11px] font-bold uppercase tracking-wider text-forest">
          <Gavel className="h-4 w-4 text-moss" />
          <span>Governing Law: Gurugram, Haryana · Anzix Farm Technologies Pvt Ltd</span>
        </div>
      </PageHero>

      {/* Terms Summary Cards */}
      <section className="relative z-10 border-y border-forest/15 bg-bone/90 py-10 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex items-start gap-4 rounded-2xl bg-cream p-5 border border-forest/15 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest/15 text-forest">
                <Plant className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-forest-deep">Nursery Bookings</h4>
                <p className="mt-1 text-xs text-forest/70 leading-relaxed">
                  Clear 14-day pre-propagation cancellation terms and 48-hr pickup windows.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-cream p-5 border border-forest/15 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-terracotta/15 text-terracotta">
                <ArrowClockwise className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-forest-deep">Assured Buyback</h4>
                <p className="mt-1 text-xs text-forest/70 leading-relaxed">
                  Transparent grading standards and direct bank payouts within 3 to 5 business days.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-cream p-5 border border-forest/15 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-moss/20 text-forest-deep">
                <Scales className="h-5 w-5 text-moss" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-forest-deep">
                  Legal Jurisdiction
                </h4>
                <p className="mt-1 text-xs text-forest/70 leading-relaxed">
                  Enforceable under Indian law under the jurisdiction of Gurugram courts.
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
                  TERMS TOC
                </span>
                {TERMS_SECTIONS.map((sec) => (
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
              {TERMS_SECTIONS.map((sec) => (
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

                  {/* Points if present */}
                  {sec.points && (
                    <ul className="mt-4 space-y-2.5 font-sans text-sm text-forest/80">
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

              {/* Terms FAQ Accordion */}
              <div className="rounded-3xl border border-forest/20 bg-bone/60 p-8 sm:p-10">
                <span className="block font-jet text-[10px] font-bold uppercase tracking-[0.2em] text-moss mb-2">
                  COMMON QUESTIONS
                </span>
                <h3 className="font-serif text-2xl font-bold text-forest-deep mb-6">
                  Frequently Asked Terms & Order Queries
                </h3>

                <div className="space-y-4">
                  {TERMS_FAQ.map((faq, idx) => {
                    const isOpen = openFaqIdx === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl bg-cream border border-forest/15 overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                          className="w-full flex items-center justify-between p-4 text-left font-serif text-base font-bold text-forest-deep"
                        >
                          <span>{faq.q}</span>
                          <CaretDown
                            className={`h-4 w-4 text-terracotta transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="p-4 pt-0 font-sans text-xs sm:text-sm text-forest/80 border-t border-forest/10 bg-cream/50">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
