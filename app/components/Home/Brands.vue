<script setup lang="ts">
import { useBrands } from "~/composables/useBrands";

const { data: brands, suspense } = useBrands();

await suspense();
</script>

<template>
  <section class="py-12 bg-black">
    <UMarquee
      :overlay="false"
      pause-on-hover
      :ui="{ root: '[--gap:--spacing(8)]', content: 'w-auto' }"
      :style="{
        '--duration': `${(brands?.length || 1) * 2}s`,
      }"
      :repeat="8"
    >
      <CdnImage
        v-for="brand in brands"
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
