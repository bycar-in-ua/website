<script setup lang="ts">
function clickHandler() {
  const container = document?.getElementById("contact-form-container");
  const targetInput = document?.getElementById("contact-form-name");

  container?.scrollIntoView({ behavior: "smooth" });
  targetInput?.focus();
}
</script>

<template>
  <UButton @click="clickHandler">Замовити консультацію</UButton>
</template>
