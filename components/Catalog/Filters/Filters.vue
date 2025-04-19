<script setup lang="ts">
import type { BodyType } from "@bycar-in-ua/sdk";
import type { FiltersState } from "@/stores/catalog";
import PriceFilter from "./PriceFilter.vue";
import BrandFilter from "./BrandFilter.vue";
import BodyTypeFilter from "./BodyTypeFilter.vue";
import EngineTypeFilter from "./EngineTypeFilter.vue";
import DriveFilter from "./DriveFilter.vue";

const catalogStore = useCatalogStore();

function checkHandler<TValue extends string | number>(
  field: keyof FiltersState,
  checked: boolean,
  value: TValue,
) {
  const existedValue = catalogStore.filters[field] ?? [];

  if (!Array.isArray(existedValue)) {
    return;
  }

  if (checked) {
    catalogStore.updateFilters(field, [...existedValue, value]);
  } else {
    catalogStore.updateFilters(
      field,
      existedValue.filter((item) => item !== value),
    );
  }
}
</script>

<template>
  <PriceFilter
    :price-from="catalogStore.filters.priceFrom"
    :price-to="catalogStore.filters.priceTo"
    @update:price-from="
      (value) => catalogStore.updateFilters('priceFrom', value)
    "
    @update:price-to="(value) => catalogStore.updateFilters('priceTo', value)"
  />

  <BrandFilter
    :brands="catalogStore.dictionary.brands"
    :selected-filters="catalogStore.filters.brand"
    @change="(checked: boolean, brandId: number) => checkHandler('brand', checked, brandId)"
  />
  <USeparator />

  <BodyTypeFilter
    :body-types="catalogStore.dictionary.bodyTypes"
    :selected-filters="catalogStore.filters.bodyType"
    @change="(checked: boolean, bodyType: BodyType) => checkHandler('bodyType', checked, bodyType)"
  />

  <USeparator />

  <EngineTypeFilter
    :selected-filters="catalogStore.filters.engineType"
    @change="(checked: boolean, engineType:string) => checkHandler('engineType', checked, engineType)"
  />

  <USeparator />

  <DriveFilter
    :selected-filters="catalogStore.filters.drive"
    @change="(checked: boolean, drive:string) => checkHandler('drive', checked, drive)"
  />
</template>
