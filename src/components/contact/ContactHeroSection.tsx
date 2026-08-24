import { useState, useRef, useEffect, useMemo } from "react";
import {
  PaperPlaneTilt,
  CaretDown,
  Clock,
  ShieldCheck,
  WhatsappLogo,
  PhoneCall,
  EnvelopeSimple,
  Plant,
  CornersOut,
  TreeEvergreen,
  HourglassHigh,
} from "@phosphor-icons/react";
import { useParams } from "@tanstack/react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { getLocalizedPath } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { submitLead } from "@/functions/submit-lead";
import teamImage from "@/assets/contact-team.jpg";
import {
  CONSULTATION_TOPICS,
  ACREAGE_OPTIONS,
  CROP_OPTIONS,
  CROP_STAGE_OPTIONS,
  CHANNEL_OPTIONS,
  FORM_STORAGE_KEY,
  MESSAGE_MAX,
} from "./data";
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
  cropStage: string;
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
  cropStage: CROP_STAGE_OPTIONS[0],
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
  if (!topic) errors.topic = "This is a required question.";
  if (!form.channel) errors.channel = "This is a required question.";
  if (form.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!/^[6-9]\d{9}$/.test(normalizePhone(form.phone))) {
    errors.phone = "Please enter a valid 10-digit Indian mobile number.";
  }
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!form.consent) errors.consent = "Please agree to the privacy terms to proceed.";
  return errors;
}

function makeClientToken() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function FormCard({
  title,
  required,
  description,
  error,
  children,
  className,
}: {
  title?: string;
  required?: boolean;
  description?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl sm:rounded-2xl border border-neutral-200/90 p-4 sm:p-5 shadow-2xs transition-all duration-200 text-left",
        "focus-within:border-[#143d31] focus-within:ring-2 focus-within:ring-[#143d31]/10",
        error && "border-red-500 ring-1 ring-red-500/20",
        className,
      )}
    >
      {title && (
        <div className="mb-3">
          <h3 className="text-sm sm:text-[15px] font-semibold text-[#143d31] flex items-center gap-1">
            <span>{title}</span>
            {required && <span className="text-red-500 font-bold">*</span>}
          </h3>
          {description && (
            <p className="text-xs text-neutral-500 mt-0.5 leading-normal">{description}</p>
          )}
        </div>
      )}
      {children}
      {error && (
        <p className="text-xs font-medium text-red-600 mt-2 flex items-center gap-1">
          <span>●</span> {error}
        </p>
      )}
    </div>
  );
}

