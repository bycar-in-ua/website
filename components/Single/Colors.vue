<script setup lang="ts">
import type { Color } from "@bycar-in-ua/sdk";
import SectionTitle from "./SectionTitle.vue";

defineProps<{ colors: Color[] }>();

const { $cdnLink } = useNuxtApp();
</script>

<template>
  <section>
    <SectionTitle class="mb-4">
      Доступні кольори
    </SectionTitle>

    <div class="flex flex-wrap gap-3">
      <img
        v-for="color in colors"
        :key="color.id"
        :src="$cdnLink(color.reference, 500, 500)"
        :alt="color.name"
        :title="color.name"
        class="w-14 h-14 rounded-lg object-cover"
      >
    </div>
  </section>
</template>
