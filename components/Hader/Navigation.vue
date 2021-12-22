<template>
  <ResponsiveMenu :menu-items="menuItems" />
</template>

<script lang="ts">
export default {
  name: "Navigation",
};
</script>

<script setup lang="ts">
import { ref } from "vue";
import ResponsiveMenu from "@/components/common/Menu/ResponsiveMenu.vue";

const menuItems = [
  {
    label: "Главная",
    route: "/",
  },
  {
    label: "Каталог",
    route: "/catalog",
  },
];

const activeItem = ref("main");
</script>
