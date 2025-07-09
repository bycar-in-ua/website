<script setup lang="ts">
import PersonalDataSection from "~/layers/profile/components/PersonalDataSection.vue";
import type { TabsItem } from "@nuxt/ui";

definePageMeta({
  middleware: "auth",
});

const authStore = useAuthStore();

useHead({
  title: [authStore.name, "Профіль", "Bycar"].filter(Boolean).join(" | "),
});

const items: TabsItem[] = [
  {
    label: "Персональні дані",
    slot: "personal",
  },
];
</script>

<template>
  <main class="container my-24 md:my-32">
    <div class="rounded-3xl overflow-hidden h-60 relative">
      <img
        src="/images/profile-bg.png"
        alt="Profile background"
        class="h-full w-full object-cover"
      />
    </div>

    <div class="relative -top-10 z-10 px-8 space-y-2">
      <UserAvatar :avatar="authStore.user?.avatar" class="w-20 h-20" />

      <h3 class="font-semibold text-xl sm:text-3xl">
        {{ authStore.name }}
      </h3>
    </div>

    <UTabs variant="link" :items="items" class="w-full gap-8">
      <template #personal>
        <PersonalDataSection />
      </template>
    </UTabs>
  </main>
</template>
