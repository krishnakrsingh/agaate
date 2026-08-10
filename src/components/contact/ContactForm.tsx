import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Send } from "lucide-react";
import { useParams } from "@tanstack/react-router";
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
import { Reveal } from "@/components/common/motion";

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
  if (form.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!/^[6-9]\d{9}$/.test(normalizePhone(form.phone))) {
    errors.phone = "Enter a 10-digit mobile number.";
  }
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!topic) errors.topic = "Select a topic.";
  if (!form.consent) errors.consent = "Please accept the privacy notice to continue.";
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
      if (
        !urlTopic &&
        parsed.topic &&
        CONSULTATION_TOPICS.some((t) => t.id === parsed.topic)
      ) {
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
      `Hello Agaate Team,\nI submitted a consultation request on agaate.in.\n\n*Ticket ID:* ${ticketId || "AGA-2026-CONSULT"}\n*Topic:* ${topicLabel}\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Location:* ${form.district || "—"}\n*Land Size:* ${form.acreage}\n*Crop:* ${form.crop}\n*Message:* ${form.message || "Looking forward to your guidance."}`,
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
      setFormError("You appear offline. Call or WhatsApp us, or retry when connected.");
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
            sourcePage:
              typeof window !== "undefined" ? window.location.pathname : "/contact",
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
      id="contact-form"
      aria-labelledby="contact-form-heading"
      className="border-t border-neutral-200 bg-white py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal variant="fade-up">
              <p className="text-sm font-medium text-forest">Consultation request</p>
              <h2
                id="contact-form-heading"
                className="mt-2 font-display text-3xl font-semibold tracking-tight text-forest-deep md:text-4xl"
              >
                Tell us what you need
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Choose a topic so we route you to the right advisor. Typical reply within 2
                business hours.
              </p>
              <div className="mt-8">
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
                  <p className="mt-2 text-xs font-medium text-destructive" role="alert">
                    {errors.topic}
                  </p>
                ) : null}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-lg border border-neutral-200 bg-white p-6 sm:p-8">
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
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                    <span className="text-sm font-medium text-forest-deep">Your details</span>
                    <span className="max-w-[55%] truncate text-xs text-neutral-500">
                      {CONSULTATION_TOPICS.find((t) => t.id === topic)?.label}
                    </span>
                  </div>

                  {formError ? (
                    <div
                      className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
                      role="alert"
                    >
                      {formError}
                    </div>
                  ) : null}
                  {offline ? (
                    <div
                      className="rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700"
                      role="status"
                    >
                      You appear offline. You can still fill the form — or call / WhatsApp us now.
                    </div>
                  ) : null}

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

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <TextField
                      id="name"
                      name="name"
                      label="Your name *"
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
                      label="Phone / WhatsApp *"
                      placeholder="e.g. 98123 45678"
                      value={form.phone}
                      disabled={isSubmitting}
                      error={errors.phone}
                      hint="We'll only use this to reach you about your query."
                      onChange={(e) => setField("phone", e.target.value)}
                      onBlur={() =>
                        form.phone && track("contact_form_field_completed", { field: "phone" })
                      }
                    />
                  </div>

                  <EmailField
                    id="email"
                    name="email"
                    label="Email (optional)"
                    placeholder="e.g. ramesh@email.com"
                    value={form.email}
                    disabled={isSubmitting}
                    error={errors.email}
                    onChange={(e) => setField("email", e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={() => setShowFarmDetails((v) => !v)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-forest-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
                  >
                    Add farm details (optional)
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${showFarmDetails ? "rotate-180" : ""}`}
                    />
                  </button>

                  {showFarmDetails ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                      <SelectField
                        id="acreage"
                        name="acreage"
                        label="Land acreage"
                        options={ACREAGE_OPTIONS}
                        value={form.acreage}
                        disabled={isSubmitting}
                        onChange={(e) => setField("acreage", e.target.value)}
                      />
                      <TextField
                        id="district"
                        name="district"
                        label="District / region"
                        placeholder="e.g. Gurugram, Rewari"
                        value={form.district}
                        disabled={isSubmitting}
                        maxLength={120}
                        onChange={(e) => setField("district", e.target.value)}
                      />
                      <SelectField
                        id="crop"
                        name="crop"
                        label="Primary crop"
                        options={CROP_OPTIONS}
                        value={form.crop}
                        disabled={isSubmitting}
                        onChange={(e) => setField("crop", e.target.value)}
                      />
                    </div>
                  ) : null}

                  <ChannelGroup
                    options={CHANNEL_OPTIONS}
                    value={form.channel}
                    disabled={isSubmitting}
                    onChange={(v) => setField("channel", v)}
                  />

                  <TextareaField
                    id="message"
                    name="message"
                    label="Notes / questions"
                    placeholder="Describe your crop stage, soil conditions, or sapling quantity..."
                    value={form.message}
                    disabled={isSubmitting}
                    maxLength={MESSAGE_MAX}
                    onChange={(e) => setField("message", e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={() => setShowUpload((v) => !v)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-forest-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
                  >
                    Attach a photo or report (optional)
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${showUpload ? "rotate-180" : ""}`}
                    />
                  </button>
                  {showUpload ? (
                    <FileUpload file={file} onChange={setFile} disabled={isSubmitting} />
                  ) : null}

                  <ConsentCheckbox
                    id="consent"
                    checked={form.consent}
                    disabled={isSubmitting}
                    error={errors.consent}
                    privacyHref={privacyHref}
                    onChange={(v) => setField("consent", v)}
                  />

                  <p className="text-xs text-neutral-500">
                    Typical reply within 2 business hours, 7:30 AM – 8:00 PM IST.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-forest-deep px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner />
                        <span>Sending request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" strokeWidth={1.75} />
                        <span>Request a callback</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
