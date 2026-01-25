import { useQuery, type UseQueryReturnType } from "@tanstack/vue-query";
import { useAuthService } from "#layers/auth/composables/useAuthService";
import type { InjectionKey } from "vue";
import type { Profile } from "@bycar-in-ua/sdk";

const provideKey = Symbol("profile") as InjectionKey<UseQueryReturnType<Profile, unknown>>;

export function useProfileProvider() {
  const {
    user, ready, loggedIn,
  } = useUserSession();
  const authService = useAuthService();

  const query = useQuery({
    queryKey: [
      "profile", loggedIn, user.value?.data?.id,
    ],
    queryFn: async () => {
      if (!loggedIn.value) {
        // Will be reworked when non authenticated save car actions are implemented
        return { savedCars: [] } as Profile;
      }

      return authService.getProfile();
    },
    enabled: ready,
  });

  provide(provideKey, query);

  return query;
}

export function useProfile() {
  const profile = inject(provideKey);

  if (!profile) {
    throw new Error("useProfile must be used within a useProfileProvider");
  }

  return profile;
}
