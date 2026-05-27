<script setup lang="ts">
import { useSavedCars } from "#layers/profile/composables/useSavedCars";
import CarCard from "~/components/UI/CarCard";
import Pagination from "~/components/UI/Pagination.vue";
import GridSkeleton from "~/components/UI/GridSkeleton.vue";
import Empty from "~/components/UI/Empty.vue";

definePageMeta({ name: "saved-cars" });

const {
  data: vehicles, isLoading, page,
} = useSavedCars();
</script>

<template>
  <div>
    <GridSkeleton
      v-if="isLoading || (!vehicles?.items.length && isLoading)"
      class="xs:grid-cols-2 sm:grid-cols-4 gap-5"
      :items-count="8"
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
            slug: car.slug,
          },
        }"
      >
        <CarCard :car="car" :is-saved="true" card-type="model" />
      </NuxtLink>
    </div>

    <Pagination
      v-if="vehicles?.meta"
      v-model:page="page"
      class="mt-10 flex justify-center"
      :pagination="vehicles.meta"
    />
  </div>
</template>
