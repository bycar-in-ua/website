<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import PageHeader from "~/components/UI/PageHeader.vue";

definePageMeta({
  middleware: "auth",
  name: "profile",
});

const { user } = useUserSession();

const name = computed(() => {
  const firstName = user.value?.data?.firstName || "";
  const lastName = user.value?.data?.lastName || "";
  return [firstName, lastName].filter(Boolean).join(" ");
});

useHead({
  title: [
    name.value, "Профіль", "Bycar",
  ].filter(Boolean).join(" | "),
});

const { logout } = useLogout();

const responsiveNavItems: NavigationMenuItem[] = [
  {
    label: "Особисті дані",
    icon: "i-lucide-user",
    to: "/profile/personal",
  },
  {
    label: "Мої пропозиції",
    icon: "i-lucide-file-text",
    to: "/profile/offers",
  },
  {
    label: "Обране",
    icon: "i-lucide-bookmark",
    to: "/profile/favorite",
  },
] as const;

const navItems: NavigationMenuItem[] = [
  ...responsiveNavItems,
  {
    label: "Вийти",
    icon: "i-lucide-log-out",
    onSelect: () => logout(),
  },
] as const;

const route = useRoute();

onMounted(() => {
  if (route.path === "/profile") {
    navigateTo("/profile/offers");
  }
});
</script>

<template>
  <main>
    <PageHeader :title="['Мій кабінет', 'Все під вашим контролем']" bg-url="/images/profile-bg.png" />

    <div class="container mx-auto pt-8 pb-12 md:py-16 lg:flex justify-between gap-8">
      <div class="flex gap-1.5 sm:gap-2 items-center mb-6 sm:mb-8 lg:hidden overflow-y-auto no-scrollbar -me-2 sm:me-0 pe-2 sm:pe-0">
        <UButton
          v-for="(item, i) in responsiveNavItems"
          :key="i"
          size="sm"
          :label="item.label"
          :to="item.to"
          :variant="route.path === item.to ? 'solid' : 'outline'"
          :color="route.path === item.to ? 'primary' : 'secondary'"
          :leading-icon="item.icon"
        />
      </div>

      <div class="hidden lg:block max-w-2xs lg:max-w-xs w-full space-y-2">
        <UButton
          v-for="(item, i) in navItems"
          :key="i"
          size="md"
          class="w-full"
          :label="item.label"
          :to="item.to"
          :variant="route.path === item.to ? 'outline' : 'ghost'"
          :color="route.path === item.to ? 'primary' : 'neutral'"
          :trailing-icon="route.path === item.to ? 'i-lucide-arrow-right' : ''"
          :leading-icon="item.icon"
          :ui="{
            trailingIcon: 'ms-auto',
          }"
          @click="item?.onSelect"
        />
      </div>

      <NuxtPage class="lg:max-w-212 w-full" />
    </div>
  </main>
</template>
