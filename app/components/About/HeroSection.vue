<script setup lang="ts">
import SectionTitle from "~/components/UI/SectionTitle.vue";
</script>

<template>
  <section class="min-h-[calc(100svh-4rem)] about-us-hero dark py-12 sm:py-16 flex flex-col justify-end">
    <div class="container">
      <SectionTitle :title="['Про нас', 'Знайомимось ближче']" heading-class="text-4xl sm:text-4xl" />
    </div>
  </section>
</template>

<style>
.about-us-hero {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.70) 20.02%, rgba(0, 0, 0, 0.00) 36.99%), url('/images/about-us-hero.jpg') lightgray 50% / cover no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
