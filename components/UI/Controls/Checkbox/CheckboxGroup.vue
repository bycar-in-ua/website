<script setup lang="ts">
import { CheckboxGroupProps } from "./interface";

const props = defineProps(CheckboxGroupProps);

const emit = defineEmits<{
  "update:value": [keys: Array<string | number>];
}>();

const checkHandler = (value: boolean, key: string | number) => {
  console.log({ value, key });

  value
    ? emit("update:value", [...props.value, key])
    : emit(
      "update:value",
      props.value.filter((v) => v !== key),
    );
};
</script>

<template>
  <div class="bycar-checkbox-group" :class="variant">
    <UCheckbox
      v-for="option in options"
      :key="option.key"
      :model-value="value.includes(option.key)"
      :value="option.key"
      :label="option.label"
      :disabled="option.disabled"
      @update:checked="checkHandler"
    />
  </div>
</template>

<style>
.bycar-checkbox-group {
  @apply flex flex-wrap items-start;
  &.vertical {
    @apply flex-col;
  }
  &.horizontal {
    @apply flex-row;
  }
}
</style>
