<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
}>();
</script>

<template>
  <div class="text-center mb-10">
    <h3 class="font-bold text-2xl sm:text-3xl mb-2 text-balance">
      <slot name="title">
        {{ title }}
      </slot>
    </h3>
    <p class="text-dimmed font-medium max-sm:text-sm text-balance">
      <slot name="description">
        {{ description }}
      </slot>
    </p>
  </div>
</template>
