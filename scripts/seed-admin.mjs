/**
 * Seed internal admin users, categories, sample CRM requests, and activity.
 * Usage: npm run seed:admin
 * Requires MYSQL_* and ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD.
 */
import { existsSync, readFileSync } from "node:fs";
import { createConnection } from "mysql2/promise";
import { hash } from "bcryptjs";

function loadEnvFile() {
  for (const file of [".env.local", ".env"]) {
    if (!existsSync(file)) continue;
    for (const raw of readFileSync(file, "utf8").split(/\r?\n/)) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq < 1) continue;
      const key = line.slice(0, eq).trim();
      let value = line.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  }
}

loadEnvFile();

const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const database = process.env.MYSQL_DATABASE;
const seedEmail = (process.env.ADMIN_SEED_EMAIL || "").trim().toLowerCase();
const seedPassword = process.env.ADMIN_SEED_PASSWORD || "";

if (!host || !user || !database) {
  console.error("Set MYSQL_HOST, MYSQL_USER, and MYSQL_DATABASE.");
  process.exit(1);
}
if (!seedEmail || seedPassword.length < 8) {
  console.error("Set ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD (8+ characters).");
  process.exit(1);
}

const demoPassword = process.env.ADMIN_DEMO_PASSWORD || "AgaateDemo!2026";

