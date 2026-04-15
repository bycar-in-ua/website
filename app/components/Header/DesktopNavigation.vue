<script setup lang="ts">
import type { NavigationMenuItem } from "#ui/types";

const { t } = useI18n();

const catalogMenuItem: NavigationMenuItem = {
  label: "Каталог моделей",
  to: "/catalog",
};

const avilableCatalogMenuItem: NavigationMenuItem = {
  label: "Aвто в наявності",
  to: "/catalog",
};

const aboutMenuItem: NavigationMenuItem = {
  label: t("menu.about"),
  to: "/about",
};

// const blogMenuItem: NavigationMenuItem = {
//   label: "Блог",
//   to: "/about",
//   target: "_blank",
//   onSelect: () => {
//     gtag("event", "hf_oscpv_click", {
//       event_category: "affiliate",
//       event_label: "oscpv",
//     });
//   },
// };

const desktopMenuItems: NavigationMenuItem[] = [
  avilableCatalogMenuItem,
  catalogMenuItem,
  aboutMenuItem,
  // blogMenuItem,
];
</script>

<template>
  <UNavigationMenu
    orientation="horizontal"
    :items="desktopMenuItems"
    variant="link"
    :ui="{
      item: 'py-0',
      link: 'font-semibold uppercase text-default',
    }"
  />
</template>
