<template>
  <div class="flex justify-center items-center">
    <MenuItem v-for="menuItem in menuItems" :item="menuItem" />
  </div>
</template>

<script lang="ts">
export default {
  name: "ResponsiveMenu",
};
</script>

<script setup lang="ts">
import { defineProps } from "vue";
import MenuItem from "./MenuItem.vue";

const props = defineProps({
  menuItems: {
    type: Array,
    default: () => [],
  },
});
</script>
