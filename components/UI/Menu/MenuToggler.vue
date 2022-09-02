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
import { watch } from "vue";
import useMenuShowing from "@/composables/useMenuShowing";
import { Bars3Icon as MenuIcon } from "@heroicons/vue/24/solid";

const { afterEach } = useRouter();

const showMobileMenu = useMenuShowing();

if (process.client) {
  watch(showMobileMenu, (val) => {
    switch (val) {
      case true:
        document.body.style.overflowY = "hidden";
        break;
      case false:
        document.body.style.overflowY = "";
        break;

      default:
        break;
    }
  });
}

afterEach(() => {
  showMobileMenu.value = false;
});
</script>
