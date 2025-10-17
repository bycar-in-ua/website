<script setup lang="ts">
import { useProfileNavigation } from "#layers/profile/composables/useProfileNavigation";
import HeaderCtaButton from "./HeaderCtaButton.vue";

const {
  PersonalProfileNavButton,
  SavedCarsNavButton,
} = useProfileNavigation();
</script>

<template>
  <div class="flex items-center">
    <SavedCarsNavButton class="text-default hover:text-highlighted" />

    <UButton
      icon="i-heroicons-scale"
      variant="link"
      size="md"
      class="text-default hover:text-highlighted"
    />

    <PersonalProfileNavButton class="text-default hover:text-highlighted" />

    <HeaderCtaButton class="ml-2" />
  </div>
</template>
