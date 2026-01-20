<script setup lang="ts">
import { useProfileNavigation } from "#layers/profile/composables/useProfileNavigation";
import HeaderCtaButton from "./HeaderCtaButton.vue";

const {
  PersonalProfileNavButton,
  SavedCarsNavButton,
} = useProfileNavigation();

const config = useRuntimeConfig();
const isDev = config.public.stage !== "production";

async function expireAccessToken() {
  try {
    await $fetch("/api/auth/debug-expire-token", { method: "POST" });
    useToast().add({
      title: "Debug",
      description: "Access token cleared. Next API call will trigger refresh.",
      color: "warning",
    });
  } catch (e) {
    useToast().add({
      title: "Error",
      description: "Failed to expire token",
      color: "error",
    });
  }
}
</script>

<template>
  <div class="flex items-center">
    <!-- DEBUG: Expire token button (dev only) -->
    <UButton
      v-if="isDev"
      icon="i-heroicons-bug-ant"
      variant="link"
      size="md"
      class="text-orange-500 hover:text-orange-600"
      title="[DEV] Expire access token"
      @click="expireAccessToken"
    />

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
