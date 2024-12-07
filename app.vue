<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <Header />
    <NuxtPage />
    <Footer />
  </NuxtLayout>
</template>

<script setup lang="ts">
import Header from "@/components/Header/index.vue";
import Footer from "@/components/Footer/index.vue";

const nuxtApp = useNuxtApp();

if (import.meta.client) {
  nuxtApp.hook("page:finish", () => {
    window.scrollTo(0, 0);
  });
}
</script>
