<script setup lang="ts">
import Filters from "./Filters/Filters.vue";
import FloatingFiltersButton from "./Filters/FloatingFiltersButton.vue";

const isSidebarShowing = ref(false);
</script>

<template>
  <div
    class="overflow-y-auto max-h-full relative shrink-0 basis-72 hidden lg:flex flex-col gap-6"
  >
    <Filters />
  </div>

  <USlideover
    v-model:open="isSidebarShowing"
    :ui="{
      overlay: 'lg:hidden',
      content: 'lg:hidden',
      body: 'flex flex-col gap-4 justify-between pr-2 sm:pr-2',
    }"
  >
    <template #body>
      <div class="flex flex-col gap-4 flex-grow overflow-y-auto pb-4 pr-2">
        <Filters />
      </div>

      <UButton
        block
        icon="i-heroicons-funnel"
        trailing
        :ui="{ trailingIcon: 'ms-0' }"
        @click="isSidebarShowing = false"
      >
        Застосувати
      </UButton>
    </template>
  </USlideover>

  <FloatingFiltersButton
    class="lg:hidden z-20"
    @click="isSidebarShowing = true"
  />
</template>
