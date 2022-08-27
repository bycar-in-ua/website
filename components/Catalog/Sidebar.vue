<template>
  <div
    class="w-screen sm:w-80 flex-shrink-0 fixed top-0 bottom-0 left-0 z-40 lg:z-0 lg:static h- lg:h-auto bg-white p-4 rounded border border-gray-200 transition-transform lg:translate-x-0"
    :class="isSidebarShowing ? 'translate-x-0' : '-translate-x-full'"
  >
    <AdjustmentsHorizontalIcon
      class="w-12 h-12 cursor-pointer p-2 absolute -right-12 top-14 bg-white rounded-r-lg transition-opacity lg:hidden"
      :class="isSidebarShowing ? '' : 'opacity-70'"
      @click="isSidebarShowing = !isSidebarShowing"
    />
    <XMarkIcon
      class="p-2 w-8 h-8 absolute right-2 top-2 lg:hidden"
      @click="isSidebarShowing = false"
    />
    <h3 class="text-center pb-2">{{ $t("filters") }}</h3>

    <div class="overflow-y-auto max-h-full pb-8 lg:pb-0">
      <h4 class="mb-4">{{ $t("brand") }}:</h4>
      <CheckboxGroup
        :options="brandsOptions"
        variant="vertical"
        v-model:value="checkboxGroupModel.brand"
      />

      <h4 class="my-4">{{ $t("vehicle.bodyTypes.title") }}:</h4>

      <CheckboxGroup
        :options="bodyTypesOptions"
        variant="vertical"
        v-model:value="checkboxGroupModel.bodyType"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "CatalogSidebar",
};
</script>

<script setup lang="ts">
import {
  CheckboxGroup,
  ICheckboxGroupOption,
} from "@/components/common/Checkbox";
import { AdjustmentsHorizontalIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import { BrandDto as Brand } from "@/common";
import { ua as VehicleWordings } from "@/common/translations/vehicle.json";

const { $api, $t } = useNuxtApp();
const router = useRouter();

const { data: brands } = await $api.get<Brand[]>("/brands");

const isSidebarShowing = ref(false);

const brandsOptions: ICheckboxGroupOption[] = brands.value.map((brand) => ({
  key: brand.slug,
  label: brand.displayName,
}));

const bodyTypesOptions: ICheckboxGroupOption[] = Object.entries(
  VehicleWordings.bodyTypes.items,
).map(([key, label]) => ({ key, label }));

function prepareQueryVars(queryVars: { [k: string]: string | string[] }): {
  [k: string]: string[] | number[];
} {
  const vars = {};

  Object.entries(router.currentRoute.value.query).forEach(([key, val]) => {
    if (Array.isArray(val)) vars[key] = val;

    if (typeof val === "string") {
      vars[key] = val.split(",");
    }
  });

  return vars;
}

const checkboxGroupModel = ref(
  prepareQueryVars(router.currentRoute.value.query),
);

watch(checkboxGroupModel.value, (query) => {
  router.push({ query: query });
});
</script>
