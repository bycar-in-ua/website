import type { Profile } from "@bycar-in-ua/auth-sdk";
import { useMutation } from "@tanstack/vue-query";
import { useSignInModalStore } from "#layers/profile/stores/sign-in-modal";
import { useAuthService } from "./useAuthService";

export function useSavedCarActions() {
  const { user, loggedIn } = useUserSession();
  const authService = useAuthService();
  const toast = useToast();
  const route = useRoute();
  const { gtag } = useGtag();

  const signInModalStore = useSignInModalStore();

  const profile = useProfile();

  const { mutateAsync: updateProfile, isPending }
    = useMutation({
      mutationKey: ["update-profile", user.value?.data?.id],
      mutationFn: (payload: Partial<Profile>) => {
        return authService.updateProfile(payload);
      },
      onSuccess: () => profile.refetch(),
    });

  const handleSave = async (carId: number, title?: string) => {
    if (loggedIn) {
      await updateProfile({ savedCars: [...(profile.data.value?.savedCars ?? []), carId] });

      toast.add({
        title: "Авто збережено",
        description: `Автомобіль ${title ?? ""} успішно додано до закладок`,
        color: "success",
        duration: 2000,
      });

      gtag("event", "save_car", {
        event_category: "engagement",
        event_label: "save_car",
      });

      return;
    }

    toast.add({
      title: "Ви не авторизовані",
      description: "Для збереження авто в закладки необхідно увійти в аккаунт",
      color: "warning",
      duration: 3000,
    });

    signInModalStore.openModal(route.fullPath);
  };

  const handleRemove = async (carId: number, title?: string) => {
    await updateProfile({
      savedCars: (profile.data.value?.savedCars ?? []).filter(
        (id) => id !== carId,
      ),
    });

    toast.add({
      title: "Авто видалено",
      description: `Автомобіль ${title ?? ""} успішно видалено з закладок`,
      color: "warning",
      duration: 2000,
    });

    gtag("event", "remove_saved_car", {
      event_category: "engagement",
      event_label: "remove_saved_car",
    });
  };

  const toggleSave = async (carId: number, title?: string) => {
    if (profile.data.value?.savedCars?.includes(carId)) {
      await handleRemove(carId, title);

      return;
    }

    await handleSave(carId, title);
  };

  const toggleCompare = async (carId: number, title?: string) => {
    // TODO
    console.log(carId, title);
  };

  return {
    handleSave,
    handleRemove,
    toggleSave,
    toggleCompare,
    isPending,
  };
}
