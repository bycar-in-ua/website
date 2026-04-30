import { defineStore } from "pinia";
import type { SignInInput } from "@bycar-in-ua/auth-sdk";
import * as v from "valibot";
import { emailOrPhoneSchema } from "#shared/validation";
import { useMutation } from "@tanstack/vue-query";

export type AuthStage
  = | "enter-credential"
    | "confirm-otp"
    | "enter-password"
    | "forgot-password"
    | "reset-password"
    | "complete-introduction";

export type AuthSlideoverOpenOptions = {
  redirectTo?: string;
  prefill?: {
    phone?: string;
    stage?: AuthStage;
  };
};

export const authFormSchema = v.object({
  login: emailOrPhoneSchema,
  otp: v.optional(v.string()),
  password: v.optional(v.string()),
});

export const useAuthSlideoverStore = defineStore("auth-slideover", () => {
  const router = useRouter();
  const toast = useToast();

  const isOpen = computed<boolean>({
    get() {
      return Boolean(router.currentRoute.value.query.authSlideover);
    },
    set(value) {
      router.replace({
        query: value
          ? {
              ...router.currentRoute.value.query,
              authSlideover: "open",
            }
          : {},
      });
    },
  });

  const redirect = computed<string | undefined>({
    get() {
      const r = router.currentRoute.value.query.redirect;
      return typeof r === "string" ? r : undefined;
    },
    set(value) {
      router.replace({
        query: {
          ...router.currentRoute.value.query,
          redirect: value,
        },
      });
    },
  });

  const stage = ref<AuthStage>("enter-credential");
  const otpTimer = ref(0);

  const startOtpTimer = () => {
    otpTimer.value = 30;
    const interval = setInterval(() => {
      if (otpTimer.value > 0) {
        otpTimer.value -= 1;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };

  const state = reactive<SignInInput>({
    login: "",
    otp: undefined,
    password: undefined,
  });

  function setStage(newStage: AuthStage) {
    stage.value = newStage;
  }

  function openSlideover(options?: AuthSlideoverOpenOptions | string) {
    const redirectTo = typeof options === "string" ? options : options?.redirectTo;
    const prefill = typeof options === "object" ? options?.prefill : undefined;

    if (prefill?.phone) {
      state.login = prefill.phone;
    }
    if (prefill?.stage) {
      stage.value = prefill.stage;
    }

    router.replace({
      query: {
        ...router.currentRoute.value.query,
        authSlideover: "open",
        redirect: redirectTo,
      },
    });
  }

  function closeSlideover() {
    isOpen.value = false;
  }

  const requestFetch = useRequestFetch();
  const userSession = useUserSession();

  const signInHandler = async () => {
    const authResponse = await requestFetch("/api/auth/sign-in", {
      method: "POST",
      body: state,
    });

    if (isNextStepResponse(authResponse)) {
      switch (authResponse.nextStep) {
        case "NEED_OTP":
          startOtpTimer();
          setStage("confirm-otp");
          break;
        case "NEED_PASSWORD":
          setStage("enter-password");
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

      if (redirect.value) {
        await navigateTo({
          path: redirect.value,
          query: { authSlideover: shouldCompleteIntroduction ? "open" : undefined },
        });
      }

      if (shouldCompleteIntroduction) {
        setStage("complete-introduction");
      } else {
        closeSlideover();
      }
    }

    return authResponse;
  };

  const {
    mutateAsync: signIn,
    isPending: signInPending,
    data: signInData,
    reset: resetSignInData,
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

  function reset() {
    stage.value = "enter-credential";
    state.login = "";
    state.otp = undefined;
    state.password = undefined;
    otpTimer.value = 0;
    resetSignInData();
  }

  return {
    isOpen,
    redirect,
    stage,
    otpTimer,
    state,
    formSchema: authFormSchema,
    signIn,
    signInPending,
    signInData,
    setStage,
    openSlideover,
    closeSlideover,
    reset,
  };
});
