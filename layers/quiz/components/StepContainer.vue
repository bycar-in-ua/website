<script setup lang="ts">
const props = defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<template>
  <div>
    <h3 class="text-xl font-bold mb-1">
      {{ props.title }}
    </h3>

    <h4 class="text-dimmed mb-6">
      {{ props.subtitle }}
    </h4>

    <slot />
  </div>
</template>
