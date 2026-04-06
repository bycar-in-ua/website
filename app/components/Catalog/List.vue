<script setup lang="ts">
import CarCard from "~/components/UI/CarCard";
import Pagination from "~/components/UI/Pagination.vue";
import { useCatalogStore } from "~/stores/catalog";
import ContactFormSection from "../ContactFormSection.vue";

const catalogStore = useCatalogStore();

const list = useTemplateRef<HTMLDivElement>("list");
</script>

<template>
  <div class="w-full relative" data-testid="carlistcatalog">
    <UProgress
      v-if="catalogStore.isLoading"
      animation="carousel"
      class="absolute -top-4 left-0 right-0"
    />

    <template v-if="!catalogStore.data?.items.length">
      <p class="text-center p-4 text-xl" v-text="$t('emptyCatalog')" />
      <ContactFormSection
        page="Каталог"
        class="md:justify-between"
      >
        <template #message>
          <h3 class="text-2xl font-bold mb-2">
            Не вдалось знайти бажане авто в каталозі?<br>
            Запитай у експерта!
          </h3>
          <p class="text-base text-gray-500 mb-4">
            Можливо, є додаткова інформація або ще не все оновлено в каталозі.
          </p>
        </template>
      </ContactFormSection>
    </template>
    <div
      ref="list"
      class="grid xs:grid-cols-2 sm:grid-cols-3 gap-5"
      :class="{ 'blur-sm': catalogStore.isLoading }"
    >
      <NuxtLink
        v-for="car in catalogStore?.data?.items || []"
        :key="car.id"
        :to="{
          name: 'SingleCar',
          params: {
            slug: car.slug,
          },
        }"
      >
        <CarCard :car="car">
          <template #cta>
            <UButton block @click="navigateTo({ name: 'SingleCar', params: { slug: car.slug } })">
              Дізнатися деталі
            </UButton>
          </template>

        </CarCard>
      </NuxtLink>
    </div>
    <Pagination
      class="mt-10 flex justify-center"
      :page="catalogStore.pagination.page"
      :pagination="catalogStore.data!.meta"
      @update:page="
        (page) => {
          catalogStore.pagination = { page };
          list?.scrollIntoView();
        }
      "
    />
  </div>
</template>
