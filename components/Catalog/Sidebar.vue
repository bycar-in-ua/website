<script setup lang="ts">
import debounce from "lodash/debounce";
import Slider from "@/components/UI/Slider.vue";
import type { VehiclesFilters } from "@bycar-in-ua/sdk";

const { t } = useI18n();
const { $bycarApi } = useNuxtApp();

const { data } = useAsyncData(
  "filters",
  async () => {
    const [brands, bodyTypes] = await Promise.all([
      $bycarApi.getBrands(),
      $bycarApi.getBodyTypes(),
    ]);

    return { brands, bodyTypes };
  },
  {
    default: () => ({ brands: [], bodyTypes: [] }),
  },
);

const catalogStore = useCatalogStore();

const isSidebarShowing = ref(false);

function checkHandler<TValue extends string | number>(
  field: string,
  checked: boolean,
  value: TValue,
) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const existedValue = catalogStore.filters[field] ?? [];

  if (checked) {
    catalogStore.updateFilters(field, [...existedValue, value]);
  } else {
    catalogStore.updateFilters(
      field,
      existedValue.filter((item: string) => item !== value),
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

const drives = [
  "FWD", "RWD", "AWD",
];

const priceSliderModel = computed<number[]>(() => [
  catalogStore.filters.price.from ?? 0,
  catalogStore.filters.price.to ?? 999999,
]);

const debouncedRefresh = debounce(() => {
  catalogStore.refresh();
}, 1000);

const piceUpdateHandler = ([from, to]: number[]) => {
  catalogStore.filters.price.from = from;
  catalogStore.filters.price.to = to;

  debouncedRefresh();
};
</script>

<template>
  <div
    class="w-screen sm:w-64 flex-shrink-0 fixed top-0 bottom-0 left-0 z-40 lg:z-0 lg:static lg:h-auto transition-transform lg:translate-x-0"
    :class="isSidebarShowing ? 'translate-x-0' : '-translate-x-full'"
  >
    <div
      class="bg-white cursor-pointer p-2 absolute -right-12 top-16 rounded-r-lg transition-opacity lg:hidden"
      :class="isSidebarShowing ? '' : 'opacity-80'"
      @click="isSidebarShowing = !isSidebarShowing"
    >
      <UIcon name="i-heroicons-adjustments-horizontal" class="w-8 h-8" />
    </div>
    <UIcon
      name="i-heroicons-x-mark"
      class="p-2 w-8 h-8 absolute right-2 top-2 lg:hidden cursor-pointer"
      @click="isSidebarShowing = false"
    />

    <div class="overflow-y-auto max-h-full pl-1">
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
          <div class="flex gap-2 items-center mb-4">
            <UInput v-model="catalogStore.filters.price.from" size="xs" />
            <span>-</span>
            <UInput v-model="catalogStore.filters.price.to" size="xs" />
            <span>$</span>
          </div>

          <Slider
            :model-value="priceSliderModel"
            :min="0"
            :max="200000"
            :step="1000"
            @update:model-value="piceUpdateHandler"
          />
        </template>

        <template #brand>
          <div class="max-h-32 overflow-y-auto">
            <UCheckbox
              v-for="brand in data.brands"
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
              v-for="bodyType in data.bodyTypes"
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
    </div>
  </div>
</template>
