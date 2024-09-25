<script setup lang="ts">
import SectionTitle from "@/components/UI/SectionTitle.vue";

import { useHomeStore } from "@/stores/home";

const { establishedBrands } = useHomeStore();
</script>

<template>
  <section class="my-24">
    <SectionTitle :title="$t('brands')" />
    <div class="flex flex-wrap justify-center gap-5">
      <NuxtLink
        v-for="brand in establishedBrands"
        :key="brand.id"
        :to="{
          path: 'catalog',
          query: {
            brand: brand.slug,
          },
        }"
        class="w-20 h-20 shadow-xl rounded-xl flex items-center justify-center p-3 brightness-90 hover:brightness-100 transition-all duration-300"
        :title="brand.displayName"
      >
        <img
          :src="$cdnLink(brand.logo, 0, 150)"
          :alt="brand.displayName"
          class="object-contain"
        />
      </NuxtLink>
    </div>
  </section>
</template>
