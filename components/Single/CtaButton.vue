<script setup lang="ts">
function clickHandler() {
  const container = document?.getElementById("available-cars");

  container?.scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
  <UButton @click="clickHandler">Обрати з наявності</UButton>
</template>
