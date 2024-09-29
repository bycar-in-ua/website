<script setup lang="ts">
import FooterNavigation from "./FooterNavigation.vue";
import Socials from "./Socials.vue";
import Copyright from "./Copyright.vue";
</script>

<template>
  <footer class="my-10">
    <div class="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-8">
      <FooterNavigation class="sm:col-span-2" />
      <Socials />
      <Copyright />
    </div>
  </footer>
</template>
