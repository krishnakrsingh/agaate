import { createFileRoute, notFound } from "@tanstack/react-router";
import { AdminContactDetail } from "@/components/admin/AdminContactDetail";
import { getAdminAssignees, getAdminContact } from "@/functions/admin-contacts";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { DEFAULT_ADMIN_SETTINGS } from "@/lib/admin-constants";

export const Route = createFileRoute("/agaate-admin/_authed/contacts/$id")({
  loader: async ({ params }) => {
    const id = Number(params.id);
    if (!Number.isFinite(id)) throw notFound();
    const [detail, assignees] = await Promise.all([getAdminContact({ data: { id } }), getAdminAssignees()]);
    return { detail, assignees };
  },
  component: ContactDetailPage,
});

type ContactDetail = {
  contact: Parameters<typeof AdminContactDetail>[0]["initial"]["contact"];
  activity: Parameters<typeof AdminContactDetail>[0]["initial"]["activity"];
  notes: Parameters<typeof AdminContactDetail>[0]["initial"]["notes"];
  settings: Parameters<typeof AdminContactDetail>[0]["initial"]["settings"];
};

function ContactDetailPage() {
  const { detail, assignees } = Route.useLoaderData();
  if (!isAdminOk<ContactDetail>(detail)) {
    return <p className="text-sm text-rose-300">{adminError(detail, "Request not found.")}</p>;
  }
  const settings = detail.settings ?? DEFAULT_ADMIN_SETTINGS;
  return (
    <AdminContactDetail
      initial={{
        contact: detail.contact,
        activity: detail.activity,
        notes: detail.notes,
        settings,
      }}
      assignees={isAdminOk<{ users: Array<{ id: number; name: string }> }>(assignees) ? assignees.users : []}
      settings={settings}
    />
  );
}
