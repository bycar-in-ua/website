<script setup lang="ts">
import type { PaginationMeta } from "@bycar-in-ua/sdk";

const props = defineProps<{ pagination: PaginationMeta }>();

const page = defineModel<number>("page", { default: 1 });

const canGoFirstOrPrev = computed(() => page.value > 1);
const canGoLastOrNext = computed(
  () => page.value < props.pagination.totalPages,
);
</script>

<template>
  <UPagination
    v-if="pagination.totalPages > 1"
    v-model="page"
    :total="pagination.totalItems"
    :page-count="pagination.itemsPerPage"
    :ui="{ rounded: 'first-of-type:rounded-s-md last-of-type:rounded-e-md' }"
  >
    <template #prev="{ onClick }">
      <div>
        <UButton
          icon="i-heroicons-chevron-left"
          color="primary"
          :ui="{ rounded: 'rounded-full' }"
          class="mr-2"
          :title="$t('pagination.prev')"
          :disabled="!canGoFirstOrPrev"
          @click="onClick"
        />
      </div>
    </template>

    <template #next="{ onClick }">
      <div>
        <UButton
          icon="i-heroicons-chevron-right"
          color="primary"
          :ui="{ rounded: 'rounded-full' }"
          class="ml-2"
          :disabled="!canGoLastOrNext"
          :title="$t('pagination.next')"
          @click="onClick"
        />
      </div>
    </template>
  </UPagination>
</template>