const TABLE_SQL = [
  `CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(160) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'admin', 'agronomist', 'support') NOT NULL DEFAULT 'support',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS inquiry_categories (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(64) NOT NULL UNIQUE,
    label VARCHAR(160) NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 1,
    sort_order INT NOT NULL DEFAULT 0
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS request_activity (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    request_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NULL,
    action VARCHAR(64) NOT NULL,
    payload JSON NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_activity_request (request_id, created_at)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS request_notes (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    request_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NULL,
    body TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS admin_settings (
    id TINYINT UNSIGNED NOT NULL PRIMARY KEY DEFAULT 1,
    payload JSON NOT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS leads (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ticket_id VARCHAR(32) NOT NULL UNIQUE,
    name VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(160) NULL,
    topic VARCHAR(64) NOT NULL,
    acreage VARCHAR(64) NULL,
    crop VARCHAR(64) NULL,
    district VARCHAR(120) NULL,
    channel VARCHAR(32) NULL,
    message TEXT NULL,
    consent TINYINT(1) NOT NULL DEFAULT 0,
    consent_at DATETIME NULL,
    source_page VARCHAR(255) NULL,
    ip_hash CHAR(64) NULL,
    user_agent VARCHAR(512) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
];

const CRM_COLUMNS = [
  ["status", "VARCHAR(32) NOT NULL DEFAULT 'new'"],
  ["priority", "VARCHAR(16) NOT NULL DEFAULT 'medium'"],
  ["assigned_to", "BIGINT UNSIGNED NULL"],
  ["follow_up_date", "DATE NULL"],
  ["tags", "JSON NULL"],
  ["attachment_url", "VARCHAR(512) NULL"],
  ["preferred_language", "VARCHAR(16) NULL DEFAULT 'en'"],
  ["company_name", "VARCHAR(160) NULL"],
  ["website", "VARCHAR(255) NULL"],
  ["farm_details", "JSON NULL"],
  ["updated_at", "DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"],
];

const CATEGORIES = [
  ["nursery", "Bio-Boosted Nursery Pre-Orders", 1],
  ["bigfarm", "Big Farm Setup (Turnkey)", 2],
  ["carbon", "Carbon Credit Program", 3],
  ["wholesale", "Kisan Mall Wholesale", 4],
  ["agripark", "Agri Park Visit", 5],
  ["general", "General Agronomy Advisory", 6],
];

const STATUSES = [
  "new",
  "assigned",
  "contacted",
  "in_progress",
  "waiting",
  "farm_visit",
  "converted",
  "closed",
  "spam",
];

async function main() {
  const db = await createConnection({
    host,
    port: Number(process.env.MYSQL_PORT || 3306),
    user,
    password: process.env.MYSQL_PASSWORD || "",
    database,
    multipleStatements: true,
  });

  for (const sql of TABLE_SQL) await db.query(sql);

  const [cols] = await db.query(
    `SELECT COLUMN_NAME FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'leads'`,
  );
  const names = new Set(cols.map((r) => r.COLUMN_NAME));
  const alters = CRM_COLUMNS.filter(([name]) => !names.has(name)).map(
    ([name, def]) => `ADD COLUMN ${name} ${def}`,
  );
  if (alters.length) await db.query(`ALTER TABLE leads ${alters.join(", ")}`);

  const superHash = await hash(seedPassword, 10);
  await db.query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES (?, ?, ?, 'super_admin')
     ON DUPLICATE KEY UPDATE name = VALUES(name), password_hash = VALUES(password_hash), role = 'super_admin'`,
    ["Super Admin", seedEmail, superHash],
  );

  const staff = [
    ["Rahul Sharma", "rahul@agaate.in", "admin"],
    ["Aman Verma", "aman@agaate.in", "agronomist"],
    ["Priya Nair", "priya@agaate.in", "support"],
  ];
  const demoHash = await hash(demoPassword, 10);
  for (const [name, email, role] of staff) {
    await db.query(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE name = VALUES(name), role = VALUES(role)`,
      [name, email, demoHash, role],
    );
  }

  for (const [slug, label, sort] of CATEGORIES) {
    await db.query(
      `INSERT INTO inquiry_categories (slug, label, active, sort_order)
       VALUES (?, ?, 1, ?)
       ON DUPLICATE KEY UPDATE label = VALUES(label), sort_order = VALUES(sort_order)`,
      [slug, label, sort],
    );
  }

  const settings = {
    businessHours: { start: "07:30", end: "20:00", days: "Mon–Sat", timezone: "IST" },
    defaultResponseTime: "2 business hours",
    whatsappTemplate:
      "Hello {{name}}, this is the Agaate team regarding your request {{ticket}}. How can we help you today?",
    emailSubject: "Agaate — follow-up on {{ticket}}",
    emailTemplate:
      "Hello {{name}},\n\nThank you for contacting Agaate ({{ticket}}).\n\n{{notes}}\n\nBest regards,\nAgaate Team",
    priorityRules:
      "Mark as Urgent for Big Farm Setup or overdue follow-ups. High for nursery pre-orders over 15 acres.",
  };
  await db.query(
    `INSERT INTO admin_settings (id, payload) VALUES (1, ?)
     ON DUPLICATE KEY UPDATE payload = VALUES(payload)`,
    [JSON.stringify(settings)],
  );

  const [userRows] = await db.query(`SELECT id, email FROM users`);
  const byEmail = Object.fromEntries(userRows.map((r) => [r.email, r.id]));
  const rahul = byEmail["rahul@agaate.in"];
  const aman = byEmail["aman@agaate.in"];
  const priya = byEmail["priya@agaate.in"];

  const samples = [
    [
      "Ramesh Patel",
      "9876500001",
      "nursery",
      "15-50 Commercial Acres",
      "Chilli",
      "Varanasi",
      "new",
      "high",
      null,
    ],
    [
      "Sunita Devi",
      "9876500002",
      "bigfarm",
      "50+ Institutional Farm",
      "Tomato",
      "Nashik",
      "assigned",
      "urgent",
      rahul,
    ],
    [
      "Harpreet Singh",
      "9876500003",
      "carbon",
      "5-15 Acres",
      "Wheat",
      "Ludhiana",
      "contacted",
      "medium",
      aman,
    ],
    [
      "Meena Joshi",
      "9876500004",
      "wholesale",
      "1-5 Acres",
      "Onion",
      "Nashik",
      "in_progress",
      "medium",
      priya,
    ],
    [
      "Arjun Reddy",
      "9876500005",
      "agripark",
      "5-15 Acres",
      "Watermelon",
      "Kurnool",
      "waiting",
      "low",
      priya,
    ],
    [
      "Fatima Khan",
      "9876500006",
      "general",
      "1-5 Acres",
      "Paddy",
      "Guntur",
      "farm_visit",
      "high",
      aman,
    ],
    [
      "Vikram Chauhan",
      "9876500007",
      "nursery",
      "5-15 Acres",
      "Capsicum",
      "Gurugram",
      "converted",
      "medium",
      rahul,
    ],
    [
      "Lakshmi Iyer",
      "9876500008",
      "bigfarm",
      "15-50 Commercial Acres",
      "Grapes",
      "Sangli",
      "closed",
      "low",
      rahul,
    ],
    [
      "Imran Sheikh",
      "9876500009",
      "carbon",
      "15-50 Commercial Acres",
      "Sugarcane",
      "Kolhapur",
      "spam",
      "low",
      null,
    ],
    [
      "Pooja Desai",
      "9876500010",
      "wholesale",
      "5-15 Acres",
      "Cotton",
      "Rajkot",
      "new",
      "high",
      null,
    ],
    [
      "Sanjay Yadav",
      "9876500011",
      "nursery",
      "1-5 Acres",
      "Tomato",
      "Jaipur",
      "assigned",
      "medium",
      aman,
    ],
    [
      "Anita Kulkarni",
      "9876500012",
      "general",
      "5-15 Acres",
      "Soybean",
      "Indore",
      "contacted",
      "medium",
      priya,
    ],
    [
      "Rohit Nair",
      "9876500013",
      "agripark",
      "1-5 Acres",
      "Chilli",
      "Thrissur",
      "in_progress",
      "low",
      rahul,
    ],
    [
      "Geeta Kumari",
      "9876500014",
      "bigfarm",
      "50+ Institutional Farm",
      "Banana",
      "Theni",
      "waiting",
      "urgent",
      aman,
    ],
    [
      "Naveen Rao",
      "9876500015",
      "carbon",
      "5-15 Acres",
      "Maize",
      "Warangal",
      "farm_visit",
      "high",
      priya,
    ],
    [
      "Kiran Bhat",
      "9876500016",
      "wholesale",
      "15-50 Commercial Acres",
      "Potato",
      "Shimla",
      "converted",
      "medium",
      rahul,
    ],
    [
      "Deepa Menon",
      "9876500017",
      "nursery",
      "5-15 Acres",
      "Brinjal",
      "Palakkad",
      "new",
      "medium",
      null,
    ],
    [
      "Ajay Thakur",
      "9876500018",
      "general",
      "1-5 Acres",
      "Mustard",
      "Hisar",
      "closed",
      "low",
      priya,
    ],
  ];

  const year = new Date().getFullYear();
  for (let i = 0; i < samples.length; i++) {
    const [name, phone, topic, acreage, crop, district, status, priority, assigned] = samples[i];
    const ticket = `AGA-${year}-${String(8000 + i).padStart(4, "0")}`;
    const daysAgo = samples.length - i;
    const follow =
      status === "waiting" || status === "farm_visit" || status === "assigned"
        ? `DATE_SUB(CURDATE(), INTERVAL ${status === "assigned" ? -1 : 2} DAY)`
        : "NULL";
    const farm = JSON.stringify({ acreage, crop, district });
    const [result] = await db.query(
      `INSERT INTO leads
        (ticket_id, name, phone, email, topic, acreage, crop, district, channel, message, consent, consent_at,
         source_page, status, priority, assigned_to, follow_up_date, farm_details, preferred_language, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'WhatsApp', ?, 1, NOW(), '/contact', ?, ?, ?, ${follow}, ?, 'en',
               DATE_SUB(NOW(), INTERVAL ? DAY))
       ON DUPLICATE KEY UPDATE status = VALUES(status), priority = VALUES(priority), assigned_to = VALUES(assigned_to)`,
      [
        ticket,
        name,
        phone,
        `${name.split(" ")[0].toLowerCase()}@example.in`,
        topic,
        acreage,
        crop,
        district,
        `Interested in ${topic} support for ${crop} in ${district}.`,
        status,
        priority,
        assigned,
        farm,
        daysAgo,
      ],
    );
    const insertId =
      result.insertId ||
      (await db.query(`SELECT id FROM leads WHERE ticket_id = ?`, [ticket]))[0][0]?.id;
    if (insertId) {
      await db.query(
        `INSERT INTO request_activity (request_id, user_id, action, payload, created_at)
         VALUES (?, NULL, 'request_created', ?, DATE_SUB(NOW(), INTERVAL ? DAY))`,
        [insertId, JSON.stringify({ ticket_id: ticket }), daysAgo],
      );
      if (assigned) {
        await db.query(
          `INSERT INTO request_activity (request_id, user_id, action, payload)
           VALUES (?, ?, 'assigned', ?)`,
          [insertId, assigned, JSON.stringify({ toId: assigned })],
        );
        await db.query(
          `INSERT INTO request_notes (request_id, user_id, body)
           VALUES (?, ?, ?)`,
          [
            insertId,
            assigned,
            "Seeded follow-up note: farmer prefers a WhatsApp callback after 6pm.",
          ],
        );
      }
    }
  }

  await db.end();
  console.log("Admin seed complete.");
  console.log(`Super Admin: ${seedEmail}`);
  console.log(`Demo staff (Rahul / Aman / Priya) password: ${demoPassword}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
