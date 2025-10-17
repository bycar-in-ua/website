<script setup lang="ts">
import Logo from "~/components/UI/Logo.vue";
import Navigation from "./Navigation.vue";
import ProfileMenu from "./ProfileMenu.vue";
</script>

<template>
  <header
    class="py-4"
  >
    <div
      class="container flex gap-2 items-center justify-between"
    >
      <NuxtLink to="/" class="flex h-10">
        <Logo class="h-full w-24" />
      </NuxtLink>

      <Navigation />

      <ProfileMenu />
    </div>
  </header>
</template>
