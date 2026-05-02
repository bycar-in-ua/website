<script setup lang="ts">
defineProps<{
  title: string;
  value: string | number;
}>();
</script>

<template>
  <div class="flex items-center justify-between py-3 sm:py-4 font-semibold">
    <span class="text-xs sm:text-sm  text-gray-500 dark:text-gray-400 uppercase">
      {{ title }}
    </span>
    <span class="text-sm sm:text-base  text-gray-900 dark:text-white">
      {{ value }}
    </span>
  </div>
</template>
