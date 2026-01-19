import { UsersPrivateService, type Profile } from "@bycar-in-ua/sdk";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { useAuthStore } from "#layers/profile/stores/auth";

export const useProfileStore = defineStore("profile", () => {
  const config = useRuntimeConfig();
  const usersService = UsersPrivateService.create(config.public.apiHost);

  const authStore = useAuthStore();

  const {
    data: profile,
    isLoading: profileLoading,
    isFetched: profileFetched,
  } = useQuery({
    queryKey: ["profile", () => authStore.userId],
    queryFn: () => $fetch("/api/auth/profile"),
    // placeholderData: () => ({} as Profile),
    enabled: () => !!authStore.userId,
  });

  const queryClient = useQueryClient();

  const { mutateAsync: updateProfile, isPending: updateProfilePending }
    = useMutation({
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

  return {
    profile,
    loading,
    profileFetched,
    updateProfile,
  };
});
