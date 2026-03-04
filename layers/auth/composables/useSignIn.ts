import type { SignInPayload, SignInResponse } from "@bycar-in-ua/auth-sdk";
import * as v from "valibot";
import type { InjectionKey } from "vue";

export type AuthStage
  = | "enter-credential"
    | "confirm-otp"
    | "enter-password"
    | "forgot-password"
    | "reset-password";

const emailSchema = v.pipe(
  v.string("Це обов'язкове поле"),
  v.minLength(1, "Це обов'язкове поле"),
  v.email("Недійсний email"),
);

const phoneRegex
  = /^(\+38|38|8)?[\s-]?(\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}|\(?\d{3}\)?[\s-]?\d{2}[\s-]?\d{2}[\s-]?\d{3})$/;

const phoneSchema = v.pipe(
  v.string("Це обов'язкове поле"),
  v.minLength(1, "Це обов'язкове поле"),
  v.regex(phoneRegex, "Недійсний номер телефону"),
);

const credentialSchema = v.union(
  [emailSchema, phoneSchema],
  "Введіть дійсний email або номер телефону",
);

const formSchema = v.object({
  login: credentialSchema,
  otp: v.optional(v.string()),
  password: v.optional(v.string()),
});

type AuthStageApi = {
  stage: Readonly<Ref<AuthStage>>;
  setStage: (stage: AuthStage) => void;
  state: SignInPayload;
  formSchema: typeof formSchema;
  signIn: () => Promise<void>;
  signInPending: Readonly<Ref<boolean>>;
  signInData?: Readonly<Ref<SignInResponse | undefined>>;
  reset: () => void;
};

const signInKey = Symbol("sign-in") as InjectionKey<AuthStageApi>;

export function useSignInProvider() {
  const authSlideover = useAuthSlideover();
  const toast = useToast();
  const stage = ref<AuthStage>("enter-credential");
  const state = reactive<SignInPayload>({
    login: "",
    otp: undefined,
    password: undefined,
  });

  const setStage = (newStage: AuthStage) => {
    stage.value = newStage;
  };

  const {
    data: signInData, execute: signIn, pending: signInPending,
  } = useAsyncData("sign-in", async () => {
    try {
      const authResponse = await $fetch<SignInResponse>("/api/auth/sign-in", {
        method: "POST",
        body: state,
      });

      if (isNextStepResponse(authResponse)) {
        switch (authResponse.nextStep) {
          case "NEED_OTP":
            setStage("confirm-otp");
            break;
          case "NEED_PASSWORD":
            setStage("enter-password");
            break;
          case "GOOGLE_USER":
          // Handle Google user next step
            break;
          default:
            break;
        }
      } else {
        await useUserSession().fetch();

        console.log("Redirecting to:", authSlideover.redirect.value);

        if (authSlideover.redirect.value) {
          await navigateTo(authSlideover.redirect.value || "/");
        }

        authSlideover.closeSlideover();
      }

      return authResponse;
    } catch {
      toast.add({
        color: "error",
        title: "Помилка під час входу. Будь ласка, спробуйте ще раз.",
      });
    }
  }, { immediate: false });

  const reset = () => {
    stage.value = "enter-credential";
    state.login = "";
    state.otp = undefined;
    state.password = undefined;
  };

  const signInApi: AuthStageApi = {
    stage,
    setStage,
    state,
    formSchema,
    signIn,
    signInPending,
    signInData,
    reset,
  };

  provide(signInKey, signInApi);

  return signInApi;
}

export function useSignIn() {
  const signInApi = inject(signInKey);

  if (!signInApi) {
    throw new Error("useSignIn must be used within SignInProvider");
  }

  return signInApi;
}
