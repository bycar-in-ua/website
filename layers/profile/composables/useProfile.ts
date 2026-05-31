import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryReturnType,
} from "@tanstack/vue-query";
import type { InjectionKey } from "vue";
import type { Profile } from "@bycar-in-ua/auth-sdk";
import type { CardType } from "~/components/UI/CarCard/interface";
import { useAuthSlideoverStore } from "#layers/auth/stores/auth-slideover";

type ToggleFavoritePayload = {
  carId: number;
  carType: CardType;
};

interface ProfileAPI {
  profile: UseQueryReturnType<Profile, unknown>;
  toggleFavorite: (payload: ToggleFavoritePayload) => Promise<unknown>;
  isSaving: Ref<boolean>;
  totalSavedCars: ComputedRef<number>;
}

const provideKey = Symbol("profile") as InjectionKey<ProfileAPI>;

const createSavePayload = (profile: Profile, { carId, carType }: ToggleFavoritePayload): [profile: Profile, isRemoving: boolean] => {
  const savedCars = [...(profile?.savedCars ?? [])];
  const savedAvailableCars = [...(profile?.savedAvailableCars ?? [])];
  const targetSavedCars = carType === "model" ? savedCars : savedAvailableCars;
  const isRemoving = targetSavedCars.includes(carId);

  return [
    {
      savedCars: carType === "model"
        ? isRemoving
          ? savedCars.filter((id) => id !== carId)
          : [carId, ...savedCars]
        : savedCars,
      savedAvailableCars: carType === "available"
        ? isRemoving
          ? savedAvailableCars.filter((id) => id !== carId)
          : [carId, ...savedAvailableCars]
        : savedAvailableCars,
    },
    isRemoving,
  ];
};

export function useProfileProvider() {
  const {
    user, ready, loggedIn,
  } = useUserSession();
  const requestFetch = useRequestFetch();

  const profile = useQuery({
    queryKey: [
      "profile", loggedIn, user.value?.data?.id,
    ],
    queryFn: async () => {
      if (!loggedIn.value) {
        return {
          savedCars: [],
          savedAvailableCars: [],
        };
      }

      return requestFetch("/api/profile");
    },
    enabled: ready,
    placeholderData: () => ({
      savedCars: [],
      savedAvailableCars: [],
    }),
  });

  const toast = useToast();
  const route = useRoute();
  const { gtag } = useGtag();
  const authSlideoverStore = useAuthSlideoverStore();
  const queryCLient = useQueryClient();

  const { mutateAsync: toggleFavorite, isPending: isSaving } = useMutation({
    mutationKey: ["toggle-favorite-car", user.value?.data.id],
    mutationFn: async (payload: ToggleFavoritePayload) => {
      if (!loggedIn.value) {
        throw new Error("Ви не авторизовані");
      }

      const [body, isRemoving] = createSavePayload(profile.data.value!, payload);

      const data = await requestFetch("/api/profile", {
        method: "PATCH",
        body,
      });

      return {
        data,
        isRemoving,
      };
    },
    onSuccess: ({ data, isRemoving }) => {
      queryCLient.setQueryData([
        "profile", loggedIn, user.value?.data?.id,
      ], () => data);

      toast.add({
        description: isRemoving ? "Прибрали з обраного. Може, знайдеться щось краще?" : "Гарний вибір! Додали до ваших обраних авто.",
        color: "neutral",
        duration: 3000,
      });

      gtag("event",
        isRemoving ? "remove_saved_car" : "save_car",
        {
          event_category: "engagement",
          event_label: isRemoving ? "remove_saved_car" : "save_car",
        });
    },
    onError: (error) => {
      if (!loggedIn.value) {
        toast.add({
          title: "Ви не авторизовані",
          description: "Для збереження авто в закладки необхідно увійти в аккаунт",
          color: "warning",
          duration: 3000,
        });

        authSlideoverStore.openSlideover(route.fullPath);

        return;
      }

      toast.add({
        title: "Помилка при збереженні авто",
        description: error.message,
        color: "error",
        duration: 3000,
      });
    },
  });

  const totalSavedCars = computed(() => {
    const savedModels = profile.data.value?.savedCars?.length || 0;
    const savedAvailable = profile.data.value?.savedAvailableCars?.length || 0;
    return savedModels + savedAvailable;
  });

  const api: ProfileAPI = {
    profile,
    toggleFavorite,
    isSaving,
    totalSavedCars,
  };

  provide(provideKey, api);

  return api;
}

export function useProfile() {
  const profile = inject(provideKey);

  if (!profile) {
    if (import.meta.dev) {
      return useProfileProvider();
    }

    throw new Error("useProfile must be used within a useProfileProvider");
  }

  return profile;
}
