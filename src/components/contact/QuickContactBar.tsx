import { Envelope, ChatCircleText, Phone, Clock } from "@phosphor-icons/react";
import { useSiteContact } from "@/contexts/SiteContactContext";
import { track } from "@/lib/analytics";

export default function QuickContactBar() {
  const { contact, telPrimaryHref, whatsappUrl, mailtoInquiryUrl } = useSiteContact();
  return (
    <section
      aria-label="Quick contact options"
      className="border-b border-[#143d31]/10 bg-white/70 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#143d31]/10 text-[#143d31]">
            <Clock className="h-4 w-4 text-[#5d7d37]" weight="duotone" />
          </div>
          <div>
            <p className="font-sans text-xs sm:text-sm font-semibold text-[#143d31]">
              Typical reply within 2 hours
            </p>
            <p className="font-sans text-[11px] sm:text-xs text-[#4f624f]">
              Farm Operating Hours · 7:30 AM – 8:00 PM IST (Mon–Sat)
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
          <a
            href={telPrimaryHref}
            onClick={() => track("phone_clicked", { source: "quickbar", line: "primary" })}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#143d31]/15 bg-white px-3.5 py-1.5 font-medium text-[#143d31] shadow-2xs transition-colors hover:border-[#143d31] hover:bg-[#143d31]/5"
          >
            <Phone className="h-3.5 w-3.5 text-[#5d7d37]" weight="bold" />
            <span>{contact.primaryPhoneDisplay}</span>
          </a>
          <a
            href={mailtoInquiryUrl}
            onClick={() => track("email_clicked", { source: "quickbar" })}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#143d31]/15 bg-white px-3.5 py-1.5 font-medium text-[#143d31] shadow-2xs transition-colors hover:border-[#143d31] hover:bg-[#143d31]/5"
          >
            <Envelope className="h-3.5 w-3.5 text-[#5d7d37]" weight="bold" />
            <span>{contact.primaryEmail}</span>
          </a>
          <a
            href={whatsappUrl("contact")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_clicked", { source: "quickbar" })}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#a3e635] bg-[#a3e635]/20 px-3.5 py-1.5 font-semibold text-[#0d2820] transition-colors hover:bg-[#a3e635]/35"
          >
            <ChatCircleText className="h-3.5 w-3.5 text-[#143d31]" weight="fill" />
            <span>WhatsApp Quick Desk</span>
          </a>
        </div>
      </div>
    </section>
  );
}
