<script setup lang="ts">
import type { Vehicle } from "@bycar-in-ua/sdk";
import General from "./General.vue";
import Complectations from "./Complectations/index.vue";

defineProps<{ car: Vehicle }>();
</script>

<template>
  <Complectations :car="car" />
  <General :car="car" />
</template>
