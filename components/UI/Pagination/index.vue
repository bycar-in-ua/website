<script setup lang="ts">
import type { PaginationMeta } from "@bycar-in-ua/sdk";

const props = defineProps<{ pagination: PaginationMeta }>();

const page = defineModel<number>("page", { default: 1 });

const canGoFirstOrPrev = computed(() => page.value > 1);
const canGoLastOrNext = computed(() => page.value < props.pagination.totalPages);
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
      <UTooltip :text="$t('pagination.prev')">
        <UButton
          icon="i-heroicons-chevron-left"
          color="primary"
          :ui="{ rounded: 'rounded-full' }"
          class="mr-2"
          :disabled="!canGoFirstOrPrev"
          @click="onClick"
        />
      </UTooltip>
    </template>

    <template #next="{ onClick }">
      <UTooltip :text="$t('pagination.next')">
        <UButton
          icon="i-heroicons-chevron-right"
          color="primary"
          :ui="{ rounded: 'rounded-full' }"
          class="ml-2"
          :disabled="!canGoLastOrNext"
          @click="onClick"
        />
      </UTooltip>
    </template>
  </UPagination>
</template>
