<template>
  <section class="bycar-container section high-bottom">
    <SectionTitle title="Марки автомобилей" />
    <div class="flex flex-wrap justify-center gap-8">
      <NuxtLink
        v-for="brand in establishedBrands"
        :key="brand.id"
        :to="`/${brand.name}`"
        class="text-center hover:text-primary"
      >
        <img
          :src="$cdnLink(brand.logo, 0, 50)"
          class="w-12 h-12 mx-auto mb-4 object-contain"
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
