import type { LoginPayload } from "@bycar-in-ua/sdk";
import { useQuery, useQueryClient } from "@tanstack/vue-query";

export const useAuthStore = defineStore("auth", () => {
  const userId = computed(() => user.value?.id);

  const name = computed(() =>
    [user.value?.firstName, user.value?.lastName].filter(Boolean).join(" "),
  );

  const authService = useAuthService();
  const queryClient = useQueryClient();

  const {
    data: user,
    isFetched,
    refetch: authenticate,
  } = useQuery({
    queryKey: ["user"],
    retry: false,
    queryFn: () => authService.authenticate(),
  });

  const authenticated = computed(() => isFetched.value && !!userId.value);

  const login = async (payload: LoginPayload) => {
    const user = await authService.login(payload);

    queryClient.setQueryData(["user"], user);
  };

  const logout = async () => {
    navigateTo("/");

    await authService.logout();
    queryClient.setQueryData(["user"], null);
  };

  return {
    user,
    userId,
    name,
    authenticated,
    authenticate,
    login,
    logout,
  };
});
