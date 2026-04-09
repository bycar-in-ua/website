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

const navItems: NavigationMenuItem[] = [
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
    to: "/profile/saved-cars",
  },
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

    <div class="container mx-auto py-16 flex justify-between gap-8">
      <div class="max-w-xs w-full space-y-2">
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

      <NuxtPage class="max-w-212 w-full" />
    </div>
  </main>
</template>
