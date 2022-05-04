<template>
  <section class="bycar-container section high-bottom">
    <SectionTitle title="Марки автомобилей" />
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      <NuxtLink
        v-for="brand in establishedBrands"
        :key="brand.id"
        :to="`/catalog/${brand.slug}`"
        class="flex items-center justify-center"
      >
        <img
          :src="$cdnLink(brand.logo, 0, 100)"
          class="rounded-full w-10 h-10 mr-4 object-contain"
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
</script>
