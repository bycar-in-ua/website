import { defineStore } from "pinia";
import type { SignInInput } from "@bycar-in-ua/auth-sdk";

export type AuthStage
  = | "enter-credential"
    | "confirm-otp"
    | "enter-password"
    | "reset-password"
    | "complete-introduction";

export type AuthSlideoverOpenOptions = {
  redirectTo?: string;
  prefill?: {
    phone?: string;
    stage?: AuthStage;
  };
};

export const useAuthSlideoverStore = defineStore("auth-slideover", () => {
  const router = useRouter();

  const signInFormState = reactive<SignInInput>({
    login: "",
    otp: undefined,
    password: undefined,
  });

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

  const openSlideover = (options?: AuthSlideoverOpenOptions | string) => {
    const redirectTo = typeof options === "string" ? options : options?.redirectTo;
    const prefill = typeof options === "object" ? options?.prefill : undefined;

    if (prefill?.phone) {
      signInFormState.login = prefill.phone;
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
  };

  const closeSlideover = () => {
    isOpen.value = false;
  };

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
  const setStage = (newStage: AuthStage) => {
    stage.value = newStage;
  };

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

  const reset = () => {
    stage.value = "enter-credential";
    signInFormState.login = "";
    signInFormState.otp = undefined;
    signInFormState.password = undefined;
    otpTimer.value = 0;
  };

  return {
    isOpen,
    redirect,
    stage,
    otpTimer,
    signInFormState,
    setStage,
    openSlideover,
    closeSlideover,
    startOtpTimer,
    reset,
  };
});
