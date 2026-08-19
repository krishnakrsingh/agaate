import { CheckCircle, ChatCircleText, ArrowCounterClockwise } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { EASE } from "@/components/common/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { CONSULTATION_TOPICS, WHATSAPP_URL } from "./data";
import { track } from "@/lib/analytics";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";

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
  const topic = CONSULTATION_TOPICS.find((t) => t.id === topicId)?.label;
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
      className="py-6 text-center space-y-5"
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#143d31] text-[#a3e635] shadow-md">
        <CheckCircle className="h-8 w-8 text-[#a3e635]" weight="fill" />
      </div>

      <div>
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5d7d37]">
          Inquiry Successfully Dispatched
        </span>
        <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#143d31]">
          Reference Ticket: {ticketId}
        </h3>
      </div>

      <p className="mx-auto max-w-md text-sm sm:text-base leading-relaxed text-[#4f624f]">
        Thank you, <strong className="font-bold text-[#143d31]">{name || "Grower"}</strong>. A senior agronomist is reviewing your details
        {topic ? (
          <>
            {" "}for <strong className="font-bold text-[#143d31]">{topic}</strong>
          </>
        ) : null}
        . You will receive a direct callback within 2 business hours.
      </p>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <SlideUpPillButton
          href={whatsappHref || WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_clicked", { source: "form_success" })}
          variant="dark"
          size="lg"
          label="Track on WhatsApp"
          icon={<ChatCircleText className="h-4 w-4 text-[#a3e635]" />}
          iconPosition="left"
        />

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 cursor-pointer rounded-full border border-[#143d31]/15 bg-white px-5 py-2.5 text-xs font-mono font-bold text-[#143d31] transition-colors hover:bg-[#f4f8f5]"
        >
          <ArrowCounterClockwise className="h-3.5 w-3.5 text-[#5d7d37]" />
          Submit another inquiry
        </button>
      </div>
    </motion.div>
  );
}
