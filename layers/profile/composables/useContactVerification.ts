import { useIntervalFn } from "@vueuse/core";

export type ContactType = "email" | "phone";

const RESEND_TIMEOUT = 30;

export function useContactVerification() {
  const isOpen = ref(false);
  const pendingContact = ref<string>();
  const timer = ref(0);
  const codeError = ref<string>();

  const { pause, resume } = useIntervalFn(() => {
    timer.value = Math.max(timer.value - 1, 0);

    if (timer.value === 0) {
      pause();
    }
  }, 1000, { immediate: false });

  const startTimer = () => {
    timer.value = RESEND_TIMEOUT;
    resume();
  };

  const toast = useToast();
  const { fetch: fetchSession } = useUserSession();

  const { mutateAsync: updateContact, isPending: isSending } = useUpdateContact();
  const { mutateAsync: verifyContact, isPending: isVerifying } = useVerifyContact();

  const sendCode = async (contact: string) => {
    try {
      await updateContact(contact);
    } catch (error) {
      toast.add({
        color: "error",
        title: "Не вдалося надіслати код",
        description: (error as { data?: { message?: string; }; }).data?.message,
      });

      return false;
    }

    pendingContact.value = contact;
    codeError.value = undefined;
    startTimer();

    return true;
  };

  const start = async (contact: string) => {
    if (pendingContact.value === contact && timer.value > 0) {
      isOpen.value = true;
      return;
    }

    if (await sendCode(contact)) {
      isOpen.value = true;
    }
  };

  const resend = async () => {
    if (pendingContact.value) {
      await sendCode(pendingContact.value);
    }
  };

  const verify = async (code: string) => {
    codeError.value = undefined;

    try {
      await verifyContact({ code });
    } catch {
      codeError.value = "Невірний код. Перевірте його та спробуйте ще раз";
      return false;
    }

    await fetchSession();

    isOpen.value = false;
    pendingContact.value = undefined;
    timer.value = 0;
    pause();

    return true;
  };

  return {
    isOpen,
    pendingContact,
    timer,
    codeError,
    isSending,
    isVerifying,
    start,
    resend,
    verify,
  };
}
