<template>
  <main class="bycar-container py-5 lg:py-10">
    <Title :title="getCarName(car)" />
    <Media :images="car.images" />
    <GeneralInfo :description="car.description" :short-summary="shortSummary" />
    <Tabs :car="car" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CarModelPage",
});
</script>

<script setup lang="ts">
import Title from "@/components/Single/Title.vue";
import Media from "@/components/Single/Media.vue";
import GeneralInfo from "@/components/Single/GeneralInfo.vue";
import Tabs from "@/components/Single/Tabs/index.vue";
import { VehicleView as Car } from "@/common";
import { generatePageTitle } from "@/utils/seo";
import { type InfoLineProps } from "@/components/common/InfoLine.vue";

const { $api, $t, $cdnLink } = useNuxtApp();

const route = useRoute();

const { data: car } = await $api.get<Car>(`/vehicles/${route.params.model}`);

const carName = getCarName(car.value);

useHead({
  title: generatePageTitle(carName),
  meta: [
    {
      name: "description",
      content: carName + " | bycar-in-ua - Автомобільна спільнота України",
    },
    {
      name: "og:title",
      content: generatePageTitle(carName),
    },
    {
      name: "og:url",
      content: route.fullPath,
    },
    {
      name: "og:image",
      content: $cdnLink(car.value.featureImage.path, 300),
    },
  ],
});

function getCarName(car: Car) {
  return car.brand.displayName + " " + car.model;
}

function getModelYear(car: Car) {
  let year = "";

  year += car.yearFrom;

  if (car.yearTo) {
    year += " - " + car.yearTo;
  }

  return year;
}

const shortSummary = computed<InfoLineProps[]>(() => [
  {
    name: $t("vehicle.model"),
    value: getCarName(car.value),
  },
  {
    name: $t("vehicle.modelYear"),
    value: getModelYear(car.value),
  },
  {
    name: $t("vehicle.bodyTypes.title"),
    value: $t(`vehicle.bodyTypes.items.${car.value.bodyType}`),
  },
  {
    name: $t("vehicle.sizeClases.title"),
    value: $t(`vehicle.sizeClases.items.${car.value.sizeClass}`),
  },
]);

/**
 * @todo Сделать 404
 */
</script>
