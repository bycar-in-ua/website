<script setup lang="ts">
defineProps<{ title: string; subtitle?: string; value: string ; active?: boolean }>();
</script>

<template>
  <div class="flex flex-col gap-1 p-3 rounded-lg shadow-lg cursor-pointer min-w-max" :title :class="active ? 'text-white bg-primary': ''">
    <span class="text-sm font-semibold">{{ title }}</span>
    <span v-if="subtitle" class="text-[10px] " :class="active ? 'text-slate-200': 'text-slate-600'">{{ subtitle }}</span>
    <span class="text-xs">{{ value }}</span>
  </div>
</template>
