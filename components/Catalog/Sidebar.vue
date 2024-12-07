<script setup lang="ts">
import Filters from "./Filters/Filters.vue";
import FloatingFiltersButton from "./Filters/FloatingFiltersButton.vue";

const isSidebarShowing = ref(false);
</script>

<template>
  <div
    class="overflow-y-auto max-h-full relative shrink-0 basis-64 hidden lg:block overflow-x-hidden"
  >
    <Filters />
  </div>

  <USlideover v-model="isSidebarShowing" class="lg:hidden">
    <div class="flex flex-col gap-5 py-6 px-2 relative overflow-x-auto">
      <UButton
        icon="i-heroicons-x-mark"
        size="xl"
        square
        color="primary"
        variant="link"
        class="ml-auto"
        @click="isSidebarShowing = false"
      />
      <div class="overflow-auto px-3">
        <Filters />
      </div>
      <UButton
        block
        icon="i-heroicons-funnel"
        trailing
        @click="isSidebarShowing = false"
      >
        Застосувати
      </UButton>
    </div>
  </USlideover>

  <FloatingFiltersButton
    class="lg:hidden z-20"
    @click="isSidebarShowing = true"
  />
</template>
