<script setup lang="ts">
import type { HorizontalNavigationLink } from "#ui/types";
import MenuToggler from "@/components/UI/Menu/MenuToggler.vue";
import Socials from "@/components/Footer/Socials.vue";
import Copyright from "@/components/Footer/Copyright.vue";
import { useMenuShowing } from "@/composables/useMenuShowing";

const { t } = useI18n();

const showMobileMenu = useMenuShowing();

const menuItems: HorizontalNavigationLink[] = [
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
  <UHorizontalNavigation
    :links="menuItems"
    :ui="{
      wrapper: 'hidden md:flex',
      base: 'py-2 hover:text-primary',
      active: 'text-primary',
      inactive: 'text-gray-900',
      before: 'hover:before:bg-transparent',
      after: 'after:mt-1',
    }"
  />

  <ClientOnly>
    <MenuToggler class="ml-auto md:hidden" />
  </ClientOnly>

  <USlideover v-model="showMobileMenu" class="md:hidden">
    <div class="flex justify-end py-6 px-2.5">
      <UButton
        icon="i-heroicons-x-mark"
        size="xl"
        square
        color="primary"
        variant="link"
        @click="showMobileMenu = false"
      />
    </div>

    <div class="flex flex-col px-6 pb-6 justify-between flex-1">
      <UVerticalNavigation
        :links="menuItems"
        :ui="{
          active:
            'text-primary before:bg-transparent underline underline-offset-4 decoration-2',
          inactive: 'text-gray-900',
          label: 'text-lg',
          padding: 'px-0 py-2',
        }"
      />

      <div class="flex flex-col gap-8">
        <Socials />
        <Copyright />
      </div>
    </div>
  </USlideover>
</template>
