<script setup lang="ts">
const profileStore = useProfileStore();
</script>

<template>
  <UChip
    size="xl"
    inset
    :show="!!profileStore.profile?.savedCars?.length"
    :ui="{
      base: 'px-0.5 py-1.5 ring-primary',
    }"
  >
    <UButton
      :icon="
        profileStore.profile?.savedCars?.length
          ? 'i-heroicons-bookmark-solid'
          : 'i-heroicons-bookmark'
      "
      variant="link"
      size="md"
      :to="{ name: 'saved-cars' }"
      v-bind="$attrs"
    />

    <template #content>
      {{ profileStore.profile?.savedCars?.length }}
    </template>
  </UChip>
</template>
