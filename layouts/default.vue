<template>
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
export default defineComponent({
  components: {
    Hader,
    Footer,
  },
});
</script>

<script setup lang="ts"></script>

<style>
body {
  @apply bg-body-bg text-main-color;
}
</style>
