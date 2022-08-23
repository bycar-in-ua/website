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
import ResponsiveMenu from "@/components/common/Menu/ResponsiveMenu.vue";
import MenuToggler from "@/components/common/Menu/MenuToggler.vue";

const menuItems = [
  {
    label: "Головна",
    route: "/",
    exact: true,
  },
  {
    label: "Каталог",
    route: "/catalog",
    exact: false,
  },
];
</script>
