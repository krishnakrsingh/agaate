import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localesDir = path.resolve(__dirname, "../src/locales");
const supportedLanguages = ["en", "hi"];

function checkTranslations() {
  let hasErrors = false;

  for (const lang of supportedLanguages) {
    const langDir = path.join(localesDir, lang);
    if (!fs.existsSync(langDir)) {
      console.error(`❌ Locale directory src/locales/${lang} does not exist!`);
      hasErrors = true;
      continue;
    }

    const files = fs.readdirSync(langDir).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      const filePath = path.join(langDir, file);
      try {
        JSON.parse(fs.readFileSync(filePath, "utf8"));
      } catch (e: any) {
        console.error(`❌ Invalid JSON syntax in ${lang}/${file} — ${e.message}`);
        hasErrors = true;
      }
    }
  }

  if (hasErrors) {
    process.exit(1);
  } else {
    console.log("✅ English (en) and Hindi (hi) locale validation passed.");
  }
}

checkTranslations();
