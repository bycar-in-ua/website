<script setup lang="ts">
import type { CheckboxGroupItem } from "@nuxt/ui";
import PriceFilter from "~/components/Catalog/Filters/PriceFilter.vue";
import { useCatalogFilters } from "~/composables/useCatalogFilters";
import QuickFilterList from "./QuickFilterList.vue";

defineProps<{ totalCars?: number; }>();

const { t } = useI18n();
const { data: filtersData, selectedFilters } = useCatalogFilters();

const priceLabel = computed(() => {
  if (!selectedFilters.value?.minPrice && !selectedFilters.value?.maxPrice) {
    return "---";
  }

  const minPrice = selectedFilters.value?.minPrice || filtersData.value?.filters.priceRange.min || 0;
  const maxPrice = selectedFilters.value?.maxPrice || filtersData.value?.filters.priceRange.max || 200000;

  return `$${minPrice} - $${maxPrice}`;
});

const bodyTypeLablel = computed(() => {
  const bodyType = selectedFilters.value?.bodyType;
  if (!bodyType?.length) {
    return "Всі";
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
    return "Всі";
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
    return "Всі";
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
            <UInput
              class="w-full"
              variant="ghost"
              :model-value="priceLabel"
              :ui="{ base: 'text-left' }"
            />

            <template #content>
              <PriceFilter />
            </template>
          </UPopover>
        </UFormField>

        <USeparator orientation="vertical" class="h-12" />

        <UFormField label="Кузов" class="basis-52">
          <UPopover :ui="{ content: 'py-3 px-4' }" :content="{ side: 'bottom', align: 'start', alignOffset: -14.5 }">
            <UInput
              class="w-full"
              variant="ghost"
              :model-value="bodyTypeLablel"
              :ui="{ base: 'text-left' }"
            />

            <template #content>
              <QuickFilterList v-model="selectedFilters.bodyType" v-model:all-checkbox="allBodyTypesCheckboxModel" :items="bodyTypeItems" />
            </template>
          </UPopover>
        </UFormField>

        <USeparator orientation="vertical" class="h-12" />

        <UFormField label="Привід" class="basis-52">
          <UPopover :ui="{ content: 'py-3 px-4' }" :content="{ side: 'bottom', align: 'start', alignOffset: -14.5 }">
            <UInput
              class="w-full"
              variant="ghost"
              :model-value="driveLabel"
              :ui="{ base: 'text-left' }"
            />

            <template #content>
              <QuickFilterList v-model="selectedFilters.driveType" v-model:all-checkbox="allDriveCheckboxModel" :items="driveItems" />
            </template>
          </UPopover>
        </UFormField>

        <USeparator orientation="vertical" class="h-12" />

        <UFormField label="Марка" class="basis-52">
          <UPopover :ui="{ content: 'py-3 px-4' }" :content="{ side: 'bottom', align: 'start', alignOffset: -14.5 }">
            <UInput
              class="w-full"
              variant="ghost"
              :model-value="brandLabel"
              :ui="{ base: 'text-left' }"
            />

            <template #content>
              <QuickFilterList v-model="selectedFilters.brand" v-model:all-checkbox="allBrandCheckboxModel" :items="brandsItems" />
            </template>
          </UPopover>
        </UFormField>

        <UButton
          :label="`Переглянути ${filtersData?.total} авто`"
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
