<script setup lang="ts">
import { generatePageTitle, generatePageDescription } from "@/utils/seo";

useHead({
  title: generatePageTitle("Cookie Policy"),
  meta: [
    {
      name: "description",
      content: generatePageDescription("Cookie Policy"),
    },
    {
      name: "og:title",
      content: generatePageTitle("Cookie Policy"),
    },
    {
      name: "og:url",
      content: "https://bycar.in.ua/cookies",
    },
    {
      name: "og:image",
      content: "/public/images/homepage-bg.jpg", // TODO
    },
  ],
});
</script>

<template>
  <main class="container pt-24 md:pt-32 pb-5 mb-auto relative">
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
      accusantium! Nisi eius saepe doloribus ullam placeat incidunt esse
      adipisci amet magnam ea quibusdam similique, itaque doloremque? Earum
      ipsam illum quia.
    </p>
  </main>
</template>
