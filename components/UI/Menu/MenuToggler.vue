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
import { bodyScrollWatcher } from "@/utils/htmlUtils";

const { afterEach } = useRouter();

const showMobileMenu = useMenuShowing();

if (process.client) {
  watch(showMobileMenu, bodyScrollWatcher);
}

afterEach(() => {
  showMobileMenu.value = false;
});
</script>
