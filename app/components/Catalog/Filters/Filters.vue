<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui";
import { useModelsCatalogFiltersStore } from "~/stores/models-catalog-filters.store";
import PriceFilter from "./PriceFilter.vue";
import BrandFilter from "./BrandFilter.vue";
import BodyTypeFilter from "./BodyTypeFilter.vue";
import EngineTypeFilter from "./EngineTypeFilter.vue";
import DriveFilter from "./DriveFilter.vue";

const { t } = useI18n();
const filtersStore = useModelsCatalogFiltersStore();

const items = computed<AccordionItem[]>(() => [
  {
    label: t("price"),
    slot: "price",
  },
  {
    label: t("brand"),
    slot: "brand",
  },
  {
    label: t("vehicle.bodyTypes.title"),
    slot: "bodyType",
  },
  {
    label: t("filters.engineType.title"),
    slot: "engineType",
  },
  {
    label: t("filters.drive.title"),
    slot: "drive",
  },
]);

const defaultValue = ref([
  "0", "1", "2",
]);
</script>

<template>
  <div class="relative">
    <div
      v-if="filtersStore.isLoading"
      class="absolute top-2 right-2 z-10"
    >
      <UIcon name="i-heroicons-arrow-path" class="w-5 h-5 animate-spin text-primary" />
    </div>

    <UAccordion
      v-model="defaultValue"
      type="multiple"
      :items="items"
      :ui="{ item: 'px-6', content: 'pb-4' }"
    >
      <template #trailing="{ open }">
        <BycarAccordionTrailingIcon :open="open" class="ms-auto" />
      </template>

      <template #price>
        <PriceFilter
          v-model:min-price="filtersStore.selectedFilters.minPrice"
          v-model:max-price="filtersStore.selectedFilters.maxPrice"
          :boundaries="{ min: filtersStore.data?.filters.priceRange.min, max: filtersStore.data?.filters.priceRange.max }"
        >
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
      </template>

      <template #brand>
        <BrandFilter />
      </template>

      <template #bodyType>
        <BodyTypeFilter />
      </template>

      <template #engineType>
        <EngineTypeFilter />
      </template>

      <template #drive>
        <DriveFilter />
      </template>
    </UAccordion>
  </div>
</template>
