<script setup lang="ts">
defineProps<{
  title: string;
  image: string;
  hoverImage: string;
  query: string;
}>();
</script>

<template>
  <NuxtLink
    :key="title"
    class="group"
    :to="{
      path: '/catalog',
      query: {
        bodyType: query,
      },
    }"
  >
    <div
      class="body-type-card-image h-25.25 sm:h-33.75 flex justify-center items-center object-contain bg-no-repeat bg-center bg-cover"
      :style="{
        '--bg-image': `url(${image})`,
        '--hover-bg-image': `url(${hoverImage})`,
      }"
    />

    <div class="text-center text-black text-xl font-semibold">
      {{ title }}
    </div>
  </NuxtLink>
</template>

<style>
.body-type-card-image {
  background-image: var(--bg-image);
}

.group:hover .body-type-card-image {
  background-image: var(--hover-bg-image);
}
</style>
