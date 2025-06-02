<script setup lang="ts">
import Logo from "../UI/Logo.vue";
import Navigation from "./Navigation.vue";
import AuthProfile from "~/components/Profile/AuthProfile.vue";
import { useScrollListener } from "./useScrollListener";

const scrolled = ref(false);

if (import.meta.client) {
  useScrollListener(scrolled);
}
</script>

<template>
  <header
    class="z-40 fixed left-0 right-0 py-2 transition-all duration-300"
    :class="
      scrolled
        ? 'top-0 backdrop-blur-md bg-white/40 shadow-md'
        : 'top-2 md:top-8'
    "
  >
    <div class="container flex items-center">
      <Logo class="mr-16" />
      <Navigation />
      <div
        class="flex justify-end md:w-full"
        :class="scrolled ? '' : 'md:w-full'"
      >
        <AuthProfile />
      </div>
    </div>
  </header>
</template>
