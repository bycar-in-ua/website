<script setup lang="ts">
defineProps<{ title?: string; description?: string }>();
</script>

<template>
  <h3 class="font-semibold text-3xl text-gray-900 mb-2 text-center">
    <slot name="title">
      {{ title }}
    </slot>
  </h3>
  <div class="text-gray-500 text-center mb-8">
    <slot name="description">
      {{ description }}
    </slot>
  </div>
</template>
