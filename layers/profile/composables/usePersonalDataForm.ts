import * as v from "valibot";
import { useMutation } from "@tanstack/vue-query";
import { phoneRegex, emailSchema } from "#shared/validation";

const profileFormSchema = v.object({
  name: v.string(),
  phone: v.optional(v.pipe(v.string(), v.regex(phoneRegex, "Невірний формат номера телефону"))),
  email: v.optional(emailSchema),
});

type ProfileFormData = v.InferInput<typeof profileFormSchema>;

export function usePersonalDataForm() {
  const { user, fetch: fetchUserSession } = useUserSession();
  const requestFetch = useRequestFetch();

  const state = reactive<ProfileFormData>({
    name: [user?.value?.data?.firstName, user?.value?.data?.lastName].filter(Boolean).join(" ").trim(),
    email: user?.value?.data?.email || "",
    phone: user?.value?.data?.phone || "",
  });

  const toast = useToast();

  const { mutateAsync: updatePersonalData, isPending } = useMutation({
    mutationFn: async (payload: ProfileFormData) => {
      const [firstName = "", ...lastNameParts] = payload.name.split(" ");
      const lastName = lastNameParts.join(" ");

      const updateResponse = await requestFetch("/api/auth/personal-data", {
        method: "PATCH",
        body: {
          firstName,
          lastName,
        },
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
    schema: profileFormSchema,
    updatePersonalData,
    loading: isPending,
  };
}
