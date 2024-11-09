<script setup lang="ts">
import { ref } from "vue";

const htmlRef = ref();

defineExpose({
  htmlRef,
});
</script>

<template>
  <div ref="htmlRef" class="bycar-gallery-thumnails-list scroll-smooth">
    <slot />
  </div>
</template>

<style>
.bycar-gallery-thumnails-list {
  @apply grid gap-4 content-start overflow-auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
