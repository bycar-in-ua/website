<script setup lang="ts">
import FooterNavigation from "./FooterNavigation.vue";
import Socials from "./Socials.vue";
import Copyright from "./Copyright.vue";
</script>

<template>
  <footer class="my-10">
    <div class="container flex gap-5">
      <FooterNavigation />
      <Socials class="ml-auto basis-64" />
      <Copyright class="basis-64" />
    </div>
  </footer>
</template>
