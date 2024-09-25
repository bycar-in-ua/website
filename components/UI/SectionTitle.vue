<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div class="flex items-center justify-between mb-7">
    <h2 class="text-3xl font-bold" v-text="title" />

    <UButton
      variant="link"
      icon="i-heroicons-arrow-right"
      trailing
      :to="{ name: 'catalog' }"
    >
      Переглянути всі
    </UButton>
  </div>
</template>
