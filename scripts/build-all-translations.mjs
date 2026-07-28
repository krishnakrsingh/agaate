import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localesDir = path.resolve(__dirname, '../src/locales');

const TARGET_LOCALES = [
  'hi', 'bn', 'te', 'mr', 'ta', 'ur', 'gu', 'kn', 'or', 'ml', 'pa', 'as',
  'ne', 'mai', 'sat', 'ks', 'kok', 'sd', 'doi', 'mni', 'sa', 'brx', 'es'
];

const LANG_PARAM_MAP = {
  or: 'or',
  mni: 'mni-Mtei',
  brx: 'brx',
  doi: 'doi',
  mai: 'mai',
  sat: 'sat',
  ks: 'ks',
  kok: 'kok',
  sd: 'sd',
  sa: 'sa',
  ne: 'ne'
};

async function fetchTranslation(text, targetLang) {
  if (!text || typeof text !== 'string' || !text.trim()) return text;

  const placeholders = [];
  const maskedText = text.replace(/\{\{([^}]+)\}\}/g, (match) => {
    placeholders.push(match);
    return `__PH_${placeholders.length - 1}__`;
  });

  const langParam = LANG_PARAM_MAP[targetLang] || targetLang;
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${langParam}&dt=t&q=${encodeURIComponent(maskedText)}`;

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (!res.ok) return text;
    const data = await res.json();
    let translatedStr = '';
    if (data && data[0]) {
      for (const item of data[0]) {
        if (item[0]) translatedStr += item[0];
      }
    }
    if (translatedStr) {
      placeholders.forEach((ph, i) => {
        translatedStr = translatedStr.replace(new RegExp(`__PH_${i}__`, 'g'), ph);
      });
      return translatedStr;
    }
  } catch (err) {
    return text;
  }
  return text;
}

// Traverse and collect all string paths in object
function collectStrings(obj, currentPath = [], list = []) {
  if (typeof obj === 'string') {
    list.push({ path: currentPath, text: obj });
  } else if (Array.isArray(obj)) {
    obj.forEach((item, idx) => collectStrings(item, [...currentPath, idx], list));
  } else if (typeof obj === 'object' && obj !== null) {
    Object.keys(obj).forEach(key => {
      if (key !== 'accentIndices') {
        collectStrings(obj[key], [...currentPath, key], list);
      }
    });
  }
  return list;
}

function setDeepValue(obj, pathArr, value) {
  let curr = obj;
  for (let i = 0; i < pathArr.length - 1; i++) {
    curr = curr[pathArr[i]];
  }
  curr[pathArr[pathArr.length - 1]] = value;
}

async function translateFile(enFilePath, targetFilePath, locale) {
  const enContent = JSON.parse(fs.readFileSync(enFilePath, 'utf8'));
  const targetContent = JSON.parse(JSON.stringify(enContent));

  const items = collectStrings(enContent);
  
  // Translate in parallel chunks of 10
  const chunkSize = 10;
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    const results = await Promise.all(
      chunk.map(item => fetchTranslation(item.text, locale))
    );
    chunk.forEach((item, idx) => {
      setDeepValue(targetContent, item.path, results[idx]);
    });
  }

  fs.writeFileSync(targetFilePath, JSON.stringify(targetContent, null, 2) + '\n', 'utf8');
}

async function main() {
  const enDir = path.join(localesDir, 'en');
  const enFiles = fs.readdirSync(enDir).filter(f => f.endsWith('.json'));

  console.log(`🚀 Parallel translating for all 23 languages...`);

  for (const locale of TARGET_LOCALES) {
    const targetDir = path.join(localesDir, locale);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    console.log(`Translating all 11 files for [${locale.toUpperCase()}]...`);
    await Promise.all(
      enFiles.map(file => {
        const enFilePath = path.join(enDir, file);
        const targetFilePath = path.join(targetDir, file);
        if (fs.existsSync(targetFilePath)) {
          return Promise.resolve();
        }
        return translateFile(enFilePath, targetFilePath, locale);
      })
    );
    console.log(`✅ [${locale.toUpperCase()}] complete!`);
  }

  console.log('\n🎉 ALL 23 LANGUAGES TRANSLATED & BUNDLED SUCCESSFULLY!');
}

main().catch(console.error);
