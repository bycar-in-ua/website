<script setup lang="ts">
import { useFilters, type UnifiedFiltersSchema } from "~/composables/useFilters";
import type { FilterDefinition } from "~/utils/filters";
import PriceFilter from "../PriceFilter.vue";
import YearFilter from "../YearFilter.vue";
import CheckboxGroupFilter from "./CheckboxGroupFilter.vue";
import RadioGroupFilter from "./RadioGroupFilter.vue";

defineOptions({ name: "DesktopFilters" });

defineProps<{ filters: FilterDefinition[]; }>();

const { isLoading, selectedFilters } = useFilters();
</script>

<template>
  <div class="relative">
    <div
      v-if="isLoading"
      class="absolute top-2 right-2 z-10"
    >
      <UIcon name="i-heroicons-arrow-path" class="w-5 h-5 animate-spin text-primary" />
    </div>

    <UAccordion
      :default-value="['availability', 'priceRange', 'location', 'discount']"
      type="multiple"
      :items="filters"
      value-key="key"
      :ui="{ item: 'px-6', content: 'pb-4' }"
    >
      <template #trailing="{ open }">
        <BycarAccordionTrailingIcon :open="open" class="ms-auto" />
      </template>

      <template #content="{ item }">
        <CheckboxGroupFilter
          v-if="item.type === 'checkbox'"
          v-model="selectedFilters[item.key as keyof UnifiedFiltersSchema] as string[]"
          :items="item.options"
        />

        <RadioGroupFilter
          v-if="item.type === 'radio'"
          v-model="selectedFilters[item.key as keyof UnifiedFiltersSchema] as string"
          :items="item.options"
        />

        <PriceFilter
          v-if="item.key === 'priceRange'"
          v-model:min-price="selectedFilters.minPrice"
          v-model:max-price="selectedFilters.maxPrice"
        />

        <YearFilter
          v-if="item.key === 'yearRange'"
          v-model:from="selectedFilters.yearFrom"
          v-model:to="selectedFilters.yearTo"
        />
      </template>
    </UAccordion>
  </div>
</template>
