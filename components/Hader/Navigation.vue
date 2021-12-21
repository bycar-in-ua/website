<template>
  <div class="flex">Menu</div>
</template>

<script lang="ts">
export default {
  name: "Navigation",
};
</script>

<script setup lang="ts">
import { ref } from "vue";

const menuItems = [
  {
    label: "Главная",
    key: "main",
  },
  {
    label: "Каталог",
    key: "catalog",
  },
];

const activeItem = ref("main");
</script>
