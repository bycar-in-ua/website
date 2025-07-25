import { UsersPrivateService, type Profile } from "@bycar-in-ua/sdk";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

export const useProfileStore = defineStore("profile", () => {
  const config = useRuntimeConfig();
  const usersService = UsersPrivateService.create(config.public.apiHost);

  const authStore = useAuthStore();

  const {
    data: profile,
    isLoading: profileLoading,
    isFetched: profileFetched,
  } = useQuery({
    queryKey: ["profile", authStore.userId],
    queryFn: () => usersService.getProfile(),
    placeholderData: () => ({} as Profile),
    enabled: !!authStore.userId,
  });

  const queryClient = useQueryClient();

  const { mutateAsync: updateProfile, isPending: updateProfilePending } =
    useMutation({
      mutationKey: ["update-profile", authStore.userId],
      mutationFn: (payload: Partial<Profile>) => {
        return usersService.updateProfile(payload);
      },
      onSuccess: (data) => {
        queryClient.setQueryData(["profile", authStore.userId], data);
      },
    });

  const loading = computed(
    () => profileLoading.value || updateProfilePending.value,
  );

  const toast = useToast();

  const addToSavedCars = async (carId: number, title?: string) => {
    await updateProfile({
      savedCars: [...(profile.value!.savedCars ?? []), carId],
    });

    toast.add({
      title: "Авто збережено",
      description: `Автомобіль ${title ?? ""} успішно додано до закладок`,
      color: "success",
    });
  };

  const removeFromSavedCars = async (carId: number, title?: string) => {
    await updateProfile({
      savedCars: (profile.value!.savedCars ?? []).filter((id) => id !== carId),
    });

    toast.add({
      title: "Авто видалено",
      description: `Автомобіль ${title ?? ""} успішно видалено з закладок`,
      color: "warning",
    });
  };

  return {
    profile,
    loading,
    profileFetched,
    addToSavedCars,
    removeFromSavedCars,
  };
});
