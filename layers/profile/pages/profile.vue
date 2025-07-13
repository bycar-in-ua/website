<script setup lang="ts">
import PersonalDataSection from "../components/PersonalDataSection.vue";
import SecuritySection from "../components/SecuritySection.vue";
import type { TabsItem } from "@nuxt/ui";

definePageMeta({
  middleware: "auth",
  name: "profile",
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
  {
    label: "Безпека",
    slot: "security",
  },
];
</script>

<template>
  <main class="container my-24 md:my-32">
    <div class="rounded-3xl overflow-hidden h-24 sm:h-40 md:h-60 relative">
      <img
        src="/images/profile-bg.png"
        alt="Profile background"
        class="h-full w-full object-cover"
      />
    </div>

    <div class="relative -top-10 z-10 px-4 sm:px-8 space-y-2">
      <UserAvatar :avatar="authStore.user?.avatar" class="w-20 h-20" />

      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-xl sm:text-3xl">
          {{ authStore.name }}
        </h3>
        <UButton
          label="Вийти"
          icon="i-lucide-log-out"
          trailing
          variant="link"
          color="neutral"
          title="Вийти"
          @click="authStore.logout()"
        />
      </div>
    </div>

    <UTabs variant="link" :items="items" class="w-full gap-8">
      <template #personal>
        <PersonalDataSection />
      </template>
      <template #security>
        <SecuritySection />
      </template>
    </UTabs>
  </main>
</template>
