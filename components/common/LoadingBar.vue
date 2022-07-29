<template>
  <div class="bycar-loading-bar" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "LoadingBar",
});
</script>

<script setup lang="ts">
import { ref } from "vue";

const nuxt = useNuxtApp();

// const loadingBar = ref();
const show = ref(false);

// nuxt.hook("page:start", () => {});
// nuxt.hook("page:finish", () => {
//   show.value = false;
// });
</script>

<style lang="postcss">
.bycar-loading-bar {
  @apply fixed top-0 left-0 right-0 z-50;
  &.loading {
    @apply h-1 bg-primary;
  }
}
</style>
