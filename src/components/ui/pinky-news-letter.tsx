import React, { useRef, useState } from "react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { Reveal } from "@/components/common/motion";
import { submitNewsletterSignup } from "@/functions/submit-newsletter";

function makeClientToken() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export interface NewsLetterProps {
  badge?: string;
  title?: string;
  description?: React.ReactNode;
  placeholder?: string;
  successMessage?: string;
  sourcePage?: string;
  onSubscribe?: (contact: string) => void;
}

export default function NewsLetter({
  badge = "Launching Soon",
  title = "Kisaan Mall",
  description = "Direct access to 100% genuine hybrid seeds, biologicals, and farm inputs. Join the waitlist for priority launch updates.",
  placeholder = "Enter email or mobile number",
  successMessage = "You're on the list. We'll be in touch soon!",
  sourcePage = "/kisaan-mall",
  onSubscribe,
}: NewsLetterProps) {
  const [inputVal, setInputVal] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startedAt = useRef(Date.now());
  const clientToken = useRef(makeClientToken());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isSubmitting) return;
    setError(null);
    setIsSubmitting(true);

    if (onSubscribe) {
      onSubscribe(inputVal.trim());
      setIsSubmitted(true);
      setIsSubmitting(false);
      return;
    }

    const res = await submitNewsletterSignup({
      data: {
        contact: inputVal.trim(),
        sourcePage,
        clientToken: clientToken.current,
        startedAt: startedAt.current,
        honeypot: "",
      },
    });

    setIsSubmitting(false);

    if (res.ok) {
      setIsSubmitted(true);
      clientToken.current = makeClientToken();
      startedAt.current = Date.now();
      return;
    }

    setError(res.error ?? "Could not save your signup. Please try again.");
  };

  return (
    <main className="relative flex min-h-[calc(100vh-140px)] w-full items-center justify-center bg-[#f4f8f5] px-6 py-20">
      <div className="relative z-10 mx-auto w-full max-w-xl text-center">
        <Reveal variant="fade-up" className="flex flex-col items-center space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#143d31]/12 bg-white/80 px-3.5 py-1 backdrop-blur-xs shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5d7d37] animate-pulse" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#5d7d37]">
              {badge}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#143d31]">
            {title}
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#4f624f] max-w-md leading-relaxed font-normal">
            {description}
          </p>

          <div className="w-full max-w-md pt-2">
            {isSubmitted ? (
              <div className="flex items-center justify-center gap-2.5 rounded-full border border-[#143d31]/15 bg-white px-6 py-3 font-sans text-xs sm:text-sm font-semibold text-[#143d31] shadow-2xs">
                <CheckCircle className="h-4.5 w-4.5 text-[#5d7d37]" weight="fill" />
                <span>{successMessage}</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="group flex items-center rounded-full border border-[#143d31]/15 bg-white p-1.5 shadow-2xs transition-all duration-200 focus-within:border-[#143d31] focus-within:ring-2 focus-within:ring-[#143d31]/10"
              >
                <input
                  type="text"
                  required
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={placeholder}
                  disabled={isSubmitting}
                  className="w-full bg-transparent px-4 py-2 font-sans text-xs sm:text-sm text-[#143d31] placeholder-[#4f624f]/60 outline-none disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#143d31] px-5 py-2.5 font-sans text-xs sm:text-sm font-semibold text-white shadow-xs transition-all hover:bg-[#1b4e3f] active:scale-[0.98] disabled:opacity-60"
                >
                  <span>{isSubmitting ? "Sending…" : "Notify Me"}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#a3e635]" weight="bold" />
                </button>
              </form>
            )}
            {error && !isSubmitted && (
              <p className="mt-2 text-xs text-rose-600 text-center">{error}</p>
            )}
          </div>
        </Reveal>
      </div>
    </main>
  );
}
