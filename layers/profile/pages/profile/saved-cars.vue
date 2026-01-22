<script setup lang="ts">
import type { PaginatedResponse } from "@bycar-in-ua/sdk";
import { useQuery, keepPreviousData } from "@tanstack/vue-query";
import SectionContainer from "#layers/profile/components/SectionContainer.vue";
import CarCard from "~/components/UI/CarCard/CarCard.vue";
import Pagination from "~/components/UI/Pagination.vue";
import GridSkeleton from "~/components/UI/GridSkeleton.vue";
import Empty from "~/components/UI/Empty.vue";
import type { VehicleSearchDocument } from "@bycar-in-ua/vehicles-sdk";

definePageMeta({ name: "saved-cars" });

const profile = useProfile();

const PAGE_SIZE = 8;
const page = ref(1);

const vehiclesService = useVehiclesService();

const carsIds = computed<number[]>(() => profile.data.value?.savedCars ?? []);

const {
  data: vehicles,
  isLoading,
  isPending,
} = useQuery({
  queryKey: [
    "saved-cars", page, carsIds,
  ],
  queryFn: async () => {
    const crsIdsLength = carsIds.value.length;

    if (!crsIdsLength) {
      return {
        items: [],
        meta: {
          currentPage: 1,
          totalPages: 1,
          itemsPerPage: PAGE_SIZE,
          totalItems: 0,
        },
      } as PaginatedResponse<VehicleSearchDocument>;
    }

    if (page.value > 1 && crsIdsLength <= PAGE_SIZE * (page.value - 1)) {
      page.value = 1;
    }

    const response = await vehiclesService.searchVehicles({
      // TODO: add search by IDs
      filters: { /* id: carsIds.value */ },
      pagination: {
        page: page.value,
        limit: PAGE_SIZE,
      },
    });

    return response;
  },
  placeholderData: keepPreviousData,
  enabled: profile.isFetched,
});
</script>

<template>
  <SectionContainer title="Збережені авто">
    <GridSkeleton
      v-if="isPending || (!vehicles?.items.length && isLoading)"
      class="xs:grid-cols-2 sm:grid-cols-4 gap-5"
      :items-count="PAGE_SIZE"
    />

    <Empty v-else-if="!vehicles?.items.length">
      <div class="text-center">
        Поки у вас немає збережених авто
        <br>
        Оберіть авто в
        <ULink to="/catalog" class="text-primary">каталозі</ULink>
        та збережіть натиснувши на іконку
        <UIcon
          name="i-heroicons-heart-solid"
          class="w-6 h-6 relative top-1.5"
        />
      </div>
    </Empty>

    <div
      v-else
      class="grid xs:grid-cols-2 sm:grid-cols-4 gap-5"
      :class="{ 'blur-sm': isLoading }"
    >
      <NuxtLink
        v-for="car in vehicles.items"
        :key="car.id"
        :to="{
          name: 'SingleCar',
          params: {
            brand: car.brand?.slug ?? '',
            model: car.slug,
          },
        }"
      >
        <CarCard :car="car" :is-saved="true" />
      </NuxtLink>
    </div>

    <Pagination
      v-if="vehicles?.meta"
      v-model:page="page"
      class="mt-10 flex justify-center"
      :pagination="vehicles.meta"
    />
  </SectionContainer>
</template>
