<script setup lang="ts">
import type { InfoBullet } from "./helpers";

defineProps<{
  carTitle?: string;
  infoBullets?: InfoBullet[];
  priceRange?: string;
}>();
</script>

<template>
  <div class="relative flex flex-col p-4 z-30 bg-white">
    <div class="space-y-4.5">
      <slot name="header">
        <h3 class="text-lg font-bold">
          {{ carTitle }}
        </h3>
      </slot>

      <ul class="flex flex-wrap gap-1.5 text-gray-700 text-sm font-semibold">
        <li
          v-for="(bullet, index) in infoBullets"
          :key="index"
          class="px-1.5 py-1 border border-gray-100 font-semibold w-fit"
        >
          {{ bullet.text }}
        </li>
      </ul>

      <div class="space-x-2">
        <slot name="price">
          <span class="text-black text-lg font-bold">{{ priceRange }}</span>
        </slot>
      </div>
    </div>
  </div>
</template>
