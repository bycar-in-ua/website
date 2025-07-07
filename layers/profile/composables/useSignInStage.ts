export type SignInStage =
  | "login"
  | "signup"
  | "confirm-email"
  | "confirm-phone"
  | "reset-password";

type SignInStageApi = {
  stage: Ref<SignInStage>;
  setStage: (stage: SignInStage) => void;
};

const signInStageKey = Symbol() as InjectionKey<SignInStageApi>;

export function useSignInStageProvider() {
  const stage = ref<SignInStage>("login");

  const setStage = (st: SignInStage) => {
    stage.value = st;
  };

  const stageApi: SignInStageApi = {
    stage: readonly(stage),
    setStage,
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
