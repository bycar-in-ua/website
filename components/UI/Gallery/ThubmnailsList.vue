<script setup lang="ts">
import { ref } from "vue";

const htmlRef = ref();

defineExpose({
  htmlRef,
});
</script>

<template>
  <div class="bycar-gallery-thumnails-list" ref="htmlRef">
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
