<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import SectionTitle from "~/components/UI/SectionTitle.vue";

const brandService = useBrandService();

// Temporary duplicated query, here we will show dealers logos, not brands
const { data: brands, suspense } = useQuery({
  queryKey: ["established-brands"],
  queryFn: () => brandService.getBrands(),
  placeholderData: () => [],
});

await suspense();
</script>

<template>
  <section class="container py-12 sm:py-16 md:py-20">
    <SectionTitle :title="['Наші партнери', 'Тільки офіційні дилери']" class="mb-8 lg:mb-0" />

    <UMarquee
      :overlay="false"
      pause-on-hover
      :ui="{ root: 'py-8 lg:py-12 [--gap:--spacing(8)]', content: 'w-auto' }"
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
        class="max-h-26 w-auto max-w-24 py-5 object-contain grayscale invert"
      />
    </UMarquee>
  </section>
</template>
