<script setup lang="ts">
defineProps<{ title: string; open?: boolean }>();
</script>

<template>
  <div class="font-medium cursor-pointer flex justify-between gap-1 mb-4">
    {{ title }}

    <UIcon name="i-heroicons-chevron-down" class="w-6 h-6 text-primary transition-transform duration-300" :class="{ 'rotate-180': open }" />
  </div>
</template>
