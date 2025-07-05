import type { LoginUserPayload, ReducedUser } from "@bycar-in-ua/sdk";

type LoginModalState = {
  open: boolean;
  redirect?: string;
};

export const useAuthStore = defineStore("auth", () => {
  const route = useRoute();

  const user = ref<ReducedUser | null>(null);
  const loginModal = reactive<LoginModalState>({
    open: route.query.loginModal === "open",
    redirect: route.query.redirect as string | undefined,
  });

  const authService = useAuthService();

  const login = async (payload: LoginUserPayload) => {
    user.value = await authService.login(payload);
  };

  const logout = async () => {
    await authService.logout();
    user.value = null;
  };

  return {
    user,
    loginModal,
    login,
    logout,
  };
});
