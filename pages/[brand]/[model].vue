<script setup lang="ts">
import type { VehicleView as Car } from "@bycar-in-ua/common";
import Title from "@/components/Single/Title.vue";
import Media from "@/components/Single/Media.vue";
import GeneralInfo from "@/components/Single/GeneralInfo.vue";
import FullInfo from "@/components/Single/FullInfo/index.vue";
import { getCarTitle } from "@/utils/carHelpers";
import { generatePageTitle } from "@/utils/seo";
import { type InfoLineProps } from "@/components/UI/InfoLine.vue";

definePageMeta({
  name: "SingleCar",
});

const { $api, $cdnLink } = useNuxtApp();
const { t } = useI18n();

const route = useRoute();

const car = await $api.get<Car>(`/vehicles/${route.params.model}`);

const carTitle = computed(() => getCarTitle(car));

useHead({
  title: generatePageTitle(carTitle.value),
  meta: [
    {
      name: "description",
      content: generatePageTitle(carTitle.value),
    },
    {
      name: "og:title",
      content: generatePageTitle(carTitle.value),
    },
    {
      name: "og:url",
      content: route.fullPath,
    },
    {
      name: "og:image",
      content: $cdnLink(car.featureImage?.path || car.images[0]?.path, 300),
    },
  ],
});

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
    name: t("vehicle.model"),
    value: getCarTitle(car),
  },
  {
    name: t("vehicle.modelYear"),
    value: getModelYear(car),
  },
  {
    name: t("vehicle.bodyTypes.title"),
    value: car.bodyType,
  },
  {
    name: t("vehicle.sizeClases.title"),
    value: String(car.sizeClass),
  },
]);
</script>

<template>
  <main class="bycar-container py-5 lg:py-10">
    <Title :title="carTitle" />
    <Media :images="car.images" />
    <GeneralInfo :description="car.description" :short-summary="shortSummary" />
    <FullInfo :car="car" />
  </main>
</template>
