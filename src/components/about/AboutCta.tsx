import {
  Buildings,
  ChatCircleText,
  Download,
  IdentificationCard,
  MapPin,
  Phone
} from "@phosphor-icons/react";
import {
  brochureHref,
  complianceHighlights,
  PHONE_DISPLAY,
  TEL_ABOUT,
  WHATSAPP_ABOUT_URL,
} from "./data";

const fieldIcons = {
  Entity: Buildings,
  CIN: IdentificationCard,
  "Registered Office": MapPin,
} as const;

export default function AboutCta() {
  return (
    <section
      id="about-cta"
      aria-labelledby="about-cta-heading"
      className="border-t border-neutral-200 bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* One shared shell — CTA + credentials */}
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_18px_40px_-28px_rgba(20,61,49,0.22)]">
          <div className="relative grid lg:grid-cols-[1.05fr_0.95fr]">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_100%_0%,rgba(93,125,55,0.06),transparent_55%)]"
              aria-hidden="true"
            />

            <div className="relative flex flex-col justify-center px-8 py-10 md:px-12 md:py-14">
              <div className="inline-flex items-center gap-2">
                <span className="h-px w-5 bg-forest/50" aria-hidden="true" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-forest">
                  Start with Agaate
                </p>
              </div>

              <h2
                id="about-cta-heading"
                className="mt-4 max-w-md font-display text-3xl font-semibold tracking-tight text-forest-deep md:text-[2.5rem] md:leading-[1.15]"
              >
                From seed to sale, we stand with the farmer.
              </h2>

              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-600">
                Talk to an agronomist, reserve Bio-Boosted saplings, or download our brochure.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={WHATSAPP_ABOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-forest-deep px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(20,61,49,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
                >
                  <ChatCircleText className="h-4 w-4" strokeWidth={1.75} />
                  WhatsApp
                </a>
                <a
                  href={TEL_ABOUT}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-forest-deep transition-all duration-300 hover:-translate-y-0.5 hover:border-forest/35 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
                >
                  <Phone className="h-4 w-4" strokeWidth={1.75} />
                  Call {PHONE_DISPLAY}
                </a>
                <a
                  href={brochureHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:text-forest-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
                >
                  <Download className="h-4 w-4" strokeWidth={1.75} />
                  Brochure
                </a>
              </div>
            </div>

            <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden border-t border-neutral-100 bg-[#f7faf7] px-6 py-8 lg:min-h-[340px] lg:border-l lg:border-t-0 lg:px-8">
              <img
                src="/farm.png"
                alt="Agaate farm and agronomy support"
                className="relative z-10 mx-auto max-h-[280px] w-full object-contain drop-shadow-[0_20px_32px_rgba(20,61,49,0.18)] lg:max-h-[320px]"
                width={800}
                height={700}
              />
            </div>
          </div>

          {/* Quiet credentials band — same card, no second shell */}
          <div
            id="compliance"
            aria-labelledby="compliance-heading"
            className="border-t border-neutral-200 bg-[#fafbfa]"
          >
            <div className="flex flex-col gap-5 px-6 py-5 md:px-10 md:py-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
              <div className="max-w-xs shrink-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5d7d37]">
                  Registered entity
                </p>
                <h3
                  id="compliance-heading"
                  className="mt-1 font-display text-base font-semibold tracking-tight text-forest-deep md:text-lg"
                >
                  Anzix Farm Technologies Pvt Ltd
                </h3>
              </div>

              <dl className="grid flex-1 grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
                {complianceHighlights.map((item) => {
                  const Icon =
                    fieldIcons[item.label as keyof typeof fieldIcons] ?? Buildings;
                  return (
                    <div key={item.label} className="min-w-0">
                      <dt className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                        <Icon className="h-3 w-3 shrink-0 text-[#5d7d37]/70" strokeWidth={1.75} />
                        {item.label}
                      </dt>
                      <dd className="mt-1 break-words text-sm font-medium leading-snug text-forest-deep">
                        {item.value}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>

            <p className="border-t border-neutral-200/80 px-6 py-3.5 text-center text-[11px] leading-relaxed text-neutral-500 md:px-10 md:text-xs">
              Agaate is the operating brand of Anzix Farm Technologies Pvt Ltd. Company details above
              are listed for transparency and can be verified on the Ministry of Corporate Affairs
              portal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
