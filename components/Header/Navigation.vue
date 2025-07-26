<script setup lang="ts">
import type { NavigationMenuItem } from "#ui/types";
import MenuToggler from "@/components/UI/Menu/MenuToggler.vue";
import Logo from "@/components/UI/Logo.vue";
import { useMenuShowing } from "@/composables/useMenuShowing";
import AccountButton from "@/layers/profile/components/AccountButton.vue";
import {
  YOUTUBE_CHANNEL_URL,
  INSTAGRAM_CHANNEL_URL,
  TELEGRAM_CHANNEL_URL,
  COPYRIGHT_TEXT,
  HF_OSAGO,
} from "@/utils/constants";

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
  {
    label: "Оформити автоцивілку",
    to: HF_OSAGO,
    target: "_blank",
  },
];
</script>

<template>
  <UNavigationMenu
    orientation="horizontal"
    :items="menuItems"
    variant="link"
    color="neutral"
    :external-icon="false"
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
      <div class="flex py-3 px-4 gap-4">
        <NuxtLink to="/">
          <Logo class="h-10" />
        </NuxtLink>

        <UButton
          icon="i-heroicons-x-mark"
          size="xl"
          square
          color="primary"
          variant="outline"
          class="ml-auto"
          @click="showMobileMenu = false"
        />
      </div>

      <div class="flex flex-col px-4 py-1 justify-between flex-1">
        <UNavigationMenu
          orientation="vertical"
          variant="link"
          :items="menuItems"
          class="mobile-nav"
          :ui="{
            link: 'px-0 py-3 text-lg',
            list: 'divide-y divide-default',
          }"
        />

        <div
          class="mt-auto flex justify-center flex-wrap border-t border-default"
        >
          <NuxtLink class="px-5 py-4" :to="YOUTUBE_CHANNEL_URL">
            Youtube
          </NuxtLink>
          <NuxtLink class="px-5 py-4" :to="INSTAGRAM_CHANNEL_URL">
            Instagram
          </NuxtLink>
          <NuxtLink class="px-5 py-4" :to="TELEGRAM_CHANNEL_URL">
            Telegram
          </NuxtLink>
        </div>
      </div>

      <div class="px-4 py-6 text-center">
        {{ COPYRIGHT_TEXT }}
      </div>
    </template>
  </USlideover>
</template>

<style>
.desktop-nav {
  --ui-text-muted: var(--color-gray-600);
  --ui-text-highlighted: var(--ui-primary);
}

.mobile-nav {
  --ui-text-muted: var(--ui-text);
  --ui-text-highlighted: var(--ui-primary);
}

.dark .desktop-nav {
  --ui-text-muted: var(--color-gray-300);
  --ui-text-highlighted: var(--color-white);
}
</style>
