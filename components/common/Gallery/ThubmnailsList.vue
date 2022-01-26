<template>
  <div class="bycar-gallery-thumnails-list">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
// import { ThumbnailsListProps } from "./interface";

export default defineComponent({
  name: "ThubmnailsList",
  // props: ThumbnailsListProps,
});
</script>

<style scoped>
.bycar-gallery-thumnails-list {
  @apply grid gap-3 content-start justify-start scroll-smooth;
}
.bycar-gallery-thumnails-list::-webkit-scrollbar {
  display: none;
}
</style>
