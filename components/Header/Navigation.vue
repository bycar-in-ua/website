<script setup lang="ts">
import type { NavigationMenuItem } from "#ui/types";
import MenuToggler from "@/components/UI/Menu/MenuToggler.vue";
import Socials from "@/components/Footer/Socials.vue";
import Copyright from "@/components/Footer/Copyright.vue";
import { useMenuShowing } from "@/composables/useMenuShowing";

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
    highlight
    :ui="{
      root: 'hidden md:block header-nav',
      link: 'after:h-0.5',
    }"
  />

  <ClientOnly>
    <MenuToggler class="ml-auto md:hidden" />
  </ClientOnly>

  <USlideover v-model:open="showMobileMenu" class="md:hidden">
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
.header-nav {
  --ui-text-muted: var(--color-black);
  --ui-text-highlighted: var(--ui-primary);
}
</style>
