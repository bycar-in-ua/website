<template>
  <div v-if="!isBannerClosed" class="bg-accent">
    <div
      class="container mx-auto text-white font-bold text-center py-1 px-6 relative"
    >
      Сайт в розробці. Приносимо вибачення за можливі незручності.
      <XMarkIcon
        class="h-8 p-2 absolute right-0 top-0 cursor-pointer"
        @click="hadleClose"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Banner",
});
</script>

<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/20/solid";

const isBannerClosed = ref(!!sessionStorage.getItem("isBannerClosed"));

const hadleClose = () => {
  sessionStorage.setItem("isBannerClosed", "1");
  isBannerClosed.value = true;
};
</script>
