import { ChatCircleText, Phone } from "@phosphor-icons/react";
import heroImage from "@/assets/contact-team.png";
import { PRIMARY_PHONE, TEL_PRIMARY, WHATSAPP_URL } from "./data";
import { track } from "@/lib/analytics";

export default function ContactHero() {
  return (
    <section className="border-b border-neutral-200 bg-white pt-28 md:pt-32">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-14 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:pb-20">
        <div>
          <p className="text-sm font-medium text-forest">Contact</p>
          <h1 className="mt-3 max-w-xl font-display text-4xl font-semibold tracking-tight text-forest-deep md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            Speak with the Agaate team in Gurugram
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-neutral-600 md:text-lg">
            Crop advice, nursery orders, farm setup, or a visit to our hubs — we typically reply
            within 2 business hours.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`tel:${TEL_PRIMARY}`}
              onClick={() => track("phone_clicked", { source: "hero" })}
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-forest-deep px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
            >
              <Phone className="h-4 w-4" strokeWidth={1.75} />
              Call {PRIMARY_PHONE}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_clicked", { source: "hero" })}
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-forest-deep transition-colors hover:border-forest/40 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
            >
              <ChatCircleText className="h-4 w-4" strokeWidth={1.75} />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100 lg:aspect-[5/4]">
          <img
            src={heroImage}
            alt="The Agaate team at the Gurugram hub"
            className="h-full w-full object-cover object-center"
            width={960}
            height={768}
          />
        </div>
      </div>
    </section>
  );
}
