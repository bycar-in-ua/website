<script setup lang="ts">
import type { Brand } from "@bycar-in-ua/sdk";

defineProps<{ establishedBrands: Brand[]; }>();
</script>

<template>
  <section class="py-12 bg-black">
    <UMarquee
      :overlay="false"
      pause-on-hover
      :ui="{ root: '[--gap:--spacing(8)]', content: 'w-auto' }"
      :style="{
        '--duration': `${establishedBrands.length * 2}s`,
      }"
      :repeat="8"
    >
      <CdnImage
        v-for="brand in establishedBrands"
        :key="brand.id"
        :src="brand.logo"
        :alt="brand.displayName"
        size="thumbnail"
        loading="lazy"
        :densities="['thumbnail:1x', 'small:2x']"
        class="max-h-26 w-auto max-w-24 py-5 object-contain grayscale invert opacity-60"
      />
    </UMarquee>
  </section>
</template>
