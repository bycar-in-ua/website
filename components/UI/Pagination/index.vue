<template>
  <div v-if="pagination.totalPages && pagination.totalPages > 1" class="flex">
    <a
      v-for="i in pagination.totalPages"
      :key="i"
      :href="`#${i}`"
      class="mx-1 px-2 text-lg"
      :class="
        pagination.currentPage === i
          ? 'pointer-events-none bg-primary text-white'
          : 'text-primary hover:underline'
      "
      @click.prevent="$emit('update:page', i)"
    >{{ i }}</a>
  </div>
</template>

<script lang="ts">
export default {
  name: "Pagination",
};
</script>

<script setup lang="ts">
import type { PaginationMeta } from "@bycar-in-ua/common";

defineProps<{ pagination: PaginationMeta }>();

defineEmits(["update:page"]);
</script>
