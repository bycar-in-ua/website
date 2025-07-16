import type { LoginPayload, ReducedUser } from "@bycar-in-ua/sdk";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<ReducedUser | null>(null);

  const name = computed(() =>
    [user.value?.firstName, user.value?.lastName].filter(Boolean).join(" "),
  );

  const authService = useAuthService();

  const { execute: authenticate } = useAsyncData(
    "authenticate",
    async () => {
      const authenticatedUser = await authService.authenticate();

      user.value = authenticatedUser;

      return authenticatedUser;
    },
    {
      getCachedData() {
        // Authenticated user is not cached
        return undefined;
      },
      immediate: import.meta.client,
    },
  );

  const login = async (payload: LoginPayload) => {
    user.value = await authService.login(payload);
  };

  const logout = async () => {
    navigateTo("/");

    await authService.logout();
    user.value = null;
  };

  return {
    user,
    name,
    authenticate,
    login,
    logout,
  };
});
