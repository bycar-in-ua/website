<script setup lang="ts">
import SectionTitle from "./SectionTitle.vue";

defineProps<{
  title: string[];
  bgUrl?: string;
  extra?: string;
  loading?: boolean;
}>();
</script>

<template>
  <section class="relative flex items-center justify-between page-header dark">
    <img :src="bgUrl" :alt="title[0]" class="absolute inset-0 w-full h-full object-cover -z-10">
    <div class="container mx-auto py-12 md:py-16 flex items-end justify-between">
      <SectionTitle :title />

      <div v-if="extra" class="text-white font-semibold uppercase">
        {{ extra }}
      </div>
    </div>

    <UProgress
      v-if="loading"
      animation="swing"
      class="absolute inset-x-0 -bottom-2 light"
      :ui="{ base: 'rounded-none', indicator: 'rounded-none' }"
    />
  </section>
</template>

<style>
.page-header {
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.60) 41.77%, rgba(0, 0, 0, 0.00) 51.99%, rgba(0, 0, 0, 0.00) 81.23%, rgba(0, 0, 0, 0.60) 94.08%);
  background-blend-mode: multiply;
}
</style>
