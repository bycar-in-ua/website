<script setup lang="ts">
import { generatePageTitle } from "@/utils/seo";

useHead({
  title: generatePageTitle("Про нас"),
  meta: [
    {
      name: "description",
      content: "Про нас | bycar-in-ua - Автомобільна спільнота України",
    },
    {
      name: "og:title",
      content: generatePageTitle("Про нас"),
    },
    {
      name: "og:url",
      content: "https://bycar.in.ua/about",
    },
    {
      name: "og:image",
      content: "/public/images/homepage-bg.jpg", // TODO
    },
  ],
});
</script>

<template>
  <main class="container pt-32 pb-5 mb-auto">
    TODO: add info
  </main>
</template>
