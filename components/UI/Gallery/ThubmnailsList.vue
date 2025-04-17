<script setup lang="ts">
import { ref } from "vue";

const htmlRef = ref();

defineExpose({
  htmlRef,
});
</script>

<template>
  <div
    ref="htmlRef"
    class="bycar-gallery-thumnails-list scroll-smooth no-scrollbar"
  >
    <slot />
  </div>
</template>

<style>
@reference "@/assets/css/tailwind.css";

.bycar-gallery-thumnails-list {
  @apply flex gap-1 md:gap-4 content-start overflow-auto;
}
</style>
