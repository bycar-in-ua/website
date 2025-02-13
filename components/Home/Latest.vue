<script setup lang="ts">
import type { Vehicle } from "@bycar-in-ua/sdk";
import SectionTitle from "@/components/UI/SectionTitle.vue";
import CarCard from "@/components/UI/CarCard/CarCard.vue";

defineProps<{ latestItems: Vehicle[] }>();
</script>

<template>
  <section class="my-10 md:my-24">
    <SectionTitle title="Нові авто в каталозі" />

    <div
      class="cards-container grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-5"
    >
      <NuxtLink
        v-for="car in latestItems"
        :key="car.id"
        :to="{
          name: 'SingleCar',
          params: {
            brand: car.brand?.slug ?? '',
            model: car.slug,
          },
        }"
      >
        <CarCard :car="car" />
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.car-card:nth-child(n + 7) {
  @apply hidden;
}

@screen lg {
  .car-card:nth-child(n + 7) {
    @apply block;
  }
}
</style>
