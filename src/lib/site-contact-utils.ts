export function normalizeWhatsAppDigits(raw: string): string {
  return String(raw ?? "").replace(/\D/g, "");
}

export function buildWhatsAppUrl(numberDigits: string, message: string): string {
  const digits = normalizeWhatsAppDigits(numberDigits);
  if (!digits) return "https://wa.me/";
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function buildTelHref(telRaw: string): string {
  const digits = normalizeWhatsAppDigits(telRaw);
  return digits ? `tel:+${digits.replace(/^\+/, "")}` : "tel:";
}

export function buildMailtoHref(email: string, subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const q = params.toString();
  return q ? `mailto:${email}?${q}` : `mailto:${email}`;
}
