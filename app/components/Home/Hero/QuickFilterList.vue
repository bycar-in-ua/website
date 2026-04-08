<script setup lang="ts">
import type { CheckboxGroupItem } from "@nuxt/ui";

const props = defineProps<{
  items: CheckboxGroupItem[];
  testIdPrefix?: string;
}>();

const allCheckboxModel = defineModel<boolean>("allCheckbox");
const model = defineModel<string[] | number[]>();

const normalizeTestIdPart = (value: unknown, fallback: number) => {
  const normalized = String(value ?? fallback)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || `item-${fallback}`;
};

const itemsWithTestIds = computed(() => {
  return props.items.map((item, index) => {
    if (!props.testIdPrefix) {
      return item;
    }

    if (typeof item === "object" && item !== null) {
      return {
        ...item,
        "data-testid": `${props.testIdPrefix}-option-${normalizeTestIdPart(item.value ?? item.label, index)}`,
      };
    }

    return {
      value: item,
      label: String(item),
      "data-testid": `${props.testIdPrefix}-option-${normalizeTestIdPart(item, index)}`,
    };
  });
});
</script>

<template>
  <div :data-testid="props.testIdPrefix ? `${props.testIdPrefix}-content` : undefined">
    <UCheckbox
      v-model="allCheckboxModel"
      label="Всі"
      indicator="end"
      class="mb-2 pb-2 border-b border-gray-100"
      :data-testid="props.testIdPrefix ? `${props.testIdPrefix}-all` : undefined"
    />
    <UCheckboxGroup
      v-model="model"
      :items="itemsWithTestIds"
      indicator="end"
      :ui="{ item: 'mb-2 pb-2', fieldset: 'gap-y-0 divide-y divide-gray-100' }"
    />
  </div>
</template>
