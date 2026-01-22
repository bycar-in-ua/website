<script setup lang="ts">
const profile = useProfile();
</script>

<template>
  <UChip
    size="xl"
    inset
    :show="!!profile.data.value?.savedCars?.length"
    :ui="{
      base: 'px-0.5 py-1.5 ring-primary',
    }"
  >
    <UButton
      :icon="
        profile.data.value?.savedCars?.length
          ? 'i-heroicons-bookmark-solid'
          : 'i-heroicons-bookmark'
      "
      variant="link"
      size="md"
      :to="{ name: 'saved-cars' }"
      v-bind="$attrs"
    />

    <template #content>
      {{ profile.data.value?.savedCars?.length }}
    </template>
  </UChip>
</template>
