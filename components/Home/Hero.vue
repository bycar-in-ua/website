<template>
  <div class="hero py-10 md:py-16 lg:py-20">
    <div class="max-w-2xl bycar-container-md text-white text-center">
      <h2 class="text-2xl md:text-3xl xl:text-5xl font-bold mb-4">
        Помогаем с выбором авто от крутого диллера
      </h2>
      <p class="opacity-70 mb-4">
        У нас 41 218 авто от 921 официального дилера в 60 городах Украины.
      </p>
      <!-- <Filters /> -->
    </div>
  </div>
</template>

<script lang="ts">
import Filters from "./Filters/index.vue";
export default {
  name: "Hero",
  components: { Filters },
};
</script>

<style>
.hero {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("assets/images/homepage-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
