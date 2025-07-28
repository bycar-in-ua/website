export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  try {
    if (!authStore.authenticated) {
      await authStore.authenticate();
    }

    if (!authStore.user) {
      throw new Error("User not authenticated");
    }

    return true;
  } catch {
    const redirectPath =
      from.fullPath && from.fullPath !== to.fullPath ? from.fullPath : "/";

    return navigateTo({
      path: redirectPath,
      query: { redirect: to.fullPath, loginModal: "open" },
      replace: true,
    });
  }
});
