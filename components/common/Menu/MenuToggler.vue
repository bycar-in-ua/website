<template>
  <client-only>
    <MenuIcon
      class="h-12 p-3 cursor-pointer hover:text-primary block lg:hidden"
      @click="showMobileMenu = !showMobileMenu"
    />
  </client-only>
</template>

<script lang="ts">
export default {
  name: "MenuToggler",
};
</script>

<script setup lang="ts">
import useMenuShowing from "@/composables/useMenuShowing";
import { MenuIcon } from "@heroicons/vue/solid";
import { useRouter } from "vue-router";

const { afterEach } = useRouter();

const showMobileMenu = useMenuShowing();

afterEach(() => {
  showMobileMenu.value = false;
});
</script>
