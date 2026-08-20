import { useEffect, useMemo, useRef, useState } from "react";
import { CaretDown, PaperPlaneTilt, Sparkle, ShieldCheck, CheckCircle } from "@phosphor-icons/react";
import { useParams } from "@tanstack/react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getLocalizedPath } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { submitLead } from "@/functions/submit-lead";
import {
  ACREAGE_OPTIONS,
  CHANNEL_OPTIONS,
  CONSULTATION_TOPICS,
  CROP_OPTIONS,
  FORM_STORAGE_KEY,
  MESSAGE_MAX,
} from "./data";
import { ChannelGroup, TopicSelector } from "./TopicSelector";
import {
  ConsentCheckbox,
  EmailField,
  PhoneField,
  SelectField,
  TextareaField,
  TextField,
} from "./fields";
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

export default function ContactForm({
  onSuccessChange,
}: {
  onSuccessChange?: (success: boolean) => void;
}) {
  const containerRef = useRef<HTMLElement>(null);
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
  const formRef = useRef<HTMLFormElement>(null);

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

          gsap.fromTo(
            ".form-fade-in",
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: container,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            },
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

  useEffect(() => {
    const handler = () => {
      if (!ticketId && (form.name || form.phone || form.message)) {
        track("contact_form_abandoned", { topic });
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [form.name, form.phone, form.message, topic, ticketId]);

  const privacyHref = getLocalizedPath("/privacy-policy", locale ?? "en");

  const whatsappHref = useMemo(() => {
    const topicLabel = CONSULTATION_TOPICS.find((t) => t.id === topic)?.label || "General";
    const text = encodeURIComponent(
      `Hello Agaate Team, I am reaching out for assistance and would appreciate a response at your earliest convenience.\n\nI submitted a request via agaate.in.\n\n*Ticket ID:* ${ticketId || "AGA-2026-CONSULT"}\n*Topic:* ${topicLabel}\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Location:* ${form.district || "—"}\n*Land Size:* ${form.acreage}\n*Crop:* ${form.crop}\n*Message:* ${form.message || "Thank you."}`,
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
      id="contact-form"
      aria-labelledby="contact-form-heading"
      className="scroll-mt-24 py-16 sm:py-20 md:py-24 bg-[#f4f8f5] text-[#143d31] border-b border-[#143d31]/10"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Topic Selector & Agronomic Dispatch Commitments */}
          <div className="lg:col-span-5 space-y-6 form-fade-in">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                03 · Consultation Track Routing
              </p>
            </div>

            <h2
              id="contact-form-heading"
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#143d31] leading-[1.12]"
            >
              Select Your Required Agronomy Solution
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#4f624f] leading-relaxed">
              Selecting a dedicated track routes your inquiry directly to our lead agronomy specialist in that domain, who prepares tailored dosage schedules and trial data before calling you.
            </p>

            <div className="pt-2">
              <TopicSelector
                options={CONSULTATION_TOPICS}
                value={topic}
                disabled={isSubmitting || !!ticketId}
                onChange={(id) => {
                  setTopic(id);
                  track("contact_form_field_completed", { field: "topic", topic: id });
                }}
              />
              {errors.topic ? (
                <p className="mt-2 font-mono text-xs font-semibold text-red-600" role="alert">
                  {errors.topic}
                </p>
              ) : null}
            </div>

            {/* Direct Support Commitments */}
            <div className="pt-6 border-t border-[#143d31]/10 space-y-3 font-sans text-xs text-[#4f624f]">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-[#5d7d37] shrink-0" weight="fill" />
                <span>100% free agronomy callbacks for registered growers</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="h-4 w-4 text-[#5d7d37] shrink-0" weight="fill" />
                <span>Scientific dosage charts compliant with ICAR standards</span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Submission Form */}
          <div className="lg:col-span-7 form-fade-in">
            <div className="rounded-3xl border border-[#143d31]/12 bg-white p-6 sm:p-8 md:p-10 shadow-sm">
              {ticketId ? (
                <FormSuccess
                  ticketId={ticketId}
                  name={form.name}
                  topicId={topic}
                  onReset={reset}
                  whatsappHref={whatsappHref}
                />
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="flex items-center justify-between border-b border-[#143d31]/10 pb-4">
                    <span className="font-display text-lg font-bold text-[#143d31]">Grower & Field Details</span>
                    <span className="max-w-[55%] truncate font-mono text-xs font-bold text-[#5d7d37] bg-[#143d31]/5 border border-[#143d31]/10 px-2.5 py-1 rounded-full">
                      {CONSULTATION_TOPICS.find((t) => t.id === topic)?.label}
                    </span>
                  </div>

                  {formError ? (
                    <div
                      className="rounded-2xl border border-red-200 bg-red-50/80 p-4 font-sans text-xs text-red-700"
                      role="alert"
                    >
                      {formError}
                    </div>
                  ) : null}

                  {offline ? (
                    <div
                      className="rounded-2xl border border-[#143d31]/20 bg-[#143d31]/5 p-4 font-sans text-xs text-[#143d31]"
                      role="status"
                    >
                      You appear offline. You can still fill the form — or call / WhatsApp us now.
                    </div>
                  ) : null}

                  {/* Honeypot for spam bots */}
                  <div className="absolute -left-[9999px] top-0 opacity-0" aria-hidden="true">
                    <label htmlFor="company_website">Company website</label>
                    <input
                      id="company_website"
                      name="company_website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.honeypot}
                      onChange={(e) => setField("honeypot", e.target.value)}
                    />
                  </div>

                  {/* Row 1: Name & Phone */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <TextField
                      id="name"
                      name="name"
                      label="Your Full Name *"
                      placeholder="e.g. Ramesh Kumar"
                      autoComplete="name"
                      value={form.name}
                      disabled={isSubmitting}
                      error={errors.name}
                      maxLength={120}
                      onChange={(e) => setField("name", e.target.value)}
                      onBlur={() =>
                        form.name && track("contact_form_field_completed", { field: "name" })
                      }
                    />
                    <PhoneField
                      id="phone"
                      name="phone"
                      label="Mobile / WhatsApp Number *"
                      placeholder="e.g. 98123 45678"
                      value={form.phone}
                      disabled={isSubmitting}
                      error={errors.phone}
                      hint="Strictly used only to contact you about this agronomy request."
                      onChange={(e) => setField("phone", e.target.value)}
                      onBlur={() =>
                        form.phone && track("contact_form_field_completed", { field: "phone" })
                      }
                    />
                  </div>

                  {/* Row 2: Email & Callback Channel */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <EmailField
                      id="email"
                      name="email"
                      label="Email Address (Optional)"
                      placeholder="e.g. ramesh@gmail.com"
                      value={form.email}
                      disabled={isSubmitting}
                      error={errors.email}
                      onChange={(e) => setField("email", e.target.value)}
                    />

                    <ChannelGroup
                      options={CHANNEL_OPTIONS}
                      value={form.channel}
                      disabled={isSubmitting}
                      onChange={(ch) => setField("channel", ch)}
                    />
                  </div>

                  {/* Collapsible Farm Specification Fields */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setShowFarmDetails((v) => !v)}
                      className="cursor-pointer inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#5d7d37] hover:text-[#143d31] transition-colors focus-visible:outline-none"
                    >
                      <span>{showFarmDetails ? "Hide Acreage & Crop Details" : "+ Add Acreage & Crop Details (Optional)"}</span>
                      <CaretDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${showFarmDetails ? "rotate-180" : ""}`}
                      />
                    </button>

                    {showFarmDetails && (
                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 p-4 rounded-2xl bg-[#f4f8f5] border border-[#143d31]/10">
                        <SelectField
                          id="acreage"
                          name="acreage"
                          label="Cultivated Acreage"
                          options={ACREAGE_OPTIONS}
                          value={form.acreage}
                          disabled={isSubmitting}
                          onChange={(e) => setField("acreage", e.target.value)}
                        />
                        <TextField
                          id="district"
                          name="district"
                          label="District / Village"
                          placeholder="e.g. Gurugram, Rewari"
                          value={form.district}
                          disabled={isSubmitting}
                          maxLength={120}
                          onChange={(e) => setField("district", e.target.value)}
                        />
                        <SelectField
                          id="crop"
                          name="crop"
                          label="Target Crop"
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
                    label="Specific Notes / Agronomic Questions"
                    placeholder="Describe your current crop stage, soil conditions, disease symptoms, or required nursery trays..."
                    value={form.message}
                    disabled={isSubmitting}
                    maxLength={MESSAGE_MAX}
                    charCount={{ current: form.message.length, max: MESSAGE_MAX }}
                    onChange={(e) => setField("message", e.target.value)}
                  />

                  {/* Photo / Soil Report Upload */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowUpload((v) => !v)}
                      className="cursor-pointer inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#5d7d37] hover:text-[#143d31] transition-colors focus-visible:outline-none"
                    >
                      <span>{showUpload ? "Hide File Attachment" : "+ Attach Crop Photo or Soil Report (Optional)"}</span>
                      <CaretDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${showUpload ? "rotate-180" : ""}`}
                      />
                    </button>
                    {showUpload && (
                      <div className="mt-3">
                        <FileUpload file={file} onChange={setFile} disabled={isSubmitting} />
                      </div>
                    )}
                  </div>

                  {/* Consent Checkbox */}
                  <ConsentCheckbox
                    id="consent"
                    checked={form.consent}
                    error={errors.consent}
                    onChange={(v) => setField("consent", v)}
                  >
                    I agree to allow Agaate senior agronomists to contact me regarding this agronomy inquiry in accordance with the{" "}
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
                          <span>Dispatching Request to Desk...</span>
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
