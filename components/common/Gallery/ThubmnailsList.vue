<template>
  <div class="bycar-gallery-thumnails-list">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "ThubmnailsList",
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
