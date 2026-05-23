<script setup lang="ts">
defineProps<{
  label: string;
  count: number;
}>();
</script>

<template>
  <span class="font-semibold">
    {{ label }} <span class="font-normal text-dimmed">({{ count }})</span>
  </span>
</template>
