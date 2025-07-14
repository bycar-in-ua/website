import type { LoginPayload, ReducedUser } from "@bycar-in-ua/sdk";

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

  const name = computed(() =>
    [user.value?.firstName, user.value?.lastName].filter(Boolean).join(" "),
  );

  const authService = useAuthService();

  const { execute: authenticate } = useAsyncData(
    "authenticate",
    async () => {
      user.value = await authService.authenticate();
    },
    {
      server: false,
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
    loginModal,
    authenticate,
    login,
    logout,
  };
});
