import { describe, it, expect } from "vitest";
import { cn } from "../utils";

describe("Utility Helpers (cn)", () => {
  it("should merge basic class names correctly", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("should handle conditional and falsy class names", () => {
    expect(cn("font-bold", false && "text-red-500", null, undefined, "text-sm")).toBe(
      "font-bold text-sm",
    );
  });

  it("should resolve Tailwind class conflicts with last wins precedence", () => {
    expect(cn("bg-red-500", "bg-green-500")).toBe("bg-green-500");
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
