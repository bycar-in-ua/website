import { ImagesPrivateService, type ReducedUser } from "@bycar-in-ua/sdk";
import { useMutation } from "@tanstack/vue-query";
import { useAuthService } from "#layers/auth/composables/useAuthService";

export function usePersonalDataForm() {
  const { user, fetch: fetchUserSession } = useUserSession();

  const state = reactive<Partial<ReducedUser>>({
    firstName: user?.value?.data?.firstName || "",
    lastName: user?.value?.data?.lastName || "",
    avatar: user?.value?.data?.avatar || "",
    email: user?.value?.data?.email || "",
    phone: user?.value?.data?.phone || "",
  });

  const config = useRuntimeConfig();

  const imagesService = ImagesPrivateService.create(config.public.apiHost);
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

  const isUploadingAvatar = ref(false);

  const uploadAvatar = async (file: File) => {
    try {
      isUploadingAvatar.value = true;

      const formData = new FormData();

      formData.append(file.name, file);

      formData.append("path", "avatars");

      const [avatar] = await imagesService.uploadImages(formData);

      state.avatar = avatar?.path;

      updatePersonalData(state);
    } catch {
      toast.add({
        title: "Помилка оновлення",
        description: "Не вдалося оновити персональні дані. Спробуйте ще раз",
        color: "error",
      });
    } finally {
      isUploadingAvatar.value = false;
    }
  };

  const removeAvatar = () => {
    state.avatar = "";
    updatePersonalData(state);
  };

  return {
    state,
    updatePersonalData,
    loading: isPending,
    uploadAvatar,
    isUploadingAvatar,
    removeAvatar,
  };
}
