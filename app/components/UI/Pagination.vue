<script setup lang="ts">
import type { PaginatedResponse } from "@bycar-in-ua/auth-sdk";

defineProps<{ pagination?: PaginatedResponse<never>["meta"]; }>();

const page = defineModel<number>("page", { default: 1 });
</script>

<template>
  <UPagination
    v-if="pagination?.totalPages && pagination.totalPages > 1"
    v-model:page="page"
    :total="pagination.totalItems"
    :items-per-page="pagination.itemsPerPage"
  />
</template>
