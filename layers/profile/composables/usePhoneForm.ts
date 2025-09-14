import * as v from "valibot";

import { phoneRegex } from "../vaidation.shema";

export function usePhoneForm() {
  const authStore = useAuthStore();

  const state = reactive({
    phone: authStore.user?.phone,
    code: [],
  });

  const isNewPhone = computed(() => state.phone !== authStore.user?.phone);

  const formSchema = computed(() => {
    if (!state.phone) {
      return v.object({});
    }

    return v.object({
      phone: v.pipe(
        v.string(),
        v.regex(phoneRegex, "Недійсний номер телефону"),
      ),
    });
  });

  const codeValid = computed(() => state.code.length === 4);
  const showCodeInput = computed(
    () => authStore.user?.phone && !authStore.user?.phoneVerified,
  );

  const toast = useToast();
  const authService = useAuthService();
  const timeToResend = ref(0);

  const { execute: sendVerificationCode, status: sendVerificationCodeStatus }
    = useAsyncData(
      "send-phone-verification",
      async () => {
        await authService.sendPhoneVerificationSms(
          isNewPhone.value ? state.phone : undefined,
        );

        toast.add({
          title: "Код для підтвердження",
          description: "Код для підтвердження було відправлено на ваш телефон",
          color: "success",
        });

        if (isNewPhone.value) {
          authStore.user!.phone = state.phone;
          authStore.user!.phoneVerified = false;
        }

        timeToResend.value = 60;

        const interval = setInterval(() => {
          timeToResend.value--;

          if (timeToResend.value === 0) {
            clearInterval(interval);
          }
        }, 1000);

        return true;
      },
      { immediate: false },
    );

  const sendingSms = computed(
    () => sendVerificationCodeStatus.value === "pending",
  );

  const { execute: verifyPhone, status: verifyPhoneStatus } = useAsyncData(
    "verify-phone",
    async () => {
      const code = state.code.join("");
      await authService.phoneVerification(code);

      toast.add({
        title: "Телефон верифікований",
        description: "Телефон було успішно верифіковано",
        color: "success",
      });

      authStore.user!.phoneVerified = true;

      return true;
    },
    { immediate: false },
  );

  const verifyingPhone = computed(() => verifyPhoneStatus.value === "pending");

  return {
    state,
    formSchema,
    codeValid,
    isNewPhone,
    showCodeInput,
    sendVerificationCode,
    sendingSms,
    timeToResend,
    verifyPhone,
    verifyingPhone,
  };
}
