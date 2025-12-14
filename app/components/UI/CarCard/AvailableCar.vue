<script setup lang="ts">
import type { Vehicle } from "@bycar-in-ua/sdk";
import CarCardTemplate from "./CarCardTemplate.vue";

const props = defineProps<{
  car: Vehicle;
  title?: string;
  discount?: boolean;
  isSaved?: boolean;
  toggleSave?: (carId: number, title?: string) => Promise<void>;
}>();

// TODO:use real data
const price = 26722;
</script>

<template>
  <CarCardTemplate v-bind="props">
    <template #badge>
      <div
        class="bg-white text-black text-xs font-semibold border border-gray-100 px-1.5 py-1 flex items-center justify-center gap-1"
      >
        <UIcon name="i-lucide-clock" class="w-4 h-4" />
        Доступно зараз
      </div>
    </template>

    <template #price>
      <span class="text-black text-lg font-bold">${{ price }}</span>
    </template>
  </CarCardTemplate>
</template>
