import { EnvelopeSimple, ChatCircleText, Phone } from "@phosphor-icons/react";
import { EMAIL, MAILTO_URL, PRIMARY_PHONE, TEL_PRIMARY, WHATSAPP_URL } from "./data";
import { track } from "@/lib/analytics";

export default function QuickContactBar() {
  return (
    <section aria-label="Quick contact options" className="border-b border-[#143d31]/10 bg-[#f4f8f5]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#5d7d37]" />
          <div>
            <p className="font-display text-sm font-bold text-[#143d31]">Direct Agronomy Desk</p>
            <p className="font-mono text-xs text-[#4f624f]">Typical reply &lt; 15 mins · 7:30 AM – 8:00 PM IST</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono font-bold">
          <a
            href={`tel:${TEL_PRIMARY}`}
            onClick={() => track("phone_clicked", { source: "quickbar", line: "primary" })}
            className="inline-flex items-center gap-2 text-[#143d31] hover:text-[#5d7d37] transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-[#5d7d37]" weight="bold" />
            <span>{PRIMARY_PHONE}</span>
          </a>
          <a
            href={MAILTO_URL}
            onClick={() => track("email_clicked", { source: "quickbar" })}
            className="inline-flex items-center gap-2 text-[#143d31] hover:text-[#5d7d37] transition-colors"
          >
            <EnvelopeSimple className="h-3.5 w-3.5 text-[#5d7d37]" weight="bold" />
            <span>{EMAIL}</span>
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_clicked", { source: "quickbar" })}
            className="inline-flex items-center gap-1.5 text-[#5d7d37] hover:text-[#143d31] transition-colors"
          >
            <ChatCircleText className="h-3.5 w-3.5" weight="fill" />
            <span>Instant WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
