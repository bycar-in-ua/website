<script setup lang="ts">
import { UNavigationMenu } from "#components";
import type { NavigationMenuItem } from "#ui/types";
import { HF_OSCPV } from "@/utils/constants";

const { t } = useI18n();

defineOptions({
  inheritAttrs: false,
});

const menuItems: NavigationMenuItem[] = [
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
  {
    label: "Оформити автоцивілку (ОСЦПВ)",
    to: HF_OSCPV,
    target: "_blank",
  },
];

const additionalMenuItems: NavigationMenuItem[] = [
  {
    label: "Політика конфіденційності",
    to: "/privacy-policy",
  },
  {
    label: "Політика використання файлів Cookie",
    to: "/cookie-policy",
  },
  {
    label: "Форма зворотнього зв'язку",
    to: "https://coda.io/form/Bycar_dQUuO3ebNz6",
    target: "_blank",
  },
];
</script>

<template>
  <UNavigationMenu
    v-for="(links, i) in [menuItems, additionalMenuItems]"
    :key="i"
    :items="links"
    orientation="vertical"
    variant="link"
    :external-icon="false"
    :ui="{
      root: 'footer-nav',
      linkLabel: 'whitespace-break-spaces',
    }"
    v-bind:="$attrs"
  />
</template>

<style>
.footer-nav {
  --ui-text-muted: var(--color-black);
  --ui-text-highlighted: var(--ui-primary);
}
</style>
