<script setup lang="ts">
import type { CheckboxGroupItem } from "@nuxt/ui";
import { useModelsCatalogFilters } from "~/composables/useModelsCatalogFilters";
import { serializeFiltersToQuery } from "~/utils/filters";
import RangeControl from "~/components/UI/RangeControl.vue";
import QuickFilterPopover from "./QuickFilterPopover.vue";
import QuickFilterList from "./QuickFilterList.vue";

defineProps<{ totalCars?: number; }>();

const { t } = useI18n();
const {
  data: filtersData, selectedFilters, suspense,
} = useModelsCatalogFilters();

if (import.meta.server) {
  await suspense();
}

const priceLabel = computed(() => {
  if (!selectedFilters.value?.minPrice && !selectedFilters.value?.maxPrice) {
    return;
  }

  const minPrice = selectedFilters.value?.minPrice || filtersData.value?.filters.priceRange.min || 0;
  const maxPrice = selectedFilters.value?.maxPrice || filtersData.value?.filters.priceRange.max || 200000;

  return `$${minPrice} - $${maxPrice}`;
});

const pricePlaceholder = computed(() => {
  return `$${filtersData.value?.filters.priceRange.min} - $${filtersData.value?.filters.priceRange.max}`;
});

const bodyTypeLablel = computed(() => {
  const bodyType = selectedFilters.value?.bodyType;
  if (!bodyType?.length) {
    return;
  }

  return bodyType.map((item) => t(`vehicle.bodyTypes.items.${item}`)).join(", ");
});

const bodyTypeItems = computed<CheckboxGroupItem[]>(() => filtersData.value?.filters.bodyType.map((bt) => ({
  value: bt.value,
  label: t(`vehicle.bodyTypes.items.${bt.value}`),
  disabled: bt.count === 0,
})) ?? [],
);

const allBodyTypesCheckboxModel = computed({
  get: () => !selectedFilters.value.bodyType?.length,
  set: (value: boolean) => {
    if (value) {
      selectedFilters.value.bodyType = [];
    }
  },
});

const driveLabel = computed(() => {
  const driveType = selectedFilters.value?.driveType;
  if (!driveType?.length) {
    return;
  }

  return driveType.map((item) => t(`filters.drive.${item}`)).join(", ");
});

const driveItems = computed<CheckboxGroupItem[]>(() => filtersData.value?.filters.driveType.map((bt) => ({
  value: bt.value,
  label: t(`filters.drive.${bt.value}`),
  disabled: bt.count === 0,
})) ?? [],
);

const allDriveCheckboxModel = computed({
  get: () => !selectedFilters.value.driveType?.length,
  set: (value: boolean) => {
    if (value) {
      selectedFilters.value.driveType = [];
    }
  },
});

const brandLabel = computed(() => {
  const brands = selectedFilters.value?.brand;
  if (!brands?.length) {
    return;
  }

  return brands.map((item) => {
    const brand = filtersData.value?.filters.brand.find((b) => String(b.id) === String(item));
    return brand ? brand.displayName : item;
  }).join(", ");
});

const brandsItems = computed<CheckboxGroupItem[]>(() => filtersData.value?.filters.brand.map((bt) => ({
  value: bt.id.toString(),
  label: bt.displayName,
  disabled: bt.count === 0,
})) ?? [],
);

const allBrandCheckboxModel = computed({
  get: () => !selectedFilters.value.brand?.length,
  set: (value: boolean) => {
    if (value) {
      selectedFilters.value.brand = [];
    }
  },
});

const handleNavigate = () => {
  navigateTo({
    name: "catalog",
    query: serializeFiltersToQuery(selectedFilters.value),
  });
};
</script>

