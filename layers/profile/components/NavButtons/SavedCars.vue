<script setup lang="ts">
const authStore = useAuthStore();
const profileStore = useProfileStore();
</script>

<template>
  <UChip
    v-if="authStore.authenticated"
    size="xl"
    inset
    :show="!!profileStore.profile?.savedCars?.length"
    :ui="{
      base: 'px-0.5 py-1.5 ring-primary text-white',
    }"
  >
    <UButton
      :icon="
        profileStore.profile?.savedCars?.length
          ? 'i-heroicons-heart-solid'
          : 'i-heroicons-heart'
      "
      variant="link"
      size="xl"
      :to="{ name: 'saved-cars' }"
      v-bind="$attrs"
    />

    <template #content>
      {{ profileStore.profile?.savedCars?.length }}
    </template>
  </UChip>
</template>
