<template>
  <section class="bycar-container section high-top">
    <SectionTitle title="Последние добавленные авто" />
    <div
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-5"
    >
      <CarCard v-for="car in cars" :key="car.id" :car="car" />
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "Latest",
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { useHomeStore } from "@/stores/home";
import SectionTitle from "@/components/common/SectionTitle.vue";
import CarCard from "@/components/common/CarCard/index.vue";

const store = useHomeStore();

const cars = computed(() => store.latestItems);
</script>
