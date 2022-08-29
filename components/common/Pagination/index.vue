<template>
  <div class="flex">
    <a
      v-for="i in pagination.totalPages"
      :key="i"
      :href="`#${i}`"
      class="text-primary hover:underline mx-2"
      @click.prevent="$emit('update:page', i)"
      >{{ i }}</a
    >
  </div>
</template>

<script lang="ts">
export default {
  name: "Pagination",
};
</script>

<script setup lang="ts">
import { PaginationMeta } from "@/common";

defineProps<{ pagination: PaginationMeta }>();

defineEmits(["update:page"]);
</script>
