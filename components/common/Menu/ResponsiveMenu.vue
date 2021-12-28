<template>
  <div
    class="
      flex flex-col
      lg:flex-row
      justify-center
      items-center
      lg:static
      fixed
      bg-body-bg/70
      lg:bg-transparent
      top-12
      right-0
      p-9
      lg:p-0
      max-h-screen
      backdrop-blur-sm backdrop-brightness-150
    "
  >
    <MenuItem v-for="menuItem in menuItems" :item="menuItem" />
  </div>
</template>

<script lang="ts">
export default {
  name: "ResponsiveMenu",
};
</script>

<script setup lang="ts">
import MenuItem from "./MenuItem.vue";

const props = defineProps({
  menuItems: {
    type: Array,
    default: () => [],
  },
});
</script>
