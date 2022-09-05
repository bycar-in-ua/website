<template>
  <div class="flex justify-center sticky top-0 bg-body-bg">
    <div class="flex overflow-x-auto pb-2 mb-4">
      <a
        v-for="(anchor, index) in anchors"
        :key="index"
        :href="anchor.href"
        v-text="anchor.label"
        class="py-2 px-4 border-t-2 border-b-2 whitespace-nowrap"
        :class="route.hash === anchor.href ? 'border-primary text-primary' : ''"
      />
    </div>
  </div>

  <General :car="car" />
  <Complectations :car="car" />
</template>

<script lang="ts">
export default {
  name: "FullInfo",
};
</script>

<script setup lang="ts">
import { VehicleView as Car } from "@/common";
import General from "./General.vue";
import Complectations from "./Complectations/index.vue";

defineProps<{ car: Car }>();

const route = useRoute();

const { $t } = useNuxtApp();

const anchors = [
  {
    href: "#general",
    label: $t("vehicle.generalCharacteristics.title"),
  },
  {
    href: "#complectations",
    label: $t("vehicle.complectationsAndPrices"),
  },
];
</script>
