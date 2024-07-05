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
    :ui="{ wrapper: 'justify-center hidden md:flex' }"
  />
  <ClientOnly>
    <MenuToggler />
  </ClientOnly>
  <USlideover v-model="showMobileMenu" class="md:hidden">
    <div class="flex justify-end py-4 px-2">
      <UIcon
        name="i-heroicons-x-mark"
        class="w-6 h-6"
        @click="showMobileMenu = false"
      />
    </div>
    <UVerticalNavigation
      :links="menuItems"
      :ui="{ wrapper: 'py-4', base: 'justify-center', size: 'text-xl' }"
    />
  </USlideover>
</template>
