<template>
  <div class="mb-5 grid md:grid-cols-3 gap-5">
    <div class="md:col-span-2" v-if="description">
      <h3 class="mb-5 font-semibold">Опис</h3>
      <div class="description mce-styles" v-html="description" />
    </div>
    <div class="card self-baseline" v-if="shortSummary">
      <div v-for="(item, index) in shortSummary" :key="index" class="flex">
        <span v-text="item.name" />
        <div class="border-b border-dotted flex-grow" />
        <span v-text="item.value" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "GeneralInfo",
};
</script>

<script setup lang="ts">
import type { ShortSummary } from ".";

interface IProps {
  description?: string;
  shortSummary?: ShortSummary[];
}

defineProps<IProps>();
</script>
