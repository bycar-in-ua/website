<script setup lang="ts">
defineProps<{ title?: string; }>();
defineEmits<{ close: []; }>();
</script>

<template>
  <span class="basis-6 shrink-0" />

  <h3 class="text-center text-lg font-bold basis-full flex-1">
    {{ title }}
  </h3>

  <UIcon
    name="i-lucide-x"
    class="size-6 basis-6 shrink-0 text-dimmed"
    @click="$emit('close')"
  />
</template>
