<template>
  <div class="mb-5 grid md:grid-cols-3 gap-5">
    <div class="card self-baseline md:order-2" v-if="shortSummary">
      <info-line
        v-for="(item, index) in shortSummary"
        :key="index"
        v-bind="item"
      />
    </div>
    <div class="md:col-span-2">
      <div
        v-if="description"
        class="description mce-styles"
        v-html="description"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "GeneralInfo",
};
</script>

<script setup lang="ts">
import InfoLine, { type InfoLineProps } from "@/components/UI/InfoLine.vue";

interface IProps {
  description?: string;
  shortSummary?: InfoLineProps[];
}

defineProps<IProps>();
</script>
