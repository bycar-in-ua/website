<script setup lang="ts">
import type { CheckboxGroupItem } from "@nuxt/ui";

const props = defineProps<{
  items: CheckboxGroupItem[];
}>();

const allCheckboxModel = defineModel<boolean>("allCheckbox");
const model = defineModel<string[] | number[]>();
</script>

<template>
  <div>
    <UCheckbox
      v-model="allCheckboxModel"
      label="Всі"
      indicator="end"
      class="mb-2 pb-2 border-b border-gray-100"
    />
    <UCheckboxGroup
      v-model="model"
      :items="props.items"
      indicator="end"
      :ui="{ item: 'mb-2 pb-2', fieldset: 'gap-y-0 divide-y divide-gray-100' }"
    />
  </div>
</template>
