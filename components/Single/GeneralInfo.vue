<template>
  <div class="mb-5 grid md:grid-cols-3 gap-5">
    <div class="md:col-span-2" v-if="description">
      <h3 class="mb-5 font-semibold">{{ $t("description") }}</h3>
      <div class="description mce-styles" v-html="description" />
    </div>
    <div class="card self-baseline" v-if="shortSummary">
      <info-line
        v-for="(item, index) in shortSummary"
        :key="index"
        v-bind="item"
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
import { InfoLine, InfoLineProps } from "@/components/common/InfoLine";

interface IProps {
  description?: string;
  shortSummary?: InfoLineProps[];
}

defineProps<IProps>();

const { $t } = useNuxtApp();
</script>
