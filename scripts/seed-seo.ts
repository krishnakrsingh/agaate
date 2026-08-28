/**
 * Creates SEO tables and seeds global settings + per-page metadata when empty.
 * Usage:
 *   npm run seed:seo
 *   npm run seed:seo -- --force   # re-seed page metadata from registry defaults
 */
import { isDbConfigured } from "../src/server/db";
import {
  ensureSeoSchema,
  fetchSeoGlobalSettings,
  listSeoMetadata,
  listSeoRedirects,
  seedSeoDefaults,
} from "../src/server/seo-queries";

async function main() {
  const force = process.argv.includes("--force");

  if (!isDbConfigured()) {
    console.error("Set MYSQL_HOST, MYSQL_USER, and MYSQL_DATABASE in .env");
    process.exit(1);
  }

  console.log(`Database: ${process.env.MYSQL_DATABASE} @ ${process.env.MYSQL_HOST}`);

  await ensureSeoSchema();
  console.log("Tables ready: seo_global_settings, seo_metadata, seo_redirects");

  const beforeMeta = (await listSeoMetadata()).length;
  const beforeRedirects = (await listSeoRedirects()).length;

  const result = await seedSeoDefaults({ force });
  const global = await fetchSeoGlobalSettings();
  const afterMeta = (await listSeoMetadata()).length;

  console.log(`Global SEO settings — website: ${global.websiteUrl}`);
  if (result.pagesInserted > 0) {
    console.log(
      `Page metadata — ${beforeMeta} → ${afterMeta} (${result.pagesInserted} inserted${force ? ", forced" : ""})`,
    );
  } else {
    console.log(
      `Page metadata — ${afterMeta} row(s) (${result.pagesSkipped} skipped, already seeded). Run npm run seed:seo -- --force to replace.`,
    );
  }
  console.log(`Redirects — ${beforeRedirects} row(s)`);
  console.log("SEO seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
