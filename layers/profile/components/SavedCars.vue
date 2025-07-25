<script setup lang="ts">
import type { PaginatedResponse, Vehicle } from "@bycar-in-ua/sdk";
import CarCard from "@/components/UI/CarCard/CarCard.vue";
import Pagination from "@/components/UI/Pagination.vue";
import GridSkeleton from "@/components/UI/GridSkeleton.vue";
import Empty from "@/components/UI/Empty.vue";
import { getCarTitle } from "@/utils/carHelpers";
import { useQuery, keepPreviousData } from "@tanstack/vue-query";

const profileStore = useProfileStore();

const PAGE_SIZE = 8;
const page = ref(1);

const vehiclesService = useVehiclesService();

const carsIds = computed<number[]>(() => profileStore.profile?.savedCars ?? []);

const {
  data: vehicles,
  isLoading,
  isPending,
} = useQuery({
  queryKey: ["saved-cars", page, carsIds],
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
      } as PaginatedResponse<Vehicle>;
    }

    if (page.value > 1 && crsIdsLength <= PAGE_SIZE * (page.value - 1)) {
      page.value = 1;
    }

    const response = await vehiclesService.searchVehicles({
      filters: {
        id: carsIds.value,
      },
      pagination: {
        page: page.value,
        limit: PAGE_SIZE,
      },
    });

    return response;
  },
  placeholderData: keepPreviousData,
  enabled: () => profileStore.profileFetched,
});
</script>

<template>
  <GridSkeleton
    v-if="isPending || (!vehicles?.items.length && isLoading)"
    class="xs:grid-cols-2 sm:grid-cols-4 gap-5"
    :items-count="PAGE_SIZE"
  />

  <Empty v-else-if="!vehicles?.items.length">
    <div class="text-center">
      Поки у вас немає збережених авто

      <div class="flex items-center gap-2">
        Відвідайте сторінку авто та збережіть натиснувши на іконку
        <UIcon name="i-heroicons-solid-bookmark" class="w-6 h-6" />
      </div>
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
      class="relative"
    >
      <UButton
        icon="i-heroicons-x-mark"
        trailing
        size="xl"
        variant="link"
        color="warning"
        class="absolute top-1 right-1 z-50"
        title="Видалити авто з закладок"
        @click.prevent.stop="
          () => {
            profileStore.removeFromSavedCars(car.id, getCarTitle(car));
          }
        "
      />

      <CarCard :car="car" />
    </NuxtLink>
  </div>

  <Pagination
    v-if="vehicles?.meta"
    v-model:page="page"
    class="mt-10 flex justify-center"
    :pagination="vehicles.meta"
  />
</template>
