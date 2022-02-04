<template>
  <div class="py-8 flex-grow">
    <SectionTitle title="Каталог" />
    <div
      class="py-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
    >
      <CarCard v-for="i in 12" :key="i" />
    </div>
    <Pagination class="mt-5 justify-center" />
  </div>
</template>

<script lang="ts">
export default {
  name: "CatalogList",
};
</script>

<script setup lang="ts">
import SectionTitle from "@/components/common/SectionTitle.vue";
import CarCard from "@/components/common/CarCard/index.vue";
import Pagination from "../common/Pagination/index.vue";
</script>
