<script setup lang="ts">
import type { TrimView } from "@bycar-in-ua/vehicles-sdk";

defineProps<{ options?: TrimView["options"]; }>();
</script>

<template>
  <UTabs
    :items="options"
    label-key="displayName"
    value-key="id"
    class="w-full"
    variant="pill"
    color="secondary"
    :default-value="options?.[0]?.id"
    :ui="{ label: 'normal-case', root: 'gap-6', list: 'overflow-x-auto no-scrollbar' }"
  >
    <template #content="{ item }">
      <ul>
        <li v-for="option in item.options" :key="option.id" class="flex items-center gap-3 font-semibold py-2 pl-3 text-gray-900">
          <span class="size-2 shrink-0 bg-gray-100" />
          {{ option.displayName }}
        </li>
      </ul>
    </template>
  </UTabs>
</template>
