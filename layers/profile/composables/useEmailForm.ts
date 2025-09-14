import * as v from "valibot";

import { emailSchema } from "../vaidation.shema";

const formSchema = v.object({ email: emailSchema });

export function useEmailForm() {
  const authStore = useAuthStore();

  const state = reactive({ email: authStore.user?.email });

  const isNewEmail = computed(() => state.email !== authStore.user?.email);

  const authService = useAuthService();
  const toast = useToast();

  const { execute: sendVerification, status: sendVerificationStatus }
    = useAsyncData(
      "send-verification",
      async () => {
        const redirectUrl = composeQueryToastUrl({
          url: window.location.href,
          color: "success",
          message: "Email верифікований",
        }).href;

        await authService.sendVerificationEmail({
          email: isNewEmail.value ? state.email : undefined,
          redirectUrl,
        });

        toast.add({
          title: "Email відправлено",
          description:
            "Перевірте свою пошту, включно з папкою 'Спам' та перейдіть за посиланням у листі.",
          color: "success",
        });

        return true;
      },
      { immediate: false },
    );

  const emailSendLoading = computed(
    () => sendVerificationStatus.value === "pending",
  );

  return {
    state,
    formSchema,
    isNewEmail,
    sendVerification,
    emailSendLoading,
  };
}
