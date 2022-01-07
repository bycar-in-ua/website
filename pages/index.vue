<template>
  <Hero />
  <Latest />
</template>

<script>
export default {
  name: "IndexPage",
};
</script>

<script setup>
import Hero from "@/components/Home/Hero.vue";
import Latest from "@/components/Home/Latest/index.vue";
</script>
