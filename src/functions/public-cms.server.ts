import {
  fetchHomeCms,
  fetchKisaanMallLanding,
  fetchAgriParkChapter,
  fetchHomepageChapters,
  fetchCareersPage,
  fetchSiteContact,
  fetchAboutPage,
  fetchContactPage,
} from "@/server/cms-queries";
import { fetchTeamCms } from "@/server/cms-team-queries";
import { listPublishedCareerJobs } from "@/server/cms-careers-queries";
import { getSessionUser } from "@/server/auth";
import { getSettings } from "@/server/admin-queries";
import { isDbConfigured } from "@/server/db";
import { normalizeGoogleAnalyticsId } from "@/lib/analytics";

export async function handleGetSiteContact() {
  const contact = await fetchSiteContact();
  return { ok: true as const, contact };
}

export async function handleGetAboutPage() {
  const content = await fetchAboutPage();
  return { ok: true as const, content };
}

export async function handleGetContactPage() {
  const content = await fetchContactPage();
  return { ok: true as const, content };
}

export async function handleGetCareersPage(lang: "en" | "hi" = "en") {
  const content = await fetchCareersPage();
  const jobsEn = await listPublishedCareerJobs("en");
  const jobsHi = await listPublishedCareerJobs("hi");
  const jobs = lang === "hi" ? jobsHi : jobsEn;
  return { ok: true as const, content, jobs, jobsEn, jobsHi };
}

export async function handleGetKisaanMallPage() {
  const landing = await fetchKisaanMallLanding();
  return { ok: true as const, landing };
}

export async function handleGetAgriParkChapter() {
  const chapter = await fetchAgriParkChapter();
  return { ok: true as const, chapter };
}

export async function handleGetHomepageChapters() {
  const chapters = await fetchHomepageChapters();
  return { ok: true as const, chapters };
}

export async function handleGetHomeCms(preview: boolean) {
  let usePreview = false;
  if (preview) {
    const user = await getSessionUser();
    usePreview = Boolean(user);
  }
  const data = await fetchHomeCms(usePreview);
  return { ok: true as const, data, preview: usePreview };
}

export async function handleGetTeamCms(preview: boolean) {
  let usePreview = false;
  if (preview) {
    const user = await getSessionUser();
    usePreview = Boolean(user);
  }
  const data = await fetchTeamCms(usePreview);
  return { ok: true as const, data, preview: usePreview };
}

export async function handleGetPublicAnalytics() {
  if (!isDbConfigured()) {
    return { ok: true as const, googleAnalyticsId: null as string | null };
  }
  try {
    const settings = await getSettings();
    if (!settings.analytics?.enabled) {
      return { ok: true as const, googleAnalyticsId: null };
    }
    const id = normalizeGoogleAnalyticsId(settings.analytics.googleAnalyticsId ?? "");
    return { ok: true as const, googleAnalyticsId: id || null };
  } catch {
    return { ok: true as const, googleAnalyticsId: null };
  }
}
