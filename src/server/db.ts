import type { Pool } from "mysql2/promise";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

let pool: Pool | null = null;
let envLoaded = false;

function loadEnvFile() {
  if (envLoaded) return;
  envLoaded = true;
  for (const file of [".env.local", ".env"]) {
    const envPath = resolve(process.cwd(), file);
    if (!existsSync(envPath)) continue;
    for (const raw of readFileSync(envPath, "utf8").split(/\r?\n/)) {
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

export function isDbConfigured() {
  loadEnvFile();
  return Boolean(process.env.MYSQL_HOST && process.env.MYSQL_USER && process.env.MYSQL_DATABASE);
}

export async function getDbPool(): Promise<Pool> {
  loadEnvFile();
  if (!isDbConfigured()) {
    throw new Error("MySQL is not configured. Set MYSQL_* environment variables.");
  }
  if (!pool) {
    const mysql = await import("mysql2/promise");
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT || 3306),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD || "",
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 5,
      namedPlaceholders: true,
    });
  }
  return pool;
}
