import type { Pool } from "mysql2/promise";

let pool: Pool | null = null;

export function isDbConfigured() {
  return Boolean(
    process.env.MYSQL_HOST && process.env.MYSQL_USER && process.env.MYSQL_DATABASE,
  );
}

export async function getDbPool(): Promise<Pool> {
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
