export function useLogout() {
  const { clear } = useUserSession();
  const requestFetch = useRequestFetch();

  const { execute, pending } = useAsyncData("logout", async () => {
    navigateTo("/");
    await requestFetch("/api/auth/logout");
    await clear();
  }, { immediate: false });

  return {
    logout: execute,
    logoutPending: pending,
  };
}
