/**
 * Creates CMS tables and seeds homepage + team content when empty.
 * Usage:
 *   npm run seed:cms
 *   npm run seed:cms:force   # re-seed team members from defaults
 */
import { ensureCmsSchema } from "../src/server/cms-queries";
import { seedTeamMembers } from "../src/server/cms-team-queries";
import { getDbPool, isDbConfigured } from "../src/server/db";

async function countTable(table: string) {
  const db = await getDbPool();
  const [rows] = await db.query(`SELECT COUNT(*) AS c FROM ${table}`);
  return Number((rows as Array<{ c: number }>)[0]?.c ?? 0);
}

async function main() {
  const force = process.argv.includes("--force") || process.argv.includes("--force-team");

  if (!isDbConfigured()) {
    console.error("Set MYSQL_HOST, MYSQL_USER, and MYSQL_DATABASE in .env");
    process.exit(1);
  }

  console.log(`Database: ${process.env.MYSQL_DATABASE} @ ${process.env.MYSQL_HOST}`);

  await ensureCmsSchema();
  const stats = await countTable("cms_stats");
  const logos = await countTable("cms_brand_logos");
  const stories = await countTable("cms_farmer_stories");
  console.log(`Homepage CMS — stats: ${stats}, logos: ${logos}, stories: ${stories}`);

  const teamBefore = await countTable("cms_team_members").catch(() => 0);
  const teamResult = await seedTeamMembers({ force });
  const teamAfter = teamResult.after;

  if (teamResult.skipped) {
    console.log(
      `Team members — ${teamAfter} already in database (skipped). Run npm run seed:cms:force to replace.`,
    );
  } else {
    console.log(`Team members — ${teamBefore} → ${teamAfter} (${teamResult.inserted} inserted)`);
  }

  console.log("CMS seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
