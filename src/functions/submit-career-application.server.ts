import { mkdir, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { randomBytes } from "node:crypto";
import {
  careerApplicationSchema,
  normalizeCareerPhone,
  type CareerApplicationInput,
  type CareerApplicationResult,
} from "@/functions/career-application-types";
import { checkRateLimit, hashIp } from "@/functions/submit-lead.server";
import { isDbConfigured } from "@/server/db";
import { insertCareerApplication } from "@/server/admin-queries";
import { listPublishedCareerJobs } from "@/server/cms-careers-queries";

const recentTokens = new Map<string, number>();

const RESUME_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const RESUME_EXT = new Set([".pdf", ".doc", ".docx"]);

export async function saveCareerResumeFile(
  filename: string,
  mime: string,
  base64: string,
): Promise<string | null> {
  if (!RESUME_MIME.has(mime)) return null;
  const buf = Buffer.from(base64, "base64");
  if (buf.byteLength > 5 * 1024 * 1024) return null;
  const ext =
    extname(filename).toLowerCase() ||
    (mime === "application/pdf" ? ".pdf" : mime.includes("wordprocessingml") ? ".docx" : ".doc");
  if (!RESUME_EXT.has(ext)) return null;
  const dir = join(process.cwd(), "public", "uploads", "careers", "resumes");
  await mkdir(dir, { recursive: true });
  const name = `${randomBytes(12).toString("hex")}${ext}`;
  await writeFile(join(dir, name), buf);
  return `/uploads/careers/resumes/${name}`;
}

export async function handleSubmitCareerApplication(
  rawData: CareerApplicationInput,
): Promise<CareerApplicationResult> {
  const parsed = careerApplicationSchema.safeParse(rawData);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Invalid application.";
    return { ok: false, error: firstIssue, code: "validation" };
  }

  const data = parsed.data;

  if (data.honeypot) {
    return { ok: true, stored: false };
  }
  if (data.startedAt && Date.now() - data.startedAt < 2000) {
    return { ok: true, stored: false };
  }

  const phone = normalizeCareerPhone(data.phone);
  if (!phone) {
    return { ok: false, error: "Enter a valid 10-digit Indian mobile number.", code: "validation" };
  }

  const publishedJobs = await listPublishedCareerJobs("en");
  const job = publishedJobs.find((j) => j.id === data.jobSlug);
  if (!job) {
    return {
      ok: false,
      error: "This role is no longer open. Please choose another position.",
      code: "validation",
    };
  }

  const ip = process.env.CF_CONNECTING_IP || process.env.REMOTE_ADDR || "local";
  const ipKey = hashIp(ip + phone + data.email);
  if (!checkRateLimit(`career:${ipKey}`, 5, 15 * 60 * 1000)) {
    return {
      ok: false,
      error: "Too many applications. Please try again in a few minutes.",
      code: "rate_limit",
    };
  }

  const tokenAge = recentTokens.get(data.clientToken);
  if (tokenAge && Date.now() - tokenAge < 60_000) {
    return {
      ok: false,
      error: "This application was already submitted. Please wait a moment.",
      code: "rate_limit",
    };
  }
  recentTokens.set(data.clientToken, Date.now());

  const resumeUrl = await saveCareerResumeFile(
    data.resume.filename,
    data.resume.mime,
    data.resume.base64,
  );
  if (!resumeUrl) {
    return {
      ok: false,
      error: "Upload a PDF or Word resume (max 5MB).",
      code: "validation",
    };
  }

  const record = {
    job_slug: job.id,
    job_title: job.title,
    name: data.name.trim(),
    phone,
    email: data.email.trim().toLowerCase(),
    experience_band: data.experienceBand.trim(),
    crop_experience: data.cropExperience.trim(),
    resume_url: resumeUrl,
    ip_hash: hashIp(ip),
  };

  if (!isDbConfigured()) {
    const mem = await import("@/server/cms-memory");
    mem.mockCareerApplications.unshift({
      id: mem.mockCareerApplications.length + 1,
      ...record,
      created_at: new Date().toISOString(),
    });
    return { ok: true, stored: false };
  }

  try {
    const { ensureCareerApplicationsSchema } = await import("@/server/admin-queries");
    await ensureCareerApplicationsSchema();
    await insertCareerApplication(record);
    return { ok: true, stored: true };
  } catch (err) {
    console.error("[submitCareerApplication] error:", err);
    return {
      ok: false,
      error: "We could not save your application right now. Please try again shortly.",
      code: "server",
    };
  }
}
