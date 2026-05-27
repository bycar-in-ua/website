<script setup lang="ts">
import { BookmarkFilled } from "~/components/UI/Icons";

const { profile } = useProfile();
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
          ? BookmarkFilled
          : 'i-lucide-bookmark'
      "
      variant="link"
      color="secondary"
      size="sm"
      :ui="{ leadingIcon: 'size-6 lg:size-5' }"
      :to="{ name: 'saved-cars' }"
      v-bind="$attrs"
    />

    <template #content>
      {{ profile.data.value?.savedCars?.length }}
    </template>
  </UChip>
</template>
