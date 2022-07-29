<template>
  <LoadingBar />
  <Hader />
  <main>
    <slot />
  </main>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Hader from "@/components/Hader/index.vue";
import Footer from "@/components/Footer/index.vue";
import LoadingBar from "@/components/common/LoadingBar.vue";

export default defineComponent({
  components: {
    Hader,
    Footer,
    LoadingBar,
  },
});
</script>

<style>
body {
  @apply bg-body-bg text-main-color;
}
</style>
