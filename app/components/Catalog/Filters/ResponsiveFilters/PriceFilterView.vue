<script setup lang="ts">
import { useFilters } from "~/composables/useFilters";
import PriceFilter from "../PriceFilter.vue";
import ApplyButton from "./ApplyButton.vue";

const { selectedFilters, responsiveFilterView } = useFilters();

const minPrice = ref(selectedFilters.value.minPrice);
const maxPrice = ref(selectedFilters.value.maxPrice);

const handleApply = () => {
  selectedFilters.value.minPrice = minPrice.value;
  selectedFilters.value.maxPrice = maxPrice.value;
  responsiveFilterView.value = undefined;
};
</script>

<template>
  <PriceFilter v-model:min-price="minPrice" v-model:max-price="maxPrice" />

  <Teleport to=".filters-footer">
    <ApplyButton @click="handleApply" />
  </Teleport>
</template>
