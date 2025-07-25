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
  });

  signInModalStore.openModal(route.fullPath);
};
</script>

<template>
  <UPopover v-if="isSaved">
    <UButton
      variant="ghost"
      color="neutral"
      v-bind="buttonProps"
      title="Авто збережено в закладки"
      :loading="profileStore.loading"
    >
      В закладках

      <template #trailing>
        <UIcon name="i-heroicons-solid-bookmark" class="w-6 h-6 bg-warning" />
      </template>
    </UButton>

    <template #content>
      <div class="flex flex-col gap-2 p-2">
        <UButton variant="ghost" color="neutral" :to="{ name: 'profile' }">
          Перейти до закладок
        </UButton>
        <UButton
          variant="ghost"
          color="error"
          @click="profileStore.removeFromSavedCars(carId, title)"
        >
          Видалити з закладок
        </UButton>
      </div>
    </template>
  </UPopover>

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
      <UIcon name="i-heroicons-solid-bookmark" class="w-6 h-6" />
    </template>
  </UButton>
</template>
