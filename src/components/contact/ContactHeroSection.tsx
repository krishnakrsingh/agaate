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
  Plant,
  Storefront,
  Stethoscope,
  TrendUp,
  Stack,
  Lightning,
  Compass,
} from "@phosphor-icons/react";
import { useParams } from "@tanstack/react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getLocalizedPath } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { submitLead } from "@/functions/submit-lead";
import teamImage from "@/assets/contact-team.png";
import {
  PRIMARY_PHONE,
  TEL_PRIMARY,
  WHATSAPP_URL,
  EMAIL,
  MAILTO_URL,
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
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          ).fromTo(
            ".contact-anim-right",
            { opacity: 0, y: 25 },
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
      className="relative w-full bg-[#f4f8f5] pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ═══════════════════════════════════════════════════════════
              LEFT COLUMN: Sticky Team Photography & Direct Contact Hub
              ═══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start space-y-6 text-left contact-anim-left">
            {/* Header Eyebrow */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                  Direct Grower &amp; Enterprise Desk
                </p>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-bold tracking-tight text-[#143d31] leading-[1.1]">
                Speak directly with the team behind Agaate.
              </h1>

              <p className="font-sans text-sm sm:text-base text-[#4f624f] leading-relaxed">
                Operating out of our 17-acre proving grounds in Gurugram, our senior agronomists and operations team support your farm from seed to harvest.
              </p>
            </div>

            {/* Team Photography Container */}
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl border border-[#143d31]/12 bg-[#143d31]/5 shadow-md group">
              <img
                src={teamImage}
                alt="Agaate Agronomy & Operations Team at Gurugram Hub"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                width={960}
                height={660}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d2a21]/80 via-transparent to-transparent pointer-events-none" />

              {/* Live Desk Status Chip */}
              <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-2 rounded-full bg-[#143d31]/90 backdrop-blur-md px-3 py-1 font-mono text-[10px] font-bold uppercase text-[#a3e635] border border-white/10 shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a3e635] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a3e635]" />
                </span>
                <span>Desk Active · &lt; 15 Min WhatsApp Reply</span>
              </div>

              {/* Bottom Location Coordinates */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white pointer-events-none">
                <div className="rounded-xl bg-[#143d31]/85 backdrop-blur-md px-3 py-1.5 border border-white/10 text-xs font-mono">
                  <span className="text-[#a3e635] font-bold">17-Acre Proving Hub</span> · Kukrola, NH-8
                </div>
                <div className="text-[11px] font-mono text-white/90">
                  Mon–Sat 7:30 AM – 8:00 PM
                </div>
              </div>
            </div>

            {/* Direct Micro-Contact Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_clicked", { source: "sticky_team_box" })}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#143d31]/10 hover:border-[#143d31]/30 hover:shadow-xs transition-all"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#143d31] text-[#a3e635] shrink-0">
                  <ChatCircleText className="h-4 w-4" weight="fill" />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-xs font-bold text-[#143d31] truncate">WhatsApp Desk</p>
                  <p className="font-mono text-[10px] text-[#5d7d37] font-semibold">Photo Diagnosis ↗</p>
                </div>
              </a>

              <a
                href={`tel:${TEL_PRIMARY}`}
                onClick={() => track("phone_clicked", { source: "sticky_team_box" })}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#143d31]/10 hover:border-[#143d31]/30 hover:shadow-xs transition-all"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#143d31] text-white shrink-0">
                  <Phone className="h-4 w-4" weight="bold" />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-xs font-bold text-[#143d31] truncate">Direct Hotline</p>
                  <p className="font-mono text-[10px] text-[#5d7d37] font-semibold">{PRIMARY_PHONE}</p>
                </div>
              </a>
            </div>

            {/* Guarantees Strip */}
            <div className="pt-2 flex items-center justify-between text-xs font-sans text-[#4f624f] border-t border-[#143d31]/10">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#5d7d37]" weight="fill" />
                Free Initial Agronomy Callback
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-[#5d7d37]" weight="fill" />
                ICAR Protocol Advice
              </span>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              RIGHT COLUMN: Comprehensive, High-Converting Agronomy Form
              ═══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 contact-anim-right text-left">
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
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#143d31]">
                      Agronomy Consultation &amp; Inquiry Form
                    </h2>
                    <p className="font-sans text-xs sm:text-sm text-[#4f624f] mt-1">
                      Choose your specific inquiry track below so our lead specialist prepares dosage calculations and stock data before calling you.
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
      </div>
    </section>
  );
}
