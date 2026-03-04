<script setup lang="ts">
import SectionTitle from "~/components/UI/SectionTitle.vue";

const { data: filtersData } = useCatalogFilters();
</script>

<template>
  <section class="flex items-center justify-between all-cars-header">
    <div class="container mx-auto py-16 flex items-end justify-between">
      <SectionTitle :title="['Каталог моделей', 'Знайомтесь з моделями']" class="dark" />

      <div class="text-white font-semibold uppercase">
        {{ filtersData?.total }} Пропозицій
      </div>
    </div>
  </section>
</template>

<style>
.all-cars-header {
  background-image: url('/images/catalog-banner.jpg'), linear-gradient(90deg,rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 1) 94%);
  background-size: cover;
  background-blend-mode: multiply;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
