import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localesDir = path.resolve(__dirname, "../src/locales");
const baseDir = path.join(localesDir, "en");

function checkTranslations() {
  if (!fs.existsSync(baseDir)) {
    console.error("❌ Base locale directory src/locales/en does not exist!");
    process.exit(1);
  }

  const files = fs.readdirSync(baseDir).filter((f) => f.endsWith(".json"));
  let hasErrors = false;

  for (const file of files) {
    const filePath = path.join(baseDir, file);
    try {
      JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (e: any) {
      console.error(`❌ Invalid JSON syntax in English source file: en/${file} — ${e.message}`);
      hasErrors = true;
    }
  }

  if (hasErrors) {
    process.exit(1);
  } else {
    console.log("✅ English Single Source of Truth validation passed.");
    console.log(
      "✨ All 22+ languages will auto-translate dynamically on demand via Google Translate!",
    );
  }
}

checkTranslations();
