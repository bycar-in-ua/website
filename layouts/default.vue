<template>
  <div class="min-h-screen">
    <Hader />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
export default {
  name: "DefaultLayout",
};
</script>

<script setup lang="ts">
import Hader from "@/components/Hader/index.vue";
import Footer from "@/components/Footer/index.vue";
</script>

<style>
body {
  @apply bg-body-bg text-main-color;
}
</style>
