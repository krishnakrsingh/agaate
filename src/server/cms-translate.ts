/** Translate English text to Hindi via MyMemory (free tier, server-side). */
export async function translateTextsEnToHi(texts: string[]): Promise<string[]> {
  const results: string[] = [];

  for (const text of texts) {
    const trimmed = text.trim();
    if (!trimmed) {
      results.push("");
      continue;
    }

    try {
      const url = new URL("https://api.mymemory.translated.net/get");
      url.searchParams.set("q", trimmed);
      url.searchParams.set("langpair", "en|hi");

      const res = await fetch(url.toString(), {
        headers: { "User-Agent": "Agaate-CMS/1.0" },
      });

      if (!res.ok) {
        results.push(trimmed);
        continue;
      }

      const json = (await res.json()) as {
        responseData?: { translatedText?: string };
      };
      const translated = json.responseData?.translatedText?.trim();
      results.push(translated && translated !== trimmed ? translated : trimmed);
    } catch {
      results.push(trimmed);
    }

    // Stay within free API rate limits
    await new Promise((r) => setTimeout(r, 250));
  }

  return results;
}
