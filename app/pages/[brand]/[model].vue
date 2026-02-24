<script setup lang="ts">
import type { Complectation, PowerUnit, Vehicle } from "@bycar-in-ua/sdk";
import { useElementVisibility } from "@vueuse/core";
import VehicleGallery from "~/components/VehicleGallery.vue";
import Complectations from "~/components/Single/Complectations.vue";
import SideWrap from "~/components/Single/SideWrap.vue";
import PowerUnits from "~/components/Single/PowerUnits.vue";
import FullInfo from "~/components/Single/FullInfo.vue";
import ToolBar from "~/components/Single/ToolBar.vue";
import AvailableCars from "~/components/Single/AvailableCars.vue";
import ContactFormSection from "~/components/ContactFormSection.vue";
// import SimilarCars from "~/components/Single/SimilarCars.vue";
// import BottomBar from "~/components/Single/BottomBar.vue";
import { getCarTitle, getComplectationsSummary } from "~/utils/carHelpers";
import { generatePageTitle } from "~/utils/seo";
import { discounts } from "~/components/Single/discounts.temp";
import type { AvailableCar } from "~/components/Single/interface";

definePageMeta({ name: "SingleCar" });

const vehiclesService = useVehiclesService();

const availableVehiclesService = useAvailableVehiclesService();

const route = useRoute();

const { data, error } = await useAsyncData(`${route.params.model}`, () =>
  vehiclesService.getVehicleBySlug(String(route.params.model)),
);

if (!data.value) {
  throw createError({
    statusCode: error.value?.statusCode || 404,
    fatal: true,
  });
}

// const { data: similarVehicles } = await useAsyncData(
//   `${route.params.model}-similar`,
//   () => vehiclesService.getSimilarVehicles(route.params.model as string),
// );

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

    return response.items.map((item) => ({
      ...item,
      ...(discounts[item.id] ?? {}),
    }));
  },
  { default: () => [] },
);

const car = computed(() => data.value as unknown as Vehicle);

const galleryImages = computed(() => {
  const images = car.value.images ?? [];

  return images
    .filter(({ image }) => Boolean(image?.path))
    .map(({ imageId, image }, index) => ({
      id: imageId ?? `${car.value.id}-${index}`,
      src: image?.path ?? "",
      alt: image?.alt || getCarTitle(car.value),
    }));
});

const activeComplectation = ref<Complectation | undefined>(
  car.value.complectations?.find((c) => c.base)
  || car.value.complectations?.[0],
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

const seoTitle
  = car.value.metaTitle
    ?? generatePageTitle([carTitle, years].filter(Boolean).join(" ").trim());
const complectations = getComplectationsSummary(car.value.complectations);
const seoDescription
  = car.value.metaDescription
    ?? `${carTitle} ${years} - доступні комплектації та ціни, характеристики та фото. ${complectations}`;

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

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(
        generateBreadcrumbsJsonLd([
          {
            name: seoTitle,
            path: route.fullPath,
          },
        ]),
      ),
    },
  ],
});

const pageToolbar = useTemplateRef("pageToolbar");
const pageToolbarVisible = ref(true);

if (import.meta.client) {
  const targetIsVisible = useElementVisibility(pageToolbar);

  watchEffect(() => {
    pageToolbarVisible.value = targetIsVisible.value;
  });
}

// onMounted(() => {
//   document?.body.classList.add("pb-24");
// });

// onBeforeRouteLeave(() => {
//   pageToolbarVisible.value = true;
//   document?.body.classList.remove("pb-24");
// });

const { gtag } = useGtag();

gtag("event", "view_item", {
  screen_name: "single_car",
  items: [
    {
      item_id: car.value.id,
      item_name: carTitle,
      item_brand: car.value.brand?.displayName || "",
      item_category: "vehicle",
    },
  ],
});
</script>

<template>
  <main class="relative">
    <h1 class="sr-only">
      {{ car.h1 ?? carTitle }}
    </h1>

    <div class="container mx-auto relative grid grid-cols-3 gap-6 items-start">
      <div class="col-span-2">
        <VehicleGallery
          :images="galleryImages"
          :is-available-now="availableVehicles.length > 0"
        />

        <div class="w-full flex justify-end mb-4 md:mb-5">
          <ToolBar
            ref="pageToolbar"
            class="w-full sm:w-auto"
            :car-id="car.id"
            :car-title="carTitle"
            :available-vehicles-count="availableVehicles.length"
          />
        </div>

        <template v-if="car.complectations?.length">
          <Complectations
            :compectations="car.complectations"
            :active-complectation="activeComplectation"
            :set-active-complectation="setActiveComplectation"
          />
          <USeparator class="my-5" />
        </template>

        <template v-if="activeComplectation?.powerUnits?.length">
          <PowerUnits
            :power-units="activeComplectation.powerUnits ?? []"
            :active-power-unit="activePowerUnit"
            :set-active-power-unit="setActivePowerUnit"
          />
          <USeparator class="my-5" />
        </template>

        <FullInfo
          :car
          :complectation="activeComplectation"
          :power-unit="activePowerUnit"
        />

        <!-- eslint-disable vue/no-v-html -->
        <section
          class="my-6 md:my-10 mx-auto prose max-w-full"
          v-html="car.description"
        />
      </div>

      <SideWrap
        class="sticky top-4"
        :car="car"
        :power-unit="activePowerUnit"
        :available-vehicles="availableVehicles as AvailableCar[]"
      />
    </div>

    <AvailableCars
      v-if="availableVehicles.length > 0"
      :car="car"
      :availability="availableVehicles"
      class="container my-5"
    />

    <ContactFormSection
      :page="carTitle"
      class="md:justify-between"
      :tg-link-message="`Вітаю! Цікавить авто ${carTitle}. Хочу дізнатись більше деталей`"
      :show-affix="false"
    />

    <!-- <SimilarCars :cars="similarVehicles ?? []" :main-car="car" /> -->

    <!-- <BottomBar
      class="shadow-[0_-2px_12px_rgba(32,1,70,0.08)] fixed left-0 right-0 z-50 transition-all duration-300"
      :class="pageToolbarVisible ? '-bottom-full': 'bottom-0'"
      :car-id="car.id"
      :car-title="carTitle"
      :selected-complectation="activeComplectation?.displayName"
      :available-vehicles-count="availableVehicles.length"
    /> -->
  </main>
</template>
