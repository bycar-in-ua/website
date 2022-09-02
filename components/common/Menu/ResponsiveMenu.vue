<template>
  <nav
    class="flex flex-col lg:flex-row items-center lg:static fixed bg-body-bg/70 lg:bg-transparent top-12 p-9 lg:p-0 max-h-screen h-screen md:h-auto w-screen md:w-auto backdrop-blur-sm backdrop-brightness-150 transition-all right-0 lg:translate-x-0"
    :class="showMobileMenu ? 'translate-x-0' : 'translate-x-full'"
  >
    <MenuItem v-for="menuItem in menuItems" :item="menuItem" />
  </nav>
</template>

<script lang="ts">
export default {
  name: "ResponsiveMenu",
};
</script>

<script setup lang="ts">
import useMenuShowing from "@/composables/useMenuShowing";
import MenuItem from "./MenuItem.vue";

defineProps({
  menuItems: {
    type: Array,
    default: () => [],
  },
});

const showMobileMenu = useMenuShowing();
</script>
