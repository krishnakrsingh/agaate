import {
  fetchHomeCms,
  fetchKisaanMallLanding,
  fetchKisaanMallPage,
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
  const page = await fetchKisaanMallPage();
  return { ok: true as const, landing, page };
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
