<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

const authStore = useAuthStore();

const items = ref<DropdownMenuItem[]>([
  {
    label: "Профіль",
    icon: "i-lucide-user",
    onSelect: () => {
      navigateTo("/profile");
    },
  },
  {
    label: "Вийти",
    icon: "i-heroicons-arrow-left-start-on-rectangle",
    onSelect: () => {
      console.log("logout"); // TODO
    },
  },
]);
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{
      align: 'center',
      side: 'bottom',
      sideOffset: 8,
    }"
    :ui="{
      content: 'w-48',
    }"
  >
    <UButton variant="outline" size="xl" class="bg-white/90 p-2">
      <UAvatar
        v-if="authStore.user?.avatar"
        :src="authStore.user.avatar"
        class="w-6 h-6"
      />
      <UIcon v-else name="i-heroicons-user-circle" class="w-6 h-6" />
      <span class="hidden md:block truncate max-w-60">
        {{ authStore.getProfileName() }}
      </span>
    </UButton>
  </UDropdownMenu>
</template>
