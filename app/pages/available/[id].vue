<script setup lang="ts">
import { useElementVisibility } from "@vueuse/core";
import { useAvailableVehiclePage } from "~/composables/useAvailableVehiclePage";
import ImagesGrid from "~/components/Single/ImagesGrid.vue";
import AvailableSpecs from "~/components/Single/AvaialbleSpecs.vue";
import AvailableSideWrap from "~/components/Single/AvailableSideWrap.vue";
import ContactFormSection from "~/components/ContactFormSection.vue";
import VehiclesCarouselSection from "~/components/VehiclesCarouselSection.vue";
import AvailableBottomBar from "~/components/Single/AvailableBottomBar.vue";

definePageMeta({ name: "AvailableCarSingle" });

const route = useRoute();

const availableVehicleId = Number(route.params.id);

const {
  mainVehicleQuery: {
    data: availableVehicle, isError, error, suspense,
  },
  metadata: {
    carTitle, powerUnitTitle, prices,
  },
  otherAvailableVehicles,
} = useAvailableVehiclePage(availableVehicleId);

await suspense();

if (!availableVehicle.value || isError.value) {
  throw createError({
    statusCode: 404,
    cause: error.value?.cause,
    fatal: true,
    unhandled: true,
  });
}

const images = computed(() => {
  const images = (availableVehicle.value?.images ?? []);

  return images
    .map(({
      id, path, alt,
    }) => ({
      id,
      src: path,
      alt: alt || carTitle.value,
    }));
});

const wrapRef = useTemplateRef("wrapRef");
const wrapVisible = useElementVisibility(wrapRef);
</script>

<template>
  <main>
    <ImagesGrid :images="images">
      <template #overlay>
        <div class="z-10 absolute inset-0 flex items-center">
          <div class="container">
            <AvailableSideWrap
              ref="wrapRef"
              :car="availableVehicle"
              :car-title
              :power-unit-title
              :current-price="prices.current"
              :base-price="prices.base"
              class="ml-auto cursor-default"
              @click.stop
            />
          </div>
        </div>
      </template>
    </ImagesGrid>

    <AvailableSpecs :car="availableVehicle" />

    <AvailableBottomBar
      :car="availableVehicle"
      :car-title
      :power-unit-title
      :current-price="prices.current"
      :base-price="prices.base"
      class="sticky transition-all"
      :class="wrapVisible ? '-bottom-full' : 'bottom-0'"
    />

    <VehiclesCarouselSection
      v-if="otherAvailableVehicles?.length"
      id="available-vehicles"
      :title="['Авто в наявності', `Інші комплектації`]"
      :vehicles="otherAvailableVehicles || []"
      type="available"
      class="container my-10 md:my-20"
    />

    <ContactFormSection
      :page="getCarTitle(availableVehicle)"
      class="md:justify-between"
      :tg-link-message="`Вітаю! Цікавить авто ${carTitle}. Хочу дізнатись більше деталей`"
      :show-affix="false"
    />
  </main>
</template>
