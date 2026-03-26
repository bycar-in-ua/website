import type { ReducedUser } from "@bycar-in-ua/auth-sdk";
import { useMutation } from "@tanstack/vue-query";
import { useAuthService } from "#layers/auth/composables/useAuthService";

export function usePersonalDataForm() {
  const { user, fetch: fetchUserSession } = useUserSession();

  const state = reactive<Partial<ReducedUser>>({
    firstName: user?.value?.data?.firstName || "",
    lastName: user?.value?.data?.lastName || "",
    email: user?.value?.data?.email || "",
    phone: user?.value?.data?.phone || "",
  });

  const authService = useAuthService();
  const toast = useToast();

  const { mutateAsync: updatePersonalData, isPending } = useMutation({
    mutationFn: (payload: Partial<ReducedUser>) => authService.updatePersonalData(payload),
    onSuccess: async () => {
      await $fetch("/api/auth/refresh");
      await fetchUserSession();

      toast.add({
        title: "Успішно оновлено",
        description: "Ваші персональні дані було оновлено",
        color: "success",
      });
    },
    onError: () => {
      toast.add({
        title: "Помилка оновлення",
        description: "Не вдалося оновити персональні дані. Спробуйте ще раз",
        color: "error",
      });
    },
  });

  return {
    state,
    updatePersonalData,
    loading: isPending,
  };
}
