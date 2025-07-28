<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";

const props = defineProps<{
  buttonProps?: ButtonProps;
  carId: number;
  title?: string;
}>();

const { handleSave, handleRemove } = useSavedCarActions();

const profileStore = useProfileStore();

const isSaved = computed(() =>
  profileStore.profile?.savedCars?.includes(props.carId),
);
</script>

<template>
  <UButton
    v-if="isSaved"
    variant="ghost"
    color="neutral"
    v-bind="buttonProps"
    title="Авто збережено в закладки"
    :loading="profileStore.loading"
    @click="handleRemove(carId, title)"
  >
    В закладках

    <template #trailing>
      <UIcon name="i-heroicons-heart-solid" class="size-6 text-primary" />
    </template>
  </UButton>

  <UButton
    v-else
    variant="ghost"
    color="neutral"
    v-bind="buttonProps"
    title="Зберегти авто"
    :loading="profileStore.loading"
    @click="handleSave(carId, title)"
  >
    Зберегти авто

    <template #trailing>
      <UIcon name="i-heroicons-heart" class="size-6 text-current" />
    </template>
  </UButton>
</template>
