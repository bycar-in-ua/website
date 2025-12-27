<script setup lang="ts">
import SaveIcon from "./SaveIcon.vue";
import CompareIcon from "./CompareIcon.vue";
import { useProfileStore } from "~~/layers/profile/stores/profile";

const props = defineProps<{
  carId: number;
  carTitle: string;
  isSaved?: boolean;
  isCompared?: boolean;
}>();

const { toggleSave, toggleCompare } = useSavedCarActions();

const profileStore = useProfileStore();

const isSaved =
  props.isSaved ?? profileStore.profile?.savedCars?.includes(props.carId);

// TODO: add `profileStore.profile?.comparedCars`
const isCompared = props.isCompared;
</script>

<template>
  <div class="flex-col gap-2 ml-auto hidden group-hover:flex">
    <UButton
      v-if="toggleSave"
      variant="outline"
      size="sm"
      class="rounded-full bg-white ring-gray-200 text-primary-900 p-2 hover:ring-primary-500 hover:bg-white hover:text-primary-500"
    >
      <SaveIcon
        :is-saved
        :car-id="carId"
        :title="carTitle"
        :toggle-save="toggleSave"
        class="shrink-0"
      />
    </UButton>

    <UButton
      v-if="toggleCompare"
      variant="outline"
      size="sm"
      class="rounded-full bg-white ring-gray-200 text-primary-900 p-2 hover:ring-primary-500 hover:bg-white hover:text-primary-500"
    >
      <CompareIcon
        :is-compared
        :car-id="carId"
        :title="carTitle"
        :toggle-compare="toggleCompare"
        class="shrink-0"
      />
    </UButton>
  </div>
</template>
