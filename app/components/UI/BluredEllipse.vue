<template>
  <div class="blured-ellipse" />
</template>

<style>
@reference "~/assets/css/global.css";

.blured-ellipse {
  border-radius: 50%;
  filter: blur(150px);
  @apply bg-primary-500/30;
}
</style>
