<template>
  <div class="bycar-container flex flex-row justify-between">
    <Logo class="xl:basis-2/12" />
    <Navigation />
    <div class="xl:basis-2/12" />
  </div>
</template>

<script lang="ts">
export default {
  name: "Header",
};
</script>

<script setup lang="ts">
import Logo from "./Logo.vue";
import Navigation from "./Navigation.vue";
</script>
