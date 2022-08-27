<template>
  <div
    class="w-screen sm:w-80 flex-shrink-0 fixed top-0 bottom-0 left-0 z-40 lg:z-0 lg:static h-screen bg-white p-4 rounded border border-gray-200 transition-transform lg:translate-x-0"
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

    <Checkbox v-model:checked="checked" label="test test" />

    <CheckboxGroup
      :options="checkboxGroupoptions"
      variant="vertical"
      v-model:value="checkboxGroupModel"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: "CatalogSidebar",
};
</script>

<script setup lang="ts">
import { ref } from "vue";
import {
  Checkbox,
  CheckboxGroup,
  ICheckboxGroupOption,
} from "@/components/common/Checkbox";
import { AdjustmentsHorizontalIcon, XMarkIcon } from "@heroicons/vue/24/solid";

const isSidebarShowing = ref(false);

const checked = ref(true);

const checkboxGroupoptions: ICheckboxGroupOption[] = [
  {
    key: "test",
    label: "test",
  },
  {
    key: "test-2",
    label: "test-2",
  },
  {
    key: "test-3",
    label: "test-3",
    disabled: true,
  },
  {
    key: "test-4",
    label: "test-4",
  },
];

const checkboxGroupModel = ref(["test-2"]);
</script>
