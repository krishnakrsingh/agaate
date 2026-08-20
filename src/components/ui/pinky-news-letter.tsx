import React, { useState } from "react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";

export interface NewsLetterProps {
  title?: string;
  description?: React.ReactNode;
  placeholder?: string;
  onSubscribe?: (email: string) => void;
}

export default function NewsLetter({
  title = "Kisaan Mall · Coming Soon",
  description = (
    <>
      India's premier modern agri-input store for verified seeds, bio-boosters & farm hardware.
      <br />
      Sign up now and stay in the loop for our official launch.
    </>
  ),
  placeholder = "Enter your email or mobile number",
  onSubscribe,
}: NewsLetterProps) {
  const [inputVal, setInputVal] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    if (onSubscribe) {
      onSubscribe(inputVal.trim());
    }
    setIsSubmitted(true);
  };

  return (
    <main className="relative flex min-h-[calc(100vh-140px)] w-full items-center justify-center bg-white px-6 py-20 sm:py-28">
      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
        {/* Brand Headline with Display Font */}
        <h1 className="font-display text-5xl font-bold tracking-tight text-[#143d31] sm:text-6xl md:text-7xl">
          {title}
        </h1>

        {/* Clean Description text */}
        <p className="mt-5 font-sans text-base font-normal leading-relaxed text-slate-600 sm:text-lg">
          {description}
        </p>

        {/* Clean Standard Rectangular Form (No Pill) */}
        <div className="mt-8">
          {isSubmitted ? (
            <div className="mx-auto flex max-w-md items-center justify-center gap-2.5 rounded-xl border border-[#143d31]/20 bg-[#fafbf7] px-6 py-4 font-sans text-sm font-semibold text-[#143d31] shadow-xs">
              <CheckCircle className="h-5 w-5 text-[#5d7d37]" weight="fill" />
              <span>Thank you! We will notify you when we launch.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="text"
                required
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={placeholder}
                className="w-full flex-1 rounded-xl border border-stone-300 bg-white px-4 py-3.5 font-sans text-sm text-[#143d31] placeholder-slate-400 shadow-2xs transition-colors focus:border-[#143d31] focus:outline-none focus:ring-2 focus:ring-[#143d31]/10"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#143d31] px-6 py-3.5 font-sans text-sm font-semibold text-white shadow-xs transition-all hover:bg-[#0d2a21] active:scale-[0.98]"
              >
                <span>Notify Me</span>
                <ArrowRight className="h-4 w-4 text-[#a3e635]" weight="bold" />
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
