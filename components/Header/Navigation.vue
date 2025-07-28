<script setup lang="ts">
import type { NavigationMenuItem } from "#ui/types";
import MenuToggler from "~/components/UI/Menu/MenuToggler.vue";
import Logo from "~/components/UI/Logo.vue";
import { useMenuShowing } from "~/composables/useMenuShowing";
import { useProfileNavigation } from "~/layers/profile/composables/useProfileNavigation";
import {
  YOUTUBE_CHANNEL_URL,
  INSTAGRAM_CHANNEL_URL,
  TELEGRAM_CHANNEL_URL,
  COPYRIGHT_TEXT,
  HF_OSCPV,
} from "~/utils/constants";
import HeaderCtaButton from "./HeaderCtaButton.vue";

defineProps<{ preset?: "light" | "dark" }>();

const { t } = useI18n();

const showMobileMenu = useMenuShowing();

const {
  personalProfileMenuItem,
  PersonalProfileNavButton,
  savedCarsMenuItem,
  SavedCarsNavButton,
} = useProfileNavigation();

const homeMenuItem: NavigationMenuItem = {
  label: t("menu.home"),
  to: "/",
};

const catalogMenuItem: NavigationMenuItem = {
  label: t("menu.catalog"),
  to: "/catalog",
};

const aboutMenuItem: NavigationMenuItem = {
  label: t("menu.about"),
  to: "/about",
};

const oscpvMenuItem: NavigationMenuItem = {
  label: "Оформити автоцивілку",
  to: HF_OSCPV,
  target: "_blank",
};

const desktopMenuItems: NavigationMenuItem[] = [
  homeMenuItem,
  catalogMenuItem,
  aboutMenuItem,
  oscpvMenuItem,
];

const mobileMenuItems = computed<NavigationMenuItem[]>(() => [
  homeMenuItem,
  catalogMenuItem,
  aboutMenuItem,
  personalProfileMenuItem,
  savedCarsMenuItem.value,
  oscpvMenuItem,
]);
</script>

<template>
  <UNavigationMenu
    orientation="horizontal"
    :items="desktopMenuItems"
    variant="link"
    color="neutral"
    :external-icon="false"
    :ui="{
      root: `hidden lg:block desktop-nav ${preset}`,
      item: 'py-0',
    }"
  />

  <div class="ml-auto hidden md:flex items-center desktop-nav">
    <SavedCarsNavButton class="text-muted hover:text-highlighted" />

    <PersonalProfileNavButton class="text-muted hover:text-highlighted" />

    <HeaderCtaButton class="ml-2 text-white" />
  </div>

  <ClientOnly>
    <MenuToggler
      class="lg:hidden desktop-nav text-muted hover:text-highlighted ml-auto md:ml-0"
    />
  </ClientOnly>

  <USlideover
    v-model:open="showMobileMenu"
    :ui="{ overlay: 'lg:hidden', content: 'lg:hidden' }"
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
          :items="mobileMenuItems"
          :external-icon="false"
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
        <HeaderCtaButton
          block
          class="mb-4"
          :ui="{ trailingIcon: 'ms-0' }"
          @click="showMobileMenu = false"
        />

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
