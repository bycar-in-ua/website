<script setup lang="ts">
import type { NavigationMenuItem } from "#ui/types";
import MenuToggler from "@/components/UI/Menu/MenuToggler.vue";
import Socials from "@/components/Footer/Socials.vue";
import Copyright from "@/components/Footer/Copyright.vue";
import { useMenuShowing } from "@/composables/useMenuShowing";
import AccountButton from "@/layers/profile/components/AccountButton.vue";

defineProps<{ preset?: "light" | "dark" }>();

const { t } = useI18n();

const showMobileMenu = useMenuShowing();

const menuItems: NavigationMenuItem[] = [
  {
    label: t("menu.home"),
    to: "/",
  },
  {
    label: t("menu.catalog"),
    to: "/catalog",
  },
  {
    label: t("menu.about"),
    to: "/about",
  },
];
</script>

<template>
  <UNavigationMenu
    orientation="horizontal"
    :items="menuItems"
    variant="link"
    color="neutral"
    :ui="{
      root: `hidden md:block desktop-nav ${preset}`,
      item: 'py-0',
    }"
  />

  <AccountButton
    class="desktop-nav text-muted hover:text-highlighted ml-auto"
  />

  <ClientOnly>
    <MenuToggler
      class="md:hidden desktop-nav text-muted hover:text-highlighted"
    />
  </ClientOnly>

  <USlideover
    v-model:open="showMobileMenu"
    :ui="{ overlay: 'md:hidden', content: 'md:hidden' }"
  >
    <template #content>
      <div class="flex justify-end py-4 px-2.5">
        <UButton
          icon="i-heroicons-x-mark"
          size="xl"
          square
          color="primary"
          variant="link"
          @click="showMobileMenu = false"
        />
      </div>

      <div class="flex flex-col p-4 sm:p-6 justify-between flex-1">
        <UNavigationMenu
          orientation="vertical"
          variant="link"
          :items="menuItems"
          class="header-nav"
        />

        <div class="flex flex-col gap-8">
          <Socials />
          <Copyright />
        </div>
      </div>
    </template>
  </USlideover>
</template>

<style>
.desktop-nav {
  --ui-text-muted: var(--color-gray-600);
  --ui-text-highlighted: var(--ui-primary);
}

.dark .desktop-nav {
  --ui-text-muted: var(--color-gray-300);
  --ui-text-highlighted: var(--color-white);
}
</style>
