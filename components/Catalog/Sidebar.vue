<script setup lang="ts">
import type { LocationQueryValue } from "vue-router";
import {
  CheckboxGroup,
  type ICheckboxGroupOption,
} from "@/components/UI/Controls/Checkbox";
import { type IRadioInputProps } from "@/components/UI/Controls/Radio/index.vue";
import { useCatalogStore } from "~/stores/catalog";

const route = useRoute();
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

function prepareParams(param: LocationQueryValue | LocationQueryValue[]) {
  return (Array.isArray(param) ? param : [param]) as string[];
}

const priceOptions: IRadioInputProps[] = [
  {
    value: "<15000",
    label: "до $15000",
  },
  {
    value: ">15000,<25000",
    label: "$15000 - $25000",
  },
  {
    value: ">25000,<35000",
    label: "$25000 - $35000",
  },
  {
    value: ">35000,<50000",
    label: "$35000 - $50000",
  },
  {
    value: ">50000",
    label: "більше $50000",
  },
];

const brandsOptions: ICheckboxGroupOption[] = data.value.brands.map(
  (brand) => ({
    key: brand.id,
    label: brand.displayName,
  }),
);

const bodyTypesOptions: ICheckboxGroupOption[] = data.value.bodyTypes.map(
  (item) => ({
    key: item,
    label: t(`vehicle.bodyTypes.items.${item}`),
  }),
);

function checkHandler<TValue extends string | number>(
  field: string,
  checked: boolean,
  value: TValue,
) {
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
  { label: t("brand"), slot: "brand" },
  { label: t("vehicle.bodyTypes.title"), slot: "bodyType" },
];
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

    <div class="overflow-y-auto max-h-full">
      <UAccordion
        default-open
        multiple
        :items="filters"
        :ui="{
          container:
            'pb-5 mb-5 last-of-type:mb-0 border-b border-gray-200 last-of-type:border-0',
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

        <template #brand>
          <div class="max-h-32 overflow-y-auto">
            <UCheckbox
              v-for="brand in data.brands"
              :label="brand.displayName"
              :value="brand.id"
              :model-value="catalogStore.filters.brand"
              @change="(checked: boolean) => {
                  checkHandler('brand', checked, brand.id);
                }
              "
              class="mb-2"
            />
          </div>
        </template>

        <template #bodyType>
          <div class="max-h-32 overflow-y-auto">
            <UCheckbox
              v-for="bodyType in data.bodyTypes"
              :label="t(`vehicle.bodyTypes.items.${bodyType}`)"
              :value="bodyType"
              :model-value="catalogStore.filters.bodyType"
              @change="(checked: boolean) => {
                  checkHandler('bodyType', checked, bodyType);
                }
              "
              class="mb-2"
            />
          </div>
        </template>
      </UAccordion>
    </div>
  </div>
</template>
