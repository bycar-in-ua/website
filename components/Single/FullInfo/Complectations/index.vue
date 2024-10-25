<script setup lang="ts">
import type { Vehicle } from "@bycar-in-ua/sdk";
import ComplectationInfo from "./ComplectationInfo.vue";

const props = defineProps<{ car: Vehicle }>();

const currentComplectation = ref(props.car.complectations?.[0]?.id);
</script>

<template>
  <h3
    id="complectations"
    class="text-2xl font-bold text-center my-4"
    v-text="$t('vehicle.complectationsAndPrices')"
  />
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

        <!-- {{ cmpl.priceRange.min && "$" + cmpl.priceRange.min }}
         {{ cmpl.priceRange.max && " - $" + cmpl.priceRange.max }} -->
      </div>
    </div>
  </div>
  <Transition
    v-for="cmpl in car.complectations"
    :key="cmpl.id"
    name="fade"
    :duration="300"
  >
    <ComplectationInfo
      v-show="currentComplectation == cmpl.id"
      :complectation="cmpl"
    />
  </Transition>
</template>
