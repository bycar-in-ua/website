export type SignInStage
  = | "login"
    | "signup"
    | "confirm-phone"
    | "forgot-password"
    | "reset-password";

type SignInStageApi = {
  stage: Ref<SignInStage>;
  setStage: (stage: SignInStage) => void;
  resetPasswordLogin: Ref<string>;
};

const signInStageKey = Symbol() as InjectionKey<SignInStageApi>;

export function useSignInStageProvider() {
  const stage = ref<SignInStage>("login");
  const resetPasswordLogin = ref("");

  const setStage = (st: SignInStage) => {
    stage.value = st;
  };

  const stageApi: SignInStageApi = {
    stage: readonly(stage),
    setStage,
    resetPasswordLogin,
  };

  provide(signInStageKey, stageApi);

  return stageApi;
}

export function useSignInStage() {
  const stageApi = inject(signInStageKey);

  if (!stageApi) {
    throw new Error("useSignInStage must be used inside a provider");
  }

  return stageApi;
}
