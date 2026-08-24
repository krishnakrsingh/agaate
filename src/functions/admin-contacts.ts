import { createServerFn } from "@tanstack/react-start";

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

export const sendAdminTestEmail = createServerFn({ method: "POST" })
  .validator((data: { to?: string } | undefined) => data ?? {})
  .handler(async ({ data }) => {
    const mod = await import("./admin-contacts.server");
    return mod.handleSendTestEmail(data?.to);
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

export const listAdminFarmVisits = createServerFn({ method: "GET" })
  .validator(
    (
      data:
        | {
            q?: string;
            status?: string;
            from?: string;
            to?: string;
            page?: number;
            pageSize?: number;
          }
        | undefined,
    ) => data ?? {},
  )
  .handler(async ({ data }) => {
    const mod = await import("./admin-contacts.server");
    return mod.handleListFarmVisits(data);
  });

export const updateAdminFarmVisit = createServerFn({ method: "POST" })
  .validator((data: { id: number; status?: string; follow_up_date?: string | null }) => data)
  .handler(async ({ data }) => {
    const mod = await import("./admin-contacts.server");
    return mod.handleUpdateFarmVisit({
      id: data.id,
      status: data.status as import("@/lib/admin-constants").RequestStatus | undefined,
      follow_up_date: data.follow_up_date,
    });
  });
