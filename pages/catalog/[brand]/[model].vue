<template>
  <div class="bycar-container py-5 lg:py-10">
    <Title :title="getCarName(car)" />
    <Media :images="car.images" />
    <GeneralInfo :car="car" />
    <Tabs />
  </div>
</template>

<script lang="ts">
export default {
  name: "CarModelPage",
};
</script>

<script setup lang="ts">
import Title from "@/components/Single/Title.vue";
import Media from "@/components/Single/Media.vue";
import GeneralInfo from "@/components/Single/GeneralInfo.vue";
import Tabs from "@/components/Single/Tabs.vue";
import { Car } from "../../../types/car.type";

const { $api } = useNuxtApp();

const route = useRoute();

const { data: car } = await $api.get<Car>(`/vehicles/${route.params.model}`);

function getCarName(car: Car) {
  return car.brand.displayName + " " + car.model;
}

/**
 * @todo Сделать 404
 */
</script>
