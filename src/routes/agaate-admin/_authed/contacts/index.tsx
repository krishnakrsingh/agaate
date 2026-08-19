import { createFileRoute } from "@tanstack/react-router";
import { AdminContactsTable } from "@/components/admin/AdminContactsTable";
import { getAdminAssignees, getAdminCategories, listAdminContacts } from "@/functions/admin-contacts";

export const Route = createFileRoute("/agaate-admin/_authed/contacts/")({
  loader: async () => {
    const [list, assignees, categories] = await Promise.all([
      listAdminContacts({ data: { page: 1, pageSize: 20, sort: "created_at", dir: "desc" } }),
      getAdminAssignees(),
      getAdminCategories(),
    ]);
    return { list, assignees, categories };
  },
  component: ContactsPage,
});

function ContactsPage() {
  const { list, assignees, categories } = Route.useLoaderData();
  if (!list || !("ok" in list) || !list.ok) {
    return <p className="text-sm text-rose-300">{list && "error" in list ? list.error : "Unable to load contacts."}</p>;
  }
  return (
    <AdminContactsTable
      initial={{ rows: list.rows, total: list.total, page: list.page, pageSize: list.pageSize }}
      assignees={assignees && "ok" in assignees && assignees.ok ? assignees.users : []}
      categories={categories && "ok" in categories && categories.ok ? categories.categories : []}
      initialFilters={{}}
    />
  );
}
