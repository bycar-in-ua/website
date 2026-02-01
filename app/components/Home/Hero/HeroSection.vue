<script setup lang="ts">
import PriceFilter from "~/components/Catalog/Filters/PriceFilter.vue";
import { useFiltersStore } from "~/stores/filters";
import BodyTypeQuickFilter from "./BodyTypeQuickFilter.vue";

defineProps<{ totalCars?: number; }>();

const { t } = useI18n();
const filtersStore = useFiltersStore();

const priceLabel = computed(() => {
  const minPrice = filtersStore.selectedFilters.minPrice || filtersStore.data?.filters.priceRange.min || 0;
  const maxPrice = filtersStore.selectedFilters.maxPrice || filtersStore.data?.filters.priceRange.max || 200000;

  return `$${minPrice} - $${maxPrice}`;
});

const bodyTypeLablel = computed(() => {
  const bodyType = filtersStore.selectedFilters?.bodyType;
  if (!bodyType?.length) {
    return "Всі";
  }

  return bodyType.map((item) => t(`vehicle.bodyTypes.items.${item}`)).join(", ");
});

const filters = ref({
  price: undefined as string | undefined,
  body: undefined as string | undefined,
  transmission: undefined as string | undefined,
  brand: undefined as string | undefined,
});

const transmissionOptions = [
  {
    label: "Всі",
    value: "all",
  },
];

const brandOptions = [
  {
    label: "Всі",
    value: "all",
  },
];
</script>

<template>
  <section
    class="hero-section h-[calc(100vh-72px)] text-inverted bg-cover relative flex flex-col justify-end pb-20"
  >
    <div class="absolute inset-0">
      <div class="hero-overlay z-0 absolute inset-0" />
      <!-- <video
        autoplay
        muted
        loop
        class="w-full h-full object-cover -z-10"
      >
        <source src="/videos/hero-background.mp4" type="video/mp4">
      </video> -->
    </div>

    <div class="container z-10">
      <h1
        class="text-4xl md:text-5xl lg:text-9xl font-bold break-all sm:break-normal mb-8"
      >
        Легкий шлях
        <br>
        до нового авто
      </h1>

      <p class="text-xl font-medium mb-12 text-gray-200">
        Переглядайте, порівнюйте, обирайте та купуйте — все в одному місці.
      </p>

      <UForm :state="{}" class="flex items-center gap-6 px-6 py-4 bg-default">
        <UFormField label="Ціна" class="basis-52">
          <UPopover :ui="{ content: 'py-3 px-4' }" :content="{ side: 'bottom', align: 'start', alignOffset: -14.5 }">
            <UInput class="w-full" :model-value="priceLabel" :ui="{ base: 'text-left' }" />

            <template #content>
              <PriceFilter />
            </template>
          </UPopover>
        </UFormField>

        <USeparator orientation="vertical" class="h-12" />

        <UFormField label="Кузов" class="basis-52">
          <UPopover :ui="{ content: 'py-3 px-4' }" :content="{ side: 'bottom', align: 'start', alignOffset: -14.5 }">
            <UInput class="w-full" :model-value="bodyTypeLablel" :ui="{ base: 'text-left' }" />

            <template #content>
              <BodyTypeQuickFilter />
            </template>
          </UPopover>
        </UFormField>

        <USeparator orientation="vertical" class="h-12" />

        <UFormField label="Трансмісія" class="basis-52">
          <USelect
            v-model="filters.transmission"
            :items="transmissionOptions"
            placeholder="Всі"
            variant="ghost"
            trailing-icon=""
          />
        </UFormField>

        <USeparator orientation="vertical" class="h-12" />

        <UFormField label="Марка" class="basis-52">
          <USelect
            v-model="filters.brand"
            :items="brandOptions"
            placeholder="Всі"
            variant="ghost"
            trailing-icon=""
          />
        </UFormField>

        <UButton
          :label="`Переглянути ${totalCars} авто`"
          size="lg"
          block
          color="primary"
          class="basis-64"
        />
      </UForm>
    </div>
  </section>
</template>

<style>
.hero-section {
  background-image: url("/images/hero-section-bg.png");
}

.hero-overlay {
  background: linear-gradient(200deg, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0.7) 75%)
}
</style>
