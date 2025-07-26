<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";

const props = defineProps<{
  buttonProps?: ButtonProps;
  carId: number;
  title?: string;
}>();

const authStore = useAuthStore();
const profileStore = useProfileStore();
const signInModalStore = useSignInModalStore();

const isSaved = computed(() =>
  profileStore.profile?.savedCars?.includes(props.carId),
);

const toast = useToast();
const route = useRoute();

const handleSave = () => {
  if (authStore.authenticated) {
    profileStore.addToSavedCars(props.carId, props.title);

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
</script>

<template>
  <UButton
    v-if="isSaved"
    variant="ghost"
    color="neutral"
    v-bind="buttonProps"
    title="Авто збережено в закладки"
    :loading="profileStore.loading"
    @click="profileStore.removeFromSavedCars(carId, title)"
  >
    В закладках

    <template #trailing>
      <UIcon name="i-heroicons-solid-heart" class="w-6 h-6 bg-primary" />
    </template>
  </UButton>

  <UButton
    v-else
    variant="ghost"
    color="neutral"
    v-bind="buttonProps"
    title="Зберегти авто"
    :loading="profileStore.loading"
    @click="handleSave"
  >
    Зберегти авто

    <template #trailing>
      <UIcon name="i-heroicons-heart" class="w-6 h-6 bg-primary" />
    </template>
  </UButton>
</template>
