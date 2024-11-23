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
  <UButton
    icon="i-heroicons-bars-3"
    size="xl"
    square
    color="primary"
    variant="link"
    @click="showMobileMenu = !showMobileMenu"
  />
</template>
