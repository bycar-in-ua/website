import { updatePersonalInput } from "@bycar-in-ua/auth-sdk";
import { useMutation } from "@tanstack/vue-query";
import * as v from "valibot";

const schema = v.pick(updatePersonalInput, ["name"]);

type PersonalDataInput = v.InferInput<typeof schema>;

export function usePersonalDataForm() {
  const { user, fetch: fetchUserSession } = useUserSession();
  const requestFetch = useRequestFetch();

  const savedName = computed(() => [user?.value?.data?.firstName, user?.value?.data?.lastName].filter(Boolean).join(" ").trim());

  const state = reactive({
    name: savedName.value,
    email: user?.value?.data?.email || "",
    phone: user?.value?.data?.phone || "",
  });

  watchEffect(() => {
    state.name = savedName.value;
    state.email = user?.value?.data?.email || "";
    state.phone = user?.value?.data?.phone || "";
  });

  const isNameChanged = computed(() => state.name.trim() !== savedName.value);

  const toast = useToast();

  const { mutateAsync: updatePersonalData, isPending } = useMutation({
    mutationFn: (payload: PersonalDataInput) => requestFetch("/api/auth/personal-data", {
      method: "PATCH",
      body: { name: payload.name },
    }),
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
    schema,
    isNameChanged,
    updatePersonalData,
    loading: isPending,
  };
}
