<script setup lang="ts">
import Logo from "../UI/Logo.vue";
import Navigation from "./Navigation.vue";
import ScrollListener from "./ScrollListener.vue";

const scrolled = ref(false);
</script>

<template>
  <header
    class="z-40 fixed left-0 right-0 py-2 transition-all duration-300"
    :class="scrolled ? 'top-0 backdrop-blur-md bg-white/40 shadow-md' : 'top-2 md:top-8'"
  >
    <ClientOnly>
      <ScrollListener v-model="scrolled" />
    </ClientOnly>

    <div class="container flex items-center">
      <Logo class="mr-16" />
      <Navigation />
    </div>
  </header>
</template>
