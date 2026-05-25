<script setup lang="ts">
import { useFilters } from "~/composables/useFilters";
import type { UnifiedFiltersSchema } from "~/utils/filters";
import BrandTag from "./BrandTag.vue";
import BodyTypeTag from "./BodyTypeTag.vue";
import EngineTypeTag from "./EngineTypeTag.vue";
import DriveTypeTag from "./DriveTypeTag.vue";
import PriceTag from "./PriceTag.vue";
import YearTag from "./YearTag.vue";
import AvailablityTag from "./AvailablityTag.vue";
import ProductionTag from "./ProductionTag.vue";
import DiscountTag from "./DiscountTag.vue";

const { selectedFilters } = useFilters();

const filtersList = computed(() => {
  return Object.entries(selectedFilters.value)
    .filter(([, value]) => Boolean(value))
    .flatMap(([filter, value]) => Array.isArray(value) ? value.map((v) => [filter, v]) : [[filter, value]]);
});

const filtersMap: Partial<Record<keyof UnifiedFiltersSchema, Component>> = {
  availability: AvailablityTag,
  brand: BrandTag,
  bodyType: BodyTypeTag,
  engineType: EngineTypeTag,
  driveType: DriveTypeTag,
  maxPrice: PriceTag,
  minPrice: PriceTag,
  discount: DiscountTag,
  yearFrom: YearTag,
  yearTo: YearTag,
  productionRelevance: ProductionTag,
};
</script>

<template>
  <div class="py-3 md:py-4 px-4 md:px-6 flex flex-col gap-3 md:gap-4">
    <h3 class="font-semibold md:uppercase max-md:text-toned max-md:text-sm">
      Застосовані фільтри
    </h3>

    <div class="flex gap-2 items-start flex-wrap">
      <component
        :is="filtersMap[filter as keyof UnifiedFiltersSchema]"
        v-for="([filter, value], i) in filtersList"
        :key="i"
        :value
        :filter
      />
    </div>
  </div>
</template>
