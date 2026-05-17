<script setup lang="ts">
import PriceFilter from "~/components/Catalog/Filters/PriceFilter.vue";
import { useModelsCatalogFilters } from "~/composables/useModelsCatalogFilters";
import { useQuizStore } from "#layers/quiz/stores/quiz";
import StepContainer from "./StepContainer.vue";

const quizStore = useQuizStore();

const { data: catalogFilters } = useModelsCatalogFilters();
</script>

<template>
  <StepContainer title="4. Яка ціна для вас комфортна?" subtitle="Майже фініш! Підберемо найкраще у вашому бюджеті.">
    <PriceFilter
      v-model:min-price="quizStore.filters.minPrice"
      v-model:max-price="quizStore.filters.maxPrice"
      :boundaries="{
        min: catalogFilters?.filters.priceRange.min,
        max: catalogFilters?.filters.priceRange.max,
      }"
    />
  </StepContainer>
</template>
