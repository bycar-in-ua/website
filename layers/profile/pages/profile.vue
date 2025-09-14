<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

definePageMeta({
  middleware: "auth",
  name: "profile",
});

const authStore = useAuthStore();

useHead({
  title: [
    authStore.name, "Профіль", "Bycar",
  ].filter(Boolean).join(" | "),
});

const navItems: NavigationMenuItem[] = [
  {
    label: "Збережені авто",
    icon: "i-heroicons-heart-solid",
    to: "/profile/saved-cars",
  },
  {
    label: "Персональні дані",
    icon: "i-heroicons-user-solid",
    to: "/profile/personal",
  },
  {
    label: "Безпека",
    icon: "i-heroicons-lock-closed-solid",
    to: "/profile/security",
  },
] as const;

const route = useRoute();

onMounted(() => {
  if (route.path === "/profile") {
    navigateTo("/profile/personal");
  }
});
</script>

<template>
  <main class="container my-24 md:my-32">
    <div class="rounded-3xl overflow-hidden h-24 sm:h-40 md:h-60 relative">
      <img
        src="/images/profile-bg.png"
        alt="Profile background"
        class="h-full w-full object-cover"
      >
    </div>

    <div class="relative -top-10 z-10 px-4 sm:px-8 space-y-2">
      <div class="bg-white rounded-full inline-block">
        <UserAvatar :avatar="authStore.user?.avatar" class="w-20 h-20" />
      </div>

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

    <UNavigationMenu
      highlight
      highlight-color="primary"
      orientation="horizontal"
      :items="navItems"
      class="data-[orientation=horizontal]:border-b border-default overflow-x-auto no-scrollbar"
      :ui="{
        list: 'w-max',
        linkLeadingIcon: 'size-4 sm:size-5',
        linkLabel: 'text-xs sm:text-base',
        link: 'px-1 sm:px-2.5 after:inset-x-1 sm:after:inset-x-2.5',
      }"
    />

    <NuxtPage class="my-8" />
  </main>
</template>
