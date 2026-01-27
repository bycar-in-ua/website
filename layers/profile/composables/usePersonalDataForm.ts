import { ImagesPrivateService, UsersPrivateService, type ReducedUser } from "@bycar-in-ua/sdk";

export function usePersonalDataForm() {
  const { user } = useUserSession();

  const state = reactive<Partial<ReducedUser>>({
    firstName: user?.value?.data?.firstName || "",
    lastName: user?.value?.data?.lastName || "",
    avatar: user?.value?.data?.avatar || "",
    email: user?.value?.data?.email || "",
    phone: user?.value?.data?.phone || "",
  });

  const config = useRuntimeConfig();

  const usersService = UsersPrivateService.create(config.public.apiHost);
  const imagesService = ImagesPrivateService.create(config.public.apiHost);
  const toast = useToast();

  const { execute: updatePersonalData, status: updateStatus } = useAsyncData(
    "update-personal-data",
    async () => {
      try {
        const updatedUser = await usersService.updatePersonalData(state);

        if (updatedUser) {
          // TODO: Refresh token to update session after updating profile
          // authStore.user = updatedUser;
        }

        toast.add({
          title: "Успішно оновлено",
          description: "Ваші персональні дані було оновлено",
          color: "success",
        });

        return updatedUser;
      } catch {
        toast.add({
          title: "Помилка оновлення",
          description: "Не вдалося оновити персональні дані. Спробуйте ще раз",
          color: "error",
        });
      }
    },
    { immediate: false },
  );

  const isUploadingAvatar = ref(false);

  const uploadAvatar = async (file: File) => {
    try {
      isUploadingAvatar.value = true;

      const formData = new FormData();

      formData.append(file.name, file);

      formData.append("path", "avatars");

      const [avatar] = await imagesService.uploadImages(formData);

      state.avatar = avatar?.path;

      updatePersonalData();
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
    updatePersonalData();
  };

  const loading = computed(() => updateStatus.value === "pending");

  return {
    state,
    updatePersonalData,
    loading,
    uploadAvatar,
    isUploadingAvatar,
    removeAvatar,
  };
}
