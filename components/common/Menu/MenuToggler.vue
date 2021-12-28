<template>
  <client-only>
    <MenuIcon
      class="h-12 p-3 cursor-pointer hover:text-primary block lg:hidden"
    />
  </client-only>
</template>

<script lang="ts">
export default {
  name: "MenuToggler",
};
</script>

<script setup lang="ts">
import { MenuIcon } from "@heroicons/vue/solid";
</script>
