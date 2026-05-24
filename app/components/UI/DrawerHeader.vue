<script setup lang="ts">
defineProps<{ title?: string; }>();
defineEmits<{ close: []; }>();
</script>

<template>
  <span class="basis-6 shrink-0 inline-flex items-center">
    <slot name="left" />
  </span>

  <h3 class="text-center text-lg font-bold basis-full flex-1">
    {{ title }}
  </h3>

  <span class="basis-6 shrink-0 inline-flex items-center">
    <slot name="right">
      <UIcon
        name="i-lucide-x"
        class="size-6 text-dimmed"
        @click="$emit('close')"
      />
    </slot>
  </span>
</template>
