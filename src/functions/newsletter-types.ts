import { z } from "zod";
import { isValidIndianPhoneNumber, normalizePhoneNumber } from "@/functions/lead-types";

export function parseNewsletterContact(
  raw: string,
): { contact: string; contactType: "email" | "phone" } | null {
  const value = String(raw ?? "").trim();
  if (!value) return null;

  if (value.includes("@")) {
    const email = value.toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
    return { contact: email, contactType: "email" };
  }

  if (!isValidIndianPhoneNumber(value)) return null;
  return { contact: normalizePhoneNumber(value), contactType: "phone" };
}

export const newsletterSignupSchema = z.object({
  contact: z.string().min(3, { message: "Enter your email or mobile number." }).max(160),
  sourcePage: z.string().max(255).default("/kisaan-mall"),
  clientToken: z.string().min(8, { message: "Invalid client session token." }),
  honeypot: z.string().optional(),
  startedAt: z.number().optional(),
});

export type NewsletterSignupInput = z.infer<typeof newsletterSignupSchema>;

export const newsletterSignupResultSchema = z.discriminatedUnion("ok", [
  z.object({
    ok: z.literal(true),
    stored: z.boolean(),
    alreadyRegistered: z.boolean().optional(),
  }),
  z.object({
    ok: z.literal(false),
    error: z.string(),
    code: z.enum(["validation", "rate_limit", "server"]).optional(),
  }),
]);

export type NewsletterSignupResult = z.infer<typeof newsletterSignupResultSchema>;
