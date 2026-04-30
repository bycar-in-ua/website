import { useAuthSlideoverStore } from "../stores/auth-slideover";
import { useMutation } from "@tanstack/vue-query";

export function useSignIn() {
  const authSlideoverStore = useAuthSlideoverStore();

  const userSession = useUserSession();
  const fetch = useRequestFetch();
  const signInHandler = async () => {
    const authResponse = await fetch("/api/auth/sign-in", {
      method: "POST",
      body: authSlideoverStore.signInFormState,
    });

    if (isNextStepResponse(authResponse)) {
      switch (authResponse.nextStep) {
        case "NEED_OTP":
          authSlideoverStore.startOtpTimer();
          authSlideoverStore.setStage("confirm-otp");
          break;
        case "NEED_PASSWORD":
          authSlideoverStore.setStage("enter-password");
          break;
        case "GOOGLE_USER":
          break;
        default:
          break;
      }
    } else {
      await userSession.fetch();

      const user = userSession.user.value?.data;

      const shouldCompleteIntroduction = Boolean(user && (!user.phone || !user.email));

      if (authSlideoverStore.redirect) {
        await navigateTo({
          path: authSlideoverStore.redirect,
          query: { authSlideover: shouldCompleteIntroduction ? "open" : undefined },
        });
      }

      if (shouldCompleteIntroduction) {
        authSlideoverStore.setStage("complete-introduction");
      } else {
        authSlideoverStore.closeSlideover();
      }
    }

    return authResponse;
  };

  const toast = useToast();

  const {
    mutateAsync: signIn,
    isPending,
    data,
  } = useMutation({
    mutationKey: ["auth", "sign-in"],
    mutationFn: signInHandler,
    onError: (error) => {
      toast.add({
        color: "error",
        title: "Помилка під час входу. Будь ласка, спробуйте ще раз.",
        description: error.message,
      });
    },
  });

  return {
    signIn,
    isPending,
    data,
  };
}
