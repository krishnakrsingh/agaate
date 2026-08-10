import { MessageCircle, Phone } from "lucide-react";
import advisorImage from "@/assets/about-farmer-advisor.png";
import { PRIMARY_PHONE, TEL_PRIMARY, WHATSAPP_URL } from "./data";
import { track } from "@/lib/analytics";

export default function CtaBanner() {
  return (
    <section aria-labelledby="cta-heading" className="border-t border-neutral-200 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid overflow-hidden rounded-lg border border-neutral-200 lg:grid-cols-2">
          <div className="flex flex-col justify-center bg-white p-8 md:p-12">
            <p className="text-sm font-medium text-forest">Prefer to talk</p>
            <h2
              id="cta-heading"
              className="mt-2 font-display text-3xl font-semibold tracking-tight text-forest-deep"
            >
              Call or message us directly
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
              No form required. Our Gurugram desk is available during farm operating hours.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${TEL_PRIMARY}`}
                onClick={() => track("cta_banner_clicked", { action: "phone" })}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-forest-deep px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
              >
                <Phone className="h-4 w-4" strokeWidth={1.75} />
                Call {PRIMARY_PHONE}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("cta_banner_clicked", { action: "whatsapp" })}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-forest-deep transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                WhatsApp
              </a>
            </div>
          </div>
          <div className="relative min-h-[240px] bg-neutral-100 lg:min-h-0">
            <img
              src={advisorImage}
              alt="Agaate field advisor with a farmer"
              className="absolute inset-0 h-full w-full object-cover"
              width={800}
              height={600}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
