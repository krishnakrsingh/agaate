import { useState, useRef, useEffect, useMemo } from "react";
import {
  PaperPlaneTilt,
  CaretDown,
  Check,
} from "@phosphor-icons/react";
import { useParams } from "@tanstack/react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getLocalizedPath } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { submitLead } from "@/functions/submit-lead";
import teamImage from "@/assets/contact-team.png";
import {
  CONSULTATION_TOPICS,
  ACREAGE_OPTIONS,
  CROP_OPTIONS,
  CROP_STAGE_OPTIONS,
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
  if (form.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!/^[6-9]\d{9}$/.test(normalizePhone(form.phone))) {
    errors.phone = "Please enter a valid 10-digit mobile number.";
  }
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!topic) errors.topic = "Please select a consultation track.";
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
  const [showFarmDetails, setShowFarmDetails] = useState(true);
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
    const topicLabel = CONSULTATION_TOPICS.find((t) => t.id === topic)?.label || "General";
    const text = encodeURIComponent(
      `Hello Agaate Team, I am reaching out for assistance and would appreciate a response at your earliest convenience.\n\n*Ticket ID:* ${ticketId || "AGA-2026-CONSULT"}\n*Topic:* ${topicLabel}\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Location:* ${form.district || "—"}\n*Land Size:* ${form.acreage}\n*Crop:* ${form.crop}\n*Crop Stage:* ${form.cropStage}\n*Message:* ${form.message || "Thank you."}`,
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
      className="relative w-full min-h-screen bg-[#f4f8f5] text-[#143d31] p-[5px] sm:p-2 lg:p-[5px]"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* ═══════════════════════════════════════════════════════════
            LEFT COLUMN: Pure Sticky Image Box (Wider 6-Col Split, 5px Frame, Full Screen Tall, Clean Image Only)
            ═══════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-6 xl:col-span-6 w-full lg:sticky lg:top-[5px] lg:h-[calc(100dvh-10px)] contact-anim-left">
          <div className="relative w-full h-[420px] sm:h-[540px] lg:h-full overflow-hidden rounded-[20px] border border-[#143d31]/10 bg-[#143d31]/5 shadow-sm">
            <img
              src={teamImage}
              alt="Agaate Team"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            RIGHT COLUMN: Comprehensive Agronomy Form (6-Col Split)
            ═══════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-6 xl:col-span-6 w-full pt-20 sm:pt-24 lg:pt-20 pb-16 px-2 sm:px-4 lg:px-6 contact-anim-right text-left">
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
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Form Header */}
                <div className="border-b border-[#143d31]/10 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                      Direct Grower &amp; Enterprise Desk
                    </p>
                  </div>
                  <h1 className="font-display text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-[#143d31] tracking-tight leading-[1.15]">
                    Agronomy Consultation &amp; Inquiry Form
                  </h1>
                  <p className="font-sans text-xs sm:text-sm text-[#4f624f] mt-1.5 leading-relaxed">
                    Select your inquiry track below so our lead specialist prepares tailored dosage calculations, trial data, and availability schedules before calling you.
                  </p>
                </div>

                {/* ── 1. SERVICE / TOPIC SELECTION (What Agaate Does) ── */}
                <div className="space-y-2.5">
                  <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#5d7d37]">
                    1. Select Your Inquiry Track *
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {CONSULTATION_TOPICS.map((item) => {
                      const Icon = item.icon;
                      const isSelected = topic === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setTopic(item.id)}
                          className={`cursor-pointer rounded-2xl p-3.5 text-left border transition-all duration-200 ${
                            isSelected
                              ? "border-[#143d31] bg-[#143d31] text-white shadow-xs font-bold"
                              : "border-[#143d31]/12 bg-[#f4f8f5]/60 text-[#143d31] hover:bg-white hover:border-[#143d31]/30 font-medium"
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <div
                              className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg shrink-0 ${
                                isSelected ? "bg-white/10 text-[#a3e635]" : "bg-[#143d31]/5 text-[#5d7d37]"
                              }`}
                            >
                              <Icon className="h-4 w-4" weight={isSelected ? "fill" : "duotone"} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <p className="text-xs sm:text-sm font-display leading-snug truncate">
                                  {item.label}
                                </p>
                                {isSelected && (
                                  <Check className="h-3.5 w-3.5 text-[#a3e635] shrink-0" weight="bold" />
                                )}
                              </div>
                              <p
                                className={`text-[11px] font-sans mt-0.5 line-clamp-1 ${
                                  isSelected ? "text-white/75" : "text-[#4f624f]"
                                }`}
                              >
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {formError && (
                  <div
                    className="rounded-2xl border border-red-200 bg-red-50/90 p-4 font-sans text-xs text-red-700"
                    role="alert"
                  >
                    {formError}
                  </div>
                )}

                {/* ── 2. PERSONAL & CONTACT DETAILS ── */}
                <div className="space-y-4 pt-2 border-t border-[#143d31]/10">
                  <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#5d7d37]">
                    2. Your Contact &amp; Location Details
                  </label>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <TextField
                      id="name"
                      name="name"
                      label="Full Name *"
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
                      hint="Strictly used only for this agronomy inquiry."
                      onChange={(e) => setField("phone", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

                    <TextField
                      id="district"
                      name="district"
                      label="District / State / Village"
                      placeholder="e.g. Gurugram, Rewari, Haryana"
                      value={form.district}
                      disabled={isSubmitting}
                      maxLength={120}
                      onChange={(e) => setField("district", e.target.value)}
                    />
                  </div>
                </div>

                {/* ── 3. FARM & CROP SPECIFICATIONS ── */}
                <div className="space-y-4 pt-2 border-t border-[#143d31]/10">
                  <div className="flex items-center justify-between">
                    <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#5d7d37]">
                      3. Farm &amp; Crop Information
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowFarmDetails((v) => !v)}
                      className="cursor-pointer text-xs font-mono font-bold text-[#5d7d37] hover:text-[#143d31] transition-colors"
                    >
                      {showFarmDetails ? "– Collapse Specs" : "+ Expand Specs"}
                    </button>
                  </div>

                  {showFarmDetails && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 p-4 rounded-2xl bg-[#f4f8f5] border border-[#143d31]/10">
                      <SelectField
                        id="acreage"
                        name="acreage"
                        label="Cultivated Land Size"
                        options={ACREAGE_OPTIONS}
                        value={form.acreage}
                        disabled={isSubmitting}
                        onChange={(e) => setField("acreage", e.target.value)}
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

                      <SelectField
                        id="cropStage"
                        name="cropStage"
                        label="Current Crop Stage"
                        options={CROP_STAGE_OPTIONS}
                        value={form.cropStage}
                        disabled={isSubmitting}
                        onChange={(e) => setField("cropStage", e.target.value)}
                      />
                    </div>
                  )}
                </div>

                {/* ── 4. DETAILED INQUIRY NOTES ── */}
                <div className="space-y-4 pt-2 border-t border-[#143d31]/10">
                  <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#5d7d37]">
                    4. Specific Questions / Requirements
                  </label>

                  <TextareaField
                    id="message"
                    name="message"
                    label="Inquiry Notes or Disease Symptoms"
                    placeholder="Describe your soil conditions, required seedling quantities, disease symptoms, or project scope..."
                    value={form.message}
                    disabled={isSubmitting}
                    maxLength={MESSAGE_MAX}
                    charCount={{ current: form.message.length, max: MESSAGE_MAX }}
                    onChange={(e) => setField("message", e.target.value)}
                  />
                </div>

                {/* ── 5. OPTIONAL PHOTO / REPORT ATTACHMENT ── */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowUpload((v) => !v)}
                    className="cursor-pointer inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#5d7d37] hover:text-[#143d31] transition-colors focus-visible:outline-none"
                  >
                    <span>{showUpload ? "– Hide Crop Photo Attachment" : "+ Attach Crop Photo or Soil Report (Optional)"}</span>
                    <CaretDown
                      className={`h-3 w-3 transition-transform duration-200 ${showUpload ? "rotate-180" : ""}`}
                    />
                  </button>
                  {showUpload && (
                    <div className="mt-3">
                      <FileUpload file={file} onChange={setFile} disabled={isSubmitting} />
                    </div>
                  )}
                </div>

                {/* ── 6. CALLBACK CHANNEL ── */}
                <div className="space-y-2 pt-2 border-t border-[#143d31]/10">
                  <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#5d7d37]">
                    5. Preferred Callback Mode
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CHANNEL_OPTIONS.map((ch) => {
                      const isSelected = form.channel === ch;
                      return (
                        <button
                          key={ch}
                          type="button"
                          onClick={() => setField("channel", ch)}
                          className={`cursor-pointer rounded-full px-4 py-2 text-xs font-mono font-bold transition-all duration-200 ${
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

                {/* ── 7. CONSENT & SUBMIT ── */}
                <div className="pt-2">
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
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer inline-flex w-full min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#143d31] px-6 py-4 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#a3e635] shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#1a4d3e] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner />
                        <span>Dispatching Request to Agronomy Desk...</span>
                      </>
                    ) : (
                      <>
                        <PaperPlaneTilt className="h-4 w-4" weight="bold" />
                        <span>Submit Inquiry &amp; Request Agronomist Callback</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
