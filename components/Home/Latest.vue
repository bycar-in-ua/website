<script setup lang="ts">
import SectionTitle from "@/components/UI/SectionTitle.vue";
import CarCard from "@/components/UI/CarCard/CarCard.vue";
import type { HomepageData } from "~/server/api/homepage-data.get";

defineProps<HomepageData["latestItems"]>();
</script>

<template>
  <section class="my-10 md:my-24">
    <SectionTitle :title="title ?? 'Нові авто в каталозі'" :extra-link="`/catalog?${queryString}`" />

    <div
      class="cards-container grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-5"
    >
      <NuxtLink
        v-for="car in items"
        :key="car.id"
        :to="{
          name: 'SingleCar',
          params: {
            brand: car.brand?.slug ?? '',
            model: car.slug,
          },
        }"
        class="latest-car-card"
      >
        <CarCard :car="car" />
      </NuxtLink>
    </div>
  </section>
</template>

<style>
@reference "@/assets/css/global.css";

.latest-car-card:nth-child(n + 7) {
  @apply hidden;

  @media (min-width: theme(--breakpoint-lg)) {
    @apply block;
  }
}
</style>
