<script setup lang="ts">
import { useFilters } from "~/composables/useFilters";
import YearFilter from "../YearFilter.vue";
import ApplyButton from "./ApplyButton.vue";

const { selectedFilters, responsiveFilterView } = useFilters();

const from = ref(selectedFilters.value.yearFrom);
const to = ref(selectedFilters.value.yearTo);

const handleApply = () => {
  selectedFilters.value.yearFrom = from.value;
  selectedFilters.value.yearTo = to.value;
  responsiveFilterView.value = undefined;
};
</script>

<template>
  <YearFilter v-model:from="from" v-model:to="to" />

  <Teleport to=".filters-footer">
    <ApplyButton @click="handleApply" />
  </Teleport>
</template>
