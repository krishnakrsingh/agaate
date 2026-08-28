export const PERMS = {
  CMS_VIEW: "cms.view",
  CMS_EDIT: "cms.edit",
  SEO_MANAGE: "seo.manage",
  SETTINGS_MANAGE: "settings.manage",
  USERS_MANAGE: "users.manage",
  USERS_DELETE: "users.delete",
  ROLES_MANAGE: "roles.manage",
  INQUIRIES_VIEW_ALL: "inquiries.view_all",
  INQUIRIES_EDIT: "inquiries.edit",
} as const;

export type PermissionKey = (typeof PERMS)[keyof typeof PERMS];

export type PermissionDefinition = {
  key: PermissionKey;
  label: string;
  category: string;
  description: string;
};

export const PERMISSION_CATALOG: PermissionDefinition[] = [
  {
    key: PERMS.CMS_VIEW,
    label: "View CMS content",
    category: "Content",
    description: "Browse pages, homepage modules, and CMS data in read-only mode.",
  },
  {
    key: PERMS.CMS_EDIT,
    label: "Edit CMS content",
    category: "Content",
    description: "Create, update, publish, and archive website content.",
  },
  {
    key: PERMS.SEO_MANAGE,
    label: "Manage SEO",
    category: "SEO",
    description: "Edit page SEO, global settings, redirects, and run audits.",
  },
  {
    key: PERMS.SETTINGS_MANAGE,
    label: "Manage system settings",
    category: "System",
    description: "Configure SMTP, email templates, and app store links.",
  },
  {
    key: PERMS.USERS_MANAGE,
    label: "Manage users",
    category: "Access",
    description: "Create and edit staff accounts and assign roles.",
  },
  {
    key: PERMS.USERS_DELETE,
    label: "Delete users",
    category: "Access",
    description: "Permanently remove staff accounts.",
  },
  {
    key: PERMS.ROLES_MANAGE,
    label: "Manage roles",
    category: "Access",
    description: "Create custom roles and configure permissions.",
  },
  {
    key: PERMS.INQUIRIES_VIEW_ALL,
    label: "View all inquiries",
    category: "Operations",
    description: "See every farm visit and contact inquiry.",
  },
  {
    key: PERMS.INQUIRIES_EDIT,
    label: "Edit inquiries",
    category: "Operations",
    description: "Update status, notes, and assignments on inquiries.",
  },
];

export type RbacRole = {
  id: number;
  slug: string;
  name: string;
  description: string;
  isSystem: boolean;
  permissions: PermissionKey[];
  userCount?: number;
  createdAt?: string;
  updatedAt?: string;
};

export const SYSTEM_ROLE_SLUGS = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  AGRONOMIST: "agronomist",
  SUPPORT: "support",
} as const;

export const DEFAULT_SYSTEM_ROLE_PERMISSIONS: Record<string, PermissionKey[]> = {
  [SYSTEM_ROLE_SLUGS.SUPER_ADMIN]: PERMISSION_CATALOG.map((p) => p.key),
  [SYSTEM_ROLE_SLUGS.ADMIN]: [
    PERMS.CMS_VIEW,
    PERMS.CMS_EDIT,
    PERMS.SEO_MANAGE,
    PERMS.SETTINGS_MANAGE,
    PERMS.USERS_MANAGE,
    PERMS.INQUIRIES_VIEW_ALL,
    PERMS.INQUIRIES_EDIT,
  ],
  [SYSTEM_ROLE_SLUGS.AGRONOMIST]: [
    PERMS.CMS_VIEW,
    PERMS.INQUIRIES_EDIT,
  ],
  [SYSTEM_ROLE_SLUGS.SUPPORT]: [
    PERMS.CMS_VIEW,
    PERMS.INQUIRIES_EDIT,
  ],
};

export function hasPermission(
  permissions: readonly string[] | undefined,
  key: PermissionKey | string,
): boolean {
  return Boolean(permissions?.includes(key));
}

export function hasAllPermissions(
  actorPermissions: readonly string[],
  required: readonly string[],
): boolean {
  return required.every((p) => actorPermissions.includes(p));
}

export function slugifyRoleName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 64);
}
