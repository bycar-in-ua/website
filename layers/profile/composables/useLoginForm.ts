import * as v from "valibot";
import {
  emailOrPhoneSchema,
  passwordSchema,
} from "@/layers/profile/vaidation.shema";

const loginSchema = v.object({
  emailOrPhone: emailOrPhoneSchema,
  password: passwordSchema,
});

type LoginSchema = v.InferOutput<typeof loginSchema>;

export function useLoginForm() {
  const state = reactive<LoginSchema>({
    emailOrPhone: "",
    password: "",
  });

  const authStore = useAuthStore();
  const authService = useAuthService();

  const { execute: login, status } = useAsyncData(
    "login",
    async () => {
      try {
        const user = await authService.login({
          email: state.emailOrPhone,
          password: state.password,
        });

        if (!user) {
          throw new Error("User not authenticated");
        }

        authStore.user = user;
        authStore.loginModal.open = false;

        navigateTo(authStore.loginModal.redirect || "/profile");
      } catch {
        useToast().add({
          title: "Помилка авторизації",
          description:
            "Щось пішло не так. Перевірте правильність введених даних",
          color: "error",
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
    loginSchema,
    login,
    loading,
  };
}
