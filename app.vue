<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp();

if (process.client) {
  nuxtApp.hook("page:finish", () => {
    window.scrollTo(0, 0);
  });
}
</script>