<template>
  <section
    class="hero-section h-[calc(100svh-72px)] text-inverted bg-cover relative flex flex-col justify-end pb-4 md:pb-10 lg:pb-20"
  >
    <div class="absolute inset-0">
      <div class="hero-overlay z-0 absolute inset-0" />
      <video
        autoplay
        muted
        loop
        class="w-full h-full object-cover -z-10"
      >
        <source src="/videos/hero-background.mp4" type="video/mp4">
      </video>
    </div>

    <div class="container z-10">
      <h1
        class="text-4xl md:text-5xl lg:text-9xl font-bold break-all sm:break-normal mb-3 md:mb-6 lg:mb-8"
      >
        Легкий шлях
        <br>
        до нового авто
      </h1>

      <p class="text-base md:text-xl font-medium mb-8 md:mb-14 text-gray-200">
        Переглядайте, порівнюйте, обирайте та купуйте — все в одному місці.
      </p>

      <UForm :state="selectedFilters" class="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap md:items-center justify-between gap-4 lg:gap-6 px-4 md:px-6 lg:pe-4 py-4 bg-default divide-y md:divide-y-0 divide-gray-200">
        <QuickFilterPopover title="Ціна" @reset="selectedFilters.minPrice = undefined; selectedFilters.maxPrice = undefined">
          <UFormField label="Ціна" class="md:basis-[21%] lg:basis-52">
            <UInput
              class="w-full"
              variant="ghost"
              readonly
              :model-value="priceLabel"
              :placeholder="pricePlaceholder"
              :ui="{ base: 'text-left md:pb-0' }"
            />
          </UFormField>
          <template #content>
            <RangeControl
              v-model:min-price="selectedFilters.minPrice"
              v-model:max-price="selectedFilters.maxPrice"
              :step="5000"
              :boundaries="{ min: filtersData?.filters.priceRange.min, max: filtersData?.filters.priceRange.max }"
            />
          </template>
        </QuickFilterPopover>

        <USeparator orientation="vertical" class="h-12 hidden md:block" :ui="{ border: 'border-gray-200' }" />

        <QuickFilterPopover title="Кузов" @reset="selectedFilters.bodyType = []">
          <UFormField label="Кузов" class="md:basis-[21%] lg:basis-52">
            <UInput
              class="w-full"
              variant="ghost"
              readonly
              :model-value="bodyTypeLablel"
              placeholder="Всі"
              :ui="{ base: 'text-left md:pb-0' }"
            />
          </UFormField>
          <template #content>
            <QuickFilterList v-model="selectedFilters.bodyType" v-model:all-checkbox="allBodyTypesCheckboxModel" :items="bodyTypeItems" />
          </template>
        </QuickFilterPopover>

        <USeparator orientation="vertical" class="h-12 hidden md:block" :ui="{ border: 'border-gray-200' }" />

        <QuickFilterPopover title="Привід" @reset="selectedFilters.driveType = []">
          <UFormField label="Привід" class="md:basis-[21%] lg:basis-52">
            <UInput
              class="w-full"
              variant="ghost"
              readonly
              :model-value="driveLabel"
              placeholder="Всі"
              :ui="{ base: 'text-left md:pb-0' }"
            />
          </UFormField>
          <template #content>
            <QuickFilterList v-model="selectedFilters.driveType" v-model:all-checkbox="allDriveCheckboxModel" :items="driveItems" />
          </template>
        </QuickFilterPopover>

        <USeparator orientation="vertical" class="h-12 hidden md:block" :ui="{ border: 'border-gray-200' }" />

        <QuickFilterPopover title="Марка" @reset="selectedFilters.brand = []">
          <UFormField label="Марка" class="md:basis-[21%] lg:basis-52">
            <UInput
              class="w-full"
              variant="ghost"
              readonly
              :model-value="brandLabel"
              placeholder="Всі"
              :ui="{ base: 'text-left md:pb-0' }"
            />
          </UFormField>
          <template #content>
            <QuickFilterList v-model="selectedFilters.brand" v-model:all-checkbox="allBrandCheckboxModel" :items="brandsItems" />
          </template>
        </QuickFilterPopover>

        <UButton
          :label="`Переглянути ${filtersData?.total || ''} авто`"
          size="lg"
          block
          color="primary"
          class="lg:basis-64 mt-2 md:mt-0 max-md:min-h-10 text-base md:text-lg"
          data-testid="hero-section-form-submit"
          @click="handleNavigate"
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
