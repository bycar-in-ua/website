<template>
  <div
    class="w-screen sm:w-80 flex-shrink-0 fixed top-0 bottom-0 left-0 z-40 lg:z-0 lg:static h- lg:h-auto bg-white p-4 rounded border border-gray-200 transition-transform lg:translate-x-0"
    :class="isSidebarShowing ? 'translate-x-0' : '-translate-x-full'"
  >
    <AdjustmentsHorizontalIcon
      class="w-12 h-12 cursor-pointer p-2 absolute -right-12 top-16 bg-white rounded-r-lg transition-opacity lg:hidden"
      :class="isSidebarShowing ? '' : 'opacity-80'"
      @click="isSidebarShowing = !isSidebarShowing"
    />
    <XMarkIcon
      class="p-2 w-8 h-8 absolute right-2 top-2 lg:hidden cursor-pointer"
      @click="isSidebarShowing = false"
    />
    <h3 class="text-center pb-2">{{ $t("filters") }}</h3>

    <div class="overflow-y-auto max-h-full pb-8 lg:pb-0">
      <h4 class="mb-4">{{ $t("price") }}:</h4>
      <RadioInputGroup
        :options="priceOptions"
        group-name="price"
        :value="String(route.query.price)"
        @update:value="(val) => checkHandler('price', val)"
      />

      <div
        v-if="route.query.price?.length"
        @click="() => checkHandler('price', [])"
        class="mt-4 text-primary cursor-pointer hover:underline"
      >
        {{ $t("clear") }}
      </div>

      <h4 class="my-4">{{ $t("brand") }}:</h4>
      <CheckboxGroup
        :options="brandsOptions"
        variant="vertical"
        :value="prepareParams(route.query?.brand || [])"
        @update:value="(val) => checkHandler('brand', val)"
      />

      <h4 class="my-4">{{ $t("vehicle.bodyTypes.title") }}:</h4>

      <CheckboxGroup
        :options="bodyTypesOptions"
        variant="vertical"
        :value="prepareParams(route.query?.bodyType || [])"
        @update:value="(val) => checkHandler('bodyType', val)"
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
} from "@/components/UI/Controls/Checkbox";
import { AdjustmentsHorizontalIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import { BrandDto as Brand } from "@/common";
import RadioInputGroup, {
  IRadioInputProps,
} from "@/components/UI/Controls/Radio/index.vue";

const { $api, $t } = useNuxtApp();
const router = useRouter();
const route = useRoute();

const [{ data: brands }, { data: bodyTypes }] = await Promise.all([
  $api.get<Brand[]>("/brands"),
  $api.get<string[]>("/vehicles/body-types"),
]);

const isSidebarShowing = ref(false);

function prepareParams(param: string | string[]) {
  return Array.isArray(param) ? param : [param];
}

const priceOptions: IRadioInputProps[] = [
  {
    value: "<15000",
    label: $t("to") + " $15000",
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
    label: $t("from") + " $50000",
  },
];

const brandsOptions: ICheckboxGroupOption[] = brands.value.map((brand) => ({
  key: brand.slug,
  label: brand.displayName,
}));

const bodyTypesOptions: ICheckboxGroupOption[] = bodyTypes.value.map(
  (item) => ({
    key: item,
    label: $t(`vehicle.bodyTypes.items.${item}`),
  }),
);

async function checkHandler(field, value) {
  await router.replace({
    query: { ...route.query, page: undefined, [field]: value },
  });
}
</script>
