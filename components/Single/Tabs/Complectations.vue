<template>
  <div class="grid gap-4">
    <Card
      v-for="cmpl in car.complectations"
      :key="cmpl.id"
      :title="cmpl.displayName"
    ></Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ComplectationsTab",
});
</script>

<script setup lang="ts">
import { VehicleDto as Car } from "@/common";
import Card from "@/components/common/Card.vue";

defineProps<{ car: Car }>();
</script>
