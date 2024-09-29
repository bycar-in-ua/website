<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div class="flex flex-wrap items-center mb-7">
    <h2 class="text-xl sm:text-2xl md:text-3xl font-bold flex-grow" v-text="title" />

    <UButton
      variant="link"
      icon="i-heroicons-arrow-right"
      trailing
      class="mt-4 md:mt-0"
      :to="{ name: 'catalog' }"
    >
      Переглянути всі
    </UButton>
  </div>
</template>
