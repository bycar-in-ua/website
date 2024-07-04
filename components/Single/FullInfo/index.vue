<template>
  <General :car="car" />
  <Complectations :car="car" />
</template>

<script lang="ts">
export default {
  name: "FullInfo",
};
</script>

<script setup lang="ts">
import type { VehicleView as Car } from "@bycar-in-ua/common";
import General from "./General.vue";
import Complectations from "./Complectations/index.vue";

defineProps<{ car: Car }>();
</script>
