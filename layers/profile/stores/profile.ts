import { UsersPrivateService, type Profile } from "@bycar-in-ua/sdk";
import { useMutation } from "@tanstack/vue-query";
import { useAuthStore } from "#layers/profile/stores/auth";

export const useProfileStore = defineStore("profile", () => {
  const config = useRuntimeConfig();
  const usersService = UsersPrivateService.create(config.public.apiHost);

  const authStore = useAuthStore();

  const {
    data: profile,
    pending: profileLoading,
    status,
    refresh,
  } = useFetch(`/api/auth/profile`, { watch: [() => authStore.userId] });

  const profileFetched = computed(() => status.value !== "idle");

  const { mutateAsync: updateProfile, isPending: updateProfilePending }
    = useMutation({
      mutationKey: ["update-profile", authStore.userId],
      mutationFn: (payload: Partial<Profile>) => {
        return usersService.updateProfile(payload);
      },
      // Probably there should be a better way to update the profile data
      onSuccess: () => refresh(),
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
