export type AdminOk<T> = { ok: true } & T;
export type AdminErr = { ok: false; error: string };

export function isAdminOk<T extends Record<string, unknown>>(
  value: unknown,
): value is AdminOk<T> {
  return typeof value === "object" && value !== null && "ok" in value && (value as AdminOk<T>).ok === true;
}

export function adminError(value: unknown, fallback = "Request failed.") {
  if (typeof value === "object" && value !== null && "error" in value) {
    const err = (value as AdminErr).error;
    return typeof err === "string" ? err : fallback;
  }
  return fallback;
}

export function kpi(value: Record<string, number> | undefined, key: string) {
  return Number(value?.[key] ?? 0);
}
