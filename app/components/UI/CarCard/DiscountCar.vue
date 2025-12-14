<script setup lang="ts">
import type { Vehicle } from "@bycar-in-ua/sdk";
import { getCarTitle } from "~/utils/carHelpers.js";
import CarCardTemplate from "./CarCardTemplate.vue";

const props = defineProps<{
  car: Vehicle;
  title?: string;
  discount?: boolean;
  isSaved?: boolean;
  toggleSave?: (carId: number, title?: string) => Promise<void>;
}>();

const carTitle = computed(() => props.title ?? getCarTitle(props.car));

// TODO:use real data
const location = "Київ, Автодім Атлант Київ Захід";
const fullPrice = 30390;
const price = 26722;
</script>

<template>
  <CarCardTemplate v-bind="props">
    <template #badge>
      <div
        class="bg-white text-black text-xs font-semibold border border-gray-100 px-1.5 py-1 flex items-center justify-center gap-1"
      >
        <UIcon name="i-lucide-percent" class="w-4 h-4" />
        Знижка
      </div>
    </template>

    <template #header>
      <div class="space-y-1.5">
        <div class="text-gray-500 flex items-center gap-1">
          <UIcon name="i-lucide-map-pin" />
          {{ location }}
        </div>

        <h3 class="text-lg font-bold">{{ carTitle }}</h3>
      </div>
    </template>

    <template #price>
      <span class="text-gray-500 text-base font-medium line-through">
        ${{ fullPrice }}
      </span>
      <span class="text-black text-lg font-bold">${{ price }}</span>
    </template>
  </CarCardTemplate>
</template>
