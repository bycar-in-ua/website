import * as v from "valibot";
import {
  emailOrPhoneSchema,
  isEmail,
  passwordSchema,
} from "@/layers/profile/vaidation.shema";

const signupSchema = v.object({
  name: v.optional(v.string()),
  login: emailOrPhoneSchema,
  password: passwordSchema,
});

type SignUpSchema = v.InferOutput<typeof signupSchema>;

export function useSignUpForm() {
  const state = reactive<SignUpSchema>({
    name: "",
    login: "",
    password: "",
  });

  const toast = useToast();

  const authService = useAuthService();
  const authStore = useAuthStore();
  const { setStage } = useSignInStage();

  const { execute: signup, status } = useAsyncData(
    "signup",
    async () => {
      const isEmailUsed = isEmail(state.login);

      const [firstName, lastName] = state.name?.split(" ") || [];

      try {
        const newUser = await authService.register({
          email: isEmailUsed ? state.login : null,
          phone: isEmailUsed ? null : state.login,
          password: state.password,
          firstName,
          lastName,
        });

        authStore.user = await authService.login(state);

        if (isEmailUsed) {
          toast.add({
            title: "Вітаємо з реєстрацією",
            description: `На пошту ${state.login} було відправлено лист з посиланням для підтвердження реєстрації`,
            color: "success",
          });

          authStore.loginModal.open = false;
        } else {
          setStage("confirm-phone");
        }

        navigateTo(authStore.loginModal.redirect || "/profile");

        return newUser;
      } catch (error) {
        toast.add({
          title: "Помилка авторизації",
          description: getErrorMessage(error),
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
    signupSchema,
    signup,
    loading,
  };
}

function getErrorMessage(error: unknown) {
  const errorString = String(error);

  const isDuplicate = errorString.includes(
    "duplicate key value violates unique constraint",
  );

  if (isDuplicate) {
    return "Email або телефон вже використовуються. Спробуйте увійти або зкинути пароль";
  }

  return "Щось пішло не так. Перевірте правильність введених даних";
}
