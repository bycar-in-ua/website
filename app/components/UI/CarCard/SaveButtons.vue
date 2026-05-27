<script setup lang="ts">
import SaveIcon from "./SaveIcon.vue";
import type { CardType } from "./interface";

defineProps<{
  carId: number;
  cardType: CardType;
  carTitle: string;
}>();
</script>

<template>
  <div class="flex-col gap-2 ml-auto hidden group-hover:flex">
    <UButton
      variant="outline"
      size="sm"
      class="rounded-full bg-white ring-gray-200 text-primary-900 p-2 hover:ring-primary-500 hover:bg-white hover:text-primary-500"
    >
      <SaveIcon
        :car-id
        :card-type
        :car-title
        class="shrink-0"
      />
    </UButton>

    <!-- Till better times... -->
    <!-- <UButton
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
    </UButton> -->
  </div>
</template>
