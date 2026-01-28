export function useLogout() {
  const { clear } = useUserSession();

  const { execute, pending } = useAsyncData("logout", async () => {
    navigateTo("/");
    await $fetch("/api/auth/logout");
    await clear();
  }, { immediate: false });

  return {
    logout: execute,
    logoutPending: pending,
  };
}
