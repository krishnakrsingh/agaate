import { Envelope, ChatCircleText, Phone } from "@phosphor-icons/react";
import { EMAIL, MAILTO_URL, PRIMARY_PHONE, TEL_PRIMARY, WHATSAPP_URL } from "./data";
import { track } from "@/lib/analytics";

export default function QuickContactBar() {
  return (
    <section aria-label="Quick contact options" className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div>
          <p className="text-sm font-medium text-forest-deep">Typical reply within 2 hours</p>
          <p className="mt-0.5 text-sm text-neutral-500">Farm hours · 7:30 AM – 8:00 PM IST</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <a
            href={`tel:${TEL_PRIMARY}`}
            onClick={() => track("phone_clicked", { source: "quickbar", line: "primary" })}
            className="inline-flex items-center gap-2 text-forest-deep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
          >
            <Phone className="h-3.5 w-3.5 text-neutral-400" strokeWidth={1.75} />
            {PRIMARY_PHONE}
          </a>
          <a
            href={MAILTO_URL}
            onClick={() => track("email_clicked", { source: "quickbar" })}
            className="inline-flex items-center gap-2 text-forest-deep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
          >
            <Envelope className="h-3.5 w-3.5 text-neutral-400" strokeWidth={1.75} />
            {EMAIL}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_clicked", { source: "quickbar" })}
            className="inline-flex items-center gap-1.5 font-medium text-forest hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
          >
            <ChatCircleText className="h-3.5 w-3.5" strokeWidth={1.75} />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
