export function digitsPhone(phone: string) {
  return String(phone ?? "")
    .replace(/\D/g, "")
    .replace(/^0+/, "");
}

/** National 10-digit mobile (strips leading 91 country code when present). */
export function nationalPhoneDigits(phone: string) {
  const d = digitsPhone(phone);
  if (d.startsWith("91") && d.length >= 12) return d.slice(-10);
  if (d.startsWith("91") && d.length === 12) return d.slice(2);
  if (d.length === 10) return d;
  return d;
}

/** Human-friendly Indian display, e.g. +91 83500 85005 */
export function formatIndianPhoneDisplay(phone: string) {
  const national = nationalPhoneDigits(phone);
  if (national.length === 10) {
    return `+91 ${national.slice(0, 5)} ${national.slice(5)}`;
  }
  const trimmed = String(phone ?? "").trim();
  return trimmed || national;
}

export function whatsappDigits(phone: string) {
  const d = digitsPhone(phone);
  if (d.length === 10) return `91${d}`;
  if (d.startsWith("91") && d.length >= 12) return d.slice(0, 12);
  return d;
}

export function normalizeSiteContactPhoneFields(
  contact: {
    primaryPhone?: string;
    primaryPhoneDisplay?: string;
    primaryTel?: string;
    altPhone?: string;
    altPhoneDisplay?: string;
    altTel?: string;
    whatsappNumber?: string;
  },
  options?: { whatsappSameAsPrimary?: boolean },
) {
  const primarySource =
    contact.primaryPhoneDisplay?.trim() ||
    contact.primaryPhone?.trim() ||
    contact.primaryTel?.trim() ||
    "";
  const primaryPhoneDisplay = formatIndianPhoneDisplay(primarySource);
  const primaryPhone = nationalPhoneDigits(primarySource);
  const primaryTel = whatsappDigits(primarySource);

  const altSource =
    contact.altPhoneDisplay?.trim() || contact.altPhone?.trim() || contact.altTel?.trim() || "";
  const altPhoneDisplay = altSource ? formatIndianPhoneDisplay(altSource) : "";
  const altPhone = altSource ? nationalPhoneDigits(altSource) : "";
  const altTel = altSource ? whatsappDigits(altSource) : "";

  const whatsappSameAsPrimary = options?.whatsappSameAsPrimary ?? true;
  const whatsappNumber = whatsappSameAsPrimary
    ? primaryTel
    : whatsappDigits(contact.whatsappNumber?.trim() || primarySource);

  return {
    primaryPhoneDisplay,
    primaryPhone,
    primaryTel,
    altPhoneDisplay,
    altPhone,
    altTel,
    whatsappNumber,
  };
}

export function formatWhen(value: Date | string | null | undefined) {
  if (!value) return "—";
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDay(value: Date | string | null | undefined) {
  if (!value) return "—";
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return String(value).slice(0, 10);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

/** Normalize DB / JSON date values for `<input type="date">` (YYYY-MM-DD). */
export function toDateInputValue(value: Date | string | null | undefined) {
  if (value == null || value === "") return "";
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return "";
    const y = value.getFullYear();
    const m = String(value.getMonth() + 1).padStart(2, "0");
    const d = String(value.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  const s = String(value).trim();
  const iso = s.match(/^(\d{4}-\d{2}-\d{2})/);
  if (iso) return iso[1]!;
  const parsed = new Date(s);
  if (Number.isNaN(parsed.getTime())) return "";
  const y = parsed.getFullYear();
  const m = String(parsed.getMonth() + 1).padStart(2, "0");
  const d = String(parsed.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function csvEscape(value: unknown) {
  const s = value == null ? "" : String(value);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function toCsv(rows: Array<Record<string, unknown>>, columns: string[]) {
  const header = columns.join(",");
  const body = rows.map((row) => columns.map((col) => csvEscape(row[col])).join(",")).join("\n");
  return `${header}\n${body}`;
}

export function downloadBlob(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
