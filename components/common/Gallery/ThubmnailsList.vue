<template>
  <div class="bycar-gallery-thumnails-list" ref="htmlRef">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ThubmnailsList",
});
</script>

<script setup lang="ts">
import { ref } from "vue";

const htmlRef = ref();

defineExpose({
  htmlRef,
});
</script>

<style lang="postcss">
.bycar-gallery-thumnails-list {
  @apply grid gap-3 content-start justify-start scroll-smooth overflow-auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
