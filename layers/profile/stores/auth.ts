import type { LoginPayload } from "@bycar-in-ua/auth-sdk";
import type { User } from "#auth-utils";
import { useQueryClient } from "@tanstack/vue-query";

/**
 * @deprecated Don't use
 */
export const useAuthStore = defineStore("auth", () => {
  const {
    loggedIn, session, clear, fetch: fetchSession,
  } = useUserSession();

  const user = computed(() => session.value?.user?.data);

  const userId = computed(() => user.value?.id);

  const name = computed(() =>
    [user.value?.firstName, user.value?.lastName].filter(Boolean).join(" "),
  );

  const queryClient = useQueryClient();

  const authenticated = computed(() => loggedIn.value && !!userId.value);

  const { gtag } = useGtag();

  const login = async (payload: LoginPayload) => {
    const loggedInUser = await $fetch("/api/auth/login", {
      method: "POST",
      body: payload,
    });

    // Refresh session state after login
    await fetchSession();

    queryClient.setQueryData(["user"], loggedInUser);

    gtag("event", "sign_in", {
      event_category: "engagement",
      event_label: "sign_in",
    });
  };

  const logout = async () => {
    navigateTo("/");

    await $fetch("/api/auth/logout");
    await clear();
    queryClient.setQueryData(["user"], null);

    gtag("event", "sign_out", {
      event_category: "engagement",
      event_label: "sign_out",
    });
  };

  /**
   * Sets user data directly (used after registration/login from other flows)
   */
  const setUser = async (userData: User) => {
    await fetchSession();
    queryClient.setQueryData(["user"], userData);
  };

  return {
    user,
    userId,
    name,
    authenticated,
    loggedIn,
    login,
    logout,
    setUser,
    fetchSession,
  };
});
