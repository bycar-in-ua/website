<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";
import { useProfile } from "#layers/profile/composables/useProfile";

const props = defineProps<{
  buttonProps?: ButtonProps;
  carId: number;
  title?: string;
}>();

const { handleSave, handleRemove } = useSavedCarActions();

const profile = useProfile();

const isSaved = computed(() =>
  profile.data.value?.savedCars?.includes(props.carId),
);
</script>

<template>
  <UTooltip :text="isSaved ? 'Авто збережено в закладки' : 'Зберегти авто'">
    <template #default>
      <slot
        :is-saved="isSaved"
        :handle-save="handleSave"
        :handle-remove="handleRemove"
        :loading="profile.isLoading.value"
      >
        <UButton
          v-if="isSaved"
          label="Авто збережено"
          variant="outline"
          color="primary"
          icon="i-heroicons-heart-solid"
          v-bind="buttonProps"
          :loading="profile.isLoading.value"
          @click="handleRemove(carId, title)"
        />

        <UButton
          v-else
          label="Зберегти авто"
          variant="outline"
          color="primary"
          icon="i-heroicons-heart"
          v-bind="buttonProps"
          :loading="profile.isLoading.value"
          @click="handleSave(carId, title)"
        />
      </slot>
    </template>
  </UTooltip>
</template>
