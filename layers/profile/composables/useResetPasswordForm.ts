import * as v from "valibot";
import { passwordSchema } from "../vaidation.shema";

const formSchema = v.pipe(
  v.object({
    code: v.pipe(
      v.array(v.string()),
      v.minLength(6, "Код повинен складатися з 6 цифр"),
      v.maxLength(6, "Код повинен складатися з 6 цифр"),
    ),
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  }),
  v.forward(
    v.partialCheck(
      [["newPassword"], ["confirmPassword"]],
      (input) => input.newPassword === input.confirmPassword,
      "Паролі не збігаються",
    ),
    ["confirmPassword"],
  ),
);

export function useResetPasswordForm() {
  const state = reactive({
    code: [],
    newPassword: "",
    confirmPassword: "",
  });

  const authService = useAuthService();
  const { setStage, resetPasswordLogin } = useSignInStage();
  const toast = useToast();

  const { execute: resetPassword, status } = useAsyncData(
    "reset-password",
    async () => {
      try {
        await authService.passwordReset({
          code: state.code.join(""),
          login: resetPasswordLogin.value,
          password: state.newPassword,
        });

        resetPasswordLogin.value = "";
        setStage("login");

        toast.add({
          title: "Пароль успішно змінено",
          description: "Ви можете увійти до свого акаунту",
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
    { immediate: false },
  );

  const loading = computed(() => status.value === "pending");

  return {
    state,
    formSchema,
    resetPassword,
    loading,
  };
}
