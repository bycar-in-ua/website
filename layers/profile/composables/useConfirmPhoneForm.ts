import { useSignInModalStore } from "../stores/sign-in-modal";

type FormState = {
  code: string[];
};

export function useConfirmPhoneForm() {
  const state = reactive<FormState>({ code: [] });

  const isValid = computed(() => state.code.length === 4);

  const authService = useAuthService();
  const authStore = useAuthStore();
  const signInModal = useSignInModalStore();

  const toast = useToast();

  const { execute: confirmPhone, status } = useAsyncData(
    "confirm-phone",
    async () => {
      try {
        await authService.phoneVerification(state.code.join(""));

        authStore.authenticate();
        signInModal.open = false;

        toast.add({
          title: "Підтвердження номеру",
          description: "Номер телефону підтверджений",
          color: "success",
        });
      } catch {
        toast.add({
          title: "Помилка підтвердження",
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
    isValid,
    confirmPhone,
    loading,
  };
}
