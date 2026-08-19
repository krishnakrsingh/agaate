import { createServerFn } from "@tanstack/react-start";
import type { ContactFilters } from "@/server/admin-queries";
import type { RequestPriority, RequestStatus } from "@/lib/admin-constants";

export const listAdminContacts = createServerFn({ method: "GET" })
  .validator((data: ContactFilters | undefined) => data ?? {})
  .handler(async ({ data }) => {
    const mod = await import("./admin-contacts.server");
    return mod.handleListContacts(data);
  });

export const exportAdminContacts = createServerFn({ method: "GET" })
  .validator((data: ContactFilters | undefined) => data ?? {})
  .handler(async ({ data }) => {
    const mod = await import("./admin-contacts.server");
    return mod.handleListContacts({ ...data, export: true, page: 1, pageSize: 2000 });
  });

export const getAdminContact = createServerFn({ method: "GET" })
  .validator((data: { id: number }) => data)
  // @ts-expect-error RPC handler return is inferred too deeply for TS
  .handler(async ({ data }) => {
    const mod = await import("./admin-contacts.server");
    return mod.handleGetContact(data.id);
  });

export const updateAdminContact = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id: number;
      status?: RequestStatus;
      priority?: RequestPriority;
      assigned_to?: number | null;
      follow_up_date?: string | null;
    }) => data,
  )
  .handler(async ({ data }) => {
    const mod = await import("./admin-contacts.server");
    return mod.handleUpdateContact(data);
  });

export const bulkUpdateAdminContacts = createServerFn({ method: "POST" })
  .validator(
    (data: { ids: number[]; status?: RequestStatus; assigned_to?: number | null }) => data,
  )
  .handler(async ({ data }) => {
    const mod = await import("./admin-contacts.server");
    return mod.handleBulkUpdate(data);
  });

export const addAdminNote = createServerFn({ method: "POST" })
  .validator((data: { id: number; body: string }) => data)
  // @ts-expect-error RPC handler return is inferred too deeply for TS
  .handler(async ({ data }) => {
    const mod = await import("./admin-contacts.server");
    return mod.handleAddNote(data.id, data.body);
  });

export const getAdminDashboard = createServerFn({ method: "GET" }).handler(async () => {
  const mod = await import("./admin-contacts.server");
  return mod.handleDashboard();
});

export const getAdminAnalytics = createServerFn({ method: "GET" }).handler(async () => {
  const mod = await import("./admin-contacts.server");
  return mod.handleAnalytics();
});

export const getAdminNotifications = createServerFn({ method: "GET" }).handler(async () => {
  const mod = await import("./admin-contacts.server");
  return mod.handleNotifications();
});

export const getAdminAssignees = createServerFn({ method: "GET" }).handler(async () => {
  const mod = await import("./admin-contacts.server");
  return mod.handleAssignees();
});

export const getAdminCategories = createServerFn({ method: "GET" }).handler(async () => {
  const mod = await import("./admin-contacts.server");
  return mod.handleCategories();
});

export const getAdminSettings = createServerFn({ method: "GET" }).handler(async () => {
  const mod = await import("./admin-contacts.server");
  return mod.handleGetSettings();
});

export const saveAdminSettings = createServerFn({ method: "POST" })
  .validator((data: Record<string, unknown>) => data)
  .handler(async ({ data }) => {
    const mod = await import("./admin-contacts.server");
    return mod.handleSaveSettings(data);
  });

export const saveAdminCategory = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id?: number;
      slug: string;
      label: string;
      active: boolean;
      sort_order: number;
    }) => data,
  )
  .handler(async ({ data }) => {
    const mod = await import("./admin-contacts.server");
    return mod.handleSaveCategory(data);
  });

export const listAdminUsers = createServerFn({ method: "GET" }).handler(async () => {
  const mod = await import("./admin-contacts.server");
  return mod.handleListUsers();
});

export const saveAdminUser = createServerFn({ method: "POST" })
  .validator(
    (data: { id?: number; name: string; email: string; role: string; password?: string }) => data,
  )
  .handler(async ({ data }) => {
    const mod = await import("./admin-contacts.server");
    return mod.handleSaveUser(data);
  });

export const uploadAdminAttachment = createServerFn({ method: "POST" })
  .validator((data: { id: number; filename: string; mime: string; base64: string }) => data)
  .handler(async ({ data }) => {
    const mod = await import("./admin-contacts.server");
    return mod.handleUploadAttachment(data);
  });
