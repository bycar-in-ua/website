import { composeQueryToastUrl } from "~/utils/composeQueryToastUrl";

export function useGoogleSignIn() {
  const authService = useAuthService();
  const signInModalStore = useSignInModalStore();

  const { resolve, currentRoute } = useRouter();

  const { status, execute: googleSignIn } = useAsyncData(
    "google-sign-in",
    async () => {
      const profileRoute = resolve({ name: "profile-personal" });
      const redirectUrl = new URL(
        String(signInModalStore.redirect || profileRoute.fullPath),
        window?.location.origin ?? "",
      );
      const redirectOnError = composeQueryToastUrl({
        url: new URL(currentRoute.value.path, window?.location.origin ?? ""),
        color: "error",
        message: "Щось пішло не так. Скоріше за все аккаунт вже існує.",
      });

      const googleLogin = await authService.googleLogin({
        redirectTo: redirectUrl.href,
        redirectOnError: redirectOnError.href,
      });

      navigateTo(googleLogin.url, { external: true });

      return googleLogin;
    },
    {
      immediate: false,
    },
  );

  const loading = computed(() => status.value === "pending");

  return {
    googleSignIn,
    loading,
  };
}
