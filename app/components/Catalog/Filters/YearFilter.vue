<script setup lang="ts">
import RangeControl from "~/components/UI/RangeControl.vue";
import { useFilters } from "~/composables/useFilters";

const { data } = useFilters();

const from = defineModel<number>("from");
const to = defineModel<number>("to");
</script>

<template>
  <RangeControl
    v-model:min="from"
    v-model:max="to"
    :boundaries="{ min: data?.filters.yearRange.min, max: data?.filters.yearRange.max }"
    min-label="Від"
    max-label="До"
    :step="1"
    :format-options="{ useGrouping: false }"
  />
</template>
