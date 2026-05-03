<script setup lang="ts">
import type { VehicleView } from "@bycar-in-ua/vehicles-sdk";
import { twMerge } from "tailwind-merge";

defineProps<{
  brand: VehicleView["brand"];
  title: string;
  subtitle?: string;
  size?: "sm" | "md";
  logoClass?: string;
}>();

const cdnImage = useCdnImage();
</script>

<template>
  <div class="flex items-center gap-4">
    <div
      v-if="brand?.logo"
      :class="twMerge('bg-black flex items-center justify-center shrink-0 p-2 size-14', logoClass)"
    >
      <img :src="cdnImage(brand?.logo, 'thumbnail')" :alt="brand.displayName" class="w-full h-full object-contain invert grayscale brightness-100">
    </div>
    <div>
      <h2
        class="font-bold wrap-break-word text-lg"
        :class="{
          'md:text-xl': size === 'md' || !size,
        }"
      >
        {{ title }}
      </h2>
      <p
        v-if="subtitle"
        class="font-bold"
        :class="{
          'text-base': size === 'sm',
          'md:text-lg': size === 'md' || !size,
        }"
      >
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>
