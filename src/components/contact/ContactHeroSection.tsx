import { useState, useRef, useEffect, useMemo } from "react";
import {
  ChatCircleText,
  Phone,
  EnvelopeSimple,
  Clock,
  MapPin,
  Sparkle,
  PaperPlaneTilt,
  CaretDown,
  CheckCircle,
  ShieldCheck,
  Check,
} from "@phosphor-icons/react";
import { useParams } from "@tanstack/react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getLocalizedPath } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { submitLead } from "@/functions/submit-lead";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
import {
  PRIMARY_PHONE,
  TEL_PRIMARY,
  WHATSAPP_URL,
  EMAIL,
  MAILTO_URL,
  CONSULTATION_TOPICS,
  ACREAGE_OPTIONS,
  CROP_OPTIONS,
  CHANNEL_OPTIONS,
  FORM_STORAGE_KEY,
  MESSAGE_MAX,
} from "./data";
import { TextField, PhoneField, EmailField, SelectField, TextareaField, ConsentCheckbox } from "./fields";
import { FileUpload } from "./FileUpload";
import { FormSuccess } from "./FormSuccess";
import { Spinner } from "./Spinner";

gsap.registerPlugin(useGSAP);

type FormState = {
  name: string;
  phone: string;
  email: string;
  acreage: string;
  district: string;
  crop: string;
  channel: string;
  message: string;
  consent: boolean;
  honeypot: string;
};

const defaults: FormState = {
  name: "",
  phone: "",
  email: "",
  acreage: ACREAGE_OPTIONS[0],
  district: "",
  crop: CROP_OPTIONS[0],
  channel: CHANNEL_OPTIONS[0],
  message: "",
  consent: false,
  honeypot: "",
};

function normalizePhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

function validate(form: FormState, topic: string) {
  const errors: Partial<Record<keyof FormState | "topic", string>> = {};
  if (form.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!/^[6-9]\d{9}$/.test(normalizePhone(form.phone))) {
    errors.phone = "Please enter a valid 10-digit mobile number.";
  }
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!topic) errors.topic = "Please select a consultation topic.";
  if (!form.consent) errors.consent = "Please accept the privacy notice to proceed.";
  return errors;
}

