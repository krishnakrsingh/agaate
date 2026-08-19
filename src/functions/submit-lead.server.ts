import {
  leadInputSchema,
  normalizePhoneNumber,
  type LeadInput,
  type LeadResult,
} from "@/functions/lead-types";
import { createHash } from "node:crypto";
import { getDbPool, isDbConfigured } from "@/server/db";
import type { LeadDbRecord } from "@/server/schema";

// Sliding window rate limiter with auto-pruning to avoid memory leaks
const rateMap = new Map<string, number[]>();
const recentTokens = new Map<string, number>();

// Periodically prune stale cache entries every 10 minutes
const PRUNE_INTERVAL_MS = 10 * 60 * 1000;
let lastPruneTime = Date.now();

function pruneStaleCache(now: number) {
  if (now - lastPruneTime < PRUNE_INTERVAL_MS) return;
  lastPruneTime = now;

  const rateWindow = 15 * 60 * 1000;
  for (const [key, timestamps] of rateMap.entries()) {
    const fresh = timestamps.filter((t) => now - t < rateWindow);
    if (fresh.length === 0) {
      rateMap.delete(key);
    } else {
      rateMap.set(key, fresh);
    }
  }

  const tokenWindow = 60 * 1000;
  for (const [token, timestamp] of recentTokens.entries()) {
    if (now - timestamp > tokenWindow) {
      recentTokens.delete(token);
    }
  }
}

function sanitizeString(s: unknown, max = 200): string {
  return String(s ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

export function generateTicketId(): string {
  const year = new Date().getFullYear();
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `AGA-${year}-${randomDigits}`;
}

export function hashIp(ip: string): string {
  return createHash("sha256")
    .update(ip || "unknown")
    .digest("hex");
}

export function checkRateLimit(key: string, limit = 5, windowMs = 15 * 60 * 1000): boolean {
  const now = Date.now();
  pruneStaleCache(now);

  const arr = (rateMap.get(key) || []).filter((t) => now - t < windowMs);
  if (arr.length >= limit) {
    rateMap.set(key, arr);
    return false;
  }
  arr.push(now);
  rateMap.set(key, arr);
  return true;
}

/**
 * Server-only implementation — never import from client components.
 */
export async function handleSubmitLead(rawData: LeadInput): Promise<LeadResult> {
  const parsed = leadInputSchema.safeParse(rawData);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Invalid form submission.";
    return { ok: false, error: firstIssue, code: "validation" };
  }

  const data = parsed.data;

  // Bot & Spam checks
  if (data.honeypot) {
    return { ok: true, ticketId: generateTicketId(), stored: false };
  }
  if (data.startedAt && Date.now() - data.startedAt < 1500) {
    // Filled in under 1.5 seconds - likely bot
    return { ok: true, ticketId: generateTicketId(), stored: false };
  }

  const ip = process.env.CF_CONNECTING_IP || process.env.REMOTE_ADDR || "local";
  const ipKey = hashIp(ip + sanitizeString(data.phone, 20));

  if (!checkRateLimit(ipKey)) {
    return {
      ok: false,
      error: "Too many requests. Please try again in a few minutes, or call our advisory team.",
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

  const payload: LeadDbRecord = {
    ticket_id: generateTicketId(),
    name: sanitizeString(data.name, 120),
    phone: normalizePhoneNumber(data.phone),
    email: data.email ? sanitizeString(data.email, 160) : null,
    topic: sanitizeString(data.topic, 64),
    acreage: data.acreage ? sanitizeString(data.acreage, 64) : null,
    crop: data.crop ? sanitizeString(data.crop, 64) : null,
    district: data.district ? sanitizeString(data.district, 120) : null,
    channel: sanitizeString(data.channel || "WhatsApp", 32),
    message: data.message ? sanitizeString(data.message, 600) : null,
    consent: data.consent ? 1 : 0,
    consent_at: data.consent ? new Date() : null,
    source_page: sanitizeString(data.sourcePage || "/contact", 255),
    ip_hash: hashIp(ip),
    user_agent: null,
  };

  if (!isDbConfigured()) {
    console.warn("[submitLead] MySQL not configured — returning generated ticket without persist");
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

    const { ensureAdminSchema, logActivity } = await import("@/server/admin-queries");
    await ensureAdminSchema();

    let userAgent: string | null = payload.user_agent;
    try {
      const { getRequestHeader } = await import("@tanstack/react-start/server");
      userAgent = getRequestHeader("user-agent")?.slice(0, 512) ?? null;
    } catch {
      userAgent = payload.user_agent;
    }

    const farmDetails = JSON.stringify({
      acreage: payload.acreage,
      crop: payload.crop,
      district: payload.district,
    });

    const [insertResult] = await db.query(
      `INSERT INTO leads
        (ticket_id, name, phone, email, topic, acreage, crop, district, channel, message,
         consent, consent_at, source_page, ip_hash, user_agent, status, priority,
         farm_details, preferred_language)
       VALUES
        (:ticket_id, :name, :phone, :email, :topic, :acreage, :crop, :district, :channel, :message,
         :consent, :consent_at, :source_page, :ip_hash, :user_agent, 'new', 'medium',
         :farm_details, 'en')`,
      {
        ...(payload as unknown as Record<string, unknown>),
        user_agent: userAgent,
        farm_details: farmDetails,
      },
    );

    const insertId = Number((insertResult as { insertId: number }).insertId);
    if (insertId) {
      await logActivity(insertId, null, "request_created", { ticket_id: payload.ticket_id });
    }

    void notifyAdminNewLead(payload.ticket_id, payload.name, payload.topic, payload.phone);

    return { ok: true, ticketId: payload.ticket_id, stored: true };
  } catch (err) {
    console.error("[submitLead] Database error:", err);
    return {
      ok: false,
      error: "We could not save your request right now. Please try again or reach us via WhatsApp.",
      code: "server",
    };
  }
}

async function notifyAdminNewLead(ticketId: string, name: string, topic: string, phone: string) {
  const to = process.env.ADMIN_NOTIFY_EMAIL;
  if (!to) return;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info("[submitLead] New lead (email notify skipped — set RESEND_API_KEY)", ticketId);
    return;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.ADMIN_NOTIFY_FROM || "Agaate <noreply@agaate.in>",
        to: [to],
        subject: `New contact request ${ticketId}`,
        text: `${name} (${phone}) submitted a ${topic} request. Open /agaate-admin/contacts to follow up.`,
      }),
    });
    if (!res.ok) {
      console.error("[submitLead] notify email failed", await res.text());
    }
  } catch (err) {
    console.error("[submitLead] notify email error", err);
  }
}
