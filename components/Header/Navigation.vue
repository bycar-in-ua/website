<template>
  <ResponsiveMenu :menu-items="menuItems" />
  <MenuToggler />
</template>

<script lang="ts">
export default {
  name: "Navigation",
};
</script>

<script setup lang="ts">
import ResponsiveMenu from "@/components/UI/Menu/ResponsiveMenu.vue";
import MenuToggler from "@/components/UI/Menu/MenuToggler.vue";

const { t } = useI18n();

const menuItems = [
  {
    label: t("menu.home"),
    route: "/",
    exact: true,
  },
  {
    label: t("menu.home"),
    route: "/catalog",
    exact: false,
  },
];
</script>
