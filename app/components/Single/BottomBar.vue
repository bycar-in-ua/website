<script setup lang="ts">
import ToolBar from "./ToolBar.vue";

defineProps<{
  carId: number;
  carTitle?: string;
  selectedComplectation?: string;
  haveAvailableVehicles?: boolean;
}>();
</script>

<template>
  <div class="bg-default">
    <div class="container px-4 sm:px-5 py-4 flex items-center">
      <div class="hidden sm:block">
        <h3 class="text-xl font-semibold">
          {{ carTitle }}
        </h3>

        <p v-if="selectedComplectation" class="text-muted">
          {{ selectedComplectation }}
        </p>
      </div>

      <ToolBar
        class="sm:ml-auto w-full sm:w-auto"
        :car-id
        :car-title
        :have-available-vehicles
      />
    </div>
  </div>
</template>
