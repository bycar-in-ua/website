<script setup lang="ts">
import { watch } from "vue";
import useMenuShowing from "@/composables/useMenuShowing";
import { bodyScrollWatcher } from "@/utils/htmlUtils";

const { afterEach } = useRouter();

const showMobileMenu = useMenuShowing();

if (import.meta.client) {
  watch(showMobileMenu, bodyScrollWatcher);
}

afterEach(() => {
  showMobileMenu.value = false;
});
</script>

<template>
  <UIcon
    name="i-heroicons-bars-3"
    class="h-12 p-3 cursor-pointer hover:text-primary block md:hidden"
    @click="showMobileMenu = !showMobileMenu"
  />
</template>
