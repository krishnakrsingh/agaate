import type { LeadInput, LeadResult } from "@/functions/lead-types";
import { createHash } from "node:crypto";
import { getDbPool, isDbConfigured } from "@/server/db";

const rateMap = new Map<string, number[]>();
const recentTokens = new Map<string, number>();

function clean(s: unknown, max = 200) {
  return String(s ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

function normalizePhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

function isValidPhone(raw: string) {
  return /^[6-9]\d{9}$/.test(normalizePhone(raw));
}

function isValidEmail(raw: string) {
  if (!raw) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw) && raw.length <= 160;
}

function ticketId() {
  return `AGA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
}

function hashIp(ip: string) {
  return createHash("sha256").update(ip || "unknown").digest("hex");
}

function checkRateLimit(key: string, limit = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const arr = (rateMap.get(key) || []).filter((t) => now - t < windowMs);
  if (arr.length >= limit) {
    rateMap.set(key, arr);
    return false;
  }
  arr.push(now);
  rateMap.set(key, arr);
  return true;
}

function validateLead(data: LeadInput): string | null {
  if (data.honeypot) return "spam";
  if (!data.startedAt || Date.now() - data.startedAt < 1800) return "spam";
  if (!data.consent) return "Please accept the privacy notice to continue.";
  if (clean(data.name, 120).length < 2) return "Enter your full name.";
  if (!isValidPhone(data.phone)) return "Enter a 10-digit mobile number.";
  if (!isValidEmail(clean(data.email || "", 160))) return "Enter a valid email address.";
  if (!clean(data.topic, 64)) return "Select a topic.";
  if ((data.message || "").length > 600) return "Message is too long.";
  if (!data.clientToken || data.clientToken.length < 8) return "Invalid request.";
  return null;
}

/** Server-only implementation — never import from client components. */
export async function handleSubmitLead(data: LeadInput): Promise<LeadResult> {
  const validationError = validateLead(data);
  if (validationError === "spam") {
    return { ok: true, ticketId: ticketId(), stored: false };
  }
  if (validationError) {
    return { ok: false, error: validationError, code: "validation" };
  }

  const ip = process.env.CF_CONNECTING_IP || "local";
  const ipKey = hashIp(ip + clean(data.phone, 20));
  if (!checkRateLimit(ipKey)) {
    return {
      ok: false,
      error: "Too many requests. Please try again in a few minutes, or call us.",
      code: "rate_limit",
    };
  }

  const tokenAge = recentTokens.get(data.clientToken);
  if (tokenAge && Date.now() - tokenAge < 60_000) {
    return {
      ok: false,
      error: "This request was already submitted. Please wait a moment.",
      code: "rate_limit",
    };
  }
  recentTokens.set(data.clientToken, Date.now());

  const payload = {
    ticket_id: ticketId(),
    name: clean(data.name, 120),
    phone: normalizePhone(data.phone),
    email: clean(data.email || "", 160) || null,
    topic: clean(data.topic, 64),
    acreage: clean(data.acreage || "", 64) || null,
    crop: clean(data.crop || "", 64) || null,
    district: clean(data.district || "", 120) || null,
    channel: clean(data.channel || "WhatsApp", 32),
    message: clean(data.message || "", 600) || null,
    consent: data.consent ? 1 : 0,
    consent_at: data.consent ? new Date() : null,
    source_page: clean(data.sourcePage || "/contact", 255),
    ip_hash: hashIp(ip),
    user_agent: null as string | null,
  };

  if (!isDbConfigured()) {
    console.warn("[submitLead] MySQL not configured — returning ticket without persist");
    return { ok: true, ticketId: payload.ticket_id, stored: false };
  }

  try {
    const db = await getDbPool();
    const [dupes] = await db.query(
      `SELECT ticket_id FROM leads
       WHERE phone = :phone AND topic = :topic
         AND created_at > (NOW() - INTERVAL 2 MINUTE)
       ORDER BY id DESC LIMIT 1`,
      { phone: payload.phone, topic: payload.topic },
    );
    const rows = dupes as Array<{ ticket_id: string }>;
    if (rows[0]?.ticket_id) {
      return { ok: true, ticketId: rows[0].ticket_id, stored: true };
    }

    await db.query(
      `INSERT INTO leads
        (ticket_id, name, phone, email, topic, acreage, crop, district, channel, message,
         consent, consent_at, source_page, ip_hash, user_agent)
       VALUES
        (:ticket_id, :name, :phone, :email, :topic, :acreage, :crop, :district, :channel, :message,
         :consent, :consent_at, :source_page, :ip_hash, :user_agent)`,
      payload,
    );
    return { ok: true, ticketId: payload.ticket_id, stored: true };
  } catch (err) {
    console.error("[submitLead]", err);
    return {
      ok: false,
      error: "We could not save your request right now. Please try again or WhatsApp us.",
      code: "server",
    };
  }
}
