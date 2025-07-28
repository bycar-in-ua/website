import type { NavigationMenuItem } from "@nuxt/ui";

import { PersonalProfile, SavedCars } from "../components/NavButtons";

const personalProfileMenuItem: NavigationMenuItem = {
  label: "Аккаунт",
  to: { name: "profile-personal" },
};

export function useProfileNavigation() {
  const profileStore = useProfileStore();

  const savedCarsMenuItem = computed<NavigationMenuItem>(() => ({
    label: "Збережені авто",
    to: { name: "saved-cars" },
    badge: profileStore.profile?.savedCars?.length
      ? {
          label: profileStore.profile?.savedCars?.length,
          color: "primary",
          variant: "solid",
          class: "rounded-full",
        }
      : undefined,
  }));

  return {
    personalProfileMenuItem,
    PersonalProfileNavButton: PersonalProfile,

    savedCarsMenuItem,
    SavedCarsNavButton: SavedCars,
  };
}
