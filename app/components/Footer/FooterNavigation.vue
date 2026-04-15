<script setup lang="ts">
import { UNavigationMenu } from "#components";
import type { NavigationMenuItem } from "#ui/types";

const { t } = useI18n();

defineOptions({ inheritAttrs: false });

const menuItems: NavigationMenuItem[] = [
  {
    label: t("menu.catalog"),
    to: "/catalog",
  },
  {
    label: t("menu.avaliableAuto"),
    to: "/catalog",
  },
  {
    label: t("menu.about"),
    to: "/about",
  },
];

const contacts: NavigationMenuItem[] = [
  {
    label: "Звʼязатися з нами",
    to: "#contact-container",
  },
  // {
  //   label: "Співробітництво",
  //   to: "#partnership-container", // TODO: check after merge BCR-138
  // },
  // {
  //   label: "Повідомити про проблему",
  //   disabled: true,
  // },
];

const policies: NavigationMenuItem[] = [
  {
    label: "Політика конфіденційності",
    to: "/privacy-policy",
  },
  {
    label: "Використання файлів Cookie",
    to: "/cookie-policy",
  },
];

const columns = [
  {
    title: "Bycar",
    links: menuItems,
  },
  {
    title: "Контакт з нами",
    links: contacts,
  },
  {
    title: "Політика конфіденційності",
    links: policies,
  },
];
</script>

<template>
  <div
    v-for="(column, index) in columns"
    :id="`footer-nav-col-${index}`"
    :key="column.title"
    class="w-full"
  >
    <h3 class="uppercase font-semibold text-sm text-gray-500 mb-4">
      {{ column.title }}
    </h3>

    <UNavigationMenu
      :items="column.links"
      orientation="vertical"
      variant="link"
      :external-icon="false"
      :ui="{
        root: 'footer-nav',
        link: 'p-0 text-white font-semibold text-sm',
        list: 'flex flex-col gap-3',
      }"
      v-bind:="$attrs"
    />
  </div>
</template>

<style>
.footer-nav {
  --ui-text-muted: var(--color-black);
  --ui-text-highlighted: var(--ui-primary);
}
</style>
