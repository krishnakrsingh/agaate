import { z } from "zod";
import { isValidIndianPhoneNumber, normalizePhoneNumber } from "@/functions/lead-types";

export const careerResumeSchema = z.object({
  filename: z.string().min(1).max(255),
  mime: z.string().min(3).max(120),
  base64: z.string().min(1),
});

export const careerApplicationSchema = z.object({
  jobSlug: z.string().min(2).max(64),
  name: z.string().min(2, { message: "Enter your full name." }).max(160),
  phone: z.string().min(10, { message: "Enter a valid phone number." }).max(32),
  email: z.string().email({ message: "Enter a valid email address." }).max(160),
  experienceBand: z.string().max(80).default(""),
  cropExperience: z.string().max(500).default(""),
  resume: careerResumeSchema,
  clientToken: z.string().min(8, { message: "Invalid client session token." }),
  honeypot: z.string().optional(),
  startedAt: z.number().optional(),
});

export type CareerApplicationInput = z.infer<typeof careerApplicationSchema>;

export const careerApplicationResultSchema = z.discriminatedUnion("ok", [
  z.object({ ok: z.literal(true), stored: z.boolean() }),
  z.object({
    ok: z.literal(false),
    error: z.string(),
    code: z.enum(["validation", "rate_limit", "server"]).optional(),
  }),
]);

export type CareerApplicationResult = z.infer<typeof careerApplicationResultSchema>;

export function normalizeCareerPhone(raw: string): string | null {
  if (!isValidIndianPhoneNumber(raw)) return null;
  return normalizePhoneNumber(raw);
}
