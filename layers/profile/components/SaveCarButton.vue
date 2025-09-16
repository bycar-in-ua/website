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
  <UTooltip :text="isSaved ? 'Авто збережено в закладки' : 'Зберегти авто'">
    <template #default>
      <slot
        :is-saved="isSaved"
        :handle-save="handleSave"
        :handle-remove="handleRemove"
        :loading="profileStore.loading"
      >
        <UButton
          v-if="isSaved"
          label="Авто збережено"
          variant="outline"
          color="primary"
          icon="i-heroicons-heart-solid"
          v-bind="buttonProps"
          :loading="profileStore.loading"
          @click="handleRemove(carId, title)"
        />

        <UButton
          v-else
          label="Зберегти авто"
          variant="outline"
          color="primary"
          icon="i-heroicons-heart"
          v-bind="buttonProps"
          :loading="profileStore.loading"
          @click="handleSave(carId, title)"
        />
      </slot>
    </template>
  </UTooltip>
</template>
