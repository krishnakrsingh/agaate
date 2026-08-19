import { useSession, getRequestHeader, getRequestUrl } from "@tanstack/react-start/server";
import type { SessionUser } from "@/lib/admin-constants";

export type { SessionUser };

const SESSION_MAX_AGE = 8 * 60 * 60;

function sessionPassword() {
  const raw = process.env.ADMIN_SESSION_SECRET || "dev-agaate-admin-session-secret-key!!";
  return raw.length >= 32 ? raw : `${raw}${"!".repeat(32)}`.slice(0, 48);
}

export function getAdminSessionConfig() {
  return {
    name: "agaate_admin",
    password: sessionPassword(),
    maxAge: SESSION_MAX_AGE,
    cookie: {
      httpOnly: true,
      sameSite: "lax" as const,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    },
  };
}

export async function getSessionManager() {
  return useSession<{ user?: SessionUser }>(getAdminSessionConfig());
}

export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const session = await getSessionManager();
    return session.data?.user ?? null;
  } catch (err) {
    console.warn("getSessionUser failed, returning null:", err);
    return null;
  }
}

export async function requireSessionUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) {
    throw new Error("UNAUTHORIZED");
  }
  return user;
}

export function assertSameOrigin() {
  const origin = getRequestHeader("origin");
  if (!origin) return;
  try {
    const url = getRequestUrl({ xForwardedHost: true, xForwardedProto: true });
    if (origin !== url.origin) {
      throw new Error("CSRF");
    }
  } catch (err) {
    if (err instanceof Error && err.message === "CSRF") throw err;
  }
}
