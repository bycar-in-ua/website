export type AuthStage
  = | "enter-credential"
    | "confirm-otp"
    | "enter-password"
    | "forgot-password"
    | "reset-password";

type AuthStageApi = {
  stage: Readonly<Ref<AuthStage>>;
  setStage: (stage: AuthStage) => void;
  credential: Ref<string>;
  resetPasswordLogin: Ref<string>;
};

const authStageKey = Symbol("auth-stage") as InjectionKey<AuthStageApi>;

/**
 * Provider composable for auth stage management.
 * Should be called in the AuthSlideover component.
 * @deprecated Use useSignInProvider instead.
 */
export function useAuthStageProvider() {
  const stage = ref<AuthStage>("enter-credential");
  const credential = ref("");
  const resetPasswordLogin = ref("");

  function setStage(newStage: AuthStage) {
    stage.value = newStage;
  }

  function reset() {
    stage.value = "enter-credential";
    credential.value = "";
    resetPasswordLogin.value = "";
  }

  const stageApi: AuthStageApi = {
    stage: readonly(stage),
    setStage,
    credential,
    resetPasswordLogin,
  };

  provide(authStageKey, stageApi);

  return {
    ...stageApi,
    reset,
  };
}

/**
 * Consumer composable for auth stage.
 * Must be used within a component that has AuthSlideover as ancestor.
 */
export function useAuthStage() {
  const stageApi = inject(authStageKey);

  if (!stageApi) {
    throw new Error("useAuthStage must be used within AuthSlideover");
  }

  return stageApi;
}
