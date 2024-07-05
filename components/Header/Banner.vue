<script setup lang="ts">
const isBannerClosed = ref(!!sessionStorage.getItem("isBannerClosed"));

const hadleClose = () => {
  sessionStorage.setItem("isBannerClosed", "1");
  isBannerClosed.value = true;
};
</script>

<template>
  <div v-if="!isBannerClosed" class="bg-yellow-400">
    <div
      class="container mx-auto text-white font-bold text-center py-1 px-6 relative"
    >
      Сайт в розробці. Приносимо вибачення за можливі незручності.
      <UIcon
        name="i-heroicons-x-mark"
        class="h-8 p-2 absolute right-0 top-0 cursor-pointer"
        @click="hadleClose"
      />
    </div>
  </div>
</template>
