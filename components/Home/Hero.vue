<template>
  <div class="hero py-10 md:py-16 lg:py-20">
    <div class="max-w-2xl bycar-container-md text-white text-center">
      <h1
        class="text-2xl md:text-3xl xl:text-5xl font-bold mb-4"
        v-text="$t('homepage.hero')"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: "Hero",
});
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
