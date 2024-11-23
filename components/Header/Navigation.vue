<script setup lang="ts">
import type { HorizontalNavigationLink } from "#ui/types";
import MenuToggler from "@/components/UI/Menu/MenuToggler.vue";

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
    <div class="flex justify-end py-4 px-2">
      <UButton
        icon="i-heroicons-x-mark"
        size="xl"
        square
        color="primary"
        variant="link"
        @click="showMobileMenu = false"
      />
    </div>
    <UVerticalNavigation
      :links="menuItems"
      :ui="{
        base: 'justify-center py-2',
        active:
          'text-primary before:bg-transparent underline underline-offset-4',
        inactive: 'text-gray-900',
        label: 'text-lg',
      }"
    />
  </USlideover>
</template>
