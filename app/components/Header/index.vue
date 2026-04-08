<script setup lang="ts">
import Logo from "~/components/UI/Logo.vue";
import Navigation from "./Navigation.vue";
import ProfileMenu from "./ProfileMenu.vue";
</script>

<template>
  <header
    data-testid="about-header"
    class="py-4"
  >
    <div
      class="container flex gap-2 items-center justify-between"
    >
      <div class="basis-1/3">
        <NuxtLink to="/" class="flex h-10">
          <Logo class="h-full w-24" />
        </NuxtLink>
      </div>

      <Navigation class="basis-1/3" />

      <ProfileMenu class="basis-1/3" />
    </div>
  </header>
</template>
