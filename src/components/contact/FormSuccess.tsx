import { Check, MessageCircle } from "lucide-react";
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
  const topic = CONSULTATION_TOPICS.find((t) => t.id === topicId)?.label;
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
      className="py-4 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-forest/10 text-forest-deep">
        <Check className="h-6 w-6" strokeWidth={2} />
      </div>
      <p className="mt-4 text-sm font-medium text-forest">Request received</p>
      <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-forest-deep">
        Reference: {ticketId}
      </h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
        Got it, <strong className="font-semibold text-forest-deep">{name || "there"}</strong>. An
        advisor will reach you within 2 business hours
        {topic ? (
          <>
            {" "}
            about <strong className="font-semibold text-forest-deep">{topic}</strong>
          </>
        ) : null}
        .
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={whatsappHref || WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_clicked", { source: "form_success" })}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-forest-deep px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
          Continue on WhatsApp
        </a>
        <button
          type="button"
          onClick={onReset}
          className="w-full rounded-md border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-forest-deep transition-colors hover:bg-neutral-50 sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
        >
          Submit another inquiry
        </button>
      </div>
    </motion.div>
  );
}
