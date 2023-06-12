<template>
  <section class="bycar-container section high-top">
    <SectionTitle title="Нові авто в каталозі" />
    <div
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-5"
    >
      <CarCard v-for="car in latestItems" :key="car.id" :car="car" />
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "Latest",
};
</script>

<script setup lang="ts">
import { useHomeStore } from "@/stores/home";
import SectionTitle from "@/components/UI/SectionTitle.vue";
import CarCard from "@/components/UI/CarCard/index.vue";

const { latestItems } = useHomeStore();
</script>
