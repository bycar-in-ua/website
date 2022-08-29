<template>
  <section class="bycar-container section high-bottom">
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
        class="flex items-center justify-center text-xl"
      >
        <img
          :src="$cdnLink(brand.logo, 0, 150)"
          :alt="brand.displayName"
          class="rounded-full w-12 h-12 mr-4 object-contain"
        />
        <h4 v-text="brand.displayName" />
      </NuxtLink>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "Brands",
};
</script>

<script setup lang="ts">
import SectionTitle from "@/components/common/SectionTitle.vue";

import { useHomeStore } from "@/stores/home";

const { establishedBrands } = useHomeStore();

const { $t } = useNuxtApp();
</script>
