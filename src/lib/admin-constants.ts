export const ADMIN_ROLES = ["super_admin", "admin", "agronomist", "support"] as const;
export type AdminRole = (typeof ADMIN_ROLES)[number];

export type SessionUser = {
  id: number;
  name: string;
  email: string;
  role: AdminRole;
};

export const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  agronomist: "Agronomist",
  support: "Support Executive",
};

export const REQUEST_STATUSES = [
  "new",
  "assigned",
  "contacted",
  "in_progress",
  "waiting",
  "farm_visit",
  "converted",
  "closed",
  "spam",
] as const;
export type RequestStatus = (typeof REQUEST_STATUSES)[number];

export const STATUS_LABELS: Record<RequestStatus, string> = {
  new: "New",
  assigned: "Assigned",
  contacted: "Contacted",
  in_progress: "In Progress",
  waiting: "Waiting for Customer",
  farm_visit: "Farm Visit Scheduled",
  converted: "Converted",
  closed: "Closed",
  spam: "Spam",
};

export const PRIORITIES = ["low", "medium", "high", "urgent"] as const;
export type RequestPriority = (typeof PRIORITIES)[number];

export const PRIORITY_LABELS: Record<RequestPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

export function canManageSettings(role: AdminRole) {
  return role === "super_admin" || role === "admin";
}

export function canManageUsers(role: AdminRole) {
  return role === "super_admin" || role === "admin";
}

export function canAssignRole(actor: AdminRole, target: AdminRole) {
  if (actor === "super_admin") return true;
  if (actor === "admin") return target !== "super_admin";
  return false;
}

export function isRestrictedAssignee(role: AdminRole) {
  return role === "agronomist" || role === "support";
}

export const ROLE_DESCRIPTIONS: Record<AdminRole, string> = {
  super_admin: "Full system access including user management and all CMS settings.",
  admin: "Manage website content, SEO, settings, and staff accounts (except super admins).",
  agronomist: "View CMS content and manage assigned farm visit inquiries.",
  support: "View CMS content and manage assigned customer inquiries.",
};

export const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
  super_admin: [
    "All CMS content",
    "SEO Manager",
    "System settings",
    "User & access management",
    "All inquiries",
  ],
  admin: [
    "All CMS content",
    "SEO Manager",
    "System settings",
    "User management (non–super admin)",
    "All inquiries",
  ],
  agronomist: ["View CMS content", "Assigned farm visits", "Inquiry notes"],
  support: ["View CMS content", "Assigned inquiries", "Inquiry notes"],
};

export const DEFAULT_ADMIN_SETTINGS = {
  businessHours: {
    start: "07:30",
    end: "20:00",
    days: "Mon–Sat",
    timezone: "IST",
  },
  defaultResponseTime: "2 business hours",
  whatsappTemplate:
    "Hello {{name}}, this is the Agaate team regarding your request {{ticket}}. How can we help you today?",
  emailSubject: "Agaate — follow-up on {{ticket}}",
  emailTemplate:
    "Hello {{name}},\n\nThank you for contacting Agaate ({{ticket}}).\n\n{{notes}}\n\nBest regards,\nAgaate Team",
  priorityRules:
    "Mark as Urgent for Big Farm Setup or overdue follow-ups. High for nursery pre-orders over 15 acres.",
  contactNotificationEmail: "info@agaate.in",
  contactEmailSubject: "New consultation request — {{ticket}}",
  smtp: {
    host: "",
    port: 587,
    secure: false,
    user: "",
    pass: "",
    fromEmail: "info@agaate.in",
    fromName: "Agaate Website",
  },
};

export type AdminSettingsPayload = typeof DEFAULT_ADMIN_SETTINGS;

export type AdminSettingsForClient = Omit<AdminSettingsPayload, "smtp"> & {
  smtp: Omit<AdminSettingsPayload["smtp"], "pass"> & { passConfigured: boolean };
};

export function sanitizeSettingsForClient(settings: AdminSettingsPayload): AdminSettingsForClient {
  const { pass, ...smtpRest } = settings.smtp;
  return {
    ...settings,
    smtp: {
      ...smtpRest,
      passConfigured: Boolean(pass),
    },
  };
}

export function interpolateTemplate(template: string, vars: Record<string, string | undefined>) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => vars[key] ?? "");
}
