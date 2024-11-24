<script setup lang="ts">
import type { VehiclesFilters } from "@bycar-in-ua/sdk";
import type { FiltersState } from "@/stores/catalog";
import PriceFilter from "./PriceFilter.vue";

const { t } = useI18n();

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

const filters = [
  { label: t("price"), slot: "price" },
  { label: t("brand"), slot: "brand" },
  { label: t("vehicle.bodyTypes.title"), slot: "bodyType" },
  { label: t("filters.engineType.title"), slot: "engineType" },
  { label: t("filters.drive.title"), slot: "drive" },
];

const engineTypes: NonNullable<VehiclesFilters["engineType"]> = [
  "gas",
  "dt",
  "hybrid",
  "electric",
];

const drives = ["FWD", "RWD", "AWD"];
</script>

<template>
  <UAccordion
    default-open
    multiple
    :items="filters"
    :ui="{
      container:
        'pb-4 mb-5 last-of-type:mb-0 border-b border-gray-200 last-of-type:border-0',
    }"
  >
    <template #default="{ item, open }">
      <h4 class="flex justify-between font-medium mb-4 cursor-pointer">
        {{ item.label }}

        <UIcon
          name="i-heroicons-chevron-right-20-solid"
          class="w-6 h-6 transform transition-transform duration-200"
          :class="[open ? '-rotate-90 text-primary' : 'rotate-90']"
        />
      </h4>
    </template>

    <template #price>
      <PriceFilter />
    </template>

    <template #brand>
      <div class="max-h-32 overflow-y-auto">
        <UCheckbox
          v-for="brand in catalogStore.dictionary.brands"
          :key="brand.id"
          :label="brand.displayName"
          :value="brand.id"
          :model-value="catalogStore.filters.brand"
          class="mb-2"
          @change="(checked: boolean) => {
                checkHandler('brand', checked, brand.id);
              }"
        />
      </div>
    </template>

    <template #bodyType>
      <div class="max-h-32 overflow-y-auto">
        <UCheckbox
          v-for="bodyType in catalogStore.dictionary.bodyTypes"
          :key="bodyType"
          :label="t(`vehicle.bodyTypes.items.${bodyType}`)"
          :value="bodyType"
          :model-value="catalogStore.filters.bodyType"
          class="mb-2"
          @change="(checked: boolean) => {
                checkHandler('bodyType', checked, bodyType);
              }"
        />
      </div>
    </template>

    <template #engineType>
      <UCheckbox
        v-for="engineType in engineTypes"
        :key="engineType"
        :label="t(`filters.engineType.${engineType}`)"
        :value="engineType"
        :model-value="catalogStore.filters.engineType"
        class="mb-2"
        @change="(checked: boolean) => {
              checkHandler('engineType', checked, engineType);
            }"
      />
    </template>

    <template #drive>
      <UCheckbox
        v-for="drive in drives"
        :key="drive"
        :label="t(`filters.drive.${drive}`)"
        :value="drive"
        :model-value="catalogStore.filters.drive"
        class="mb-2"
        @change="(checked: boolean) => {
              checkHandler('drive', checked, drive);
            }"
      />
    </template>
  </UAccordion>
</template>
