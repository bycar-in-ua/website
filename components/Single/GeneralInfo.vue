<template>
  <div class="mb-5 grid md:grid-cols-3 gap-5">
    <div class="md:col-span-2">
      <h3 class="mb-5 font-semibold">Описание</h3>
      <div class="description mce-styles" v-html="car.description" />
    </div>
    <div class="card self-baseline">Lorem ipsum dolor sit amet.</div>
  </div>
</template>

<script lang="ts">
export default {
  name: "GeneralInfo",
};
</script>

<script setup lang="ts">
import { Car } from "../../types/car.type";

interface IProps {
  car: Car;
}

const props = defineProps<IProps>();
</script>
