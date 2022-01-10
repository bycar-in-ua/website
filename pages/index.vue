<template>
  <div>
    <Hero />
    <Latest />
    <Brands />
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>

<script setup>
import Hero from "@/components/Home/Hero.vue";
import Latest from "@/components/Home/Latest.vue";
import Brands from "@/components/Home/Brands.vue";
</script>
