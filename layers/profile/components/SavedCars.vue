<script setup lang="ts">
import type { PaginatedResponse, Vehicle } from "@bycar-in-ua/sdk";
import CarCard from "@/components/UI/CarCard/CarCard.vue";
import Pagination from "@/components/UI/Pagination.vue";
import GridSkeleton from "@/components/UI/GridSkeleton.vue";
import Empty from "@/components/UI/Empty.vue";
import { getCarTitle } from "@/utils/carHelpers";

const profileStore = useProfileStore();

const vehiclesService = useVehiclesService();

const PAGE_SIZE = 8;
const page = ref(1);

const { data: vehicles, pending } = useAsyncData(
  "saved-cars",
  async () => {
    if (!profileStore.profile?.savedCars) {
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

    return vehiclesService.searchVehicles({
      filters: {
        id: profileStore.profile?.savedCars ?? [],
      },
      pagination: {
        page: page.value,
        limit: PAGE_SIZE,
      },
    });
  },
  {
    default: () =>
      ({
        items: [],
        meta: {
          currentPage: 1,
          totalPages: 1,
          itemsPerPage: PAGE_SIZE,
          totalItems: 0,
        },
      } as PaginatedResponse<Vehicle>),
    watch: [page, () => profileStore.profile?.savedCars],
    server: false,
  },
);
</script>

<template>
  <GridSkeleton
    v-if="!vehicles.items.length && pending"
    class="xs:grid-cols-2 sm:grid-cols-4 gap-5"
    :items-count="PAGE_SIZE"
  />

  <Empty v-else-if="!vehicles.items.length">
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
    :class="{ 'blur-sm': pending }"
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
    v-model:page="page"
    class="mt-10 flex justify-center"
    :pagination="vehicles.meta"
  />
</template>
