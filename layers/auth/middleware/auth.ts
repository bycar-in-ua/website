export default defineNuxtRouteMiddleware(async (to, from) => {
  const {
    loggedIn, user, fetch: fetchSession, clear: clearSession,
  } = useUserSession();

  try {
    // During SSR: trust the session state (user is cached in encrypted cookie)
    // Token refresh will happen naturally on client-side when API calls are made
    if (loggedIn.value && user.value) {
      return true;
    }

    // Try to fetch session if not loaded yet (mainly for client-side navigation)
    if (!loggedIn.value) {
      await fetchSession();

      if (loggedIn.value && user.value) {
        return true;
      }
    }

    await clearSession();
    throw new Error("User not authenticated");
  } catch {
    const redirectPath
      = from.fullPath && from.fullPath !== to.fullPath ? from.fullPath : "/";

    return navigateTo({
      path: redirectPath,
      query: {
        redirect: to.fullPath,
        authSlideover: "open",
      },
      replace: true,
    });
  }
});
