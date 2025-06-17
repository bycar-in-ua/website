<script setup lang="ts">
import type { Vehicle } from "@bycar-in-ua/sdk";
import CarCard from "@/components/UI/CarCard/CarCard.vue";
import SectionTitle from "@/components/UI/SectionTitle.vue";

defineProps<{ cars: Vehicle[]; mainCar: Vehicle }>();
</script>

<template>
  <section>
    <SectionTitle class="flex-wrap sm:flex-nowrap">
      <template #title>
        <h3 class="text-xl sm:text-2xl font-bold flex-grow">
          Вас також може зацікавити
        </h3>
      </template>

      <template #extra>
        <div class="mt-4 sm:mt-0 sm:justify-end flex-grow sm:text-right">
          <UButton
            variant="link"
            :to="{ name: 'catalog', query: { brand: mainCar.brand?.id } }"
          >
            Всі моделі {{ mainCar.brand?.displayName }}
          </UButton>
          <UButton
            variant="link"
            :to="{ name: 'catalog', query: { bodyType: mainCar.bodyType } }"
          >
            Інші авто в кузові "{{
              $t(`vehicle.bodyTypes.items.${mainCar.bodyType}`)
            }}"
          </UButton>
        </div>
      </template>
    </SectionTitle>

    <div
      class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <NuxtLink
        v-for="car in cars"
        :key="car.id"
        :to="{
          name: 'SingleCar',
          params: {
            brand: car.brand?.slug ?? '',
            model: car.slug,
          },
        }"
      >
        <CarCard :car="car" />
      </NuxtLink>
    </div>
  </section>
</template>
