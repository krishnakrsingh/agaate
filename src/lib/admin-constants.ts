import { hasPermission, PERMS } from "@/lib/rbac";

export const ADMIN_ROLES = ["super_admin", "admin", "agronomist", "support"] as const;
export type AdminRole = (typeof ADMIN_ROLES)[number];

export type SessionUser = {
  id: number;
  name: string;
  email: string;
  roleId: number;
  role: string;
  roleName: string;
  permissions: string[];
  isSystemRole?: boolean;
};

export type AdminAccess = Pick<SessionUser, "id" | "permissions" | "role" | "roleId">;

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

export function canViewCms(user: Pick<SessionUser, "permissions">) {
  return hasPermission(user.permissions, PERMS.CMS_VIEW);
}

export function canEditCms(user: Pick<SessionUser, "permissions">) {
  return hasPermission(user.permissions, PERMS.CMS_EDIT);
}

export function canManageSeo(user: Pick<SessionUser, "permissions">) {
  return hasPermission(user.permissions, PERMS.SEO_MANAGE);
}

export function canManageSettings(user: Pick<SessionUser, "permissions">) {
  return hasPermission(user.permissions, PERMS.SETTINGS_MANAGE);
}

export function canManageUsers(user: Pick<SessionUser, "permissions">) {
  return hasPermission(user.permissions, PERMS.USERS_MANAGE);
}

export function canDeleteUsers(user: Pick<SessionUser, "permissions">) {
  return hasPermission(user.permissions, PERMS.USERS_DELETE);
}

export function canManageRoles(user: Pick<SessionUser, "permissions">) {
  return hasPermission(user.permissions, PERMS.ROLES_MANAGE);
}

export function canViewAllInquiries(user: Pick<SessionUser, "permissions">) {
  return hasPermission(user.permissions, PERMS.INQUIRIES_VIEW_ALL);
}

export function canEditInquiries(user: Pick<SessionUser, "permissions">) {
  return hasPermission(user.permissions, PERMS.INQUIRIES_EDIT);
}

export function isRestrictedAssignee(user: Pick<SessionUser, "permissions">) {
  return canEditInquiries(user) && !canViewAllInquiries(user);
}

export const ROLE_DESCRIPTIONS: Record<AdminRole, string> = {
  super_admin: "Full system access including user management and all CMS settings.",
  admin: "Manage website content, SEO, settings, and staff accounts (except super admins).",
  agronomist: "View CMS content and manage assigned farm visit inquiries.",
  support: "View CMS content and manage assigned customer inquiries.",
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
  analytics: {
    enabled: false,
    googleAnalyticsId: "",
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

export function roleLabel(slug: string, fallbackName?: string) {
  if (slug in ROLE_LABELS) return ROLE_LABELS[slug as AdminRole];
  return fallbackName || slug;
}
