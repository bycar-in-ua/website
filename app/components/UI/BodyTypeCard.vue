<script setup lang="ts">
defineProps<{
  title: string;
  image: string;
  query: string;
}>();
</script>

<template>
  <NuxtLink
    :key="title"
    :to="{
      path: '/catalog',
      query: {
        bodyType: query,
      },
    }"
  >
    <div class="h-[135px] flex justify-center items-center">
      <img :src="image" :alt="title">
    </div>

    <div class="text-center text-black text-xl font-semibold">
      {{ title }}
    </div>
  </NuxtLink>
</template>
