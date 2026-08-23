import { z } from "zod";

/**
 * Normalizes Indian and international phone numbers to standard 10-digit digits string.
 */
export function normalizePhoneNumber(raw: string): string {
  const digits = String(raw ?? "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

export function isValidIndianPhoneNumber(raw: string): boolean {
  return /^[6-9]\d{9}$/.test(normalizePhoneNumber(raw));
}

/**
 * Zod schema for Lead Form Submission
 */
export const leadInputSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Enter your full name." })
    .max(120, { message: "Name is too long." })
    .transform((val) => val.trim()),
  phone: z
    .string()
    .min(10, { message: "Enter a valid 10-digit mobile number." })
    .refine((val) => isValidIndianPhoneNumber(val), {
      message: "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.",
    }),
  email: z
    .string()
    .max(160, { message: "Email is too long." })
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Enter a valid email address.",
    }),
  topic: z
    .string()
    .min(1, { message: "Select a topic." })
    .max(64, { message: "Topic is too long." }),
  acreage: z.string().max(64).optional(),
  crop: z.string().max(64).optional(),
  district: z.string().max(120).optional(),
  channel: z.string().max(32).default("WhatsApp"),
  message: z.string().max(600, { message: "Message is too long (max 600 characters)." }).optional(),
  visitDate: z.string().max(32).optional(),
  visitorType: z.string().max(120).optional(),
  groupCount: z.string().max(120).optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "Please accept the privacy notice to continue.",
  }),
  honeypot: z.string().optional(),
  startedAt: z.number().optional(),
  clientToken: z.string().min(8, { message: "Invalid client session token." }),
  sourcePage: z.string().max(255).optional(),
});

export type LeadInput = z.infer<typeof leadInputSchema>;

export const leadResultSchema = z.discriminatedUnion("ok", [
  z.object({
    ok: z.literal(true),
    ticketId: z.string(),
    stored: z.boolean(),
  }),
  z.object({
    ok: z.literal(false),
    error: z.string(),
    code: z.enum(["validation", "rate_limit", "server"]).optional(),
  }),
]);

export type LeadResult = z.infer<typeof leadResultSchema>;
