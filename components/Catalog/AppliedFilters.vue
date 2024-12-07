<script setup lang="ts">
import { useCatalogStore, type FiltersState } from "@/stores/catalog.js";

const { t } = useI18n();

const catalogStore = useCatalogStore();

type Filterbutton = {
  key: keyof FiltersState;
  label: string;
  value: string | number;
};

const appliedFilters = computed<Filterbutton[]>(() => {
  return Object.entries(catalogStore.filters).reduce((acc, [k, value]) => {
    if (!value) {
      return acc;
    }

    const key = k as keyof FiltersState;

    switch (key as keyof FiltersState) {
      case "priceFrom":
      case "priceTo": {
        const labelTranslation = t(`filters.price.${key}`);

        acc.push({
          key,
          label: `${labelTranslation} ${value} $`,
          value: value as number,
        });
        break;
      }

      case "brand": {
        const brandIds = value as number[];

        brandIds.forEach((item) => {
          const brand = catalogStore.dictionary.brands.find(
            (brand) => brand.id === item,
          );

          acc.push({
            key,
            label: brand?.displayName ?? String(item),
            value: item,
          });
        });

        break;
      }

      case "bodyType": {
        const bodyTypes = value as string[];

        bodyTypes.forEach((item) => {
          acc.push({
            key,
            label: t(`vehicle.bodyTypes.items.${item}`),
            value: item,
          });
        });

        break;
      }

      case "engineType": {
        const engineTypes = value as string[];

        engineTypes.forEach((item) => {
          acc.push({
            key,
            label: t(`filters.engineType.${item}`),
            value: item,
          });
        });

        break;
      }

      case "drive": {
        const drives = value as string[];

        drives.forEach((item) => {
          acc.push({ key, label: t(`filters.drive.${item}`), value: item });
        });

        break;
      }

      default: {
        break;
      }
    }

    return acc;
  }, [] as Filterbutton[]);
});

const removeFilterHandler = (
  key: keyof FiltersState,
  value: string | number,
) => {
  if (key === "priceFrom" || key === "priceTo") {
    catalogStore.updateFilters(key, undefined);
    return;
  }

  catalogStore.updateFilters(
    key,
    catalogStore.filters[key]?.filter((item) => item !== value),
  );
};
</script>

<template>
  <div
    v-if="appliedFilters.length > 0"
    class="flex flex-wrap gap-1 items-center"
  >
    <UButton
      v-for="(item, i) in appliedFilters"
      :key="i"
      :label="item.label"
      icon="i-heroicons-x-mark"
      trailing
      variant="outline"
      size="xs"
      @click="removeFilterHandler(item.key, item.value)"
    />

    <UButton
      v-if="appliedFilters.length > 1"
      :label="t('filters.clearAll')"
      icon="i-heroicons-x-mark"
      trailing
      variant="ghost"
      size="xs"
      @click="catalogStore.clearFilters"
    />
  </div>
</template>
