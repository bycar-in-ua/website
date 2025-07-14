import * as z from "valibot";
import { emailOrPhoneSchema } from "../vaidation.shema";

const formSchema = z.object({
  login: emailOrPhoneSchema,
});

export function useForgotPasswordForm() {
  const state = reactive({
    login: "",
  });

  const authService = useAuthService();
  const toast = useToast();
  const { setStage, resetPasswordLogin } = useSignInStage();

  const { execute: sendForgotPasswordRequest, status } = useAsyncData(
    "forgot-password",
    async () => {
      try {
        await authService.passwordResetRequest(state.login);

        resetPasswordLogin.value = state.login;
        setStage("reset-password");

        toast.add({
          title: "Повідомлення відправлено",
          description:
            "На вказані вами контактні дані було відправлено код підтвердження",
          color: "success",
          duration: 5000,
        });
      } catch (error) {
        toast.add({
          title: "Сталася помилка",
          description: String(error),
          color: "error",
          duration: 5000,
        });
      }
    },
    {
      immediate: false,
    },
  );

  const loading = computed(() => status.value === "pending");

  return {
    state,
    formSchema,
    sendForgotPasswordRequest,
    loading,
  };
}
