<script setup lang="ts">
import type { VehicleView } from "@bycar-in-ua/vehicles-sdk";

defineProps<{
  brand: VehicleView["brand"];
  title: string;
  subtitle?: string;
}>();

const cdnImage = useCdnImage();
</script>

<template>
  <div class="flex items-start gap-4">
    <div v-if="brand?.logo" class="size-14 bg-black flex items-center justify-center shrink-0 p-2">
      <img :src="cdnImage(brand?.logo, 'thumbnail')" :alt="brand.displayName" class="w-full h-full object-contain invert grayscale brightness-100">
    </div>
    <div>
      <h2 class="text-xl font-bold wrap-break-word">
        {{ title }}
      </h2>
      <p v-if="subtitle" class="text-lg font-bold">
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>
