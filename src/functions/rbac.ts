import { createServerFn } from "@tanstack/react-start";
import type { PermissionKey } from "@/lib/rbac";

export const listAdminPermissions = createServerFn({ method: "GET" }).handler(async () => {
  const mod = await import("./rbac.server");
  return mod.handleListPermissions();
});

export const listAdminRoles = createServerFn({ method: "GET" }).handler(async () => {
  const mod = await import("./rbac.server");
  return mod.handleListRoles();
});

export const saveAdminRole = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id?: number;
      name: string;
      slug?: string;
      description?: string;
      permissions: PermissionKey[];
    }) => data,
  )
  .handler(async ({ data }) => {
    const mod = await import("./rbac.server");
    return mod.handleSaveRole(data);
  });

export const deleteAdminRole = createServerFn({ method: "POST" })
  .validator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    const mod = await import("./rbac.server");
    return mod.handleDeleteRole(data.id);
  });
