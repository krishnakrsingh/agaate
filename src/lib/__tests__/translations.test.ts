import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

function getAllKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  let keys: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      keys = keys.concat(getAllKeys(v as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

describe("i18n Translation Integrity", () => {
  const localesDir = path.resolve(__dirname, "../../locales");
  const enDir = path.join(localesDir, "en");
  const hiDir = path.join(localesDir, "hi");

  it("should have both en and hi locale directories", () => {
    expect(fs.existsSync(enDir)).toBe(true);
    expect(fs.existsSync(hiDir)).toBe(true);
  });

  const enFiles = fs.readdirSync(enDir).filter((f) => f.endsWith(".json"));

  it("should have corresponding files for all English locale modules in Hindi", () => {
    const hiFiles = fs.readdirSync(hiDir).filter((f) => f.endsWith(".json"));
    expect(enFiles.sort()).toEqual(hiFiles.sort());
  });

  for (const file of enFiles) {
    it(`should have valid JSON and matching keys for ${file}`, () => {
      const enRaw = fs.readFileSync(path.join(enDir, file), "utf8");
      const hiRaw = fs.readFileSync(path.join(hiDir, file), "utf8");

      const enJson = JSON.parse(enRaw);
      const hiJson = JSON.parse(hiRaw);

      const enKeys = getAllKeys(enJson).sort();
      const hiKeys = getAllKeys(hiJson).sort();

      expect(hiKeys).toEqual(enKeys);
    });
  }
});
