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

  const { gtag } = useGtag();

  const login = async (payload: LoginPayload) => {
    const user = await authService.login(payload);

    queryClient.setQueryData(["user"], user);

    gtag("event", "sign_in", {
      event_category: "engagement",
      event_label: "sign_in",
    });
  };

  const logout = async () => {
    navigateTo("/");

    await authService.logout();
    queryClient.setQueryData(["user"], null);

    gtag("event", "sign_out", {
      event_category: "engagement",
      event_label: "sign_out",
    });
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
