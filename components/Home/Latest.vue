<script setup lang="ts">
import type { Vehicle } from "@bycar-in-ua/sdk";
import SectionTitle from "@/components/UI/SectionTitle.vue";
import CarCard from "@/components/UI/CarCard/index.vue";

defineProps<{ latestItems: Vehicle[] }>();
</script>

<template>
  <section class="my-10 md:my-24">
    <SectionTitle title="Нові авто в каталозі" />

    <div
      class="cards-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 lg:gap-5 md:"
    >
      <CarCard v-for="car in latestItems" :key="car.id" :car="car" />
    </div>
  </section>
</template>

<style scoped>
.cards-container > *:nth-child(7n + 1) {
  @apply hidden;
}

@screen md {
  .cards-container > *:nth-child(7n + 1) {
    @apply block;
  }
}
</style>
