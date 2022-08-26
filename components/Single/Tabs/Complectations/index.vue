<template>
  <div class="flex justify-center w-full mb-4">
    <div class="flex overflow-x-auto">
      <div
        v-for="cmpl in car.complectations"
        :key="cmpl.id"
        class="cursor-pointer p-4 text-center text-lg"
        :class="currentComplectation == cmpl.id ? 'text-primary' : ''"
        @click="currentComplectation = cmpl.id"
      >
        <p class="text-xl font-bold">
          {{ cmpl.displayName }}
        </p>

        {{ cmpl.priceRange.min && "$" + cmpl.priceRange.min }}
        {{ cmpl.priceRange.max && " - $" + cmpl.priceRange.max }}
      </div>
    </div>
  </div>

  <ComplectationInfo
    v-for="cmpl in car.complectations"
    :key="cmpl.id"
    v-show="currentComplectation == cmpl.id"
    :complectation="cmpl"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ComplectationsTab",
});
</script>

<script setup lang="ts">
import { VehicleView as Car } from "@/common";
import ComplectationInfo from "./ComplectationInfo.vue";

const props = defineProps<{ car: Car }>();

const currentComplectation = ref(props.car.complectations[0].id);
</script>
