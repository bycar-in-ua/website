export function useSavedCarActions() {
  const authStore = useAuthStore();
  const profileStore = useProfileStore();
  const signInModalStore = useSignInModalStore();

  const toast = useToast();
  const route = useRoute();

  const handleSave = async (carId: number, title?: string) => {
    if (authStore.authenticated) {
      await profileStore.updateProfile({
        savedCars: [...(profileStore.profile!.savedCars ?? []), carId],
      });

      toast.add({
        title: "Авто збережено",
        description: `Автомобіль ${title ?? ""} успішно додано до закладок`,
        color: "success",
        duration: 2000,
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
    await profileStore.updateProfile({
      savedCars: (profileStore.profile!.savedCars ?? []).filter(
        (id) => id !== carId,
      ),
    });

    toast.add({
      title: "Авто видалено",
      description: `Автомобіль ${title ?? ""} успішно видалено з закладок`,
      color: "warning",
      duration: 2000,
    });
  };

  const toggleSave = async (carId: number, title?: string) => {
    if (profileStore.profile?.savedCars?.includes(carId)) {
      await handleRemove(carId, title);

      return;
    }

    await handleSave(carId, title);
  };

  return {
    handleSave,
    handleRemove,
    toggleSave,
  };
}
