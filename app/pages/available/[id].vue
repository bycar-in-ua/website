<script setup lang="ts">
definePageMeta({ name: "AvailableCarSingle" });

const route = useRoute();
</script>

<template>
  <main>
    {{ route.params }}
  </main>
</template>
