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
import { ref } from "vue";
import ResponsiveMenu from "@/components/common/Menu/ResponsiveMenu.vue";
import MenuToggler from "@/components/common/Menu/MenuToggler.vue";

const menuItems = [
  {
    label: "Главная",
    route: "/",
    exact: true,
  },
  {
    label: "Каталог",
    route: "/catalog",
    exact: false,
  },
];

const activeItem = ref("main");
</script>
