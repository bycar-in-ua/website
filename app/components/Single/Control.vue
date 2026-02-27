<script setup lang="ts">
type ControlProps = {
  title: string;
  subtitle?: string;
  active?: boolean;
};

defineProps<ControlProps>();
</script>

<template>
  <div class="flex flex-col gap-1 p-4 cursor-pointer border" :title :class="active ? 'border-primary bg-primary-50': 'border-gray-100'">
    <div class="flex items-center gap-1 justify-between">
      <span class="font-semibold text-gray-950">{{ title }}</span>
      <span class="inline-flex items-center justify-center size-4 rounded-full border-[1.5px]" :class="active? 'border-primary' : 'border-gray-300'">
        <span v-if="active" class="inline-block size-2.5 bg-primary rounded-full" />
      </span>
    </div>
    <span v-if="subtitle" class="text-sm text-dimmed font-medium">{{ subtitle }}</span>
  </div>
</template>
