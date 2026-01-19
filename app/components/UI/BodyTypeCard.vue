<script setup lang="ts">
defineProps<{
  item: {
    title: string;
    image: string;
    query: string;
  };
}>();
</script>

<template>
  <NuxtLink
    :key="item.title"
    :to="{
      path: '/catalog',
      query: {
        bodyType: item.query,
      },
    }"
  >
    <div class="h-[135px] flex justify-center items-center">
      <img :src="item.image" :alt="item.title">
    </div>

    <div class="text-center text-black text-xl font-semibold">
      {{ item.title }}
    </div>
  </NuxtLink>
</template>
