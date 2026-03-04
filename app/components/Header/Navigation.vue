<script setup lang="ts">
import type { NavigationMenuItem } from "#ui/types";

defineProps<{ preset?: "light" | "dark"; }>();

const { t } = useI18n();
const { gtag } = useGtag();

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

const blogMenuItem: NavigationMenuItem = {
  label: "Блог",
  to: "/about",
  target: "_blank",
  onSelect: () => {
    gtag("event", "hf_oscpv_click", {
      event_category: "affiliate",
      event_label: "oscpv",
    });
  },
};

const desktopMenuItems: NavigationMenuItem[] = [
  avilableCatalogMenuItem,
  catalogMenuItem,
  aboutMenuItem,
  blogMenuItem,
];
</script>

<template>
  <UNavigationMenu
    orientation="horizontal"
    :items="desktopMenuItems"
    variant="link"
    :external-icon="false"
    :ui="{
      root: `hidden lg:block desktop-nav ${preset}`,
      item: 'py-0',
      link: 'font-semibold uppercase text-default',
    }"
  />
</template>
