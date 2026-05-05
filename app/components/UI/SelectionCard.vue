<script setup lang="ts">
type Props = {
  title: string;
  subtitle?: string;
  selected?: boolean;
  indicatorType?: "check" | "radio";
};

defineProps<Props>();
</script>

<template>
  <div
    class="flex flex-col gap-1 py-2.5 px-3 sm:p-4 cursor-pointer border"
    :class="selected ? 'border-primary bg-primary-50': 'border-gray-100'"
    :title="title"
  >
    <div class="flex items-center gap-1 justify-between">
      <span class="font-semibold text-gray-950 max-sm:text-sm">{{ title }}</span>

      <span v-if="indicatorType === 'radio'" class="inline-flex items-center justify-center size-4 rounded-full border-[1.5px]" :class="selected? 'border-primary' : 'border-gray-300'">
        <span v-if="selected" class="inline-block size-2.5 bg-primary rounded-full" />
      </span>

      <UCheckbox v-if="indicatorType === 'check'" :model-value="selected" />
    </div>
    <span v-if="subtitle" class="text-xs sm:text-sm text-dimmed font-medium">{{ subtitle }}</span>
  </div>
</template>
