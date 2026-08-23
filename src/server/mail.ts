import nodemailer from "nodemailer";
import type { AdminSettingsPayload } from "@/lib/admin-constants";
import { DEFAULT_ADMIN_SETTINGS, interpolateTemplate } from "@/lib/admin-constants";
import { getSettings } from "@/server/admin-queries";
import { isDbConfigured } from "@/server/db";

export type ContactEmailPayload = {
  ticketId: string;
  name: string;
  phone: string;
  email?: string | null;
  topic: string;
  topicLabel?: string;
  acreage?: string | null;
  crop?: string | null;
  district?: string | null;
  channel?: string | null;
  message?: string | null;
  sourcePage?: string | null;
};

const TOPIC_LABELS: Record<string, string> = {
  nursery: "Bio-Boosted Nursery Pre-Orders",
  bigfarm: "Big Farm Setup (Turnkey)",
  carbon: "Carbon Credit Program",
  wholesale: "Kisan Mall Wholesale",
  agripark: "Agri Park Visit",
  general: "General Agronomy Advisory",
};

function envMailSettings(): AdminSettingsPayload["smtp"] {
  return {
    host: process.env.SMTP_HOST || "",
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    fromEmail: process.env.SMTP_FROM_EMAIL || process.env.ADMIN_NOTIFY_FROM || "info@agaate.in",
    fromName: process.env.SMTP_FROM_NAME || "Agaate Website",
  };
}

export async function resolveMailSettings(): Promise<{
  smtp: AdminSettingsPayload["smtp"];
  contactNotificationEmail: string;
  contactEmailSubject: string;
}> {
  let settings = DEFAULT_ADMIN_SETTINGS;
  if (isDbConfigured()) {
    try {
      settings = await getSettings();
    } catch (err) {
      console.warn("[mail] Failed to load admin settings, using defaults:", err);
    }
  }

  const envSmtp = envMailSettings();
  const smtp = {
    ...DEFAULT_ADMIN_SETTINGS.smtp,
    ...envSmtp,
    ...settings.smtp,
    pass: settings.smtp.pass || envSmtp.pass,
    host: settings.smtp.host || envSmtp.host,
    user: settings.smtp.user || envSmtp.user,
  };

  return {
    smtp,
    contactNotificationEmail:
      settings.contactNotificationEmail ||
      process.env.ADMIN_NOTIFY_EMAIL ||
      "info@agaate.in",
    contactEmailSubject:
      settings.contactEmailSubject || DEFAULT_ADMIN_SETTINGS.contactEmailSubject,
  };
}

function isSmtpReady(smtp: AdminSettingsPayload["smtp"]) {
  return Boolean(smtp.host && smtp.user && smtp.pass && smtp.fromEmail);
}

function formatContactBody(data: ContactEmailPayload) {
  const topicLabel = data.topicLabel || TOPIC_LABELS[data.topic] || data.topic;
  const lines = [
    "New consultation request from agaate.in",
    "",
    `Ticket: ${data.ticketId}`,
    `Topic: ${topicLabel}`,
    `Name: ${data.name}`,
    `Phone: +91 ${data.phone}`,
    `Email: ${data.email || "—"}`,
    `Preferred channel: ${data.channel || "WhatsApp"}`,
    "",
    "Farm details",
    `Acreage: ${data.acreage || "—"}`,
    `District: ${data.district || "—"}`,
    `Primary crop: ${data.crop || "—"}`,
    "",
    "Message",
    data.message?.trim() || "—",
    "",
    `Source page: ${data.sourcePage || "/contact"}`,
    `Submitted at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
  ];
  return lines.join("\n");
}

export async function sendContactNotificationEmail(data: ContactEmailPayload) {
  const { smtp, contactNotificationEmail, contactEmailSubject } = await resolveMailSettings();
  if (!isSmtpReady(smtp)) {
    console.warn("[mail] SMTP not configured — contact email skipped for", data.ticketId);
    return { ok: false as const, error: "SMTP not configured" };
  }

  const subject = interpolateTemplate(contactEmailSubject, {
    ticket: data.ticketId,
    name: data.name,
  });
  const text = formatContactBody(data);

  try {
    const transport = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: { user: smtp.user, pass: smtp.pass },
    });

    await transport.sendMail({
      from: `"${smtp.fromName}" <${smtp.fromEmail}>`,
      to: contactNotificationEmail,
      replyTo: data.email || undefined,
      subject,
      text,
    });

    return { ok: true as const };
  } catch (err) {
    console.error("[mail] Failed to send contact notification:", err);
    return { ok: false as const, error: err instanceof Error ? err.message : "Send failed" };
  }
}

export async function sendTestEmail(to: string) {
  const { smtp } = await resolveMailSettings();
  if (!isSmtpReady(smtp)) {
    return { ok: false as const, error: "SMTP host, user, password, and from email are required." };
  }

  try {
    const transport = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: { user: smtp.user, pass: smtp.pass },
    });

    await transport.sendMail({
      from: `"${smtp.fromName}" <${smtp.fromEmail}>`,
      to,
      subject: "Agaate SMTP test — configuration OK",
      text: "This is a test email from your Agaate admin SMTP settings. Contact form submissions will be delivered to your configured inbox.",
    });

    return { ok: true as const };
  } catch (err) {
    console.error("[mail] SMTP test failed:", err);
    return { ok: false as const, error: err instanceof Error ? err.message : "SMTP test failed" };
  }
}
