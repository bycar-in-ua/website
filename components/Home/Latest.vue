<template>
  <section class="bycar-container section high-top">
    <SectionTitle :title="$t('recentCars')" />
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
import SectionTitle from "@/components/common/SectionTitle.vue";
import CarCard from "@/components/common/CarCard/index.vue";

const { latestItems } = useHomeStore();

const { $t } = useNuxtApp();
</script>
