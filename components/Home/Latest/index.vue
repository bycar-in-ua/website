<template>
  <section class="bycar-container py-10 md:py-12 lg:py-16">
    <h2 class="text-2xl text-center font-bold mb-5">
      Последние добавленные авто
    </h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
      <CarCard v-for="i in 8" :key="i"></CarCard>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "Latest",
};
</script>

<script setup lang="ts">
import CarCard from "@/components/common/CarCard/index.vue";
</script>
