<script setup lang="ts">
import Logo from "@/components/UI/Logo.vue";
import Navigation from "./Navigation.vue";
import { useHeaderStyle } from "./useHeaderStyle";

const { floating, visible } = useHeaderStyle();

const { $headerMode } = useNuxtApp();
</script>

<template>
  <header
    class="z-40 left-0 right-0 transition-all duration-300 p-2 md:p-3"
    :class="[
      floating ? 'fixed' : 'absolute top-0',
      visible ? 'top-0' : 'top-[-100px]',
      $headerMode,
    ]"
  >
    <div
      class="container flex gap-2 md:gap-4 lg:gap-6 items-center px-4 py-3 rounded-xl border border-white/20 dark:bg-white/10 bg-white/80 shadow-lg backdrop-blur-lg"
    >
      <NuxtLink to="/" class="flex h-10">
        <Logo class="h-full w-auto" />
      </NuxtLink>
      <Navigation />
    </div>
  </header>
</template>
