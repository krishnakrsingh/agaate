import { ChatCircleText, Phone } from "@phosphor-icons/react";
import { TEL_PRIMARY, WHATSAPP_URL } from "./data";
import { track } from "@/lib/analytics";

export default function MobileStickyContactBar({ hidden }: { hidden?: boolean }) {
  if (hidden) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#143d31]/10 bg-white/95 px-4 pt-3 pb-3 backdrop-blur-md sm:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-3">
        <a
          href={`tel:${TEL_PRIMARY}`}
          onClick={() => track("phone_clicked", { source: "mobile_sticky" })}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#143d31] px-4 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#1b4e3f] focus-visible:outline-none"
        >
          <Phone className="h-4 w-4" weight="fill" />
          <span>Call Desk</span>
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_clicked", { source: "mobile_sticky" })}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#a3e635] px-4 text-xs font-bold text-[#0d2820] shadow-xs transition-colors hover:bg-[#91d820] focus-visible:outline-none"
        >
          <ChatCircleText className="h-4 w-4" weight="fill" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
