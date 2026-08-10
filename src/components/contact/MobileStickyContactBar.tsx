import { MessageCircle, Phone } from "lucide-react";
import { TEL_PRIMARY, WHATSAPP_URL } from "./data";
import { track } from "@/lib/analytics";

export default function MobileStickyContactBar({ hidden }: { hidden?: boolean }) {
  if (hidden) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white/95 px-4 pt-3 backdrop-blur-md sm:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-3">
        <a
          href={`tel:${TEL_PRIMARY}`}
          onClick={() => track("phone_clicked", { source: "mobile_sticky" })}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-forest-deep px-4 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
        >
          <Phone className="h-4 w-4" strokeWidth={1.75} />
          Call
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_clicked", { source: "mobile_sticky" })}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-4 text-sm font-semibold text-forest-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
