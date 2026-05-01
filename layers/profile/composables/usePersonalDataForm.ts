import { updatePersonalInput, type UpdatePersonalInput } from "@bycar-in-ua/auth-sdk";
import { useMutation } from "@tanstack/vue-query";

export function usePersonalDataForm() {
  const { user, fetch: fetchUserSession } = useUserSession();
  const requestFetch = useRequestFetch();

  const state = reactive<UpdatePersonalInput>({
    name: [user?.value?.data?.firstName, user?.value?.data?.lastName].filter(Boolean).join(" ").trim(),
    email: user?.value?.data?.email || "",
    phone: user?.value?.data?.phone || "",
  });

  watchEffect(() => {
    state.name = [user?.value?.data?.firstName, user?.value?.data?.lastName].filter(Boolean).join(" ").trim();
    state.email = user?.value?.data?.email || "";
    state.phone = user?.value?.data?.phone || "";
  });

  const toast = useToast();

  const { mutateAsync: updatePersonalData, isPending } = useMutation({
    mutationFn: async (payload: UpdatePersonalInput) => {
      const updateResponse = await requestFetch("/api/auth/personal-data", {
        method: "PATCH",
        body: payload,
      });

      const { email, phone } = payload;

      if (email && email !== user?.value?.data?.email) {
        toast.add({
          color: "warning",
          title: "Підтвердження електронної пошти",
          description: "UNSUPPORTED! FIX IT!",
        });
      }

      if (phone && phone !== user?.value?.data?.phone) {
        toast.add({
          color: "warning",
          title: "Підтвердження номера телефону",
          description: "UNSUPPORTED! FIX IT!",
        });
      }

      return updateResponse;
    },
    onSuccess: async () => {
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
    schema: updatePersonalInput,
    updatePersonalData,
    loading: isPending,
  };
}
