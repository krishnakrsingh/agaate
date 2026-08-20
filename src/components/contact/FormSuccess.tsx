import { CheckCircle, ChatCircleText, Copy, Check } from "@phosphor-icons/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/components/common/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { CONSULTATION_TOPICS, WHATSAPP_URL } from "./data";
import { track } from "@/lib/analytics";

export function FormSuccess({
  ticketId,
  name,
  topicId,
  onReset,
  whatsappHref,
}: {
  ticketId: string;
  name: string;
  topicId: string;
  onReset: () => void;
  whatsappHref: string;
}) {
  const [copied, setCopied] = useState(false);
  const topic = CONSULTATION_TOPICS.find((t) => t.id === topicId)?.label;
  const reducedMotion = usePrefersReducedMotion();

  const copyTicket = () => {
    if (ticketId) {
      navigator.clipboard.writeText(ticketId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.3, ease: EASE }}
      className="space-y-4 text-left"
      role="status"
      aria-live="polite"
    >
      <div className="bg-white rounded-xl sm:rounded-2xl border border-neutral-200/90 shadow-xs overflow-hidden">
        <div className="h-2.5 sm:h-3 w-full bg-[#143d31]" />
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shrink-0">
              <CheckCircle className="h-6 w-6 text-[#143d31]" weight="fill" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#143d31]">
                Your response has been recorded.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
                Our Gurugram agronomy team will reply within 15 minutes.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-neutral-50/70 p-4 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                  Reference Ticket ID
                </span>
                <p className="font-mono text-base sm:text-lg font-bold text-[#143d31]">
                  {ticketId}
                </p>
              </div>
              <button
                type="button"
                onClick={copyTicket}
                className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neutral-300 bg-white text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-2xs"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" weight="bold" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-neutral-500" />
                    <span>Copy ID</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 border-t border-neutral-200 pt-2.5">
              Thank you, <strong className="font-semibold text-[#143d31]">{name || "Grower"}</strong>.
              {topic ? (
                <>
                  {" "}Your request regarding <strong className="font-semibold text-[#143d31]">{topic}</strong> has been routed to our senior agronomy desk.
                </>
              ) : (
                " Your inquiry has been routed to our senior agronomy desk."
              )}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={whatsappHref || WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_clicked", { source: "form_success" })}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#143d31] hover:bg-[#18483a] px-6 py-2.5 text-sm font-bold text-[#a3e635] shadow-2xs transition-all cursor-pointer"
            >
              <ChatCircleText className="h-5 w-5 text-[#a3e635]" weight="bold" />
              <span>Track on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={onReset}
              className="cursor-pointer text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-900 underline underline-offset-4 py-2"
            >
              Submit another response
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
