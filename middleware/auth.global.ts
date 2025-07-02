export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  const authService = useAuthService();

  // const user = await authService.authenticate();

  const user = null;

  console.log("user", user);

  if (user) {
    authStore.user = user;
  }

  if (!user && to.path.startsWith("/profile")) {
    return navigateTo({
      path: "/",
      query: { redirect: to.fullPath, openLoginModal: "true" },
    });
  }
});
