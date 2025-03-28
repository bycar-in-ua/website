<script setup lang="ts">
import type { Complectation, PowerUnit, Vehicle } from "@bycar-in-ua/sdk";
import Media from "@/components/Single/Media.vue";
import Complectations from "@/components/Single/Complectations.vue";
import PowerUnits from "@/components/Single/PowerUnits.vue";
import FullInfo from "@/components/Single/FullInfo.vue";
import CtaButton from "@/components/Single/CtaButton.vue";
import AvailableCars from "@/components/Single/AvailableCars.vue";
import ContactForm from "~/components/ContactFormSection.vue";
import BluredEllipse from "@/components/UI/BluredEllipse.vue";
import { getCarTitle, getComplectationsSummary } from "@/utils/carHelpers";
import { generatePageTitle } from "@/utils/seo";

definePageMeta({
  name: "SingleCar",
});

const { $bycarApi } = useNuxtApp();
const availableVehiclesService = useAvailableVehiclesService();

const route = useRoute();

const { data, error } = await useAsyncData(`${route.params.model}`, () =>
  $bycarApi.getVehicleBySlug(route.params.model as string),
);

if (!data.value) {
  throw createError({
    statusCode: error.value?.statusCode || 404,
    fatal: true,
  });
}

const { data: availableVehicles } = useAsyncData(
  `${route.params.model}-availability`,
  async () => {
    if (!data.value) {
      return [];
    }

    const response = await availableVehiclesService.searchAvailableVehicles({
      filters: { vehicleId: data.value.id },
      pagination: {
        limit: 100,
        page: 1,
      },
    });

    return response.items;
  },
  {
    default: () => [],
  },
);

const car = computed(() => data.value as Vehicle);

const activeComplectation = ref<Complectation | undefined>(
  car.value.complectations?.find((c) => c.base) ||
  car.value.complectations?.[0],
);
const activePowerUnit = ref<PowerUnit | undefined>(
  activeComplectation.value?.powerUnits?.[0],
);
const setActiveComplectation = (complectation: Complectation) => {
  activeComplectation.value = complectation;
  activePowerUnit.value = complectation.powerUnits?.[0];
};
const setActivePowerUnit = (powerUnit: PowerUnit) => {
  activePowerUnit.value = powerUnit;
};

const carTitle = getCarTitle(car.value);
const years = [car.value.yearFrom, car.value.yearTo]
  .filter(Boolean)
  .join(" - ");

const seoTitle =
  car.value.metaTitle ??
  generatePageTitle([carTitle, years].filter(Boolean).join(" ").trim());
const complectations = getComplectationsSummary(car.value.complectations);
const seoDescription =
  car.value.metaDescription ??
  `${carTitle} ${years} - доступні комплектації та ціни, характеристики та фото. ${complectations}`;

const img = useCdnImage();

useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  description: seoDescription,
  ogDescription: seoDescription,
  ogUrl: route.fullPath,
  ogImage: {
    type: "image/jpeg",
    url: img(
      car.value.featureImage?.path || car.value.images?.[0]?.image?.path || "",
      "small",
    ),
    alt: carTitle,
  },
});
</script>

<template>
  <main class="container pt-24 md:pt-32 pb-5 relative">
    <h1 class="sr-only">
      {{ car.h1 ?? carTitle }}
    </h1>
    <BluredEllipse
      class="absolute w-[410px] h-[220px] left-0 md:left-40 top-40 -z-10"
    />
    <Media :car :title="carTitle" :active-power-unit="activePowerUnit" />

    <div
      v-if="availableVehicles.length > 0"
      class="flex justify-end items-center mb-4 md:mb-5"
    >
      <CtaButton />
    </div>

    <template v-if="car.complectations?.length">
      <Complectations
        :compectations="car.complectations"
        :active-complectation="activeComplectation"
        :set-active-complectation="setActiveComplectation"
      />
      <UDivider class="my-5" />
    </template>

    <template v-if="activeComplectation?.powerUnits?.length">
      <PowerUnits
        :power-units="activeComplectation.powerUnits ?? []"
        :active-power-unit="activePowerUnit"
        :set-active-power-unit="setActivePowerUnit"
      />
      <UDivider class="my-5" />
    </template>

    <FullInfo
      :car
      :complectation="activeComplectation"
      :power-unit="activePowerUnit"
    />

    <AvailableCars
      v-if="availableVehicles.length > 0"
      :car="car"
      :availability="availableVehicles"
      class="my-5"
    />

    <!-- eslint-disable vue/no-v-html -->
    <section
      class="my-6 md:my-10 mx-auto prose max-w-full"
      v-html="car.description"
    ></section>

    <ContactForm :page="carTitle">
      <template #ellipse>
        <BluredEllipse
          class="absolute w-[410px] h-[220px] right-0 md:right-24 top-32 md:-top-24 -z-10"
        />
      </template>
    </ContactForm>
  </main>
</template>
