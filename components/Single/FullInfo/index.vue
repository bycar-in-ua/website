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
import { VehicleView as Car } from "@/common";
import General from "./General.vue";
import Complectations from "./Complectations/index.vue";

defineProps<{ car: Car }>();
</script>
