<template>
  <div v-if="value" class="flex py-1 border-b border-dotted justify-between">
    <span class="pr-1">{{ name }}</span>
    <span class="text-right pl-1">{{ value }}</span>
  </div>
  <div v-if="children?.length" class="pl-2">
    <InfoLine v-for="(item, index) in children" :key="index" v-bind="item" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "InfoLine",
});
</script>

<script setup lang="ts">
export interface InfoLineProps {
  name: string;
  value: string | number | null;
  children?: InfoLineProps[];
}

defineProps<InfoLineProps>();
</script>
