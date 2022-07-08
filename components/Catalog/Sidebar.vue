<template>
  <div class="bg-white p-4 my-4 rounded border border-gray-200">
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
