import {
  analyticsReport,
  countCareerApplications,
  countNewsletterSignups,
  ensureAdminSchema,
  getSettings,
  listContacts,
} from "@/server/admin-queries";
import { requireSessionUser } from "@/server/auth";
import { isDbConfigured } from "@/server/db";

function failAuth(err: unknown) {
  const message = err instanceof Error ? err.message : "Error";
  if (message === "UNAUTHORIZED") return { ok: false as const, error: "Please sign in." };
  if (message === "FORBIDDEN") return { ok: false as const, error: "You do not have permission." };
  if (message === "CSRF") return { ok: false as const, error: "Request blocked." };
  throw err;
}

const EMPTY_ANALYTICS = {
  windows: { daily: 0, weekly: 0, monthly: 0 },
  kpis: {
    total: 0,
    newToday: 0,
    pendingFollowUps: 0,
    assigned: 0,
    converted: 0,
    closed: 0,
    unreadNew: 0,
    dueToday: 0,
    overdue: 0,
  },
  charts: {
    byDay: [] as Array<{ day: string; count: number }>,
    byCategory: [] as Array<{ name: string; count: number }>,
    byStatus: [] as Array<{ name: string; count: number }>,
    monthly: [] as Array<{ month: string; count: number; converted: number }>,
    team: [] as Array<{ name: string; count: number }>,
    conversionRate: 0,
  },
};

function smtpReadyFromSettings(settings: {
  smtp: { host?: string; user?: string; pass?: string };
}) {
  return Boolean(settings.smtp.host && settings.smtp.user && settings.smtp.pass);
}

export async function handleGetAdminDashboard() {
  try {
    const user = await requireSessionUser();

    if (!isDbConfigured()) {
      return {
        ok: true as const,
        analytics: EMPTY_ANALYTICS,
        operations: {
          pendingFarmVisits: 0,
          careerApplications: 0,
          newsletterWaitlist: 0,
        },
        smtpReady: false,
        dbConfigured: false,
      };
    }

    await ensureAdminSchema();

    const [analytics, pendingResult, careerApplications, newsletterWaitlist, settings] =
      await Promise.all([
        analyticsReport(user),
        listContacts(user, {
          inquiryType: "agripark",
          status: "new",
          page: 1,
          pageSize: 1,
        }),
        countCareerApplications(),
        countNewsletterSignups("/kisaan-mall"),
        getSettings(),
      ]);

    return {
      ok: true as const,
      analytics,
      operations: {
        pendingFarmVisits: pendingResult.total,
        careerApplications,
        newsletterWaitlist,
      },
      smtpReady: smtpReadyFromSettings(settings),
      dbConfigured: true,
    };
  } catch (err) {
    return failAuth(err);
  }
}
