<template>
  <section class="bycar-container section hi-bottom">
    <SectionTitle title="Марки автомобилей" />
    <div class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-9">
      <div v-for="i in 64" :key="i" class="flex items-center">
        <div class="bg-gray-300 rounded-full w-6 h-6 mr-4"></div>
        <h4>Nissan</h4>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "Brands",
};
</script>

<script setup lang="ts">
import SectionTitle from "@/components/common/SectionTitle.vue";
</script>
