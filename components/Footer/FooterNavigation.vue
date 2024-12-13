<script setup lang="ts">
import type { HorizontalNavigationLink } from "#ui/types";

const { t } = useI18n();

const menuItems: HorizontalNavigationLink[] = [
  {
    label: t("menu.home"),
    to: "/",
  },
  {
    label: t("menu.catalogAuto"),
    to: "/catalog",
  },
  {
    label: t("menu.about"),
    to: "/about",
  },
];

const additionalMenuItems: HorizontalNavigationLink[] = [
  {
    label: "Політика конфіденційності",
    to: "/privacy-policy",
  },
  {
    label: "Політика використання файлів Cookie",
    to: "/cookie-policy",
  },
];
</script>

<template>
  <UVerticalNavigation
    v-for="(links, i) in [menuItems, additionalMenuItems]"
    :key="i"
    :links="links"
    :ui="{
      base: 'hover:text-primary',
      padding: 'pt-0 px-0',
      active: 'text-primary before:bg-tranparent',
      inactive: 'text-gray-900 hover:before:bg-transparent',
      before: 'hover:before:bg-transparent',
      after: 'after:mt-1',
      size: 'text-base',
      label: '',
    }"
  />
</template>
