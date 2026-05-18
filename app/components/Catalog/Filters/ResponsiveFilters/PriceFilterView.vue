<script setup lang="ts">
import PriceFilter from "../PriceFilter.vue";

const minPrice = defineModel<number>("minPrice");
const maxPrice = defineModel<number>("maxPrice");
</script>

<template>
  <div class="p-4">
    <PriceFilter v-model:min-price="minPrice" v-model:max-price="maxPrice">
      <template #min-price-label>
        <span class="uppercase font-semibold text-sm inline-block mb-1.5">
          Від
        </span>
      </template>
      <template #max-price-label>
        <span class="uppercase font-semibold text-sm inline-block mb-1.5">
          До
        </span>
      </template>
    </PriceFilter>
  </div>
</template>
