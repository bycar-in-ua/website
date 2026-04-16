<script setup lang="ts">
import SectionTitle from "./SectionTitle.vue";

defineProps<{
  title: string[];
  bgUrl?: string;
  extra?: string;
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
  </section>
</template>

<style>
.page-header {
  /* background: linear-gradient(90deg,rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 99%); */
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.60) 41.77%, rgba(0, 0, 0, 0.00) 51.99%, rgba(0, 0, 0, 0.00) 81.23%, rgba(0, 0, 0, 0.60) 94.08%);
  background-size: cover;
  background-blend-mode: multiply;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
