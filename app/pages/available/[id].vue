<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import ImagesGrid from "~/components/Single/ImagesGrid.vue";
import AvailableSpecs from "~/components/Single/AvaialbleSpecs.vue";
import AvailableSideWrap from "~/components/Single/AvailableSideWrap.vue";
import ContactFormSection from "~/components/ContactFormSection.vue";
// import VehiclesCarouselSection from "~/components/VehiclesCarouselSection.vue";

definePageMeta({ name: "AvailableCarSingle" });

const route = useRoute();

const availableVehicleId = Number(route.params.id);

const vehiclesService = useVehiclesService();

const {
  data, suspense, isError, error,
} = useQuery({
  queryKey: ["available-vehicle", availableVehicleId],
  queryFn: () => vehiclesService.getAvailableVehicleById(availableVehicleId),
});

await suspense();

if (!data.value || isError.value) {
  throw createError({
    statusCode: 404,
    cause: error.value?.cause,
    fatal: true,
    unhandled: true,
  });
}

const { data: availableVehicles } = useQuery({
  queryKey: ["available-vehicles", data.value.vehicleId],
  queryFn: () => vehiclesService.searchAvailableVehicles({
    filters: { vehicleId: data.value.vehicleId },
    exclude: [availableVehicleId],
  }),
});

const images = computed(() => {
  const images = (data.value?.images ?? []).slice(0, 5);

  return images
    .map(({
      id, path, alt,
    }) => ({
      id,
      src: path,
      alt: alt || getCarTitle(data.value),
    }));
});
</script>

<template>
  <main>
    <ImagesGrid :images="images">
      <template #overlay>
        <div class="z-10 absolute inset-0 flex items-center ">
          <div class="container">
            <AvailableSideWrap :car="data" class="ml-auto" />
          </div>
        </div>
      </template>
    </ImagesGrid>

    <AvailableSpecs :car="data" />

    <VehiclesCarouselSection
      v-if="availableVehicles?.items?.length"
      id="available-vehicles"
      :title="['Авто в наявності', `Інші комплектації`]"
      :vehicles="availableVehicles?.items || []"
      type="available"
      class="container my-10 md:my-20"
    />

    <ContactFormSection
      :page="getCarTitle(data)"
      class="md:justify-between"
      :tg-link-message="`Вітаю! Цікавить авто ${getCarTitle(data)}. Хочу дізнатись більше деталей`"
      :show-affix="false"
    />
  </main>
</template>
