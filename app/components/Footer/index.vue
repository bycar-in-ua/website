<script setup lang="ts">
import FooterNavigation from "./FooterNavigation.vue";
import Socials from "./Socials.vue";
import Copyright from "./Copyright.vue";
import Logo from "../UI/Logo.vue";
</script>

<template>
  <footer data-testid="bycar-footer" class="px-4 pt-12 pb-10 sm:px-20 sm:pt-16 sm:pb-12 bg-black">
    <div class="container">
      <div class="grid gap-8 grid-container">
        <Logo class="h-12 w-36 logo mb-2 sm:mb-0" />
        <Socials class="socials mt-2 sm:mt-0" />
        <FooterNavigation />
      </div>

      <USeparator
        class="mt-10 sm:mt-16 mb-8"
        :ui="{ border: 'border-gray-900' }"
      />
      <Copyright />
    </div>
  </footer>
</template>

<style>
.grid-container {
  grid-template-areas:
    "logo"
    "col1"
    "col2"
    "col3"
    "socials";
  grid-template-columns: auto;
}

@media (min-width: 40rem) {
  .grid-container {
    grid-template-areas:
      "logo col1"
      "socials col1"
      "col2 col3";
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 64rem) {
  .grid-container {
    grid-template-areas:
      "logo col1 col2 col3"
      "socials col1 col2 col3";
    grid-template-columns: minmax(auto, 342px) repeat(3, minmax(200px, 1fr));
  }
}

.logo {
  grid-area: logo;
}
.socials {
  grid-area: socials;
}
.grid-container > #footer-nav-col-0 {
  grid-area: col1;
}
.grid-container > #footer-nav-col-1 {
  grid-area: col2;
}
.grid-container > #footer-nav-col-2 {
  grid-area: col3;
}
</style>
