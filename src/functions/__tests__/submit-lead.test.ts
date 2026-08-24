import { describe, it, expect } from "vitest";
import { leadInputSchema, normalizePhoneNumber, isValidIndianPhoneNumber } from "../lead-types";
import { checkRateLimit, generateTicketId, hashIp } from "../submit-lead.server";

describe("Lead Submission & Validation Engine", () => {
  describe("Phone Number Normalization & Validation", () => {
    it("should normalize +91 and 91 prefixes to 10 digits", () => {
      expect(normalizePhoneNumber("+919876543210")).toBe("9876543210");
      expect(normalizePhoneNumber("919876543210")).toBe("9876543210");
    });

    it("should normalize leading zero to 10 digits", () => {
      expect(normalizePhoneNumber("09876543210")).toBe("9876543210");
    });

    it("should strip formatting spaces and hyphens", () => {
      expect(normalizePhoneNumber("98765-43210")).toBe("9876543210");
      expect(normalizePhoneNumber("98765 43210")).toBe("9876543210");
    });

    it("should validate valid Indian mobile numbers starting with 6, 7, 8, 9", () => {
      expect(isValidIndianPhoneNumber("9876543210")).toBe(true);
      expect(isValidIndianPhoneNumber("8123456789")).toBe(true);
      expect(isValidIndianPhoneNumber("7000000000")).toBe(true);
      expect(isValidIndianPhoneNumber("6200000000")).toBe(true);
    });

    it("should reject invalid mobile numbers starting with 0-5 or wrong length", () => {
      expect(isValidIndianPhoneNumber("1234567890")).toBe(false);
      expect(isValidIndianPhoneNumber("5555555555")).toBe(false);
      expect(isValidIndianPhoneNumber("98765")).toBe(false);
    });
  });

  describe("Zod Lead Schema Validation", () => {
    const validLead = {
      name: "Ramesh Patel",
      phone: "9876543210",
      email: "ramesh@example.com",
      topic: "Bio-Nursery Seedlings",
      acreage: "15 Acres",
      crop: "Chilli & Tomato",
      district: "Varanasi",
      channel: "WhatsApp",
      message: "Interested in high yield saplings.",
      consent: true,
      clientToken: "test-token-12345678",
      startedAt: Date.now() - 5000,
    };

    it("should parse and validate a complete valid lead", () => {
      const result = leadInputSchema.safeParse(validLead);
      expect(result.success).toBe(true);
    });

    it("should reject submission without mandatory consent", () => {
      const invalid = { ...validLead, consent: false };
      const result = leadInputSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it("should reject too short name", () => {
      const invalid = { ...validLead, name: "A" };
      const result = leadInputSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it("should reject malformed email if provided", () => {
      const invalid = { ...validLead, email: "invalid-email" };
      const result = leadInputSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it("should allow empty or omitted email", () => {
      const noEmail = { ...validLead, email: "" };
      const result = leadInputSchema.safeParse(noEmail);
      expect(result.success).toBe(true);
    });
  });

  describe("Server Utilities & Security", () => {
    it("should generate ticket IDs in format AGA-2026-XXXX", () => {
      const ticket = generateTicketId();
      expect(ticket).toMatch(/^AGA-2026-\d{4}$/);
    });

    it("should consistently hash IP addresses with SHA-256", () => {
      const hash1 = hashIp("192.168.1.1");
      const hash2 = hashIp("192.168.1.1");
      expect(hash1).toBe(hash2);
      expect(hash1).toHaveLength(64);
    });

    it("should enforce sliding window rate limit", () => {
      const testKey = `test-ip-${Date.now()}-${Math.random()}`;
      // Allow 3 requests
      expect(checkRateLimit(testKey, 3)).toBe(true);
      expect(checkRateLimit(testKey, 3)).toBe(true);
      expect(checkRateLimit(testKey, 3)).toBe(true);
      // 4th request should be blocked
      expect(checkRateLimit(testKey, 3)).toBe(false);
    });
  });

  describe("Consultation Topics & Franchise Configuration", () => {
    it("should include franchise partnership as 7th topic option in contact data", async () => {
      const { CONSULTATION_TOPICS } = await import("@/components/contact/data");
      expect(CONSULTATION_TOPICS).toHaveLength(7);
      const franchise = CONSULTATION_TOPICS.find((t) => t.id === "franchise");
      expect(franchise).toBeDefined();
      expect(franchise?.label).toContain("Franchise");
    });

    it("should include franchise topic in contact page fallback configuration", async () => {
      const { CONTACT_PAGE_FALLBACK } = await import("@/data/contact-page-fallback");
      expect(CONTACT_PAGE_FALLBACK.consultationTopics).toHaveLength(7);
      const franchise = CONTACT_PAGE_FALLBACK.consultationTopics.find((t) => t.id === "franchise");
      expect(franchise).toBeDefined();
      expect(franchise?.labelEn).toContain("Franchise");
      expect(franchise?.labelHi).toBeDefined();
    });
  });
});
