import { defineStore } from "pinia";
import type { SignInPayload, SignInResponse } from "@bycar-in-ua/auth-sdk";
import * as v from "valibot";
import { emailOrPhoneSchema } from "#shared/validation";

export type AuthStage
  = | "enter-credential"
    | "confirm-otp"
    | "enter-password"
    | "forgot-password"
    | "reset-password";

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
  const requestFetch = useRequestFetch();

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

  const state = reactive<SignInPayload>({
    login: "",
    otp: undefined,
    password: undefined,
  });

  const signInPending = ref(false);
  const signInData = ref<SignInResponse | undefined>();

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

  async function signIn() {
    signInPending.value = true;
    try {
      const authResponse = await requestFetch<SignInResponse>("/api/auth/sign-in", {
        method: "POST",
        body: state,
      });

      signInData.value = authResponse;

      if (isNextStepResponse(authResponse)) {
        switch (authResponse.nextStep) {
          case "NEED_OTP":
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
        await useUserSession().fetch();

        if (redirect.value) {
          await navigateTo(redirect.value);
        }

        closeSlideover();
      }
    } catch {
      toast.add({
        color: "error",
        title: "Помилка під час входу. Будь ласка, спробуйте ще раз.",
      });
    } finally {
      signInPending.value = false;
    }
  }

  function reset() {
    stage.value = "enter-credential";
    state.login = "";
    state.otp = undefined;
    state.password = undefined;
    signInData.value = undefined;
  }

  return {
    isOpen,
    redirect,
    stage,
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