function GoogleInput({
  id,
  type = "text",
  value,
  placeholder = "Your answer",
  onChange,
  disabled,
  prefix,
}: {
  id: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  prefix?: string;
}) {
  return (
    <div className="relative flex items-center border-b border-neutral-300 focus-within:border-[#143d31] focus-within:border-b-2 py-1.5 transition-all max-w-md">
      {prefix && (
        <span className="text-sm font-semibold text-neutral-700 mr-2 select-none">{prefix}</span>
      )}
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm sm:text-base text-[#143d31] placeholder:text-neutral-400 focus:outline-none"
      />
    </div>
  );
}

function GoogleTextarea({
  id,
  value,
  placeholder = "Your answer",
  onChange,
  disabled,
}: {
  id: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}) {
  return (
    <div className="relative border-b border-neutral-300 focus-within:border-[#143d31] focus-within:border-b-2 py-1.5 transition-all">
      <textarea
        id={id}
        name={id}
        rows={2}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm sm:text-base text-[#143d31] placeholder:text-neutral-400 focus:outline-none resize-y leading-relaxed"
      />
    </div>
  );
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

  const selectedTopicObj = useMemo(() => CONSULTATION_TOPICS.find((t) => t.id === topic), [topic]);

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
            { opacity: 0, scale: 0.98 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
          ).fromTo(
            ".contact-anim-right",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            "-=0.5",
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
    const topicLabel = selectedTopicObj?.label || "General";
    const text = encodeURIComponent(
      `Hello Agaate Team, I am reaching out for assistance and would appreciate a response at your earliest convenience.\n\n*Ticket ID:* ${ticketId || "AGA-2026-CONSULT"}\n*Topic:* ${topicLabel}\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Location:* ${form.district || "—"}\n*Land Size:* ${form.acreage}\n*Crop:* ${form.crop}\n*Crop Stage:* ${form.cropStage}\n*Message:* ${form.message || "Thank you."}`,
    );
    return `https://wa.me/918350085005?text=${text}`;
  }, [ticketId, selectedTopicObj, form]);

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
      setFormError("You appear offline. Please retry when connected or contact us via WhatsApp.");
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
            message: `${form.cropStage ? `[Stage: ${form.cropStage}] ` : ""}${form.message || ""}`,
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
      id="contact-master"
      aria-label="Contact Agaate Agronomy Desk"
      className="relative w-full min-h-screen bg-[#f4f8f5] text-[#143d31] px-3 sm:px-4 lg:px-6 pt-20 sm:pt-24 lg:pt-22 pb-16"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start max-w-7xl mx-auto">
        {/* ═══════════════════════════════════════════════════════════
            LEFT COLUMN: Pure Sticky Image Box (Positioned Below Header)
            ═══════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-6 xl:col-span-6 w-full lg:sticky lg:top-24 lg:h-[calc(100dvh-112px)] contact-anim-left">
          <div className="relative w-full h-[400px] sm:h-[500px] lg:h-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[#143d31]/10 bg-[#143d31]/5 shadow-xs">
            <img
              src={teamImage}
              alt="Agaate Team"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            RIGHT COLUMN: Clean Google Forms Card Layout
            ═══════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-6 xl:col-span-6 w-full contact-anim-right text-left">
          {ticketId ? (
            <FormSuccess
              ticketId={ticketId}
              name={form.name}
              topicId={topic}
              onReset={reset}
              whatsappHref={whatsappHref}
            />
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-3 sm:space-y-3.5"
              noValidate
            >
              {/* ── CARD 0: Header Card with Top Green Band ── */}
              <div className="bg-white rounded-xl sm:rounded-2xl border border-neutral-200/90 shadow-2xs overflow-hidden text-left">
                <div className="h-2.5 sm:h-3 w-full bg-[#143d31]" />
                <div className="p-4 sm:p-6 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                    </span>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#5d7d37]">
                      Direct Agronomy Desk · Gurugram Hub
                    </p>
                  </div>

                  <h1 className="font-display text-xl sm:text-2xl lg:text-[1.75rem] font-bold text-[#143d31] tracking-tight leading-snug">
                    Agronomy Consultation &amp; Inquiry
                  </h1>

                  <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed">
                    Connect directly with our senior agronomists for customized dosage schedules,
                    seedling reservations, or commercial project inquiries.
                  </p>

                  <div className="pt-1.5 flex flex-wrap items-center gap-2 text-xs text-neutral-700">
                    <span className="inline-flex items-center gap-1.5 bg-[#f4f8f5] border border-[#143d31]/10 px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#143d31]">
                      <Clock className="h-3.5 w-3.5 text-[#5d7d37]" weight="bold" />
                      Reply within 15 mins on WhatsApp
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-[#f4f8f5] border border-[#143d31]/10 px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#143d31]">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#5d7d37]" weight="bold" />
                      100% Free Initial Advisory
                    </span>
                  </div>

                  <div className="border-t border-neutral-100 pt-2.5 text-xs text-red-600 font-medium">
                    * Indicates required question
                  </div>
                </div>
              </div>

              {formError && (
                <div
                  className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-semibold text-red-800 shadow-2xs"
                  role="alert"
                >
                  <p className="flex items-center gap-1.5">
                    <span>⚠️</span> {formError}
                  </p>
                </div>
              )}

              {/* ── CARD 1: Topic Selection (Compact 2-Column Grid) ── */}
              <FormCard
                title="Inquiry Track / Focus Area"
                required
                description="Select the primary topic or service you need assistance with."
                error={errors.topic}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CONSULTATION_TOPICS.map((t) => {
                    const isSelected = topic === t.id;
                    return (
                      <label
                        key={t.id}
                        className={cn(
                          "flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-all duration-150 select-none",
                          isSelected
                            ? "bg-[#143d31]/5 border-[#143d31] ring-1 ring-[#143d31]/20 shadow-2xs"
                            : "border-neutral-200/80 hover:bg-neutral-50 hover:border-neutral-300",
                          isSubmitting && "opacity-50 pointer-events-none",
                        )}
                      >
                        <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                          <input
                            type="radio"
                            name="topic"
                            value={t.id}
                            checked={isSelected}
                            onChange={() => {
                              setTopic(t.id);
                              setErrors((prev) => {
                                const next = { ...prev };
                                delete next.topic;
                                return next;
                              });
                            }}
                            className="sr-only"
                          />
                          <div
                            className={cn(
                              "h-4 w-4 rounded-full border-2 transition-all flex items-center justify-center",
                              isSelected
                                ? "border-[#143d31] bg-white"
                                : "border-neutral-400 bg-white",
                            )}
                          >
                            {isSelected && <div className="h-2 w-2 rounded-full bg-[#143d31]" />}
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className={cn(
                              "text-xs font-semibold text-[#143d31] leading-tight",
                              isSelected && "text-[#143d31]",
                            )}
                          >
                            {t.label}
                          </p>
                          <p className="text-[11px] text-neutral-500 mt-0.5 line-clamp-1 leading-snug">
                            {t.desc}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </FormCard>

              {/* ── CARD 2: Preferred Response Mode (3-Way Horizontal Pills) ── */}
              <FormCard
                title="Preferred Response Mode"
                required
                description="How would you like our agronomist team to get back to you?"
                error={errors.channel}
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {CHANNEL_OPTIONS.map((ch) => {
                    const isSelected = form.channel === ch;
                    return (
                      <button
                        key={ch}
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => setField("channel", ch)}
                        className={cn(
                          "cursor-pointer flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold border transition-all duration-150 select-none",
                          isSelected
                            ? "bg-[#143d31] text-[#a3e635] border-[#143d31] shadow-2xs"
                            : "bg-white text-[#143d31] border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50",
                        )}
                      >
                        {ch === "WhatsApp" && (
                          <WhatsappLogo
                            className="h-4 w-4 shrink-0 text-emerald-500"
                            weight="bold"
                          />
                        )}
                        {ch === "Phone Call" && (
                          <PhoneCall className="h-4 w-4 shrink-0 text-[#5d7d37]" weight="bold" />
                        )}
                        {ch === "Email" && (
                          <EnvelopeSimple
                            className="h-4 w-4 shrink-0 text-[#5d7d37]"
                            weight="bold"
                          />
                        )}
                        <span>{ch}</span>
                      </button>
                    );
                  })}
                </div>
              </FormCard>

              {/* ── CARD 3: Full Name ── */}
              <FormCard title="Full Name" required error={errors.name}>
                <GoogleInput
                  id="name"
                  value={form.name}
                  placeholder="Your answer"
                  disabled={isSubmitting}
                  onChange={(e) => setField("name", e.target.value)}
                />
              </FormCard>

              {/* ── CARD 4: Mobile / WhatsApp Number ── */}
              <FormCard
                title="Mobile / WhatsApp Number"
                required
                description="Strictly used only for this agronomy advisory callback."
                error={errors.phone}
              >
                <GoogleInput
                  id="phone"
                  type="tel"
                  prefix="+91"
                  value={form.phone}
                  placeholder="Your 10-digit mobile number"
                  disabled={isSubmitting}
                  onChange={(e) => setField("phone", e.target.value)}
                />
              </FormCard>

              {/* ── CARD 5: District / State / Village ── */}
              <FormCard
                title="District / State / Village"
                description="Optional — helps us assign your nearest local field officer."
                error={errors.district}
              >
                <GoogleInput
                  id="district"
                  value={form.district}
                  placeholder="Your answer"
                  disabled={isSubmitting}
                  onChange={(e) => setField("district", e.target.value)}
                />
              </FormCard>

              {/* ── CARD 6: Email Address ── */}
              <FormCard
                title="Email Address"
                description="Optional — if you would like an email summary or formal quote."
                error={errors.email}
              >
                <GoogleInput
                  id="email"
                  type="email"
                  value={form.email}
                  placeholder="Your answer"
                  disabled={isSubmitting}
                  onChange={(e) => setField("email", e.target.value)}
                />
              </FormCard>

              {/* ── CARD 7: Farm & Crop Details ── */}
              <FormCard
                title="Farm & Crop Parameters"
                description="Optional — provide land size and crop stage for dosage & seedling calculations."
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-0.5">
                  <div className="space-y-1">
                    <label
                      htmlFor="acreage"
                      className="block text-xs font-semibold text-neutral-700"
                    >
                      Land Size
                    </label>
                    <div className="relative inline-flex items-center w-full border border-neutral-300 rounded-lg bg-white px-2.5 py-2 text-xs shadow-2xs hover:border-neutral-400 focus-within:border-[#143d31]">
                      <select
                        id="acreage"
                        name="acreage"
                        value={form.acreage}
                        onChange={(e) => setField("acreage", e.target.value)}
                        disabled={isSubmitting}
                        className="w-full bg-transparent appearance-none pr-5 text-xs text-[#143d31] cursor-pointer focus:outline-none font-medium"
                      >
                        {ACREAGE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <CaretDown className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-neutral-500" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="crop" className="block text-xs font-semibold text-neutral-700">
                      Target Crop
                    </label>
                    <div className="relative inline-flex items-center w-full border border-neutral-300 rounded-lg bg-white px-2.5 py-2 text-xs shadow-2xs hover:border-neutral-400 focus-within:border-[#143d31]">
                      <select
                        id="crop"
                        name="crop"
                        value={form.crop}
                        onChange={(e) => setField("crop", e.target.value)}
                        disabled={isSubmitting}
                        className="w-full bg-transparent appearance-none pr-5 text-xs text-[#143d31] cursor-pointer focus:outline-none font-medium"
                      >
                        {CROP_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <CaretDown className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-neutral-500" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="cropStage"
                      className="block text-xs font-semibold text-neutral-700"
                    >
                      Current Stage
                    </label>
                    <div className="relative inline-flex items-center w-full border border-neutral-300 rounded-lg bg-white px-2.5 py-2 text-xs shadow-2xs hover:border-neutral-400 focus-within:border-[#143d31]">
                      <select
                        id="cropStage"
                        name="cropStage"
                        value={form.cropStage}
                        onChange={(e) => setField("cropStage", e.target.value)}
                        disabled={isSubmitting}
                        className="w-full bg-transparent appearance-none pr-5 text-xs text-[#143d31] cursor-pointer focus:outline-none font-medium"
                      >
                        {CROP_STAGE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <CaretDown className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-neutral-500" />
                    </div>
                  </div>
                </div>
              </FormCard>

              {/* ── CARD 8: Inquiry Notes ── */}
              <FormCard
                title="Inquiry Notes or Specific Questions"
                description="Describe soil conditions, required seedling quantities, disease symptoms, or project scope."
                error={errors.message}
              >
                <GoogleTextarea
                  id="message"
                  value={form.message}
                  placeholder="Your answer"
                  disabled={isSubmitting}
                  onChange={(e) => setField("message", e.target.value)}
                />
                <div className="mt-1 text-right text-[11px] text-neutral-400 font-mono">
                  {form.message.length} / {MESSAGE_MAX}
                </div>
              </FormCard>

              {/* ── CARD 9: File Attachment ── */}
              <FormCard
                title="Attach Crop Photo or Soil Report"
                description="Upload an infected leaf photo or soil report for instant diagnosis."
              >
                <FileUpload file={file} onChange={setFile} disabled={isSubmitting} />
              </FormCard>

              {/* ── CARD 10: Privacy Notice & Consent ── */}
              <FormCard error={errors.consent}>
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setField("consent", e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded-xs border-neutral-300 text-[#143d31] accent-[#143d31] focus:ring-2 focus:ring-[#143d31]/20 cursor-pointer shrink-0"
                  />
                  <span className="text-xs text-neutral-700 leading-snug">
                    I agree to allow Agaate senior agronomists to contact me regarding this inquiry
                    in accordance with the{" "}
                    <a
                      href={privacyHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 font-semibold text-[#143d31] hover:text-[#5d7d37]"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
              </FormCard>

              {/* ── ACTION BAR (Submit & Clear Form) ── */}
              <div className="flex items-center justify-between gap-4 pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer inline-flex items-center justify-center gap-2 px-7 py-2.5 rounded-lg bg-[#143d31] hover:bg-[#18483a] text-[#a3e635] font-bold text-sm tracking-wide shadow-2xs transition-all disabled:opacity-50 active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <PaperPlaneTilt className="h-4 w-4 text-[#a3e635]" weight="bold" />
                      <span>Submit</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={reset}
                  disabled={isSubmitting}
                  className="cursor-pointer text-xs font-semibold text-neutral-500 hover:text-neutral-800 transition-colors px-2 py-1.5"
                >
                  Clear form
                </button>
              </div>

              {/* ── FOOTER NOTE ── */}
              <div className="pt-2 text-center text-xs text-neutral-500 space-y-0.5">
                <p className="text-[11px]">Never submit passwords through Agaate Forms.</p>
                <p className="text-[11px] text-[#5d7d37] font-medium">
                  Direct Agronomy Desk · Reply in 15 mins (7:30 AM – 8:00 PM IST)
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
