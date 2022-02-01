<template>
  <header class="bg-white shadow-sm relative z-20">
    <div class="bycar-container flex flex-row justify-between items-center">
      <Logo class="lg:basis-2/12" />
      <Navigation />
      <div class="lg:basis-2/12 hidden lg:block" />
    </div>
  </header>
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
