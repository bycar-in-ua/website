<script setup lang="ts">
import type { VehicleView } from "@bycar-in-ua/vehicles-sdk";

defineProps<{
  brand: VehicleView["brand"];
  title: string;
  subtitle?: string;
  size?: "sm" | "md";
}>();

const cdnImage = useCdnImage();
</script>

<template>
  <div class="flex items-center gap-4">
    <div
      v-if="brand?.logo"
      class="bg-black flex items-center justify-center shrink-0 p-2"
      :class="{
        'size-12': size === 'sm',
        'size-14': size === 'md' || !size,
      }"
    >
      <img :src="cdnImage(brand?.logo, 'thumbnail')" :alt="brand.displayName" class="w-full h-full object-contain invert grayscale brightness-100">
    </div>
    <div>
      <h2
        class="font-bold wrap-break-word"
        :class="{
          'text-lg': size === 'sm',
          'text-xl': size === 'md' || !size,
        }"
      >
        {{ title }}
      </h2>
      <p
        v-if="subtitle"
        class="font-bold"
        :class="{
          'text-base': size === 'sm',
          'text-lg': size === 'md' || !size,
        }"
      >
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>
