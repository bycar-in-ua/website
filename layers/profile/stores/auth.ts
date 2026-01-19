import type { LoginPayload } from "@bycar-in-ua/auth-sdk";
import { useQueryClient } from "@tanstack/vue-query";

export const useAuthStore = defineStore("auth", () => {
  const userId = computed(() => user.value?.id);

  const name = computed(() =>
    [user.value?.firstName, user.value?.lastName].filter(Boolean).join(" "),
  );

  const queryClient = useQueryClient();

  const {
    data: user,
    refresh: authenticate,
    status,
  } = useFetch("/api/auth");

  const authenticated = computed(() => status.value !== "idle" && !!userId.value);

  const { gtag } = useGtag();

  const login = async (payload: LoginPayload) => {
    const user = await $fetch("/api/auth/login", {
      method: "POST",
      body: payload,
    });

    queryClient.setQueryData(["user"], user);

    gtag("event", "sign_in", {
      event_category: "engagement",
      event_label: "sign_in",
    });
  };

  const logout = async () => {
    navigateTo("/");

    await $fetch("/api/auth/logout");
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
