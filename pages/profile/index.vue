<script setup lang="ts">
import BluredEllipse from "~/components/UI/BluredEllipse.vue";
import AccoutnSettings from "../../components/Profile/AccoutnSettings.vue";
</script>

<template>
  <main class="container pt-24 md:pt-32 pb-5 mb-auto relative">
    <BluredEllipse
      class="absolute w-[410px] h-[220px] z-0 left-0 md:left-56 top-72 md:top-60"
    />
    <div class="lg:flex justify-center gap-10 relative blured-ellipse-bg">
      <div class="lg:w-3/5">
        <AccoutnSettings />
      </div>
    </div>
  </main>
</template>
