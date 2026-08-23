import {
  newsletterSignupSchema,
  parseNewsletterContact,
  type NewsletterSignupInput,
  type NewsletterSignupResult,
} from "@/functions/newsletter-types";
import { checkRateLimit, hashIp } from "@/functions/submit-lead.server";
import { isDbConfigured } from "@/server/db";
import { insertNewsletterSignup, hasRecentNewsletterSignup } from "@/server/admin-queries";

const recentTokens = new Map<string, number>();

function sanitizePage(page: string): string {
  const trimmed = page.trim().slice(0, 255);
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

export async function handleSubmitNewsletterSignup(rawData: NewsletterSignupInput): Promise<NewsletterSignupResult> {
  const parsed = newsletterSignupSchema.safeParse(rawData);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Invalid submission.";
    return { ok: false, error: firstIssue, code: "validation" };
  }

  const data = parsed.data;

  if (data.honeypot) {
    return { ok: true, stored: false };
  }
  if (data.startedAt && Date.now() - data.startedAt < 1200) {
    return { ok: true, stored: false };
  }

  const contactParsed = parseNewsletterContact(data.contact);
  if (!contactParsed) {
    return {
      ok: false,
      error: "Enter a valid email address or 10-digit Indian mobile number.",
      code: "validation",
    };
  }

  const ip = process.env.CF_CONNECTING_IP || process.env.REMOTE_ADDR || "local";
  const ipKey = hashIp(ip + contactParsed.contact);
  if (!checkRateLimit(`newsletter:${ipKey}`, 8, 15 * 60 * 1000)) {
    return {
      ok: false,
      error: "Too many requests. Please try again in a few minutes.",
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

  const sourcePage = sanitizePage(data.sourcePage || "/kisaan-mall");

  if (!isDbConfigured()) {
    const mem = await import("@/server/cms-memory");
    const exists = mem.mockNewsletterSignups.some(
      (s) => s.contact === contactParsed.contact && s.source_page === sourcePage,
    );
    if (!exists) {
      mem.mockNewsletterSignups.unshift({
        id: mem.mockNewsletterSignups.length + 1,
        contact: contactParsed.contact,
        contact_type: contactParsed.contactType,
        source_page: sourcePage,
        created_at: new Date().toISOString(),
      });
    }
    return { ok: true, stored: false, alreadyRegistered: exists };
  }

  try {
    const { ensureNewsletterSchema } = await import("@/server/admin-queries");
    await ensureNewsletterSchema();

    const recent = await hasRecentNewsletterSignup(contactParsed.contact, sourcePage);
    if (recent) {
      return { ok: true, stored: true, alreadyRegistered: true };
    }

    await insertNewsletterSignup({
      contact: contactParsed.contact,
      contact_type: contactParsed.contactType,
      source_page: sourcePage,
      ip_hash: hashIp(ip),
    });

    return { ok: true, stored: true };
  } catch (err) {
    console.error("[submitNewsletter] error:", err);
    return {
      ok: false,
      error: "We could not save your signup right now. Please try again shortly.",
      code: "server",
    };
  }
}
