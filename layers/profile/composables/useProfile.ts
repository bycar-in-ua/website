import { useQuery, type UseQueryReturnType } from "@tanstack/vue-query";
import type { InjectionKey } from "vue";
import type { Profile } from "@bycar-in-ua/sdk";

const provideKey = Symbol("profile") as InjectionKey<UseQueryReturnType<Profile, unknown>>;

export function useProfileProvider() {
  const {
    user, ready, loggedIn,
  } = useUserSession();
  const requestFetch = useRequestFetch();

  const query = useQuery({
    queryKey: [
      "profile", loggedIn, user.value?.data?.id,
    ],
    queryFn: async () => {
      if (!loggedIn.value) {
        return { savedCars: [] } as Profile;
      }

      return requestFetch("/api/profile");
    },
    enabled: ready,
    placeholderData: () => ({ savedCars: [] } as Profile),
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
