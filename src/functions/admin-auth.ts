import { createServerFn } from "@tanstack/react-start";

export const loginAdmin = createServerFn({ method: "POST" })
  .validator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const { handleLogin } = await import("./admin-auth.server");
    return handleLogin(data.email, data.password);
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const { handleLogout } = await import("./admin-auth.server");
  return handleLogout();
});

export const getAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const { handleGetSession } = await import("./admin-auth.server");
  return handleGetSession();
});

export const getAdminProfile = createServerFn({ method: "GET" }).handler(async () => {
  const { handleGetProfile } = await import("./admin-auth.server");
  return handleGetProfile();
});

export const updateAdminProfile = createServerFn({ method: "POST" })
  .validator((data: { name: string }) => data)
  .handler(async ({ data }) => {
    const { handleUpdateProfile } = await import("./admin-auth.server");
    return handleUpdateProfile(data);
  });

export const changeAdminPassword = createServerFn({ method: "POST" })
  .validator((data: { currentPassword: string; newPassword: string }) => data)
  .handler(async ({ data }) => {
    const { handleChangePassword } = await import("./admin-auth.server");
    return handleChangePassword(data);
  });
