import { describe, expect, it } from "vitest";
import {
  digitsPhone,
  whatsappDigits,
  formatWhen,
  formatDay,
  toDateInputValue,
  csvEscape,
  toCsv,
} from "@/lib/admin-format";
import {
  interpolateTemplate,
  canManageSettings,
  canEditCms,
  isRestrictedAssignee,
  DEFAULT_ADMIN_SETTINGS,
} from "@/lib/admin-constants";
import { PERMS } from "@/lib/rbac";
import { isAdminOk, adminError, kpi } from "@/lib/admin-api";

const adminPerms = [
  PERMS.CMS_VIEW,
  PERMS.CMS_EDIT,
  PERMS.SEO_MANAGE,
  PERMS.SETTINGS_MANAGE,
  PERMS.USERS_MANAGE,
  PERMS.INQUIRIES_VIEW_ALL,
  PERMS.INQUIRIES_EDIT,
];

const agronomistPerms = [PERMS.CMS_VIEW, PERMS.INQUIRIES_EDIT];

describe("Admin Utilities & Formatters", () => {
  describe("Phone Formatting", () => {
    it("strips non-digit characters correctly", () => {
      expect(digitsPhone("+91 98765-43210")).toBe("919876543210");
      expect(digitsPhone("09876543210")).toBe("9876543210");
      expect(digitsPhone("")).toBe("");
    });

    it("formats Indian phone numbers for WhatsApp URL", () => {
      expect(whatsappDigits("9876543210")).toBe("919876543210");
      expect(whatsappDigits("+91 98765 43210")).toBe("919876543210");
    });
  });

  describe("CSV Generation", () => {
    it("escapes CSV values with commas, quotes, and newlines", () => {
      expect(csvEscape("simple")).toBe("simple");
      expect(csvEscape("hello, world")).toBe('"hello, world"');
      expect(csvEscape('say "hi"')).toBe('"say ""hi"""');
      expect(csvEscape("line1\nline2")).toBe('"line1\nline2"');
      expect(csvEscape(null)).toBe("");
    });

    it("builds multi-row CSV with headers correctly", () => {
      const rows = [
        { ticket: "AGA-101", name: "Ramesh Patel", crop: "Chilli G4" },
        { ticket: "AGA-102", name: "Sunita, Devi", crop: "Tomato" },
      ];
      const cols = ["ticket", "name", "crop"];
      const output = toCsv(rows, cols);
      expect(output).toContain("ticket,name,crop");
      expect(output).toContain('AGA-102,"Sunita, Devi",Tomato');
    });
  });

  describe("Template Interpolation", () => {
    it("interpolates tokens in WhatsApp / Email templates", () => {
      const template = "Hello {{name}}, inquiry {{ticket}} for {{crop}} is scheduled.";
      const result = interpolateTemplate(template, {
        name: "Harpreet Singh",
        ticket: "AGA-2026-8003",
        crop: "DSR Rice",
      });
      expect(result).toBe("Hello Harpreet Singh, inquiry AGA-2026-8003 for DSR Rice is scheduled.");
    });

    it("handles missing tokens gracefully", () => {
      const template = "Hello {{name}}, notes: {{notes}}";
      const result = interpolateTemplate(template, { name: "Aman" });
      expect(result).toBe("Hello Aman, notes: ");
    });
  });

  describe("RBAC Permissions", () => {
    it("allows admins to manage settings and edit CMS", () => {
      const user = { permissions: adminPerms };
      expect(canManageSettings(user)).toBe(true);
      expect(canEditCms(user)).toBe(true);
    });

    it("identifies restricted assignees", () => {
      expect(isRestrictedAssignee({ permissions: agronomistPerms })).toBe(true);
      expect(isRestrictedAssignee({ permissions: adminPerms })).toBe(false);
    });
  });

  describe("API Response Type Guards", () => {
    it("correctly identifies ok and error responses", () => {
      expect(isAdminOk({ ok: true, data: 123 })).toBe(true);
      expect(isAdminOk({ ok: false, error: "Failed" })).toBe(false);
      expect(isAdminOk(null)).toBe(false);

      expect(adminError({ ok: false, error: "Custom Error" })).toBe("Custom Error");
      expect(adminError(null, "Default")).toBe("Default");
    });

    it("extracts KPI numbers safely", () => {
      const metrics = { total: 184, converted: 58 };
      expect(kpi(metrics, "total")).toBe(184);
      expect(kpi(metrics, "missing")).toBe(0);
      expect(kpi(undefined, "total")).toBe(0);
    });
  });

  describe("Date Formatters", () => {
    it("formats dates or returns placeholder when empty", () => {
      expect(formatWhen(null)).toBe("—");
      expect(formatDay(null)).toBe("—");
      const d = new Date("2026-08-20T10:00:00Z");
      expect(formatWhen(d)).toBeTruthy();
      expect(formatDay(d)).toBeTruthy();
    });

    it("normalizes values for date inputs", () => {
      expect(toDateInputValue(null)).toBe("");
      expect(toDateInputValue("2026-08-28")).toBe("2026-08-28");
      expect(toDateInputValue("2026-08-28T00:00:00.000Z")).toBe("2026-08-28");
      expect(toDateInputValue(new Date(2026, 7, 28))).toBe("2026-08-28");
    });
  });
});
