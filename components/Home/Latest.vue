<template>
  <section class="bycar-container section hi-top">
    <SectionTitle title="Последние добавленные авто" />
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
import SectionTitle from "@/components/common/SectionTitle.vue";
import CarCard from "@/components/common/CarCard/index.vue";
</script>
