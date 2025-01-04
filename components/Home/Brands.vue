<script setup lang="ts">
import type { Brand } from "@bycar-in-ua/sdk";
import SectionTitle from "@/components/UI/SectionTitle.vue";

defineProps<{ establishedBrands: Brand[] }>();
</script>

<template>
  <section class="my-10 md:my-24">
    <SectionTitle :title="$t('brands')" />
    <div class="flex flex-wrap justify-center gap-5">
      <NuxtLink
        v-for="brand in establishedBrands"
        :key="brand.id"
        :to="{
          path: 'catalog',
          query: {
            brand: brand.id,
          },
        }"
        class="w-20 h-20 shadow-xl rounded-xl flex items-center justify-center p-3 brightness-90 hover:brightness-100 transition-all duration-300"
        :title="brand.displayName"
      >
        <CdnImage
          :src="brand.logo"
          :alt="brand.displayName"
          size="thumbnail"
          loading="lazy"
          :densities="['thumbnail:1x', 'small:2x']"
          class="object-contain"
        />
      </NuxtLink>
    </div>
  </section>
</template>
