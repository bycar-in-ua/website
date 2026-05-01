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

      const user = authResponse.user;

      const shouldCompleteIntroduction = Boolean(user && (!user.phone || !user.email));
      const shouldConfirmContact = (user?.phone && !user?.phoneVerified) || (user?.email && !user?.emailVerified);

      if (authSlideoverStore.redirect) {
        await navigateTo({
          path: authSlideoverStore.redirect,
          query: { authSlideover: shouldCompleteIntroduction || shouldConfirmContact ? "open" : undefined },
        });
      }

      if (shouldCompleteIntroduction) {
        authSlideoverStore.setStage("complete-introduction");
      } else if (shouldConfirmContact) {
        authSlideoverStore.setStage("relogin-confirmation-request");
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
