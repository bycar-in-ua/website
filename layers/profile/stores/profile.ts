import { UsersPrivateService, type Profile } from "@bycar-in-ua/sdk";

export const useProfileStore = defineStore("profile", () => {
  const authStore = useAuthStore();

  const config = useRuntimeConfig();

  const usersService = UsersPrivateService.create(config.public.apiHost);

  const { data: profile, status: profileStatus } = useAsyncData(
    "profile",
    () => usersService.getProfile(),
    {
      default: () => ({} as Profile),
      watch: [() => authStore.user],
      server: false,
      transform: (data) => {
        if (!data) {
          return {} as Profile;
        }

        return data;
      },
    },
  );

  const { execute: updateProfile, status: updateProfileStatus } = useAsyncData(
    "update-profile",
    async () => {
      const updatedProfile = await usersService.updateProfile(profile.value);

      profile.value = updatedProfile;
    },
    {
      immediate: false,
    },
  );

  const loading = computed(
    () =>
      profileStatus.value === "pending" ||
      updateProfileStatus.value === "pending",
  );

  const updateSavedCars = async (ids: number[]) => {
    profile.value.savedCars = ids;

    await updateProfile();
  };

  const toast = useToast();

  const addToSavedCars = async (carId: number, title?: string) => {
    await updateSavedCars([...(profile.value?.savedCars ?? []), carId]);

    toast.add({
      title: "Авто збережено",
      description: `Автомобіль ${title ?? ""} успішно додано до закладок`,
      color: "success",
    });
  };

  const removeFromSavedCars = async (carId: number, title?: string) => {
    await updateSavedCars(
      (profile.value?.savedCars ?? []).filter((id) => id !== carId),
    );

    toast.add({
      title: "Авто видалено",
      description: `Автомобіль ${title ?? ""} успішно видалено з закладок`,
      color: "warning",
    });
  };

  return {
    profile,
    loading,
    addToSavedCars,
    removeFromSavedCars,
  };
});
