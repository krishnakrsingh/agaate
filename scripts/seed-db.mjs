/**
 * Creates the agaate database (if needed), leads table, and optional sample rows.
 * Usage: node scripts/seed-db.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnv() {
  const envPath = resolve(root, ".env");
  const out = { ...process.env };
  if (!existsSync(envPath)) return out;
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    out[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return out;
}

const env = loadEnv();
const host = env.MYSQL_HOST || "127.0.0.1";
const port = Number(env.MYSQL_PORT || 3306);
const user = env.MYSQL_USER || "agaate";
const password = env.MYSQL_PASSWORD || "";
const database = env.MYSQL_DATABASE || "agaate";

const schemaSql = readFileSync(resolve(root, "sql/leads.sql"), "utf8");

async function connect(creds) {
  return mysql.createConnection({
    host: creds.host,
    port: creds.port,
    user: creds.user,
    password: creds.password,
    multipleStatements: true,
  });
}

async function main() {
  const attempts = [
    { host, port, user, password, label: `${user}@${host}` },
    { host, port, user: "root", password: "", label: `root@${host}` },
    { host: "127.0.0.1", port, user: "root", password: "", label: "root@127.0.0.1" },
  ];

  let conn = null;
  let used = null;
  for (const a of attempts) {
    try {
      conn = await connect(a);
      used = a;
      console.log(`Connected as ${a.label}`);
      break;
    } catch (err) {
      console.warn(`Could not connect as ${a.label}: ${err.message}`);
    }
  }

  if (!conn) {
    console.error(
      "\nFailed to connect to MySQL. Start MySQL locally, then either:\n" +
        "  - create user/db matching .env, or\n" +
        "  - set MYSQL_USER/MYSQL_PASSWORD in .env to a working account\n",
    );
    process.exit(1);
  }

  try {
    await conn.query(
      `CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    console.log(`Database ready: ${database}`);

    // Ensure app user can access DB when we connected as root
    if (used.user === "root" && user !== "root") {
      try {
        await conn.query(
          `CREATE USER IF NOT EXISTS ?@'localhost' IDENTIFIED BY ?`,
          [user, password],
        );
      } catch {
        // Older MySQL may not support IF NOT EXISTS for USER
        try {
          await conn.query(
            `CREATE USER ?@'localhost' IDENTIFIED BY ?`,
            [user, password],
          );
        } catch (e) {
          if (!String(e.message).includes("exists")) {
            console.warn(`User create skipped: ${e.message}`);
          }
        }
      }
      try {
        await conn.query(
          `CREATE USER IF NOT EXISTS ?@'%' IDENTIFIED BY ?`,
          [user, password],
        );
      } catch {
        // ignore
      }
      await conn.query(
        `GRANT ALL PRIVILEGES ON \`${database}\`.* TO ?@'localhost'`,
        [user],
      );
      try {
        await conn.query(
          `GRANT ALL PRIVILEGES ON \`${database}\`.* TO ?@'%'`,
          [user],
        );
      } catch {
        // ignore
      }
      await conn.query("FLUSH PRIVILEGES");
      console.log(`Granted ${user} access to ${database}`);
    }

    await conn.query(`USE \`${database}\``);
    await conn.query(schemaSql);
    console.log("Table ready: leads");

    const [existing] = await conn.query("SELECT COUNT(*) AS c FROM leads");
    const count = Number(existing[0]?.c || 0);

    if (count === 0) {
      await conn.query(
        `INSERT INTO leads
          (ticket_id, name, phone, email, topic, acreage, crop, district, channel, message,
           consent, consent_at, source_page, ip_hash, user_agent)
         VALUES
          ('AGA-2026-1001', 'Ramesh Kumar', '9812345678', 'ramesh@example.com', 'nursery',
           '1-5 Acres', 'Watermelon', 'Gurugram', 'WhatsApp',
           'Need Bio-Boosted chilli and watermelon saplings for next season.',
           1, NOW(), '/contact', NULL, 'seed'),
          ('AGA-2026-1002', 'Suresh Yadav', '9876501234', NULL, 'bigfarm',
           '15-50 Commercial Acres', 'Tomato', 'Rewari', 'Phone Call',
           'Interested in turnkey drip + fertigation setup on 20 acres.',
           1, NOW(), '/contact', NULL, 'seed')`,
      );
      console.log("Seeded 2 sample leads");
    } else {
      console.log(`leads already has ${count} row(s) — skipped sample insert`);
    }

    const [rows] = await conn.query(
      "SELECT ticket_id, name, topic, phone, created_at FROM leads ORDER BY id DESC LIMIT 5",
    );
    console.log("\nRecent leads:");
    console.table(rows);
    console.log("\nDB seed complete.");
  } finally {
    await conn.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
