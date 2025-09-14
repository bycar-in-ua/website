<script setup lang="ts">
defineProps<{
  itemsCount: number;
  cardClass?: string;
}>();
</script>

<template>
  <div class="grid gap-4">
    <USkeleton
      v-for="i in itemsCount"
      :key="i"
      class="rounded-2xl h-60"
      :class="cardClass"
    />
  </div>
</template>
