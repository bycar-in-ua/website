<script setup lang="ts">
import type { HorizontalNavigationLink } from "#ui/types";

const { t } = useI18n();

const menuItems: HorizontalNavigationLink[] = [
  {
    label: t("menu.home"),
    to: "/",
  },
  {
    label: "Каталог автомобілів",
    to: "/catalog",
  },
];
</script>

<template>
  <UVerticalNavigation
    :links="menuItems"
    :ui="{
      base: 'hover:text-primary',
      padding: 'py-2 px-0',
      active: 'text-primary before:bg-tranparent',
      inactive: 'text-gray-900 hover:before:bg-transparent',
      before: 'hover:before:bg-transparent',
      after: 'after:mt-1',
    }"
  />
</template>