function makeClientToken() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export default function ContactHeroSection({
  onSuccessChange,
}: {
  onSuccessChange?: (success: boolean) => void;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { locale } = useParams({ strict: false }) as { locale?: string };

  const [topic, setTopic] = useState("nursery");
  const [form, setForm] = useState<FormState>(defaults);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | "topic", string>>>({});
  const [showFarmDetails, setShowFarmDetails] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [offline, setOffline] = useState(
    typeof navigator !== "undefined" ? !navigator.onLine : false,
  );

  const startedAt = useRef(Date.now());
  const clientToken = useRef(makeClientToken());
  const startedTracked = useRef(false);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reduceMotion } = context.conditions as { reduceMotion: boolean };
          if (reduceMotion) return;

          const tl = gsap.timeline({ delay: 0.1 });

          tl.fromTo(
            ".contact-anim-left",
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" },
          ).fromTo(
            ".contact-anim-right",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
            "-=0.6",
          );
        },
      );

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  useEffect(() => {
    try {
      const urlTopic = new URLSearchParams(window.location.search).get("topic");
      if (urlTopic && CONSULTATION_TOPICS.some((t) => t.id === urlTopic)) {
        setTopic(urlTopic);
      }
      const raw = sessionStorage.getItem(FORM_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<FormState> & { topic?: string };
      setForm((prev) => ({ ...prev, ...parsed, honeypot: "", consent: false }));
      if (!urlTopic && parsed.topic && CONSULTATION_TOPICS.some((t) => t.id === parsed.topic)) {
        setTopic(parsed.topic);
      }
      if (parsed.acreage || parsed.crop || parsed.district) setShowFarmDetails(true);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (ticketId) return;
    const t = window.setTimeout(() => {
      try {
        sessionStorage.setItem(FORM_STORAGE_KEY, JSON.stringify({ ...form, topic }));
      } catch {
        // ignore
      }
    }, 400);
    return () => window.clearTimeout(t);
  }, [form, topic, ticketId]);

  useEffect(() => {
    const on = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  useEffect(() => {
    onSuccessChange?.(!!ticketId);
  }, [ticketId, onSuccessChange]);

  const privacyHref = getLocalizedPath("/privacy-policy", locale ?? "en");

  const whatsappHref = useMemo(() => {
    const topicLabel = CONSULTATION_TOPICS.find((t) => t.id === topic)?.label || "General";
    const text = encodeURIComponent(
      `Hello Agaate Team, I am reaching out for assistance and would appreciate a response at your earliest convenience.\n\n*Ticket ID:* ${ticketId || "AGA-2026-CONSULT"}\n*Topic:* ${topicLabel}\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Location:* ${form.district || "—"}\n*Acreage:* ${form.acreage}\n*Crop:* ${form.crop}\n*Message:* ${form.message || "Thank you."}`,
    );
    return `https://wa.me/918350085005?text=${text}`;
  }, [ticketId, topic, form]);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    if (!startedTracked.current) {
      startedTracked.current = true;
      track("contact_form_started", { topic });
    }
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const reset = () => {
    setTicketId(null);
    setForm(defaults);
    setErrors({});
    setFormError(null);
    setFile(null);
    setShowFarmDetails(false);
    setShowUpload(false);
    startedAt.current = Date.now();
    clientToken.current = makeClientToken();
    sessionStorage.removeItem(FORM_STORAGE_KEY);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const nextErrors = validate(form, topic);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      track("contact_form_error", { reason: "validation" });
      const firstKey = Object.keys(nextErrors)[0];
      const el = formRef.current?.querySelector(
        `[name="${firstKey}"], #${firstKey}`,
      ) as HTMLElement | null;
      el?.focus();
      return;
    }
    if (offline) {
      setFormError("You appear offline. Please call or WhatsApp us directly, or retry when connected.");
      return;
    }

    setIsSubmitting(true);
    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 15000);
      const result = await Promise.race([
        submitLead({
          data: {
            name: form.name,
            phone: form.phone,
            email: form.email || undefined,
            topic,
            acreage: form.acreage,
            crop: form.crop,
            district: form.district || undefined,
            channel: form.channel,
            message: form.message || undefined,
            consent: form.consent,
            honeypot: form.honeypot,
            startedAt: startedAt.current,
            clientToken: clientToken.current,
            sourcePage: typeof window !== "undefined" ? window.location.pathname : "/contact",
          },
        }),
        new Promise<never>((_, reject) => {
          controller.signal.addEventListener("abort", () => reject(new Error("timeout")));
        }),
      ]);
      window.clearTimeout(timeout);

      if (!result.ok) {
        setFormError(result.error);
        track("contact_form_error", { reason: result.code || "server" });
        return;
      }
      setTicketId(result.ticketId);
      sessionStorage.removeItem(FORM_STORAGE_KEY);
      track("contact_form_submitted", {
        topic,
        acreage: form.acreage,
        stored: result.stored,
      });
    } catch {
      setFormError(
        "We could not reach the server. Please try again, or WhatsApp / call us directly.",
      );
      track("contact_form_error", { reason: "network" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={containerRef}
      id="contact-hero"
      aria-label="Contact Agaate"
      className="relative w-full overflow-hidden bg-[#f4f8f5] pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 border-b border-[#143d31]/10 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ── LEFT COLUMN: Editorial Narrative, Direct Contacts & Telemetry ── */}
          <div className="lg:col-span-5 space-y-8 text-left">
            {/* Tag & Eyebrow */}
            <div className="contact-anim-left space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                  01 · Direct Agronomy &amp; Operations Desk
                </p>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[#143d31] leading-[1.1]">
                Let's discuss your farm's next season.
              </h1>

              <p className="font-sans text-sm sm:text-base text-[#4f624f] leading-relaxed">
                Connect directly with senior agronomists in Gurugram for sapling pre-orders, disease identification, soil planning, or visits to our 17-acre proving grounds.
              </p>
            </div>

            {/* Live Desk Status Indicator */}
            <div className="contact-anim-left inline-flex items-center gap-2.5 rounded-full bg-[#143d31]/5 border border-[#143d31]/10 px-3.5 py-1.5 text-xs font-mono text-[#143d31]">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5d7d37] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5d7d37]" />
              </span>
              <span className="font-bold">Desk Active (7:30 AM – 8:00 PM IST)</span>
              <span className="text-[#143d31]/30">·</span>
              <span className="text-[#5d7d37] font-semibold flex items-center gap-1">
                <Sparkle className="h-3 w-3" weight="fill" />
                &lt; 15 Min WhatsApp Reply
              </span>
            </div>

            {/* Direct Contact Channels List */}
            <div className="contact-anim-left space-y-4 pt-2 border-t border-[#143d31]/10">
              {/* WhatsApp Item */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_clicked", { source: "hero_list" })}
                className="group flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#143d31]/10 transition-all duration-300 hover:border-[#143d31]/30 hover:shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#143d31] text-[#a3e635] shrink-0 transition-transform duration-300 group-hover:scale-105">
                    <ChatCircleText className="h-5 w-5" weight="fill" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-[#143d31]">WhatsApp Agronomist</p>
                    <p className="font-sans text-xs text-[#4f624f]">Photo disease diagnosis &amp; dosage charts</p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#5d7d37] group-hover:translate-x-0.5 transition-transform">
                  Chat ↗
                </span>
              </a>

              {/* Phone Item */}
              <a
                href={`tel:${TEL_PRIMARY}`}
                onClick={() => track("phone_clicked", { source: "hero_list" })}
                className="group flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#143d31]/10 transition-all duration-300 hover:border-[#143d31]/30 hover:shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#143d31] text-white shrink-0 transition-transform duration-300 group-hover:scale-105">
                    <Phone className="h-5 w-5" weight="bold" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-[#143d31]">Central Phone Hotline</p>
                    <p className="font-mono text-xs font-semibold text-[#5d7d37]">{PRIMARY_PHONE}</p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#5d7d37] group-hover:translate-x-0.5 transition-transform">
                  Call ↗
                </span>
              </a>

              {/* Email Item */}
              <a
                href={MAILTO_URL}
                className="group flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#143d31]/10 transition-all duration-300 hover:border-[#143d31]/30 hover:shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#143d31]/5 text-[#143d31] shrink-0">
                    <EnvelopeSimple className="h-5 w-5" weight="bold" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-[#143d31]">Enterprise &amp; General Inquiries</p>
                    <p className="font-mono text-xs text-[#4f624f]">{EMAIL}</p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#5d7d37] group-hover:translate-x-0.5 transition-transform">
                  Email ↗
                </span>
              </a>
            </div>

            {/* Quick Guarantees Strip */}
            <div className="contact-anim-left pt-4 border-t border-[#143d31]/10 grid grid-cols-2 gap-3 text-xs font-sans text-[#4f624f]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#5d7d37] shrink-0" weight="fill" />
                <span>100% Free Initial Callback</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#5d7d37] shrink-0" weight="fill" />
                <span>ICAR-Compliant Advice</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Streamlined Seamless Form Container ── */}
          <div className="lg:col-span-7 contact-anim-right">
            <div className="rounded-3xl border border-[#143d31]/12 bg-white p-5 sm:p-7 md:p-9 shadow-sm">
              {ticketId ? (
                <FormSuccess
                  ticketId={ticketId}
                  name={form.name}
                  topicId={topic}
                  onReset={reset}
                  whatsappHref={whatsappHref}
                />
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Form Header with Title */}
                  <div className="border-b border-[#143d31]/10 pb-4">
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-[#143d31]">
                      Send Inquiry or Request Callback
                    </h2>
                    <p className="font-sans text-xs text-[#4f624f] mt-0.5">
                      Select a topic so our lead specialist is briefed before reaching out.
                    </p>
                  </div>

                  {/* Topic Chips Selector */}
                  <div>
                    <label className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-wider text-[#5d7d37]">
                      Inquiry Topic
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {CONSULTATION_TOPICS.map((item) => {
                        const isSelected = topic === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setTopic(item.id)}
                            className={`cursor-pointer rounded-xl p-2.5 text-left border transition-all duration-200 text-xs ${
                              isSelected
                                ? "border-[#143d31] bg-[#143d31] text-white shadow-xs font-bold"
                                : "border-[#143d31]/12 bg-[#f4f8f5]/60 text-[#143d31] hover:bg-white hover:border-[#143d31]/30 font-medium"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1">
                              <span className="truncate">{item.label}</span>
                              {isSelected && (
                                <Check className="h-3 w-3 text-[#a3e635] shrink-0" weight="bold" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {formError && (
                    <div
                      className="rounded-xl border border-red-200 bg-red-50/90 p-3.5 font-sans text-xs text-red-700"
                      role="alert"
                    >
                      {formError}
                    </div>
                  )}

                  {/* Row 1: Name & Phone Number */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <TextField
                      id="name"
                      name="name"
                      label="Your Name *"
                      placeholder="e.g. Ramesh Kumar"
                      value={form.name}
                      disabled={isSubmitting}
                      error={errors.name}
                      maxLength={120}
                      onChange={(e) => setField("name", e.target.value)}
                    />
                    <PhoneField
                      id="phone"
                      name="phone"
                      label="Mobile / WhatsApp Number *"
                      placeholder="e.g. 98123 45678"
                      value={form.phone}
                      disabled={isSubmitting}
                      error={errors.phone}
                      hint="Strictly used only for your inquiry callback."
                      onChange={(e) => setField("phone", e.target.value)}
                    />
                  </div>

                  {/* Row 2: Email & Preferred Channel */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <EmailField
                      id="email"
                      name="email"
                      label="Email (Optional)"
                      placeholder="e.g. ramesh@gmail.com"
                      value={form.email}
                      disabled={isSubmitting}
                      error={errors.email}
                      onChange={(e) => setField("email", e.target.value)}
                    />

                    <div>
                      <label className="mb-1.5 block font-mono text-[11px] font-bold uppercase tracking-wider text-[#5d7d37]">
                        Callback Mode
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {CHANNEL_OPTIONS.map((ch) => {
                          const isSelected = form.channel === ch;
                          return (
                            <button
                              key={ch}
                              type="button"
                              onClick={() => setField("channel", ch)}
                              className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-mono font-bold transition-all duration-200 ${
                                isSelected
                                  ? "bg-[#143d31] text-[#a3e635] shadow-2xs"
                                  : "border border-[#143d31]/15 bg-white text-[#143d31] hover:bg-[#f4f8f5]"
                              }`}
                            >
                              {ch}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Optional Farm Details Expandable Toggle */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowFarmDetails((v) => !v)}
                      className="cursor-pointer inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#5d7d37] hover:text-[#143d31] transition-colors focus-visible:outline-none"
                    >
                      <span>{showFarmDetails ? "– Hide Acreage & Crop Specs" : "+ Add Acreage & Crop Specs (Optional)"}</span>
                      <CaretDown
                        className={`h-3 w-3 transition-transform duration-200 ${showFarmDetails ? "rotate-180" : ""}`}
                      />
                    </button>

                    {showFarmDetails && (
                      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3 p-3.5 rounded-2xl bg-[#f4f8f5] border border-[#143d31]/10">
                        <SelectField
                          id="acreage"
                          name="acreage"
                          label="Acreage"
                          options={ACREAGE_OPTIONS}
                          value={form.acreage}
                          disabled={isSubmitting}
                          onChange={(e) => setField("acreage", e.target.value)}
                        />
                        <TextField
                          id="district"
                          name="district"
                          label="District / Village"
                          placeholder="e.g. Gurugram"
                          value={form.district}
                          disabled={isSubmitting}
                          maxLength={120}
                          onChange={(e) => setField("district", e.target.value)}
                        />
                        <SelectField
                          id="crop"
                          name="crop"
                          label="Crop"
                          options={CROP_OPTIONS}
                          value={form.crop}
                          disabled={isSubmitting}
                          onChange={(e) => setField("crop", e.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  {/* Message Field */}
                  <TextareaField
                    id="message"
                    name="message"
                    label="Notes / Agronomic Question"
                    placeholder="Describe crop stage, symptoms, required seedling quantities, or inquiry details..."
                    value={form.message}
                    disabled={isSubmitting}
                    maxLength={MESSAGE_MAX}
                    charCount={{ current: form.message.length, max: MESSAGE_MAX }}
                    onChange={(e) => setField("message", e.target.value)}
                  />

                  {/* Optional File Attachment */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowUpload((v) => !v)}
                      className="cursor-pointer inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#5d7d37] hover:text-[#143d31] transition-colors focus-visible:outline-none"
                    >
                      <span>{showUpload ? "– Hide Photo Attachment" : "+ Attach Crop Photo or Soil Report (Optional)"}</span>
                      <CaretDown
                        className={`h-3 w-3 transition-transform duration-200 ${showUpload ? "rotate-180" : ""}`}
                      />
                    </button>
                    {showUpload && (
                      <div className="mt-2.5">
                        <FileUpload file={file} onChange={setFile} disabled={isSubmitting} />
                      </div>
                    )}
                  </div>

                  {/* Privacy Consent */}
                  <ConsentCheckbox
                    id="consent"
                    checked={form.consent}
                    error={errors.consent}
                    onChange={(v) => setField("consent", v)}
                  >
                    I agree to allow Agaate senior agronomists to contact me regarding this inquiry per the{" "}
                    <a href={privacyHref} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#143d31] font-semibold">
                      Privacy Policy
                    </a>.
                  </ConsentCheckbox>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="cursor-pointer inline-flex w-full min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#143d31] px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#a3e635] shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#1a4d3e] disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <PaperPlaneTilt className="h-4 w-4" weight="bold" />
                          <span>Request Agronomy Callback</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
