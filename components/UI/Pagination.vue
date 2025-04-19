<script setup lang="ts">
import type { PaginationMeta } from "@bycar-in-ua/sdk";

defineProps<{ pagination: PaginationMeta }>();

const page = defineModel<number>("page", { default: 1 });
</script>

<template>
  <UPagination
    v-if="pagination.totalPages > 1"
    v-model:page="page"
    :total="pagination.totalItems"
    :items-per-page="pagination.itemsPerPage"
  />
</template>
