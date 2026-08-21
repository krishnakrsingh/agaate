import { fetchHomeCms } from "@/server/cms-queries";
import { fetchTeamCms } from "@/server/cms-team-queries";
import { getSessionUser } from "@/server/auth";

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
