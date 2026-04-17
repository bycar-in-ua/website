<script setup lang="ts">
import type { CheckboxGroupItem } from "@nuxt/ui";

defineProps<{
  items: CheckboxGroupItem[];
}>();

const allCheckboxModel = defineModel<boolean>("allCheckbox");
const model = defineModel<string[] | number[]>();
</script>

<template>
  <UCheckbox
    v-model="allCheckboxModel"
    label="Всі"
    indicator="end"
    class="mb-3 md:mb-2 pb-3 md:pb-2 border-b border-gray-100"
    :ui="{ label: 'font-semibold text-gray-950' }"
  />
  <UCheckboxGroup
    v-model="model"
    :items
    indicator="end"
    :ui="{
      item: 'mb-3 md:mb-2 pb-3 md:pb-2',
      fieldset: 'gap-y-0 divide-y divide-gray-100',
      label: 'text-toned font-semibold',
    }"
  />
</template>
