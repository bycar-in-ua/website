<script setup lang="ts">
import AccountSettings from "~/layers/profile/components/AccountSettings.vue";
import type { TabsItem } from "@nuxt/ui";

definePageMeta({
  middleware: "auth",
});

const authStore = useAuthStore();

const items: TabsItem[] = [
  {
    label: "Персональні дані",
    slot: "personal",
  },
];
</script>

<template>
  <main class="container pt-24 md:pt-32 pb-5 mb-auto relative">
    <div class="space-y-6">
      <div>
        <div class="rounded-3xl overflow-hidden h-60">
          <img
            src="/images/profile-bg.png"
            alt="Profile background"
            class="h-full w-full object-cover"
          />
        </div>

        <div class="relative -top-10 z-10 px-8 space-y-2">
          <UAvatar
            v-if="authStore.user?.avatar"
            :src="authStore.user.avatar"
            class="min-w-20 h-20"
          />
          <UIcon v-else name="i-heroicons-user-circle" class="min-w-20 h-20" />

          <div class="font-semibold text-xl sm:text-3xl text-gray-900">
            <!-- {{ authStore.getProfileName() }} -->
          </div>
        </div>
      </div>

      <UTabs variant="link" :items="items" class="w-full gap-8">
        <template #personal>
          <AccountSettings />
        </template>
      </UTabs>
    </div>
  </main>
</template>
