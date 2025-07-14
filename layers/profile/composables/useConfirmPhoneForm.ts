type FormState = {
  code: string[];
};

export function useConfirmPhoneForm() {
  const state = reactive<FormState>({
    code: [],
  });

  const isValid = computed(() => state.code.length === 4);

  const authService = useAuthService();
  const authStore = useAuthStore();

  const toast = useToast();

  const { execute: confirmPhone, status } = useAsyncData(
    "confirm-phone",
    async () => {
      try {
        await authService.phoneVerification({
          code: Number(state.code.join("")),
        });

        authStore.authenticate();
        authStore.loginModal.open = false;

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
    {
      immediate: false,
    },
  );

  const loading = computed(() => status.value === "pending");

  return {
    state,
    isValid,
    confirmPhone,
    loading,
  };
}
