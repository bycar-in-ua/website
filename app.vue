<template>
  <Header />
  <NuxtPage />
  <Footer />
</template>

<script setup lang="ts">
import Header from "@/components/Header/index.vue";
import Footer from "@/components/Footer/index.vue";

const nuxtApp = useNuxtApp();

if (process.client) {
  nuxtApp.hook("page:finish", () => {
    window.scrollTo(0, 0);
  });
}
</script>
