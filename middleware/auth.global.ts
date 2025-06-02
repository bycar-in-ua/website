export default defineNuxtRouteMiddleware(async (to) => {
  const app = useNuxtApp();
  const authStore = useAuthStore();

  const user = await app.$auth.getUser();

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
