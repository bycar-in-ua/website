<script setup lang="ts">
import { BookmarkFilled } from "~/components/UI/Icons";

const { totalSavedCars } = useProfile();
</script>

<template>
  <UChip
    size="xl"
    inset
    :show="totalSavedCars > 0"
    :ui="{
      base: 'px-0.5 py-1.5 ring-primary',
    }"
  >
    <UButton
      :icon="
        totalSavedCars > 0
          ? BookmarkFilled
          : 'i-lucide-bookmark'
      "
      variant="link"
      color="secondary"
      size="sm"
      :ui="{ leadingIcon: 'size-6 lg:size-5' }"
      :to="{ name: 'favorite-cars' }"
      v-bind="$attrs"
    />

    <template #content>
      {{ totalSavedCars }}
    </template>
  </UChip>
</template>
