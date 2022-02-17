<template>
  <section class="bycar-container section high-bottom">
    <SectionTitle title="Марки автомобилей" />
    <div class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-9">
      <NuxtLink
        v-for="i in 64"
        :key="i"
        to="/catalog/nissan"
        class="flex items-center"
      >
        <div class="bg-gray-300 rounded-full w-6 h-6 mr-4"></div>
        <h4>Nissan</h4>
      </NuxtLink>
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
