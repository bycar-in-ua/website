import * as v from "valibot";
import { emailOrPhoneSchema, passwordSchema } from "#layers/profile/vaidation.shema";
import { useSignInModalStore } from "~~/layers/profile/stores/sign-in-modal";
// import { useAuthStore } from "~~/layers/profile/stores/auth";

const loginSchema = v.object({
  login: emailOrPhoneSchema,
  password: passwordSchema,
});

type LoginSchema = v.InferOutput<typeof loginSchema>;

export function useLoginForm() {
  const state = reactive<LoginSchema>({
    login: "",
    password: "",
  });

  // const authStore = useAuthStore();
  const signInModal = useSignInModalStore();

  const { execute: login, status } = useAsyncData(
    "login",
    async () => {
      try {
        const user = await $fetch("/api/auth/login", {
          method: "POST",
          body: state,
        });

        if (!user) {
          throw new Error("User not authenticated");
        }

        // authStore.user = user;
        signInModal.open = false;

        navigateTo(signInModal.redirect || "/profile");
      } catch {
        useToast().add({
          title: "Помилка авторизації",
          description:
            "Щось пішло не так. Перевірте правильність введених даних",
          color: "error",
        });
      }
    },
    { immediate: false },
  );

  const loading = computed(() => status.value === "pending");

  return {
    state,
    loginSchema,
    login,
    loading,
  };
}
