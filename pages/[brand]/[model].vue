<script setup lang="ts">
import type { Complectation, PowerUnit, Vehicle } from "@bycar-in-ua/sdk";
import Media from "@/components/Single/Media.vue";
import GeneralInfo from "@/components/Single/GeneralInfo.vue";
import FullInfo from "@/components/Single/FullInfo/index.vue";
import { getCarTitle } from "@/utils/carHelpers";
import { generatePageTitle } from "@/utils/seo";
import type { InfoLineProps } from "@/components/UI/InfoLine.vue";
import { ComplectationKey, PowerUnitKey } from "@/components/Single/interface";

definePageMeta({
  name: "SingleCar",
});

const { $cdnLink, $bycarApi } = useNuxtApp();
const { t } = useI18n();

const route = useRoute();

const { data: car } = await useAsyncData(
  `${route.params.model}`,
  () => $bycarApi.getVehicleBySlug(route.params.model as string),
  {
    default: () => ({} as Vehicle),
  },
);

const currentComplectation = ref<Complectation | null>(car.value.complectations?.find((c) => c.base) || car.value.complectations?.[0] || null);

const currentPowerUnit = ref<PowerUnit | null>(currentComplectation.value?.powerUnits?.[0] || null);

provide(ComplectationKey, currentComplectation.value);
provide(PowerUnitKey, currentPowerUnit.value);

const carTitle = computed(() => getCarTitle(car.value));

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
      content: $cdnLink(
        car.value.featureImage?.path || car.value.images?.[0]?.path || "",
        300,
      ),
    },
  ],
});

const shortSummary = computed<InfoLineProps[]>(() => [
  {
    name: t("vehicle.model"),
    value: getCarTitle(car.value),
  },
  {
    name: t("vehicle.modelYear"),
    value: [car.value.yearFrom, car.value.yearTo ?? ""].join(" - "),
  },
  {
    name: t("vehicle.bodyTypes.title"),
    value: car.value.bodyType,
  },
  {
    name: t("vehicle.sizeClases.title"),
    value: String(car.value.sizeClass),
  },
]);
</script>

<template>
  <main class="container pt-32 pb-5">
    <Media :car :title="carTitle" />
    <GeneralInfo :description="car.description" :short-summary="shortSummary" />
    <FullInfo :car="car" />
  </main>
</template>
